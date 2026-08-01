"use client";

import { useState, useMemo } from "react";
import {
  LuWind,
  LuFlaskConical,
  LuBookOpen,
  LuStethoscope,
  LuTriangleAlert,
  LuGauge,
} from "react-icons/lu";

const OI_SEVERITY = [
  { label: "بدون ARDS", range: "< 4", color: "teal" },
  { label: "خفیف", range: "4 تا 8", color: "amber" },
  { label: "متوسط", range: "8 تا 16", color: "orange" },
  { label: "شدید", range: "≥ 16", color: "rose" },
];

const OSI_SEVERITY = [
  { label: "بدون ARDS", range: "< 5", color: "teal" },
  { label: "خفیف", range: "5 تا 7.5", color: "amber" },
  { label: "متوسط", range: "7.5 تا 12.3", color: "orange" },
  { label: "شدید", range: "≥ 12.3", color: "rose" },
];

const COLORS = {
  teal: { bg: "bg-teal-600", light: "bg-teal-50", text: "text-teal-700" },
  amber: { bg: "bg-amber-600", light: "bg-amber-50", text: "text-amber-700" },
  orange: {
    bg: "bg-orange-600",
    light: "bg-orange-50",
    text: "text-orange-700",
  },
  rose: { bg: "bg-rose-600", light: "bg-rose-50", text: "text-rose-700" },
};

function classify(value, thresholds) {
  if (value < thresholds[0]) return 0;
  if (value < thresholds[1]) return 1;
  if (value < thresholds[2]) return 2;
  return 3;
}

