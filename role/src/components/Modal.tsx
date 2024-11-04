import React from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-xl w-full">
        <div className="relative mb-10">
          <h2 className="text-2xl font-semibold mb-1">Add User</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, odio!
          </p>
          <span
            className="absolute right-2 top-2 5 text-2xl font-medium cursor-pointer animate-pulse"
            onClick={() => onClose()}
          >
            <IoClose />
          </span>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
                  First Name
                </label>
                <input
                  type="text"
                  value="Robert"
                  className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                  placeholder="Enter first name"
                />
              </div>
              <div className="relative">
                <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value="Clive"
                  className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
                Email Address
              </label>
              <input
                type="email"
                value="Robertclive"
                className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                placeholder="Enter email"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                @domain.co.in
              </span>
            </div>
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
                Phone Number
              </label>
              <input
                type="Text"
                value="8777593946"
                className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                placeholder="Enter email"
              />
            </div>
            <div className="relative">
              <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
                Role
              </label>
              <select className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none pr-8">
                <option value="" disabled selected aria-disabled>
                  Select User Type
                </option>
                <option value="Admin">Admin</option>
                <option value="Sub-admin">Sub-admin</option>
                <option value="Account">Account</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <IoChevronDown className="text-black" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-7 my-10">
            <button
              type="submit"
              className="bg-green-500 text-white w-28 h-12 rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white w-28 h-12 rounded-md hover:bg-opacity-95 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
