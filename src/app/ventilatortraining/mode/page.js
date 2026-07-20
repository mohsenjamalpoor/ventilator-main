"use client";

import { useState } from "react";

import {
  FaLungs,
  FaChartLine,
  FaWaveSquare,
  FaUserMd,
  FaCheckCircle,
} from "react-icons/fa";

const tabs = ["معرفی", "تنظیمات", "Waveform", "کاربرد بالینی", "Quiz"];

export default function VentilatorModePage() {
  const [activeTab, setActiveTab] = useState("معرفی");

  return (
    <div dir="rtl">
      {/* Header */}

      <div
        className="
rounded-3xl
bg-gradient-to-l
from-blue-700
to-cyan-500
p-8
text-white
"
      >
        <div className="flex items-center gap-4">
          <div
            className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-white/20
text-4xl
"
          >
            <FaLungs />
          </div>

          <div>
            <h1
              className="
text-3xl
font-extrabold
"
            >
              Ventilator Modes
            </h1>

            <p
              className="
mt-2
text-blue-100
"
            >
              آشنایی کامل با مدهای تهویه مکانیکی
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div
        className="
mt-8
flex
flex-wrap
gap-3
"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
rounded-xl
px-5
py-3
font-semibold
transition

${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-50"}

`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}

      <div
        className="
mt-8
rounded-3xl
border
bg-white
p-8
shadow-sm
"
      >
        {activeTab === "معرفی" && <Introduction />}

        {activeTab === "تنظیمات" && <Settings />}

        {activeTab === "Waveform" && <Waveform />}

        {activeTab === "کاربرد بالینی" && <Clinical />}

        {activeTab === "Quiz" && <Quiz />}
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <div className="space-y-5">
      <h2
        className="
text-2xl
font-bold
"
      >
        Volume Control Mode
      </h2>

      <p
        className="
leading-9
text-gray-600
"
      >
        در مد Volume Control دستگاه ونتیلاتور حجم جاری (Tidal Volume) مشخص شده
        را در هر سیکل تنفسی به بیمار تحویل می‌دهد. فشار ایجاد شده بر اساس
        کامپلاینس و مقاومت راه هوایی بیمار تغییر می‌کند.
      </p>

      <div
        className="
grid
gap-4
md:grid-cols-3
"
      >
        <Info icon={<FaLungs />} title="هدف" text="تحویل حجم ثابت" />

        <Info icon={<FaChartLine />} title="کنترل" text="Volume" />

        <Info icon={<FaWaveSquare />} title="Wave" text="Flow ثابت" />
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold">تنظیمات اولیه</h2>

      <div
        className="
mt-5
grid
gap-4
md:grid-cols-2
"
      >
        {[
          ["Tidal Volume", "6-8 ml/kg"],
          ["Respiratory Rate", "20-30 bpm"],
          ["PEEP", "5 cmH2O"],
          ["FiO2", "شروع 100% سپس کاهش"],
        ].map((item) => (
          <div
            key={item[0]}
            className="
rounded-xl
bg-slate-50
p-5
"
          >
            <p className="font-bold">{item[0]}</p>

            <p className="mt-2 text-blue-600">{item[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Waveform() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Waveform Analysis</h2>

      <div
        className="
mt-5
h-64
rounded-2xl
bg-slate-900
flex
items-center
justify-center
text-white
"
      >
        محل نمایش Waveform
      </div>
    </div>
  );
}

function Clinical() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Case Study</h2>

      <p className="mt-5 leading-9 text-gray-600">
        کودک ۵ ساله با نارسایی تنفسی وارد PICU شده است. انتخاب Mode مناسب و
        تنظیم پارامترها را انجام دهید.
      </p>
    </div>
  );
}

function Quiz() {
  return (
    <div>
      <h2 className="text-2xl font-bold">آزمون کوتاه</h2>

      <div
        className="
mt-5
rounded-xl
bg-green-50
p-5
"
      >
        <FaCheckCircle className="text-green-600 text-2xl" />

        <p className="mt-3">در Volume Control کدام پارامتر ثابت است؟</p>
      </div>
    </div>
  );
}

function Info({ icon, title, text }) {
  return (
    <div
      className="
rounded-2xl
bg-blue-50
p-5
"
    >
      <div className="text-blue-600 text-2xl">{icon}</div>

      <h3 className="mt-3 font-bold">{title}</h3>

      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}
