import {
  FaLungs,
  FaBookMedical,
  FaPlayCircle,
  FaChartLine,
} from "react-icons/fa";

export default function VentilatorTrainingPage() {
  return (
    <div>
      <div
        className="
rounded-3xl
bg-gradient-to-l
from-blue-700
to-cyan-500
p-8
text-white
"
      >
        <h1
          className="
text-3xl
font-extrabold
"
        >
          آموزش حرفه‌ای ونتیلاتور
        </h1>

        <p
          className="
mt-4
leading-8
text-blue-100
"
        >
          یادگیری تهویه مکانیکی از مبانی تا مدیریت بیماران ICU و PICU
        </p>

        <button
          className="
mt-6
flex
items-center
gap-2
rounded-xl
bg-white
px-6
py-3
font-bold
text-blue-700
"
        >
          <FaPlayCircle />
          شروع دوره
        </button>
      </div>

      <div
        className="
mt-8
grid
gap-5
md:grid-cols-3
"
      >
        <Card
          icon={<FaBookMedical />}
          title="مبانی ونتیلاتور"
          text="شناخت اجزا، مدار تنفسی و اصول تهویه"
        />

        <Card
          icon={<FaLungs />}
          title="Mode ها"
          text="VCV، PCV، SIMV، CPAP و تنظیمات"
        />

        <Card
          icon={<FaChartLine />}
          title="Waveform"
          text="تحلیل منحنی فشار، جریان و حجم"
        />
      </div>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div
      className="
rounded-2xl
border
p-6
hover:shadow-lg
transition
"
    >
      <div
        className="
flex
h-14
w-14
items-center
justify-center
rounded-xl
bg-blue-100
text-2xl
text-blue-600
"
      >
        {icon}
      </div>

      <h3
        className="
mt-5
text-xl
font-bold
"
      >
        {title}
      </h3>

      <p
        className="
mt-3
leading-8
text-gray-600
"
      >
        {text}
      </p>
    </div>
  );
}
