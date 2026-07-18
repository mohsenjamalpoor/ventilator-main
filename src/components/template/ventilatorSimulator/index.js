"use client";

import { BsLungs } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GiDrippingTube } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { useState } from "react";

import LungModal from "@/components/module/LungModal";
import NotebookModal from "@/components/module/NotebookModal";
import OpenSimulationSetting from "@/components/partials/container/OpenSimulationSetting";

export default function SimulatorPage() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isLungModalOpen, setIsLungModalOpen] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">شبیه‌ساز ونتیلاتور</h1>

          <div className="flex items-center gap-6">
            <CiUser
              size={24}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            />

            <BsLungs
              size={24}
              onClick={() => setIsLungModalOpen(true)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            />

            <GiDrippingTube
              size={24}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            />

            <button onClick={() => setOpenSetting(!openSetting)}>
              <IoSettingsOutline
                size={24}
                className={`transition-all ${
                  openSetting ? "text-blue-600 rotate-90" : "text-gray-600"
                }`}
              />
            </button>

            <LuNotebookPen
              size={24}
              onClick={() => setIsNotebookOpen(true)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        <OpenSimulationSetting
          open={openSetting}
          onClose={() => setOpenSetting(false)}
        />

        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">
            محتوای شبیه‌ساز ونتیلاتور اینجا قرار می‌گیرد...
          </p>
        </div>
      </div>

      <NotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
      />

      <LungModal
        isOpen={isLungModalOpen}
        onClose={() => setIsLungModalOpen(false)}
      />
    </div>
  );
}
