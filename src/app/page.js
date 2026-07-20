"use client";

import Link from "next/link";
import {
  FaLungs,
  FaPlayCircle,
  FaBookMedical,
  FaChartLine,
  FaUserMd,
} from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-slate-100">
      <section className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                <FaLungs />
                <span>Pediatric Ventilator Simulator</span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-800">
                شبیه‌ساز آموزشی
                <br />
                <span className="text-blue-600">ونتیلاتور</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-gray-600">
                محیطی کاملاً تعاملی برای آموزش تنظیمات ونتیلاتور، مانیتورینگ
                بیمار، تمرین سناریوهای بالینی و یادگیری مدیریت بیماران تحت تهویه
                مکانیکی.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/ventilatorsimulator"
                  className="flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
                >
                  <FaPlayCircle />
                  شروع شبیه سازی
                </Link>

                <Link
                  href="/ventilatortraining"
                  className="rounded-xl border border-blue-200 bg-white px-7 py-4 font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
                >
                  آموزش ونتیلاتور
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-200 blur-3xl opacity-50"></div>

                <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-500 shadow-2xl">
                  <FaLungs className="text-[170px] text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
              <FaBookMedical />
            </div>

            <h3 className="text-xl font-bold">آموزش کامل</h3>

            <p className="mt-3 text-gray-600 leading-8">
              یادگیری تمامی Mode ها، Waveform ها و تنظیمات دستگاه ونتیلاتور.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl text-green-600">
              <FaChartLine />
            </div>

            <h3 className="text-xl font-bold">شبیه سازی زنده</h3>

            <p className="mt-3 text-gray-600 leading-8">
              تغییر تنظیمات و مشاهده تغییرات علائم حیاتی و پاسخ بیمار به صورت
              لحظه‌ای.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-2xl text-red-600">
              <FaUserMd />
            </div>

            <h3 className="text-xl font-bold">سناریوهای بالینی</h3>

            <p className="mt-3 text-gray-600 leading-8">
              تمرین مدیریت بیماران PICU همراه با تصمیم‌گیری بالینی.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
