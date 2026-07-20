"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaBell, FaBookMedical, FaLungs, FaWaveSquare } from "react-icons/fa";
import { LuSyringe } from "react-icons/lu";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
  },
  {
    title: "Modes of ventilation",
    href: "/ventilatortraining/mode",
    icon: <FaLungs />,
  },
  {
    title: "Waveforms",
    href: "/ventilatortraining/waveform",
    icon: <FaWaveSquare />,
  },
  {
    title: "دارو ها",
    href: "/ventilatortraining/medicine",
    icon: <LuSyringe />,
  },
  {
    title: "Alarm ها",
    href: "/ventilatortraining/alarm",
    icon: <FaBell />,
  },
];

export default function VentilatorTrainingSidebar() {
  return (
    <aside
      dir="rtl"
      className="w-full lg:w-80 rounded-3xl border bg-white p-5 shadow-xl"
    >
      <header className="mb-6 border-b pb-4">
        <h2 className="text-xl font-extrabold text-slate-800">
          آموزش ونتیلاتور
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Pediatric Ventilator Academy
        </p>
      </header>

      <nav>
        <ul className="space-y-3">
          {menu.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function MenuItem({ item }) {
  const pathname = usePathname();

  const active = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
          ${
            active
              ? "bg-blue-600 text-white shadow-lg"
              : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
          }`}
      >
        <span className="text-xl">{item.icon || <AiOutlineCheckCircle />}</span>

        <span className="font-semibold">{item.title}</span>
      </Link>
    </li>
  );
}
