"use client";

import { useState, useMemo } from "react";
import {
  LuWind,
  LuTriangleAlert,
  LuBaby,
  LuGauge,
  LuBookOpen,
  LuStethoscope,
  LuFlaskConical,
} from "react-icons/lu";

const AGE_GROUPS = [
  { id: "newborn", label: "نوزاد (۰-۱ ماه)", range: [30, 60] },
  { id: "infant", label: "شیرخوار (۱-۱۲ ماه)", range: [30, 60] },
  { id: "toddler", label: "نوپا (۱-۳ سال)", range: [24, 40] },
  { id: "preschool", label: "پیش‌دبستانی (۳-۵ سال)", range: [22, 34] },
  { id: "school", label: "سن مدرسه (۶-۱۲ سال)", range: [18, 30] },
  { id: "adolescent", label: "نوجوان (۱۳-۱۸ سال)", range: [12, 20] },
];

const MODIFIERS = [
  {
    id: "fever",
    label: "تب",
    delta: 4,
    desc: "به ازای هر درجه سانتی‌گراد بالای ۳۷، تقریباً ۴-۵ تنفس در دقیقه به درایو مرکزی اضافه می‌شود",
  },
  {
    id: "sedation",
    label: "آرام‌بخشی / اپیوئید",
    delta: -4,
    desc: "سرکوب درایو تنفسی مرکزی در ساقه‌ی مغز",
  },
  {
    id: "acidosis",
    label: "اسیدوز متابولیک",
    delta: 8,
    desc: "جبران تنفسی برای بازگرداندن pH (تنفس کاسمال)",
  },
  {
    id: "restrictive",
    label: "بیماری محدودکننده ریوی",
    delta: 6,
    desc: "Vt کوچک‌تر → افزایش جبرانی RR برای حفظ VE",
  },
];

