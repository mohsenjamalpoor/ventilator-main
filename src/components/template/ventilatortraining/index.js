"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineCheckCircle } from "react-icons/ai";

import {
  FaChevronLeft,
  FaBookMedical,
  FaLungs,
  FaWaveSquare,
  FaBell,
} from "react-icons/fa";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
  },

  {
    title: "Mode ها",
    icon: <FaLungs />,
    children: [
      {
        title: "Volume Control",
        href: "/ventilatortraining/mode/vc",
      },
      {
        title: "Pressure Control",
        href: "/ventilatortraining/mode/pc",
      },
      {
        title: "SIMV",
        href: "/ventilatortraining/mode/simv",
      },
      {
        title: "PSV",
        href: "/ventilatortraining/mode/psv",
      },
    ],
  },

  {
    title: "Waveforms",
    icon: <FaWaveSquare />,
    children: [
      {
        title: "Pressure Wave",
        href: "/ventilatortraining/waveform/pressure",
      },
      {
        title: "Flow Wave",
        href: "/ventilatortraining/waveform/flow",
      },
      {
        title: "Volume Wave",
        children: [
          {
            title: "Normal",
            href: "/ventilatortraining/waveform/volume/normal",
          },
          {
            title: "Air Leak",
            href: "/ventilatortraining/waveform/volume/leak",
          },
          {
            title: "Auto PEEP",
            href: "/ventilatortraining/waveform/volume/peep",
          },
        ],
      },
    ],
  },

  {
    title: "Alarm ها",
    icon: <FaBell />,
    children: [
      {
        title: "High Pressure",
        href: "/ventilatortraining/alarm/high-pressure",
      },
      {
        title: "Low Pressure",
        href: "/ventilatortraining/alarm/low-pressure",
      },
      {
        title: "Apnea",
        href: "/ventilatortraining/alarm/apnea",
      },
    ],
  },
];

export default function VentilatorTrainingSidebar() {
  const [open, setOpen] = useState(null);

  return (
    <aside
      className="
w-full
lg:w-80
rounded-3xl
border
bg-white
shadow-xl
p-5
"
      dir="rtl"
    >
      <header
        className="
mb-5
border-b
pb-4
"
      >
        <h2
          className="
text-xl
font-extrabold
text-slate-800
"
        >
          آموزش ونتیلاتور
        </h2>

        <p
          className="
text-sm
text-gray-500
mt-2
"
        >
          Pediatric Ventilator Academy
        </p>
      </header>

      <nav>
        <ul className="space-y-3">
          {menu.map((item, index) => (
            <MenuItem
              key={item.title}
              item={item}
              open={open === index}
              onClick={() => setOpen(open === index ? null : index)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function MenuItem({ item, open, onClick }) {
  const pathname = usePathname();

  const active = item.href && pathname === item.href;

  return (
    <li>
      {item.href ? (
        <Link
          href={item.href}
          className={`
flex
items-center
justify-between
rounded-xl
px-4
py-3
transition

${active ? "bg-blue-600 text-white shadow-lg" : "hover:bg-blue-50"}

`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {item.icon || <AiOutlineCheckCircle />}
            </span>

            {item.title}
          </div>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`
flex
w-full
items-center
justify-between
rounded-xl
px-4
py-3
transition

${open ? "bg-blue-600 text-white shadow-lg" : "hover:bg-blue-50"}

`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>

            {item.title}
          </div>

          <FaChevronLeft
            className={`
transition
${open ? "-rotate-90" : ""}
`}
          />
        </button>
      )}

      {item.children && open && (
        <ul
          className="
mr-5
mt-2
space-y-2
border-r-2
border-blue-200
pr-4
animate-in
slide-in-from-right-3
"
        >
          {item.children.map((child) => (
            <MenuItem
              key={child.title}
              item={child}
              open={false}
              onClick={() => {}}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
