// "use client";

// import { useState } from "react";
// import {
//   FaWaveSquare,
//   FaCheckCircle,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// const waveforms = {
//   normal: {
//     label: "طبیعی",
//     theme: "teal",
//     summary:
//       "جریان دمی به‌صورت رمپ نزولی شروع و در پایان دم به صفر می‌رسد؛ جریان بازدمی نیز به‌طور کامل و نمایی به خط پایه (صفر) بازمی‌گردد.",
//     features: [
//       "شروع سریع جریان دمی و کاهش تدریجی تا صفر",
//       "بازگشت کامل جریان بازدمی به خط پایه پیش از دم بعدی",
//       "وجود یک وقفه بازدمی (expiratory pause) مشخص",
//     ],
//     causes: ["الگوی طبیعی در حالت تنفس هماهنگ با ونتیلاتور"],
//     action: ["نیازی به مداخله نیست؛ به‌عنوان مبنای مقایسه استفاده شود"],
//     points: [
//       [20, 160],
//       [40, 160],
//       [60, 50],
//       [90, 72],
//       [130, 98],
//       [170, 125],
//       [200, 160],
//       [210, 270],
//       [240, 235],
//       [270, 205],
//       [300, 182],
//       [330, 166],
//       [350, 160],
//       [580, 160],
//     ],
//     annotations: [],
//   },
//   leak: {
//     label: "نشتی",
//     theme: "amber",
//     summary:
//       "به دلیل نشتی در مدار یا کاف لوله تراشه، جریان بازدمی هرگز به‌طور کامل به خط پایه صفر بازنمی‌گردد و یک آفست پایدار باقی می‌ماند.",
//     features: [
//       "عدم بازگشت کامل منحنی بازدمی به خط صفر",
//       "معمولاً همراه با اختلاف بین حجم جاری دمی و بازدمی (VTi > VTe)",
//       "ممکن است با افت فشار در Pressure-Time هم دیده شود",
//     ],
//     causes: [
//       "نشتی کاف لوله تراشه یا تراکئوستومی",
//       "اتصال شل یا آسیب‌دیده مدار ونتیلاتور",
//       "لوله تراشه بدون کاف در اطفال",
//     ],
//     action: [
//       "بررسی فشار کاف و اتصالات مدار",
//       "مقایسه VTi و VTe در مانیتور",
//       "در صورت نشتی مداوم، اطلاع به تیم درمان",
//     ],
//     points: [
//       [20, 160],
//       [40, 160],
//       [60, 50],
//       [90, 72],
//       [130, 98],
//       [170, 125],
//       [200, 160],
//       [210, 270],
//       [240, 240],
//       [270, 215],
//       [300, 200],
//       [330, 190],
//       [360, 184],
//       [580, 184],
//     ],
//     annotations: [
//       {
//         type: "arrow-gap",
//         x: 470,
//         y1: 160,
//         y2: 184,
//         label: "بازنگشتن به خط پایه",
//         labelX: 478,
//         labelY: 176,
//       },
//     ],
//   },
//   airTrapping: {
//     label: " Auto-PEEP",
//     theme: "red",
//     summary:
//       "زمان بازدمی کافی نیست؛ دم بعدی پیش از آنکه جریان بازدمی به صفر برسد آغاز می‌شود و باعث تجمع هوا (breath stacking) می‌گردد.",
//     features: [
//       "جریان بازدمی قبل از رسیدن به صفر، توسط دم بعدی قطع می‌شود",
//       "دو موج تنفسی متوالی هم‌پوشانی دارند",
//       "معمولاً با افزایش PEEP داخلی (Auto-PEEP) همراه است",
//     ],
//     causes: [
//       "زمان بازدمی ناکافی (RR بالا یا I:E نامناسب)",
//       "افزایش مقاومت راه هوایی (برونکواسپاسم، ترشحات)",
//       "COPD یا آسم با محدودیت جریان بازدمی",
//     ],
//     action: [
//       "افزایش زمان بازدمی (کاهش RR یا افزایش نسبت I:E)",
//       "بررسی و درمان برونکواسپاسم",
//       "اندازه‌گیری Auto-PEEP با مانور وقفه انتهای بازدم",
//     ],
//     points: [
//       [20, 160],
//       [40, 160],
//       [60, 50],
//       [90, 72],
//       [130, 98],
//       [170, 125],
//       [200, 160],
//       [210, 270],
//       [240, 238],
//       [270, 210],
//       [300, 192],
//       [330, 178],
//       [345, 60],
//       [375, 80],
//       [410, 105],
//       [450, 130],
//       [480, 160],
//       [490, 265],
//       [520, 235],
//       [550, 205],
//       [580, 190],
//     ],
//     annotations: [
//       {
//         type: "arrow-gap",
//         x: 330,
//         y1: 160,
//         y2: 178,
//         label: "شروع دم بعدی قبل از صفر شدن جریان",
//         labelX: 336,
//         labelY: 142,
//       },
//     ],
//   },
//   flowStarvation: {
//     label: "گرسنگی جریان",
//     theme: "purple",
//     summary:
//       "جریان تنظیم‌شده توسط ونتیلاتور کمتر از تقاضای تنفسی بیمار است و در وسط فاز دمی یک فرورفتگی (notch) در منحنی دیده می‌شود.",
//     features: [
//       "فرورفتگی یا شکاف در قسمت میانی منحنی دمی",
//       "اغلب همراه با تلاش تنفسی مضاعف بیمار (increased WOB)",
//       "بیمار ممکن است دچار عدم هماهنگی با ونتیلاتور (asynchrony) شود",
//     ],
//     causes: [
//       "تنظیم جریان یا زمان رمپ نامناسب در مد VC",
//       "افزایش تقاضای تنفسی بیمار (درد، اضطراب، اسیدوز)",
//       "حساسیت تریگر نامناسب",
//     ],
//     action: [
//       "افزایش جریان دمی تنظیم‌شده یا تغییر شکل موج جریان",
//       "بررسی و درمان علت افزایش تقاضای تنفسی",
//       "در نظر گرفتن تغییر مد به PC/PRVC در صورت تداوم مشکل",
//     ],
//     points: [
//       [20, 160],
//       [40, 160],
//       [55, 60],
//       [75, 90],
//       [95, 130],
//       [115, 110],
//       [150, 95],
//       [190, 120],
//       [220, 160],
//       [230, 270],
//       [260, 235],
//       [290, 205],
//       [320, 182],
//       [350, 165],
//       [370, 160],
//       [580, 160],
//     ],
//     annotations: [
//       {
//         type: "circle",
//         x: 105,
//         y: 115,
//         r: 20,
//         label: "فرورفتگی جریان دمی",
//         labelX: 135,
//         labelY: 108,
//       },
//     ],
//   },
// };

