"use client";

import { useState, useMemo } from "react";
import {
  LuBaby,
  LuCalendarDays,
  LuStethoscope,
  LuWind,
  LuTriangleAlert,
  LuInfo,
  LuGauge,
} from "react-icons/lu";

const DISEASES = [
  {
    id: "normal",
    label: "ریه سالم",
    desc: "بدون درگیری ریوی زمینه‌ای",
    range: [6, 8],
    accent: "teal",
  },
  {
    id: "ards",
    label: "ARDS / آسیب حاد ریه",
    desc: "استراتژی حفاظت ریوی، فشار پلاتو زیر ۲۸ cmH2O",
    range: [4, 6],
    accent: "rose",
  },
  {
    id: "obstructive",
    label: "بیماری انسدادی راه هوایی",
    desc: "آسم، برونشیولیت — زمان بازدمی کافی، هایپرکاپنی مجاز",
    range: [6, 8],
    accent: "amber",
  },
  {
    id: "neuromuscular",
    label: "بیماری عصبی‌عضلانی",
    desc: "کاهش کمپلیانس دیواره قفسه سینه",
    range: [8, 10],
    accent: "violet",
  },
  {
    id: "preterm",
    label: "نوزاد نارس با RDS",
    desc: "نیاز به مراقبت ویژه نوزادان، مدنظر قرار دادن سورفکتانت",
    range: [4, 6],
    accent: "sky",
  },
];

const ACCENT = {
  teal: {
    ring: "ring-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-500",
    text: "text-teal-700",
    solid: "bg-teal-600",
    badge: "bg-teal-100 text-teal-700",
  },
  rose: {
    ring: "ring-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-500",
    text: "text-rose-700",
    solid: "bg-rose-600",
    badge: "bg-rose-100 text-rose-700",
  },
  amber: {
    ring: "ring-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-500",
    text: "text-amber-700",
    solid: "bg-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  violet: {
    ring: "ring-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-500",
    text: "text-violet-700",
    solid: "bg-violet-600",
    badge: "bg-violet-100 text-violet-700",
  },
  sky: {
    ring: "ring-sky-500",
    bg: "bg-sky-50",
    border: "border-sky-500",
    text: "text-sky-700",
    solid: "bg-sky-600",
    badge: "bg-sky-100 text-sky-700",
  },
};

function getAgeGroup(value, unit) {
  const v = Number(value) || 0;
  if (unit === "روز") return v <= 28 ? "نوزاد (Neonate)" : "شیرخوار (Infant)";
  if (unit === "ماه") return v < 12 ? "شیرخوار (Infant)" : "کودک (Child)";
  if (v < 12) return "کودک (Child)";
  return "نوجوان (Adolescent)";
}

function getReferenceRR(group) {
  if (group.startsWith("نوزاد")) return "۳۰ تا ۶۰";
  if (group.startsWith("شیرخوار")) return "۲۵ تا ۴۰";
  if (group.startsWith("کودک")) return "۲۰ تا ۳۰";
  return "۱۲ تا ۲۰";
}

