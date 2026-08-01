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
  LuTimer,
} from "react-icons/lu";
import { FaLungs, FaRegLightbulb } from "react-icons/fa";

// ---------------------------------------------------------------------
// Design tokens (shared family with the other parameter pages)
// ---------------------------------------------------------------------
const COLOR = "#7C3AED"; // violet — primary accent
const COLOR_WARN = "#D97706"; // amber — caution
const COLOR_GOOD = "#059669"; // emerald — relevance / evidence
const COLOR_BAD = "#DC2626"; // rose — elevated / risk
const COLOR_INFO = "#2563EB"; // sky — measurement / reference

// ---------------------------------------------------------------------
// Reference data
// ---------------------------------------------------------------------

const PARAMS = [
  {
    id: "plateau",
    label: "فشار پلاتو (Plateau Pressure)",
    desc: "فشار استاتیک آلوئولی در پایان دم",
    icon: <LuGauge size={20} />,
  },
  {
    id: "driving",
    label: "فشار درایوینگ (Driving Pressure)",
    desc: "پلاتو منهای PEEP؛ فشار مؤثر بر واحد کامپلیانس",
    icon: <LuActivity size={20} />,
  },
  {
    id: "gap",
    label: "اختلاف PIP − Plateau",
    desc: "شاخص مقاومت راه هوایی",
    icon: <LuWind size={20} />,
  },
];

const DETAILS = {
  plateau: {
    range: "کمتر از ۲۸",
    unit: "cmH2O",
    mechanism:
      "با ایجاد وقفهٔ دمی (inspiratory hold) به مدت ۰.۵ تا ۲ ثانیه در پایان دم، جریان گاز متوقف و فشار مدار با فشار آلوئولی برابر می‌شود؛ این مقدار فشار استاتیک، بدون تأثیر مقاومت راه هوایی است.",
    normalRange:
      "هدف: کمتر از ۲۸ cmH2O (مطابق توصیهٔ PALICC برای ونتیلاسیون محافظتی ریه در کودکان)",
    elevatedTitle: "اگر افزایش یابد",
    elevatedText:
      "نشان‌دهندهٔ کاهش کامپلیانس ریه یا قفسهٔ سینه است: ARDS، پنومونی/آتلکتازی، پنوموتوراکس، اتساع شکمی، افیوژن پلور یا ادم دیوارهٔ قفسه",
    relevanceTitle: "اهمیت بالینی",
    relevanceText:
      "پیش‌بینی‌کنندهٔ بهتر آسیب ریوی ناشی از ونتیلاتور (VILI) نسبت به PIP است، زیرا مستقیماً فشار واردشده بر آلوئول‌ها را نشان می‌دهد نه فشار مصرفی در راه هوایی",
    clinicalTip:
      "اندازه‌گیری دقیق نیازمند بیمار پاسیو (بدون تلاش تنفسی خودانگیخته) است؛ تلاش دمی یا بازدمی فعال حین وقفه، مقدار قرائت‌شده را غیرقابل‌اعتماد می‌کند.",
  },
  driving: {
    range: "کمتر از ۱۵",
    unit: "cmH2O",
    mechanism:
      "از تفریق PEEP تنظیم‌شده از فشار پلاتو محاسبه می‌شود: Driving Pressure = Plateau − PEEP. این مقدار، فشار مؤثری است که برای رساندن حجم جاری به بخش فعال ریه (functional lung size) لازم است.",
    normalRange:
      "هدف: کمتر از ۱۵ cmH2O (مبتنی بر شواهد آماتو و همکاران، ۲۰۱۵، در بزرگسالان؛ در کودکان همین هدف با احتیاط به‌کار می‌رود)",
    elevatedTitle: "اگر افزایش یابد",
    elevatedText:
      "با افزایش مستقل مرگ‌ومیر در بیماران با ARDS مرتبط است، صرف‌نظر از مقدار حجم جاری یا PEEP به‌تنهایی",
    relevanceTitle: "اهمیت بالینی",
    relevanceText:
      "بازتاب بهتری از فشار وارد بر بافت فعال ریه ارائه می‌دهد نسبت به حجم جاری تنها، چون اندازهٔ واقعی ریهٔ در حال تهویه را نیز لحاظ می‌کند",
    clinicalTip:
      "برای کاهش driving pressure، کاهش حجم جاری معمولاً روش ارجح‌تری نسبت به افزایش PEEP در ریهٔ با کامپلیانس پایین است.",
  },
  gap: {
    range: "کم و پایدار",
    unit: "cmH2O",
    mechanism:
      "اختلاف بین اوج فشار دمی (PIP) و فشار پلاتو، بخش فشار مصرف‌شده برای غلبه بر مقاومت راه هوایی و مدار را نشان می‌دهد؛ فرمول: Gap = PIP − Plateau.",
    normalRange:
      "بازهٔ طبیعی کوچک است؛ افزایش محسوس آن (نه لزوماً یک عدد ثابت) مطرح‌کنندهٔ مشکل مقاومتی است",
    elevatedTitle: "اگر افزایش یابد",
    elevatedText:
      "برونکواسپاسم، ترشحات راه هوایی، خم‌شدگی یا انسداد جزئی لولهٔ تراشه، یا مقاومت غیرطبیعی مدار",
    relevanceTitle: "اهمیت بالینی",
    relevanceText:
      "ابزار افتراقی سریع بر بالین: PIP بالا با Plateau طبیعی → مشکل مقاومتی (راه هوایی/مدار)؛ PIP و Plateau هر دو بالا با اختلاف کم → مشکل کامپلیانسی (ریه یا قفسهٔ سینه)",
    clinicalTip:
      "پیش از هر تصمیم درمانی بر اساس این اختلاف، از صحت وقفهٔ دمی (بیمار پاسیو، مدت کافی) مطمئن شوید تا نتیجه‌گیری نادرست نگیرید.",
  },
};

