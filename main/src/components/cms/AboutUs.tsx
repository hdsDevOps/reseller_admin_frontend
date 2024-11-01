import React from "react";

const AboutUs: React.FC = () => {
  const blocks = [
    {
      contentTitle: "Make decisions faster, face to face.",
      contentDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/meeting-image.jpg",
    },
    {
      contentTitle: "Secure your data and devices.",
      contentDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/security-image.jpg",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-start mb-6">
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          EDIT
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-purple-600 font-medium">
          Everything you need to know About us
        </h3>
      </div>
      <div className="space-y-6">
        {blocks.map((block, index) => (
          <div key={index} className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              <img
                src={block.image}
                alt={block.contentTitle}
                className="w-full rounded-lg"
              />
            </div>
            <div className="col-span-3">
              <p className="font-medium mb-2">{block.contentTitle}</p>
              <p className="text-gray-600">{block.contentDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
