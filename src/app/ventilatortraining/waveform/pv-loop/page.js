"use client";

import { useState, useMemo } from "react";
import { LuActivity, LuStethoscope, LuTriangleAlert } from "react-icons/lu";

const COLOR = "#A78BFA";
const COLOR_WARN = "#F87171";
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
      { label: "Static Compliance", value: "45", unit: "ml/cmH2O" },
      { label: "Loop", value: "بسته", unit: "" },
    ],
    uip: null,
    note: "لوپ کاملاً بسته با Hysteresis طبیعی بین دم و بازدم؛ بخش میانی لوپ خطی است — یعنی در تمام محدوده‌ی Vt جاری، ریه در ناحیه‌ی کمپلیانس مطلوب کار می‌کند.",
    pearl:
      "شیب بخش میانی لوپ، Compliance دینامیک است؛ برای Compliance استاتیک باید مکث دمی اعمال و Pplateau خوانده شود.",
  },
  leak: {
    inspPath: "M45,235 C95,255 150,225 190,185 C222,153 240,115 250,85",
    expPath: "M250,85 C225,140 175,185 120,205 C100,212 85,210 70,205",
    readouts: [
      { label: "Compliance", value: "نامعتبر", unit: "" },
      { label: "Loop", value: "باز", unit: "" },
    ],
    uip: null,
    note: "لوپ بسته نمی‌شود — نقطه‌ی پایان بازدم به نقطه‌ی شروع دم بازنمی‌گردد. این شکاف، امضای کلاسیک نشتی روی لوپ PV است.",
    pearl:
      "در اطفال با لوله‌ی بدون کاف، درصد نشتی طبیعی وجود دارد؛ لوپ باز به‌تنهایی پاتولوژیک نیست — همیشه با درصد نشتی نمایش‌داده‌شده روی دستگاه تطبیق دهید.",
  },
  obstruction: {
    inspPath: "M45,235 C100,258 155,220 195,175 C222,145 235,110 245,80",
    expPath: "M245,80 C215,150 155,200 95,220 C70,228 55,232 45,235",
    readouts: [
      { label: "Airway Resistance", value: "افزایش‌یافته", unit: "" },
      { label: "Loop Width", value: "پهن‌تر", unit: "" },
    ],
    uip: null,
    note: "پهن‌ترشدن لوپ در محور فشار (نه حجم) و افزایش Hysteresis؛ فاصله‌ی افقی بین منحنی دم و بازدم در هر سطح از حجم، معیار کمّی مقاومت راه هوایی است.",
    pearl:
      "برخلاف بیش‌اتساعی که شکل لوپ را در بالای منحنی تغییر می‌دهد، انسداد کل عرض لوپ را به‌طور یکنواخت پهن می‌کند.",
  },
  overdistension: {
    inspPath:
      "M45,235 C95,255 150,225 185,190 C205,168 215,140 220,110 C222,100 230,92 250,85",
    expPath:
      "M250,85 C230,95 222,105 220,118 C215,145 200,175 165,198 C120,222 80,228 45,235",
    readouts: [
      { label: "Compliance (بالای UIP)", value: "کاهش‌یافته", unit: "" },
      { label: "Beak Sign", value: "مثبت", unit: "" },
    ],
    uip: { x: 220, y: 118 },
    note: "بعد از نقطه‌ی عطف بالایی (UIP)، شیب لوپ به‌وضوح کاهش می‌یابد — یعنی برای افزایش کوچکی در حجم، فشار به‌شدت بالا می‌رود. این همان 'نوک اردکی' (Beak) است.",
    pearl:
      "در نوزادان و شیرخواران به‌دلیل ظرفیت باقیمانده عملکردی (FRC) کوچک‌تر، فاصله بین حجم طبیعی و UIP کمتر است — یعنی با تنظیمات نسبتاً معمولی هم سریع‌تر به Overdistension می‌رسند.",
  },
};

const CLINICAL = [
  {
    label: "تنظیم PEEP بهینه",
    desc: "PEEP باید بالای نقطه‌ی عطف پایینی (LIP) روی منحنی دمی تنظیم شود تا از باز و بسته‌شدن مکرر آلوئول جلوگیری کند.",
  },
  {
    label: "تشخیص Overdistension",
    desc: "ظهور Beak روی بخش بالایی لوپ نشانه‌ی نیاز به کاهش Vt یا PEEP است، حتی اگر Pplateau هنوز زیر آستانه باشد.",
  },
  {
    label: "استراتژی Recruitment",
    desc: "لوپ می‌تواند پیش و پس از یک مانور رکروتمنت مقایسه شود تا پاسخ‌دهی آلوئولی ارزیابی شود.",
  },
  {
    label: "پایش Compliance روند",
    desc: "کاهش تدریجی شیب لوپ در طول زمان، حتی بدون تغییر تنظیمات، می‌تواند اولین نشانه‌ی وخامت ریوی باشد.",
  },
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
              fill={COLOR_WARN}
              opacity="0.9"
            />
          )}

          {variant.uip && (
            <g>
              <circle
                cx={variant.uip.x}
                cy={variant.uip.y}
                r="5"
                fill="none"
                stroke={COLOR_WARN}
                strokeWidth="2"
              />
              <line
                x1={variant.uip.x}
                y1={variant.uip.y}
                x2={variant.uip.x + 22}
                y2={variant.uip.y - 22}
                stroke={COLOR_WARN}
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <text
                x={variant.uip.x + 26}
                y={variant.uip.y - 24}
                fill={COLOR_WARN}
                fontSize="11"
                fontFamily="monospace"
              >
                UIP
              </text>
            </g>
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

          <p className="mt-6 text-base leading-8 text-slate-400">
            لوپ Pressure-Volume رابطه‌ی بین فشار راه هوایی و حجم ریوی را در طول
            یک سیکل کامل تنفسی نشان می‌دهد. شیب لوپ در هر نقطه، Compliance
            لحظه‌ای ریه است — نه یک عدد ثابت.
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

          <div
            className="mt-3 flex gap-2.5 rounded-xl border px-4 py-3 text-xs leading-6"
            style={{
              borderColor: `${COLOR_WARN}33`,
              backgroundColor: `${COLOR_WARN}0D`,
              color: "#FCA5A5",
            }}
          >
            <LuStethoscope size={16} className="mt-0.5 shrink-0" />
            <span>{variant.pearl}</span>
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
                key={c.label}
                className="rounded-2xl border border-slate-800 bg-black/20 p-4"
              >
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: COLOR }}
                  />
                  <span className="font-semibold text-slate-200">
                    {c.label}
                  </span>
                </div>
                <p className="text-xs leading-6 text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-start gap-3 rounded-2xl border px-5 py-4 text-xs leading-6"
          style={{
            borderColor: "rgba(251,191,36,0.25)",
            backgroundColor: "rgba(251,191,36,0.06)",
            color: "#FCD34D",
          }}
        >
          <LuTriangleAlert size={16} className="mt-0.5 shrink-0" />
          <span>
            نقطه‌ی عطف بالایی (UIP) روی این نمایش برای اهداف آموزشی ثابت شده
            است. در بیمار واقعی، UIP به‌صورت پویا با هر تغییر Vt یا PEEP جابه‌جا
            می‌شود و نباید به‌عنوان یک عدد ثابت حفظ شود.
          </span>
        </div>
      </div>
    </div>
  );
}
