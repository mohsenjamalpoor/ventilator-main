"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AiFillHome } from "react-icons/ai";

import { RxSpeakerModerate } from "react-icons/rx";
import { LuPhone } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import { FaMaskVentilator } from "react-icons/fa6";

const navItems = [
  {
    id: 1,
    title: "صفحه اصلی",
    href: "/",
    icon: <AiFillHome size={20} />,
  },
  {
    id: 2,
    title: "شبیه سازی ونتیلاتور",
    href: "/ventilatorsimulator",
    icon: <FaMaskVentilator size={20} />,
  },
  {
    id: 3,
    title: "آموزش ونتیلاتور",
    href: "/ventilatortraining",
    icon: <RxSpeakerModerate size={20} />,
  },
  {
    id: 4,
    title: "تماس با ما",
    href: "/contact-us",
    icon: <LuPhone size={20} />,
  },
];

function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-12">
          <div className="flex items-center gap-8">
            <button onClick={() => setIsOpen(true)} className="md:hidden">
              <HiOutlineMenu size={28} />
            </button>

            <Link href="/" className="hidden md:block">
              لوگو
            </Link>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`transition-all duration-200 ${
                        isActive(item.href)
                          ? "font-semibold text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2>logo</h2>

          <button onClick={() => setIsOpen(false)}>
            <IoClose size={28} />
          </button>
        </div>

        <nav className="mt-5">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive(item.href)
                      ? "bg-green-50 font-medium text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Header;
