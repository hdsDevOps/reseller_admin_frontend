import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "../components/Modal";

const NotificationTemplate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
      <div className="flex flex-row justify-between mr-[40px]">
        <h3 className="font-inter font-medium text-[28px]">
          Notification Template
        </h3>
        <button
          type="button"
          className="bg-[#12A833] px-[20px] py-[7px] w-[139px] h-[40px] rounded-[10px] hover:bg-opacity-95 font-inter font-normal text-base text-[#FFFFFF] float-right"
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
                ? "bg-[#fffefe] text-gray-800"
                : selectedItem
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
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
          <div className="flex flex-row justify-center items-center p-6">
            <h3 className="font-inter text-red-500 font-medium text-[20px]">
              Please choose a template first
            </h3>
          </div>

          <div className="border-b-2 border-gray-300" />

          <div className="p-4"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-6">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-inter text-black font-medium text-[20px] mb-4">
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

          <div className="bg-white w-full p-6 rounded-lg shadow-md">
            <h4 className="font-medium text-xl text-gray-700 mb-4">
              Customize your {selectedItem} email template
            </h4>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder={`Enter ${selectedItem} subject`}
                className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Body</label>
              <textarea
                rows={6}
                placeholder={`Enter ${selectedItem} body content`}
                className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="flex justify-center gap-10 my-10">
              <button
                type="button"
                className="bg-red-500 text-white w-32 h-12 rounded-md hover:bg-opacity-95 transition"
                onClick={() => setSelectedItem("")} // Clear selection
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
    </div>
  );
};

export default NotificationTemplate;