export default function PediatricTidalVolumeCalculator() {
  const [gender, setGender] = useState("boy");
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState("سال");
  const [weight, setWeight] = useState("");
  const [diseaseId, setDiseaseId] = useState("normal");

  const disease = DISEASES.find((d) => d.id === diseaseId);
  const accent = ACCENT[disease.accent];

  const weightNum = Number(weight);
  const isValid = weightNum > 0 && weightNum < 150;

  const result = useMemo(() => {
    if (!isValid) return null;
    const [low, high] = disease.range;
    const precision = weightNum < 10 ? 1 : 0;
    return {
      low: (weightNum * low).toFixed(precision),
      high: (weightNum * high).toFixed(precision),
      mid: (weightNum * ((low + high) / 2)).toFixed(precision),
    };
  }, [weightNum, isValid, disease]);

  const ageGroup = ageValue ? getAgeGroup(ageValue, ageUnit) : null;
  const lowWeightWarning = isValid && weightNum < 3;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-l from-sky-600 to-teal-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/15 p-2.5 rounded-xl">
              <LuBaby size={26} />
            </div>
            <span className="text-sky-100 text-sm font-medium tracking-wide">
              محاسبه‌گر ونتیلاتور اطفال
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">حجم جاری در کودکان</h1>
          <p className="text-sky-50 leading-7 max-w-2xl">
            برخلاف بزرگسالان، حجم جاری در اطفال بر اساس{" "}
            <span className="font-semibold">وزن واقعی بدن</span> محاسبه می‌شود،
            نه وزن ایده‌آل. نوع بیماری زمینه‌ای مهم‌ترین عامل تعیین‌کننده‌ی
            بازه‌ی مناسب mL/kg است.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-5 gap-6">
        {/* فرم ورودی */}
        <div className="lg:col-span-3 space-y-6">
          {/* اطلاعات بیمار */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-bold mb-5">اطلاعات بیمار</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-2">
                  <LuBaby size={16} /> جنسیت
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGender("boy")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
                      gender === "boy"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    پسر
                  </button>
                  <button
                    onClick={() => setGender("girl")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
                      gender === "girl"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    دختر
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-2">
                  وزن (کیلوگرم)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="مثلاً ۱۲.۵"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-2">
                  <LuCalendarDays size={16} /> سن
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    placeholder="عدد سن"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <div className="flex rounded-xl overflow-hidden border border-slate-200">
                    {["روز", "ماه", "سال"].map((u) => (
                      <button
                        key={u}
                        onClick={() => setAgeUnit(u)}
                        className={`px-4 text-sm font-medium transition ${
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
                  <p className="text-xs text-slate-500 mt-2">
                    رده‌ی سنی: <span className="font-medium">{ageGroup}</span> ·
                    بازه‌ی طبیعی تنفس (RR):{" "}
                    <span className="font-medium">
                      {getReferenceRR(ageGroup)}
                    </span>{" "}
                    در دقیقه
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* نوع بیماری */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="flex items-center gap-2 text-base font-bold mb-5">
              <LuStethoscope size={18} className="text-slate-500" />
              نوع بیماری زمینه‌ای
            </h2>

            <div className="space-y-2.5">
              {DISEASES.map((d) => {
                const a = ACCENT[d.accent];
                const active = d.id === diseaseId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDiseaseId(d.id)}
                    className={`w-full text-right p-4 rounded-xl border-2 transition flex items-center justify-between gap-4 ${
                      active
                        ? `${a.border} ${a.bg}`
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div>
                      <div
                        className={`font-semibold text-sm ${
                          active ? a.text : "text-slate-800"
                        }`}
                      >
                        {d.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {d.desc}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${
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
            <section className={`rounded-2xl p-6 text-white ${accent.solid}`}>
              <div className="flex items-center gap-2 mb-4 opacity-90">
                <LuGauge size={18} />
                <span className="text-sm font-medium">حجم جاری پیشنهادی</span>
              </div>

              {result ? (
                <>
                  <div className="text-4xl font-bold mb-1">
                    {result.low} – {result.high}
                    <span className="text-lg font-normal mr-1">mL</span>
                  </div>
                  <div className="text-sm opacity-90 mb-4">
                    مقدار میانه: {result.mid} mL
                  </div>
                  <div className="h-px bg-white/20 my-4" />
                  <div className="text-sm opacity-90 leading-6">
                    بر اساس {weightNum} کیلوگرم × {disease.range[0]} تا{" "}
                    {disease.range[1]} mL/kg برای «{disease.label}»
                  </div>
                </>
              ) : (
                <div className="text-sm opacity-90 py-4">
                  برای مشاهده‌ی نتیجه، وزن بیمار را وارد کنید.
                </div>
              )}
            </section>

            {lowWeightWarning && (
              <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <LuTriangleAlert className="text-amber-600" size={18} />
                  <h3 className="font-bold text-sm text-amber-900">
                    توجه ویژه
                  </h3>
                </div>
                <p className="text-xs text-amber-900/90 leading-6">
                  در وزن‌های زیر ۳ کیلوگرم، دقت حجم جاری بسیار حیاتی است و باید
                  حتماً از ونتیلاتورهای اختصاصی نوزادان با قابلیت اندازه‌گیری
                  دقیق حجم استفاده شود.
                </p>
              </section>
            )}

            <section className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <LuWind className="text-slate-400" size={18} />
                <h3 className="font-bold text-sm text-slate-700">
                  یادآوری بالینی
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-6">
                حجم جاری همیشه باید در کنار فشار پلاتو و انطباق‌پذیری ریه
                ارزیابی شود، نه به‌تنهایی. این محاسبه صرفاً یک نقطه‌ی شروع است.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