export default function Fio2Page() {
  const [mode, setMode] = useState("invasive");
  const [map, setMap] = useState(14);
  const [fio2, setFio2] = useState(60);
  const [pao2, setPao2] = useState(70);
  const [spo2, setSpo2] = useState(92);

  const fraction = fio2 / 100;

  const oi = useMemo(
    () => (map * fraction * 100) / Math.max(pao2, 1),
    [map, fraction, pao2],
  );
  const osi = useMemo(
    () => (map * fraction * 100) / Math.max(spo2, 1),
    [map, fraction, spo2],
  );

  const activeValue = mode === "invasive" ? oi : osi;
  const severityIdx = classify(
    activeValue,
    mode === "invasive" ? [4, 8, 16] : [5, 7.5, 12.3],
  );
  const severity =
    mode === "invasive" ? OI_SEVERITY[severityIdx] : OSI_SEVERITY[severityIdx];
  const c = COLORS[severity.color];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-l from-cyan-600 to-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/15 p-2.5 rounded-xl">
              <LuWind size={24} />
            </div>
            <span className="text-cyan-100 text-sm font-medium tracking-wide">
              پارامتر ونتیلاتور · اکسیژناسیون
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            کسر اکسیژن دمی (FiO2) و شاخص‌های اکسیژناسیون
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/10 rounded-xl px-5 py-3.5 font-mono text-sm text-cyan-50">
              OI = (MAP × FiO2 × 100) / PaO2
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3.5 font-mono text-sm text-cyan-50">
              OSI = (MAP × FiO2 × 100) / SpO2
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* چرا خود FiO2 کافی نیست */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <LuFlaskConical className="text-cyan-600" size={20} />
            <h2 className="text-lg font-bold">
              چرا FiO2 به‌تنهایی معیار کافی نیست؟
            </h2>
          </div>
          <p className="leading-8 text-slate-600">
            FiO2 فقط یکی از سه عاملی است که اکسیژناسیون بیمار تهویه‌شده را تعیین
            می‌کند؛ دو عامل دیگر{" "}
            <span className="font-semibold text-slate-800">
              فشار متوسط راه هوایی (MAP)
            </span>{" "}
            و پاسخ اکسیژناسیون بیمار (PaO2 یا SpO2) هستند. طبق راهنمای PALICC،
            شدت ARDS اطفال با <strong>OI</strong> (در بیماران با خط شریانی) یا{" "}
            <strong>OSI</strong> (به‌صورت غیرتهاجمی، وقتی SpO2 ≤ ۹۷٪ باشد تا از
            سقف منحنی تفکیک هموگلوبین اجتناب شود) طبقه‌بندی می‌شود، نه با خود
            FiO2.
          </p>
        </section>

        {/* محاسبه‌گر */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuGauge className="text-cyan-600" size={20} />
            <h2 className="text-lg font-bold">محاسبه‌گر شدت ARDS</h2>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("invasive")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
                mode === "invasive"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              تهاجمی (OI با PaO2)
            </button>
            <button
              onClick={() => setMode("noninvasive")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
                mode === "noninvasive"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              غیرتهاجمی (OSI با SpO2)
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                MAP (cmH2O)
              </label>
              <input
                type="number"
                value={map}
                onChange={(e) => setMap(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2"
              />
              <input
                type="range"
                min={4}
                max={30}
                value={map}
                onChange={(e) => setMap(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                FiO2 (%)
              </label>
              <input
                type="number"
                value={fio2}
                onChange={(e) => setFio2(Number(e.target.value) || 21)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2"
              />
              <input
                type="range"
                min={21}
                max={100}
                value={fio2}
                onChange={(e) => setFio2(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                {mode === "invasive" ? "PaO2 (mmHg)" : "SpO2 (%)"}
              </label>
              {mode === "invasive" ? (
                <>
                  <input
                    type="number"
                    value={pao2}
                    onChange={(e) => setPao2(Number(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2"
                  />
                  <input
                    type="range"
                    min={30}
                    max={150}
                    value={pao2}
                    onChange={(e) => setPao2(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2"
                  />
                  <input
                    type="range"
                    min={70}
                    max={97}
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </>
              )}
            </div>
          </div>

          <div className={`${c.bg} rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-1">
              {mode === "invasive"
                ? "Oxygenation Index"
                : "Oxygen Saturation Index"}
            </div>
            <div className="text-4xl font-bold mb-2">
              {activeValue.toFixed(1)}
            </div>
            <div className="text-sm font-medium">{severity.label}</div>
          </div>

          {mode === "noninvasive" && spo2 > 97 && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mt-4">
              هشدار محاسباتی: SpO2 بالای ۹۷٪ روی بخش صاف منحنی تفکیک
              اکسی‌هموگلوبین قرار دارد و OSI را کاذب پایین نشان می‌دهد؛ در این
              محدوده از OI (با نمونه‌ی خون شریانی) استفاده کنید.
            </p>
          )}
        </section>

        {/* جدول طبقه‌بندی */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <LuBookOpen className="text-cyan-600" size={20} />
            <h2 className="text-lg font-bold">طبقه‌بندی شدت PALICC</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2">
                بر اساس OI
              </div>
              <div className="space-y-2">
                {OI_SEVERITY.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${COLORS[s.color].light}`}
                  >
                    <span
                      className={`text-sm font-medium ${COLORS[s.color].text}`}
                    >
                      {s.label}
                    </span>
                    <span
                      className={`text-sm font-bold ${COLORS[s.color].text}`}
                    >
                      {s.range}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2">
                بر اساس OSI
              </div>
              <div className="space-y-2">
                {OSI_SEVERITY.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${COLORS[s.color].light}`}
                  >
                    <span
                      className={`text-sm font-medium ${COLORS[s.color].text}`}
                    >
                      {s.label}
                    </span>
                    <span
                      className={`text-sm font-bold ${COLORS[s.color].text}`}
                    >
                      {s.range}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* نکته کلیدی */}
        <section className="bg-slate-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <LuStethoscope size={20} className="text-cyan-400" />
            <h2 className="text-lg font-bold">نکته‌ی کلیدی برای فراگیر</h2>
          </div>
          <p className="text-sm leading-7 text-slate-200">
            در روند بهبود بیمار، اولویت وینینگ معمولاً{" "}
            <span className="font-semibold text-white">
              کاهش FiO2 پیش از کاهش فشار
            </span>{" "}
            است — هدف رساندن FiO2 به زیر ۰.۶ در سریع‌ترین زمان ممکن، چون سمیت
            اکسیژن و آتلکتازی جذبی (Absorption Atelectasis) با FiO2 بالا و
            طولانی‌مدت مرتبط‌اند، نه صرفاً با فشار.
          </p>
        </section>

        {/* هشدار بالینی */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <LuTriangleAlert
            className="text-amber-600 shrink-0 mt-0.5"
            size={18}
          />
          <p className="text-xs text-amber-900/90 leading-6">
            در بیماری‌های قلبی مادرزادی با فیزیولوژی تک‌بطنی یا شانت راست‌به‌چپ،
            هدف اشباع اکسیژن می‌تواند عمداً پایین‌تر از حد طبیعی (مثلاً ۷۵-۸۵٪)
            باشد؛ افزایش بی‌رویه FiO2 در این بیماران می‌تواند با کاهش مقاومت
            عروق ریوی، جریان خون ریوی را به‌طور خطرناکی افزایش دهد.
          </p>
        </section>
      </div>
    </div>
  );
}
