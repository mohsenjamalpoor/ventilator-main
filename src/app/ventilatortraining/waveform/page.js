"use client";

import { useState } from "react";
import {
  LuActivity,
  LuWaves,
  LuChartLine,
  LuCircleGauge,
  LuGitCompareArrows,
  LuRadio,
} from "react-icons/lu";

// ---- clinical scenarios shown as pill buttons; a waveform only shows the
// ---- ones it actually defines a variant for ----
const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
  { key: "overdistension", label: "بیش‌اتساعی" },
];

const waveforms = [
  {
    id: 1,
    title: "Pressure-Time Waveform",
    subtitle: "فشار بر حسب زمان",
    icon: LuCircleGauge,
    color: "#38BDF8",
    description:
      "نمودار Pressure-Time تغییرات فشار راه هوایی را در طول سیکل تنفس نمایش می‌دهد.",
    clinical: [
      "بررسی Peak Pressure",
      "تشخیص Auto PEEP",
      "بررسی Compliance",
      "تشخیص Airway Resistance",
    ],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 180,
    variants: {
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
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "فشار (cmH2O)",
  },
  {
    id: 2,
    title: "Flow-Time Waveform",
    subtitle: "جریان بر حسب زمان",
    icon: LuWaves,
    color: "#34D399",
    description:
      "نمودار Flow-Time جریان دم و بازدم را نشان می‌دهد و برای تشخیص Air Trapping و Auto PEEP کاربرد دارد.",
    clinical: [
      "تشخیص Auto PEEP",
      "بررسی کامل شدن بازدم",
      "تشخیص Air Leak",
      "بررسی Trigger",
    ],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 110,
    variants: {
      normal: {
        path: "M0,110 C8,110 15,45 35,42 C70,38 110,55 150,80 C165,90 172,100 178,110 L182,110 C185,170 195,185 205,180 C225,168 245,140 270,120 C285,108 292,110 300,110",
        readouts: [
          { label: "Peak Flow", value: "60", unit: "L/min" },
          { label: "I:E Ratio", value: "1:2", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "بازگشت کامل جریان بازدمی به خط صفر پیش از دم بعدی.",
      },
      leak: {
        path: "M0,104 C8,104 15,40 35,37 C70,33 110,50 150,75 C165,85 172,95 178,104 L182,100 C184,135 192,150 202,148 C220,140 240,122 262,108 C278,98 290,96 300,104",
        readouts: [
          { label: "Peak Flow", value: "58", unit: "L/min" },
          { label: "Zero Return", value: "ناقص", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "خط پایه‌ی جریان هرگز به صفر واقعی نمی‌رسد — نشانه‌ی نشتی مدار یا کاف بادنشده.",
      },
      obstruction: {
        path: "M0,120 C8,120 15,45 35,42 C70,38 110,55 150,80 C165,90 172,100 178,110 L182,112 C184,148 190,168 200,175 C215,180 232,178 248,172 C265,165 282,150 295,132 C298,128 300,124 300,120",
        readouts: [
          { label: "Peak Exp. Flow", value: "30", unit: "L/min" },
          { label: "Exp. Time", value: "طولانی", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "تخلیه‌ی کند و ناقص بازدمی پیش از شروع دم بعدی — بیانگر Air Trapping / Auto-PEEP است.",
      },
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "جریان (L/min)",
  },
  {
    id: 3,
    title: "Volume-Time Waveform",
    subtitle: "حجم بر حسب زمان",
    icon: LuChartLine,
    color: "#FBBF24",
    description:
      "این موج حجم جاری را در طول دم و بازدم نمایش می‌دهد و برای بررسی نشتی مدار و برگشت کامل حجم به صفر استفاده می‌شود.",
    clinical: ["تشخیص Leak", "بررسی Tidal Volume", "کنترل بازدم کامل"],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 180,
    variants: {
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
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "حجم (ml)",
  },
  {
    id: 4,
    title: "Pressure-Volume Loop",
    subtitle: "لوپ فشار-حجم",
    icon: LuActivity,
    color: "#A78BFA",
    description:
      "لوپ Pressure-Volume رابطه بین فشار و حجم را نشان می‌دهد و برای تنظیم مناسب PEEP و تشخیص Overdistension استفاده می‌شود.",
    clinical: [
      "تنظیم PEEP",
      "تشخیص Overdistension",
      "Recruitment",
      "Compliance",
    ],
    isLoop: true,
    viewBox: "0 0 300 300",
    variants: {
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
      obstruction: {
        inspPath: "M45,235 C100,258 155,220 195,175 C222,145 235,110 245,80",
        expPath: "M245,80 C215,150 155,200 95,220 C70,228 55,232 45,235",
        readouts: [
          { label: "Resistance", value: "افزایش‌یافته", unit: "" },
          { label: "Loop", value: "پهن‌تر", unit: "" },
        ],
        note: "پهن‌ترشدن لوپ و افزایش Hysteresis به‌علت افزایش مقاومت راه هوایی.",
      },
    },
    xAxisLabel: "حجم (ml)",
    yAxisLabel: "فشار (cmH2O)",
  },
  {
    id: 5,
    title: "Flow-Volume Loop",
    subtitle: "لوپ جریان-حجم",
    icon: LuGitCompareArrows,
    color: "#F472B6",
    description:
      "لوپ Flow-Volume جریان و حجم را همزمان نمایش می‌دهد و برای تشخیص انسداد راه هوایی، Leak و برونکواسپاسم کاربرد دارد.",
    clinical: ["تشخیص Bronchospasm", "تشخیص Leak", "Upper Airway Obstruction"],
    isLoop: true,
    viewBox: "0 0 300 300",
    variants: {
      normal: {
        expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
        inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
          { label: "Loop", value: "بسته", unit: "" },
        ],
        note: "شکل طبیعی لوپ با بازگشت کامل به نقطه‌ی شروع روی محور حجم.",
      },
      leak: {
        expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
        inspPath: "M272,150 C232,190 180,210 150,210 C112,210 75,195 55,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
          { label: "Loop", value: "باز", unit: "" },
        ],
        note: "لوپ روی محور حجم بسته نمی‌شود؛ حجم بازدمی کمتر از حجم دمی است — نشانه‌ی نشتی.",
      },
      obstruction: {
        expPath:
          "M30,150 C46,70 85,45 125,44 C160,44 190,60 210,90 C225,112 235,130 245,145 C255,152 262,150 272,150",
        inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "38", unit: "L/min" },
          { label: "Coving", value: "مثبت", unit: "" },
        ],
        note: "فرورفتگی (Scooping/Coving) در قوس بازدمی، نشانه‌ی کلاسیک انسداد راه هوایی (COPD/آسم).",
      },
    },
    xAxisLabel: "حجم (ml)",
    yAxisLabel: "جریان (L/min)",
  },
];

function stripLeadingMove(d) {
  return d.replace(/^\s*M\s*[-\d.]+\s*,\s*[-\d.]+/, "");
}

function WaveChart({ item, variant, scenarioKey }) {
  const isLeakOpen = item.isLoop && scenarioKey === "leak";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: `${item.color}33`,
        background:
          "radial-gradient(120% 120% at 50% 0%, #0B1220 0%, #060910 70%)",
        boxShadow: `0 0 60px -20px ${item.color}55 inset`,
      }}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </span>
        <span className="font-mono text-[10px] tracking-widest text-slate-300">
          LIVE
        </span>
      </div>

      <div className="p-6 pb-4" dir="ltr">
        <svg
          viewBox={item.viewBox}
          className="h-64 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="scope-grid"
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
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {!item.isLoop && (
              <path id={`cycle-${item.id}`} d={variant.path} fill="none" />
            )}
          </defs>

          <rect width="100%" height="100%" fill="url(#scope-grid)" />

          {item.isLoop ? (
            <>
              <line
                x1="30"
                y1="150"
                x2="272"
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
            </>
          ) : (
            <line
              x1="0"
              y1={item.baselineY}
              x2="600"
              y2={item.baselineY}
              stroke="rgba(148,163,184,0.18)"
            />
          )}

          {item.isLoop ? (
            <g>
              <path
                d={variant.expPath}
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                className="loop-draw"
              />
              <path
                d={variant.inspPath}
                fill="none"
                stroke={item.color}
                strokeOpacity="0.55"
                strokeWidth="3"
                strokeDasharray="2 6"
                strokeLinecap="round"
                className="loop-draw"
              />
              {isLeakOpen && (
                <circle
                  cx={variant.inspPath.match(/M([-\d.]+),/)[1]}
                  cy={variant.inspPath.match(/M[-\d.]+,([-\d.]+)/)[1]}
                  r="4"
                  fill="#F87171"
                  opacity="0.9"
                />
              )}
              {/* traveling dot chasing the loop, continuously */}
              <circle r="5" fill={item.color} filter="url(#glow)">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  path={`${variant.inspPath} ${stripLeadingMove(variant.expPath)}`}
                />
              </circle>
            </g>
          ) : (
            <g
              className="scroll-group"
              style={{ "--cw": `${item.cycleWidth}px` }}
            >
              <use
                href={`#cycle-${item.id}`}
                x="0"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <use
                href={`#cycle-${item.id}`}
                x={item.cycleWidth}
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <use
                href={`#cycle-${item.id}`}
                x={item.cycleWidth * 2}
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
            </g>
          )}
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${item.color}22` }}
      >
        <span>{item.xAxisLabel}</span>
        {item.isLoop ? (
          <div className="flex items-center gap-4 font-normal">
            <span className="flex items-center gap-1.5">
              <span
                className="h-[2px] w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              بازدم
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-[2px] w-4 rounded-full opacity-50"
                style={{
                  backgroundColor: item.color,
                  backgroundImage: `repeating-linear-gradient(90deg, ${item.color} 0 4px, transparent 4px 8px)`,
                }}
              />
              دم
            </span>
          </div>
        ) : null}
        <span>{item.yAxisLabel}</span>
      </div>

      <style>{`
        .loop-draw {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: draw-in 1.1s ease-out forwards;
        }
        @keyframes draw-in {
          to { stroke-dashoffset: 0; }
        }
        .scroll-group {
          animation: scroll-left 2.6s linear infinite;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--cw) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loop-draw { animation: none; stroke-dashoffset: 0; }
          .scroll-group { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function WaveformsPage() {
  const [selected, setSelected] = useState(waveforms[0]);
  const [scenario, setScenario] = useState("normal");

  const availableScenarios = SCENARIOS.filter((s) => selected.variants[s.key]);
  const activeKey = selected.variants[scenario] ? scenario : "normal";
  const variant = selected.variants[activeKey];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#05070C] px-4 py-8 text-slate-200"
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
        <div className="flex items-center gap-3 lg:hidden">
          <LuRadio className="text-sky-400" size={20} />
          <h1 className="text-lg font-extrabold text-white">
            پایش موج‌های ونتیلاتور
          </h1>
        </div>

        <aside className="h-fit rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-4 shadow-2xl shadow-black/40 lg:sticky lg:top-8">
          <div className="mb-5 hidden items-center gap-2 px-2 lg:flex">
            <LuRadio className="text-sky-400" size={18} />
            <h2 className="text-lg font-extrabold text-white">پایش موج‌ها</h2>
          </div>

          <ul className="space-y-1.5">
            {waveforms.map((item) => {
              const Icon = item.icon;
              const active = selected.id === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setSelected(item)}
                    className="flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all duration-200"
                    style={{
                      backgroundColor: active
                        ? `${item.color}1A`
                        : "transparent",
                      boxShadow: active
                        ? `inset 0 0 0 1px ${item.color}55`
                        : "none",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors"
                      style={{
                        backgroundColor: active ? item.color : "#161B26",
                        color: active ? "#060910" : "#64748B",
                      }}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="truncate text-sm font-bold"
                        style={{ color: active ? "#fff" : "#94A3B8" }}
                      >
                        {item.subtitle}
                      </h3>
                      <p className="truncate font-mono text-[11px] text-slate-500">
                        {item.title}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
                  style={{
                    backgroundColor: `${selected.color}1A`,
                    color: selected.color,
                  }}
                >
                  {selected.isLoop ? "LOOP" : "TIME-BASED"}
                </span>
                <h1 className="text-3xl font-black text-white md:text-4xl">
                  {selected.subtitle}
                </h1>
                <p className="mt-1 font-mono text-sm text-slate-500">
                  {selected.title}
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
                      style={{ color: selected.color }}
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
              {selected.description}
            </p>

            {/* scenario selector */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
              {availableScenarios.map((s) => {
                const active = activeKey === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setScenario(s.key)}
                    className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? selected.color : "#161B26",
                      color: active ? "#060910" : "#94A3B8",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* clinical note for the active scenario */}
            <div
              className="mt-4 rounded-xl border px-4 py-3 text-sm leading-7"
              style={{
                borderColor: `${selected.color}33`,
                backgroundColor: `${selected.color}0D`,
                color: "#CBD5E1",
              }}
            >
              {variant.note}
            </div>
          </div>

          <WaveChart
            key={`${selected.id}-${activeKey}`}
            item={selected}
            variant={variant}
            scenarioKey={activeKey}
          />

          <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">
              کاربردهای بالینی
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {selected.clinical.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: selected.color }}
                  />
                  <span className="text-slate-300">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
