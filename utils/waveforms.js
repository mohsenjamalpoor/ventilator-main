import {
  LuActivity,
  LuWaves,
  LuChartLine,
  LuCircleGauge,
  LuGitCompareArrows,
  LuRadio,
} from "react-icons/lu";

export const waveforms = [
  {
    id: 1,
    title: "Pressure-Time Waveform",
    subtitle: "فشار بر حسب زمان",
    icon: LuCircleGauge,
    color: "#38BDF8",
    description:
      "نمودار Pressure-Time تغییرات فشار راه هوایی را در طول سیکل تنفس نمایش می‌دهد.",
    clinical: [
      "بررسی Peak Pressure",
      "تشخیص Auto PEEP",
      "بررسی Compliance",
      "تشخیص Airway Resistance",
    ],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 180,
    variants: {
      normal: {
        path: "M0,180 L15,180 C25,180 30,60 45,55 L70,50 L215,50 C225,50 232,90 240,140 C246,168 248,178 255,180 L300,180",
        readouts: [
          { label: "Peak Pressure", value: "28", unit: "cmH2O" },
          { label: "Plateau", value: "22", unit: "cmH2O" },
          { label: "PEEP", value: "5", unit: "cmH2O" },
        ],
        note: "الگوی طبیعی موج فشار با یک Plateau صاف در انتهای دم.",
      },
      leak: {
        path: "M0,180 L15,180 C25,180 30,65 45,60 L70,58 C120,58 170,68 215,80 C225,95 232,115 240,148 C246,168 248,178 255,180 L300,180",
        readouts: [
          { label: "Peak Pressure", value: "24", unit: "cmH2O" },
          { label: "Plateau", value: "افت‌کننده", unit: "" },
          { label: "PEEP", value: "5", unit: "cmH2O" },
        ],
        note: "به‌جای Plateau صاف، فشار در طول Hold افت می‌کند — نشانه‌ی نشتی از مدار یا کاف لوله.",
      },
      obstruction: {
        path: "M0,180 L15,180 C30,180 40,85 55,65 C75,50 95,42 110,40 L215,40 C225,42 232,90 240,140 C246,168 248,178 255,180 L300,180",
        readouts: [
          { label: "Peak Pressure", value: "38", unit: "cmH2O" },
          { label: "Plateau", value: "22", unit: "cmH2O" },
          { label: "Peak-Plateau Gap", value: "بزرگ", unit: "" },
        ],
        note: "صعود کندتر و فاصله‌ی زیاد Peak تا Plateau نشانه‌ی افزایش مقاومت راه هوایی است.",
      },
      overdistension: {
        path: "M0,180 L15,180 C25,180 30,60 45,55 L55,50 C60,44 65,28 75,28 C85,28 90,44 95,50 L215,50 C225,50 232,90 240,140 C246,168 248,178 255,180 L300,180",
        readouts: [
          { label: "Peak Pressure", value: "34", unit: "cmH2O" },
          { label: "Plateau", value: "22", unit: "cmH2O" },
          { label: "Beak Sign", value: "مثبت", unit: "" },
        ],
        note: "برآمدگی نوک‌تیز (Beak) در انتهای دم، نشانه‌ی بیش‌اتساع آلوئولی است.",
      },
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "فشار (cmH2O)",
  },
  {
    id: 2,
    title: "Flow-Time Waveform",
    subtitle: "جریان بر حسب زمان",
    icon: LuWaves,
    color: "#34D399",
    description:
      "نمودار Flow-Time جریان دم و بازدم را نشان می‌دهد و برای تشخیص Air Trapping و Auto PEEP کاربرد دارد.",
    clinical: [
      "تشخیص Auto PEEP",
      "بررسی کامل شدن بازدم",
      "تشخیص Air Leak",
      "بررسی Trigger",
    ],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 110,
    variants: {
      normal: {
        path: "M0,110 C8,110 15,45 35,42 C70,38 110,55 150,80 C165,90 172,100 178,110 L182,110 C185,170 195,185 205,180 C225,168 245,140 270,120 C285,108 292,110 300,110",
        readouts: [
          { label: "Peak Flow", value: "60", unit: "L/min" },
          { label: "I:E Ratio", value: "1:2", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "بازگشت کامل جریان بازدمی به خط صفر پیش از دم بعدی.",
      },
      leak: {
        path: "M0,104 C8,104 15,40 35,37 C70,33 110,50 150,75 C165,85 172,95 178,104 L182,100 C184,135 192,150 202,148 C220,140 240,122 262,108 C278,98 290,96 300,104",
        readouts: [
          { label: "Peak Flow", value: "58", unit: "L/min" },
          { label: "Zero Return", value: "ناقص", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "خط پایه‌ی جریان هرگز به صفر واقعی نمی‌رسد — نشانه‌ی نشتی مدار یا کاف بادنشده.",
      },
      obstruction: {
        path: "M0,120 C8,120 15,45 35,42 C70,38 110,55 150,80 C165,90 172,100 178,110 L182,112 C184,148 190,168 200,175 C215,180 232,178 248,172 C265,165 282,150 295,132 C298,128 300,124 300,120",
        readouts: [
          { label: "Peak Exp. Flow", value: "30", unit: "L/min" },
          { label: "Exp. Time", value: "طولانی", unit: "" },
          { label: "Rate", value: "14", unit: "/min" },
        ],
        note: "تخلیه‌ی کند و ناقص بازدمی پیش از شروع دم بعدی — بیانگر Air Trapping / Auto-PEEP است.",
      },
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "جریان (L/min)",
  },
  {
    id: 3,
    title: "Volume-Time Waveform",
    subtitle: "حجم بر حسب زمان",
    icon: LuChartLine,
    color: "#FBBF24",
    description:
      "این موج حجم جاری را در طول دم و بازدم نمایش می‌دهد و برای بررسی نشتی مدار و برگشت کامل حجم به صفر استفاده می‌شود.",
    clinical: ["تشخیص Leak", "بررسی Tidal Volume", "کنترل بازدم کامل"],
    isLoop: false,
    viewBox: "0 0 600 220",
    cycleWidth: 300,
    baselineY: 180,
    variants: {
      normal: {
        path: "M0,180 C20,180 50,70 90,55 L170,52 C185,52 190,60 195,75 C220,140 250,175 280,180 L300,180",
        readouts: [
          { label: "Tidal Volume", value: "450", unit: "ml" },
          { label: "Minute Volume", value: "6.3", unit: "L" },
        ],
        note: "بازگشت کامل حجم به خط پایه‌ی صفر پس از هر بازدم.",
      },
      leak: {
        path: "M0,160 C20,160 50,62 90,50 L170,48 C183,48 188,55 193,68 C213,105 240,140 265,155 L300,160",
        readouts: [
          { label: "Exhaled Vt", value: "380", unit: "ml" },
          { label: "Set Vt", value: "450", unit: "ml" },
          { label: "Diff", value: "-70", unit: "ml" },
        ],
        note: "حجم بازدمی هرگز به صفر بازنمی‌گردد؛ اختلاف حجم دمی و بازدمی نشانه‌ی نشتی است.",
      },
      obstruction: {
        path: "M0,172 C20,172 50,66 90,52 L170,50 C184,50 189,57 194,71 C216,120 246,158 272,168 L300,172",
        readouts: [
          { label: "Exhaled Vt", value: "430", unit: "ml" },
          { label: "Set Vt", value: "450", unit: "ml" },
          { label: "Diff", value: "-20", unit: "ml" },
        ],
        note: "بازگشت ناقص حجم به دلیل بازدم ناکامل و احتباس هوا (Air Trapping).",
      },
    },
    xAxisLabel: "زمان (ثانیه)",
    yAxisLabel: "حجم (ml)",
  },
  {
    id: 4,
    title: "Pressure-Volume Loop",
    subtitle: "لوپ فشار-حجم",
    icon: LuActivity,
    color: "#A78BFA",
    description:
      "لوپ Pressure-Volume رابطه بین فشار و حجم را نشان می‌دهد و برای تنظیم مناسب PEEP و تشخیص Overdistension استفاده می‌شود.",
    clinical: [
      "تنظیم PEEP",
      "تشخیص Overdistension",
      "Recruitment",
      "Compliance",
    ],
    isLoop: true,
    viewBox: "0 0 300 300",
    variants: {
      normal: {
        inspPath: "M45,235 C95,255 150,225 190,185 C222,153 240,115 250,85",
        expPath: "M250,85 C225,140 165,190 105,212 C75,222 55,230 45,235",
        readouts: [
          { label: "Compliance", value: "45", unit: "ml/cmH2O" },
          { label: "Loop", value: "بسته", unit: "" },
        ],
        note: "لوپ کاملاً بسته با Hysteresis طبیعی بین دم و بازدم.",
      },
      leak: {
        inspPath: "M45,235 C95,255 150,225 190,185 C222,153 240,115 250,85",
        expPath: "M250,85 C225,140 175,185 120,205 C100,212 85,210 70,205",
        readouts: [
          { label: "Compliance", value: "نامعتبر", unit: "" },
          { label: "Loop", value: "باز", unit: "" },
        ],
        note: "لوپ بسته نمی‌شود — نقطه‌ی پایان بازدم به نقطه‌ی شروع دم بازنمی‌گردد. این شکاف، امضای کلاسیک نشتی روی لوپ PV است.",
      },
      overdistension: {
        inspPath:
          "M45,235 C95,255 150,225 185,190 C205,168 215,140 220,110 C222,100 230,92 250,85",
        expPath:
          "M250,85 C230,95 222,105 220,118 C215,145 200,175 165,198 C120,222 80,228 45,235",
        readouts: [
          { label: "Compliance", value: "کاهش‌ یافته", unit: "" },
          { label: "Beak Sign", value: "مثبت", unit: "" },
        ],
        note: "صاف‌شدگی و 'نوک اردکی' (Beak) در بالای لوپ، نشانه‌ی بیش‌اتساع آلوئولی است.",
      },
      obstruction: {
        inspPath: "M45,235 C100,258 155,220 195,175 C222,145 235,110 245,80",
        expPath: "M245,80 C215,150 155,200 95,220 C70,228 55,232 45,235",
        readouts: [
          { label: "Resistance", value: "افزایش‌یافته", unit: "" },
          { label: "Loop", value: "پهن‌تر", unit: "" },
        ],
        note: "پهن‌ترشدن لوپ و افزایش Hysteresis به‌علت افزایش مقاومت راه هوایی.",
      },
    },
    xAxisLabel: "حجم (ml)",
    yAxisLabel: "فشار (cmH2O)",
  },
  {
    id: 5,
    title: "Flow-Volume Loop",
    subtitle: "لوپ جریان-حجم",
    icon: LuGitCompareArrows,
    color: "#F472B6",
    description:
      "لوپ Flow-Volume جریان و حجم را همزمان نمایش می‌دهد و برای تشخیص انسداد راه هوایی، Leak و برونکواسپاسم کاربرد دارد.",
    clinical: ["تشخیص Bronchospasm", "تشخیص Leak", "Upper Airway Obstruction"],
    isLoop: true,
    viewBox: "0 0 300 300",
    variants: {
      normal: {
        expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
        inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
          { label: "Loop", value: "بسته", unit: "" },
        ],
        note: "شکل طبیعی لوپ با بازگشت کامل به نقطه‌ی شروع روی محور حجم.",
      },
      leak: {
        expPath: "M30,150 C48,62 92,42 132,46 C180,52 232,90 272,150",
        inspPath: "M272,150 C232,190 180,210 150,210 C112,210 75,195 55,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "55", unit: "L/min" },
          { label: "Loop", value: "باز", unit: "" },
        ],
        note: "لوپ روی محور حجم بسته نمی‌شود؛ حجم بازدمی کمتر از حجم دمی است — نشانه‌ی نشتی.",
      },
      obstruction: {
        expPath:
          "M30,150 C46,70 85,45 125,44 C160,44 190,60 210,90 C225,112 235,130 245,145 C255,152 262,150 272,150",
        inspPath: "M272,150 C232,192 180,212 150,212 C110,212 60,190 30,150",
        readouts: [
          { label: "Peak Exp. Flow", value: "38", unit: "L/min" },
          { label: "Coving", value: "مثبت", unit: "" },
        ],
        note: "فرورفتگی (Scooping/Coving) در قوس بازدمی، نشانه‌ی کلاسیک انسداد راه هوایی (COPD/آسم).",
      },
    },
    xAxisLabel: "حجم (ml)",
    yAxisLabel: "جریان (L/min)",
  },
];
