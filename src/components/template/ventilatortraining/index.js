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
    title: "Mode های ونتیلاتور",
    href: "/ventilatortraining/ventilatormode",
    icon: <FaLungs />,
  },
  {
    title: "Alarm های ونتیلاتور",
    href: "/ventilatortraining/alarm",
    icon: <FaBell />,
  },
  {
    title: "عوارض ونتیلاتور",
    href: "/ventilatortraining/complications",
    icon: <FaHeartbeat />,
  },
];

function VentilatorTrainingSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mr-2 w-full lg:w-72 shrink-0">
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
                    ? "bg-sky-100 text-sky-700 font-bold border-r-4 border-sky-600"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default VentilatorTrainingSidebar;
