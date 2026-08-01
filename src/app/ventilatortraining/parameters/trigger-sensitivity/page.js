// import React from "react";

// function TriggerSensitivityPage() {
//   return <div>page</div>;
// }

// export default TriggerSensitivityPage;
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
} from "react-icons/lu";
import { FaLungs } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

const TRIGGER_TYPES = [
  {
    id: "flow",
    label: "تریگر جریانی (Flow Trigger)",
    desc: "رایج‌ترین روش در ونتیلاتورهای مدرن",
    icon: <LuWind size={20} />,
  },
  {
    id: "pressure",
    label: "تریگر فشاری (Pressure Trigger)",
    desc: "روش سنتی، همچنان کاربرد دارد",
    icon: <LuGauge size={20} />,
  },
  {
    id: "dual",
    label: "تریگر ترکیبی (Dual Trigger)",
    desc: "ترکیب فشار و جریان برای حساسیت بیشتر",
    icon: <LuActivity size={20} />,
  },
];

const DETAILS = {
  flow: {
    mechanism: "تشخیص جریان دمیده‌شده از مدار توسط بیمار",
    sensitivity: "حساسیت بالا (۰.۵-۲ L/min)",
    advantage: "مناسب برای نوزادان و کودکان با تلاش تنفسی ضعیف",
    disadvantage: "ممکن است با نشتی مدار تداخل داشته باشد",
    pediatric: "تنظیم ۱-۱.۵ L/min در نوزادان، ۲-۳ L/min در کودکان",
    clinical_tip: "در بیماران با Auto-PEEP، تریگر جریانی عملکرد بهتری دارد",
  },
  pressure: {
    mechanism: "تشخیص کاهش فشار مدار هنگام تلاش بیمار",
    sensitivity: "حساسیت پایین‌تر (۱-۳ cmH2O)",
    advantage: "ساده و قابل اعتماد در اکثر موارد",
    disadvantage: "تأخیر بیشتر در پاسخ‌دهی به تلاش بیمار",
    pediatric: "تنظیم ۱-۲ cmH2O در کودکان، حداکثر ۳ cmH2O",
    clinical_tip: "در نشتی مدار، تریگر فشاری ممکن است فعال نشود",
  },
  dual: {
    mechanism: "هر کدام از دو روش زودتر تشخیص دهد فعال می‌شود",
    sensitivity: "بیشترین حساسیت ممکن",
    advantage: "بهترین عملکرد در شرایط بالینی پیچیده",
    disadvantage: "ریسک Auto-triggering در صورت تنظیم نامناسب",
    pediatric: "ترکیب Flow 1 L/min + Pressure 1 cmH2O در نوزادان",
    clinical_tip: "مناسب برای بیماران با ناهماهنگی بیمار-ونتیلاتور",
  },
};

const CLINICAL_SCENARIOS = [
  {
    title: "نوزاد نارس با RDS",
    desc: "از Flow Trigger با حساسیت ۱-۱.۵ L/min شروع کنید",
    icon: <FaLungs size={16} />,
  },
  {
    title: "کودک با آسم شدید",
    desc: "در صورت Auto-PEEP، از Flow Trigger استفاده کنید",
    icon: <LuWind size={16} />,
  },
  {
    title: "بیماری عصبی-عضلانی",
    desc: "از Dual Trigger با تنظیمات حساس استفاده کنید",
    icon: <LuActivity size={16} />,
  },
];

const COLOR = "#8B5CF6";
const COLOR_WARN = "#F59E0B";

