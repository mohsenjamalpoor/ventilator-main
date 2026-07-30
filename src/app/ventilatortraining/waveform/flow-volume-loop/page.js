// "use client";

// import { useState } from "react";
// import { LuGitCompareArrows } from "react-icons/lu";

// const COLOR = "#F472B6";
// const VIEWBOX = "0 0 300 300";

// const SCENARIOS = [
//   { key: "normal", label: "نرمال" },
//   { key: "leak", label: "نشتی (Leak)" },
//   { key: "obstruction", label: "انسداد راه هوایی" },
// ];

// const VARIANTS = {
//   normal: {
//     expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
//     inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
//     readouts: [
//       { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
//       { label: "Loop", value: "بسته", unit: "" },
//     ],
//     note: "شکل طبیعی لوپ با بازگشت کامل به نقطه‌ی شروع روی محور حجم.",
//   },
//   leak: {
//     expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
//     inspPath: "M272,150 C232,190 180,210 150,210 C112,210 75,195 55,150",
//     readouts: [
//       { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
//       { label: "Loop", value: "باز", unit: "" },
//     ],
//     note: "لوپ روی محور حجم بسته نمی‌شود؛ حجم بازدمی کمتر از حجم دمی است — نشانه‌ی نشتی.",
//   },
//   obstruction: {
//     expPath:
//       "M30,150 C46,70 85,45 125,44 C160,44 190,60 210,90 C225,112 235,130 245,145 C255,152 262,150 272,150",
//     inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
//     readouts: [
//       { label: "Peak Exp. Flow", value: "38", unit: "L/min" },
//       { label: "Coving", value: "مثبت", unit: "" },
//     ],
//     note: "فرورفتگی (Scooping/Coving) در قوس بازدمی، نشانه‌ی کلاسیک انسداد راه هوایی (COPD/آسم).",
//   },
// };

// const CLINICAL = [
//   "تشخیص Bronchospasm",
//   "تشخیص Leak",
//   "Upper Airway Obstruction",
// ];

// function stripLeadingMove(d) {
//   return d.replace(/^\s*M\s*[-\d.]+\s*,\s*[-\d.]+/, "");
// }

// function FlowVolumeLoopChart({ variant, scenarioKey }) {
//   const isLeakOpen = scenarioKey === "leak";
//   const inspStart = variant.inspPath.match(/M([-\d.]+),([-\d.]+)/);

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
//               id="fvloop-grid"
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
//               id="fvloop-glow"
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
//           </defs>

//           <rect width="100%" height="100%" fill="url(#fvloop-grid)" />

//           <line
//             x1="30"
//             y1="150"
//             x2="270"
//             y2="150"
//             stroke="rgba(148,163,184,0.25)"
//             strokeDasharray="3 5"
//           />
//           <line
//             x1="150"
//             y1="30"
//             x2="150"
//             y2="270"
//             stroke="rgba(148,163,184,0.25)"
//             strokeDasharray="3 5"
//           />

//           <path
//             d={variant.expPath}
//             fill="none"
//             stroke={COLOR}
//             strokeWidth="3"
//             strokeLinecap="round"
//             filter="url(#fvloop-glow)"
//             className="fvloop-draw"
//           />
//           <path
//             d={variant.inspPath}
//             fill="none"
//             stroke={COLOR}
//             strokeOpacity="0.55"
//             strokeWidth="3"
//             strokeDasharray="2 6"
//             strokeLinecap="round"
//             className="fvloop-draw"
//           />
//           {isLeakOpen && inspStart && (
//             <circle
//               cx={inspStart[1]}
//               cy={inspStart[2]}
//               r="4"
//               fill="#F87171"
//               opacity="0.9"
//             />
//           )}

//           <circle r="5" fill={COLOR} filter="url(#fvloop-glow)">
//             <animateMotion
//               dur="2.4s"
//               repeatCount="indefinite"
//               path={`${variant.expPath} ${stripLeadingMove(variant.inspPath)}`}
//             />
//           </circle>
//         </svg>
//       </div>

