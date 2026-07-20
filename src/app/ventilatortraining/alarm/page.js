"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const alarms = [
  {
    title: "High Pressure Alarm",
    slug: "high-pressure",
    description: "افزایش فشار راه هوایی بیمار",
  },
  {
    title: "Low Pressure Alarm",
    slug: "low-pressure",
    description: "کاهش فشار مدار تنفسی",
  },
  {
    title: "Apnea Alarm",
    slug: "apnea",
    description: "قطع تنفس بیمار",
  },
  {
    title: "Low Tidal Volume",
    slug: "low-volume",
    description: "کاهش حجم جاری",
  },
  {
    title: "High Respiratory Rate",
    slug: "high-rate",
    description: "افزایش تعداد تنفس",
  },
];

function ProfileContent() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold text-blue-700">آلارم های ونتیلاتور</h2>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div className="border rounded-xl p-4">
          <h1>Respiratory Rate (RR)</h1>
          <span className="text-gray-500">High</span>
          <FaLongArrowAltRight />
          <span>RR * 2</span>
          <p className="font-bold"></p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Peak Inspiratory Pressure(PIP)</p>
          <p className="font-bold"> </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Minute Ventilatiom(Ve)</p>
          <p className="font-bold"></p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500"> Apnea Interval </p>
          <p className="font-bold"></p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-gray-500"> Peep </p>
          <p className="font-bold"></p>
        </div>
      </div>
    </div>
  );
}

export default function AlarmPage() {
  const [activeTab, setActiveTab] = useState("alarm");

  return (
    <div dir="rtl" className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-800">آلارم ها</h1>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("alarm")}
          className={`
          px-6 py-3 rounded-xl font-bold transition
          ${
            activeTab === "alarm"
              ? "bg-red-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          }
          `}
        >
          آلارم ها
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`
          px-6 py-3 rounded-xl font-bold transition
          ${
            activeTab === "profile"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          }
          `}
        >
          آلارم های ونتیلاتور
        </button>
      </div>

      {activeTab === "alarm" ? (
        <div className="grid md:grid-cols-2 gap-5">
          {alarms.map((alarm) => (
            <Link
              key={alarm.slug}
              href={`/ventilatortraining/alarm/${alarm.slug}`}
              className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                  shadow
                  hover:shadow-xl
                  transition
                  "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-red-600
                  "
              >
                {alarm.title}
              </h2>

              <p
                className="
                  mt-2
                  text-gray-500
                  "
              >
                {alarm.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <ProfileContent />
      )}
    </div>
  );
}
