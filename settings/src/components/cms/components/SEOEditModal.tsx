import React, { useState } from "react";
import { Plus } from "lucide-react";
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const SEOEditModal = ({ isOpen, onClose, seoData, onSave }) => {
  const [title, setTitle] = useState(seoData.contentTitle);
  const [description, setDescription] = useState(seoData.contentDescription);
  const [altText, setAltText] = useState(seoData.altImageText);
  const [keywords, setKeywords] = useState(seoData.keywords);
  const [urlLink, setUrlLink] = useState(seoData.urlLink);

  const handleSave = () => {
    onSave({
      contentTitle: title,
      contentDescription: description,
      altImageText: altText,
      keywords: keywords,
      urlLink: urlLink,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit SEO</h2>
        </div>

        <div className="space-y-6">
          <div className="flex w-full space-x-4">
            <div className="flex-1 relative">
              <label
                htmlFor="title"
                className="text-gray-600 absolute bg-white px-2 -top-2 left-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>
            <div className="relative w-1/2">
              <label
                htmlFor="description"
                className="text-gray-600 absolute bg-white px-2 -top-2 left-2"
              >
                Description
              </label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description meta tags with comma separator"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>
          </div>

          <div className="w-full flex space-x-4">
            <div className="relative w-1/2">
              <label
                htmlFor="alt-text"
                className="text-gray-600 absolute bg-white px-2 -top-2 left-2"
              >
                Alt Image Text
              </label>
              <input
                id="alt-text"
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter the keywords here with comma separator"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>

            <div className="relative w-1/2">
              <label
                htmlFor="keywords"
                className="text-gray-600 absolute bg-white px-2 -top-2 left-2"
              >
                Keywords
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter the keywords here with comma separator"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>
          </div>
          <div className="space-x-4 w-full flex">
            <div className="w-1/2">
              <div className="flex flex-col justify-center items-center p-3 border h-[200px] rounded-md">
                <span>
                  <Plus size={30} />
                </span>
                <p className="text-gray-600">Add image</p>
              </div>
            </div>

            <div className="relative w-1/2 flex flex-col ">
              <label
                htmlFor="url-link"
                className="text-gray-600 absolute bg-white px-2 -top-2 left-2"
              >
                URL Link
              </label>
              <input
                id="url-link"
                type="text"
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                placeholder="Enter the URL link"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button
            className="px-4 py-2 bg-[#12A833] text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#12A833]"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#E02424] text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#E02424]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SEOEditModal;
