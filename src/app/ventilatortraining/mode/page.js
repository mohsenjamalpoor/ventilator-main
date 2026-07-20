"use client";

import Link from "next/link";

const modes = [
  {
    title: "Volume Control",
    slug: "vc",
  },

  {
    title: "Pressure Control",
    slug: "pc",
  },

  {
    title: "SIMV",
    slug: "simv",
  },

  {
    title: "PSV",
    slug: "psv",
  },
];

export default function ModePage() {
  return (
    <div dir="rtl">
      <h1
        className="
text-3xl
font-bold
mb-6
"
      >
        Mode های ونتیلاتور
      </h1>

      <div
        className="
grid
md:grid-cols-2
gap-5
"
      >
        {modes.map((mode) => (
          <Link
            key={mode.slug}
            href={`/ventilatortraining/mode/${mode.slug}`}
            className="
rounded-2xl
border
bg-white
p-6
shadow
hover:shadow-xl
transition
"
          >
            <h2
              className="
text-xl
font-bold
text-blue-700
"
            >
              {mode.title}
            </h2>

            <p
              className="
text-gray-500
mt-2
"
            >
              آموزش کامل {mode.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
