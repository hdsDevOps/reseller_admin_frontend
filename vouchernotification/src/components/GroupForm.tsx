import React from 'react';
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { Link } from 'react-router-dom';

const GroupForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <Link to="/customer-group">
        <span className="flex items-center gap-2 text-3xl">
          <BiArrowBack className='inline-block items-center' />
          Add Customer Group
        </span>
      </Link>
      <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex mb-8">
          <div className="flex-1 mr-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Group Name</label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
              placeholder="Enter group name"
            />
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Country</label>
            <select className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500">
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>

        {/* Region and Subscription Plan Inputs */}
        <div className="flex mb-8">
          <div className="flex-1 mr-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Region</label>
            <select className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500">
              <option value="">Select Region</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Subscription Plan</label>
            <select className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500">
              <option value="">Select Plan</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="flex mb-8">
          <div className="flex-1 mr-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Expiry Date Range</label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
              placeholder='Select date range'
            />
            <MdOutlineCalendarToday className="absolute right-3 top-4 text-black" />
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">License Number</label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder=" "
            />
          </div>
        </div>

        <div className="flex mb-8">
          <div className="w-1/2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Number of Customers</label>
            <input
              type="number"
              className="border border-gray-300 w-full bg-transparent p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
              placeholder="Auto-filled"
            />
          </div>
        </div>

        <div className="flex justify-start mt-6 gap-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GroupForm;
