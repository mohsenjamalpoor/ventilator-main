"use client";

import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ModalContainer from "@/components/partials/container/ModalContainer";

function ProfileAlarm() {
  const [selectedAlarm, setSelectedAlarm] = useState(null);

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
      low: "PEEP+(PIP−PEEP) / 2",
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

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          آلارم های ونتیلاتور
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg text-center font-bold text-gray-800 mb-5">
                {alarm.title}
              </h3>

              {alarm.description && (
                <p className="text-gray-700 text-center leading-7 mb-5">
                  {alarm.description}
                </p>
              )}

              {alarm.high && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 font-medium">
                    {alarm.high}
                  </span>

                  <FaLongArrowAltRight className="text-gray-400" />

                  <span className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-bold">
                    High
                  </span>
                </div>
              )}

              {alarm.low && (
                <div className="flex items-center justify-between mb-5">
                  <span className="text-gray-700 font-medium">{alarm.low}</span>

                  <FaLongArrowAltRight className="text-gray-400" />

                  <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 font-bold">
                    Low
                  </span>
                </div>
              )}

              <button
                onClick={() => setSelectedAlarm(alarm)}
                className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
              >
                توضیحات بیشتر
              </button>
            </div>
          ))}
        </div>
      </div>

      <ModalContainer
        isOpen={!!selectedAlarm}
        setIsOpen={() => setSelectedAlarm(null)}
      >
        <div className="bg-white w-[90vw] md:w-[500px] rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            {selectedAlarm?.title}
          </h2>

          <p className="text-gray-700 leading-8 text-right">
            {selectedAlarm?.modalDescription ||
              selectedAlarm?.description ||
              "توضیحی برای این آلارم ثبت نشده است."}
          </p>

          <button
            onClick={() => setSelectedAlarm(null)}
            className="mt-6 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            بستن
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default ProfileAlarm;
