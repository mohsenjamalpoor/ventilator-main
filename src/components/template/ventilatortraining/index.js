"use client";
import { useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaBookMedical,
  FaLungs,
  FaWaveSquare,
  FaChevronDown,
  FaQuestionCircle,
} from "react-icons/fa";
import { LuSyringe } from "react-icons/lu";
import { FaFlask } from "react-icons/fa6";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical size={16} />,
    children: [{ title: "مقدمه", href: "/ventilatortraining" }],
  },
  {
    title: "Modes of Ventilation",
    href: "/ventilatortraining/mode",
    icon: <FaLungs size={16} />,
    children: [
      {
        title: "CMV",
        href: "/ventilatortraining/mode/cmv",
        children: [
          { title: "VC-AC", href: "/ventilatortraining/mode/cmv/vc-ac" },
          { title: "PC-AC", href: "/ventilatortraining/mode/cmv/pc-ac" },
          { title: "PRVC-AC", href: "/ventilatortraining/mode/cmv/prvc-ac" },
        ],
      },
      {
        title: "IMV",
        href: "/ventilatortraining/mode/imv",
        children: [
          { title: "VC-AC", href: "/ventilatortraining/mode/imv/vc-ac" },
          { title: "PC-AC", href: "/ventilatortraining/mode/imv/pc-ac" },
          { title: "PRVC-AC", href: "/ventilatortraining/mode/imv/prvc-ac" },
        ],
      },
      {
        title: "CSV",
        href: "/ventilatortraining/mode/csv",
        children: [
          { title: "CPAP", href: "/ventilatortraining/mode/csv/cpap" },
          { title: "PSV", href: "/ventilatortraining/mode/csv/psv" },
        ],
      },
    ],
  },
  {
    title: "پارامترهای ونتیلاتور",
    href: "/ventilatortraining/parameters",
    icon: <FaLungs size={16} />,
    children: [
      { title: "VT", href: "/ventilatortraining/parameters/vt" },
      { title: "RR", href: "/ventilatortraining/parameters/rr" },
      { title: "PEEP", href: "/ventilatortraining/parameters/peep" },
      { title: "PIP", href: "/ventilatortraining/parameters/pip" },
      { title: "Plateau", href: "/ventilatortraining/parameters/plateau" },
      { title: "I:E", href: "/ventilatortraining/parameters/ie" },
      { title: "FiO2", href: "/ventilatortraining/parameters/fio2" },
      { title: "Ti", href: "/ventilatortraining/parameters/ti" },
      {
        title: "Trigger Sensitivity",
        href: "/ventilatortraining/parameters/trigger-sensitivity",
      },
    ],
  },
  {
    title: "Waveforms",
    href: "/ventilatortraining/waveform",
    icon: <FaWaveSquare size={16} />,
    children: [
      {
        title: "Pressure-Time",
        href: "/ventilatortraining/waveform/pressure-time",
      },
      { title: "Flow-Time", href: "/ventilatortraining/waveform/flow-time" },
      {
        title: "Volume-Time",
        href: "/ventilatortraining/waveform/volume-time",
      },
      { title: "PV Loop", href: "/ventilatortraining/waveform/pv-loop" },

      {
        title: "Flow-Volume Loop",
        href: "/ventilatortraining/waveform/flow-volume-loop",
      },
    ],
  },
  {
    title: "داروها",
    href: "/ventilatortraining/medicine",
    icon: <LuSyringe size={16} />,
    children: [
      {
        title: "Sedation & Analgesia",
        href: "/ventilatortraining/medicine/sedation",
        children: [
          {
            title: "Midazolam",
            href: "/ventilatortraining/medicine/sedation/midazolam",
          },
          {
            title: "Ketamine",
            href: "/ventilatortraining/medicine/sedation/ketamine",
          },
          {
            title: "Propofol",
            href: "/ventilatortraining/medicine/sedation/propofol",
          },
          {
            title: "Dexmedetomidine",
            href: "/ventilatortraining/medicine/sedation/dexmedetomidine",
          },
          {
            title: "Fentanyl",
            href: "/ventilatortraining/medicine/sedation/fentanyl",
          },
          {
            title: "Morphine",
            href: "/ventilatortraining/medicine/sedation/morphine",
          },
        ],
      },

      {
        title: "Neuromuscular Blockers",
        href: "/ventilatortraining/medicine/nmba",
        children: [
          {
            title: "Atracurium",
            href: "/ventilatortraining/medicine/nmba/atracurium",
          },
          {
            title: "Rocuronium",
            href: "/ventilatortraining/medicine/nmba/rocuronium",
          },
          {
            title: "Vecuronium",
            href: "/ventilatortraining/medicine/nmba/vecuronium",
          },
        ],
      },
      {
        title: "Cardiovascular Drugs",
        href: "/ventilatortraining/medicine/cardiovascular",
        children: [
          {
            title: "Inotropes",
            href: "/ventilatortraining/medicine/cardiovascular/inotropes",
            children: [
              {
                title: "Epinephrine",
                href: "/ventilatortraining/medicine/cardiovascular/vasopressors/epinephrine",
              },
              {
                title: "Dopamine",
                href: "/ventilatortraining/medicine/cardiovascular/inotropes/dopamine",
              },
              {
                title: "Dobutamine",
                href: "/ventilatortraining/medicine/cardiovascular/inotropes/dobutamine",
              },
              {
                title: "Milrinone",
                href: "/ventilatortraining/medicine/cardiovascular/inotropes/milrinone",
              },
            ],
          },
          {
            title: "Vasopressors",
            href: "/ventilatortraining/medicine/cardiovascular/vasopressors",
            children: [
              {
                title: "Epinephrine",
                href: "/ventilatortraining/medicine/cardiovascular/vasopressors/epinephrine",
              },
              {
                title: "Norepinephrine",
                href: "/ventilatortraining/medicine/cardiovascular/vasopressors/norepinephrine",
              },
              {
                title: "Vasopressin",
                href: "/ventilatortraining/medicine/cardiovascular/vasopressors/vasopressin",
              },
            ],
          },
          {
            title: "Antihypertensives",
            href: "/ventilatortraining/medicine/cardiovascular/antihypertensives",
            children: [
              {
                title: "Labetalol",
                href: "/ventilatortraining/medicine/cardiovascular/antihypertensives/labetalol",
              },
              {
                title: "Nicardipine",
                href: "/ventilatortraining/medicine/cardiovascular/antihypertensives/nicardipine",
              },
              {
                title: "Hydralazine",
                href: "/ventilatortraining/medicine/cardiovascular/antihypertensives/hydralazine",
              },
              {
                title: "Esmolol",
                href: "/ventilatortraining/medicine/cardiovascular/antihypertensives/esmolol",
              },
            ],
          },
        ],
      },
      {
        title: "Diuretics",
        href: "/ventilatortraining/medicine/diuretics",
        children: [
          {
            title: "Furosemide",
            href: "/ventilatortraining/medicine/diuretics/furosemide",
          },
          {
            title: "Spironolactone",
            href: "/ventilatortraining/medicine/diuretics/spironolactone",
          },
        ],
      },
      {
        title: "Emergency Drugs",
        href: "/ventilatortraining/medicine/emergency",
        children: [
          {
            title: "Atropine",
            href: "/ventilatortraining/medicine/emergency/atropine",
          },
          {
            title: "Adenosine",
            href: "/ventilatortraining/medicine/emergency/adenosine",
          },
          {
            title: "Calcium Gluconate",
            href: "/ventilatortraining/medicine/emergency/calcium-gluconate",
          },
          {
            title: "Sodium Bicarbonate",
            href: "/ventilatortraining/medicine/emergency/sodium-bicarbonate",
          },
        ],
      },
      {
        title: "محاسبه‌گرها",
        href: "/ventilatortraining/medicine/calculators",
        children: [
          {
            title: "محاسبه سرعت انفوزیون",
            href: "/ventilatortraining/medicine/dripcalculator",
          },
          {
            title: "محاسبه دوز بر اساس وزن",
            href: "/ventilatortraining/medicine/dosecalculator",
          },
        ],
      },
    ],
  },
  {
    title: "آلارم‌ها",
    href: "/ventilatortraining/alarm",
    icon: <FaBell size={16} />,
    children: [{ title: "لیست آلارم‌ها", href: "/ventilatortraining/alarm" }],
  },
  {
    title: "تفسیر ABG",
    href: "/ventilatortraining",
    icon: <FaFlask size={16} />,
    children: [{ title: "تفسیر ABG", href: "/ventilatortraining/abg" }],
  },
  {
    title: "آزمون",
    href: "/ventilatortraining/exam",
    icon: <FaQuestionCircle size={16} />,
    children: [{ title: "آزمون", href: "/ventilatortraining/exam" }],
  },
];

