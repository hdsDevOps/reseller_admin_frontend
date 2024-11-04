import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddRole = () => {
  const permissionGroups = [
    {
      label: "Notification Template",
      subPermissions: ["Add", "Preview", "Update", "Cancel", "Send mail"],
    },
    {
      label: "Subscription Master",
      subPermissions: ["Add", "Edit", "Delete"],
    },
    {
      label: "Payment Method",
      subPermissions: ["Action"],
    },
    {
      label: "Billing History",
      subPermissions: ["Download"],
    },
    {
      label: "FAQ's",
      subPermissions: ["Add"],
    },
    {
      label: "Email log",
      subPermissions: ["View details"],
    },
    {
      label: "Role management",
      subPermissions: ["Add", "Edit", "Delete"],
    },
    {
      label: "CMS",
      subPermissions: ["View details"],
    },
    {
      label: "Settings",
      subPermissions: ["Dashboard widget", "About", "Privacy policy", "Terms & conditions", "Customer agreement"],
    },
  ];
  
  return (
    <div className="flex flex-col p-4 md:p-8">
      <div className="flex flex-col items-center self-start gap-4">
        <Link to="/role">
          <span className="flex items-center gap-2 text-2xl md:text-3xl">
            <BiArrowBack className="inline-block items-center" />
            Add Customer Group
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm md:text-lg mb-16">
          <h1 className="text-gray-400 text-sm md:text-xl">
            Role management
            <IoChevronForward className="inline-block items-center" />
          </h1>
          <h1 className="text-gray-400 text-sm md:text-xl">
            Role
            <IoChevronForward className="inline-block items-center" />
          </h1>
          <span className="text-green-500 text-sm md:text-xl">
            Add Role
          </span>
        </div>
      </div>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-20">
          <div className="relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
              Role name*
            </label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
              placeholder="Enter role name"
            />
          </div>
          <div className="relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">
              Description*
            </label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="relative my-8 p-5 rounded-lg border border-gray-300">
          <div className="absolute left-5 -top-2.5 text-sm text-gray-500 bg-white px-1">
            Permission*
          </div>
          <div className="grid grid-cols-1 gap-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="cursor-pointer h-[18px] w-[18px]"
              />
              <span className="ml-2 text-lg text-gray-700">Dashboard</span>
            </label>
            <div className="border border-gray-300" />

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="cursor-pointer h-[18px] w-[18px]"
              />
              <span className="ml-2 text-lg text-gray-700">
                Customer management
              </span>
            </label>
            <div className="flex items-center gap-8 bg-[#12a83241] border-2 border-gray-300 p-4 rounded-lg">
              {/* Sub Permissions for Customer management */}
              {[
                "Add",
                "Edit",
                "Delete",
                "Login",
                "Authorization",
                "Send mail",
                "Details",
                "Reset password",
              ].map((subPermission, index) => (
                <label
                  className="inline-flex items-center justify-center"
                  key={index}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer h-[16px] w-[16px]"
                  />
                  <span className="ml-2 text-lg text-gray-700">
                    {subPermission}
                  </span>
                </label>
              ))}
            </div>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="cursor-pointer h-[18px] w-[18px]"
              />
              <span className="ml-2 text-lg text-gray-700">
                Vouchers management
              </span>
            </label>
            <div className="flex flex-col items-start px-3">
              <div className="w-full">
                <label className="inline-flex items-center w-full">
                  <input
                    type="checkbox"
                    className="cursor-pointer h-[16px] w-[16px]"
                  />
                  <span className="ml-2 text-md text-gray-700">
                    Customer group
                  </span>
                </label>
                <div className="flex items-start gap-8 bg-[#12a83241] border-2 border-gray-300 p-4 rounded-lg w-full mt-2">
                  {["Add", "View", "Delete"].map((subSubPermission, index) => (
                    <label className="inline-flex items-center" key={index}>
                      <input
                        type="checkbox"
                        className="cursor-pointer h-[16px] w-[16px]"
                      />
                      <span className="ml-2 text-lg text-gray-700">
                        {subSubPermission}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="w-full mt-4">
                <label className="inline-flex items-center w-full">
                  <input
                    type="checkbox"
                    className="cursor-pointer h-[16px] w-[16px]"
                  />
                  <span className="ml-2 text-md text-gray-700">
                    Voucher list
                  </span>
                </label>
                <div className="flex items-start gap-8 bg-[#12a83241] border-2 border-gray-300 p-4 rounded-lg w-full mt-2">
                  {["Send mail", "Add", "Delete"].map(
                    (subSubPermission, index) => (
                      <label className="inline-flex items-center" key={index}>
                        <input
                          type="checkbox"
                          className="cursor-pointer h-[16px] w-[16px]"
                        />
                        <span className="ml-2 text-lg text-gray-700">
                          {subSubPermission}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
            {permissionGroups.map((group, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="cursor-pointer h-[18px] w-[18px]" />
                  <span className="ml-2 text-lg text-gray-700">{group.label}</span>
                </label>
                <div className="flex items-center gap-8 bg-[#12a83241] border-2 border-gray-300 p-4 rounded-lg">
                  {group.subPermissions.map((subPermission, subIndex) => (
                    <label className="inline-flex items-center justify-center" key={subIndex}>
                      <input
                        type="checkbox"
                        className="cursor-pointer h-[16px] w-[16px]"
                      />
                      <span className="ml-2 text-lg text-gray-700">{subPermission}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-7 my-10">
            <button
              type="submit"
              className="bg-green-500 text-white w-36 h-12 rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-500 text-white w-36 h-12 rounded-md hover:bg-opacity-95 transition"
            >
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
};

export default AddRole;
