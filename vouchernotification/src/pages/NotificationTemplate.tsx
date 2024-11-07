import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "../components/Modal";
import { BsEnvelopePlusFill } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";


const NotificationTemplate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPreviewModal = () => {
    setPreviewModalOpen(true);
  }

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };
  const handleCancel = () => {
    setSelectedItem("");  };

  const dropdownItems = [
    "Email Verification",
    "Account Deactivation",
    "Password Reset",
    "Two-Factor Authentication",
    "Profile Update Confirmation",
    "Subscription Confirmation",
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-inter font-medium text-md md:text-lg lg:text-[28px]">
          Notification Template
        </h3>
        <button
          type="button"
          className="bg-[#12A833] py-[7px] w-[7.2rem] sm:w-[139px] h-[40px] rounded-[10px] hover:bg-opacity-95 font-inter font-normal text-sm md:text-base text-[#FFFFFF] float-right"
          onClick={openModal}
        >
          +&nbsp;&nbsp;Add new
        </button>
      </div>

      <div className="dropdown relative self-end mt-6">
        <div
          tabIndex={0}
          role="button"
          className={`btn m-1 flex items-center justify-between border border-gray-200 w-64 p-2 rounded-[4px] 
            ${
              isDropdownOpen
                ? "bg-[#fffefe] text-[#BABABA]"
                : selectedItem
                ? "bg-gray-200 text-[#757575]"
                : "bg-gray-200 text-[#757575]"
            } 
            outline-none transition-all duration-200`}
          onClick={toggleDropdown}
          onKeyPress={(e) => e.key === "Enter" && toggleDropdown()}
        >
          {selectedItem || "Select a notification section"}
          <MdKeyboardArrowDown
            className={`ml-2 text-xl transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isDropdownOpen && (
          <ul
            className="absolute right-0 dropdown-content menu bg-white rounded-box z-[1] w-[16rem] p-2 shadow transition-all duration-300 ease-in-out"
            style={{
              transform: `translateY(${isDropdownOpen ? 0 : -10}px)`,
              opacity: isDropdownOpen ? 1 : 0,
            }}
          >
            {dropdownItems.map((item, index) => (
              <li key={index} className="flex justify-center">
                <a
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer w-full text-center text-sm p-2 hover:bg-gray-100"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!selectedItem ? (
        <div className="bg-gray-100 border border-gray-300 w-full min-h-48 h-full flex flex-col mt-20">
          <div className="flex justify-center items-center p-6 text-red-500 font-medium text-[20px]">
            <h3 className="font-inter">
              Please choose a template first
            </h3>
          </div>

          <div className="border-b-2 border-gray-300" />

          <div className="p-4"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <div className="flex items-center justify-between w-full my-3">
            <h3 className="font-inter text-black font-medium text-[20px]">
              Template
            </h3>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isToggled}
                  onChange={toggleSwitch}
                />
                <div
                  className={`w-10 h-5 rounded-full shadow-inner transition-all duration-200 ease-in-out ${
                    isToggled ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`absolute left-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                ></div>
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center  border-2 border-[#E4E4E4] min-h-[20rem] h-full">
            <div className="flex items-center justify-between w-full py-1 px-3">
              <h3 className="font-inter text-[#757575] text-base">
                {selectedItem}
              </h3>
              <button
                type="button"
                className="flex items-center justify-between bg-[#007BFFCC] text-white text-sm w-44 h-12 px-2 hover:bg-opacity-95 transition"
              >
                Dynamic code list
                <IoChevronDown className="inline-flex text-md mt-1" />
              </button>
            </div>
            <div className="border-b-2 border-gray-300 w-full" />

            <div className="w-full">
              <textarea
                className="w-full bg-transparent min-h-[20rem] outline-none py-2 px-3 h-full resize-none"
                placeholder="HTML/CSS script should be here to make the Promotion template"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between items-center w-full px-0 lg:px-4 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1 w-full sm:w-auto sm:mb-0 mt-1">
              <div className="flex justify-between items-center border border-[#E4E4E4] text-[0.85rem] w-full sm:max-w-sm md:max-w-[24rem] bg-white p-3">
                <span className="text-[#757575]">
                  Separate multiple emails with comma.
                </span>
                <MdKeyboardArrowDown
                  className="ml-2 text-[#757575]"
                  size={24}
                />
              </div>
              <BsEnvelopePlusFill className="text-[#525050] hidden sm:block" size={32} />
            </div>

            <div className="flex gap-2 md:gap-4 justify-end w-full sm:w-auto">
              <button className="px-4 py-3 text-white bg-green-500 rounded-xl hover:bg-green-600 transition-all duration-300" onClick={openPreviewModal}>
                Preview
              </button>
              <button className="px-4 py-3 border border-green-500 text-black rounded-xl hover:bg-green-100 transition-all duration-300">
                Update
              </button>
              <button className="px-4 py-3 text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all duration-300" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new template */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Notification Template"
      >
        <div className="relative">
          <label className="absolute left-3 -top-2.5 text-gray-900 bg-white px-1 text-lg">
            Subject
          </label>
          <input
            type="text"
            className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-gray-800"
            placeholder="Enter subject"
          />
        </div>
        <div className="flex justify-center gap-10 my-10">
          <button
            type="button"
            className="bg-red-500 text-white w-32 h-12 rounded-md hover:bg-opacity-95 transition"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white w-32 h-12 rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Modal for Preview */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        title="Template Preview"
      >
        <div className="absolute top-16 left-0 right-0 border border-gray-100 w-full" />
      </Modal>
    </div>
  );
};

export default NotificationTemplate;