// const themeStyles = {
//   teal: {
//     stroke: "#0f766e",
//     tabActive: "bg-teal-700 text-white",
//     badge: "bg-teal-50 text-teal-700 border-teal-100",
//     icon: <FaCheckCircle />,
//   },
//   amber: {
//     stroke: "#b45309",
//     tabActive: "bg-amber-600 text-white",
//     badge: "bg-amber-50 text-amber-700 border-amber-100",
//     icon: <FaExclamationTriangle />,
//   },
//   red: {
//     stroke: "#dc2626",
//     tabActive: "bg-red-600 text-white",
//     badge: "bg-red-50 text-red-700 border-red-100",
//     icon: <FaExclamationTriangle />,
//   },
//   purple: {
//     stroke: "#7e22ce",
//     tabActive: "bg-purple-700 text-white",
//     badge: "bg-purple-50 text-purple-700 border-purple-100",
//     icon: <FaExclamationTriangle />,
//   },
// };

// function FlowTimeChart({ points, annotations, stroke }) {
//   const width = 600;
//   const height = 320;
//   const baselineY = 160;
//   const pathD = points
//     .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
//     .join(" ");

//   return (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       className="w-full h-auto"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {Array.from({ length: 8 }).map((_, i) => (
//         <line
//           key={i}
//           x1={i * 80}
//           y1={0}
//           x2={i * 80}
//           y2={height}
//           stroke="#f1f5f9"
//           strokeWidth={1}
//         />
//       ))}

