import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "./Modal"

const GroupForm: React.FC = () => {
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);

  const openPreviewModal = () => {
    setPreviewModalOpen(true);
  }

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  }

  return (
    <>
     <Link to="/voucher-list">
        <span className="flex items-center gap-2 text-xl md:text-3xl">
          <BiArrowBack className="inline-block items-center" />
          Add Voucher
        </span>
      </Link>
      
      <div className="flex items-center gap-2 text-md md:text-lg mt-3">
          <h1 className="text-gray-400 text-sm md:text-xl">
            Voucher{" "}
            <IoChevronForward className="inline-block items-center" />
          </h1>
          <h1 className="text-gray-400 text-sm md:text-xl">
            Voucher List{" "}
            <IoChevronForward className="inline-block items-center" />
          </h1>
          <span className="text-green-500 cursor-pointer text-sm md:text-xl">
           Add voucher
          </span>
        </div>
    <div className="flex flex-col">
      <div className="flex items-center justify-start p-4 mt-16 mx-auto w-full">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-md text-black font-semibold bg-white px-1">
                Voucher Code
              </label>
              <input
                type="text"
                className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                placeholder="Enter Voucher Code"
              />
            </div>

            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-md text-black font-semibold bg-white px-1">
                Start Date
              </label>
              <input
                type="text"
                className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black cursor-pointer"
                placeholder="Select Start Date"
              />
              <MdOutlineCalendarToday className="absolute right-3 top-4 text-black" />
            </div>
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-md text-black font-semibold bg-white px-1">
                Discount-%
              </label>
              <select className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500">
                <option value="">Enter Discount</option>
                <option value="5%">5%</option>
                <option value="8%">8%</option>
              </select>
            </div>
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-md text-black font-semibold bg-white px-1">
                End Date
              </label>
              <input
                type="text"
                className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black cursor-pointer"
                placeholder="Select End Date"
              />
              <MdOutlineCalendarToday className="absolute right-3 top-4 text-black" />
            </div>
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative flex-1">
                <label
                  htmlFor="voucher-code"
                  className="absolute left-3 -top-2.5 text-md text-black font-semibold bg-white px-1"
                >
                  Template
                </label>
                <textarea
                  id="voucher-code"
                  className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-gray-700 placeholder:text-sm resize-none text-wrap"
                  placeholder="*HTML/CSS scripts should be here to make the promotion template"
                  rows={4}
                />
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition" onClick={openPreviewModal}>
                Preview
              </button>
            </div>
          </div>

          <div className="flex justify-start mt-6 gap-4">
            <button className="bg-green-500 text-white max-w-[6rem] w-full h-12 rounded-md hover:bg-green-600">
              Save
            </button>
            <button className="bg-red-500 text-white max-w-[6rem] w-full h-12 rounded-md hover:bg-red-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Modal for Preview */}
    <Modal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        title="Voucher Preview"
      >
        <div className="absolute top-16 left-0 right-0 border border-gray-100 w-full" />
      </Modal>
    </>
    
  );
};

export default GroupForm;