const CLINICAL_SCENARIOS = [
  {
    title: "ARDS متوسط تا شدید",
    desc: "کامپلیانس ریه کاهش‌یافته؛ هدف نگه‌داشتن پلاتو زیر ۲۸ و driving pressure زیر ۱۵ cmH2O",
    icon: <FaLungs size={16} />,
  },
  {
    title: "پنوموتوراکس یا افیوژن پلور",
    desc: "افزایش ناگهانی پلاتو همراه با افت اشباع اکسیژن؛ نیازمند بررسی فوری تصویربرداری",
    icon: <LuTriangleAlert size={16} />,
  },
  {
    title: "اتساع شکمی / آسیت",
    desc: "کاهش کامپلیانس دیواره قفسهٔ سینه از بیرون؛ ممکن است پلاتوی بالاتر از حد معمول قابل‌قبول باشد",
    icon: <LuActivity size={16} />,
  },
  {
    title: "خم‌شدگی یا انسداد لولهٔ تراشه",
    desc: "افزایش PIP بدون افزایش متناظر پلاتو؛ اختلاف PIP-Plateau بزرگ می‌شود",
    icon: <LuWind size={16} />,
  },
];

const TARGETS = [
  {
    condition: "ریهٔ طبیعی",
    plateau: "کمتر از ۲۸ cmH2O",
    driving: "کمتر از ۱۵ cmH2O",
  },
  {
    condition: "ARDS خفیف تا متوسط",
    plateau: "کمتر از ۲۸ cmH2O",
    driving: "کمتر از ۱۵ cmH2O",
  },
  {
    condition: "ARDS شدید / کامپلیانس بسیار پایین",
    plateau: "تا ۳۲ cmH2O با هایپرکاپنی مجاز",
    driving: "کمترین مقدار ممکن",
  },
  {
    condition: "کاهش کامپلیانس دیوارهٔ قفسه (ادم، آسیت)",
    plateau: "تا ۳۲ cmH2O با احتیاط و فردی‌سازی",
    driving: "فردی‌سازی‌شده",
  },
];

// ---------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------

