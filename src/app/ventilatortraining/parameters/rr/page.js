"use client";

import { useState, useMemo } from "react";
import {
  LuWind,
  LuInfo,
  LuTriangleAlert,
  LuBaby,
  LuUser,
  LuGauge,
} from "react-icons/lu";

const AGE_GROUPS = [
  { id: "newborn", label: "نوزاد (۰ تا ۱ ماه)", range: [30, 60] },
  { id: "infant", label: "شیرخوار (۱ ماه تا ۱ سال)", range: [25, 40] },
  { id: "toddler", label: "نوپا (۱ تا ۳ سال)", range: [20, 30] },
  { id: "child", label: "کودک (۳ تا ۱۲ سال)", range: [18, 25] },
  { id: "adolescent", label: "نوجوان (۱۲ تا ۱۸ سال)", range: [12, 20] },
  { id: "adult", label: "بزرگسال", range: [12, 20] },
];

const MODIFIERS = [
  {
    id: "fever",
    label: "تب",
    delta: 4,
    desc: "به ازای هر درجه سانتی‌گراد بالای ۳۷، حدود ۴-۵ تنفس در دقیقه اضافه می‌شود",
  },
  {
    id: "sedation",
    label: "آرام‌بخشی / اپیوئید",
    delta: -4,
    desc: "کاهش درایو تنفسی مرکزی",
  },
  {
    id: "acidosis",
    label: "اسیدوز متابولیک",
    delta: 8,
    desc: "تلاش جبرانی برای دفع CO2 (تنفس کاسمال)",
  },
  {
    id: "restrictive",
    label: "بیماری محدودکننده ریوی",
    delta: 6,
    desc: "کاهش حجم جاری، افزایش جبرانی تعداد تنفس",
  },
];

export default function RespiratoryRatePage() {
  const [ageGroup, setAgeGroup] = useState("child");
  const [activeModifiers, setActiveModifiers] = useState([]);

  const group = AGE_GROUPS.find((g) => g.id === ageGroup);

  const adjusted = useMemo(() => {
    const delta = activeModifiers.reduce((sum, id) => {
      const m = MODIFIERS.find((mod) => mod.id === id);
      return sum + (m ? m.delta : 0);
    }, 0);
    return {
      low: Math.max(group.range[0] + delta, 5),
      high: Math.max(group.range[1] + delta, 5),
    };
  }, [group, activeModifiers]);

  const toggleModifier = (id) => {
    setActiveModifiers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/15 p-2.5 rounded-xl">
              <LuWind size={26} />
            </div>
            <span className="text-indigo-100 text-sm font-medium tracking-wide">
              پارامتر ونتیلاتور
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            تعداد تنفس (Respiratory Rate)
          </h1>
          <p className="text-indigo-50 leading-7 max-w-xl">
            تعداد سیکل‌های تنفسی (دم و بازدم) در هر دقیقه که دستگاه ونتیلاتور به
            بیمار می‌دهد یا بیمار خودش انجام می‌دهد. این پارامتر با نماد RR یا f
            نشان داده می‌شود و مستقیماً بر تهویه دقیقه‌ای (Minute Ventilation) و
            دفع CO2 اثر می‌گذارد.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* توضیح مفهومی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <LuInfo className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">چرا سن مهم‌ترین عامل است؟</h2>
          </div>
          <p className="leading-8 text-slate-600">
            برخلاف حجم جاری که بر مبنای وزن تنظیم می‌شود، بازه‌ی طبیعی تعداد
            تنفس عمدتاً تابع{" "}
            <span className="font-semibold text-slate-800">سن بیمار</span> است.
            نوزادان و شیرخواران به دلیل حجم جاری کوچک‌تر، برای رساندن تهویه
            دقیقه‌ای کافی نیاز به تعداد تنفس بالاتری دارند.
          </p>
        </section>

        {/* انتخاب رده سنی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuBaby className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">رده سنی بیمار</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {AGE_GROUPS.map((g) => {
              const active = g.id === ageGroup;
              return (
                <button
                  key={g.id}
                  onClick={() => setAgeGroup(g.id)}
                  className={`text-right p-3.5 rounded-xl border-2 transition flex items-center justify-between gap-3 ${
                    active
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-indigo-700" : "text-slate-700"
                    }`}
                  >
                    {g.label}
                  </span>
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-1 rounded-lg ${
                      active
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {g.range[0]}-{g.range[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* فاکتورهای تعدیل‌کننده */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuUser className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">شرایط بالینی مؤثر (اختیاری)</h2>
          </div>
          <div className="space-y-2.5">
            {MODIFIERS.map((m) => {
              const active = activeModifiers.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleModifier(m.id)}
                  className={`w-full text-right p-4 rounded-xl border-2 transition flex items-center justify-between gap-4 ${
                    active
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div>
                    <div
                      className={`font-semibold text-sm ${
                        active ? "text-indigo-700" : "text-slate-800"
                      }`}
                    >
                      {m.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{m.desc}</div>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {m.delta > 0 ? "+" : ""}
                    {m.delta}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* نتیجه */}
        <section className="bg-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4 opacity-90">
            <LuGauge size={18} />
            <span className="text-sm font-medium">
              بازه‌ی تعداد تنفس پیشنهادی
            </span>
          </div>
          <div className="text-4xl font-bold mb-1">
            {adjusted.low} – {adjusted.high}
            <span className="text-lg font-normal mr-1">در دقیقه</span>
          </div>
          <div className="text-sm opacity-90">
            بر اساس {group.label}
            {activeModifiers.length > 0 &&
              ` + ${activeModifiers.length} فاکتور تعدیل‌کننده`}
          </div>
        </section>

        {/* هشدار بالینی */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <LuTriangleAlert className="text-amber-600" size={20} />
            <h2 className="text-lg font-bold text-amber-900">نکات بالینی</h2>
          </div>
          <ul className="space-y-3 text-amber-900/90 leading-7">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                تعداد تنفس بالا در حالت تهویه کنترل‌شده می‌تواند منجر به{" "}
                <strong>Auto-PEEP</strong> (به‌دام‌افتادن هوا) شود، به‌خصوص در
                بیماری‌های انسدادی.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                تعداد تنفس همیشه باید همراه با <strong>حجم جاری</strong> برای
                محاسبه‌ی تهویه دقیقه‌ای (Minute Ventilation = RR × VT) در نظر
                گرفته شود.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                در بیماران با تنفس خودبه‌خودی (SIMV، PSV)، RR تنظیم‌شده روی
                دستگاه فقط یک «پشتیبان» است؛ RR واقعی بیمار می‌تواند بالاتر
                باشد.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
