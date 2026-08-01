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

// "use client";

// import { useState } from "react";
// import { LuCircleGauge, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
// import { TbAlertTriangleFilled } from "react-icons/tb";

// const COLOR = "#38BDF8";
// const VIEWBOX = "0 0 600 220";
// const BASELINE_Y = 180;

// const SCENARIOS = [
//   { key: "normal", label: "نرمال", severity: "low" },
//   { key: "leak", label: "نشتی مدار", severity: "high" },
//   { key: "obstruction", label: "افزایش مقاومت", severity: "medium" },
//   { key: "overdistension", label: "بیش‌اتساعی", severity: "high" },
//   { key: "autoPEEP", label: "Auto-PEEP", severity: "high" },
// ];

// const NORMAL_VALUES = {
//   pip: 28,
//   plateau: 22,
//   peep: 5,
//   compliance: 60,
//   resistance: 8,
// };

// const VARIANTS = {
//   normal: {
//     path: "M0,180 L15,180 C25,180 30,65 45,55 L55,50 C65,48 70,46 75,48 L85,52 L215,52 C225,52 232,90 240,140 C246,168 248,178 255,180 L300,180",
//     readouts: [
//       { label: "PIP (فشار اوج)", value: "28", unit: "cmH₂O", highlight: true },
//       { label: "Plateau", value: "22", unit: "cmH₂O" },
//       { label: "PEEP", value: "5", unit: "cmH₂O", highlight: true },
//       { label: "Compliance", value: "60", unit: "mL/cmH₂O" },
//       { label: "Raw", value: "8", unit: "cmH₂O/L/s" },
//     ],
//     note: "الگوی طبیعی: افزایش سریع فشار تا PIP، سپس Plateau صاف در انتهای دم و کاهش تا PEEP تنظیم شده.",
//     clinicalTip:
//       "Compliance و مقاومت در محدوده نرمال - تنظیمات تهویه مناسب است.",
//   },
//   leak: {
//     path: "M0,180 L15,180 C25,180 30,68 45,62 L55,58 C65,55 75,54 85,56 L130,58 L215,78 C225,95 232,115 240,148 C246,168 248,178 255,180 L300,180",
//     readouts: [
//       { label: "PIP (فشار اوج)", value: "24", unit: "cmH₂O", highlight: true },
//       { label: "Plateau", value: "افت‌کننده", unit: "", alert: true },
//       { label: "PEEP", value: "5", unit: "cmH₂O", highlight: true },
//       { label: "Volume Loss", value: "≥ 15%", unit: "", alert: true },
//     ],
//     note: " افت فشار در فاز Plateau نشانه‌ی نشتی در مدار تنفسی یا کاف لوله تراشه است. حجم جاری واقعی کمتر از تنظیم شده است.",
//     clinicalTip:
//       "بررسی اتصالات مدار، کاف لوله و زهکشی ترشحات. احتمال نشت هوا را جدی بگیرید.",
//   },
//   obstruction: {
//     path: "M0,180 L15,180 C30,180 45,120 60,85 C75,58 90,50 110,48 L145,47 C165,46 185,45 200,46 L215,48 C225,52 232,90 240,140 C246,168 248,178 255,180 L300,180",
//     readouts: [
//       { label: "PIP (فشار اوج)", value: "38", unit: "cmH₂O", highlight: true },
//       { label: "Plateau", value: "22", unit: "cmH₂O" },
//       { label: "PIP-Plateau", value: "16", unit: "cmH₂O", alert: true },
//       { label: "Raw", value: "> 15", unit: "cmH₂O/L/s", alert: true },
//     ],
//     note: " افزایش قابل توجه گرادیان PIP-Plateau (بیش از 5-7 cmH₂O) نشانه‌ی افزایش مقاومت راه هوایی است. صعود کندتر به PIP.",
//     clinicalTip:
//       "بررسی برونکوسپاسم، ترشحات، جابجایی لوله یا اجسام خارجی. در صورت لزوم برونکودیلاتور تجویز کنید.",
//   },
//   overdistension: {
//     path: "M0,180 L15,180 C25,180 30,62 45,56 L55,50 C60,45 65,32 75,28 C85,24 90,28 95,34 L100,42 L215,50 C225,52 232,90 240,140 C246,168 248,178 255,180 L300,180",
//     readouts: [
//       { label: "PIP (فشار اوج)", value: "34", unit: "cmH₂O", highlight: true },
//       { label: "Plateau", value: "28", unit: "cmH₂O" },
//       { label: "Beak Sign", value: "مثبت", unit: "", alert: true },
//       { label: "Compliance", value: "35", unit: "mL/cmH₂O", alert: true },
//     ],
//     note: " برآمدگی نوک‌تیز (Beak) در انتهای دم، نشانه‌ی کاهش Compliance و بیش‌اتساع آلوئولی است. خطر باروتروما.",
//     clinicalTip:
//       "کاهش حجم جاری (Vt) به 6 mL/kg IBW و محدودیت فشار Plateau زیر 30 cmH₂O توصیه می‌شود.",
//   },
//   autoPEEP: {
//     path: "M0,175 L15,175 C25,175 30,58 45,50 L55,46 C65,44 70,42 75,44 L85,48 L215,48 C225,48 232,85 240,135 C246,165 248,175 255,177 L300,177",
//     readouts: [
//       { label: "PIP (فشار اوج)", value: "32", unit: "cmH₂O", highlight: true },
//       { label: "Plateau", value: "25", unit: "cmH₂O" },
//       { label: "Auto-PEEP", value: "8", unit: "cmH₂O", alert: true },
//       { label: "Total PEEP", value: "13", unit: "cmH₂O", alert: true },
//     ],
//     note: " افزایش PEEP در انتهای بازدم (Auto-PEEP) نشانه‌ی تله‌اندازی هوا (Air Trapping) است. خطر همودینامیک و باروتروما.",
//     clinicalTip:
//       "کاهش نسبت I:E، افزایش زمان بازدم، کاهش minute ventilation. در صورت لزوم جداسازی از ونتیلاتور.",
//   },
// };

