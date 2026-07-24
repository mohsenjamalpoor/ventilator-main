"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBell, FaBookMedical, FaLungs, FaWaveSquare } from "react-icons/fa";
import { LuSyringe, LuCheck } from "react-icons/lu";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
  },
  {
    title: "Modes of Ventilation",
    href: "/ventilatortraining/mode",
    icon: <FaLungs />,
  },
  {
    title: "پارمترهای ونتیلاتور",
    href: "/ventilatortraining/parameters",
    icon: <FaLungs />,
  },
  {
    title: "Waveforms",
    href: "/ventilatortraining/waveform",
    icon: <FaWaveSquare />,
  },
  {
    title: "داروها",
    href: "/ventilatortraining/medicine",
    icon: <LuSyringe />,
  },
  {
    title: "آلارم‌ها",
    href: "/ventilatortraining/alarm",
    icon: <FaBell />,
  },
];

export default function VentilatorTrainingSidebar() {
  const pathname = usePathname();
  const activeIndex = menu.findIndex((item) => item.href === pathname);
  const currentStep = activeIndex === -1 ? 0 : activeIndex;

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
        <ul>
          {menu.map((item, index) => (
            <MenuItem
              key={item.href}
              item={item}
              index={index}
              isLast={index === menu.length - 1}
              currentStep={currentStep}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function MenuItem({ item, index, isLast, currentStep, pathname }) {
  const active = pathname === item.href;
  const done = index < currentStep;

  return (
    <li className="relative">
      {!isLast && (
        <span
          aria-hidden="true"
          className={`absolute right-4.75 top-10 w-0.5 h-[calc(100%-8px)] ${
            done ? "bg-blue-500" : "bg-slate-150"
          }`}
          style={{ backgroundColor: done ? undefined : "#e7ebf0" }}
        />
      )}

      <Link
        href={item.href}
        className={`group relative z-10 flex items-center gap-3 rounded-2xl px-3 py-3 mb-1 transition-all duration-300
          ${
            active
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
          }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0 border-2 transition-colors
            ${
              active
                ? "bg-white text-blue-600 border-white"
                : done
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-400 border-slate-200 group-hover:border-blue-300 group-hover:text-blue-500"
            }`}
        >
          {done ? <LuCheck className="text-base" /> : item.icon}
        </span>

        <span className="font-semibold">{item.title}</span>
      </Link>
    </li>
  );
}
