"use client";

import { BsLungs } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GiDrippingTube } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { useState } from "react";
import LungModal from "@/components/module/LungModal";
import NotebookModal from "@/components/module/NotebookModal";

export default function SimulatorPage() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isLungModalOpen, setIsLungModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const openNotebook = () => setIsNotebookOpen(true);
  const closeNotebook = () => setIsNotebookOpen(false);

  const openLungModal = () => setIsLungModalOpen(true);
  const closeLungModal = () => setIsLungModalOpen(false);

  return (
    <div className="min-h-screen mt-4 bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800">
            شبیه‌ساز ونتیلاتور
          </h1>

          <div className="flex gap-6">
            <CiUser
              size={24}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
            />
            <BsLungs
              size={24}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={openLungModal}
            />
            <GiDrippingTube
              size={24}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
            />
            <button onClick={() => setOpen(!open)}>
              <IoSettingsOutline
                size={24}
                className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
              />
            </button>
            <LuNotebookPen
              size={24}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={openNotebook}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div></div>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">
            محتوای شبیه‌ساز ونتیلاتور اینجا قرار می‌گیرد...
          </p>
        </div>
      </div>
      {open && (
        <div className="absolute left-2 top-35  w-56 rounded-xl border p-3  bg-white shadow-lg">
          <div className="border rounded-xl mb-2 p-2 text-grey-500">
            Suction ETT
          </div>
          <div className="border rounded-xl mb-2 p-2">Needle Decompression</div>
          <div className="border rounded-xl mb-2 p-2">Extubate Patient</div>
          <div className="border rounded-xl mb-2 p-2">check for ETT leak</div>
        </div>
      )}

      <NotebookModal isOpen={isNotebookOpen} onClose={closeNotebook} />

      <LungModal isOpen={isLungModalOpen} onClose={closeLungModal} />
    </div>
  );
}
