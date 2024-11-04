import React from "react";
import { LuFilterX } from "react-icons/lu";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
} from "react-icons/io5";
import RoleData from "../components/RoleData";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Role = () => {

  return (
    <div className="p-4">
      <h2 className="text-3xl font-medium mb-4">Role</h2>
      <div className="flex items-center gap-2 text-md md:text-lg mb-16">
        <h1 className="text-gray-400 text-sm md:text-xl">
          Role management
          <IoChevronForward className="inline-block items-center" />
        </h1>
        <span className="text-green-500 cursor-pointer text-sm md:text-xl">
          Role
        </span>
      </div>
      <div className="bg-[#F9F9F9] py-7 px-10 mb-6 flex items-center justify-between">
        <Link to="/add-role"
          className="bg-[#12A833] text-white py-2 px-4 rounded shadow hover:bg-green-500 transition"
        >
          Add User
        </Link>

        <div className="flex items-center">
          <div className="relative w-[20rem]">
            <select className="w-full outline-none bg-transparent border border-gray-300 rounded p-2 pr-8 focus:ring-1 focus:ring-green-500 appearance-none">
              <option value="" disabled selected aria-disabled>
                Auto search
              </option>
              <option value="Admin">Admin</option>
              <option value="Sub-admin">Sub-admin</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <IoChevronDown className="text-gray-500" />
            </div>
          </div>
          <button className="text-[#12A833] text-xl p-2 rounded-r hover:text-green-500 transition">
            <LuFilterX />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border-separate border-spacing-y-6">
          <thead className="bg-[#F7FAFF] h-16">
            <tr>
              <th className="text-[#777777] text-left px-4 py-2">User Type</th>
              <th className="text-[#777777] text-left px-4 py-2">Permissions</th>
              <th className="text-[#777777] text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RoleData.map((user) => (
              <tr key={user.userType} className="hover:bg-gray-100 mb-10">
                <td className="px-4 py-2 text-[#777777]">{user.userType}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col space-y-2">
                    {user.permissions.map((permission, index) => (
                      <div className="flex justify-start">
                        <button
                          key={index}
                          className="bg-[#12a83241] rounded-3xl text-xs text-left py-1 px-4 hover:bg-gray-300 transition inline-block max-w-max"
                        >
                          {permission}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-2">
                  <div className="flex justify-start space-x-4">
                    <button>
                      <BiSolidEditAlt className="text-black text-xl hover:text-green-500" />
                    </button>
                    <button>
                      <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Role;
