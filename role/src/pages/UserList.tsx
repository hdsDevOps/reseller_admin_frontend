import React, { useState } from "react";
import Table from "../components/Table";
import { LuFilterX } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
} from "react-icons/io5";
import UserListData, { User } from "../components/UserListData";
import Modal from "../components/Modal";

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { header: string; accessor: keyof User }[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "User Type", accessor: "userType" },
  ];

  const renderActions = (_item: User) => (
    <div className="flex justify-center space-x-4">
      <button>
        <BiSolidEditAlt className="text-black text-xl hover:text-green-500" />
      </button>
      <button>
        <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-3xl font-medium mb-4">User List</h2>
      <div className="flex items-center gap-2 text-md md:text-lg mb-16">
        <h1 className="text-gray-400 text-sm md:text-xl">
          Role management
          <IoChevronForward className="inline-block items-center" />
        </h1>
        <span className="text-green-500 cursor-pointer text-sm md:text-xl">
          User list
        </span>
      </div>
      <div className="bg-[#F9F9F9] py-7 px-10 mb-6 flex items-center justify-between">
        <button
          className=" bg-[#12A833] text-white py-2 px-4 rounded shadow hover:bg-green-500 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>

        <div className="w-[75%] grid grid-cols-2 gap-14">
          <div className="relative">
            <select className="w-full outline-none bg-transparent border border-gray-300 rounded p-2 pr-8 focus:ring-1 focus:ring-green-500 appearance-none">
              <option value="" disabled selected aria-disabled>
                User Type
              </option>
              <option value="Admin">Admin</option>
              <option value="Sub-admin">Sub-admin</option>
              <option value="Account">Account</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <IoChevronDown className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Name, Email, Phone"
              className="w-[75%] bg-transparent border border-gray-300 rounded-l p-2 outline-none  focus:ring-1 focus:ring-green-500"
            />
            <button className="w-[25%] bg-[#12A833] text-white p-2 rounded-r hover:bg-green-500 transition">
              Search
            </button>
            <button className="text-[#12A833] text-xl p-2 rounded-r hover:text-green-500 transition">
              <LuFilterX />
            </button>
          </div>
        </div>
      </div>
      <Table<User>
        columns={columns}
        data={UserListData}
        renderActions={renderActions}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserList;