//       <line
//         x1={0}
//         y1={baselineY}
//         x2={width}
//         y2={baselineY}
//         stroke="#94a3b8"
//         strokeDasharray="4 4"
//         strokeWidth={1.5}
//       />
//       <text x={6} y={baselineY - 8} fontSize="12" fill="#64748b">
//         0
//       </text>

//       <text
//         x={width - 95}
//         y={30}
//         fontSize="13"
//         fill="#0f766e"
//         fontWeight="bold"
//       >
//         دمی (+)
//       </text>
//       <text
//         x={width - 95}
//         y={height - 12}
//         fontSize="13"
//         fill="#b45309"
//         fontWeight="bold"
//       >
//         بازدمی (−)
//       </text>

//       <path
//         d={pathD}
//         fill="none"
//         stroke={stroke}
//         strokeWidth={3}
//         strokeLinejoin="round"
//         strokeLinecap="round"
//       />

//       {annotations.map((a, i) => (
//         <g key={i}>
//           {a.type === "arrow-gap" && (
//             <>
//               <line
//                 x1={a.x}
//                 y1={a.y1}
//                 x2={a.x}
//                 y2={a.y2}
//                 stroke="#dc2626"
//                 strokeWidth={1.5}
//                 strokeDasharray="3 3"
//               />
//               <circle cx={a.x} cy={a.y1} r={3} fill="#dc2626" />
//               <circle cx={a.x} cy={a.y2} r={3} fill="#dc2626" />
//             </>
//           )}
//           {a.type === "circle" && (
//             <circle
//               cx={a.x}
//               cy={a.y}
//               r={a.r}
//               fill="none"
//               stroke="#dc2626"
//               strokeWidth={2}
//             />
//           )}
//           {a.label && (
//             <text
//               x={a.labelX}
//               y={a.labelY}
//               fontSize="12"
//               fill="#dc2626"
//               fontWeight="600"
//             >
//               {a.label}
//             </text>
//           )}
//         </g>
//       ))}

//       <line
//         x1={0}
//         y1={0}
//         x2={0}
//         y2={height}
//         stroke="#e2e8f0"
//         strokeWidth={1.5}
//       />
//     </svg>
//   );
// }

// function FlowTimePage() {
//   const [active, setActive] = useState("normal");
//   const current = waveforms[active];
//   const theme = themeStyles[current.theme];

//   return (
//     <div dir="rtl" className="mx-auto max-w-4xl p-6">
//       <div className="mb-6 flex items-center gap-4">
//         <div className="rounded-full bg-teal-50 p-3 text-teal-700">
//           <FaWaveSquare size={22} />
//         </div>
//         <div>
//           <h1 className="text-2xl font-extrabold text-slate-900">
//             موج Flow-Time
//           </h1>
//           <p className="mt-0.5 text-sm text-slate-500">
//             بررسی الگوی طبیعی، نشتی و تغییرات غیرطبیعی موج جریان-زمان
//           </p>
//         </div>
//       </div>

//       <div className="mb-6 flex flex-wrap gap-2">
//         {Object.entries(waveforms).map(([key, wf]) => {
//           const t = themeStyles[wf.theme];
//           const isActive = active === key;
//           return (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActive(key)}
//               className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
//                 isActive
//                   ? t.tabActive
//                   : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//               }`}
//             >
//               {wf.label}
//             </button>
//           );
//         })}
//       </div>

//       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//         <div
//           className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold ${theme.badge}`}
//         >
//           {theme.icon}
//           {current.label}
//         </div>

//         <FlowTimeChart
//           points={current.points}
//           annotations={current.annotations}
//           stroke={theme.stroke}
//         />

//         <p className="mt-4 text-sm leading-relaxed text-slate-600">
//           {current.summary}
//         </p>
//       </div>

//       <div className="mt-6 grid gap-4 md:grid-cols-3">
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">
//             ویژگی‌های موج
//           </h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.features.map((f, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-teal-600">•</span>
//                 {f}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">علل احتمالی</h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.causes.map((c, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-amber-600">•</span>
//                 {c}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">
//             اقدام بالینی
//           </h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.action.map((a, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-red-600">•</span>
//                 {a}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FlowTimePage;

// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FaWaveSquare,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaPlay,
//   FaPause,
// } from "react-icons/fa";