function InspiratoryHoldWaveform() {
  return (
    <svg viewBox="0 0 480 170" className="w-full h-auto">
      <line
        x1="15"
        y1="140"
        x2="465"
        y2="140"
        stroke="#94A3B8"
        strokeWidth="1"
      />

      {/* rising inspiration */}
      <path
        d="M15,140 C 60,140 90,40 130,32"
        fill="none"
        stroke="#64748B"
        strokeWidth="2.5"
      />

      {/* plateau (hold) segment */}
      <line x1="130" y1="32" x2="230" y2="32" stroke={COLOR} strokeWidth="3" />
      <text x="140" y="20" fontSize="11" fill={COLOR} className="font-medium">
        وقفهٔ دمی (بدون جریان)
      </text>

      {/* PIP marker just before hold */}
      <circle cx="130" cy="32" r="4" fill={COLOR_BAD} />
      <text
        x="90"
        y="55"
        fontSize="11"
        fill={COLOR_BAD}
        className="font-medium"
      >
        PIP
      </text>

      {/* plateau marker */}
      <circle cx="225" cy="32" r="4" fill={COLOR} />
      <text x="228" y="48" fontSize="11" fill={COLOR} className="font-medium">
        Plateau
      </text>

      {/* expiration */}
      <path
        d="M230,32 C 270,32 300,140 340,140"
        fill="none"
        stroke="#64748B"
        strokeWidth="2.5"
      />
      <path
        d="M340,140 C 390,140 420,140 465,140"
        fill="none"
        stroke="#64748B"
        strokeWidth="2"
      />

      {/* PEEP baseline */}
      <line
        x1="15"
        y1="140"
        x2="465"
        y2="140"
        stroke={COLOR_INFO}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text
        x="360"
        y="155"
        fontSize="11"
        fill={COLOR_INFO}
        className="font-medium"
      >
        سطح PEEP
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------

export default function PlateauPage() {
  const [activeParam, setActiveParam] = useState("plateau");
  const detail = DETAILS[activeParam];
  const param = PARAMS.find((p) => p.id === activeParam);

  return (
    <div
      dir="rtl"
      className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide text-indigo-600"
                style={{ backgroundColor: `${COLOR}15` }}
              >
                PEDIATRIC MECHANICAL VENTILATION
              </span>
              <h1 className="flex items-center gap-3 text-3xl font-black text-slate-800 md:text-4xl">
                <LuGauge style={{ color: COLOR }} size={28} />
                فشار پلاتو
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Plateau Pressure · شاخص کامپلیانس ریه و ریسک آسیب ریوی
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2 text-center">
              <div className="font-mono text-[10px] text-slate-500">
                هدف پیشنهادی
              </div>
              <div className="font-mono text-sm font-bold leading-tight text-indigo-600">
                {detail.range}
                <span className="mr-1 text-xs text-slate-500">
                  {detail.unit}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-700">
            فشار پلاتو، فشار استاتیک راه هوایی در پایان دم و در غیاب جریان گاز
            است؛ برخلاف اوج فشار دمی (PIP) که تحت‌تأثیر مقاومت راه هوایی نیز
            قرار دارد، پلاتو مستقیماً کامپلیانس ریه و قفسهٔ سینه را منعکس
            می‌کند. کنترل این پارامتر، ستون اصلی استراتژی ونتیلاسیون محافظتی ریه
            (lung-protective ventilation) و پیشگیری از آسیب ریوی ناشی از
            ونتیلاتور در کودکان است.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5">
            {PARAMS.map((p) => {
              const active = activeParam === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveParam(p.id)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: active ? COLOR : "#F1F5F9",
                    color: active ? "#FFFFFF" : "#475569",
                    transform: active ? "scale(1.02)" : "scale(1)",
                    boxShadow: active ? `0 0 20px ${COLOR}44` : "none",
                  }}
                >
                  {p.icon}
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Details + Scenarios */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="rounded-xl p-2"
                  style={{ backgroundColor: `${COLOR}15`, color: COLOR }}
                >
                  {param.icon}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {param.label}
                  </h2>
                  <p className="text-sm text-slate-500">{param.desc}</p>
                </div>
              </div>

              {activeParam === "plateau" && (
                <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <InspiratoryHoldWaveform />
                </div>
              )}

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <div className="text-xs text-slate-500">
                      مکانیسم / نحوهٔ محاسبه
                    </div>
                    <div className="mt-1 text-sm leading-6 text-slate-700">
                      {detail.mechanism}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <div className="text-xs text-slate-500">بازهٔ هدف</div>
                    <div className="mt-1 text-sm leading-6 text-slate-700">
                      {detail.normalRange}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: `${COLOR_BAD}33`,
                      backgroundColor: `${COLOR_BAD}0D`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs font-medium"
                      style={{ color: COLOR_BAD }}
                    >
                      <LuTriangleAlert size={14} />
                      <span>{detail.elevatedTitle}</span>
                    </div>
                    <div className="mt-1 text-sm leading-6 text-slate-700">
                      {detail.elevatedText}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: `${COLOR_GOOD}33`,
                      backgroundColor: `${COLOR_GOOD}0D`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs font-medium"
                      style={{ color: COLOR_GOOD }}
                    >
                      <span className="text-lg">✓</span>
                      <span>{detail.relevanceTitle}</span>
                    </div>
                    <div className="mt-1 text-sm leading-6 text-slate-700">
                      {detail.relevanceText}
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-6"
                  style={{
                    borderColor: `${COLOR_WARN}40`,
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                <LuClock size={16} style={{ color: COLOR }} />
                علل شایع افزایش پلاتو
              </h3>
              <div className="space-y-3">
                {CLINICAL_SCENARIOS.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 transition hover:border-indigo-300/50"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span style={{ color: COLOR }}>{s.icon}</span>
                      <span className="text-sm font-semibold text-slate-700">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/60 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <LuTriangleAlert
                  className="mt-0.5 shrink-0 text-amber-600"
                  size={16}
                />
                <div>
                  <h4 className="text-xs font-bold text-amber-700">
                    نکته ایمنی
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-amber-700/80">
                    پلاتوی مداوم بالا، حتی با حجم جاری «طبیعی»، ریسک
                    بارو/ولوتروما و آسیب ریوی ناشی از ونتیلاتور را افزایش
                    می‌دهد؛ حجم جاری را پیش از افزایش PEEP بازبینی کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target reference table */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <LuTimer style={{ color: COLOR_INFO }} size={20} />
            <h2 className="text-xl font-bold text-slate-800">
              اهداف بر اساس وضعیت بالینی
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-600">
                    <th className="px-4 py-3 font-medium">وضعیت بالینی</th>
                    <th className="px-4 py-3 font-medium">هدف فشار پلاتو</th>
                    <th className="px-4 py-3 font-medium">
                      هدف Driving Pressure
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TARGETS.map((row, i) => (
                    <tr
                      key={row.condition}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {row.condition}
                      </td>
                      <td className="px-4 py-3 text-indigo-600">
                        {row.plateau}
                      </td>
                      <td className="px-4 py-3 text-indigo-600">
                        {row.driving}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick teaching */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50/80 to-slate-50/80 p-6 shadow-lg shadow-slate-200/60 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <LuBookOpen style={{ color: COLOR }} size={20} />
            <h2 className="text-xl font-bold text-slate-800">
              الگوریتم سریع تفسیر
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                n: "۱",
                title: "اندازه‌گیری صحیح",
                desc: "وقفهٔ دمی ۰.۵ تا ۲ ثانیه، بیمار کاملاً پاسیو و بدون تلاش تنفسی",
              },
              {
                n: "۲",
                title: "مقایسه با PIP",
                desc: "اختلاف زیاد → مشکل مقاومتی؛ اختلاف کم با هر دو بالا → مشکل کامپلیانسی",
              },
              {
                n: "۳",
                title: "محاسبهٔ Driving Pressure",
                desc: "پلاتو منهای PEEP؛ هدف نگه‌داشتن آن زیر ۱۵ cmH2O",
              },
              {
                n: "۴",
                title: "اقدام اصلاحی",
                desc: "کاهش حجم جاری، بهینه‌سازی PEEP، و درمان علت زمینه‌ای کاهش کامپلیانس",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div
                  className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: COLOR }}
                >
                  {step.n}
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-800">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
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
            borderColor: `${COLOR}40`,
            backgroundColor: `${COLOR}0D`,
            color: "#5B21B6",
          }}
        >
          <LuStethoscope
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: COLOR }}
          />
          <span>
            <strong className="text-slate-800">نکته : </strong>
            در طراحی ونتیلاسیون محافظتی ریه، فشار پلاتو به‌تنهایی کافی نیست؛
            driving pressure (پلاتو منهای PEEP) شاخصی است که اندازهٔ واقعی ریهٔ
            در حال تهویه را نیز لحاظ می‌کند و با پیامد بالینی ارتباط مستقل‌تری
            دارد. در بیمار با کامپلیانس به‌شدت کاهش‌یافته، اولویت را بر کاهش حجم
            جاری بگذارید تا صرفاً افزایش PEEP، مگر آن‌که استراتژی درمانی چیز
            دیگری ایجاب کند.
          </span>
        </div>
      </div>
    </div>
  );
}
