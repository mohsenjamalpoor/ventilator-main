"use client";

import React, { useState } from "react";
import {
  LuArrowUp,
  LuArrowDown,
  LuTimerOff,
  LuChevronLeft,
} from "react-icons/lu";
import ModalContainer from "@/components/partials/container/ModalContainer";

const alarms = [
  {
    title: "Respiratory Rate (RR)",
    high: "RR × 2",
    low: "RR / 2",
    modalDescription:
      "آلارم RR زمانی فعال می‌شود که تعداد تنفس بیمار از محدوده تنظیم شده بیشتر یا کمتر شود. مقدار High معمولاً دو برابر RR تنظیم شده و مقدار Low نصف RR تنظیم شده است.",
  },
  {
    title: "Peak Inspiratory Pressure (PIP)",
    high: "PIP + 5 or 10 cmH₂O",
    low: "PEEP + (PIP−PEEP) / 2",
    modalDescription:
      "افزایش PIP می‌تواند نشان‌دهنده انسداد راه هوایی، ترشحات زیاد، کاهش Compliance ریه یا برونکواسپاسم باشد. کاهش PIP ممکن است نشانه نشتی مدار یا جدا شدن بیمار از ونتیلاتور باشد.",
  },
  {
    title: "Minute Ventilation (Ve)",
    high: "Ve × 2",
    low: "Ve / 2",
    modalDescription:
      "Minute Ventilation حاصل حجم جاری ضربدر تعداد تنفس است. تغییرات شدید آن می‌تواند نشان‌دهنده تغییر وضعیت تنفسی بیمار باشد.",
  },
  {
    title: "Apnea Interval",
    description:
      "Set based on patient size and RR for age (Infant ≅ 10 seconds, Older child ≅ 20 seconds)",
    modalDescription:
      "آلارم Apnea زمانی فعال می‌شود که بیمار برای مدت مشخصی تنفس نداشته باشد. این زمان بر اساس سن و وضعیت بیمار تنظیم می‌شود.",
  },
  {
    title: "PEEP",
    high: "PEEP + 2",
    low: "PEEP - 2",
    modalDescription:
      "PEEP فشار مثبت انتهای بازدم است. تغییرات آن باید با توجه به اکسیژناسیون و وضعیت ریه بیمار انجام شود.",
  },
];

function ThresholdRow({ direction, formula }) {
  const isHigh = direction === "high";
  const config = isHigh
    ? {
        label: "High",
        icon: LuArrowUp,
        chip: "bg-red-50 text-red-600 border-red-100",
      }
    : {
        label: "Low",
        icon: LuArrowDown,
        chip: "bg-blue-50 text-blue-600 border-blue-100",
      };
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs ${config.chip}`}
      >
        <Icon />
      </span>
      <span
        className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${config.chip}`}
      >
        {config.label}
      </span>
      <span
        dir="ltr"
        className="mr-auto font-mono text-sm font-semibold text-slate-700"
      >
        {formula}
      </span>
    </div>
  );
}

function ProfileAlarm() {
  const [selectedAlarm, setSelectedAlarm] = useState(null);

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-wide text-slate-400">
            Alarm Limits · Reference
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900">
            آلارم‌های ونتیلاتور
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300"
            >
              <h3 className="mb-4 text-center text-lg font-bold text-slate-900">
                {alarm.title}
              </h3>

              {alarm.description && (
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5">
                  <LuTimerOff className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-sm leading-6 text-slate-600">
                    {alarm.description}
                  </p>
                </div>
              )}

              {(alarm.high || alarm.low) && (
                <div className="mb-4 flex flex-col gap-2">
                  {alarm.high && (
                    <ThresholdRow direction="high" formula={alarm.high} />
                  )}
                  {alarm.low && (
                    <ThresholdRow direction="low" formula={alarm.low} />
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedAlarm(alarm)}
                className="group mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                توضیحات بیشتر
                <LuChevronLeft className="transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ModalContainer
        isOpen={!!selectedAlarm}
        setIsOpen={() => setSelectedAlarm(null)}
      >
        <div className="w-[90vw] overflow-hidden rounded-2xl bg-white shadow-xl md:w-[500px]">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 className="text-center text-xl font-bold text-slate-900">
              {selectedAlarm?.title}
            </h2>
          </div>

          <div className="p-6">
            <p className="text-right leading-8 text-slate-600">
              {selectedAlarm?.modalDescription ||
                selectedAlarm?.description ||
                "توضیحی برای این آلارم ثبت نشده است."}
            </p>

            <button
              onClick={() => setSelectedAlarm(null)}
              className="mt-6 w-full rounded-xl bg-slate-100 py-2.5 font-bold text-slate-600 transition hover:bg-slate-200"
            >
              بستن
            </button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
}

export default ProfileAlarm;
