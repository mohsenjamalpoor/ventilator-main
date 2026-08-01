// "use client";

// import React, { useState } from "react";
// import {
//   LuGauge,
//   LuStethoscope,
//   LuTriangleAlert,
//   LuActivity,
//   LuWind,
//   LuBookOpen,
//   LuClock,
// } from "react-icons/lu";
// import { FaLungs } from "react-icons/fa";
// import { FaRegLightbulb } from "react-icons/fa";

// const TRIGGER_TYPES = [
//   {
//     id: "flow",
//     label: "تریگر جریانی (Flow Trigger)",
//     desc: "رایج‌ترین روش در ونتیلاتورهای مدرن",
//     icon: <LuWind size={20} />,
//   },
//   {
//     id: "pressure",
//     label: "تریگر فشاری (Pressure Trigger)",
//     desc: "روش سنتی، همچنان کاربرد دارد",
//     icon: <LuGauge size={20} />,
//   },
//   {
//     id: "dual",
//     label: "تریگر ترکیبی (Dual Trigger)",
//     desc: "ترکیب فشار و جریان برای حساسیت بیشتر",
//     icon: <LuActivity size={20} />,
//   },
// ];

// const DETAILS = {
//   flow: {
//     mechanism: "تشخیص جریان دمیده‌شده از مدار توسط بیمار",
//     sensitivity: "حساسیت بالا (۰.۵-۲ L/min)",
//     advantage: "مناسب برای نوزادان و کودکان با تلاش تنفسی ضعیف",
//     disadvantage: "ممکن است با نشتی مدار تداخل داشته باشد",
//     pediatric: "تنظیم ۱-۱.۵ L/min در نوزادان، ۲-۳ L/min در کودکان",
//     clinical_tip: "در بیماران با Auto-PEEP، تریگر جریانی عملکرد بهتری دارد",
//   },
//   pressure: {
//     mechanism: "تشخیص کاهش فشار مدار هنگام تلاش بیمار",
//     sensitivity: "حساسیت پایین‌تر (۱-۳ cmH2O)",
//     advantage: "ساده و قابل اعتماد در اکثر موارد",
//     disadvantage: "تأخیر بیشتر در پاسخ‌دهی به تلاش بیمار",
//     pediatric: "تنظیم ۱-۲ cmH2O در کودکان، حداکثر ۳ cmH2O",
//     clinical_tip: "در نشتی مدار، تریگر فشاری ممکن است فعال نشود",
//   },
//   dual: {
//     mechanism: "هر کدام از دو روش زودتر تشخیص دهد فعال می‌شود",
//     sensitivity: "بیشترین حساسیت ممکن",
//     advantage: "بهترین عملکرد در شرایط بالینی پیچیده",
//     disadvantage: "ریسک Auto-triggering در صورت تنظیم نامناسب",
//     pediatric: "ترکیب Flow 1 L/min + Pressure 1 cmH2O در نوزادان",
//     clinical_tip: "مناسب برای بیماران با ناهماهنگی بیمار-ونتیلاتور",
//   },
// };

// const CLINICAL_SCENARIOS = [
//   {
//     title: "نوزاد نارس با RDS",
//     desc: "از Flow Trigger با حساسیت ۱-۱.۵ L/min شروع کنید",
//     icon: <FaLungs size={16} />,
//   },
//   {
//     title: "کودک با آسم شدید",
//     desc: "در صورت Auto-PEEP، از Flow Trigger استفاده کنید",
//     icon: <LuWind size={16} />,
//   },
//   {
//     title: "بیماری عصبی-عضلانی",
//     desc: "از Dual Trigger با تنظیمات حساس استفاده کنید",
//     icon: <LuActivity size={16} />,
//   },
// ];

// const COLOR = "#8B5CF6";
// const COLOR_WARN = "#F59E0B";

// export default function TriggerSensitivityPage() {
//   const [activeTrigger, setActiveTrigger] = useState("flow");
//   const detail = DETAILS[activeTrigger];
//   const trigger = TRIGGER_TYPES.find((t) => t.id === activeTrigger);

//   return (
//     <div
//       dir="rtl"
//       className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
//     >
//       <div className="mx-auto max-w-5xl space-y-6">
//         {/* Header */}
//         <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div>
//               <span
//                 className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
//                 style={{ backgroundColor: `${COLOR}1A`, color: COLOR }}
//               >
//                 PEDIATRIC MECHANICAL VENTILATION
//               </span>
//               <h1 className="flex items-center gap-3 text-3xl font-black text-white md:text-4xl">
//                 <LuActivity style={{ color: COLOR }} size={28} />
//                 حساسیت تریگر
//               </h1>
//               <p className="mt-1 font-mono text-sm text-slate-500">
//                 Trigger Sensitivity · مبنای هماهنگی بیمار-ونتیلاتور
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center">
//                 <div className="font-mono text-[10px] text-slate-500">
//                   حساسیت پایه
//                 </div>
//                 <div
//                   className="font-mono text-sm font-bold leading-tight"
//                   style={{ color: COLOR }}
//                 >
//                   {activeTrigger === "flow"
//                     ? "۱-۲"
//                     : activeTrigger === "pressure"
//                       ? "۱-۳"
//                       : "۱+۱"}
//                   <span className="mr-1 text-xs text-slate-500">
//                     {activeTrigger === "flow"
//                       ? "L/min"
//                       : activeTrigger === "pressure"
//                         ? "cmH2O"
//                         : "dual"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <p className="mt-6 text-base leading-8 text-slate-400">
//             تریگر یا ماشه، عاملی است که ونتیلاتور را به دمیدن سیکل تنفسی بعدی
//             وادار می‌کند. انتخاب صحیح حساسیت تریگر، کلید هماهنگی مطلوب
//             بیمار-ونتیلاتور و کاهش کار تنفسی است.
//           </p>

