"use client";

import { useEffect, useRef, useState } from "react";
import {
  LuActivity,
  LuGauge,
  LuTriangleAlert,
  LuCircleCheck,
  LuWind,
  LuArrowUp,
  LuArrowDown,
  LuMinus,
} from "react-icons/lu";

/* ---------- ثابت‌های فیزیولوژیک نمایش موج ---------- */
const RR = 15; // نفس در دقیقه (ثابت، فقط برای شبیه‌سازی بصری)
const PERIOD = 60 / RR; // طول هر سیکل تنفسی به ثانیه
const TI = PERIOD * 0.32; // زمان دم
const RISE = 0.12; // زمان صعود سریع فشار در ابتدای دم
const TAU = 0.55; // ثابت زمانی افت فشار در بازدم
const PIP_DEFAULT = 22; // فشار اوج دمی ثابت برای نمایش (cmH2O) — سقف ایمنی فشار
const SCALE_MAX = 34; // بالاترین مقدار محور Y نمودار (cmH2O)
const COMPLIANCE = 30; // کمپلیانس فرضی ریه (ml به ازای هر cmH2O فشار درایوینگ)
const VT_MAX = 700; // بالاترین مقدار نمایش‌داده‌شده روی نوار حجم جاری (ml)

function pressureAt(t, peep, pip) {
  if (t < 0) return peep;
  const tm = t % PERIOD;
  if (tm < RISE) return peep + (pip - peep) * (tm / RISE);
  if (tm < TI) return pip;
  const te = tm - TI;
  return peep + (pip - peep) * Math.exp(-te / TAU);
}

function zoneOf(peep) {
  if (peep <= 6)
    return {
      label: "محدوده طبیعی",
      text: "text-emerald-400",
      chip: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
    };
  if (peep <= 10)
    return {
      label: "محدوده هیپوکسمی",
      text: "text-amber-400",
      chip: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
    };
  return {
    label: "محدوده ARDS",
    text: "text-red-400",
    chip: "bg-red-500/15 text-red-300 ring-red-400/30",
  };
}

function vtZoneOf(vt) {
  if (vt < 200)
    return {
      label: "هیپوونتیلاسیون خطرناک",
      text: "text-red-300",
      chip: "bg-red-500/15 text-red-300 ring-red-400/30",
      bar: "#ef4444",
    };
  if (vt < 400)
    return {
      label: "کمتر از حد مطلوب",
      text: "text-amber-300",
      chip: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
      bar: "#fbbf24",
    };
  if (vt <= 600)
    return {
      label: "محدوده مطلوب",
      text: "text-emerald-300",
      chip: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
      bar: "#34d399",
    };
  return {
    label: "خطر اتساع بیش‌ازحد (والوتروما)",
    text: "text-amber-300",
    chip: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
    bar: "#fbbf24",
  };
}

const PRESETS = [
  { label: "فرد طبیعی", value: 5 },
  { label: "هیپوکسمی", value: 9 },
  { label: "ARDS", value: 15 },
];