// بررسی بازگشتی این‌که آیا مسیر فعلی، خودِ آیتم یا یکی از فرزندانش (در هر عمقی) هست
function containsActivePath(item, pathname) {
  if (pathname === item.href) return true;
  if (item.children) {
    return item.children.some((child) => containsActivePath(child, pathname));
  }
  return false;
}

export default function VentilatorTrainingSidebar() {
  const pathname = usePathname();

  const [openIndex, setOpenIndex] = useState(() => {
    const idx = menu.findIndex((item) => containsActivePath(item, pathname));
    return idx === -1 ? 0 : idx;
  });

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      dir="rtl"
      className="w-full lg:w-80 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl"
    >
      <header className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          آموزش ونتیلاتور
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Pediatric Ventilator Academy
        </p>
      </header>
      <nav aria-label="منوی آموزش ونتیلاتور">
        <ul className="space-y-1">
          {menu.map((item, index) => (
            <ParentMenuItem
              key={item.href}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function ParentMenuItem({ item, isOpen, onToggle, pathname }) {
  const hasChildren = item.children && item.children.length > 0;
  const isActiveParent = containsActivePath(item, pathname);
  const panelId = useId();

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? panelId : undefined}
        className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300
          ${
            isActiveParent
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
          }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors
            ${
              isActiveParent
                ? "border-white bg-white text-blue-600"
                : "border-slate-200 bg-white text-slate-400 group-hover:border-blue-300 group-hover:text-blue-500"
            }`}
        >
          {item.icon}
        </span>
        <span className="flex-1 text-right font-semibold">{item.title}</span>
        {hasChildren && (
          <FaChevronDown
            className={`text-xs transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } ${isActiveParent ? "text-white" : "text-slate-400"}`}
          />
        )}
      </button>

      {hasChildren && (
        <div
          id={panelId}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mr-5 mt-1 space-y-1 border-r-2 border-slate-100 pr-4">
            {item.children.map((child) => (
              <SubMenuItem key={child.href} item={child} pathname={pathname} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// کامپوننت بازگشتی برای رندر هر تعداد سطحِ زیرمنو
// - آیتم‌هایی که خودشون children دارن (مثل CMV, IMV, CSV): فقط باز/بسته می‌شن، به صفحه‌ای navigate نمی‌کنن
// - آیتم‌های برگ (بدون children، مثل VC-AC): با کلیک به صفحه‌ی خودشون می‌رن
function SubMenuItem({ item, pathname }) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const isActiveBranch = containsActivePath(item, pathname);
  const panelId = useId();

  const [open, setOpen] = useState(isActiveBranch);

  return (
    <li>
      <div className="flex items-center">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`flex-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-right transition-colors
              ${
                isActiveBranch
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
          >
            <span>{item.title}</span>
            <FaChevronDown
              className={`text-xs transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 block rounded-xl px-3 py-2 text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
          >
            {item.title}
          </Link>
        )}
      </div>

      {hasChildren && (
        <div
          id={panelId}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mr-4 mt-1 space-y-1 border-r-2 border-slate-100 pr-3">
            {item.children.map((grandChild) => (
              <SubMenuItem
                key={grandChild.href}
                item={grandChild}
                pathname={pathname}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
