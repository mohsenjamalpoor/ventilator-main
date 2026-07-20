import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function ProfileAlarm() {
  const alarms = [
    {
      title: "Respiratory Rate (RR)",
      high: "RR × 2",
      low: "RR / 2",
    },
    {
      title: "Peak Inspiratory Pressure (PIP)",
      high: "PIP + 5 or 10 cmH₂O",
      low: "PEEP+(PIP−PEEP) / 2",
    },
    {
      title: "Minute Ventilation (Ve)",
      high: "Ve × 2",
      low: "Ve / 2",
    },
    {
      title: "Apnea Interval",
      description:
        "Set based on patient size and RR for age (Infant ≅ 10 seconds, Older child ≅ 20 seconds)",
    },
    {
      title: "PEEP",
      high: "PEEP + 2",
      low: "PEEP - 2",
    },
  ];

  return (
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

            {/* Description */}
            {alarm.description && (
              <p className="text-gray-700 text-center leading-7">
                {alarm.description}
              </p>
            )}

            {/* High */}
            {alarm.high && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium">{alarm.high}</span>

                <FaLongArrowAltRight className="text-gray-400" />

                <span className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-bold">
                  High
                </span>
              </div>
            )}

            {/* Low */}
            {alarm.low && (
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{alarm.low}</span>

                <FaLongArrowAltRight className="text-gray-400" />

                <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 font-bold">
                  Low
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileAlarm;
