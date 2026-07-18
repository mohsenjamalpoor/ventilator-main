"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookMedical, FaLungs, FaBell, FaHeartbeat } from "react-icons/fa";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
  },
  {
    title: "Mode ها",
    href: "/ventilatortraining/ventilatormode",
    icon: <FaLungs />,
  },
  {
    title: "Alarm",
    href: "/ventilatortraining/alarm",
    icon: <FaBell />,
  },
  {
    title: "عوارض",
    href: "/ventilatortraining/complications",
    icon: <FaHeartbeat />,
  },
];

export default function VentilatorTrainingSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden mb-4 overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="flex min-w-max p-2 gap-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm transition
                ${
                  pathname === item.href
                    ? "bg-sky-600 text-white"
                    : "bg-gray-100 hover:bg-sky-100"
                }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-sky-600 p-4">
            <h2 className="text-center text-lg font-bold text-white">
              سرفصل‌های آموزش
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-4 transition
                  ${
                    pathname === item.href
                      ? "border-r-4 border-sky-600 bg-sky-100 font-bold text-sky-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