//       <div
//         className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
//         style={{ borderColor: `${COLOR}22` }}
//       >
//         <span className="flex items-center gap-2">
//           <span className="text-slate-500">حجم (ml)</span>
//           <span className="text-slate-600">→</span>
//         </span>
//         <div className="flex items-center gap-4 font-normal">
//           <span className="flex items-center gap-1.5">
//             <span
//               className="h-[2px] w-4 rounded-full"
//               style={{ backgroundColor: COLOR }}
//             />
//             <span>دم</span>
//             <span className="text-[10px] text-slate-500">(Insp.)</span>
//           </span>
//           <span className="flex items-center gap-1.5">
//             <span
//               className="h-[2px] w-4 rounded-full opacity-50"
//               style={{
//                 backgroundColor: COLOR,
//                 backgroundImage: `repeating-linear-gradient(90deg, ${COLOR} 0 4px, transparent 4px 8px)`,
//               }}
//             />
//             <span>بازدم</span>
//             <span className="text-[10px] text-slate-500">(Exp.)</span>
//           </span>
//         </div>
//         <span className="flex items-center gap-2">
//           <span className="text-slate-600">↑</span>
//           <span className="text-slate-500">جریان (L/min)</span>
//         </span>
//       </div>

//       <style>{`
//         .fvloop-draw {
//           stroke-dasharray: 700;
//           stroke-dashoffset: 700;
//           animation: fvloop-draw-in 1.1s ease-out forwards;
//         }
//         @keyframes fvloop-draw-in {
//           to { stroke-dashoffset: 0; }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .fvloop-draw { animation: none; stroke-dashoffset: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function FlowVolumeLoopPage() {
//   const [scenario, setScenario] = useState("normal");
//   const variant = VARIANTS[scenario];

