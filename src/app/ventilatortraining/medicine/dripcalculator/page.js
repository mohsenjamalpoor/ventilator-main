"use client";

import { useState } from "react";
import { FaSyringe, FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";

const drugOptions = [
  { name: "داروی عمومی", value: "general" },
  { name: "هپارین", value: "heparin" },
  { name: "لابتولول", value: "labetalol" },
  { name: "مانیتول 20%", value: "mannitol" },
  { name: "انسولین", value: "insulin" },
  { name: "NaCl 3%", value: "nacl3" },
  { name: "میدازولام", value: "midazolam" },
];

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-slate-700 mb-2 font-medium text-sm">
        {label}
      </label>
      <input
        type="number"
        className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="مثال: 100"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-slate-700 mb-2 font-medium text-sm">
        {label}
      </label>
      <select
        className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DripCalculator() {
  const [midazolamAgeGroup, setMidazolamAgeGroup] = useState("adult");
  const [drugType, setDrugType] = useState("");
  const [totalVolume, setTotalVolume] = useState("");
  const [totalMedical, setTotalMedical] = useState("");
  const [doctorOrder, setDoctorOrder] = useState("");
  const [ampouleCount, setAmpouleCount] = useState("1");
  const [weightKg, setWeightKg] = useState("");
  const [nacl3Method, setNacl3Method] = useState("water");
  const [result, setResult] = useState(null);

  const formatRate = (value) => {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const calculators = {
    general: () => {
      const rate =
        (parseFloat(totalVolume) * parseFloat(doctorOrder)) /
        parseFloat(totalMedical);
      return `سرعت انفوزیون: ${formatRate(rate)} ml/hr`;
    },
    heparin: () => {
      const divisor = ampouleCount === "1" ? 100 : 200;
      const rate = parseFloat(doctorOrder) / divisor;
      return `سرعت تزریق هپارین: ${formatRate(rate)} ml/hr`;
    },
    labetalol: () => {
      const rate = parseFloat(doctorOrder) / 5;
      return `سرعت تزریق لابتولول: ${formatRate(rate)} سی‌سی/ساعت`;
    },
    mannitol: () => {
      const rate = parseFloat(doctorOrder) * 5;
      return `حجم مانیتول: ${formatRate(rate)} سی‌سی`;
    },
    insulin: () => {
      const weight = parseFloat(weightKg);
      const units = parseFloat(totalMedical);
      const volume = parseFloat(totalVolume);
      const dose = 0.1;
      const dropFactor = 20;

      const concentration = units / volume;
      const ccPerHr = (dose / concentration) * weight;
      const gttPerMin = (ccPerHr * dropFactor) / 60;

      return `سرعت تزریق انسولین: ${formatRate(ccPerHr)} cc/hr (${formatRate(gttPerMin)} قطره/دقیقه)`;
    },
    nacl3: () => {
      const totalVolumeNum = parseFloat(totalVolume);
      if (isNaN(totalVolumeNum) || totalVolumeNum <= 0) {
        toast.error("حجم نامعتبر است.");
        return null;
      }

      if (nacl3Method === "water") {
        const ratio = totalVolumeNum / 10;
        const nacl5Volume = ratio * 6;
        const waterVolume = ratio * 4;
        return `برای تهیه ${formatRate(totalVolumeNum)} سی‌سی NaCl 3%:\n
   مقدار NaCl 5% مورد نیاز: ${formatRate(nacl5Volume)} سی‌سی\n
    مقدار آب مقطر مورد نیاز: ${formatRate(waterVolume)} سی‌سی`;
      } else if (nacl3Method === "nacl0.9") {
        const nacl5Vol = totalVolumeNum * 0.5;
        const nacl0_9Vol = totalVolumeNum * 0.5;
        return `برای تهیه ${formatRate(totalVolumeNum)} سی‌سی NaCl 3%:\n
  مقدار NaCl 5% مورد نیاز: ${formatRate(nacl5Vol)} سی‌سی\n
  مقدار سرم نرمال سالین 0.9% مورد نیاز: ${formatRate(nacl0_9Vol)} سی‌سی`;
      }
      toast.error("روش محاسبه نامعتبر است.");
      return null;
    },
    midazolam: () => {
      if (midazolamAgeGroup === "child") {
        const weight = parseFloat(weightKg);
        if (!weight || weight <= 0) {
          toast.error("وزن معتبر وارد کنید.");
          return null;
        }
        const dose = weight * 3;
        return `دوز کل: ${formatRate(dose)} mg\nدر 50cc رقیق می‌شود.\nبا سرعت پایه 5ml/hr شروع می‌کنیم و در صورت نیاز افزایش می‌یابد.`;
      }
      const rate =
        (parseFloat(totalVolume) * parseFloat(doctorOrder)) /
        parseFloat(totalMedical);
      return `سرعت انفوزیون میدازولام: ${formatRate(rate)} ml/hr`;
    },
  };

  const calculateDripRate = () => {
    const commonMissing =
      !drugType ||
      (drugType === "general" &&
        (!totalVolume || !totalMedical || !doctorOrder)) ||
      (drugType === "heparin" && !doctorOrder) ||
      (drugType === "labetalol" && !doctorOrder) ||
      (drugType === "mannitol" && !doctorOrder) ||
      (drugType === "insulin" &&
        (!weightKg || !totalVolume || !totalMedical)) ||
      (drugType === "midazolam" &&
        ((midazolamAgeGroup === "child" && !weightKg) ||
          (midazolamAgeGroup === "adult" &&
            (!totalVolume || !totalMedical || !doctorOrder)))) ||
      (drugType === "nacl3" && !totalVolume);

    if (commonMissing) {
      toast.error("لطفا تمام فیلدها را کامل کنید.");
      setResult(null);
      return;
    }

    const calculate = calculators[drugType];
    if (!calculate) {
      toast.error("نوع دارو نامعتبر است.");
      setResult(null);
      return;
    }

    const calcResult = calculate();
    // اگر calculate خودش toast زده و null برگردونده، نتیجه رو پاک کن
    setResult(calcResult);
  };

  const clearForm = () => {
    setDrugType("");
    setTotalVolume("");
    setTotalMedical("");
    setDoctorOrder("");
    setAmpouleCount("1");
    setWeightKg("");
    setNacl3Method("water");
    setMidazolamAgeGroup("adult");
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-teal-50 p-3 rounded-full text-teal-700">
          <FaSyringe size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            محاسبه سرعت انفوزیون
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            محاسبه دقیق سرعت تزریق داروها
          </p>
        </div>
      </div>

      <div className="grid gap-4 max-w-lg">
        <div>
          <label className="block text-slate-700 mb-2 font-medium text-sm">
            نوع دارو
          </label>
          <select
            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={drugType}
            onChange={(e) => {
              setDrugType(e.target.value);
              setResult(null);
            }}
          >
            <option value="">انتخاب کنید</option>
            {drugOptions.map((drug) => (
              <option key={drug.value} value={drug.value}>
                {drug.name}
              </option>
            ))}
          </select>
        </div>

        {drugType === "general" && (
          <>
            <Input
              label="حجم محلول (ml):"
              value={totalVolume}
              onChange={setTotalVolume}
            />
            <Input
              label="کل دارو (mg):"
              value={totalMedical}
              onChange={setTotalMedical}
            />
            <Input
              label="دستور پزشک (mg):"
              value={doctorOrder}
              onChange={setDoctorOrder}
            />
          </>
        )}

        {drugType === "heparin" && (
          <>
            <Select
              label="تعداد آمپول در ۵۰ سی‌سی:"
              options={[
                { label: "۱ آمپول", value: "1" },
                { label: "۲ آمپول", value: "2" },
              ]}
              value={ampouleCount}
              onChange={setAmpouleCount}
            />
            <Input
              label="دستور پزشک (واحد/kg/hr):"
              value={doctorOrder}
              onChange={setDoctorOrder}
            />
          </>
        )}

        {drugType === "labetalol" && (
          <Input
            label="دستور پزشک (mg/hr):"
            value={doctorOrder}
            onChange={setDoctorOrder}
          />
        )}

        {drugType === "mannitol" && (
          <Input
            label="دستور پزشک (gr):"
            value={doctorOrder}
            onChange={setDoctorOrder}
          />
        )}

        {drugType === "insulin" && (
          <>
            <Input
              label="وزن بیمار (kg):"
              value={weightKg}
              onChange={setWeightKg}
            />
            <Input
              label="کل انسولین (units):"
              value={totalMedical}
              onChange={setTotalMedical}
            />
            <Input
              label="حجم محلول (ml):"
              value={totalVolume}
              onChange={setTotalVolume}
            />
          </>
        )}

        {drugType === "midazolam" && (
          <>
            <Select
              label="سن بیمار:"
              options={[
                { label: "بزرگسال", value: "adult" },
                { label: "اطفال", value: "child" },
              ]}
              value={midazolamAgeGroup}
              onChange={setMidazolamAgeGroup}
            />
            {midazolamAgeGroup === "child" ? (
              <Input
                label="وزن بیمار (kg):"
                value={weightKg}
                onChange={setWeightKg}
              />
            ) : (
              <>
                <Input
                  label="حجم محلول (ml):"
                  value={totalVolume}
                  onChange={setTotalVolume}
                />
                <Input
                  label="کل دارو (mg):"
                  value={totalMedical}
                  onChange={setTotalMedical}
                />
                <Input
                  label="دستور پزشک (mg):"
                  value={doctorOrder}
                  onChange={setDoctorOrder}
                />
              </>
            )}
          </>
        )}

        {drugType === "nacl3" && (
          <>
            <Input
              label="حجم نهایی محلول (ml):"
              value={totalVolume}
              onChange={setTotalVolume}
            />
            <Select
              label="روش تهیه:"
              options={[
                { label: "مخلوط با آب مقطر", value: "water" },
                { label: "مخلوط با نرمال سالین 0.9%", value: "nacl0.9" },
              ]}
              value={nacl3Method}
              onChange={setNacl3Method}
            />
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={calculateDripRate}
            className="flex-1 bg-teal-700 text-white p-3 rounded-xl hover:bg-teal-800 transition-colors font-bold text-sm"
          >
            محاسبه
          </button>
          <button
            onClick={clearForm}
            className="flex-1 bg-slate-100 text-slate-700 p-3 rounded-xl hover:bg-slate-200 transition-colors font-bold text-sm"
          >
            پاک کردن
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100 max-w-lg">
          <h3 className="font-bold text-teal-800 mb-3 text-center text-sm">
            نتیجه محاسبه
          </h3>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-lg font-bold text-teal-700 whitespace-pre-line">
              {result}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 max-w-lg">
        <div className="flex items-center gap-2 text-amber-800 mb-2">
          <FaExclamationTriangle />
          <span className="font-bold text-sm">توجه مهم</span>
        </div>
        <p className="text-amber-700 text-sm leading-relaxed">
          • قبل از تزریق با پزشک یا داروساز مشورت کنید
          <br />
          • از صحت محاسبات اطمینان حاصل کنید
          <br />• شرایط خاص بیمار را در نظر بگیرید
        </p>
      </div>
    </div>
  );
}

export default DripCalculator;
