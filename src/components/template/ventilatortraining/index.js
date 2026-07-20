// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { AiOutlineCheck } from "react-icons/ai";

// // const menu = [
// //   {
// //     title: "مقدمه",
// //     href: "/ventilatortraining",
// //   },
// //   {
// //     title: "Mode ها",
// //     href: "/ventilatortraining/ventilatormode",
// //   },
// //   {
// //     title: "Waveforms",
// //     href: "/ventilatortraining/waveforms",
// //   },
// //   {
// //     title: "Alarm",
// //     href: "/ventilatortraining/alarm",
// //   },
// //   {
// //     title: "عوارض",
// //     href: "/ventilatortraining/complications",
// //   },
// // ];

// // export default function VentilatorTrainingSidebar() {
// //   const pathname = usePathname();

// //   return (
// //     <>
// //       <div className="lg:hidden mb-4 overflow-x-auto rounded-xl border bg-white shadow-sm">
// //         <div className="flex min-w-max p-2 gap-2">
// //           {menu.map((item) => (
// //             <Link
// //               key={item.href}
// //               href={item.href}
// //               className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm transition
// //                 ${
// //                   pathname === item.href
// //                     ? "bg-sky-600 text-white"
// //                     : "bg-gray-100 hover:bg-sky-100"
// //                 }`}
// //             >
// //               <AiOutlineCheck size={20} />
// //               {item.title}
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       <aside className="hidden w-72 shrink-0 lg:block">
// //         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
// //           <div className="bg-sky-600 p-4">
// //             <h2 className="text-center text-lg font-bold text-white">
// //               سرفصل‌های آموزش
// //             </h2>
// //           </div>

// //           <div className="divide-y divide-gray-200">
// //             {menu.map((item) => (
// //               <Link
// //                 key={item.href}
// //                 href={item.href}
// //                 className={`flex items-center gap-3 px-5 py-4 transition
// //                   ${
// //                     pathname === item.href
// //                       ? "border-r-4 border-sky-600 bg-sky-100 font-bold text-sky-700"
// //                       : "text-gray-700 hover:bg-gray-50"
// //                   }`}
// //               >
// //                 <AiOutlineCheck size={20} />
// //                 <span>{item.title}</span>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { FaChevronLeft } from "react-icons/fa6";

// const menu = [
//   {
//     title: "مقدمه",
//   },
//   {
//     title: "Mode ها",
//     children: [
//       { title: "Volume Control" },
//       { title: "Pressure Control" },
//       { title: "SIMV" },
//       { title: "PSV" },
//     ],
//   },
//   {
//     title: "Waveforms",
//     children: [
//       { title: "Pressure Wave" },
//       { title: "Flow Wave" },
//       {
//         title: "Volume Wave",
//         children: [
//           { title: "Normal" },
//           { title: "Air Leak" },
//           { title: "Auto PEEP" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Alarm ها",
//     children: [
//       { title: "High Pressure" },
//       { title: "Low Pressure" },
//       { title: "Apnea" },
//     ],
//   },
// ];

// function Menu({ items }) {
//   const [openItem, setOpenItem] = useState(null);

//   return (
//     <ul className="space-y-2">
//       {items.map((item) => (
//         <MenuItem
//           key={item.title}
//           item={item}
//           open={openItem === item.title}
//           onToggle={() =>
//             setOpenItem(openItem === item.title ? null : item.title)
//           }
//         />
//       ))}
//     </ul>
//   );
// }

// function MenuItem({ item, open, onToggle }) {
//   return (
//     <li className="relative">
//       <button
//         onClick={() => item.children && onToggle()}
//         className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300
//         ${
//           open
//             ? "bg-blue-600 text-white border-blue-600 shadow-lg"
//             : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300"
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           <AiOutlineCheckCircle
//             className={`text-xl ${open ? "text-white" : "text-blue-600"}`}
//           />

//           <span>{item.title}</span>
//         </div>

//         {item.children && (
//           <FaChevronLeft
//             className={`transition-transform duration-300 ${
//               open ? "-rotate-180 text-white" : "text-gray-400"
//             }`}
//           />
//         )}
//       </button>

//       {item.children && (
//         <div
//           className={`absolute top-0 right-full mr-3 origin-right transition-all duration-300 z-50
//           ${
//             open
//               ? "opacity-100 scale-100 visible"
//               : "opacity-0 scale-95 invisible"
//           }`}
//         >
//           <div className="w-72 rounded-2xl border border-gray-200 bg-white shadow-2xl p-3">
//             <Menu items={item.children} />
//           </div>
//         </div>
//       )}
//     </li>
//   );
// }

// export default function VentilatorTrainingSidebar() {
//   return (
//     <aside className="w-80 rounded-2xl mr-2 border border-gray-200 bg-white shadow-xl p-4">
//       <div className="mb-5 border-b border-slate-200 pb-4">
//         <h2 className="text-xl font-bold">آموزش ونتیلاتور</h2>

//         <p className="text-sm text-gray-500 mt-1">
//           Pediatric Ventilator Training
//         </p>
//       </div>

//       <Menu items={menu} />
//     </aside>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBookMedical, FaLungs, FaWaveSquare, FaBell } from "react-icons/fa";

import { AiOutlineCheckCircle } from "react-icons/ai";

const menu = [
  {
    title: "مقدمه",
    href: "/ventilatortraining",
    icon: <FaBookMedical />,
  },

  {
    title: "Mode ها",
    href: "/ventilatortraining/mode",
    icon: <FaLungs />,
  },

  {
    title: "Waveforms",
    href: "/ventilatortraining/waveform",
    icon: <FaWaveSquare />,
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
      className="
w-full
lg:w-80
rounded-3xl
bg-white
border
shadow-xl
p-5
"
    >
      <header
        className="
mb-6
border-b
pb-4
"
      >
        <h1
          className="
text-xl
font-extrabol text-slate-800
"
        >
          آموزش ونتیلاتور
        </h1>

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
        <ul
          className="
space-y-3
"
        >
          {menu.map((item) => (
            <MenuItem key={item.title} item={item} />
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
        className={`
flex
items-center
gap-3
rounded-xl
px-4
py-3
transition


${
  active
    ? "bg-blue-600 text-white shadow-lg"
    : "hover:bg-blue-50 text-slate-700"
}

`}
      >
        <span className="text-xl">{item.icon || <AiOutlineCheckCircle />}</span>

        <span className="font-semibold">{item.title}</span>
      </Link>
    </li>
  );
}
