import { LuNotebookPen } from "react-icons/lu";
import { useState } from "react";

const notebookData = {
  PEEP: {
    title: "PEEP (Positive End-Expiratory Pressure)",
    description:
      "فشار مثبت انتهای بازدمی که به حفظ باز بودن راه‌های هوایی و بهبود اکسیژن‌رسانی کمک می‌کند. محدوده نرمال: ۵-۲۰ سانتی‌متر آب.",
  },
  PIP: {
    title: "PIP (Peak Inspiratory Pressure)",
    description:
      "حداکثر فشار دمی که در طول بازدم به ریه‌ها وارد می‌شود. برای باز کردن آلوئول‌ها و غلبه بر مقاومت راه‌های هوایی استفاده می‌شود. محدوده نرمال: ۲۰-۳۰ سانتی‌متر آب.",
  },
  "Tidal Volume": {
    title: "Tidal Volume (حجم جاری)",
    description:
      "مقدار هوایی که در هر تنفس وارد یا خارج می‌شود. معمولاً ۶-۸ میلی‌لیتر به ازای هر کیلوگرم وزن ایده‌آل بدن محاسبه می‌شود.",
  },
  "Respiratory Rate": {
    title: "Respiratory Rate (نرخ تنفس)",
    description:
      "تعداد تنفس‌ها در دقیقه. محدوده نرمال برای بزرگسالان: ۱۲-۲۰ تنفس در دقیقه.",
  },
  FiO2: {
    title: "FiO2 (Fraction of Inspired Oxygen)",
    description:
      "درصد اکسیژن ورودی. از ۲۱% (هوای اتاق) تا ۱۰۰% قابل تنظیم است. برای جلوگیری از سمیت اکسیژن باید تا حد امکان پایین نگه داشته شود.",
  },
  "I:E Ratio": {
    title: "I:E Ratio (نسبت دم به بازدم)",
    description:
      "نسبت زمان دم به زمان بازدم. معمولاً ۱:۲ تا ۱:۳ است که زمان بیشتری برای بازدم در نظر گرفته می‌شود تا از به دام افتادن هوا جلوگیری شود.",
  },
  "Flow Rate": {
    title: "Flow Rate (نرخ جریان)",
    description:
      "سرعت جریان گاز در راه‌های هوایی. معمولاً ۴۰-۸۰ لیتر در دقیقه برای بزرگسالان تنظیم می‌شود.",
  },
  "Plateau Pressure": {
    title: "Plateau Pressure (فشار فلات)",
    description:
      "فشار در انتهای دم وقتی جریان متوقف می‌شود. نشان‌دهنده الاستانس ریه است و نباید از ۳۰ سانتی‌متر آب بیشتر شود.",
  },
  "Ventilator Alarms": {
    title: "Ventilator Alarms",
    description: "",
  },
};

export default function NotebookModal({ isOpen, onClose }) {
  const [selectedItem, setSelectedItem] = useState("PEEP");

  if (!isOpen) return null;
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black1/4 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#68d1ee] p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <LuNotebookPen className="text-2xl ml-2" />
            دفترچه راهنمای ونتیلاتور
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transition-colors"
            aria-label="بستن مودال"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
          <div className="w-full md:w-1/3  border-l border-gray-300 overflow-y-auto p-4">
            <div className="space-y-2">
              {Object.keys(notebookData).map((item) => (
                <div
                  key={item}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedItem === item
                      ? "bg-[#68d1ee] text-white shadow-md transform scale-105"
                      : "hover:bg-[#e7f3f7] text-gray-700 hover:transform hover:scale-105"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white p-6 overflow-y-auto">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-black">
                  {notebookData[selectedItem].title}
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-[18px] flex-1">
                {notebookData[selectedItem].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
