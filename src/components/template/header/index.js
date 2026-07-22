"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiFillHome } from "react-icons/ai";
import { RxSpeakerModerate } from "react-icons/rx";
import { LuPhone, LuActivity } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaMaskVentilator } from "react-icons/fa6";

const navItems = [
  {
    id: 1,
    title: "صفحه اصلی",
    href: "/",
    icon: <AiFillHome size={18} />,
  },
  {
    id: 2,
    title: "شبیه سازی ونتیلاتور",
    href: "/ventilatorsimulator",
    icon: <FaMaskVentilator size={18} />,
  },
  {
    id: 3,
    title: "آموزش ونتیلاتور",
    href: "/ventilatortraining",
    icon: <RxSpeakerModerate size={18} />,
  },
  {
    id: 4,
    title: "تماس با ما",
    href: "/contact-us",
    icon: <LuPhone size={18} />,
  },
];

function Logo() {
  return (
    <span className="flex items-center gap-2 font-bold text-slate-900">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-emerald-400">
        <LuActivity size={18} />
      </span>
      <span className="hidden sm:inline">ونتیلاتور آکادمی</span>
    </span>
  );
}

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
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-12">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="باز کردن منو"
              className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <HiOutlineMenu size={24} />
            </button>

            <Link href="/">
              <Logo />
            </Link>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="بستن منو"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <IoClose size={24} />
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-1 px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isActive(item.href)
                        ? "border-blue-100 bg-white text-blue-600"
                        : "border-slate-100 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.title}
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