export default function RespiratoryRatePage() {
  const [ageGroup, setAgeGroup] = useState("school");
  const [activeModifiers, setActiveModifiers] = useState([]);
  const [rr, setRr] = useState(24);
  const [ie, setIe] = useState(2);

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

  // Fraction of the total respiratory cycle spent in expiration, given I:E ratio 1:ie
  const expFraction = ie / (1 + ie);
  const cycleTime = 60 / rr;
  const expTime = cycleTime * expFraction;

  const autoPeepRisk = useMemo(() => {
    if (expTime < 0.5)
      return {
        label: "ریسک بالای Auto-PEEP",
        color: "rose",
        note: "زمان بازدمی کوتاه نسبت به ثابت زمانی ریه — به‌خصوص در بیماری انسدادی خطرناک است",
      };
    if (expTime < 0.8)
      return {
        label: "ریسک متوسط",
        color: "amber",
        note: "در بیماری با مقاومت راه هوایی بالا پایش موج جریان بازدمی الزامی است",
      };
    return {
      label: "زمان بازدمی کافی",
      color: "teal",
      note: "احتمال به‌دام‌افتادن هوا در این تنظیمات پایین است",
    };
  }, [expTime]);

  const COLORS = {
    amber: "bg-amber-600",
    rose: "bg-rose-600",
    teal: "bg-teal-600",
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/15 p-2.5 rounded-xl">
              <LuWind size={24} />
            </div>
            <span className="text-indigo-100 text-sm font-medium tracking-wide">
              پارامتر ونتیلاتور · تهویه
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            تعداد تنفس و تهویه آلوئولار
          </h1>
          <div className="bg-white/10 rounded-xl px-5 py-3.5 font-mono text-sm text-indigo-50 inline-block">
            V<sub>A</sub> = RR × (V<sub>T</sub> − V<sub>D</sub>)
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* مفهوم دقیق‌تر: تهویه آلوئولار نه فقط دقیقه‌ای */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuFlaskConical className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">
              تهویه دقیقه‌ای در برابر تهویه آلوئولار
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-500 mb-1.5">
                تهویه دقیقه‌ای (V<sub>E</sub>)
              </div>
              <div className="font-mono text-sm text-slate-800 mb-2">
                RR × V<sub>T</sub>
              </div>
              <p className="text-xs text-slate-500 leading-6">
                کل حجم هوای جابه‌جاشده در دقیقه؛ شامل فضای مرده هم می‌شود و
                معیار مستقیمی برای گاز مبادله‌شده نیست.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 border-r-4 border-indigo-500">
              <div className="text-xs font-bold text-indigo-700 mb-1.5">
                تهویه آلوئولار (V<sub>A</sub>)
              </div>
              <div className="font-mono text-sm text-indigo-900 mb-2">
                RR × (V<sub>T</sub> − V<sub>D</sub>)
              </div>
              <p className="text-xs text-indigo-900/80 leading-6">
                فضای مرده تقریباً ثابت (~۲-۳ mL/kg) است؛ در Vt کوچک (اطفال) نسبت
                V<sub>D</sub>/V<sub>T</sub> اهمیت بیشتری پیدا می‌کند.
              </p>
            </div>
          </div>
        </section>

        {/* جدول مرجع سنی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuBookOpen className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">
              راهنمای آموزشی RR طبیعی بر اساس سن
            </h2>
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
                    className={`text-sm font-medium ${active ? "text-indigo-700" : "text-slate-700"}`}
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
          <p className="text-xs text-slate-400 mt-4 leading-6">
            بازه‌ها بر مبنای منابع استاندارد PALS هستند و صرفاً چارچوب اولیه‌ی
            تصمیم‌گیری‌اند؛ باید با وضعیت بالینی، ABG و کاپنوگرافی بیمار تطبیق
            داده شوند.
          </p>
        </section>

        {/* فاکتورهای تعدیل‌کننده */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuStethoscope className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">فاکتورهای تعدیل‌کننده</h2>
          </div>
          <div className="space-y-2.5 mb-6">
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
                      className={`font-semibold text-sm ${active ? "text-indigo-700" : "text-slate-800"}`}
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

          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <LuGauge size={18} />
              <span className="text-sm font-medium">بازه‌ی RR پیشنهادی</span>
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
          </div>
        </section>

        {/* محاسبه‌گر ریسک Auto-PEEP */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuTriangleAlert className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold">
              ریسک Auto-PEEP بر اساس RR و I:E
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                RR (تنفس/دقیقه)
              </label>
              <input
                type="number"
                value={rr}
                onChange={(e) => setRr(Number(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              />
              <input
                type="range"
                min={10}
                max={80}
                value={rr}
                onChange={(e) => setRr(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                نسبت I:E (۱ به)
              </label>
              <input
                type="number"
                step="0.1"
                value={ie}
                onChange={(e) => setIe(Number(e.target.value) || 0.5)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              />
              <input
                type="range"
                min={1}
                max={5}
                step="0.1"
                value={ie}
                onChange={(e) => setIe(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div
            className={`${COLORS[autoPeepRisk.color]} rounded-2xl p-6 text-white`}
          >
            <div className="text-sm opacity-90 mb-1">زمان بازدمی تخمینی</div>
            <div className="text-4xl font-bold mb-2">
              {expTime.toFixed(2)}
              <span className="text-lg font-normal mr-1">ثانیه</span>
            </div>
            <div className="text-sm font-medium">{autoPeepRisk.label}</div>
            <div className="text-xs opacity-90 mt-1">{autoPeepRisk.note}</div>
          </div>
        </section>

        {/* نکته کلیدی */}
        <section className="bg-slate-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <LuStethoscope size={20} className="text-indigo-400" />
            <h2 className="text-lg font-bold">نکته‌ی کلیدی برای فراگیر</h2>
          </div>
          <p className="text-sm leading-7 text-slate-200">
            در بیماری انسدادی (آسم، برونشیولیت)، هدف تنظیم RR{" "}
            <span className="font-semibold text-white">
              پایین‌تر از حد طبیعی سنی
            </span>{" "}
            به همراه I:E کشیده‌تر (مثلاً ۱:۳ یا بیشتر) است تا زمان کافی برای
            بازدم کامل فراهم شود — حتی به قیمت هیپرکاپنی مجاز (Permissive
            Hypercapnia)، چون هدف اولویت‌دار جلوگیری از باروتروما ناشی از
            به‌دام‌افتادن هواست.
          </p>
        </section>

        {/* هشدار بالینی */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <LuTriangleAlert
            className="text-amber-600 shrink-0 mt-0.5"
            size={18}
          />
          <p className="text-xs text-amber-900/90 leading-6">
            علامت بالینی Auto-PEEP: عدم بازگشت کامل موج جریان بازدمی به خط پایه
            قبل از دم بعدی روی مانیتور ونتیلاتور — نه فقط عدد RR.
          </p>
        </section>
      </div>
    </div>
  );
}