// // ---------- ثابت‌های فیزیولوژیک موج ----------
// const TI = 1.0; // زمان دم طبیعی (ثانیه)
// const TE = 2.0; // زمان بازدم طبیعی (ثانیه)
// const PERIOD = TI + TE;
// const PEAK_INSP = 40;
// const PEAK_EXP = 60;

// function normalFlow(t) {
//   const phase = t % PERIOD;
//   if (phase < TI) return PEAK_INSP * (1 - phase / TI);
//   const te = phase - TI;
//   return -PEAK_EXP * Math.exp((-3 * te) / TE);
// }

// function leakFlow(t) {
//   const phase = t % PERIOD;
//   if (phase < TI) return PEAK_INSP * (1 - phase / TI);
//   const te = phase - TI;
//   const leakLevel = 12;
//   return -(PEAK_EXP - leakLevel) * Math.exp((-3 * te) / TE) - leakLevel;
// }

// function airTrappingFlow(t) {
//   const teShort = 0.8; // زمان بازدمی ناکافی
//   const periodShort = TI + teShort;
//   const phase = t % periodShort;
//   if (phase < TI) return PEAK_INSP * (1 - phase / TI);
//   const te = phase - TI;
//   return -PEAK_EXP * Math.exp((-3 * te) / TE); // با ثابت زمانی کامل، اما فرصت ناکافی برای رسیدن به صفر
// }

// function flowStarvationFlow(t) {
//   const phase = t % PERIOD;
//   if (phase < TI) {
//     const base = PEAK_INSP * (1 - phase / TI);
//     const center = TI * 0.45;
//     const width = 0.12;
//     const dip = 18 * Math.exp(-((phase - center) ** 2) / (2 * width * width));
//     return Math.max(base - dip, 4);
//   }
//   const te = phase - TI;
//   return -PEAK_EXP * Math.exp((-3 * te) / TE);
// }

// const waveforms = {
//   normal: {
//     label: "طبیعی",
//     theme: "teal",
//     getValue: normalFlow,
//     summary:
//       "جریان دمی به‌صورت رمپ نزولی شروع و در پایان دم به صفر می‌رسد؛ جریان بازدمی نیز به‌طور کامل به خط پایه بازمی‌گردد.",
//     features: [
//       "شروع سریع جریان دمی و کاهش تدریجی تا صفر",
//       "بازگشت کامل جریان بازدمی به خط پایه پیش از دم بعدی",
//       "وجود یک وقفه بازدمی مشخص",
//     ],
//     causes: ["الگوی طبیعی در حالت تنفس هماهنگ با ونتیلاتور"],
//     action: ["نیازی به مداخله نیست؛ به‌عنوان مبنای مقایسه استفاده شود"],
//   },
//   leak: {
//     label: "Leak",
//     theme: "amber",
//     getValue: leakFlow,
//     summary:
//       "به دلیل نشتی در مدار یا کاف لوله تراشه، جریان بازدمی هرگز به‌طور کامل به خط پایه بازنمی‌گردد و یک آفست پایدار باقی می‌ماند.",
//     features: [
//       "عدم بازگشت کامل منحنی بازدمی به خط صفر",
//       "معمولاً همراه با اختلاف VTi > VTe",
//       "ممکن است با افت فشار در Pressure-Time هم دیده شود",
//     ],
//     causes: [
//       "نشتی کاف لوله تراشه یا تراکئوستومی",
//       "اتصال شل یا آسیب‌دیده مدار ونتیلاتور",
//       "لوله تراشه بدون کاف در اطفال",
//     ],
//     action: [
//       "بررسی فشار کاف و اتصالات مدار",
//       "مقایسه VTi و VTe در مانیتور",
//       "در صورت نشتی مداوم، اطلاع به تیم درمان",
//     ],
//   },
//   airTrapping: {
//     label: "Auto-PEEP",
//     theme: "red",
//     getValue: airTrappingFlow,
//     summary:
//       "زمان بازدمی کافی نیست؛ دم بعدی پیش از آنکه جریان بازدمی به صفر برسد آغاز می‌شود و باعث تجمع هوا می‌گردد.",
//     features: [
//       "جریان بازدمی قبل از رسیدن به صفر، توسط دم بعدی قطع می‌شود",
//       "دو موج تنفسی متوالی هم‌پوشانی دارند",
//       "معمولاً با افزایش Auto-PEEP همراه است",
//     ],
//     causes: [
//       "زمان بازدمی ناکافی (RR بالا یا I:E نامناسب)",
//       "افزایش مقاومت راه هوایی (برونکواسپاسم، ترشحات)",
//       "COPD یا آسم با محدودیت جریان بازدمی",
//     ],
//     action: [
//       "افزایش زمان بازدمی (کاهش RR یا افزایش I:E)",
//       "بررسی و درمان برونکواسپاسم",
//       "اندازه‌گیری Auto-PEEP با مانور وقفه انتهای بازدم",
//     ],
//   },
//   flowStarvation: {
//     label: "گرسنگی جریان",
//     theme: "purple",
//     getValue: flowStarvationFlow,
//     summary:
//       "جریان تنظیم‌شده کمتر از تقاضای تنفسی بیمار است و در وسط فاز دمی یک فرورفتگی در منحنی دیده می‌شود.",
//     features: [
//       "فرورفتگی یا شکاف در قسمت میانی منحنی دمی",
//       "اغلب همراه با تلاش تنفسی مضاعف بیمار",
//       "ممکن است باعث عدم هماهنگی با ونتیلاتور شود",
//     ],
//     causes: [
//       "تنظیم جریان یا زمان رمپ نامناسب در مد VC",
//       "افزایش تقاضای تنفسی بیمار (درد، اضطراب، اسیدوز)",
//       "حساسیت تریگر نامناسب",
//     ],
//     action: [
//       "افزایش جریان دمی تنظیم‌شده یا تغییر شکل موج",
//       "بررسی و درمان علت افزایش تقاضای تنفسی",
//       "در نظر گرفتن تغییر مد به PC/PRVC در صورت تداوم",
//     ],
//   },
// };