// const CLINICAL_APPLICATIONS = [
//   {
//     icon: LuTrendingUp,
//     label: "تشخیص افزایش Resistance",
//     desc: "گرادیان PIP-Plateau > 7 cmH₂O",
//   },
//   {
//     icon: LuTrendingDown,
//     label: "کاهش Compliance",
//     desc: "Plateau > 30 cmH₂O با Vt پایین",
//   },
//   {
//     icon: TbAlertTriangleFilled,
//     label: "تشخیص Auto-PEEP",
//     desc: "افزایش تدریجی PEEP در بازدم",
//   },
//   {
//     icon: LuCircleGauge,
//     label: "ارزیابی پاسخ به درمان",
//     desc: "پیگیری تغییرات PIP و Plateau",
//   },
// ];

// function PressureTimeChart({ variant }) {
//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl border"
//       style={{
//         borderColor: `${COLOR}33`,
//         background:
//           "radial-gradient(120% 120% at 50% 0%, #0B1220 0%, #060910 70%)",
//         boxShadow: `0 0 60px -20px ${COLOR}55 inset`,
//       }}
//     >
//       <div className="p-6 pb-4" dir="ltr">
//         <svg
//           viewBox={VIEWBOX}
//           className="h-64 w-full"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <pattern
//               id="pressuretime-grid"
//               width="30"
//               height="22"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M30 0 L0 0 0 22"
//                 fill="none"
//                 stroke="rgba(148,163,184,0.10)"
//                 strokeWidth="1"
//               />
//             </pattern>
//             <filter
//               id="pressuretime-glow"
//               x="-30%"
//               y="-30%"
//               width="160%"
//               height="160%"
//             >
//               <feGaussianBlur stdDeviation="3.2" result="blur" />
//               <feMerge>
//                 <feMergeNode in="blur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>
//             <path id="pressuretime-cycle" d={variant.path} fill="none" />
//           </defs>

//           <rect width="100%" height="100%" fill="url(#pressuretime-grid)" />

