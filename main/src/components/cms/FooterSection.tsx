import React from "react";

const FooterSection = () => {
  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="flex items-center justify-start p-4 border-b">
        <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600">
          EDIT
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center py-2">
            <span className="w-24 text-gray-600">Heading</span>
            <span className="px-2">:</span>
            <span>Marketing</span>
          </div>
          <div className="pl-6 space-y-2">
            {[
              "Video",
              "SEO",
              "SMO",
              "Mobile",
              "Campaign",
              "Terms & Conditions",
            ].map((item, index) => (
              <div key={index} className="flex items-center py-1">
                <span className="w-32 text-gray-600">{item}</span>
                <span className="px-2">:</span>
                <a
                  href="https://simplify.jobs/"
                  className="text-blue-500 hover:underline"
                >
                  https://simplify.jobs/
                </a>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center py-2">
            <span className="w-24 text-gray-600">Heading</span>
            <span className="px-2">:</span>
            <span>Websites</span>
          </div>
          <div className="pl-6 space-y-2">
            {[
              "Domain Name",
              "Design",
              "Hosting",
              "WordPress",
              "Develop",
              "Privacy & Policy",
            ].map((item, index) => (
              <div key={index} className="flex items-center py-1">
                <span className="w-32 text-gray-600">{item}</span>
                <span className="px-2">:</span>
                <a
                  href="https://simplify.jobs/"
                  className="text-blue-500 hover:underline"
                >
                  https://simplify.jobs/
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
