"use client";

import { useMemo, useState } from "react";

const CATEGORY_LABELS = {
  inhalation: "استنشاقی",
  injectable: "تزریقی",
};

const inhalationMedicines = [
  {
    name: "Salbutamol",
    description: "برونکودیلاتور برای درمان برونکواسپاسم",
  },
  {
    name: "Ipratropium",
    description: "آنتی‌کولینرژیک جهت کاهش اسپاسم راه هوایی",
  },
  {
    name: "Budesonide",
    description: "کورتیکواستروئید استنشاقی",
  },
];

const injectableMedicines = [
  {
    name: "Midazolam",
    description: "سدیشن بیمار تحت ونتیلاتور",
    highAlert: true,
  },
  {
    name: "Fentanyl",
    description: "کنترل درد",
    highAlert: true,
  },
  {
    name: "Ketamine",
    description: "سدیشن و حفظ فشار خون",
    highAlert: true,
  },
  {
    name: "Epinephrine",
    description: "احیاء و شوک",
    highAlert: true,
  },
  {
    name: "Norepinephrine",
    description: "احیاء و شوک",
    highAlert: true,
  },
  {
    name: "Dopamine",
    description: "احیاء و شوک",
    highAlert: true,
  },
  {
    name: "Labetalol",
    description: "کنترل فشار خون",
  },
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
    const list = CATEGORY_DATA[activeTab];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.includes(query.trim()),
    );
  }, [activeTab, query]);

  return (
    <div dir="rtl" lang="fa" className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          داروهای پرکاربرد PICU
        </h1>
        <p className="mt-1 text-slate-500 text-sm">
          مرجع سریع داروهای استنشاقی و تزریقی بخش مراقبت ویژه کودکان
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:items-center sm:justify-between">
        <div role="tablist" aria-label="دسته‌بندی دارو" className="flex gap-2">
          {Object.keys(CATEGORY_DATA).map((cat) => (
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
              <span className="ms-2 text-xs opacity-70">
                ({CATEGORY_DATA[cat].length})
              </span>
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام دارو..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
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
      )}

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

export default MedicinePage;