export default function PeepPage() {
  const [peep, setPeep] = useState(5);
  const [prevPeep, setPrevPeep] = useState(5);

  const polyRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const peepRef = useRef(peep);
  // peepRef.current = peep;

  const W = 760;
  const H = 220;
  const PAD_TOP = 18;
  const PAD_BOTTOM = 18;
  const N = 220;
  const WINDOW = PERIOD * 2.4;

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawStatic = () => {
      let pts = "";
      for (let i = 0; i < N; i++) {
        const tSample = (i / (N - 1)) * WINDOW - RISE;
        const p = pressureAt(
          Math.max(tSample, 0),
          peepRef.current,
          PIP_DEFAULT,
        );
        const x = (i / (N - 1)) * W;
        const yFrac = Math.min(1, Math.max(0, p / SCALE_MAX));
        const y = H - PAD_BOTTOM - yFrac * (H - PAD_TOP - PAD_BOTTOM);
        pts += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
      if (polyRef.current) polyRef.current.setAttribute("points", pts.trim());
    };

    const draw = (now) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;

      let pts = "";
      for (let i = 0; i < N; i++) {
        const tSample = elapsed - WINDOW + (i / (N - 1)) * WINDOW;
        const p = pressureAt(tSample, peepRef.current, PIP_DEFAULT);
        const x = (i / (N - 1)) * W;
        const yFrac = Math.min(1, Math.max(0, p / SCALE_MAX));
        const y = H - PAD_BOTTOM - yFrac * (H - PAD_TOP - PAD_BOTTOM);
        pts += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
      if (polyRef.current) polyRef.current.setAttribute("points", pts.trim());

      rafRef.current = requestAnimationFrame(draw);
    };

    if (reducedMotionRef.current) {
      drawStatic();
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartH = H - PAD_TOP - PAD_BOTTOM;
  const peepY = H - PAD_BOTTOM - (peep / SCALE_MAX) * chartH;
  const zone = zoneOf(peep);
  const delta = peep - prevPeep;

  const handlePeepChange = (val) => {
    setPrevPeep(peep);
    setPeep(val);
  };

  // مقیاس ریه/آلوئول‌ها بر اساس PEEP — هیچ‌گاه کاملا به صفر نمی‌رسد
  const minScale = (0.62 + (peep / 20) * 0.34).toFixed(3);
  const collapsing = peep <= 2;

  // چون PIP ثابت نگه داشته شده، فشار درایوینگ و حجم جاری با بالا رفتن PEEP کم می‌شود
  const drivingPressure = Math.max(PIP_DEFAULT - peep, 0);
  const vt = Math.round(COMPLIANCE * drivingPressure);
  const vtZone = vtZoneOf(vt);
  const vtPct = Math.min(100, (vt / VT_MAX) * 100);
  const flowScale = Math.max(0.28, Math.min(1.5, drivingPressure / 14)).toFixed(
    3,
  );

  const gridValues = [0, 10, 20, 30];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <style>{`
        @keyframes peep-breathe {
          0%   { transform: scale(var(--min-scale)); }
          32%  { transform: scale(1); }
          38%  { transform: scale(1); }
          100% { transform: scale(var(--min-scale)); }
        }
        .peep-alveolus {
          animation: peep-breathe ${PERIOD}s ease-in-out infinite;
        }
        .peep-lung {
          animation: peep-breathe ${PERIOD}s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes peep-flow {
          0%   { transform: translateY(0px); opacity: 0; }
          8%   { opacity: 1; }
          32%  { transform: translateY(68px); opacity: 1; }
          40%  { opacity: 0.85; }
          70%  { transform: translateY(30px); opacity: 0.45; }
          96%  { transform: translateY(0px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 0; }
        }
        .peep-flow-dot {
          animation: peep-flow ${PERIOD}s ease-in-out infinite;
          transform-box: fill-box;
        }
      `}</style>

      {/* هدر */}
      <div className="bg-gradient-to-l from-cyan-700 via-cyan-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg shadow-cyan-900/10">
        <h1 className="text-3xl font-black tracking-tight">
          PEEP (Positive End-Expiratory Pressure)
        </h1>
        <p className="mt-3 text-cyan-100 leading-8 max-w-3xl">
          فشار مثبت انتهای بازدم که باعث باز ماندن آلوئول‌ها، افزایش اکسیژناسیون
          و جلوگیری از کلاپس ریه می‌شود. PEEP را در نمایشگر زیر تغییر دهید
        </p>
      </div>

      {/* نمایشگر شبیه‌سازی زنده */}
      <section className="rounded-3xl overflow-hidden border border-cyan-900/40 bg-[#07161c] text-cyan-50 shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex items-center gap-2 text-cyan-200/90">
            <LuActivity className="text-cyan-400" />
            <span className="font-bold">موج فشار راه هوایی — زمان واقعی</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6 px-6 py-5">
          {/* نمودار */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto rounded-xl bg-[#040f13] border border-cyan-900/40"
              preserveAspectRatio="none"
            >
              {gridValues.map((v) => {
                const y = H - PAD_BOTTOM - (v / SCALE_MAX) * chartH;
                return (
                  <g key={v}>
                    <line
                      x1={0}
                      x2={W}
                      y1={y}
                      y2={y}
                      stroke="#0e3a44"
                      strokeWidth="1"
                    />
                    <text
                      x={6}
                      y={y - 4}
                      fontSize="10"
                      fill="#3b7c8a"
                      fontFamily="monospace"
                    >
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* خط چین PEEP */}
              <line
                x1={0}
                x2={W}
                y1={peepY}
                y2={peepY}
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="6 5"
              />
              <text
                x={W - 86}
                y={peepY - 6}
                fontSize="11"
                fontFamily="monospace"
                fill="#fbbf24"
              >
                PEEP {peep}
              </text>

              {/* موج زنده فشار */}
              <polyline
                ref={polyRef}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.55))" }}
              />
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-cyan-300/80">
              <span className="inline-block w-4 h-[2px] bg-cyan-400" /> فشار راه
              هوایی
              <span
                className="inline-block w-4 h-[2px] bg-amber-400 mr-4"
                style={{
                  borderTop: "2px dashed #fbbf24",
                  background: "transparent",
                }}
              />
              PEEP
            </div>
          </div>

          {/* ریه + جریان هوا + ریدآوت‌ها */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-2 bg-[#04141a] border border-cyan-900/40 rounded-xl p-3">
              <div>
                <p className="text-[11px] text-cyan-400/70">PIP</p>
                <p className="font-mono text-base font-bold text-cyan-100">
                  {PIP_DEFAULT}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-cyan-400/70">PEEP</p>
                <p className="font-mono text-base font-bold text-amber-300">
                  {peep}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-cyan-400/70">RR</p>
                <p className="font-mono text-base font-bold text-cyan-100">
                  {RR}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-cyan-400/70">VT</p>
                <p className={`font-mono text-base font-bold ${vtZone.text}`}>
                  {vt}
                </p>
              </div>
            </div>

            <div
              className={`flex-1 rounded-xl border p-4 flex flex-col items-center gap-2 ${
                collapsing
                  ? "border-red-500/40 bg-red-950/20"
                  : "border-cyan-900/40 bg-[#04141a]"
              }`}
            >
              <p className="text-[11px] text-cyan-300/70 self-start">
                جریان هوا و ریه
              </p>

              <svg viewBox="0 0 200 190" className="w-full max-w-[170px]">
                {/* نای */}
                <line
                  x1="100"
                  y1="6"
                  x2="100"
                  y2="54"
                  stroke="#3b7c8a"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* برونش‌ها */}
                <line
                  x1="100"
                  y1="54"
                  x2="64"
                  y2="80"
                  stroke="#3b7c8a"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <line
                  x1="100"
                  y1="54"
                  x2="136"
                  y2="80"
                  stroke="#3b7c8a"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* لوب چپ ریه */}
                <g
                  className="peep-lung motion-reduce:animate-none"
                  style={{
                    "--min-scale": minScale,
                    transformOrigin: "60px 130px",
                  }}
                >
                  <ellipse
                    cx="60"
                    cy="130"
                    rx="42"
                    ry="60"
                    fill={collapsing ? "#7f1d1d" : "#0b4a56"}
                    stroke={collapsing ? "#f87171" : "#22d3ee"}
                    strokeWidth="2"
                    opacity="0.85"
                  />
                </g>
                {/* لوب راست ریه */}
                <g
                  className="peep-lung motion-reduce:animate-none"
                  style={{
                    "--min-scale": minScale,
                    transformOrigin: "140px 130px",
                  }}
                >
                  <ellipse
                    cx="140"
                    cy="130"
                    rx="46"
                    ry="64"
                    fill={collapsing ? "#7f1d1d" : "#0b4a56"}
                    stroke={collapsing ? "#f87171" : "#22d3ee"}
                    strokeWidth="2"
                    opacity="0.85"
                  />
                </g>

                {/* حباب‌های هوا: رفت و آمد هوا بین نای و ریه‌ها */}
                <g
                  style={{
                    transform: `scale(${flowScale})`,
                    transformOrigin: "100px 16px",
                  }}
                >
                  <circle
                    className="peep-flow-dot motion-reduce:animate-none"
                    cx="94"
                    cy="16"
                    r="4"
                    fill="#67e8f9"
                  />
                  <circle
                    className="peep-flow-dot motion-reduce:animate-none"
                    cx="106"
                    cy="16"
                    r="4"
                    fill="#67e8f9"
                    style={{ animationDelay: `${PERIOD * 0.45}s` }}
                  />
                </g>
              </svg>

              <p
                className={`text-xs text-center -mt-1 ${collapsing ? "text-red-300" : "text-cyan-300/70"}`}
              >
                {collapsing
                  ? "PEEP بسیار پایین — خطر کلاپس آلوئولی"
                  : "آلوئول‌ها بین دم و بازدم باز می‌مانند"}
              </p>

              {/* نوار حجم جاری (VT) */}
              <div className="w-full pt-2 mt-1 border-t border-cyan-900/40">
                <div className="flex items-center justify-between text-[11px] text-cyan-300/70 mb-1">
                  <span>حجم جاری (VT)</span>
                  <span className={`font-mono font-bold ${vtZone.text}`}>
                    {vt} ml
                  </span>
                </div>
                <div
                  className="relative h-2.5 rounded-full overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(to right, #ef4444 0%, #ef4444 28.6%, #fbbf24 28.6%, #fbbf24 50%, #34d399 50%, #34d399 85.7%, #fbbf24 85.7%, #fbbf24 100%)",
                    opacity: 0.35,
                  }}
                />
                <div className="relative h-2.5 -mt-2.5 rounded-full">
                  <span
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-white shadow"
                    style={{ right: `${100 - vtPct}%` }}
                  />
                </div>
                <p className={`text-[11px] mt-1 ${vtZone.text}`}>
                  {vtZone.label}
                </p>
                <p className="text-[10px] text-cyan-400/60 leading-5 mt-1">
                  PIP روی {PIP_DEFAULT} cmH₂O ثابت نگه داشته شده؛ با بالا بردن
                  PEEP، فشار درایوینگ (PIP−PEEP) و حجم جاری کاهش می‌یابد تا
                  آلوئول‌ها بیش از حد کشیده نشوند و ریه پاره نشود (باروتروما).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* کنترل تعاملی PEEP */}
      <section className="bg-white rounded-2xl border p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LuGauge className="text-cyan-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">تنظیم PEEP</h2>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ring-1 ${zone.chip}`}
          >
            {zone.label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl font-black text-cyan-700 w-14 text-center">
            {peep}
          </span>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={peep}
            onChange={(e) => handlePeepChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-600
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-cyan-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
            style={{
              background:
                "linear-gradient(to left, #fca5a5 0%, #fca5a5 50%, #fcd34d 50%, #fcd34d 30%, #6ee7b7 30%, #6ee7b7 0%)",
            }}
          />
          <span className="font-mono text-sm text-gray-400 w-16">cmH₂O</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>۰</span>
          <span className="flex-1 border-t border-dashed" />
          <span>۶ طبیعی</span>
          <span className="flex-1 border-t border-dashed" />
          <span>۱۰ هیپوکسمی</span>
          <span className="flex-1 border-t border-dashed" />
          <span>۲۰ ARDS</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePeepChange(p.value)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                peep === p.value
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-cyan-300"
              }`}
            >
              {p.label} ({p.value})
            </button>
          ))}

          {delta !== 0 && (
            <span
              className={`mr-auto flex items-center gap-1 text-xs font-semibold ${
                delta > 0 ? "text-red-600" : "text-blue-600"
              }`}
            >
              {delta > 0 ? <LuArrowUp /> : <LuArrowDown />}
              {delta > 0 ? "افزایش" : "کاهش"} PEEP از {prevPeep} به {peep}
            </span>
          )}
        </div>
      </section>

      {/* فواید */}
      <section className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-5">فواید PEEP</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "باز نگه داشتن آلوئول‌ها",
            "افزایش FRC (ظرفیت باقی‌مانده عملکردی)",
            "بهبود اکسیژناسیون",
            "کاهش شانت ریوی",
            "جلوگیری از Atelectasis",
            "بهبود نسبت V/Q",
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <LuCircleCheck className="text-green-600 mt-1 shrink-0" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* افزایش / کاهش PEEP */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <LuArrowUp className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-blue-700">
              افزایش PEEP چه اثری دارد؟
            </h2>
          </div>
          <ul className="space-y-3 list-disc pr-6 leading-8 text-gray-700">
            <li>افزایش اکسیژناسیون</li>
            <li>باز شدن آلوئول‌های کلاپس شده</li>
            <li>کاهش شانت</li>
            <li>افزایش فشار داخل قفسه سینه</li>
            <li>کاهش بازگشت وریدی</li>
            <li>احتمال افت فشار خون</li>
          </ul>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <LuArrowDown className="text-yellow-700 text-xl" />
            <h2 className="text-xl font-bold text-yellow-700">
              کاهش PEEP چه اثری دارد؟
            </h2>
          </div>
          <ul className="space-y-3 list-disc pr-6 leading-8 text-gray-700">
            <li>کاهش اکسیژناسیون</li>
            <li>احتمال بسته شدن آلوئول‌ها</li>
            <li>کاهش فشار داخل قفسه سینه</li>
            <li>بهبود بازگشت وریدی</li>
          </ul>
        </section>
      </div>

      {/* عوارض */}
      <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <LuTriangleAlert className="text-red-600 text-2xl" />
          <h2 className="text-2xl font-bold text-red-700">عوارض PEEP بالا</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "افت فشار خون",
            "کاهش برون‌ده قلبی",
            "باروتروما",
            "پنوموتوراکس",
            "اتساع بیش از حد آلوئول‌ها",
            "افزایش ICP در برخی بیماران",
          ].map((item) => (
            <div key={item} className="bg-white rounded-xl p-4 border">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* مقادیر معمول */}
      <section className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <LuWind className="text-cyan-600 text-xl" />
          <h2 className="text-2xl font-bold text-cyan-700">مقادیر رایج PEEP</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="bg-cyan-600 text-white">
              <tr>
                <th className="p-3 rounded-tr-lg">وضعیت بیمار</th>
                <th className="p-3 rounded-tl-lg">PEEP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">فرد طبیعی</td>
                <td className="font-mono">5 cmH₂O</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">هیپوکسمی</td>
                <td className="font-mono">8 - 10</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">ARDS</td>
                <td className="font-mono">10 - 20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
