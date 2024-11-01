import React from 'react'

const ContactSection = () => {
    return (
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="flex items-center justify-start p-4 border-b">
          <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600">
            EDIT
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Page Description</span>
              <span className="px-2">:</span>
            </div>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              defaultValue="For any information not hesitate to reach us."
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Call Us</span>
              <span className="px-2">:</span>
            </div>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              defaultValue="+1 469-893-0678"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Email ID</span>
              <span className="px-2">:</span>
            </div>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Address</span>
              <span className="px-2">:</span>
            </div>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              defaultValue="Hordanso LLC 4364 Westerm Center Blvd PMB 2012 Fort Worth"
            />
          </div>
        </div>
      </div>
    );
  };
  

export default ContactSection