"use client";

import { useState } from "react";
import {
  FaLungs,
  FaWaveSquare,
  FaTachometerAlt,
  FaClock,
  FaWind,
} from "react-icons/fa";
import { LuGauge, LuTimer, LuDroplet, LuActivity } from "react-icons/lu";

const parameters = [
  {
    id: "vt",
    title: "حجم جاری",
    subtitle: "Tidal Volume (VT)",
    icon: <FaLungs />,
    range: "۴ تا ۸ میلی‌لیتر به ازای هر کیلوگرم وزن ایده‌آل بدن",
    description:
      "حجم هوایی است که در هر تنفس (طبیعی یا با دستگاه) وارد ریه می‌شود. این پارامتر مستقیماً روی تهویه دقیقه‌ای و سطح CO2 خون اثر می‌گذارد.",
    clinicalNote:
      "در ARDS یا آسیب حاد ریوی، رویکرد تهویه محافظتی ریه توصیه می‌شود: VT در محدوده ۴ تا ۶ میلی‌لیتر/کیلوگرم. حجم جاری بالا خطر بارو‌تروما و ولوتروما را افزایش می‌دهد.",
    warning: "high",
  },
  {
    id: "rr",
    title: "تعداد تنفس",
    subtitle: "Respiratory Rate (RR)",
    icon: <FaWaveSquare />,
    range:
      "نوزادان: ۳۰ تا ۶۰ | شیرخواران: ۲۰ تا ۳۰ | کودکان: ۱۵ تا ۲۵ | نوجوانان: ۱۲ تا ۲۰ (تنفس در دقیقه)",
    description:
      "تعداد دفعاتی که دستگاه (یا بیمار) در یک دقیقه تنفس انجام می‌دهد. همراه با VT، تهویه دقیقه‌ای را می‌سازد و اثر مستقیم روی PaCO2 دارد.",
    clinicalNote:
      "تنظیم RR باید بر اساس گاز خون شریانی (به‌ویژه PaCO2 و pH) انجام شود، نه صرفاً بر اساس سن. افزایش بیش از حد RR می‌تواند باعث Auto-PEEP شود.",
    warning: "medium",
  },
  {
    id: "peep",
    title: "فشار مثبت انتهای بازدمی",
    subtitle: "PEEP",
    icon: <LuGauge />,
    range:
      "پایه: ۳ تا ۵ سانتی‌متر آب | در ARDS یا هیپوکسمی شدید: ۸ تا ۱۵ سانتی‌متر آب",
    description:
      "فشاری که در پایان بازدم در راه هوایی و آلوئول‌ها باقی می‌ماند تا از کلاپس آلوئولی جلوگیری کند و ظرفیت باقی‌مانده عملکردی (FRC) را حفظ کند.",
    clinicalNote:
      "PEEP بالا می‌تواند برگشت وریدی و برون‌ده قلبی را کاهش دهد و خطر بارو‌تروما را افزایش دهد. باید با پایش فشار خون و اکسیژناسیون تنظیم شود.",
    warning: "high",
  },
  {
    id: "pip",
    title: "فشار اوج دمی",
    subtitle: "Peak Inspiratory Pressure (PIP)",
    icon: <FaTachometerAlt />,
    range: "معمولاً کمتر از ۳۰ تا ۳۵ سانتی‌متر آب",
    description:
      "بالاترین فشاری که در طول دم در مدار ونتیلاتور و راه هوایی ثبت می‌شود. تحت تأثیر مقاومت راه هوایی، کمپلیانس ریه و جریان دمی است.",
    clinicalNote:
      "افزایش ناگهانی PIP می‌تواند نشانه انسداد لوله، برونکواسپاسم یا پنوموتوراکس باشد و نیاز به بررسی فوری دارد.",
    warning: "high",
  },
  {
    id: "plateau",
    title: "فشار پلاتو",
    subtitle: "Plateau Pressure",
    icon: <LuActivity />,
    range: "ترجیحاً کمتر از ۲۸ تا ۳۰ سانتی‌متر آب",
    description:
      "فشاری که با یک مکث دمی کوتاه اندازه‌گیری می‌شود و بازتاب‌دهنده فشار آلوئولی و کمپلیانس استاتیک ریه است، نه مقاومت راه هوایی.",
    clinicalNote:
      "فاصله زیاد بین PIP و Plateau نشان‌دهنده مقاومت بالای راه هوایی است (مثلاً ترشحات یا برونکواسپاسم)، در حالی که فشار پلاتوی بالا با PIP نزدیک به آن، نشانه کاهش کمپلیانس ریه است.",
    warning: "medium",
  },
  {
    id: "ie",
    title: "نسبت دم به بازدم",
    subtitle: "I:E Ratio",
    icon: <FaClock />,
    range: "معمولاً ۱:۲ تا ۱:۳",
    description:
      "نسبت زمان صرف‌شده برای دم به زمان صرف‌شده برای بازدم در یک سیکل تنفسی.",
    clinicalNote:
      "در بیماری‌های انسدادی مثل آسم یا برونشیولیت، بازدم طولانی‌تر (نسبت معکوس) برای جلوگیری از احتباس هوا و Auto-PEEP لازم است.",
    warning: "low",
  },
  {
    id: "fio2",
    title: "غلظت اکسیژن دمی",
    subtitle: "FiO2",
    icon: <LuDroplet />,
    range:
      "شروع معمولاً ۱۰۰٪، سپس کاهش تدریجی تا کمترین مقدار لازم برای SpO2 حدود ۹۲ تا ۹۴٪",
    description: "درصد اکسیژن موجود در گاز دمی که به بیمار داده می‌شود.",
    clinicalNote:
      "قرارگیری طولانی‌مدت در FiO2 بالا (بالای ۶۰٪) خطر مسمومیت با اکسیژن و در نوزادان نارس خطر رتینوپاتی نارسی (ROP) را افزایش می‌دهد.",
    warning: "medium",
  },
  {
    id: "ti",
    title: "زمان دم",
    subtitle: "Inspiratory Time (Ti)",
    icon: <LuTimer />,
    range:
      "نوزادان: ۰.۳ تا ۰.۵ ثانیه | شیرخواران: ۰.۴ تا ۰.۶ ثانیه | کودکان: ۰.۶ تا ۱.۰ ثانیه",
    description:
      "مدت زمانی که فاز دمی سیکل تنفسی طول می‌کشد و روی نسبت I:E و توزیع گاز در ریه اثر می‌گذارد.",
    clinicalNote:
      "زمان دم بیش از حد کوتاه ممکن است باعث توزیع نامناسب گاز شود؛ زمان دم طولانی ممکن است باعث ناراحتی بیمار و عدم هماهنگی با دستگاه (Asynchrony) شود.",
    warning: "low",
  },
  {
    id: "trigger",
    title: "حساسیت تریگر",
    subtitle: "Trigger Sensitivity",
    icon: <FaWind />,
    range:
      "تریگر فشاری: معمولاً ۱- تا ۲- سانتی‌متر آب | تریگر جریانی: معمولاً ۱ تا ۳ لیتر بر دقیقه",
    description:
      "حداقل تلاش بیمار (بر اساس افت فشار یا تغییر جریان) که باعث می‌شود دستگاه یک تنفس را شروع کند.",
    clinicalNote:
      "حساسیت بیش از حد بالا می‌تواند باعث Auto-triggering (تنفس‌های کاذب) شود؛ حساسیت پایین باعث افزایش کار تنفسی بیمار می‌شود.",
    warning: "medium",
  },
];

