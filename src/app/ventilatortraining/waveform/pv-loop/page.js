"use client";

import { useState } from "react";
import { LuActivity } from "react-icons/lu";

const COLOR = "#A78BFA";
const VIEWBOX = "0 0 300 300";

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
  { key: "overdistension", label: "بیش‌اتساعی" },
];

const VARIANTS = {
  normal: {
    inspPath: "M45,235 C95,255 150,225 190,185 C222,153 240,115 250,85",
    expPath: "M250,85 C225,140 165,190 105,212 C75,222 55,230 45,235",
    readouts: [
      { label: "Compliance", value: "45", unit: "ml/cmH2O" },
      { label: "Loop", value: "بسته", unit: "" },
    ],
    note: "لوپ کاملاً بسته با Hysteresis طبیعی بین دم و بازدم.",
  },
  leak: {
    inspPath: "M45,235 C95,255 150,225 190,185 C222,153 240,115 250,85",
    expPath: "M250,85 C225,140 175,185 120,205 C100,212 85,210 70,205",
    readouts: [
      { label: "Compliance", value: "نامعتبر", unit: "" },
      { label: "Loop", value: "باز", unit: "" },
    ],
    note: "لوپ بسته نمی‌شود — نقطه‌ی پایان بازدم به نقطه‌ی شروع دم بازنمی‌گردد. این شکاف، امضای کلاسیک نشتی روی لوپ PV است.",
  },
  obstruction: {
    inspPath: "M45,235 C100,258 155,220 195,175 C222,145 235,110 245,80",
    expPath: "M245,80 C215,150 155,200 95,220 C70,228 55,232 45,235",
    readouts: [
      { label: "Resistance", value: "افزایش‌یافته", unit: "" },
      { label: "Loop", value: "پهن‌تر", unit: "" },
    ],
    note: "پهن‌ترشدن لوپ و افزایش Hysteresis به‌علت افزایش مقاومت راه هوایی.",
  },
  overdistension: {
    inspPath:
      "M45,235 C95,255 150,225 185,190 C205,168 215,140 220,110 C222,100 230,92 250,85",
    expPath:
      "M250,85 C230,95 222,105 220,118 C215,145 200,175 165,198 C120,222 80,228 45,235",
    readouts: [
      { label: "Compliance", value: "کاهش‌یافته", unit: "" },
      { label: "Beak Sign", value: "مثبت", unit: "" },
    ],
    note: "صاف‌شدگی و 'نوک اردکی' (Beak) در بالای لوپ، نشانه‌ی بیش‌اتساع آلوئولی است.",
  },
};

const CLINICAL = [
  "تنظیم PEEP",
  "تشخیص Overdistension",
  "Recruitment",
  "Compliance",
];

function stripLeadingMove(d) {
  return d.replace(/^\s*M\s*[-\d.]+\s*,\s*[-\d.]+/, "");
}

function PVLoopChart({ variant, scenarioKey }) {
  const isLeakOpen = scenarioKey === "leak";
  const inspStart = variant.inspPath.match(/M([-\d.]+),([-\d.]+)/);

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
              id="pvloop-grid"
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
              id="pvloop-glow"
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
          </defs>

          <rect width="100%" height="100%" fill="url(#pvloop-grid)" />

          <line
            x1="30"
            y1="150"
            x2="270"
            y2="150"
            stroke="rgba(148,163,184,0.25)"
            strokeDasharray="3 5"
          />
          <line
            x1="150"
            y1="30"
            x2="150"
            y2="270"
            stroke="rgba(148,163,184,0.25)"
            strokeDasharray="3 5"
          />

          <path
            d={variant.expPath}
            fill="none"
            stroke={COLOR}
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#pvloop-glow)"
            className="pvloop-draw"
          />
          <path
            d={variant.inspPath}
            fill="none"
            stroke={COLOR}
            strokeOpacity="0.55"
            strokeWidth="3"
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="pvloop-draw"
          />
          {isLeakOpen && inspStart && (
            <circle
              cx={inspStart[1]}
              cy={inspStart[2]}
              r="4"
              fill="#F87171"
              opacity="0.9"
            />
          )}

          <circle r="5" fill={COLOR} filter="url(#pvloop-glow)">
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path={`${variant.inspPath} ${stripLeadingMove(variant.expPath)}`}
            />
          </circle>
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${COLOR}22` }}
      >
        <span>حجم (ml)</span>
        <div className="flex items-center gap-4 font-normal">
          <span className="flex items-center gap-1.5">
            <span
              className="h-[2px] w-4 rounded-full"
              style={{ backgroundColor: COLOR }}
            />
            بازدم
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-[2px] w-4 rounded-full opacity-50"
              style={{
                backgroundColor: COLOR,
                backgroundImage: `repeating-linear-gradient(90deg, ${COLOR} 0 4px, transparent 4px 8px)`,
              }}
            />
            دم
          </span>
        </div>
        <span>فشار (cmH2O)</span>
      </div>

      <style>{`
        .pvloop-draw {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: pvloop-draw-in 1.1s ease-out forwards;
        }
        @keyframes pvloop-draw-in {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pvloop-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default function PressureVolumeLoopPage() {
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
                LOOP
              </span>
              <h1 className="flex items-center gap-2 text-3xl font-black text-white md:text-4xl">
                <LuActivity style={{ color: COLOR }} size={28} />
                لوپ فشار-حجم
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Pressure-Volume Loop
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
            لوپ Pressure-Volume رابطه بین فشار و حجم را نشان می‌دهد و برای تنظیم
            مناسب PEEP و تشخیص Overdistension استفاده می‌شود.
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

        <PVLoopChart key={scenario} variant={variant} scenarioKey={scenario} />

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