//           <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
//             {TRIGGER_TYPES.map((t) => {
//               const active = activeTrigger === t.id;
//               return (
//                 <button
//                   key={t.id}
//                   type="button"
//                   onClick={() => setActiveTrigger(t.id)}
//                   className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
//                   style={{
//                     backgroundColor: active ? COLOR : "#161B26",
//                     color: active ? "#060910" : "#94A3B8",
//                     transform: active ? "scale(1.02)" : "scale(1)",
//                     boxShadow: active ? `0 0 20px ${COLOR}44` : "none",
//                   }}
//                 >
//                   {t.icon}
//                   {t.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Trigger Details */}
//         <div className="grid gap-6 md:grid-cols-3">
//           <div className="md:col-span-2">
//             <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <span
//                   className="rounded-xl bg-indigo-500/20 p-2"
//                   style={{ color: COLOR }}
//                 >
//                   {trigger.icon}
//                 </span>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">
//                     {trigger.label}
//                   </h2>
//                   <p className="text-sm text-slate-500">{trigger.desc}</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <div className="rounded-xl border border-slate-800 bg-black/20 p-4">
//                     <div className="text-xs text-slate-500">مکانیسم</div>
//                     <div className="mt-1 text-sm text-slate-200">
//                       {detail.mechanism}
//                     </div>
//                   </div>
//                   <div className="rounded-xl border border-slate-800 bg-black/20 p-4">
//                     <div className="text-xs text-slate-500">حساسیت</div>
//                     <div className="mt-1 text-sm text-slate-200">
//                       {detail.sensitivity}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
//                     <div className="flex items-center gap-2 text-xs text-emerald-400">
//                       <span className="text-lg">✓</span>
//                       <span>مزیت</span>
//                     </div>
//                     <div className="mt-1 text-sm text-slate-300">
//                       {detail.advantage}
//                     </div>
//                   </div>
//                   <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
//                     <div className="flex items-center gap-2 text-xs text-rose-400">
//                       <span className="text-lg">✗</span>
//                       <span>محدودیت</span>
//                     </div>
//                     <div className="mt-1 text-sm text-slate-300">
//                       {detail.disadvantage}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
//                   <div className="flex items-center gap-2 text-xs text-sky-400">
//                     <LuStethoscope size={14} />
//                     <span>تنظیم در کودکان</span>
//                   </div>
//                   <div className="mt-1 text-sm text-slate-300">
//                     {detail.pediatric}
//                   </div>
//                 </div>

//                 <div
//                   className="flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-6"
//                   style={{
//                     borderColor: `${COLOR_WARN}33`,
//                     backgroundColor: `${COLOR_WARN}0D`,
//                     color: "#FCD34D",
//                   }}
//                 >
//                   <FaRegLightbulb size={16} className="mt-0.5 shrink-0" />
//                   <span>{detail.clinical_tip}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* سناریوهای بالینی */}
//           <div className="space-y-4">
//             <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40">
//               <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
//                 <LuClock size={16} style={{ color: COLOR }} />
//                 سناریوهای بالینی
//               </h3>
//               <div className="space-y-3">
//                 {CLINICAL_SCENARIOS.map((s) => (
//                   <div
//                     key={s.title}
//                     className="rounded-xl border border-slate-800 bg-black/20 p-3 transition hover:border-indigo-500/30"
//                   >
//                     <div className="flex items-center gap-2 mb-1">
//                       <span style={{ color: COLOR }}>{s.icon}</span>
//                       <span className="text-sm font-semibold text-slate-200">
//                         {s.title}
//                       </span>
//                     </div>
//                     <p className="text-xs text-slate-500 leading-5">{s.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4">
//               <div className="flex items-start gap-3">
//                 <LuTriangleAlert
//                   className="text-amber-400 mt-0.5 shrink-0"
//                   size={16}
//                 />
//                 <div>
//                   <h4 className="text-xs font-bold text-amber-400">
//                     نکته ایمنی
//                   </h4>
//                   <p className="mt-1 text-xs text-amber-300/70 leading-5">
//                     تنظیم بیش‌ازحد حساس تریگر (اعداد پایین) باعث Auto-triggering
//                     و افزایش تعداد تنفس ناخواسته می‌شود.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* آموزش سریع */}
//         <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-indigo-950/40 to-slate-900/40 p-6 shadow-2xl shadow-black/40 md:p-8">
//           <div className="flex items-center gap-3 mb-6">
//             <LuBookOpen style={{ color: COLOR }} size={20} />
//             <h2 className="text-xl font-bold text-white">
//               آموزش سریع در ۳ قدم
//             </h2>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
//               <div
//                 className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
//                 style={{ backgroundColor: COLOR, color: "#060910" }}
//               >
//                 ۱
//               </div>
//               <h4 className="mt-2 text-sm font-bold text-white">
//                 تشخیص نوع تریگر
//               </h4>
//               <p className="mt-1 text-xs text-slate-500 leading-5">
//                 بر اساس وضعیت بیمار، Flow یا Pressure یا Dual را انتخاب کنید
//               </p>
//             </div>

//             <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
//               <div
//                 className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
//                 style={{ backgroundColor: COLOR, color: "#060910" }}
//               >
//                 ۲
//               </div>
//               <h4 className="mt-2 text-sm font-bold text-white">
//                 تنظیم حساسیت
//               </h4>
//               <p className="mt-1 text-xs text-slate-500 leading-5">
//                 از پایین‌ترین حد شروع کنید و به‌تدریج افزایش دهید تا بیمار تلاش
//                 کند
//               </p>
//             </div>