const warningStyles = {
  high: "bg-red-50 text-red-600 border-red-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  low: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const warningLabel = {
  high: "پارامتر پرخطر",
  medium: "نیازمند پایش دقیق",
  low: "خطر نسبتاً کم",
};

export default function VentilatorParameterPage() {
  const [selectedId, setSelectedId] = useState(parameters[0].id);
  const selected = parameters.find((p) => p.id === selectedId);

  return (
    <div dir="rtl" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* لیست پارامترها */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl lg:col-span-1">
        <h2 className="mb-4 px-2 text-lg font-extrabold text-slate-900">
          پارامترهای ونتیلاتور
        </h2>
        <ul className="flex flex-col gap-1">
          {parameters.map((param) => {
            const active = param.id === selectedId;
            return (
              <li key={param.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(param.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-right transition-all duration-300 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-base ${
                      active
                        ? "border-white bg-white text-blue-600"
                        : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {param.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold">{param.title}</span>
                    <span
                      className={`text-xs ${
                        active ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {param.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* جزئیات پارامتر انتخاب‌شده */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:col-span-2">
        <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">
            {selected.icon}
          </span>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {selected.title}
            </h3>
            <p className="text-sm text-slate-400">{selected.subtitle}</p>
          </div>
        </div>

        <div className="mb-4">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${
              warningStyles[selected.warning]
            }`}
          >
            {warningLabel[selected.warning]}
          </span>
        </div>

        <section className="mb-5">
          <h4 className="mb-1 text-sm font-bold text-slate-500">
            محدوده طبیعی
          </h4>
          <p className="rounded-2xl bg-blue-50 px-4 py-3 text-slate-800">
            {selected.range}
          </p>
        </section>

        <section className="mb-5">
          <h4 className="mb-1 text-sm font-bold text-slate-500">توضیح</h4>
          <p className="leading-7 text-slate-700">{selected.description}</p>
        </section>

        <section>
          <h4 className="mb-1 text-sm font-bold text-slate-500">نکته بالینی</h4>
          <p className="rounded-2xl bg-amber-50 px-4 py-3 leading-7 text-amber-900">
            {selected.clinicalNote}
          </p>
        </section>
      </div>
    </div>
  );
}
