import React from 'react';

const Resources: React.FC = () => {
  const resources = [
    { title: 'Connect', description: 'Lorem ipsum dolor sit amet consectetur.' },
    { title: 'Create', description: 'Lorem ipsum dolor sit amet consectetur.' },
    { title: 'Access', description: 'Lorem ipsum dolor sit amet consectetur.' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-start mb-6">
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          EDIT
        </button>
      </div>
      <div className="space-y-6">
        {resources.map((resource) => (
          <div key={resource.title} className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Content Title:</p>
                <p className="font-medium">{resource.title}</p>
              </div>
              <div>
                <p className="text-gray-600">Content Description:</p>
                <p>{resource.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;