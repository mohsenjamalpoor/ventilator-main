"use client";

import { useState } from "react";
import Link from "next/link";

import ProfileAlarm from "@/components/template/profileventilator/ProfileAlarm";

import {
  LuGauge,
  LuArrowDown,
  LuWind,
  LuWaves,
  LuActivity,
  LuChevronLeft,
} from "react-icons/lu";

const PRIORITY = {
  high: {
    label: "اولویت بالا",
    dot: "bg-red-600",
    chip: "bg-red-50 text-red-700 border-red-100",
    pulse: true,
  },
  medium: {
    label: "اولویت متوسط",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    pulse: false,
  },
};

const alarms = [
  {
    title: "High Pressure Alarm",
    slug: "high-pressure",
    description: "افزایش فشار راه هوایی بیمار",
    icon: LuGauge,
    priority: "high",
  },
  {
    title: "Low Pressure Alarm",
    slug: "low-pressure",
    description: "کاهش فشار مدار تنفسی",
    icon: LuArrowDown,
    priority: "high",
  },
  {
    title: "Apnea Alarm",
    slug: "apnea",
    description: "قطع تنفس بیمار",
    icon: LuWind,
    priority: "high",
  },
  {
    title: "Low Tidal Volume",
    slug: "low-volume",
    description: "کاهش حجم جاری",
    icon: LuWaves,
    priority: "medium",
  },
  {
    title: "High Respiratory Rate",
    slug: "high-rate",
    description: "افزایش تعداد تنفس",
    icon: LuActivity,
    priority: "medium",
  },
];

export default function AlarmPage() {
  const [activeTab, setActiveTab] = useState("alarm");

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6">
      <header className="mb-8">
        <p className="text-xs font-bold tracking-wide text-slate-400 font-mono uppercase mb-1">
          Ventilator Training · Module 04
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900">آلارم‌ها</h1>
        <p className="mt-1 text-sm text-slate-500">
          طبقه‌بندی بر اساس اولویت بالینی — قرمز یعنی نیاز به اقدام فوری
        </p>
      </header>

      <div className="relative mb-8 inline-flex w-full max-w-md rounded-2xl bg-slate-200/60 p-1">
        <div
          className="absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-md transition-transform duration-300 ease-out"
          style={{
            transform:
              activeTab === "alarm" ? "translateX(0%)" : "translateX(-100%)",
          }}
        />
        <button
          onClick={() => setActiveTab("alarm")}
          className={`relative z-10 flex-1 rounded-xl py-2.5 text-sm font-bold transition-colors ${
            activeTab === "alarm" ? "text-slate-900" : "text-slate-500"
          }`}
        >
          آلارم‌ها
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`relative z-10 flex-1 rounded-xl py-2.5 text-sm font-bold transition-colors ${
            activeTab === "profile" ? "text-slate-900" : "text-slate-500"
          }`}
        >
          آلارم‌های ونتیلاتور
        </button>
      </div>

      {activeTab === "alarm" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {alarms.map((alarm, i) => {
            const p = PRIORITY[alarm.priority];
            const Icon = alarm.icon;
            return (
              <Link
                key={alarm.slug}
                href={`/ventilatortraining/alarm/${alarm.slug}`}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group animate-[fadeIn_0.4s_ease-out_both] relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className="relative mt-1 flex h-3 w-3 shrink-0">
                  {p.pulse && (
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${p.dot} opacity-60`}
                    />
                  )}
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${p.dot}`}
                  />
                </span>

                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${p.chip} text-lg`}
                >
                  <Icon />
                </span>

                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 leading-tight">
                      {alarm.title}
                    </span>
                    <LuChevronLeft className="mt-0.5 shrink-0 text-slate-300 transition-transform group-hover:-translate-x-1" />
                  </span>

                  <span
                    className={`mt-1.5 inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${p.chip}`}
                  >
                    {p.label}
                  </span>

                  <span className="mt-2 block text-sm text-slate-500">
                    {alarm.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <ProfileAlarm />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