export default function TriggerSensitivityPage() {
  const [activeTrigger, setActiveTrigger] = useState("flow");
  const detail = DETAILS[activeTrigger];
  const trigger = TRIGGER_TYPES.find((t) => t.id === activeTrigger);

  return (
    <div
      dir="rtl"
      className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
                style={{ backgroundColor: `${COLOR}1A`, color: COLOR }}
              >
                PEDIATRIC MECHANICAL VENTILATION
              </span>
              <h1 className="flex items-center gap-3 text-3xl font-black text-white md:text-4xl">
                <LuActivity style={{ color: COLOR }} size={28} />
                حساسیت تریگر
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500">
                Trigger Sensitivity · مبنای هماهنگی بیمار-ونتیلاتور
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center">
                <div className="font-mono text-[10px] text-slate-500">
                  حساسیت پایه
                </div>
                <div
                  className="font-mono text-sm font-bold leading-tight"
                  style={{ color: COLOR }}
                >
                  {activeTrigger === "flow"
                    ? "۱-۲"
                    : activeTrigger === "pressure"
                      ? "۱-۳"
                      : "۱+۱"}
                  <span className="mr-1 text-xs text-slate-500">
                    {activeTrigger === "flow"
                      ? "L/min"
                      : activeTrigger === "pressure"
                        ? "cmH2O"
                        : "dual"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-400">
            تریگر یا ماشه، عاملی است که ونتیلاتور را به دمیدن سیکل تنفسی بعدی
            وادار می‌کند. انتخاب صحیح حساسیت تریگر، کلید هماهنگی مطلوب
            بیمار-ونتیلاتور و کاهش کار تنفسی است.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
            {TRIGGER_TYPES.map((t) => {
              const active = activeTrigger === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTrigger(t.id)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: active ? COLOR : "#161B26",
                    color: active ? "#060910" : "#94A3B8",
                    transform: active ? "scale(1.02)" : "scale(1)",
                    boxShadow: active ? `0 0 20px ${COLOR}44` : "none",
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trigger Details */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="rounded-xl bg-indigo-500/20 p-2"
                  style={{ color: COLOR }}
                >
                  {trigger.icon}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {trigger.label}
                  </h2>
                  <p className="text-sm text-slate-500">{trigger.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-black/20 p-4">
                    <div className="text-xs text-slate-500">مکانیسم</div>
                    <div className="mt-1 text-sm text-slate-200">
                      {detail.mechanism}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-black/20 p-4">
                    <div className="text-xs text-slate-500">حساسیت</div>
                    <div className="mt-1 text-sm text-slate-200">
                      {detail.sensitivity}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span className="text-lg">✓</span>
                      <span>مزیت</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      {detail.advantage}
                    </div>
                  </div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                    <div className="flex items-center gap-2 text-xs text-rose-400">
                      <span className="text-lg">✗</span>
                      <span>محدودیت</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      {detail.disadvantage}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-sky-400">
                    <LuStethoscope size={14} />
                    <span>تنظیم در کودکان</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {detail.pediatric}
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-6"
                  style={{
                    borderColor: `${COLOR_WARN}33`,
                    backgroundColor: `${COLOR_WARN}0D`,
                    color: "#FCD34D",
                  }}
                >
                  <FaRegLightbulb size={16} className="mt-0.5 shrink-0" />
                  <span>{detail.clinical_tip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* سناریوهای بالینی */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                <LuClock size={16} style={{ color: COLOR }} />
                سناریوهای بالینی
              </h3>
              <div className="space-y-3">
                {CLINICAL_SCENARIOS.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-slate-800 bg-black/20 p-3 transition hover:border-indigo-500/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: COLOR }}>{s.icon}</span>
                      <span className="text-sm font-semibold text-slate-200">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-start gap-3">
                <LuTriangleAlert
                  className="text-amber-400 mt-0.5 shrink-0"
                  size={16}
                />
                <div>
                  <h4 className="text-xs font-bold text-amber-400">
                    نکته ایمنی
                  </h4>
                  <p className="mt-1 text-xs text-amber-300/70 leading-5">
                    تنظیم بیش‌ازحد حساس تریگر (اعداد پایین) باعث Auto-triggering
                    و افزایش تعداد تنفس ناخواسته می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* آموزش سریع */}
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-indigo-950/40 to-slate-900/40 p-6 shadow-2xl shadow-black/40 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <LuBookOpen style={{ color: COLOR }} size={20} />
            <h2 className="text-xl font-bold text-white">
              آموزش سریع در ۳ قدم
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
              <div
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: COLOR, color: "#060910" }}
              >
                ۱
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">
                تشخیص نوع تریگر
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-5">
                بر اساس وضعیت بیمار، Flow یا Pressure یا Dual را انتخاب کنید
              </p>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
              <div
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: COLOR, color: "#060910" }}
              >
                ۲
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">
                تنظیم حساسیت
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-5">
                از پایین‌ترین حد شروع کنید و به‌تدریج افزایش دهید تا بیمار تلاش
                کند
              </p>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-black/20 p-4">
              <div
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: COLOR, color: "#060910" }}
              >
                ۳
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">پایش پاسخ</h4>
              <p className="mt-1 text-xs text-slate-500 leading-5">
                هماهنگی بیمار، کاپنوگرافی و کار تنفسی را ارزیابی کنید
              </p>
            </div>
          </div>
        </div>

        {/* نکته کلیدی */}
        <div
          className="flex items-start gap-3 rounded-2xl border px-5 py-4 text-xs leading-6"
          style={{
            borderColor: `${COLOR}33`,
            backgroundColor: `${COLOR}0D`,
            color: "#C4B5FD",
          }}
        >
          <LuStethoscope
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: COLOR }}
          />
          <span>
            <strong className="text-white">نکته فوق‌تخصصی:</strong> در کودکان با
            افزایش مقاومت راه هوایی (مثل آسم)، تریگر جریانی نسبت به تریگر فشاری
            عملکرد بهتری دارد زیرا با Auto-PEEP تداخل کمتری دارد. همیشه قبل از
            تنظیم تریگر، Auto-PEEP را با انجام End-Expiratory Hold اندازه‌گیری
            کنید.
          </span>
        </div>
      </div>
    </div>
  );
}
