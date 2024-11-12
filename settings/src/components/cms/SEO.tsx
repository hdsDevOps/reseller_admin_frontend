import React, { useState } from "react";
import SEOEditModal from "./components/SEOEditModal";

interface SEOData {
  contentTitle: string;
  contentDescription: string;
  altImageText: string;
  image: string;
  keywords: string;
  urlLink: string;
}

const SEO = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>({
    contentTitle: "Landing Page",
    contentDescription: "",
    altImageText: "",
    image: "/flower-image.jpg",
    keywords: "",
    urlLink: "",
  });

  const handleSave = (updatedData: SEOData) => {
    setSeoData(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-start p-4">
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-1 text-white bg-[#12A833] rounded hover:bg-green-600">
          Edit
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">Content Title</p>
          <p className="text-gray-600">:</p>
          <p>{seoData.contentTitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">
            Content Description
          </p>
          <p className="text-gray-600">:</p>
          <p>Enter the description meta tags with comma separator</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">Alt Image Text</p>
          <p className="text-gray-600">:</p>
          <p>Enter the keywords here with comma separator</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">Image</p>
          <p className="text-gray-600">:</p>
          <img
            src="/api/placeholder/100/100"
            alt="Preview"
            className="w-24 h-24 border rounded object-cover"
          />
        </div>
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">Keywords</p>
          <p className="text-gray-600">:</p>
          <p>Enter the keywords here with comma separator</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="block text-gray-600 w-44">URL Link</p>
          <p className="text-gray-600">:</p>
          <p>Enter the URL Link</p>
        </div>
      </div>
      <SEOEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seoData={seoData}
        onSave={handleSave}
      />
    </div>
  );
};

export default SEO;