//   return (
//     <div dir="rtl" className="min-h-screen px-4 py-8">
//       <div className="mx-auto max-w-4xl space-y-6">
//         <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div>
//               <span
//                 className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
//                 style={{ backgroundColor: `${COLOR}1A`, color: COLOR }}
//               >
//                 LOOP
//               </span>
//               <h1 className="flex items-center gap-2 text-3xl font-black text-white md:text-4xl">
//                 <LuGitCompareArrows style={{ color: COLOR }} size={28} />
//                 لوپ جریان-حجم
//               </h1>
//               <p className="mt-1 font-mono text-sm text-slate-500">
//                 Flow-Volume Loop
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {variant.readouts.map((r) => (
//                 <div
//                   key={r.label}
//                   className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center"
//                 >
//                   <div className="font-mono text-[10px] text-slate-500">
//                     {r.label}
//                   </div>
//                   <div
//                     className="font-mono text-xl font-bold leading-tight"
//                     style={{ color: COLOR }}
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

//           <p className="mt-6 text-lg leading-9 text-slate-400">
//             لوپ Flow-Volume جریان و حجم را همزمان نمایش می‌دهد و برای تشخیص
//             انسداد راه هوایی، Leak و برونکواسپاسم کاربرد دارد.
//           </p>

//           <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
//             {SCENARIOS.map((s) => {
//               const active = scenario === s.key;
//               return (
//                 <button
//                   key={s.key}
//                   type="button"
//                   onClick={() => setScenario(s.key)}
//                   className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
//                   style={{
//                     backgroundColor: active ? COLOR : "#161B26",
//                     color: active ? "#060910" : "#94A3B8",
//                   }}
//                 >
//                   {s.label}
//                 </button>
//               );
//             })}
//           </div>

//           <div
//             className="mt-4 rounded-xl border px-4 py-3 text-sm leading-7"
//             style={{
//               borderColor: `${COLOR}33`,
//               backgroundColor: `${COLOR}0D`,
//               color: "#CBD5E1",
//             }}
//           >
//             {variant.note}
//           </div>
//         </div>

//         <FlowVolumeLoopChart
//           key={scenario}
//           variant={variant}
//           scenarioKey={scenario}
//         />

//         <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
//           <h2 className="mb-6 text-2xl font-bold text-white">
//             کاربردهای بالینی
//           </h2>
//           <div className="grid gap-3 md:grid-cols-2">
//             {CLINICAL.map((c) => (
//               <div
//                 key={c}
//                 className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4"
//               >
//                 <span
//                   className="h-2 w-2 shrink-0 rounded-full"
//                   style={{ backgroundColor: COLOR }}
//                 />
//                 <span className="text-slate-300">{c}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { LuGitCompareArrows } from "react-icons/lu";

const COLOR = "#F472B6";
const VIEWBOX = "0 0 300 300";

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "obstruction", label: "انسداد راه هوایی (COPD/آسم)" },
  { key: "airtrapping", label: "Air Trapping" },
  { key: "restrictive", label: "الگوی محدودکننده" },
  { key: "fixed", label: "انسداد ثابت فوقانی" },
  { key: "extrathoracic", label: "انسداد متغیر خارج‌قفسه‌ای" },
  { key: "intrathoracic", label: "انسداد متغیر داخل‌قفسه‌ای" },
  { key: "leak", label: "نشتی (Leak)" },
];

const VARIANTS = {
  normal: {
    expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
    inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "50", unit: "L/min" },
    ],
    finding: "شکل طبیعی بیضی‌شکل با بازگشت کامل به نقطه‌ی شروع روی محور حجم.",
    causes: "—",
    treatment: "نیازی به مداخله نیست؛ عملکرد ریوی طبیعی است.",
    annotations: [],
  },
  obstruction: {
    expPath:
      "M30,150 C46,78 82,48 118,45 C152,43 182,58 202,88 C220,114 233,132 248,143 C258,148 265,149 272,150",
    inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "32", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "50", unit: "L/min" },
    ],
    finding:
      "فرورفتگی (Scooping/Coving) در قوس بازدمی همراه با کاهش Peak Expiratory Flow.",
    causes: "COPD، آسم، برونشیت مزمن — انسداد راه هوایی تحتانی.",
    treatment:
      "برونکودیلاتور (بتا-آگونیست/آنتی‌کولینرژیک)، کورتیکواستروئید استنشاقی، افزایش زمان بازدم (I:E)، کاهش RR برای پیشگیری از Auto-PEEP.",
    annotations: [{ x: 202, y: 88, dx: 25, dy: -35, text: "Scooping" }],
  },
  airtrapping: {
    expPath:
      "M65,150 C80,85 110,55 140,52 C168,50 192,63 208,90 C222,114 232,132 245,143 C255,148 263,149 272,150",
    inspPath: "M272,150 C235,188 195,208 168,208 C135,208 95,192 65,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "28", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "45", unit: "L/min" },
    ],
    finding:
      "شروع و پایان لوپ در حجم بالاتر از حالت طبیعی (افزایش RV) به همراه فرورفتگی بازدمی — بیش‌اتساع دینامیک.",
    causes:
      "COPD شدید، حمله‌ی حاد آسم، زمان بازدم ناکافی (I:E نامناسب)، نرخ تنفس بالا.",
    treatment:
      "افزایش زمان بازدم، کاهش نرخ تنفس و حجم جاری، اصلاح Auto-PEEP با PEEP خارجی مناسب، برونکودیلاتور و در موارد حاد، کورتیکواستروئید سیستمیک.",
    annotations: [{ x: 65, y: 150, dx: -30, dy: 15, text: "Air Trapping" }],
  },
  restrictive: {
    expPath:
      "M110,150 C120,92 140,70 160,68 C180,67 198,80 208,102 C216,120 222,135 228,143 C233,147 236,149 240,150",
    inspPath: "M240,150 C212,180 182,196 168,196 C142,196 118,182 110,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "46", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "42", unit: "L/min" },
    ],
    finding:
      "لوپ کوچک و باریک با شکل طبیعی اما دامنه‌ی حجمی محدود (کاهش TLC و VC).",
    causes: "فیبروز ریوی، دفورمیتی قفسه‌ی سینه، چاقی، ضعف عضلات تنفسی.",
    treatment:
      "درمان علت زمینه‌ای (مثلاً کورتیکواستروئید/ضدفیبروز در فیبروز ریوی)، تهویه با حجم جاری کمتر، فیزیوتراپی تنفسی.",
    annotations: [{ x: 175, y: 130, dx: 20, dy: -25, text: "حجم کاهش‌یافته" }],
  },
  fixed: {
    expPath:
      "M30,150 L45,112 C62,96 95,90 150,90 C205,90 238,96 255,112 L272,150",
    inspPath:
      "M272,150 L255,188 C238,204 205,210 150,210 C95,210 62,204 45,188 L30,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "24", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "22", unit: "L/min" },
    ],
    finding:
      "صاف‌شدن (Plateau) هر دو قوس دمی و بازدمی به شکل جعبه‌ای، با کاهش متقارن جریان.",
    causes: "تنگی نای، گواتر بزرگ فشاردهنده به نای، تومور نای.",
    treatment:
      "ارزیابی فوری راه هوایی، برونکوسکوپی و تصویربرداری (CT گردن/قفسه سینه)، احتمال نیاز به استنت‌گذاری نای، تراکئوستومی یا جراحی رفع انسداد.",
    annotations: [
      { x: 150, y: 90, dx: 0, dy: -22, text: "Plateau" },
      { x: 150, y: 210, dx: 0, dy: 22, text: "Plateau" },
    ],
  },
  extrathoracic: {
    expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
    inspPath:
      "M272,150 L255,178 C230,192 190,197 150,197 C110,197 70,192 45,178 L30,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "52", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "26", unit: "L/min" },
    ],
    finding:
      "صاف‌شدن قوس دمی (Inspiratory limb) در حالی‌که قوس بازدمی طبیعی است — انسداد متغیر خارج قفسه‌سینه‌ای (بالای تنگه‌ی صدری).",
    causes: "فلج تارهای صوتی، اختلال عملکرد تارهای صوتی (VCD)، ادم حنجره.",
    treatment:
      "ارزیابی گوش‌وحلق‌وبینی/لارنگوسکوپی، Heliox در موارد حاد، درمان علت زمینه‌ای (مثلاً کورتیکواستروئید در ادم حنجره).",
    annotations: [{ x: 150, y: 197, dx: 0, dy: 22, text: "Flattened Insp." }],
  },
  intrathoracic: {
    expPath:
      "M30,150 L45,122 C68,105 105,100 150,100 C195,100 232,105 255,122 L272,150",
    inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "26", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "50", unit: "L/min" },
    ],
    finding:
      "صاف‌شدن زودرس قوس بازدمی در حالی‌که قوس دمی طبیعی است — انسداد متغیر داخل قفسه‌سینه‌ای.",
    causes: "تراکئومالاسی، تومور داخل نای تحتانی نزدیک کارینا.",
    treatment:
      "بررسی برونکوسکوپیک، و در موارد شدید استنت‌گذاری راه هوایی یا جراحی اصلاحی.",
    annotations: [{ x: 150, y: 100, dx: 0, dy: -22, text: "Flattened Exp." }],
  },
  leak: {
    expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
    inspPath: "M272,150 C232,190 180,210 150,210 C112,210 75,195 55,150",
    readouts: [
      { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
      { label: "Peak Insp. Flow", value: "48", unit: "L/min" },
    ],
    finding: "لوپ روی محور حجم بسته نمی‌شود؛ حجم بازدمی کمتر از حجم دمی است.",
    causes: "نشتی از مدار تنفسی، کاف لوله‌ی تراشه یا اتصالات مدار.",
    treatment:
      "بررسی و تنظیم فشار کاف لوله‌ی تراشه، بازبینی اتصالات و یکپارچگی مدار تنفسی، تعویض قطعات معیوب.",
    annotations: [{ x: 55, y: 150, dx: -25, dy: 12, text: "بسته نمی‌شود" }],
  },
};

