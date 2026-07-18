import React from "react";
import TourSlider from "./TourSlider";
import Image from "next/image";
import { BsTelephoneFill } from "react-icons/bs";

function HomePage() {
  return (
    <>
      <div className="max-w-295 mx-auto w-full h-62.5 border border-[#00000040] flex rounded-[10px] overflow-hidden">
        <div className="w-4/5 relative bg-[#28A745] rounded-[10px] flex items-center justify-between px-6">
          <div className="flex flex-col mr-10 mb-8 gap-2 text-white">
            <h2 className="text-xl font-extrabold text-[48px]">
              خرید تلفنی از
              <span className="text-[#10411B] font-extrabold text-[48px]">
                تورینو
              </span>
            </h2>
            <p className="text-[32px] font-normal">به هرکجا که میخواهید!</p>
          </div>

          <Image
            src="/images/professional.png"
            width={320}
            height={250}
            alt="professional"
            className=" absolute bottom-0 left-8"
          />
        </div>

        <div className="w-1/5 flex flex-col items-center justify-center gap-3 bg-white">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">021-1840</span>
            <BsTelephoneFill />
          </div>

          <button className="text-white mt-2 bg-[#10411B] px-6 py-1 rounded-lg cursor-pointer">
            اطلاعات بیشتر
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-24">
        <div className="w-full md:w-[500px] md:mr-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 mt-2 flex items-center justify-center rounded-full bg-linear-to-r from-[#28A745] to-[#10411B] pt-2 text-[38px] text-white">
              ؟
            </div>
            <h1 className="text-[40px] font-extrabold text-[#282828]">
              چرا
              <span className="text-[40px] font-extrabold text-[#28A745]">
                تورینو
              </span>
              ؟
            </h1>
          </div>
          <div className="hidden md:block">
            <h3 className="text-[#282828] mt-8 text-[36px] font-medium">
              تور طبیعت گردی و تاریخی{" "}
            </h3>
            <p className="text-[#282828] mt-4 text-justify leading-10 font-normal text-[20px]">
              اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
              طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید
              تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های
              گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای
              فرهنگی و تاریخی را خریداری کنید.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <TourSlider />
        </div>
      </div>
      <div className="flex flex-col gap-6 border-t border-[#00000033] pt-6 md:flex-row md:justify-evenly">
        <div className="flex items-center  gap-1  ">
          <Image
            src="/images/Group 16.png"
            alt="group16"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-[#282828] text-[26px] font-medium">
              بصرفه ترین قیمت
            </h2>
            <p className="text-[#282828] w-47 font-light text-[16px]">
              بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/images/Group 17.png"
            alt="group17"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-[#282828] text-[26px] font-medium">پشتیبانی</h2>
            <p className="text-[#282828] w-47 font-light text-[16px]">
              پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/images/Group 18.png"
            alt="group18"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-[#282828] text-[26px] font-medium">
              رضایت کاربران
            </h2>
            <p className="text-[#282828] w-47 font-light text-[16px]">
              رضایت بیش از 10هزار کاربر از تور های ما.
            </p>
          </div>
        </div>
      </div>
      <div className="w-295 border border-[#00000033] mr-20 mt-10 "></div>
    </>
  );
}

export default HomePage;
