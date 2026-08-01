"use client";

import { useState, useMemo } from "react";
import {
  LuGauge,
  LuTriangleAlert,
  LuArrowDownUp,
  LuActivity,
  LuBookOpen,
  LuStethoscope,
  LuFlaskConical,
} from "react-icons/lu";

const AGE_LIMITS = [
  {
    label: "نوزاد ترم",
    max: 25,
    note: "ریسک بالای بارو/والوتروما به‌دلیل حجم آلوئولی کوچک",
  },
  {
    label: "شیرخوار",
    max: 28,
    note: "لوله‌ی بدون کاف رایج‌تر → لیک محاسبه‌ی Vt واقعی را مخدوش می‌کند",
  },
  {
    label: "کودک (۱-۸ سال)",
    max: 30,
    note: "دیواره قفسه سینه کمپلیانت‌تر از بزرگسال",
  },
  {
    label: "نوجوان/بزرگسال‌نما",
    max: 35,
    note: "الگو به فیزیولوژی بزرگسال نزدیک می‌شود",
  },
];

const RESISTIVE_CAUSES = [
  {
    label: "برونکواسپاسم",
    tip: "پاسخ به برونکودیلاتور را در PIP بعدی چک کنید",
  },
  {
    label: "ترشحات/انسداد ETT",
    tip: "ساکشن؛ اگر رفع نشد، کینک یا بایت‌بلاک را رد کنید",
  },
  {
    label: "ETT با سایز نامناسب",
    tip: "مقاومت با توان چهارم شعاع رابطه‌ی عکس دارد (پوازوی)",
  },
];

const ELASTIC_CAUSES = [
  { label: "پنوموتوراکس", tip: "کاهش ناگهانی صداهای تنفسی + افت SpO2 همزمان" },
  {
    label: "ARDS / ادم ریوی",
    tip: "Driving Pressure معمولاً بیش از ۱۵ می‌شود",
  },
  {
    label: "اتساع شکمی / IAP بالا",
    tip: "دیستنشن شکم کمپلیانس دیواره قفسه را کاهش می‌دهد",
  },
];