//             <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
//               <div
//                 className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
//                 style={{ backgroundColor: COLOR, color: "#060910" }}
//               >
//                 ۳
//               </div>
//               <h4 className="mt-2 text-sm font-bold text-white">پایش پاسخ</h4>
//               <p className="mt-1 text-xs text-slate-500 leading-5">
//                 هماهنگی بیمار، کاپنوگرافی و کار تنفسی را ارزیابی کنید
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* نکته کلیدی */}
//         <div
//           className="flex items-start gap-3 rounded-2xl border px-5 py-4 text-xs leading-6"
//           style={{
//             borderColor: `${COLOR}33`,
//             backgroundColor: `${COLOR}0D`,
//             color: "#C4B5FD",
//           }}
//         >
//           <LuStethoscope
//             size={16}
//             className="mt-0.5 shrink-0"
//             style={{ color: COLOR }}
//           />
//           <span>
//             <strong className="text-white">نکته فوق‌تخصصی:</strong> در کودکان با
//             افزایش مقاومت راه هوایی (مثل آسم)، تریگر جریانی نسبت به تریگر فشاری
//             عملکرد بهتری دارد زیرا با Auto-PEEP تداخل کمتری دارد. همیشه قبل از
//             تنظیم تریگر، Auto-PEEP را با انجام End-Expiratory Hold اندازه‌گیری
//             کنید.
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import {
//   LuZap,
//   LuActivity,
//   LuGauge,
//   LuWind,
//   LuTriangleAlert,
//   LuBookOpen,
//   LuTrendingUp,
//   LuTrendingDown,
//   LuBaby,
//   LuInfo,
//   LuArrowLeftRight,
// } from "react-icons/lu";

// // ---------------------------------------------------------------------
// // Static reference data
// // ---------------------------------------------------------------------

// const AGE_REFERENCE = [
//   {
//     group: "نوزاد نارس / ترم",
//     weight: "کمتر از ۵ کیلوگرم",
//     flow: "۰.۵ تا ۱ L/min",
//     pressure: "۰.۵- تا ۱- cmH2O",
//     note: "حساس‌ترین تنظیم؛ ریسک بالای عدم‌تشخیص تلاش تنفسی به‌دلیل جریان ضعیف نوزاد",
//   },
//   {
//     group: "شیرخوار",
//     weight: "۵ تا ۱۰ کیلوگرم",
//     flow: "۱ تا ۱.۵ L/min",
//     pressure: "۱- تا ۱.۵- cmH2O",
//     note: "لوله بدون کاف رایج است؛ نشتی دور لوله محتمل‌ترین علت تریگر خودکار",
//   },
//   {
//     group: "کودک خردسال",
//     weight: "۱۰ تا ۲۰ کیلوگرم",
//     flow: "۱.۵ تا ۲ L/min",
//     pressure: "۱.۵- تا ۲- cmH2O",
//     note: "شروع دوره گذار به تنظیمات نزدیک به بزرگسال",
//   },
//   {
//     group: "کودک بزرگ‌تر / نوجوان",
//     weight: "بیشتر از ۲۰ کیلوگرم",
//     flow: "۲ تا ۳ L/min",
//     pressure: "۲- cmH2O",
//     note: "مشابه بازه استاندارد بزرگسالان قابل استفاده است",
//   },
// ];

// const PROBLEMS = [
//   {
//     key: "auto",
//     title: "تریگر خودکار (Auto-triggering)",
//     icon: LuTrendingUp,
//     tone: "امکان تریگر بیش از حد حساس",
//     causes: [
//       "چگالش آب در لوله مدار (water condensation)",
//       "نشتی دور لوله بدون کاف",
//       "نوسانات قلبی منتقل‌شده به مدار (cardiogenic oscillations)",
//       "ترشحات متحرک در راه هوایی یا لوله تراشه",
//     ],
//     consequences: [
//       "هایپرونتیلاسیون و آلکالوز تنفسی",
//       "افزایش auto-PEEP و به‌دام‌افتادن هوا (air trapping)",
//       "عدم‌هماهنگی بیمار-ونتیلاتور و افزایش کار تنفسی مصرفی بیهوده",
//     ],
//     fix: "کاهش حساسیت تریگر، تخلیه آب مدار، بررسی نشتی کاف/لوله، فعال‌سازی جبران نشتی (leak compensation) در صورت وجود",
//   },
//   {
//     key: "missed",
//     title: "عدم‌تشخیص تریگر (Missed / Ineffective triggering)",
//     icon: LuTrendingDown,
//     tone: "امکان تریگر بیش از حد نامناسب (غیرحساس)",
//     causes: [
//       "تنظیم حساسیت بسیار بالا (عدد بزرگ‌تر از نیاز بیمار)",
//       "auto-PEEP موجود که بار اضافی برای شروع تریگر ایجاد می‌کند",
//       "ضعف عضلات تنفسی یا خستگی دیافراگم در بیمار",
//     ],
//     consequences: [
//       "افزایش کار تنفسی بیمار (WOB) و ریسک خستگی",
//       "ناراحتی و عدم‌هماهنگی بیمار-ونتیلاتور (dyssynchrony)",
//       "تأخیر در حمایت تنفسی هنگام نیاز واقعی بیمار",
//     ],
//     fix: "افزایش حساسیت تریگر، بررسی و اصلاح auto-PEEP، ترجیح تریگر جریانی در بیماران با تلاش تنفسی ضعیف",
//   },
// ];

// // ---------------------------------------------------------------------
// // Small building blocks
// // ---------------------------------------------------------------------

// function SectionHeading({ icon: Icon, eyebrow, title }) {
//   return (
//     <div className="flex items-center gap-3 mb-5">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
//         <Icon className="h-5 w-5" />
//       </div>
//       <div>
//         {eyebrow && (
//           <div className="text-xs font-medium text-cyan-600 tracking-wide">
//             {eyebrow}
//           </div>
//         )}
//         <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//       </div>
//     </div>
//   );
// }

// function TriggerWaveform({ mode }) {
//   // mode: "pressure" | "flow"
//   const isPressure = mode === "pressure";
//   return (
//     <svg viewBox="0 0 480 180" className="w-full h-auto">
//       <line x1="20" y1="90" x2="460" y2="90" stroke="#CBD5E1" strokeWidth="1" />
//       <line x1="20" y1="20" x2="20" y2="160" stroke="#CBD5E1" strokeWidth="1" />

//       {/* baseline curve */}
//       <path
//         d="M20,90 C 90,90 120,90 150,90"
//         fill="none"
//         stroke="#94A3B8"
//         strokeWidth="2"
//       />

//       {/* patient effort dip (the trigger signal) */}
//       <path
//         d={
//           isPressure
//             ? "M150,90 C 165,90 175,118 190,122 C 205,126 215,100 225,90"
//             : "M150,90 C 165,90 175,108 190,112 C 205,116 215,98 225,90"
//         }
//         fill="none"
//         stroke="#0891B2"
//         strokeWidth="2.5"
//       />

//       {/* threshold line */}
//       <line
//         x1="20"
//         y1={isPressure ? 108 : 102}
//         x2="460"
//         y2={isPressure ? 108 : 102}
//         stroke="#F59E0B"
//         strokeWidth="1.5"
//         strokeDasharray="6 4"
//       />
//       <text x="360" y={isPressure ? 122 : 96} fontSize="11" fill="#B45309">
//         آستانه تریگر
//       </text>

//       {/* trigger point marker */}
//       <circle cx="196" cy={isPressure ? 124 : 113} r="4" fill="#0891B2" />
//       <line
//         x1="196"
//         y1={isPressure ? 124 : 113}
//         x2="196"
//         y2="150"
//         stroke="#0891B2"
//         strokeWidth="1"
//         strokeDasharray="3 3"
//       />
//       <text x="150" y="166" fontSize="11" fill="#0E7490">
//         لحظه شروع دم توسط ونتیلاتور
//       </text>

//       {/* ventilator-delivered breath after trigger */}
//       <path
//         d="M225,90 C 240,40 260,30 280,30 C 300,30 320,60 335,90"
//         fill="none"
//         stroke="#0E7490"
//         strokeWidth="2.5"
//       />
//       <path
//         d="M335,90 C 380,90 420,90 460,90"
//         fill="none"
//         stroke="#94A3B8"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// // ---------------------------------------------------------------------
// // Main page
// // ---------------------------------------------------------------------

// export default function TriggerSensitivityPage() {
//   const [triggerType, setTriggerType] = useState("flow");

//   return (
//     <div
//       dir="rtl"
//       className="min-h-screen bg-slate-50 font-sans text-slate-800"
//     >
//       <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
//         {/* ---------------- Header ---------------- */}
//         <div className="mb-8 flex items-start gap-4">
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-200">
//             <LuZap className="h-7 w-7" />
//           </div>
//           <div>
//             <div className="text-xs font-semibold text-cyan-600 mb-1">
//               پارامترهای ونتیلاتور · Trigger Sensitivity
//             </div>
//             <h1 className="text-2xl font-extrabold text-slate-900">
//               حساسیت تریگر
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               کمترین تلاش تنفسی بیمار برای شروع یک نفس کمکی از سوی ونتیلاتور
//             </p>
//           </div>
//         </div>

//         {/* ---------------- Definition ---------------- */}
//         <div className="mb-6 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
//           <div className="flex gap-3">
//             <LuInfo className="h-5 w-5 shrink-0 text-cyan-600 mt-0.5" />
//             <p className="text-sm leading-7 text-slate-700">
//               حساسیت تریگر آستانه‌ای است که ونتیلاتور برای{" "}
//               <span className="font-semibold text-cyan-700">
//                 تشخیص تلاش تنفسی خودانگیخته بیمار
//               </span>{" "}
//               روی آن تنظیم می‌شود. هر بار که فشار یا جریان مدار به‌اندازه این
//               آستانه افت کند، دستگاه آن را به‌عنوان شروع دم بیمار تفسیر کرده و
//               یک نفس کمکی تحویل می‌دهد. تنظیم دقیق این پارامتر مستقیماً روی{" "}
//               <span className="font-semibold">کار تنفسی بیمار</span> و{" "}
//               <span className="font-semibold">هماهنگی بیمار-ونتیلاتور</span> اثر
//               می‌گذارد و در کودکان به‌دلیل جریان‌های تنفسی کوچک‌تر، اهمیتی
//               دوچندان دارد.
//             </p>
//           </div>
//         </div>

//         {/* ---------------- Two trigger types ---------------- */}
//         <section className="mb-8">
//           <SectionHeading
//             icon={LuArrowLeftRight}
//             eyebrow="دو مکانیسم اصلی"
//             title="تریگر فشاری در برابر تریگر جریانی"
//           />

//           <div className="mb-4 inline-flex rounded-xl bg-slate-100 p-1">
//             <button
//               onClick={() => setTriggerType("flow")}
//               className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
//                 triggerType === "flow"
//                   ? "bg-white text-cyan-700 shadow-sm"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               تریگر جریانی (Flow)
//             </button>
//             <button
//               onClick={() => setTriggerType("pressure")}
//               className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
//                 triggerType === "pressure"
//                   ? "bg-white text-cyan-700 shadow-sm"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               تریگر فشاری (Pressure)
//             </button>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-white p-5">
//             <div className="mb-4 rounded-xl bg-slate-50 p-4">
//               <TriggerWaveform mode={triggerType} />
//             </div>

//             {triggerType === "flow" ? (
//               <div className="space-y-3 text-sm leading-7 text-slate-700">
//                 <p>
//                   ونتیلاتور یک جریان پایه (base flow) در مدار برقرار می‌کند.
//                   هرگاه بیمار تلاش دمی کند، بخشی از این جریان را «می‌مکد» و
//                   تفاوت بین جریان ورودی و خروجی مدار افت می‌کند. رسیدن این افت
//                   به آستانه تعیین‌شده (معمولاً{" "}
//                   <span className="font-semibold text-cyan-700">
//                     ۱ تا ۳ L/min
//                   </span>
//                   ) باعث تریگر می‌شود.
//                 </p>
//                 <p>
//                   به‌دلیل زمان پاسخ کوتاه‌تر،{" "}
//                   <span className="font-semibold">
//                     کار تنفسی کمتری از بیمار می‌گیرد
//                   </span>{" "}
//                   و در بیشتر بیماران اطفال به‌عنوان روش ارجح توصیه می‌شود.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3 text-sm leading-7 text-slate-700">
//                 <p>
//                   دستگاه فشار پایه مدار (معمولاً سطح PEEP) را پایش می‌کند. تلاش
//                   دمی بیمار باعث افت فشار مدار می‌شود؛ رسیدن این افت به آستانه
//                   تعیین‌شده (معمولاً{" "}
//                   <span className="font-semibold text-cyan-700">
//                     ۰.۵- تا ۲- cmH2O
//                   </span>
//                   ) باعث تریگر می‌شود.
//                 </p>
//                 <p>
//                   به‌دلیل نیاز به ایجاد افت فشار قابل‌اندازه‌گیری در مدار،{" "}
//                   <span className="font-semibold">
//                     کار تنفسی بیشتری از بیمار می‌طلبد
//                   </span>{" "}
//                   و پاسخ آن کمی کندتر از تریگر جریانی است.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ---------------- Age reference table ---------------- */}
//         <section className="mb-8">
//           <SectionHeading
//             icon={LuBaby}
//             eyebrow="بازه‌های مرجع بر اساس سن"
//             title="تنظیمات پیشنهادی در جمعیت کودکان"
//           />
//           <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
//             <div className="overflow-x-auto">
//               <table className="w-full text-right text-sm">
//                 <thead>
//                   <tr className="bg-slate-50 text-slate-500">
//                     <th className="px-4 py-3 font-medium">گروه سنی</th>
//                     <th className="px-4 py-3 font-medium">وزن تقریبی</th>
//                     <th className="px-4 py-3 font-medium">تریگر جریانی</th>
//                     <th className="px-4 py-3 font-medium">تریگر فشاری</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {AGE_REFERENCE.map((row, i) => (
//                     <tr
//                       key={row.group}
//                       className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
//                     >
//                       <td className="px-4 py-3 font-medium text-slate-800">
//                         {row.group}
//                       </td>
//                       <td className="px-4 py-3 text-slate-600">{row.weight}</td>
//                       <td className="px-4 py-3 text-cyan-700 font-medium">
//                         {row.flow}
//                       </td>
//                       <td className="px-4 py-3 text-cyan-700 font-medium">
//                         {row.pressure}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mt-3 space-y-1.5 px-1">
//             {AGE_REFERENCE.map((row) => (
//               <p key={row.group} className="text-xs leading-6 text-slate-500">
//                 <span className="font-medium text-slate-600">{row.group}:</span>{" "}
//                 {row.note}
//               </p>
//             ))}
//           </div>
//         </section>

//         {/* ---------------- Problems: over vs under sensitive ---------------- */}
//         <section className="mb-8">
//           <SectionHeading
//             icon={LuTriangleAlert}
//             eyebrow="خطاهای شایع تنظیم"
//             title="تریگر بیش‌ازحد حساس در برابر کم‌حساس"
//           />
//           <div className="grid gap-4 sm:grid-cols-2">
//             {PROBLEMS.map((p) => (
//               <div
//                 key={p.key}
//                 className="rounded-2xl border border-slate-200 bg-white p-5"
//               >
//                 <div className="mb-3 flex items-center gap-2">
//                   <p.icon className="h-5 w-5 text-amber-600" />
//                   <h3 className="font-bold text-slate-800">{p.title}</h3>
//                 </div>
//                 <p className="mb-3 text-xs font-medium text-amber-700">
//                   {p.tone}
//                 </p>

//                 <p className="mb-1.5 text-xs font-semibold text-slate-500">
//                   علل شایع
//                 </p>
//                 <ul className="mb-3 space-y-1 text-sm leading-6 text-slate-700">
//                   {p.causes.map((c) => (
//                     <li key={c} className="flex gap-2">
//                       <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
//                       {c}
//                     </li>
//                   ))}
//                 </ul>

//                 <p className="mb-1.5 text-xs font-semibold text-slate-500">
//                   پیامد بالینی
//                 </p>
//                 <ul className="mb-3 space-y-1 text-sm leading-6 text-slate-700">
//                   {p.consequences.map((c) => (
//                     <li key={c} className="flex gap-2">
//                       <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
//                       {c}
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="rounded-xl bg-cyan-50 px-3 py-2 text-xs leading-6 text-cyan-800">
//                   <span className="font-semibold">اصلاح: </span>
//                   {p.fix}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ---------------- Teaching pearls ---------------- */}
//         <section className="mb-4">
//           <SectionHeading
//             icon={LuBookOpen}
//             eyebrow="نکات آموزشی"
//             title="نکات کلیدی   PICU"
//           />
//           <div className="space-y-3">
//             <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
//               <LuGauge className="h-5 w-5 shrink-0 text-cyan-600" />
//               <p className="text-sm leading-6 text-slate-700">
//                 در بیماران با auto-PEEP (مثل آسم یا برونشیولیت شدید)، تریگر کردن
//                 بسیار سخت‌تر می‌شود؛ ابتدا auto-PEEP را مدیریت کنید، نه فقط
//                 حساسیت تریگر را افزایش دهید.
//               </p>
//             </div>
//             <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
//               <LuWind className="h-5 w-5 shrink-0 text-cyan-600" />
//               <p className="text-sm leading-6 text-slate-700">
//                 در لوله‌های تراشه بدون کاف، نشتی دور لوله شایع‌ترین علت تریگر
//                 خودکار در اطفال است؛ پیش از تغییر حساسیت تریگر، نشتی مدار را رد
//                 کنید.
//               </p>
//             </div>
//             <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
//               <LuActivity className="h-5 w-5 shrink-0 text-cyan-600" />
//               <p className="text-sm leading-6 text-slate-700">
//                 تریگر مکرر و نامنظم روی موج فشار-زمان یا جریان-زمان (بدون الگوی
//                 تنفسی واضح بیمار) نشانه تریگر خودکار است؛ تریگر مکرر هم‌زمان با
//                 ضربان قلب مطرح‌کننده انتقال نوسانات قلبی است.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import {
  LuGauge,
  LuStethoscope,
  LuTriangleAlert,
  LuActivity,
  LuWind,
  LuBookOpen,
  LuClock,
  LuBaby,
  LuTrendingUp,
  LuTrendingDown,
} from "react-icons/lu";
import { FaLungs, FaRegLightbulb } from "react-icons/fa";