// const themeStyles = {
//   teal: {
//     stroke: "#0f766e",
//     tabActive: "bg-teal-700 text-white",
//     badge: "bg-teal-50 text-teal-700 border-teal-100",
//     icon: <FaCheckCircle />,
//   },
//   amber: {
//     stroke: "#b45309",
//     tabActive: "bg-amber-600 text-white",
//     badge: "bg-amber-50 text-amber-700 border-amber-100",
//     icon: <FaExclamationTriangle />,
//   },
//   red: {
//     stroke: "#dc2626",
//     tabActive: "bg-red-600 text-white",
//     badge: "bg-red-50 text-red-700 border-red-100",
//     icon: <FaExclamationTriangle />,
//   },
//   purple: {
//     stroke: "#7e22ce",
//     tabActive: "bg-purple-700 text-white",
//     badge: "bg-purple-50 text-purple-700 border-purple-100",
//     icon: <FaExclamationTriangle />,
//   },
// };

// // ---------- کامپوننت نمودار زنده (Canvas) ----------
// function LiveFlowChart({
//   getValue,
//   color,
//   clockRef,
//   height = 140,
//   historySeconds = 5,
//   label,
// }) {
//   const canvasRef = useRef(null);
//   const samplesRef = useRef([]);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const width = canvas.width;
//     const h = canvas.height;
//     const baselineY = h * 0.5;
//     const scale = (h * 0.42) / 70;

//     function draw() {
//       const t = clockRef.current.t;
//       const buf = samplesRef.current;
//       buf.push({ t, v: getValue(t) });
//       const minT = t - historySeconds;
//       while (buf.length && buf[0].t < minT) buf.shift();

//       ctx.clearRect(0, 0, width, h);

//       ctx.strokeStyle = "#f1f5f9";
//       ctx.lineWidth = 1;
//       for (let i = 0; i <= 6; i++) {
//         const x = (i / 6) * width;
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, h);
//         ctx.stroke();
//       }

//       ctx.strokeStyle = "#94a3b8";
//       ctx.setLineDash([4, 4]);
//       ctx.beginPath();
//       ctx.moveTo(0, baselineY);
//       ctx.lineTo(width, baselineY);
//       ctx.stroke();
//       ctx.setLineDash([]);

