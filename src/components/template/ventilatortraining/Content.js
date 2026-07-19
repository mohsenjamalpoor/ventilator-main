"use client";

export default function Content({ activeItem }) {
  const content = {
    intro: {
      title: "مقدمه",
      description: `
ونتیلاتور دستگاهی است که برای حمایت یا جایگزینی تنفس بیمار استفاده می‌شود.
این دستگاه با ایجاد فشار مثبت هوا را وارد ریه کرده و در بازدم اجازه خروج هوا را می‌دهد.
هدف از ونتیلاتور حفظ اکسیژناسیون و تهویه مناسب بیمار است.
      `,
    },

    mode: {
      title: "Mode های ونتیلاتور",
      description: `
مدهای ونتیلاتور تعیین می‌کنند دستگاه چگونه به بیمار تنفس بدهد.
مدهای پرکاربرد شامل:

• Volume Control (VC)

• Pressure Control (PC)

• SIMV

• PSV

• CPAP

• PRVC
      `,
    },

    pressure: {
      title: "Pressure-Time Waveform",
      description: `
در این موج تغییرات فشار راه هوایی نسبت به زمان نمایش داده می‌شود.

کاربردها:

• بررسی Peak Pressure

• بررسی Plateau Pressure

• تشخیص Auto PEEP

• بررسی مقاومت راه هوایی
      `,
    },

    flow: {
      title: "Flow-Time Waveform",
      description: `
این موج جریان هوا را نسبت به زمان نشان می‌دهد.

کاربردها:

• بررسی Air Trapping

• تشخیص Auto PEEP

• بررسی Leak
      `,
    },

    volume: {
      title: "Volume-Time Waveform",
      description: `
این نمودار حجم جاری بیمار را در طول زمان نمایش می‌دهد.

کاربرد:

• بررسی Tidal Volume

• بررسی نشت هوا

• کنترل تهویه
      `,
    },

    pvloop: {
      title: "Pressure Volume Loop",
      description: `
یکی از مهم‌ترین Loop ها برای بررسی کامپلاینس ریه است.

کاربرد:

• تشخیص Over Distension

• تشخیص Recruitment

• بررسی Compliance
      `,
    },

    fvloop: {
      title: "Flow Volume Loop",
      description: `
این Loop جهت بررسی انسداد راه هوایی و نشت هوا استفاده می‌شود.

کاربرد:

• Airway Obstruction

• Leak

• Bronchospasm
      `,
    },

    alarm: {
      title: "Alarm های ونتیلاتور",
      description: `
مهم‌ترین آلارم‌ها:

• High Pressure

• Low Pressure

• Low Minute Volume

• Apnea

• High Respiratory Rate
      `,
    },

    complication: {
      title: "عوارض ونتیلاتور",
      description: `
از مهم‌ترین عوارض:

• VAP

• Barotrauma

• Volutrauma

• Oxygen Toxicity

• Auto PEEP

• Hemodynamic Instability
      `,
    },
  };

  const current = content[activeItem];

  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 border-b pb-4">
        {current.title}
      </h1>

      <div className="leading-9 whitespace-pre-line text-gray-700 text-lg">
        {current.description}
      </div>
    </div>
  );
}
