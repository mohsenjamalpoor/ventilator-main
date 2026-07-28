"use client";

import { useState } from "react";
import { LuCircleGauge } from "react-icons/lu";

const COLOR = "#38BDF8";
const VIEWBOX = "0 0 600 220";
const CYCLE_WIDTH = 300;
const BASELINE_Y = 180;

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
  { key: "overdistension", label: "بیش‌اتساعی" },
];

const VARIANTS = {
  normal: {
    path: "M0,180 L15,180 C25,180 30,60 45,55 L70,50 L215,50 C225,50 232,90 240,140 C246,168 248,178 255,180 L300,180",
    readouts: [
      { label: "Peak Pressure", value: "28", unit: "cmH2O" },
      { label: "Plateau", value: "22", unit: "cmH2O" },
      { label: "PEEP", value: "5", unit: "cmH2O" },
    ],
    note: "الگوی طبیعی موج فشار با یک Plateau صاف در انتهای دم.",
  },
  leak: {
    path: "M0,180 L15,180 C25,180 30,65 45,60 L70,58 C120,58 170,68 215,80 C225,95 232,115 240,148 C246,168 248,178 255,180 L300,180",
    readouts: [
      { label: "Peak Pressure", value: "24", unit: "cmH2O" },
      { label: "Plateau", value: "افت‌کننده", unit: "" },
      { label: "PEEP", value: "5", unit: "cmH2O" },
    ],
    note: "به‌جای Plateau صاف، فشار در طول Hold افت می‌کند — نشانه‌ی نشتی از مدار یا کاف لوله.",
  },
  obstruction: {
    path: "M0,180 L15,180 C30,180 40,85 55,65 C75,50 95,42 110,40 L215,40 C225,42 232,90 240,140 C246,168 248,178 255,180 L300,180",
    readouts: [
      { label: "Peak Pressure", value: "38", unit: "cmH2O" },
      { label: "Plateau", value: "22", unit: "cmH2O" },
      { label: "Peak-Plateau Gap", value: "بزرگ", unit: "" },
    ],
    note: "صعود کندتر و فاصله‌ی زیاد Peak تا Plateau نشانه‌ی افزایش مقاومت راه هوایی است.",
  },
  overdistension: {
    path: "M0,180 L15,180 C25,180 30,60 45,55 L55,50 C60,44 65,28 75,28 C85,28 90,44 95,50 L215,50 C225,50 232,90 240,140 C246,168 248,178 255,180 L300,180",
    readouts: [
      { label: "Peak Pressure", value: "34", unit: "cmH2O" },
      { label: "Plateau", value: "22", unit: "cmH2O" },
      { label: "Beak Sign", value: "مثبت", unit: "" },
    ],
    note: "برآمدگی نوک‌تیز (Beak) در انتهای دم، نشانه‌ی بیش‌اتساع آلوئولی است.",
  },
};

const CLINICAL = [
  "بررسی Peak Pressure",
  "تشخیص Auto PEEP",
  "بررسی Compliance",
  "تشخیص Airway Resistance",
];

function PressureTimeChart({ variant }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: `${COLOR}33`,
        background:
          "radial-gradient(120% 120% at 50% 0%, #0B1220 0%, #060910 70%)",
        boxShadow: `0 0 60px -20px ${COLOR}55 inset`,
      }}
    >
      <div className="p-6 pb-4" dir="ltr">
        <svg
          viewBox={VIEWBOX}
          className="h-64 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="pressuretime-grid"
              width="30"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L0 0 0 22"
                fill="none"
                stroke="rgba(148,163,184,0.10)"
                strokeWidth="1"
              />
            </pattern>
            <filter
              id="pressuretime-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path id="pressuretime-cycle" d={variant.path} fill="none" />
          </defs>

          <rect width="100%" height="100%" fill="url(#pressuretime-grid)" />

          <line
            x1="0"
            y1={BASELINE_Y}
            x2="600"
            y2={BASELINE_Y}
            stroke="rgba(148,163,184,0.18)"
          />

          <g
            className="pressuretime-scroll"
            style={{ "--cw": `${CYCLE_WIDTH}px` }}
          >
            <use
              href="#pressuretime-cycle"
              x="0"
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pressuretime-glow)"
            />
            <use
              href="#pressuretime-cycle"
              x={CYCLE_WIDTH}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pressuretime-glow)"
            />
            <use
              href="#pressuretime-cycle"
              x={CYCLE_WIDTH * 2}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pressuretime-glow)"
            />
          </g>
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${COLOR}22` }}
      >
        <span>زمان (ثانیه)</span>
        <span>فشار (cmH2O)</span>
      </div>

      <style>{`
        .pressuretime-scroll {
          animation: pressuretime-scroll-left 2.6s linear infinite;
        }
        @keyframes pressuretime-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--cw) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pressuretime-scroll { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function PressureTimePage() {
  const [scenario, setScenario] = useState("normal");
  const variant = VARIANTS[scenario];

  return (
    <div dir="rtl" className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
                style={{ backgroundColor: `${COLOR}1A`, color: COLOR }}
              >
                TIME-BASED
              </span>
              <h1 className="flex items-center gap-2 text-3xl font-black text-white md:text-4xl">
                <LuCircleGauge style={{ color: COLOR }} size={28} />
                فشار بر حسب زمان
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Pressure-Time Waveform
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {variant.readouts.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center"
                >
                  <div className="font-mono text-[10px] text-slate-500">
                    {r.label}
                  </div>
                  <div
                    className="font-mono text-xl font-bold leading-tight"
                    style={{ color: COLOR }}
                  >
                    {r.value}
                    <span className="mr-1 text-xs text-slate-500">
                      {r.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-lg leading-9 text-slate-400">
            نمودار Pressure-Time تغییرات فشار راه هوایی را در طول سیکل تنفس
            نمایش می‌دهد.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
            {SCENARIOS.map((s) => {
              const active = scenario === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScenario(s.key)}
                  className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: active ? COLOR : "#161B26",
                    color: active ? "#060910" : "#94A3B8",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 rounded-xl border px-4 py-3 text-sm leading-7"
            style={{
              borderColor: `${COLOR}33`,
              backgroundColor: `${COLOR}0D`,
              color: "#CBD5E1",
            }}
          >
            {variant.note}
          </div>
        </div>

        <PressureTimeChart key={scenario} variant={variant} />

        <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            کاربردهای بالینی
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {CLINICAL.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: COLOR }}
                />
                <span className="text-slate-300">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