// ---------------------------------------------------------------------
// Design tokens (light theme)
// ---------------------------------------------------------------------
const COLOR = "#7C3AED"; // violet — primary accent
const COLOR_WARN = "#D97706"; // amber — caution / over-sensitive
const COLOR_GOOD = "#059669"; // emerald — advantage
const COLOR_BAD = "#DC2626"; // rose — disadvantage / risk
const COLOR_INFO = "#0284C7"; // sky — pediatric / reference
const BG = "#F8FAFC"; // light background
const CARD_BG = "#FFFFFF";
const BORDER = "#E2E8F0";
const TEXT_PRIMARY = "#0F172A";
const TEXT_SECONDARY = "#475569";
const TEXT_MUTED = "#94A3B8";

// ---------------------------------------------------------------------
// Reference data (unchanged)
// ---------------------------------------------------------------------

const TRIGGER_TYPES = [
  {
    id: "flow",
    label: "تریگر جریانی (Flow Trigger)",
    desc: "استاندارد ارجح در بیشتر ونتیلاتورهای اطفال",
    icon: <LuWind size={20} />,
  },
  {
    id: "pressure",
    label: "تریگر فشاری (Pressure Trigger)",
    desc: "روش سنتی، هنوز در برخی دستگاه‌ها پیش‌فرض است",
    icon: <LuGauge size={20} />,
  },
  {
    id: "dual",
    label: "تریگر دوگانه (Dual/Combined)",
    desc: "هرکدام از دو مکانیسم زودتر رخ دهد فعال می‌شود",
    icon: <LuActivity size={20} />,
  },
];

