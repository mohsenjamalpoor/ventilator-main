import Link from "next/link";
import {
  LuChevronLeft,
  LuTriangleAlert,
  LuWrench,
  LuStethoscope,
} from "react-icons/lu";

const PRIORITY = {
  high: { label: "اولویت بالا", chip: "bg-red-50 text-red-700 border-red-100" },
  medium: {
    label: "اولویت متوسط",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

const alarms = {
  "high-pressure": {
    title: "High Pressure Alarm",
    priority: "high",
    description:
      "این آلارم زمانی فعال می‌شود که فشار راه هوایی از حد تنظیم شده بالاتر رود.",
    cause: [
      "انسداد لوله تراشه",
      "ترشحات زیاد",
      "کاهش Compliance ریه",
      "برونکواسپاسم",
      "خم شدن مدار تنفسی",
    ],
    solution: [
      "بررسی وضعیت بیمار",
      "ساکشن تراشه",
      "بررسی مدار و لوله‌ها",
      "بررسی Auto PEEP",
      "تنظیم Pressure Limit",
    ],
    nursing: [
      "بررسی Chest Expansion",
      "کنترل SpO2",
      "گوش دادن به صداهای تنفسی",
    ],
  },

  "low-pressure": {
    title: "Low Pressure Alarm",
    priority: "high",
    description:
      "کاهش فشار مدار تنفسی معمولاً به علت نشتی یا جدا شدن مدار ایجاد می‌شود.",
    cause: ["قطع شدن مدار", "نشتی ماسک یا لوله تراشه", "خروج ETT"],
    solution: ["بررسی اتصال مدار", "بررسی Leak", "فیکس کردن لوله تراشه"],
    nursing: ["بررسی صدای نشتی", "کنترل حجم جاری"],
  },

  apnea: {
    title: "Apnea Alarm",
    priority: "high",
    description: "عدم ایجاد تنفس توسط بیمار در زمان مشخص.",
    cause: ["قطع تنفس بیمار", "تنظیم نامناسب Apnea Time", "مشکل Trigger"],
    solution: ["بررسی بیمار", "تنظیم Trigger", "فعال کردن Backup Mode"],
    nursing: ["کنترل RR", "بررسی سطح هوشیاری"],
  },
};

export default async function AlarmDetail({ params }) {
  const { slug } = await params;
  const alarm = alarms[slug];

  if (!alarm) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-10 text-center"
      >
        <p className="font-mono text-xs font-bold uppercase tracking-wide text-slate-400">
          404 · Alarm Not Found
        </p>
        <h1 className="text-xl font-bold text-slate-700">
          آلارمی با این مشخصات پیدا نشد
        </h1>
        <Link
          href="/ventilatortraining/alarm"
          className="mt-2 inline-flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
        >
          بازگشت به لیست آلارم‌ها
          <LuChevronLeft />
        </Link>
      </div>
    );
  }

  const p = PRIORITY[alarm.priority] ?? PRIORITY.medium;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6 space-y-8">
      <Link
        href="/ventilatortraining/alarm"
        className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600"
      >
        <LuChevronLeft className="rotate-180" />
        بازگشت به لیست آلارم‌ها
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold ${p.chip}`}
          >
            {p.label}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-slate-400">
            {slug}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-black text-slate-900">
          {alarm.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          {alarm.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          step="۰۱"
          title="علل ایجاد"
          items={alarm.cause}
          icon={LuTriangleAlert}
          tone="red"
        />
        <Card
          step="۰۲"
          title="اقدامات اصلاحی"
          items={alarm.solution}
          icon={LuWrench}
          tone="green"
        />
        <Card
          step="۰۳"
          title="نکات پرستاری"
          items={alarm.nursing}
          icon={LuStethoscope}
          tone="blue"
        />
      </div>
    </div>
  );
}

function Card({ step, title, items, icon: Icon, tone }) {
  const tones = {
    red: {
      badge: "bg-red-50 text-red-600 border-red-100",
      item: "bg-red-50/60 border-red-100",
    },
    green: {
      badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
      item: "bg-emerald-50/60 border-emerald-100",
    },
    blue: {
      badge: "bg-blue-50 text-blue-600 border-blue-100",
      item: "bg-blue-50/60 border-blue-100",
    },
  };
  const c = tones[tone];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base ${c.badge}`}
        >
          <Icon />
        </span>
        <div>
          <p className="font-mono text-[10px] font-bold text-slate-300">
            {step}
          </p>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className={`rounded-xl border px-3 py-2.5 text-sm leading-6 text-slate-700 ${c.item}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
