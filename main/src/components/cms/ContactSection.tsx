import React from "react";

const ContactSection = () => {
  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="flex items-center justify-start p-4 border-b">
        <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600">
          EDIT
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="w-32 text-gray-600">Page Description</span>
          <span className="px-2">:</span>
          <p>For any information not hesitate to reach us.</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="w-32 text-gray-600">Call Us</span>
          <span className="px-2">:</span>
          <p>+1 469-893-0678</p>
        </div>


        <div className="flex items-center space-x-3">
            <span className="w-32 text-gray-600">Email ID</span>
            <span className="px-2">:</span>
            <p>contact@hordanso.com</p>
          </div>
         

        <div className="flex items-center space-x-3">
            <span className="w-32 text-gray-600">Address</span>
            <span className="px-2">:</span>
            <p>Hordanso LLC 4364 Western Center Blvd PMB 2012 Fort Worth</p>
          </div>
          
      </div>
    </div>
  );
};

export default ContactSection;