const DETAILS = {
  flow: {
    range: "۱ تا ۳",
    unit: "L/min",
    mechanism:
      "دستگاه یک جریان پایه (bias/base flow) در مدار برقرار و پیوسته پایش می‌کند. تلاش دمی بیمار بخشی از این جریان را جذب می‌کند؛ افت جریان برگشتی به میزان آستانهٔ تنظیم‌شده، به‌عنوان تریگر تفسیر می‌شود.",
    sensitivity:
      "آستانهٔ رایج: ۱ تا ۳ L/min (در نوزادان معمولاً ۰.۵ تا ۱.۵ L/min)",
    advantage:
      "زمان پاسخ کوتاه‌تر (کمتر از ۱۰۰ میلی‌ثانیه) و کار تنفسی کمتر تحمیلی به بیمار؛ ترجیح اول در اکثر بیماران اطفال",
    disadvantage:
      "در نشتی قابل‌توجه مدار (لوله بدون کاف)، ممکن است به‌اشتباه به‌عنوان تلاش بیمار تفسیر شود",
    pediatric:
      "نوزاد: ۰.۵–۱ L/min · شیرخوار: ۱–۱.۵ L/min · کودک بزرگ‌تر: ۱.۵–۳ L/min",
    clinicalTip:
      "در بیماران با auto-PEEP (آسم، برونشیولیت)، تریگر جریانی نسبت به فشاری عملکرد بهتری دارد چون به بار اضافی فشار برای شروع تریگر وابسته نیست.",
  },
  pressure: {
    range: "۰.۵- تا ۲-",
    unit: "cmH2O",
    mechanism:
      "دستگاه فشار پایه مدار (سطح PEEP تنظیم‌شده) را پایش می‌کند. تلاش دمی بیمار باعث افت گذرای فشار مدار می‌شود؛ رسیدن این افت به آستانهٔ تعیین‌شده تریگر را فعال می‌کند.",
    sensitivity:
      "آستانهٔ رایج: ۰.۵- تا ۲- cmH2O (معمولاً ۱- تا ۱.۵- cmH2O در کودکان)",
    advantage:
      "ساده، پایدار و کمتر تحت‌تأثیر نشتی کوچک مدار نسبت به تریگر جریانی",
    disadvantage:
      "پاسخ کندتر و نیاز به تولید افت فشار قابل‌اندازه‌گیری؛ کار تنفسی بیشتری از بیمار می‌طلبد",
    pediatric:
      "معمولاً ۰.۵- تا ۲- cmH2O در تمام گروه‌های سنی کودکان قابل استفاده است",
    clinicalTip:
      "در بیماران با ضعف عضلات تنفسی یا خستگی دیافراگم، تریگر فشاری ممکن است باعث تلاش‌های ناکارآمد (ineffective effort) شود؛ تریگر جریانی را در نظر بگیرید.",
  },
  dual: {
    range: "بسته به دستگاه",
    unit: "flow + pressure",
    mechanism:
      "برخی ونتیلاتورها هر دو سیگنال جریان و فشار را هم‌زمان پایش می‌کنند و هر کدام زودتر به آستانه برسد، تریگر را فعال می‌کند؛ به‌عنوان لایهٔ ایمنی در برابر خطای یک سیگنال طراحی شده است.",
    sensitivity:
      "معمولاً تنظیم پایه هر دو پارامتر هم‌زمان روی مقادیر استاندارد نگه داشته می‌شود",
    advantage:
      "کاهش ریسک عدم‌تشخیص تریگر در شرایطی که یک سیگنال (مثلاً به‌دلیل نشتی) دچار خطا شود",
    disadvantage:
      "ریسک بالاتر تریگر خودکار در صورت تنظیم هم‌زمان حساس؛ نیازمند دقت بیشتر در پایش",
    pediatric:
      "کاربرد محدودتر؛ معمولاً در بیماران با ناهماهنگی مقاوم بیمار-ونتیلاتور در نظر گرفته می‌شود",
    clinicalTip:
      "پیش از فعال‌سازی تریگر دوگانه، مطمئن شوید علت اصلی ناهماهنگی (نشتی، auto-PEEP، تأخیر مدار) بررسی و در صورت امکان اصلاح شده باشد.",
  },
};

