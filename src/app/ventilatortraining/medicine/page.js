"use client";

import { useState } from "react";

const inhalationMedicines = [
  {
    name: "Salbutamol",
    description: "برونکودیلاتور برای درمان برونکواسپاسم",
  },
  {
    name: "Ipratropium",
    description: "آنتی‌کولینرژیک جهت کاهش اسپاسم راه هوایی",
  },
  {
    name: "Budesonide",
    description: "کورتیکواستروئید استنشاقی",
  },
];

const injectableMedicines = [
  {
    name: "Midazolam",
    description: "سدیشن بیمار تحت ونتیلاتور",
  },
  {
    name: "Fentanyl",
    description: "کنترل درد",
  },
  {
    name: "Ketamine",
    description: "سدیشن و حفظ فشار خون",
  },
  {
    name: "Adrenaline",
    description: "احیاء و شوک",
  },
];

function MedicinePage() {
  const [activeTab, setActiveTab] = useState("inhalation");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        داروهای پرکاربرد PICU و ونتیلاتور
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("inhalation")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "inhalation"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          استنشاقی
        </button>

        <button
          onClick={() => setActiveTab("injectable")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "injectable"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          تزریقی
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {(activeTab === "inhalation"
          ? inhalationMedicines
          : injectableMedicines
        ).map((medicine) => (
          <div
            key={medicine.name}
            className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-blue-700">{medicine.name}</h2>

            <p className="mt-3 text-gray-600">{medicine.description}</p>

            <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              مشاهده جزئیات
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicinePage;
