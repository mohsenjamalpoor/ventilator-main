const alarms = {
  "high-pressure": {
    title: "High Pressure Alarm",

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

    description:
      "کاهش فشار مدار تنفسی معمولاً به علت نشتی یا جدا شدن مدار ایجاد می‌شود.",

    cause: ["قطع شدن مدار", "نشتی ماسک یا لوله تراشه", "خروج ETT"],

    solution: ["بررسی اتصال مدار", "بررسی Leak", "فیکس کردن لوله تراشه"],

    nursing: ["بررسی صدای نشتی", "کنترل حجم جاری"],
  },

  apnea: {
    title: "Apnea Alarm",

    description: "عدم ایجاد تنفس توسط بیمار در زمان مشخص.",

    cause: ["قطع تنفس بیمار", "تنظیم نامناسب Apnea Time", "مشکل Trigger"],

    solution: ["بررسی بیمار", "تنظیم Trigger", "فعال کردن Backup Mode"],

    nursing: ["کنترل RR", "بررسی سطح هوشیاری"],
  },
};

export default async function AlarmDetail({ params }) {
  const { slug } = await params;
  console.log(slug);

  const alarm = alarms[slug];

  if (!alarm) {
    return <div className="p-10 text-center">Alarm پیدا نشد</div>;
  }

  return (
    <div dir="rtl" className="p-6 space-y-8">
      <div
        className="
bg-white
rounded-3xl
border
shadow
p-6
"
      >
        <h1
          className="
text-3xl
font-black
text-red-600
"
        >
          {alarm.title}
        </h1>

        <p
          className="
mt-4
text-gray-600
text-lg
"
        >
          {alarm.description}
        </p>
      </div>

      <div
        className="
grid
lg:grid-cols-3
gap-6
"
      >
        <Card title="علل ایجاد" items={alarm.cause} color="red" />

        <Card title="اقدامات اصلاحی" items={alarm.solution} color="green" />

        <Card title="نکات پرستاری" items={alarm.nursing} color="blue" />
      </div>
    </div>
  );
}

function Card({ title, items, color }) {
  const colors = {
    red: "bg-red-50",

    green: "bg-green-50",

    blue: "bg-blue-50",
  };

  return (
    <div
      className="
bg-white
border
rounded-2xl
shadow
p-5
"
    >
      <h2
        className="
text-xl
font-bold
mb-4
"
      >
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`
${colors[color]}
rounded-xl
p-3
`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
