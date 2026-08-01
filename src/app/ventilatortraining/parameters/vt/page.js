"use client";

import { useState, useMemo } from "react";
import {
  LuBaby,
  LuCalendarDays,
  LuStethoscope,
  LuTriangleAlert,
  LuGauge,
  LuBookOpen,
  LuFlaskConical,
} from "react-icons/lu";

const DISEASES = [
  {
    id: "normal",
    label: "ریه سالم",
    desc: "بدون درگیری ریوی زمینه‌ای",
    range: [6, 8],
    plateauMax: 30,
    accent: "teal",
  },
  {
    id: "ards-normal-compliance",
    label: "ARDS با کمپلیانس دیواره قفسه طبیعی",
    desc: "PALICC: هدف Pplateau ≤ ۲۸ cmH2O",
    range: [5, 8],
    plateauMax: 28,
    accent: "rose",
  },
  {
    id: "ards-low-compliance",
    label: "ARDS با کمپلیانس دیواره قفسه پایین",
    desc: "PALICC: هدف Pplateau ≤ ۲۹-۳۲ cmH2O",
    range: [4, 6],
    plateauMax: 32,
    accent: "amber",
  },
  {
    id: "obstructive",
    label: "بیماری انسدادی راه هوایی",
    desc: "آسم، برونشیولیت — زمان بازدمی کافی، هایپرکاپنی مجاز",
    range: [6, 8],
    plateauMax: 30,
    accent: "violet",
  },
  {
    id: "neuromuscular",
    label: "بیماری عصبی‌عضلانی",
    desc: "کاهش کمپلیانس دیواره قفسه سینه، ریسک آتلکتازی",
    range: [8, 10],
    plateauMax: 30,
    accent: "sky",
  },
  {
    id: "preterm",
    label: "نوزاد نارس با RDS",
    desc: "نیاز به مراقبت ویژه نوزادان، مدنظر قرار دادن سورفکتانت",
    range: [4, 6],
    plateauMax: 25,
    accent: "coral",
  },
];

const ACCENT = {
  teal: {
    border: "border-teal-500",
    bg: "bg-teal-50",
    text: "text-teal-700",
    solid: "bg-teal-600",
    badge: "bg-teal-100 text-teal-700",
    hover: "hover:bg-teal-50",
  },
  rose: {
    border: "border-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
    solid: "bg-rose-600",
    badge: "bg-rose-100 text-rose-700",
    hover: "hover:bg-rose-50",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    solid: "bg-amber-600",
    badge: "bg-amber-100 text-amber-700",
    hover: "hover:bg-amber-50",
  },
  violet: {
    border: "border-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
    solid: "bg-violet-600",
    badge: "bg-violet-100 text-violet-700",
    hover: "hover:bg-violet-50",
  },
  sky: {
    border: "border-sky-500",
    bg: "bg-sky-50",
    text: "text-sky-700",
    solid: "bg-sky-600",
    badge: "bg-sky-100 text-sky-700",
    hover: "hover:bg-sky-50",
  },
  coral: {
    border: "border-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
    solid: "bg-orange-600",
    badge: "bg-orange-100 text-orange-700",
    hover: "hover:bg-orange-50",
  },
};

function getAgeGroup(value, unit) {
  const v = Number(value) || 0;
  if (unit === "روز") return v <= 28 ? "نوزاد (Neonate)" : "شیرخوار (Infant)";
  if (unit === "ماه") return v < 12 ? "شیرخوار (Infant)" : "کودک (Child)";
  if (v < 12) return "کودک (Child)";
  return "نوجوان (Adolescent)";
}