const CLINICAL = [
  "تشخیص انسداد راه هوایی (COPD/آسم)",
  "شناسایی Air Trapping و بیش‌اتساع دینامیک",
  "افتراق الگوی محدودکننده از انسدادی",
  "تشخیص انسداد ثابت/متغیر راه هوایی فوقانی",
  "تشخیص Leak در مدار یا کاف لوله",
  "پایش پاسخ به برونکودیلاتور",
];

function stripLeadingMove(d) {
  return d.replace(/^\s*M\s*[-\d.]+\s*,\s*[-\d.]+/, "");
}

function FlowVolumeLoopChart({ variant, scenarioKey }) {
  const isLeakOpen = scenarioKey === "leak";
  const inspStart = variant.inspPath.match(/M([-\d.]+),([-\d.]+)/);
  const annotations = variant.annotations || [];

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
          className="h-72 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="fvloop-grid"
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
              id="fvloop-glow"
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

          <rect width="100%" height="100%" fill="url(#fvloop-grid)" />

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
            filter="url(#fvloop-glow)"
            className="fvloop-draw"
          />
          <path
            d={variant.inspPath}
            fill="none"
            stroke={COLOR}
            strokeOpacity="0.55"
            strokeWidth="3"
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="fvloop-draw"
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

          {annotations.map((a, i) => (
            <g key={i}>
              <line
                x1={a.x}
                y1={a.y}
                x2={a.x + a.dx}
                y2={a.y + a.dy}
                stroke="#E2E8F0"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <text
                x={a.x + a.dx}
                y={a.y + a.dy + (a.dy < 0 ? -4 : 12)}
                fontSize="10"
                fill="#F1F5F9"
                textAnchor="middle"
                fontWeight="600"
              >
                {a.text}
              </text>
            </g>
          ))}

          <circle r="5" fill={COLOR} filter="url(#fvloop-glow)">
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path={`${variant.expPath} ${stripLeadingMove(variant.inspPath)}`}
            />
          </circle>
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${COLOR}22` }}
      >
        <span className="flex items-center gap-2">
          <span className="text-slate-500">حجم (ml)</span>
          <span className="text-slate-600">→</span>
        </span>
        <div className="flex items-center gap-4 font-normal">
          <span className="flex items-center gap-1.5">
            <span
              className="h-[2px] w-4 rounded-full"
              style={{ backgroundColor: COLOR }}
            />
            <span>بازدم</span>
            <span className="text-[10px] text-slate-500">
              (Exp., بالای محور)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-[2px] w-4 rounded-full opacity-50"
              style={{
                backgroundColor: COLOR,
                backgroundImage: `repeating-linear-gradient(90deg, ${COLOR} 0 4px, transparent 4px 8px)`,
              }}
            />
            <span>دم</span>
            <span className="text-[10px] text-slate-500">
              (Insp., زیر محور)
            </span>
          </span>
        </div>
        <span className="flex items-center gap-2">
          <span className="text-slate-600">↑</span>
          <span className="text-slate-500">جریان (L/min)</span>
        </span>
      </div>

      <style>{`
        .fvloop-draw {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: fvloop-draw-in 1.1s ease-out forwards;
        }
        @keyframes fvloop-draw-in {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fvloop-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default function FlowVolumeLoopPage() {
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
                <LuGitCompareArrows style={{ color: COLOR }} size={28} />
                لوپ جریان-حجم
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Flow-Volume Loop
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
            لوپ Flow-Volume جریان و حجم را همزمان در طول یک دم و بازدم کامل
            نمایش می‌دهد و برای تشخیص انسداد راه هوایی، Air Trapping، الگوی
            محدودکننده، انسداد راه هوایی فوقانی و نشتی مدار کاربرد دارد.
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

          <div className="mt-4 grid gap-3 border-t border-slate-800/80 pt-5 md:grid-cols-3">
            <div
              className="rounded-xl border px-4 py-3 text-sm leading-7"
              style={{
                borderColor: `${COLOR}33`,
                backgroundColor: `${COLOR}0D`,
                color: "#CBD5E1",
              }}
            >
              <div
                className="mb-1 font-mono text-[10px] font-bold tracking-wide"
                style={{ color: COLOR }}
              >
                یافته (Finding)
              </div>
              {variant.finding}
            </div>
            <div className="rounded-xl border border-slate-800 bg-black/20 px-4 py-3 text-sm leading-7 text-slate-300">
              <div className="mb-1 font-mono text-[10px] font-bold tracking-wide text-slate-500">
                علل (Causes)
              </div>
              {variant.causes}
            </div>
            <div className="rounded-xl border border-emerald-800/40 bg-emerald-500/5 px-4 py-3 text-sm leading-7 text-emerald-200">
              <div className="mb-1 font-mono text-[10px] font-bold tracking-wide text-emerald-400">
                درمان / نحوه برطرف‌سازی
              </div>
              {variant.treatment}
            </div>
          </div>
        </div>

        <FlowVolumeLoopChart
          key={scenario}
          variant={variant}
          scenarioKey={scenario}
        />

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
