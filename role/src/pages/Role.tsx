import React, { useState } from "react";
import { LuFilterX } from "react-icons/lu";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
} from "react-icons/io5";
import RoleData from "../components/RoleData";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import UserListData from "../components/UserListData";
import '../styles/styles.css';

const Role = () => {
  const navigate = useNavigate();
  const [filterUserList, setFilterUserList] = useState([]);

  return (
    <div className="grid grid-cols-1 p-4">
      <div className="flex-row-between-responsive sm:mr-10 max-sm:mr-0">
        <h3 className="h3-text">
          Role
        </h3>
      </div>
      <div
        className='flex flex-row mt-5 h-[22px]'
      >
        <p
          className='page-indicator-1'
        >Role management</p>
        <ChevronRight
          className='page-indicator-arrow'
        />
        <p
          className='page-indicator-2'
        >Role</p>
      </div>
      <div className="bg-[#F9F9F9] p-[19px] mb-6 flex min-[835px]:flex-row max-[835px]:flex-col items-center justify-between mt-2">
        <Link to="/add-role"
          className="btn-green ml-[19px]"
        >
          Add User
        </Link>

        <div className="sm:px-4 max-sm:px-0 sm:w-[350px] max-sm:w-full max-[835px]:mt-2">
          <div
            className="flex flex-row gap-2"
          >
            <input
              list="brow"
              placeholder="Auto search"
              className="serach-input-no-radius"
              name="domain"
              // onChange={handleFilterChange}
              // value={filters.domain}
            />
            <button>
              <LuFilterX
                className="text-[20px] text-custom-green"
              />
            </button>
          </div>
          <div
            className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-custom-white rounded-b ${
              filterUserList?.length == 0 ? "hidden" : ""
            }`}
          >
            {filterUserList?.map((item, index) => {
              return (
                <a
                  key={index}
                  className={`font-inter-16px-400 pl-4 py-1 ${
                    index != 0 && `border-t border-white`
                  }`}
                >
                  {item.fname} {item.lname}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border-separate border-spacing-y-6">
          <thead className="bg-custom-blue-6 h-12">
            <tr>
              <th className="th-css-full-opacity-text-left">User Type</th>
              <th className="th-css-full-opacity">Permissions</th>
              <th className="th-css-full-opacity">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RoleData.map((user) => (
              <tr key={user.userType} className="hover:bg-gray-100 mb-10">
                <td className="min-w-[180px]">{user.userType}</td>
                <td className="min-w-[180px]">
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

                <td className="min-w-[180px]">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        navigate('/edit-role');
                      }}
                    >
                      <BiSolidEditAlt className="text-black text-xl" />
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
