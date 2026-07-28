"use client";

import { useState } from "react";
import { LuChartLine } from "react-icons/lu";

const COLOR = "#FBBF24";
const VIEWBOX = "0 0 600 220";
const CYCLE_WIDTH = 300;
const BASELINE_Y = 180;

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
];

const VARIANTS = {
  normal: {
    path: "M0,180 C20,180 50,70 90,55 L170,52 C185,52 190,60 195,75 C220,140 250,175 280,180 L300,180",
    readouts: [
      { label: "Tidal Volume", value: "450", unit: "ml" },
      { label: "Minute Volume", value: "6.3", unit: "L" },
    ],
    note: "بازگشت کامل حجم به خط پایه‌ی صفر پس از هر بازدم.",
  },
  leak: {
    path: "M0,160 C20,160 50,62 90,50 L170,48 C183,48 188,55 193,68 C213,105 240,140 265,155 L300,160",
    readouts: [
      { label: "Exhaled Vt", value: "380", unit: "ml" },
      { label: "Set Vt", value: "450", unit: "ml" },
      { label: "Diff", value: "-70", unit: "ml" },
    ],
    note: "حجم بازدمی هرگز به صفر بازنمی‌گردد؛ اختلاف حجم دمی و بازدمی نشانه‌ی نشتی است.",
  },
  obstruction: {
    path: "M0,172 C20,172 50,66 90,52 L170,50 C184,50 189,57 194,71 C216,120 246,158 272,168 L300,172",
    readouts: [
      { label: "Exhaled Vt", value: "430", unit: "ml" },
      { label: "Set Vt", value: "450", unit: "ml" },
      { label: "Diff", value: "-20", unit: "ml" },
    ],
    note: "بازگشت ناقص حجم به دلیل بازدم ناکامل و احتباس هوا (Air Trapping).",
  },
};

const CLINICAL = ["تشخیص Leak", "بررسی Tidal Volume", "کنترل بازدم کامل"];

function VolumeTimeChart({ variant }) {
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
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: COLOR }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: COLOR }}
          />
        </span>
        <span className="font-mono text-[10px] tracking-widest text-slate-300">
          LIVE
        </span>
      </div>

      <div className="p-6 pb-4" dir="ltr">
        <svg
          viewBox={VIEWBOX}
          className="h-64 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="volumetime-grid"
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
              id="volumetime-glow"
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
            <path id="volumetime-cycle" d={variant.path} fill="none" />
          </defs>

          <rect width="100%" height="100%" fill="url(#volumetime-grid)" />

          <line
            x1="0"
            y1={BASELINE_Y}
            x2="600"
            y2={BASELINE_Y}
            stroke="rgba(148,163,184,0.18)"
          />

          <g
            className="volumetime-scroll"
            style={{ "--cw": `${CYCLE_WIDTH}px` }}
          >
            <use
              href="#volumetime-cycle"
              x="0"
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#volumetime-glow)"
            />
            <use
              href="#volumetime-cycle"
              x={CYCLE_WIDTH}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#volumetime-glow)"
            />
            <use
              href="#volumetime-cycle"
              x={CYCLE_WIDTH * 2}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#volumetime-glow)"
            />
          </g>
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${COLOR}22` }}
      >
        <span>زمان (ثانیه)</span>
        <span>حجم (ml)</span>
      </div>

      <style>{`
        .volumetime-scroll {
          animation: volumetime-scroll-left 2.6s linear infinite;
        }
        @keyframes volumetime-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--cw) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .volumetime-scroll { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function VolumeTimePage() {
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
                <LuChartLine style={{ color: COLOR }} size={28} />
                حجم بر حسب زمان
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Volume-Time Waveform
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
            این موج حجم جاری را در طول دم و بازدم نمایش می‌دهد و برای بررسی نشتی
            مدار و برگشت کامل حجم به صفر استفاده می‌شود.
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

        <VolumeTimeChart key={scenario} variant={variant} />

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
