"use client";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function TourSlider() {
  const images = [
    {
      id: 1,
      src: "/images/R (1).png",
      alt: "R (1)",
    },
    {
      id: 2,
      src: "/images/image_SI3sJmh4_1727080822376_raw.png",
      alt: "air",
    },
    { id: 3, src: "/images/OIP (8).png", alt: "OIP" },
    {
      id: 4,
      src: "/images/car-4260033_1280.png",
      alt: "car",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Swiper
        modules={[EffectCards, Navigation]}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={false}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex + 1);
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 3,
          rotate: true,
          slideShadows: false,
        }}
        className="tour-slider"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-center items-center p-2">
              <div className="relative w-70 h-90 md:w-[390px] md:h-[480px]">
                <Image
                  alt={item.alt}
                  src={item.src}
                  fill
                  className="rounded-2xl object-cover"
                  priority={item.id === 1}
                  sizes="(max-width: 768px) 280px, 390px"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button className="custom-next p-3 rounded-full hover:bg-gray-200 transition-all text-2xl">
          <IoIosArrowRoundForward />
        </button>

        <div className="font-semibold text-lg min-w-[50px] text-center">
          <span className="">{currentIndex}</span>/
          <span className="text-[#282828B2]">{images.length}</span>
        </div>

        <button className="custom-prev p-3 rounded-full hover:bg-gray-200 transition-all text-2xl">
          <IoIosArrowRoundBack />
        </button>
      </div>
    </div>
  );
}

export default TourSlider;
