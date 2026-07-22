"use client";

import { useMemo, useState } from "react";
import { FaSyringe, FaExclamationTriangle } from "react-icons/fa";

const CATEGORY_LABELS = {
  inhalation: "استنشاقی",
  injectable: "تزریقی",
  calculator: "محاسبه سرعت انفوزیون",
};

const inhalationMedicines = [
  { name: "Salbutamol", description: "برونکودیلاتور برای درمان برونکواسپاسم" },
  {
    name: "Ipratropium",
    description: "آنتی‌کولینرژیک جهت کاهش اسپاسم راه هوایی",
  },
  { name: "Budesonide", description: "کورتیکواستروئید استنشاقی" },
];

const injectableMedicines = [
  {
    name: "Midazolam",
    description: "سدیشن بیمار تحت ونتیلاتور",
    highAlert: true,
  },
  { name: "Fentanyl", description: "کنترل درد", highAlert: true },
  { name: "Ketamine", description: "سدیشن و حفظ فشار خون", highAlert: true },
  { name: "Epinephrine", description: "احیاء و شوک", highAlert: true },
  { name: "Norepinephrine", description: "احیاء و شوک", highAlert: true },
  { name: "Dopamine", description: "احیاء و شوک", highAlert: true },
  { name: "Labetalol", description: "کنترل فشار خون" },
  {
    name: "Furosemide (Lasix)",
    description: "دیورتیک لوپ در اضافه‌بار مایعات",
  },
];

const CATEGORY_DATA = {
  inhalation: inhalationMedicines,
  injectable: injectableMedicines,
};

function MedicinePage() {
  const [activeTab, setActiveTab] = useState("inhalation");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const list = CATEGORY_DATA[activeTab] ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.includes(query.trim()),
    );
  }, [activeTab, query]);

  const isListTab = activeTab === "inhalation" || activeTab === "injectable";

  return (
    <div dir="rtl" lang="fa" className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          داروهای پرکاربرد PICU
        </h1>
        <p className="mt-1 text-slate-500 text-sm">
          مرجع سریع داروهای استنشاقی و تزریقی، و محاسبه سرعت انفوزیون
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="بخش‌های صفحه"
          className="flex flex-wrap gap-2"
        >
          {Object.keys(CATEGORY_LABELS).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => {
                setActiveTab(cat);
                setQuery("");
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 ${
                activeTab === cat
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {CATEGORY_LABELS[cat]}
              {CATEGORY_DATA[cat] && (
                <span className="ms-2 text-xs opacity-70">
                  ({CATEGORY_DATA[cat].length})
                </span>
              )}
            </button>
          ))}
        </div>

        {isListTab && (
          <div className="relative sm:w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی نام دارو..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {isListTab &&
        (filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-xl">
            موردی با این نام پیدا نشد
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((medicine) => (
              <article
                key={medicine.name}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <span
                  className={`absolute inset-y-0 right-0 w-1.5 ${
                    activeTab === "inhalation" ? "bg-teal-600" : "bg-blue-600"
                  }`}
                  aria-hidden="true"
                />
                <div className="p-5 pe-6">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {medicine.name}
                    </h2>
                    {medicine.highAlert && (
                      <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-800">
                        داروی پرخطر
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {medicine.description}
                  </p>

                  <button
                    onClick={() => setSelected(medicine)}
                    className="mt-4 w-full bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </article>
            ))}
          </div>
        ))}

      {activeTab === "calculator" && <DripCalculator />}

      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="medicine-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl"
          >
            <h3
              id="medicine-dialog-title"
              className="text-xl font-bold text-slate-900"
            >
              {selected.name}
            </h3>
            {selected.highAlert && (
              <span className="inline-block mt-2 text-xs font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-800">
                داروی پرخطر
              </span>
            )}
            <p className="mt-3 text-slate-600 leading-relaxed">
              {selected.description}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const drugOptions = [
  { name: "داروی عمومی", value: "general" },
  { name: "هپارین", value: "heparin" },
  { name: "لابتولول", value: "labetalol" },
  { name: "مانیتول 20%", value: "mannitol" },
  { name: "انسولین", value: "insulin" },
  { name: "NaCl 3%", value: "nacl3" },
  { name: "میدازولام", value: "midazolam" },
];

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
      if (isNaN(totalVolumeNum) || totalVolumeNum <= 0)
        return "حجم نامعتبر است.";

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
      return "روش محاسبه نامعتبر است.";
    },
    midazolam: () => {
      if (midazolamAgeGroup === "child") {
        const weight = parseFloat(weightKg);
        if (!weight || weight <= 0) return "وزن معتبر وارد کنید.";
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
      setResult("لطفا تمام فیلدها را کامل کنید.");
      return;
    }

    const calculate = calculators[drugType];
    setResult(calculate ? calculate() : "نوع دارو نامعتبر است.");
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

export default MedicinePage;
