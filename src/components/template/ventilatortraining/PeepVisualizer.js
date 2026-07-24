"use client";

import { useMemo, useState } from "react";

const presets = [0, 3, 5, 8, 10, 15];

function pressureToY(pressure) {
  const p = Math.max(0, Math.min(40, pressure));
  return 140 - (p / 40) * 120;
}

function buildWaveform(peep) {
  const baseY = pressureToY(peep);
  const peakY = pressureToY(peep + 15);

  const oneCycle = (offset) => `
    M ${offset} ${baseY}
    C ${offset + 10} ${baseY - (baseY - peakY) * 0.3},
      ${offset + 15} ${peakY},
      ${offset + 25} ${peakY}
    L ${offset + 45} ${peakY}
    C ${offset + 75} ${peakY},
      ${offset + 85} ${baseY},
      ${offset + 100} ${baseY}
    L ${offset + 200} ${baseY}
  `;

  return {
    path: `${oneCycle(0)} ${oneCycle(200)}`,
    baseY,
    peakY,
  };
}

function getPeepMessage(peep) {
  if (peep === 0) {
    return "بدون PEEP — در پایان بازدم، آلوئول‌ها کاملاً بسته می‌شوند و خطر آتلکتازی (کلاپس آلوئولی) وجود دارد.";
  }
  if (peep <= 5) {
    return "PEEP فیزیولوژیک — آلوئول‌ها به‌اندازه کافی باز می‌مانند و FRC حفظ می‌شود.";
  }
  if (peep <= 10) {
    return "PEEP متوسط تا بالا — معمولاً در بیماری‌هایی با کاهش کمپلیانس ریه (مثل ARDS) استفاده می‌شود.";
  }
  return "PEEP بسیار بالا — آلوئول‌ها کاملاً باز می‌مانند، اما باید اثرات همودینامیک (کاهش برگشت وریدی) با دقت پایش شود.";
}

export default function PeepVisualizer() {
  const [peep, setPeep] = useState(5);

  const { path, baseY, peakY } = useMemo(() => buildWaveform(peep), [peep]);

  const collapseScale = useMemo(() => {
    const value = 0.35 + (peep / 15) * 0.45;
    return Math.min(0.8, Math.max(0.35, value));
  }, [peep]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <style>{`
        @keyframes peep-breathe {
          0%   { transform: scale(var(--peep-scale)); }
          22%  { transform: scale(1); }
          38%  { transform: scale(1); }
          100% { transform: scale(var(--peep-scale)); }
        }
        .peep-alveolus {
          animation: peep-breathe 3s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-slate-600">
          شبیه‌سازی تعاملی PEEP
        </h4>
        <div className="flex flex-wrap gap-2">
          {presets.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPeep(value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                peep === value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              PEEP {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={peep}
          onChange={(e) => setPeep(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-blue-100 accent-blue-600"
        />
        <span className="w-24 shrink-0 rounded-xl bg-blue-600 px-3 py-1 text-center text-sm font-extrabold text-white">
          {peep} cmH2O
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* نمودار فشار-زمان */}
        <div className="rounded-2xl bg-white p-3">
          <p className="mb-2 text-xs font-bold text-slate-400">
            نمودار فشار - زمان
          </p>
          <svg viewBox="0 0 420 160" className="w-full">
            <line
              x1="0"
              y1={baseY}
              x2="420"
              y2={baseY}
              stroke="#93c5fd"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
            <text x="4" y={baseY - 6} fontSize="10" fill="#2563eb">
              خط پایه PEEP ({peep})
            </text>
            <line
              x1="0"
              y1={peakY}
              x2="420"
              y2={peakY}
              stroke="#fca5a5"
              strokeDasharray="2 6"
              strokeWidth="1"
            />

            <path
              d={path}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <circle r="4" fill="#1d4ed8">
              <animateMotion dur="3s" repeatCount="indefinite" path={path} />
            </circle>
          </svg>
        </div>

        {/* انیمیشن آلوئول */}
        <div className="rounded-2xl bg-white p-3">
          <p className="mb-2 text-xs font-bold text-slate-400">
            وضعیت آلوئول‌ها در پایان بازدم
          </p>
          <svg
            viewBox="0 0 200 140"
            className="w-full"
            style={{ "--peep-scale": collapseScale }}
          >
            <path
              d="M100 10 L100 55 M100 55 L60 70 M100 55 L140 70"
              stroke="#94a3b8"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <g className="peep-alveolus" style={{ transformBox: "fill-box" }}>
              <circle
                cx="60"
                cy="90"
                r="24"
                fill="#bfdbfe"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
            <g className="peep-alveolus" style={{ transformBox: "fill-box" }}>
              <circle
                cx="140"
                cy="90"
                r="24"
                fill="#bfdbfe"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
            <g className="peep-alveolus" style={{ transformBox: "fill-box" }}>
              <circle
                cx="100"
                cy="115"
                r="18"
                fill="#bfdbfe"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      </div>

      <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm leading-7 text-blue-900">
        {getPeepMessage(peep)}
      </p>
    </div>
  );
}