//       ctx.strokeStyle = color;
//       ctx.lineWidth = 2.5;
//       ctx.lineJoin = "round";
//       ctx.lineCap = "round";
//       ctx.beginPath();
//       buf.forEach((s, i) => {
//         const x = width - ((t - s.t) / historySeconds) * width;
//         const y = baselineY - s.v * scale;
//         if (i === 0) ctx.moveTo(x, y);
//         else ctx.lineTo(x, y);
//       });
//       ctx.stroke();

//       if (buf.length) {
//         const last = buf[buf.length - 1];
//         const x = width - ((t - last.t) / historySeconds) * width;
//         const y = baselineY - last.v * scale;
//         ctx.fillStyle = color;
//         ctx.beginPath();
//         ctx.arc(x, y, 4, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       rafRef.current = requestAnimationFrame(draw);
//     }

//     rafRef.current = requestAnimationFrame(draw);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [getValue, color, clockRef, historySeconds]);

//   return (
//     <div>
//       {label && (
//         <p className="mb-1 text-xs font-bold text-slate-500">{label}</p>
//       )}
//       <canvas
//         ref={canvasRef}
//         width={560}
//         height={height}
//         style={{ aspectRatio: `560 / ${height}` }}
//         className="h-auto w-full rounded-xl border border-slate-100 bg-white"
//       />
//     </div>
//   );
// }

// // ---------- صفحه اصلی ----------
// function FlowTimePage() {
//   const [activeType, setActiveType] = useState("normal");
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [speed, setSpeed] = useState(1);

//   const clockRef = useRef({ t: 0 });
//   const isPlayingRef = useRef(isPlaying);
//   const speedRef = useRef(speed);

//   useEffect(() => {
//     isPlayingRef.current = isPlaying;
//   }, [isPlaying]);

//   useEffect(() => {
//     speedRef.current = speed;
//   }, [speed]);

//   useEffect(() => {
//     let last = performance.now();
//     let raf;
//     function tick(now) {
//       const dt = (now - last) / 1000;
//       last = now;
//       if (isPlayingRef.current) {
//         clockRef.current.t += dt * speedRef.current;
//       }
//       raf = requestAnimationFrame(tick);
//     }
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, []);

//   const current = waveforms[activeType];
//   const theme = themeStyles[current.theme];

//   return (
//     <div dir="rtl" className="mx-auto max-w-4xl p-6">
//       <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <div className="rounded-full bg-teal-50 p-3 text-teal-700">
//             <FaWaveSquare size={22} />
//           </div>
//           <div>
//             <h1 className="text-2xl font-extrabold text-slate-900">
//               موج Flow-Time (زنده)
//             </h1>
//             <p className="mt-0.5 text-sm text-slate-500">
//               مقایسه آنی الگوی طبیعی با انواع تغییرات غیرطبیعی
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => setIsPlaying((p) => !p)}
//             className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-bold text-white hover:bg-slate-900"
//           >
//             {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
//             {isPlaying ? "توقف" : "پخش"}
//           </button>
//           <div className="flex items-center rounded-xl bg-slate-100 p-1">
//             {[0.5, 1, 2].map((s) => (
//               <button
//                 key={s}
//                 type="button"
//                 onClick={() => setSpeed(s)}
//                 className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
//                   speed === s
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-500"
//                 }`}
//               >
//                 {s}x
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ردیف مقایسه‌ای هر ۴ حالت به‌صورت هم‌زمان */}
//       <div className="mb-8 grid gap-4 sm:grid-cols-2">
//         {Object.entries(waveforms).map(([key, wf]) => {
//           const t = themeStyles[wf.theme];
//           return (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveType(key)}
//               className={`rounded-2xl border p-4 text-right transition-all ${
//                 activeType === key
//                   ? "border-slate-300 bg-slate-50 shadow-md"
//                   : "border-slate-200 bg-white hover:border-slate-300"
//               }`}
//             >
//               <div
//                 className={`mb-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-bold ${t.badge}`}
//               >
//                 {t.icon}
//                 {wf.label}
//               </div>
//               <LiveFlowChart
//                 getValue={wf.getValue}
//                 color={t.stroke}
//                 clockRef={clockRef}
//                 height={110}
//                 historySeconds={5}
//               />
//             </button>
//           );
//         })}
//       </div>

