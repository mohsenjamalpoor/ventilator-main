"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaBookMedical,
  FaLungs,
  FaWaveSquare,
  FaChevronDown,
} from "react-icons/fa";
import { LuSyringe } from "react-icons/lu";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
    children: [
      { title: "معرفی دستگاه", href: "/ventilatortraining" }, // TODO: زیرمجموعه واقعی رو جایگزین کن
    ],
  },
  {
    title: "Modes of Ventilation",
    href: "/ventilatortraining/mode",
    icon: <FaLungs />,
    children: [
      {
        title: "Volume Control",
        href: "/ventilatortraining/mode/volume-control",
      },
      {
        title: "Pressure Control",
        href: "/ventilatortraining/mode/pressure-control",
      },
      { title: "SIMV", href: "/ventilatortraining/mode/simv" },
      { title: "PSV", href: "/ventilatortraining/mode/psv" },
    ],
  },
  {
    title: "پارامترهای ونتیلاتور",
    href: "/ventilatortraining/parameters",
    icon: <FaLungs />,
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
    icon: <FaWaveSquare />,
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
        href: "/ventilatortraining/waveform",
      },
    ],
  },
  {
    title: "داروها",
    href: "/ventilatortraining/medicine",
    icon: <LuSyringe />,
    children: [
      { title: "لیست داروها", href: "/ventilatortraining/medicine" }, // TODO: زیرمجموعه واقعی رو جایگزین کن
    ],
  },
  {
    title: "آلارم‌ها",
    href: "/ventilatortraining/alarm",
    icon: <FaBell />,
    children: [
      { title: "لیست آلارم‌ها", href: "/ventilatortraining/alarm" }, // TODO: زیرمجموعه واقعی رو جایگزین کن
    ],
  },
];

export default function VentilatorTrainingSidebar() {
  const pathname = usePathname();

  const activeParentIndex = menu.findIndex(
    (item) =>
      pathname === item.href ||
      item.children?.some((child) => pathname === child.href),
  );

  const [openIndex, setOpenIndex] = useState(
    activeParentIndex === -1 ? 0 : activeParentIndex,
  );

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
      <nav>
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
  const isActiveParent =
    pathname === item.href || item.children?.some((c) => pathname === c.href);

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mr-5 mt-1 space-y-1 border-r-2 border-slate-100 pr-4">
            {item.children.map((child) => {
              const activeChild = pathname === child.href;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors
                      ${
                        activeChild
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                  >
                    {child.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { FaBell, FaBookMedical, FaLungs, FaWaveSquare } from "react-icons/fa";
// import { LuSyringe, LuCheck } from "react-icons/lu";

// const menu = [
//   {
//     title: "مقدمه",
//     href: "/ventilatortraining",
//     icon: <FaBookMedical />,
//   },
//   {
//     title: "Modes of Ventilation",
//     href: "/ventilatortraining/mode",
//     icon: <FaLungs />,
//   },
//   {
//     title: "پارمترهای ونتیلاتور",
//     href: "/ventilatortraining/parameters",
//     icon: <FaLungs />,
//   },
//   {
//     title: "Waveforms",
//     href: "/ventilatortraining/waveform",
//     icon: <FaWaveSquare />,
//   },
//   {
//     title: "داروها",
//     href: "/ventilatortraining/medicine",
//     icon: <LuSyringe />,
//   },
//   {
//     title: "آلارم‌ها",
//     href: "/ventilatortraining/alarm",
//     icon: <FaBell />,
//   },
// ];

// export default function VentilatorTrainingSidebar() {
//   const pathname = usePathname();
//   const activeIndex = menu.findIndex((item) => item.href === pathname);
//   const currentStep = activeIndex === -1 ? 0 : activeIndex;

//   return (
//     <aside
//       dir="rtl"
//       className="w-full lg:w-80 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl"
//     >
//       <header className="mb-6 border-b border-slate-100 pb-4">
//         <h2 className="text-xl font-extrabold text-slate-900">
//           آموزش ونتیلاتور
//         </h2>
//         <p className="mt-1 text-sm text-slate-400">
//           Pediatric Ventilator Academy
//         </p>
//       </header>

//       <nav>
//         <ul>
//           {menu.map((item, index) => (
//             <MenuItem
//               key={item.href}
//               item={item}
//               index={index}
//               isLast={index === menu.length - 1}
//               currentStep={currentStep}
//               pathname={pathname}
//             />
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// function MenuItem({ item, index, isLast, currentStep, pathname }) {
//   const active = pathname === item.href;
//   const done = index < currentStep;

//   return (
//     <li className="relative">
//       {!isLast && (
//         <span
//           aria-hidden="true"
//           className={`absolute right-4.75 top-10 w-0.5 h-[calc(100%-8px)] ${
//             done ? "bg-blue-500" : "bg-slate-150"
//           }`}
//           style={{ backgroundColor: done ? undefined : "#e7ebf0" }}
//         />
//       )}

//       <Link
//         href={item.href}
//         className={`group relative z-10 flex items-center gap-3 rounded-2xl px-3 py-3 mb-1 transition-all duration-300
//           ${
//             active
//               ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
//               : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
//           }`}
//       >
//         <span
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0 border-2 transition-colors
//             ${
//               active
//                 ? "bg-white text-blue-600 border-white"
//                 : done
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-slate-400 border-slate-200 group-hover:border-blue-300 group-hover:text-blue-500"
//             }`}
//         >
//           {done ? <LuCheck className="text-base" /> : item.icon}
//         </span>

//         <span className="font-semibold">{item.title}</span>
//       </Link>
//     </li>
//   );
// }