export default function PeakInspiratoryPressurePage() {
  const [pip, setPip] = useState(28);
  const [pplateau, setPplateau] = useState(22);
  const [peep, setPeep] = useState(6);

  const resistiveComponent = useMemo(
    () => Math.max(pip - pplateau, 0),
    [pip, pplateau],
  );
  const drivingPressure = useMemo(
    () => Math.max(pplateau - peep, 0),
    [pplateau, peep],
  );

  const dpStatus = useMemo(() => {
    if (drivingPressure > 15)
      return {
        label: "بالای آستانه",
        color: "rose",
        note: "در مطالعات ARDS بزرگسال با افزایش مورتالیتی همراه بوده؛ در کودکان نیز به‌عنوان هدف درمانی به کار می‌رود",
      };
    if (drivingPressure > 12)
      return {
        label: "مرزی",
        color: "amber",
        note: "پایش نزدیک؛ به سمت کاهش Vt یا بهبود کمپلیانس حرکت کنید",
      };
    return {
      label: "در محدوده هدف",
      color: "teal",
      note: "زیر ۱۵ cmH2O، هدف حفاظت ریوی رعایت شده است",
    };
  }, [drivingPressure]);

  const COLORS = {
    amber: "bg-amber-600",
    rose: "bg-rose-600",
    teal: "bg-teal-600",
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-l from-orange-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/15 p-2.5 rounded-xl">
              <LuGauge size={24} />
            </div>
            <span className="text-orange-100 text-sm font-medium tracking-wide">
              پارامتر ونتیلاتور · فشار
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            حداکثر فشار دمی (PIP) و درایوینگ پرشر
          </h1>
          <div className="bg-white/10 rounded-xl px-5 py-3.5 font-mono text-sm text-orange-50 inline-block">
            PIP = (Flow × R<sub>aw</sub>) + (V<sub>T</sub> / C<sub>rs</sub>) +
            PEEP
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* معادله حرکت - تجزیه بصری */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuFlaskConical className="text-orange-600" size={20} />
            <h2 className="text-lg font-bold">تجزیه‌ی معادله‌ی حرکت</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-amber-50 border-r-4 border-amber-500 rounded-xl p-4">
              <div className="text-xs font-bold text-amber-700 mb-1.5">
                مؤلفه مقاومتی
              </div>
              <div className="font-mono text-sm text-amber-900 mb-2">
                Flow × R<sub>aw</sub>
              </div>
              <p className="text-xs text-amber-900/80 leading-6">
                فقط حین جریان هوا وجود دارد؛ در مکث دمی به صفر می‌رسد. PIP منهای
                Pplateau برابر همین مؤلفه است.
              </p>
            </div>
            <div className="bg-rose-50 border-r-4 border-rose-500 rounded-xl p-4">
              <div className="text-xs font-bold text-rose-700 mb-1.5">
                مؤلفه الاستیک
              </div>
              <div className="font-mono text-sm text-rose-900 mb-2">
                V<sub>T</sub> / C<sub>rs</sub>
              </div>
              <p className="text-xs text-rose-900/80 leading-6">
                کشش‌پذیری ریه و دیواره قفسه سینه؛ همان Pplateau منهای PEEP
                (Driving Pressure).
              </p>
            </div>
            <div className="bg-teal-50 border-r-4 border-teal-500 rounded-xl p-4">
              <div className="text-xs font-bold text-teal-700 mb-1.5">
                فشار پایه
              </div>
              <div className="font-mono text-sm text-teal-900 mb-2">PEEP</div>
              <p className="text-xs text-teal-900/80 leading-6">
                کف فشاری که در پایان بازدم حفظ می‌شود؛ نقطه‌ی شروع محاسبه.
              </p>
            </div>
          </div>
        </section>

        {/* محاسبه‌گر بالینی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuArrowDownUp className="text-orange-600" size={20} />
            <h2 className="text-lg font-bold">محاسبه‌گر بالینی</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "PIP", value: pip, setValue: setPip, min: 10, max: 55 },
              {
                label: "Pplateau",
                value: pplateau,
                setValue: setPplateau,
                min: 5,
                max: 45,
              },
              {
                label: "PEEP",
                value: peep,
                setValue: setPeep,
                min: 0,
                max: 20,
              },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  {f.label} (cmH2O)
                </label>
                <input
                  type="number"
                  value={f.value}
                  onChange={(e) => f.setValue(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                />
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  value={f.value}
                  onChange={(e) => f.setValue(Number(e.target.value))}
                  className="w-full accent-orange-600"
                />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-100 rounded-2xl p-5">
              <div className="text-xs font-medium text-slate-500 mb-1.5">
                مؤلفه مقاومتی (PIP − Pplateau)
              </div>
              <div className="text-2xl font-bold text-slate-800">
                {resistiveComponent}{" "}
                <span className="text-sm font-normal text-slate-500">
                  cmH2O
                </span>
              </div>
            </div>
            <div
              className={`${COLORS[dpStatus.color]} rounded-2xl p-5 text-white`}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium opacity-90 mb-1.5">
                <LuActivity size={14} />
                Driving Pressure (Pplateau − PEEP)
              </div>
              <div className="text-2xl font-bold mb-1">
                {drivingPressure}{" "}
                <span className="text-sm font-normal">cmH2O</span>
              </div>
              <div className="text-xs opacity-90">{dpStatus.label}</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-6">
            {dpStatus.note}
          </p>
        </section>

        {/* جدول مرجع سنی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuBookOpen className="text-orange-600" size={20} />
            <h2 className="text-lg font-bold">
              راهنمای آموزشی سقف PIP بر اساس سن
            </h2>
          </div>
          <div className="space-y-2.5">
            {AGE_LIMITS.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50"
              >
                <span className="shrink-0 text-sm font-bold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-lg">
                  &lt; {a.max}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {a.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.note}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-6">
            این اعداد راهنمای آموزشی عمومی‌اند و باید متناسب با شرایط بالینی هر
            بیمار (کمپلیانس پایه، پاتولوژی زمینه‌ای) فردی‌سازی شوند.
          </p>
        </section>

        {/* افتراق بالینی سریع */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-bold text-sm text-amber-900 mb-3">
              افزایش مؤلفه مقاومتی
            </h3>
            <div className="space-y-3">
              {RESISTIVE_CAUSES.map((c) => (
                <div key={c.label}>
                  <div className="text-xs font-semibold text-amber-900">
                    {c.label}
                  </div>
                  <div className="text-xs text-amber-900/70 mt-0.5">
                    {c.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
            <h3 className="font-bold text-sm text-rose-900 mb-3">
              افزایش مؤلفه الاستیک
            </h3>
            <div className="space-y-3">
              {ELASTIC_CAUSES.map((c) => (
                <div key={c.label}>
                  <div className="text-xs font-semibold text-rose-900">
                    {c.label}
                  </div>
                  <div className="text-xs text-rose-900/70 mt-0.5">{c.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* نکته‌ی بالینی کلیدی */}
        <section className="bg-slate-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <LuStethoscope size={20} className="text-orange-400" />
            <h2 className="text-lg font-bold">نکته‌ی کلیدی برای فراگیر</h2>
          </div>
          <p className="text-sm leading-7 text-slate-200">
            PIP به‌تنهایی معیار خوبی برای تصمیم‌گیری نیست. مانور تشخیصی سریع
            بالینی: با یک{" "}
            <span className="font-semibold text-white">
              مکث دمی سه‌ثانیه‌ای
            </span>{" "}
            Pplateau را اندازه بگیرید — اگر اختلاف PIP−Pplateau زیاد بود، مسیر
            تشخیصی به سمت راه هوایی می‌رود؛ اگر خودِ Pplateau بالا بود، مسیر به
            سمت پارانشیم ریه یا دیواره قفسه سینه می‌رود.
          </p>
        </section>

        {/* هشدار ایمنی */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <LuTriangleAlert
            className="text-amber-600 shrink-0 mt-0.5"
            size={18}
          />
          <p className="text-xs text-amber-900/90 leading-6">
            افت ناگهانی و هم‌زمان PIP و Pplateau معمولاً نشانه‌ی نشتی یا جدا شدن
            مدار است، نه بهبود بالینی — همیشه قبل از تفسیر ترند، اتصال مدار را
            چک کنید.
          </p>
        </section>
      </div>
    </div>
  );
}
