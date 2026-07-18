"use client";

import React from "react";

function OpenSimulationSetting({ open }) {
  if (!open) return null;

  const items = [
    "Suction ETT",
    "Needle Decompression",
    "Extubate Patient",
    "Check for ETT Leak",
  ];

  return (
    <div className="absolute left-0 top-0 z-50 w-64 rounded-xl border bg-white shadow-xl p-3">
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            className="w-full rounded-lg border p-3 text-left transition hover:bg-blue-50 hover:border-blue-500"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OpenSimulationSetting;