//           <line
//             x1="0"
//             y1={BASELINE_Y}
//             x2="600"
//             y2={BASELINE_Y}
//             stroke="rgba(148,163,184,0.25)"
//             strokeDasharray="6 4"
//           />

//           <text
//             x="5"
//             y={BASELINE_Y - 8}
//             className="text-[8px] fill-slate-500 font-mono"
//           >
//             PEEP
//           </text>

//           <g className="pressuretime-scroll">
//             <use
//               href="#pressuretime-cycle"
//               x="0"
//               stroke={COLOR}
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               filter="url(#pressuretime-glow)"
//             />
//             <use
//               href="#pressuretime-cycle"
//               x="300"
//               stroke={COLOR}
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               filter="url(#pressuretime-glow)"
//             />
//             <use
//               href="#pressuretime-cycle"
//               x="600"
//               stroke={COLOR}
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               filter="url(#pressuretime-glow)"
//             />
//           </g>

//           <g className="text-[9px] fill-slate-400 font-mono">
//             <text x="40" y="20" fill="#38BDF8" fontWeight="bold">
//               PIP
//             </text>
//             <text x="190" y="20" fill="#38BDF8" fontWeight="bold">
//               Plateau
//             </text>
//             <text x="430" y="168" fill="#e2e8f0">
//               Exhalation
//             </text>
//             <text x="25" y="168" fill="#e2e8f0">
//               Inhalation
//             </text>

//             <line
//               x1="0"
//               y1="195"
//               x2="0"
//               y2="210"
//               stroke="rgba(148,163,184,0.3)"
//               strokeWidth="1"
//             />
//             <line
//               x1="300"
//               y1="195"
//               x2="300"
//               y2="210"
//               stroke="rgba(148,163,184,0.3)"
//               strokeWidth="1"
//             />
//             <text x="135" y="215" className="fill-slate-500 text-center">
//               سیکل تنفسی
//             </text>
//           </g>
//         </svg>
//       </div>

//       <div
//         className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
//         style={{ borderColor: `${COLOR}22` }}
//       >
//         <span>زمان (ثانیه)</span>
//         <span>فشار راه هوایی (cmH₂O)</span>
//       </div>

//       <style>{`
//         .pressuretime-scroll {
//           animation: pressuretime-scroll-left 2.8s linear infinite;
//         }
//         @keyframes pressuretime-scroll-left {
//           from { transform: translateX(0); }
//           to { transform: translateX(-300px); }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .pressuretime-scroll { animation: none; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function PressureTimePage() {
//   const [scenario, setScenario] = useState("normal");
//   const variant = VARIANTS[scenario];

