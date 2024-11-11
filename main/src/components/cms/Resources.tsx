import React from "react";
import ResourcesModal from "./components/ResourcesModal";

const Resources: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(true);
  const resources = [
    {
      title: "Connect",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    { title: "Create", description: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Access", description: "Lorem ipsum dolor sit amet consectetur." },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-start mb-6">
        <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 text-white bg-green-500 rounded-md">
          EDIT
        </button>
      </div>
      <div className="space-y-6">
        {resources.map((resource) => (
          <div key={resource.title} className="p-4 bg-gray-50 rounded-lg">
            <div className="">
              <div className="flex space-x-5">
                <p className="text-gray-600 w-40">Content Title:</p>
                <p className="text-gray-600">:</p>
                <p className="font-medium">{resource.title}</p>
              </div>
              <div className="flex space-x-5">
                <p className="text-gray-600 text-nowrap w-40">Content Description:</p>
                <p className="text-gray-600">:</p>
                <p>{resource.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ResourcesModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Resources;