const AGE_REFERENCE = [
  {
    group: "نوزاد",
    weight: "کمتر از ۵ کیلوگرم",
    flow: "۰.۵–۱ L/min",
    pressure: "۰.۵- تا ۱- cmH2O",
  },
  {
    group: "شیرخوار",
    weight: "۵–۱۰ کیلوگرم",
    flow: "۱–۱.۵ L/min",
    pressure: "۱- تا ۱.۵- cmH2O",
  },
  {
    group: "کودک خردسال",
    weight: "۱۰–۲۰ کیلوگرم",
    flow: "۱.۵–۲ L/min",
    pressure: "۱.۵- تا ۲- cmH2O",
  },
  {
    group: "کودک بزرگ‌تر",
    weight: "بیش از ۲۰ کیلوگرم",
    flow: "۲–۳ L/min",
    pressure: "۲- cmH2O",
  },
];

const CLINICAL_SCENARIOS = [
  {
    title: "نوزاد نارس با RDS",
    desc: "تریگر جریانی با حساسیت ۰.۵–۱ L/min؛ تلاش تنفسی نوزاد ضعیف و جریان کم است",
    icon: <FaLungs size={16} />,
  },
  {
    title: "کودک با آسم/برونشیولیت شدید",
    desc: "auto-PEEP را ابتدا با End-Expiratory Hold ارزیابی کنید؛ تریگر جریانی ارجح است",
    icon: <LuWind size={16} />,
  },
  {
    title: "بیماری عصبی-عضلانی با ضعف تلاش",
    desc: "تریگر جریانی حساس یا دوگانه؛ ریسک تریگر ناکارآمد بالاست",
    icon: <LuActivity size={16} />,
  },
  {
    title: "لولهٔ تراشهٔ بدون کاف با نشتی",
    desc: "پیش از تغییر حساسیت، نشتی مدار را رد یا جبران نشتی را فعال کنید",
    icon: <LuGauge size={16} />,
  },
];

const MALFUNCTION = [
  {
    key: "auto",
    title: "تریگر خودکار (Auto-triggering)",
    subtitle: "حساسیت بیش‌ازحد بالا",
    icon: LuTrendingUp,
    color: COLOR_WARN,
    causes: [
      "چگالش آب در لوله‌های مدار",
      "نشتی دور لولهٔ بدون کاف",
      "انتقال نوسانات قلبی به مدار (cardiogenic oscillations)",
      "ترشحات متحرک در راه هوایی",
    ],
    consequence:
      "هایپرونتیلاسیون، افزایش auto-PEEP، به‌دام‌افتادن هوا و عدم‌هماهنگی بیمار-ونتیلاتور",
    fix: "کاهش حساسیت تریگر، تخلیهٔ آب مدار، رفع نشتی، فعال‌سازی جبران نشتی در صورت وجود",
  },
  {
    key: "missed",
    title: "عدم‌تشخیص تریگر (Missed/Ineffective)",
    subtitle: "حساسیت بیش‌ازحد پایین",
    icon: LuTrendingDown,
    color: COLOR_BAD,
    causes: [
      "تنظیم آستانهٔ تریگر بزرگ‌تر از تلاش واقعی بیمار",
      "auto-PEEP موجود که بار اضافی برای تریگر ایجاد می‌کند",
      "ضعف یا خستگی عضلات تنفسی بیمار",
    ],
    consequence:
      "افزایش کار تنفسی، ریسک خستگی دیافراگم، ناراحتی بیمار و تأخیر در حمایت تنفسی",
    fix: "افزایش حساسیت تریگر، مدیریت auto-PEEP، ترجیح تریگر جریانی در تلاش تنفسی ضعیف",
  },
];

// ---------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------

function TriggerWaveform({ mode }) {
  const dip = mode === "pressure" ? 122 : 112;
  const label = mode === "pressure" ? "افت فشار مدار" : "افت جریان برگشتی";
  return (
    <svg viewBox="0 0 480 170" className="w-full h-auto">
      <line x1="15" y1="85" x2="465" y2="85" stroke="#CBD5E1" strokeWidth="1" />
      <path
        d="M15,85 C 90,85 120,85 150,85"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <path
        d={`M150,85 C 165,85 175,${dip} 190,${dip + 4} C 205,${dip + 8} 215,95 225,85`}
        fill="none"
        stroke={COLOR}
        strokeWidth="2.5"
      />
      <line
        x1="15"
        y1={dip - 4}
        x2="465"
        y2={dip - 4}
        stroke={COLOR_WARN}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text x="355" y={dip - 9} fontSize="11" fill={COLOR_WARN}>
        آستانهٔ تریگر
      </text>
      <circle cx="197" cy={dip + 5} r="4" fill={COLOR} />
      <text x="235" y={dip + 30} fontSize="11" fill="#64748B">
        {label}
      </text>
      <path
        d="M225,85 C 240,32 260,22 280,22 C 300,22 320,55 335,85"
        fill="none"
        stroke={COLOR}
        strokeWidth="2.5"
      />
      <path
        d="M335,85 C 380,85 420,85 465,85"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <text x="250" y="15" fontSize="11" fill="#94A3B8">
        نفس تحویلی ونتیلاتور
      </text>
    </svg>
  );
}

