import { BsLungs } from "react-icons/bs";
import { useState } from "react";

const lungData = {
  normal: {
    title: "ریه سالم (Normal Lung)",
    description:
      "ریه سالم با ساختار طبیعی. آلوئول‌ها به خوبی باز هستند و تبادل گازی به درستی انجام می‌شود.",
    details: [
      "آلوئول‌های باز و سالم",
      "تبادل گازی طبیعی",
      "عدم وجود مایع یا عفونت",
      "کمپلیانس ریه نرمال",
    ],
  },
  pneumonia: {
    title: "پنومونی (Pneumonia)",
    description:
      "عفونت و التهاب بافت ریه که باعث پر شدن آلوئول‌ها با مایع یا چرک می‌شود.",
    details: [
      "آلوئول‌های پر از مایع و چرک",
      "کاهش تبادل گازی",
      "کاهش کمپلیانس ریه",
      "وجود عفونت باکتریایی یا ویروسی",
    ],
  },
  pneumothorax: {
    title: "پنوموتوراکس (Pneumothorax)",
    description:
      "تجمع هوا در فضای پلور که باعث کلاپس ریه می‌شود. معمولاً نیاز به تخلیه فوری دارد.",
    details: [
      "جمع شدن هوا در فضای پلور",
      "کلاپس ریه در سمت درگیر",
      "افزایش فشار داخل قفسه سینه",
      "نیاز به تخلیه فوری هوا",
    ],
  },
  pleuralEffusion: {
    title: "افیوژن پلور (Pleural Effusion)",
    description:
      "تجمع مایع اضافی در فضای پلور که باعث فشار بر ریه و کاهش حجم تنفسی می‌شود.",
    details: [
      "تجمع مایع در فضای پلور",
      "فشار بر بافت ریه",
      "کاهش حجم جاری",
      "نیاز به بررسی علت زمینه‌ای",
    ],
  },
  emphysema: {
    title: "امفیزم (Emphysema)",
    description:
      "تخریب دیواره آلوئول‌ها و بزرگ شدن غیرطبیعی فضاهای هوایی. یکی از انواع COPD است.",
    details: [
      "تخریب دیواره آلوئول‌ها",
      "بزرگ شدن فضاهای هوایی",
      "کاهش سطح تبادل گازی",
      "هیپراینسفلاسیون ریه",
    ],
  },
  atelectasis: {
    title: "آتلکتازی (Atelectasis)",
    description:
      "کلاپس یا فروپاشی بخشی از ریه که باعث کاهش تهویه و اکسیژن‌رسانی می‌شود.",
    details: [
      "فروپاشی بخشی از ریه",
      "کاهش حجم تهویه",
      "شانت داخل ریوی",
      "هیپوکسمی",
    ],
  },
  pulmonaryEdema: {
    title: "ادم ریه (Pulmonary Edema)",
    description:
      "تجمع مایع در بافت‌های ریه معمولاً به دلیل نارسایی قلبی یا آسیب آلوئولی.",
    details: [
      "تجمع مایع در بافت ریه",
      "افزایش وزن ریه",
      "کاهش کمپلیانس",
      "نیاز به دیورتیک و اکسیژن",
    ],
  },
  pulmonaryEmbolism: {
    title: "آمبولی ریه (Pulmonary Embolism)",
    description:
      "انسداد شریان ریوی توسط لخته خون که باعث کاهش جریان خون به بخشی از ریه می‌شود.",
    details: [
      "انسداد شریان ریوی",
      "کاهش پرفیوژن ریوی",
      "افزایش فضای مرده",
      "هیپوکسی و تاکی پنه",
    ],
  },
};

export default function LungModal({ isOpen, onClose }) {
  const [selectedItem, setSelectedItem] = useState("normal");

  if (!isOpen) return null;

  const handleClose = () => {
    document.body.style.overflow = "unset";
    onClose();
  };

  const selectedData = lungData[selectedItem];

  return (
    <div
      className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر مودال - با رنگ آبی مشابه NotebookModal */}
        <div className="bg-[#68d1ee] p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <BsLungs className="text-2xl ml-2" />
            گراف‌های ریه
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transition-colors"
            aria-label="بستن مودال"
          >
            ×
          </button>
        </div>

        {/* بدنه مودال */}
        <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
          {/* سمت چپ - لیست انواع */}
          <div className="w-full md:w-1/3 border-l border-gray-300 overflow-y-auto p-4">
            <div className="space-y-2">
              {Object.keys(lungData).map((key) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedItem === key
                      ? "bg-[#68d1ee] text-white shadow-md transform scale-105"
                      : "hover:bg-[#e7f3f7] text-gray-700 hover:transform hover:scale-105"
                  }`}
                  onClick={() => setSelectedItem(key)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">
                      {lungData[key].title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* سمت راست - نمایش توضیحات */}
          <div className="w-full md:w-2/3 bg-white p-6 overflow-y-auto">
            <div className="h-full flex flex-col">
              {/* عنوان با خط زیر */}
              <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-black">
                  {selectedData.title}
                </h3>
              </div>

              {/* توضیحات اصلی */}
              <p className="text-gray-700 leading-relaxed text-[18px] flex-1">
                {selectedData.description}
              </p>

              {/* جزئیات */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-[#68d1ee] flex items-center gap-2 mb-2">
                  ویژگی‌های بالینی:
                </p>
                <ul className="space-y-1">
                  {selectedData.details.map((detail, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-[#68d1ee] mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