//   return (
//     <div
//       dir="rtl"
//       className="min-h-screen px-4 py-8 bg-gradient-to-b from-[#0B0F17] to-[#060910]"
//     >
//       <div className="mx-auto max-w-5xl space-y-6">
//         {/* Header Section */}
//         <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div>
//               <span
//                 className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
//                 style={{ backgroundColor: `${COLOR}1A`, color: COLOR }}
//               >
//                 MECHANICAL VENTILATION
//               </span>
//               <h1 className="flex items-center gap-2 text-3xl font-black text-white md:text-4xl">
//                 <LuCircleGauge style={{ color: COLOR }} size={28} />
//                 فشار بر حسب زمان
//               </h1>
//               <p className="mt-1 font-mono text-sm text-slate-500">
//                 Pressure-Time Waveform Analysis
//               </p>
//               <p className="mt-2 text-sm text-slate-400 max-w-xl">
//                 ابزار آموزشی برای تحلیل موج فشار در ونتیلاتور - ویژه متخصصین
//                 مراقبت‌های ویژه
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {variant.readouts.map((r) => (
//                 <div
//                   key={r.label}
//                   className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center min-w-[80px]"
//                 >
//                   <div className="font-mono text-[10px] text-slate-500">
//                     {r.label}
//                   </div>
//                   <div
//                     className={`font-mono text-xl font-bold leading-tight ${
//                       r.highlight
//                         ? "text-[#38BDF8]"
//                         : r.alert
//                           ? "text-amber-400"
//                           : "text-slate-300"
//                     }`}
//                   >
//                     {r.value}
//                     <span className="mr-1 text-xs text-slate-500">
//                       {r.unit}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
//             {SCENARIOS.map((s) => {
//               const active = scenario === s.key;
//               return (
//                 <button
//                   key={s.key}
//                   type="button"
//                   onClick={() => setScenario(s.key)}
//                   className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
//                     active
//                       ? "bg-[#38BDF8] text-[#060910]"
//                       : "bg-[#161B26] text-[#94A3B8] hover:bg-slate-700/50"
//                   }`}
//                 >
//                   {s.label}
//                 </button>
//               );
//             })}
//           </div>

//           <div
//             className="mt-4 rounded-xl border px-4 py-3 text-sm leading-7"
//             style={{
//               borderColor: variant.note.includes("⚠️")
//                 ? "#fbbf2444"
//                 : `${COLOR}33`,
//               backgroundColor: variant.note.includes("⚠️")
//                 ? "#fbbf240d"
//                 : `${COLOR}0D`,
//               color: "#CBD5E1",
//             }}
//           >
//             <span className="font-bold text-[#38BDF8]">📋 تفسیر بالینی:</span>{" "}
//             {variant.note}
//           </div>

//           <div className="mt-3 text-sm text-slate-400 bg-slate-800/20 rounded-lg px-4 py-2 border border-slate-800/50">
//             <span className="text-amber-400">💡 نکته بالینی:</span>{" "}
//             {variant.clinicalTip}
//           </div>
//         </div>

//         {/* Chart Section */}
//         <PressureTimeChart key={scenario} variant={variant} />

//         {/* Educational Section */}
//         <div className="grid gap-6 md:grid-cols-2">
//           {/* Clinical Applications */}
//           <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40">
//             <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
//               کاربردهای بالینی موج فشار
//             </h2>
//             <div className="space-y-3">
//               {CLINICAL_APPLICATIONS.map((app) => {
//                 const IconComponent = app.icon;
//                 return (
//                   <div
//                     key={app.label}
//                     className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4"
//                   >
//                     <IconComponent
//                       className="text-[#38BDF8] mt-0.5"
//                       size={18}
//                     />
//                     <div>
//                       <div className="text-slate-200 font-semibold">
//                         {app.label}
//                       </div>
//                       <div className="text-sm text-slate-400">{app.desc}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Clinical Parameters */}
//           <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40">
//             <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
//               پارامترهای بالینی مرجع
//             </h2>
//             <div className="grid grid-cols-2 gap-3">
//               <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
//                 <div className="text-xs text-slate-500">PIP نرمال</div>
//                 <div className="text-lg font-bold text-[#38BDF8]">
//                   {NORMAL_VALUES.pip}{" "}
//                   <span className="text-sm text-slate-500">cmH₂O</span>
//                 </div>
//               </div>
//               <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
//                 <div className="text-xs text-slate-500">Plateau نرمال</div>
//                 <div className="text-lg font-bold text-[#38BDF8]">
//                   {NORMAL_VALUES.plateau}{" "}
//                   <span className="text-sm text-slate-500">cmH₂O</span>
//                 </div>
//               </div>
//               <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
//                 <div className="text-xs text-slate-500">PEEP نرمال</div>
//                 <div className="text-lg font-bold text-[#38BDF8]">
//                   {NORMAL_VALUES.peep}{" "}
//                   <span className="text-sm text-slate-500">cmH₂O</span>
//                 </div>
//               </div>
//               <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
//                 <div className="text-xs text-slate-500">Compliance نرمال</div>
//                 <div className="text-lg font-bold text-[#38BDF8]">
//                   {NORMAL_VALUES.compliance}{" "}
//                   <span className="text-sm text-slate-500">mL/cmH₂O</span>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
//               <div className="text-sm text-amber-300">
//                 Plateau باید کمتر از 30 cmH₂O باشد. PIP-Plateau گرادیان نرمال
//                 5-7 cmH₂O است.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
