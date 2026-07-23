"use client";

import { useState } from "react";
import { LuRadio } from "react-icons/lu";
import { waveforms } from "../../../../utils/waveforms";
import { WaveChart } from "@/components/template/waveforms/WaveChart";

const SCENARIOS = [
  { key: "normal", label: "نرمال" },
  { key: "leak", label: "نشتی (Leak)" },
  { key: "obstruction", label: "انسداد راه هوایی" },
  { key: "overdistension", label: "بیش‌اتساعی" },
];

export default function WaveformsPage() {
  const [selected, setSelected] = useState(waveforms[0]);
  const [scenario, setScenario] = useState("normal");

  const availableScenarios = SCENARIOS.filter((s) => selected.variants[s.key]);
  const activeKey = selected.variants[scenario] ? scenario : "normal";
  const variant = selected.variants[activeKey];

  return (
    <div dir="rtl" className="min-h-screen  px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
        <div className="flex items-center gap-3 lg:hidden">
          <LuRadio className="text-sky-400" size={20} />
          <h1 className="text-lg font-extrabold text-white">
            پایش موج‌های ونتیلاتور
          </h1>
        </div>

        <aside className="h-fit rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-4 shadow-2xl shadow-black/40 lg:sticky lg:top-8">
          <div className="mb-5 hidden items-center gap-2 px-2 lg:flex">
            <LuRadio className="text-sky-400" size={18} />
            <h2 className="text-lg font-extrabold text-white">waveforms</h2>
          </div>

          <ul className="space-y-1.5">
            {waveforms.map((item) => {
              const Icon = item.icon;
              const active = selected.id === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setSelected(item)}
                    className="flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all duration-200"
                    style={{
                      backgroundColor: active
                        ? `${item.color}1A`
                        : "transparent",
                      boxShadow: active
                        ? `inset 0 0 0 1px ${item.color}55`
                        : "none",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors"
                      style={{
                        backgroundColor: active ? item.color : "#161B26",
                        color: active ? "#060910" : "#64748B",
                      }}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="truncate text-sm font-bold"
                        style={{ color: active ? "#fff" : "#94A3B8" }}
                      >
                        {item.subtitle}
                      </h3>
                      <p className="truncate font-mono text-[11px] text-slate-500">
                        {item.title}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-wide"
                  style={{
                    backgroundColor: `${selected.color}1A`,
                    color: selected.color,
                  }}
                >
                  {selected.isLoop ? "LOOP" : "TIME-BASED"}
                </span>
                <h1 className="text-3xl font-black text-white md:text-4xl">
                  {selected.subtitle}
                </h1>
                <p className="mt-1 font-mono text-sm text-slate-500">
                  {selected.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {variant.readouts.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-xl border border-slate-800 bg-black/30 px-4 py-2 text-center"
                  >
                    <div className="font-mono text-[10px] text-slate-500">
                      {r.label}
                    </div>
                    <div
                      className="font-mono text-xl font-bold leading-tight"
                      style={{ color: selected.color }}
                    >
                      {r.value}
                      <span className="mr-1 text-xs text-slate-500">
                        {r.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-lg leading-9 text-slate-400">
              {selected.description}
            </p>

            {/* scenario selector */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-5">
              {availableScenarios.map((s) => {
                const active = activeKey === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setScenario(s.key)}
                    className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? selected.color : "#161B26",
                      color: active ? "#060910" : "#94A3B8",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* clinical note for the active scenario */}
            <div
              className="mt-4 rounded-xl border px-4 py-3 text-sm leading-7"
              style={{
                borderColor: `${selected.color}33`,
                backgroundColor: `${selected.color}0D`,
                color: "#CBD5E1",
              }}
            >
              {variant.note}
            </div>
          </div>

          <WaveChart
            key={`${selected.id}-${activeKey}`}
            item={selected}
            variant={variant}
            scenarioKey={activeKey}
          />

          <div className="rounded-3xl border border-slate-800/80 bg-[#0B0F17] p-6 shadow-2xl shadow-black/40 md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">
              کاربردهای بالینی
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {selected.clinical.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-black/20 p-4"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: selected.color }}
                  />
                  <span className="text-slate-300">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
