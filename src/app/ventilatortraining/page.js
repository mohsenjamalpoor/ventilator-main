import { FaLungs, FaBookMedical, FaChartLine } from "react-icons/fa";

const topics = [
  {
    step: "۰۱",
    icon: <FaBookMedical />,
    title: "مبانی ونتیلاتور",
    text: "شناخت اجزا، مدار تنفسی و اصول تهویه",
  },
  {
    step: "۰۲",
    icon: <FaLungs />,
    title: "Mode ها",
    text: "VCV، PCV، SIMV، CPAP و تنظیمات",
  },
  {
    step: "۰۳",
    icon: <FaChartLine />,
    title: "Waveform",
    text: "تحلیل منحنی فشار، جریان و حجم",
  },
];

export default function VentilatorTrainingPage() {
  return (
    <div dir="rtl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wide text-blue-500">
          شروع مسیر یادگیری
        </p>

        <h1 className="text-3xl font-extrabold text-slate-900">
          آموزش ونتیلاتور
        </h1>

        <p className="mt-4 max-w-xl leading-8 text-slate-500">
          یادگیری تهویه مکانیکی از مبانی تا مدیریت بیماران PICU
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.step} {...topic} />
        ))}
      </div>
    </div>
  );
}

function Card({ step, icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300">
      <div className="flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-2xl text-blue-600">
          {icon}
        </span>
        <span className="font-mono text-xs font-bold text-slate-300">
          {step}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 leading-8 text-slate-500">{text}</p>
    </div>
  );
}