export default function TriggerSensitivityPage() {
  const [activeTrigger, setActiveTrigger] = useState("flow");
  const detail = DETAILS[activeTrigger];
  const trigger = TRIGGER_TYPES.find((t) => t.id === activeTrigger);

  return (
    <div
      dir="rtl"
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div
          className="rounded-3xl border p-6 shadow-lg md:p-8"
          style={{
            borderColor: BORDER,
            backgroundColor: CARD_BG,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-black md:text-4xl">
                <LuActivity style={{ color: COLOR }} size={28} />
                <span style={{ color: TEXT_PRIMARY }}>حساسیت تریگر</span>
              </h1>
              <p
                className="mt-1 font-mono text-sm"
                style={{ color: TEXT_MUTED }}
              >
                Trigger Sensitivity · مبنای هماهنگی بیمار-ونتیلاتور
              </p>
            </div>

            <div
              className="rounded-xl border px-4 py-2 text-center"
              style={{ borderColor: BORDER, backgroundColor: BG }}
            >
              <div
                className="font-mono text-[10px]"
                style={{ color: TEXT_MUTED }}
              >
                آستانهٔ تنظیم‌شده
              </div>
              <div
                className="font-mono text-sm font-bold leading-tight"
                style={{ color: COLOR }}
              >
                {detail.range}
                <span className="mr-1 text-xs" style={{ color: TEXT_MUTED }}>
                  {detail.unit}
                </span>
              </div>
            </div>
          </div>

          <p
            className="mt-6 text-base leading-8"
            style={{ color: TEXT_SECONDARY }}
          >
            حساسیت تریگر، آستانه‌ای است که ونتیلاتور برای تشخیص شروع تلاش تنفسی
            خودانگیختهٔ بیمار روی آن تنظیم می‌شود. عبور جریان یا فشار مدار از
            این آستانه، یک نفس کمکی را فعال می‌کند. تنظیم درست این پارامتر
            مستقیماً روی کار تنفسی بیمار، هماهنگی بیمار-ونتیلاتور، و در نتیجه
            طول مدت حمایت تنفسی اثر می‌گذارد؛ به‌همین دلیل در کودکان با
            جریان‌های تنفسی کوچک اهمیتی دوچندان دارد.
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2 border-t pt-5"
            style={{ borderColor: BORDER }}
          >
            {TRIGGER_TYPES.map((t) => {
              const active = activeTrigger === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTrigger(t.id)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: active ? COLOR : "#F1F5F9",
                    color: active ? "#FFFFFF" : TEXT_SECONDARY,
                    transform: active ? "scale(1.02)" : "scale(1)",
                    boxShadow: active ? `0 0 20px ${COLOR}33` : "none",
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trigger Details + Scenarios */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div
              className="rounded-3xl border p-6 shadow-lg md:p-8"
              style={{
                borderColor: BORDER,
                backgroundColor: CARD_BG,
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="rounded-xl p-2"
                  style={{ backgroundColor: `${COLOR}15`, color: COLOR }}
                >
                  {trigger.icon}
                </span>
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {trigger.label}
                  </h2>
                  <p className="text-sm" style={{ color: TEXT_MUTED }}>
                    {trigger.desc}
                  </p>
                </div>
              </div>

              <div
                className="mb-5 rounded-xl border p-4"
                style={{ borderColor: BORDER, backgroundColor: BG }}
              >
                <TriggerWaveform
                  mode={activeTrigger === "pressure" ? "pressure" : "flow"}
                />
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: BORDER, backgroundColor: BG }}
                  >
                    <div className="text-xs" style={{ color: TEXT_MUTED }}>
                      مکانیسم
                    </div>
                    <div
                      className="mt-1 text-sm leading-6"
                      style={{ color: TEXT_SECONDARY }}
                    >
                      {detail.mechanism}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: BORDER, backgroundColor: BG }}
                  >
                    <div className="text-xs" style={{ color: TEXT_MUTED }}>
                      آستانهٔ رایج
                    </div>
                    <div
                      className="mt-1 text-sm leading-6"
                      style={{ color: TEXT_SECONDARY }}
                    >
                      {detail.sensitivity}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: `${COLOR_GOOD}44`,
                      backgroundColor: `${COLOR_GOOD}0D`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs"
                      style={{ color: COLOR_GOOD }}
                    >
                      <span className="text-lg">✓</span>
                      <span>مزیت</span>
                    </div>
                    <div
                      className="mt-1 text-sm leading-6"
                      style={{ color: TEXT_SECONDARY }}
                    >
                      {detail.advantage}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: `${COLOR_BAD}44`,
                      backgroundColor: `${COLOR_BAD}0D`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs"
                      style={{ color: COLOR_BAD }}
                    >
                      <span className="text-lg">✗</span>
                      <span>محدودیت</span>
                    </div>
                    <div
                      className="mt-1 text-sm leading-6"
                      style={{ color: TEXT_SECONDARY }}
                    >
                      {detail.disadvantage}
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-xl border p-4"
                  style={{
                    borderColor: `${COLOR_INFO}44`,
                    backgroundColor: `${COLOR_INFO}0D`,
                  }}
                >
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: COLOR_INFO }}
                  >
                    <LuStethoscope size={14} />
                    <span>تنظیم بر اساس سن</span>
                  </div>
                  <div
                    className="mt-1 text-sm leading-6"
                    style={{ color: TEXT_SECONDARY }}
                  >
                    {detail.pediatric}
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-6"
                  style={{
                    borderColor: `${COLOR_WARN}44`,
                    backgroundColor: `${COLOR_WARN}0D`,
                    color: "#92400E",
                  }}
                >
                  <FaRegLightbulb size={16} className="mt-0.5 shrink-0" />
                  <span>{detail.clinicalTip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="rounded-3xl border p-6 shadow-lg"
              style={{
                borderColor: BORDER,
                backgroundColor: CARD_BG,
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <LuClock size={16} style={{ color: COLOR }} />
                <span style={{ color: TEXT_PRIMARY }}>سناریوهای بالینی</span>
              </h3>
              <div className="space-y-3">
                {CLINICAL_SCENARIOS.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border p-3 transition hover:border-violet-300/50"
                    style={{ borderColor: BORDER, backgroundColor: BG }}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span style={{ color: COLOR }}>{s.icon}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: TEXT_PRIMARY }}
                      >
                        {s.title}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-5"
                      style={{ color: TEXT_MUTED }}
                    >
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl border p-4"
              style={{
                borderColor: `${COLOR_WARN}44`,
                backgroundColor: `${COLOR_WARN}0D`,
              }}
            >
              <div className="flex items-start gap-3">
                <LuTriangleAlert
                  className="mt-0.5 shrink-0"
                  style={{ color: COLOR_WARN }}
                  size={16}
                />
                <div>
                  <h4
                    className="text-xs font-bold"
                    style={{ color: "#92400E" }}
                  >
                    نکته ایمنی
                  </h4>
                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "#92400E" }}
                  >
                    تنظیم بیش‌ازحد حساس (اعداد کوچک‌تر) ریسک تریگر خودکار، و
                    تنظیم بیش‌ازحد کم‌حساس (اعداد بزرگ‌تر) ریسک عدم‌تشخیص تلاش
                    بیمار را افزایش می‌دهد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-triggering vs Missed triggering */}
        <div
          className="rounded-3xl border p-6 shadow-lg md:p-8"
          style={{
            borderColor: BORDER,
            backgroundColor: CARD_BG,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <div className="mb-6 flex items-center gap-3">
            <LuTriangleAlert style={{ color: COLOR_WARN }} size={20} />
            <h2 className="text-xl font-bold" style={{ color: TEXT_PRIMARY }}>
              دو خطای شایع تنظیم حساسیت
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {MALFUNCTION.map((m) => (
              <div
                key={m.key}
                className="rounded-2xl border p-5"
                style={{ borderColor: BORDER, backgroundColor: BG }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <m.icon size={18} style={{ color: m.color }} />
                  <h3
                    className="text-sm font-bold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {m.title}
                  </h3>
                </div>
                <p
                  className="mb-3 text-xs font-medium"
                  style={{ color: m.color }}
                >
                  {m.subtitle}
                </p>

                <p
                  className="mb-1.5 text-xs font-semibold"
                  style={{ color: TEXT_MUTED }}
                >
                  علل شایع
                </p>
                <ul
                  className="mb-3 space-y-1 text-sm leading-6"
                  style={{ color: TEXT_SECONDARY }}
                >
                  {m.causes.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: TEXT_MUTED }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>

                <p
                  className="mb-1.5 text-xs font-semibold"
                  style={{ color: TEXT_MUTED }}
                >
                  پیامد بالینی
                </p>
                <p
                  className="mb-3 text-sm leading-6"
                  style={{ color: TEXT_SECONDARY }}
                >
                  {m.consequence}
                </p>

                <div
                  className="rounded-lg px-3 py-2 text-xs leading-6"
                  style={{ backgroundColor: `${COLOR}15`, color: COLOR }}
                >
                  <span className="font-semibold">اصلاح: </span>
                  {m.fix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age reference table */}
        <div
          className="rounded-3xl border p-6 shadow-lg md:p-8"
          style={{
            borderColor: BORDER,
            backgroundColor: CARD_BG,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <div className="mb-6 flex items-center gap-3">
            <LuBaby style={{ color: COLOR_INFO }} size={20} />
            <h2 className="text-xl font-bold" style={{ color: TEXT_PRIMARY }}>
              بازهٔ مرجع بر اساس سن
            </h2>
          </div>
          <div
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: BORDER }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr style={{ backgroundColor: BG }}>
                    <th
                      className="px-4 py-3 font-medium"
                      style={{ color: TEXT_MUTED }}
                    >
                      گروه سنی
                    </th>
                    <th
                      className="px-4 py-3 font-medium"
                      style={{ color: TEXT_MUTED }}
                    >
                      وزن تقریبی
                    </th>
                    <th
                      className="px-4 py-3 font-medium"
                      style={{ color: TEXT_MUTED }}
                    >
                      تریگر جریانی
                    </th>
                    <th
                      className="px-4 py-3 font-medium"
                      style={{ color: TEXT_MUTED }}
                    >
                      تریگر فشاری
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AGE_REFERENCE.map((row, i) => (
                    <tr
                      key={row.group}
                      style={{
                        backgroundColor: i % 2 === 0 ? "transparent" : BG,
                      }}
                    >
                      <td
                        className="px-4 py-3 font-medium"
                        style={{ color: TEXT_PRIMARY }}
                      >
                        {row.group}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: TEXT_SECONDARY }}
                      >
                        {row.weight}
                      </td>
                      <td
                        className="px-4 py-3 font-medium"
                        style={{ color: COLOR }}
                      >
                        {row.flow}
                      </td>
                      <td
                        className="px-4 py-3 font-medium"
                        style={{ color: COLOR }}
                      >
                        {row.pressure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick teaching */}
        <div
          className="rounded-3xl border p-6 shadow-lg md:p-8"
          style={{
            borderColor: BORDER,
            backgroundColor: CARD_BG,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <div className="mb-6 flex items-center gap-3">
            <LuBookOpen style={{ color: COLOR }} size={20} />
            <h2 className="text-xl font-bold" style={{ color: TEXT_PRIMARY }}>
              الگوریتم سریع عیب‌یابی
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                n: "۱",
                title: "بررسی موج",
                desc: "تریگر مکرر بدون الگوی بیمار → auto-triggering. تلاش بیمار بدون پاسخ دستگاه → missed trigger",
              },
              {
                n: "۲",
                title: "رد نشتی و آب مدار",
                desc: "به‌ویژه در لولهٔ بدون کاف؛ شایع‌ترین علت تریگر خودکار در اطفال",
              },
              {
                n: "۳",
                title: "ارزیابی auto-PEEP",
                desc: "با End-Expiratory Hold؛ علت شایع عدم‌تشخیص تریگر",
              },
              {
                n: "۴",
                title: "اصلاح تدریجی آستانه",
                desc: "تغییر پله‌ای حساسیت و پایش مجدد هماهنگی بیمار-ونتیلاتور",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-xl border p-4"
                style={{ borderColor: BORDER, backgroundColor: BG }}
              >
                <div
                  className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: COLOR }}
                >
                  {step.n}
                </div>
                <h4
                  className="mt-2 text-sm font-bold"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {step.title}
                </h4>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: TEXT_MUTED }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key pearl */}
        <div
          className="flex items-start gap-3 rounded-2xl border px-5 py-4 text-xs leading-6"
          style={{
            borderColor: `${COLOR}44`,
            backgroundColor: `${COLOR}0D`,
            color: COLOR,
          }}
        >
          <LuStethoscope
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: COLOR }}
          />
          <span>
            <strong style={{ color: TEXT_PRIMARY }}>نکته : </strong>
            در کودکان با افزایش مقاومت راه هوایی (مثل آسم یا برونشیولیت شدید)،
            تریگر جریانی نسبت به تریگر فشاری عملکرد بهتری دارد، زیرا وابستگی
            کمتری به بار اضافی فشار ناشی از auto-PEEP برای شروع تریگر دارد.
            همیشه پیش از تغییر حساسیت تریگر، auto-PEEP را با انجام
            End-Expiratory Hold اندازه‌گیری کنید تا علت واقعی ناهماهنگی
            بیمار-ونتیلاتور مشخص شود.
          </span>
        </div>
      </div>
    </div>
  );
}
