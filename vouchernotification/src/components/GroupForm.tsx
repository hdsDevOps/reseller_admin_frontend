import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const GroupForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Group Information</h2>

        {/* Group Name and Country Inputs */}
        <div className="flex mb-8">
          <div className="flex-1 mr-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Group Name</label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder=" "
            />
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Country</label>
            <select className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500">
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
            <select className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500">
              <option value="">Select Region</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Subscription Plan</label>
            <select className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500">
              <option value="">Select Plan</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Expiry Date and License Number Inputs */}
        <div className="flex mb-8">
          <div className="flex-1 mr-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Expiry Date</label>
            <input
              type="date"
              className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <FaCalendarAlt className="absolute right-3 top-2 text-gray-400" />
          </div>

          <div className="flex-1 ml-2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">License Number</label>
            <input
              type="text"
              className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder=" "
            />
          </div>
        </div>

        {/* Number of Customers Input */}
        <div className="flex mb-8">
          <div className="w-1/2 relative">
            <label className="absolute left-3 -top-2.5 text-sm text-gray-500 bg-white px-1">Number of Customers</label>
            <input
              type="number"
              className="border border-gray-300 w-full bg-transparent p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder=" "
            />
          </div>
        </div>

        {/* Buttons */}
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
  );
};

export default GroupForm;