//       {/* نمودار بزرگ حالت انتخابی + جزئیات */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//         <div
//           className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold ${theme.badge}`}
//         >
//           {theme.icon}
//           {current.label}
//         </div>

//         <LiveFlowChart
//           getValue={current.getValue}
//           color={theme.stroke}
//           clockRef={clockRef}
//           height={220}
//           historySeconds={8}
//         />

//         <p className="mt-4 text-sm leading-relaxed text-slate-600">
//           {current.summary}
//         </p>
//       </div>

//       <div className="mt-6 grid gap-4 md:grid-cols-3">
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">
//             ویژگی‌های موج
//           </h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.features.map((f, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-teal-600">•</span>
//                 {f}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">علل احتمالی</h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.causes.map((c, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-amber-600">•</span>
//                 {c}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <h3 className="mb-3 text-sm font-bold text-slate-900">
//             اقدام بالینی
//           </h3>
//           <ul className="space-y-2 text-sm text-slate-600">
//             {current.action.map((a, i) => (
//               <li key={i} className="flex gap-2">
//                 <span className="text-red-600">•</span>
//                 {a}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FlowTimePage;
"use client";

import { useState } from "react";
import { LuWaves } from "react-icons/lu";

const COLOR = "#34D399";
const VIEWBOX = "0 0 600 220";
const CYCLE_WIDTH = 300;
const BASELINE_Y = 110;

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
  { key: "overdistension", label: "بیش‌اتساعی" },
];

const VARIANTS = {
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
  overdistension: {
    path: "M0,110 C8,110 15,42 30,38 C55,34 85,45 110,65 C125,80 132,95 138,108 L182,108 C185,170 195,185 205,180 C225,168 245,140 270,120 C285,108 292,110 300,110",
    readouts: [
      { label: "Peak Flow", value: "60", unit: "L/min" },
      { label: "Zero-Flow Period", value: "طولانی", unit: "" },
      { label: "Rate", value: "14", unit: "/min" },
    ],
    note: "جریان دمی پیش از پایان زمان دم تنظیم‌شده به صفر می‌رسد و برای بقیه‌ی آن مدت صاف باقی می‌ماند — نشانه‌ی رسیدن ریه به سقف اتساع (Overdistension) است.",
  },
};

const CLINICAL = [
  "تشخیص Auto PEEP",
  "بررسی کامل شدن بازدم",
  "تشخیص Air Leak",
  "بررسی Trigger",
  "تشخیص Overdistension",
];

function FlowTimeChart({ variant }) {
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
              id="flowtime-grid"
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
              id="flowtime-glow"
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
            <path id="flowtime-cycle" d={variant.path} fill="none" />
          </defs>

          <rect width="100%" height="100%" fill="url(#flowtime-grid)" />

          <line
            x1="0"
            y1={BASELINE_Y}
            x2="600"
            y2={BASELINE_Y}
            stroke="rgba(148,163,184,0.18)"
          />

          <g className="flowtime-scroll" style={{ "--cw": `${CYCLE_WIDTH}px` }}>
            <use
              href="#flowtime-cycle"
              x="0"
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#flowtime-glow)"
            />
            <use
              href="#flowtime-cycle"
              x={CYCLE_WIDTH}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#flowtime-glow)"
            />
            <use
              href="#flowtime-cycle"
              x={CYCLE_WIDTH * 2}
              stroke={COLOR}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#flowtime-glow)"
            />
          </g>
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${COLOR}22` }}
      >
        <span>زمان (ثانیه)</span>
        <span>جریان (L/min)</span>
      </div>

      <style>{`
        .flowtime-scroll {
          animation: flowtime-scroll-left 2.6s linear infinite;
        }
        @keyframes flowtime-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--cw) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flowtime-scroll { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function FlowTimePage() {
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
                <LuWaves style={{ color: COLOR }} size={28} />
                جریان بر حسب زمان
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Flow-Time Waveform
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
            نمودار Flow-Time جریان دم و بازدم را نشان می‌دهد و برای تشخیص Air
            Trapping، نشتی و بیش‌اتساعی آلوئولی کاربرد دارد.
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

        <FlowTimeChart key={scenario} variant={variant} />

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