export default function PediatricTidalVolumeCalculator() {
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState("سال");
  const [weight, setWeight] = useState("");
  const [diseaseId, setDiseaseId] = useState("normal");
  const [peep, setPeep] = useState(6);

  const disease = DISEASES.find((d) => d.id === diseaseId);
  const accent = ACCENT[disease.accent];

  const weightNum = Number(weight);
  const isValid = weightNum > 0 && weightNum < 150;

  const result = useMemo(() => {
    if (!isValid) return null;
    const [low, high] = disease.range;
    const precision = weightNum < 10 ? 1 : 0;
    const vtLow = weightNum * low;
    const vtHigh = weightNum * high;
    const dpMax = disease.plateauMax - peep;
    return {
      low: vtLow.toFixed(precision),
      high: vtHigh.toFixed(precision),
      mid: (weightNum * ((low + high) / 2)).toFixed(precision),
      dpMax: Math.max(dpMax, 0),
    };
  }, [weightNum, isValid, disease, peep]);

  const ageGroup = ageValue ? getAgeGroup(ageValue, ageUnit) : null;
  const lowWeightWarning = isValid && weightNum < 3;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80 text-slate-800"
    >
      {/* Header - کاملاً ریسپانسیو */}
      <div className="bg-gradient-to-l from-sky-600 to-teal-700 rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 p-3 rounded-2xl backdrop-blur-sm">
                <LuBaby size={28} className="text-white" />
              </div>
              <span className="text-sky-100 text-xs sm:text-sm font-medium tracking-wide">
                محاسبه‌گر ونتیلاتور اطفال
                <span className="hidden sm:inline"> · مبتنی بر PALICC</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            حجم جاری در کودکان
          </h1>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm text-sky-50 break-words max-w-full">
            V<sub>T</sub> = وزن واقعی (kg) × mL/kg اختصاصی بیماری
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* توضیح - ریسپانسیو */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-50 rounded-xl">
              <LuFlaskConical className="text-sky-600" size={22} />
            </div>
            <h2 className="text-lg md:text-xl font-bold">
              تفاوت کلیدی با بزرگسال
            </h2>
          </div>
          <p className="leading-relaxed md:leading-8 text-slate-600 text-sm md:text-base">
            در بزرگسالان VT بر مبنای{" "}
            <span className="font-semibold text-slate-800">
              وزن بدن ایده‌آل (PBW)
            </span>{" "}
            محاسبه می‌شود، اما در اطفال به‌دلیل نبود فرمول اعتبارسنجی‌شده‌ی PBW
            برای دوران رشد، مبنا{" "}
            <span className="font-semibold text-slate-800">وزن واقعی بدن</span>{" "}
            است. طبق راهنمای PALICC (۲۰۱۵/۲۰۲۳)، انتخاب بازه‌ی mL/kg باید بر
            اساس شدت بیماری و کمپلیانس دیواره قفسه سینه فردی‌سازی شود، نه یک عدد
            ثابت برای همه.
          </p>
        </section>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* فرم ورودی */}
          <div className="lg:col-span-3 space-y-6">
            {/* اطلاعات بیمار */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-lg p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-base md:text-lg font-bold mb-6">
                <div className="p-2 bg-sky-50 rounded-xl">
                  <LuCalendarDays size={20} className="text-sky-600" />
                </div>
                اطلاعات بیمار
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    وزن (کیلوگرم)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="مثلاً ۱۲.۵"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    PEEP فعلی (cmH2O)
                  </label>
                  <input
                    type="number"
                    value={peep}
                    onChange={(e) => setPeep(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    سن
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      value={ageValue}
                      onChange={(e) => setAgeValue(e.target.value)}
                      placeholder="عدد سن"
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                    <div className="flex rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                      {["روز", "ماه", "سال"].map((u) => (
                        <button
                          key={u}
                          onClick={() => setAgeUnit(u)}
                          className={`px-4 sm:px-5 py-3 text-sm font-medium transition-all ${
                            ageUnit === u
                              ? "bg-slate-800 text-white"
                              : "bg-white text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  {ageGroup && (
                    <p className="text-xs text-slate-500 mt-3">
                      رده‌ی سنی:{" "}
                      <span className="font-medium text-slate-700">
                        {ageGroup}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* بالینی */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-lg p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-base md:text-lg font-bold mb-6">
                <div className="p-2 bg-sky-50 rounded-xl">
                  <LuStethoscope size={20} className="text-sky-600" />
                </div>
                بالینی
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {DISEASES.map((d) => {
                  const a = ACCENT[d.accent];
                  const active = d.id === diseaseId;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDiseaseId(d.id)}
                      className={`w-full text-right p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        active
                          ? `${a.border} ${a.bg} shadow-sm`
                          : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-semibold text-sm md:text-base ${active ? a.text : "text-slate-800"}`}
                        >
                          {d.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {d.desc}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${
                          active ? a.badge : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {d.range[0]}-{d.range[1]} mL/kg
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* پنل نتیجه */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 space-y-4">
              <section
                className={`rounded-3xl p-6 md:p-8 text-white shadow-xl ${accent.solid}`}
              >
                <div className="flex items-center gap-2 mb-4 opacity-90">
                  <LuGauge size={20} />
                  <span className="text-sm font-medium">حجم جاری پیشنهادی</span>
                </div>

                {result ? (
                  <>
                    <div className="text-3xl sm:text-4xl font-bold mb-1">
                      {result.low} – {result.high}
                      <span className="text-base sm:text-lg font-normal mr-1">
                        mL
                      </span>
                    </div>
                    <div className="text-sm opacity-90 mb-4">
                      مقدار میانه : {result.mid} mL
                    </div>
                    <div className="h-px bg-white/20 my-4" />
                    <div className="text-sm opacity-90 leading-6 mb-4">
                      {weightNum} کیلوگرم × {disease.range[0]} تا{" "}
                      {disease.range[1]} mL/kg
                    </div>
                    <div className="bg-white/10 rounded-2xl px-4 py-4 text-xs md:text-sm">
                      <div className="flex flex-col gap-1">
                        <div>
                          سقف Pplateau هدف:{" "}
                          <span className="font-bold">
                            {disease.plateauMax} cmH2O
                          </span>
                        </div>
                        <div>
                          حداکثر Driving Pressure قابل‌قبول با این PEEP:{" "}
                          <span className="font-bold">
                            {result.dpMax} cmH2O
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm opacity-90 py-6 text-center">
                    برای مشاهده‌ی نتیجه،
                    <br />
                    وزن بیمار را وارد کنید.
                  </div>
                )}
              </section>

              {lowWeightWarning && (
                <section className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-3xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LuTriangleAlert className="text-amber-600" size={18} />
                    <h3 className="font-bold text-sm text-amber-900">
                      توجه ویژه
                    </h3>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-6">
                    در وزن‌های زیر ۳ کیلوگرم، خطای اندازه‌گیری حجم در مدارهای
                    استاندارد بزرگسال معنادار می‌شود؛ استفاده از ونتیلاتور و
                    مدار اختصاصی نوزادان الزامی است.
                  </p>
                </section>
              )}

              <section className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <LuBookOpen className="text-slate-400" size={18} />
                  <h3 className="font-bold text-sm text-slate-700">مرجع</h3>
                </div>
                <p className="text-xs text-slate-500 leading-6">
                  بازه‌های mL/kg و سقف Pplateau بر اساس توصیه‌های PALICC برای
                  تهویه حفاظتی ریه در ARDS اطفال است. این محاسبه نقطه‌ی شروع
                  بالینی است، نه جایگزین قضاوت بالینی فردی.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* نکته کلیدی - ریسپانسیو */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-500/20 rounded-xl">
              <LuStethoscope size={22} className="text-sky-400" />
            </div>
            <h2 className="text-lg md:text-xl font-bold">
              نکته‌ی کلیدی برای فراگیر
            </h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed md:leading-7 text-slate-200">
            برخلاف بزرگسالان که آستانه‌ی Pplateau ثابت (۳۰ cmH2O) دارند، PALICC
            در اطفال یک{" "}
            <span className="font-semibold text-white">آستانه‌ی متغیر</span> بر
            اساس کمپلیانس دیواره قفسه سینه توصیه می‌کند: در بیمارانی که دیواره
            قفسه سینه‌شان سفت‌تر است (مثلاً نوزادان، جراحی قفسه سینه)، سقف
            بالاتر (تا ۳۲) قابل‌قبول است چون فشار ترانس‌پولمونری واقعی کمتر از
            عدد نمایش‌داده‌شده خواهد بود.
          </p>
        </section>
      </div>
    </div>
  );
}
