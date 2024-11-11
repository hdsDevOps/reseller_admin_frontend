import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { ChevronDown, Plus } from "lucide-react";


interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BannerModal = ({ isOpen, onClose }: BannerModalProps) => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    videoUrl: "",
    buttonName: "",
    buttonUrl: "",
    showVideo: false,
    showPromotion: false,
    prices: {
      INR: "250.61",
      USD: "3.45",
      GBP: "2.74",
      EUR: "3.00",
      JPY: "386.58",
      AUD: "4.45",
      CAD: "4.10",
    },
  });

  interface FormData {
    heading: string;
    description: string;
    videoUrl: string;
    buttonName: string;
    buttonUrl: string;
    showVideo: boolean;
    showPromotion: boolean;
    prices: {
      INR: string;
      USD: string;
      GBP: string;
      EUR: string;
      JPY: string;
      AUD: string;
      CAD: string;
    };
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (
    currency: keyof FormData["prices"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [currency]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mt-5">
        <div className="p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-6">Banner</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-x-6">
              <div className="space-y-4 mb-6 w-1/2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="heading"
                    placeholder="Enter the banner heading here"
                    value={formData.heading}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Video
                  </label>
                  <Switch
                    checked={formData.showVideo}
                    onChange={(checked) =>
                      setFormData((prev) => ({ ...prev, showVideo: checked }))
                    }
                    className={`${
                      formData.showVideo ? "bg-[#12A833]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable video</span>
                    <span
                      className={`${
                        formData.showVideo ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="Enter the video URL"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Starting at
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formData.prices.INR}
                      onChange={(e) => handlePriceChange("INR", e.target.value)}
                      className="w-44 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      INR <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#12A833] text-white rounded-md text-sm font-medium"
                    >
                      ADD
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(formData.prices).map(([currency, price]) => (
                    <span
                      key={currency}
                      className="px-3 py-1 bg-gray-200 rounded-full text-[0.67rem]"
                    >
                      {currency} {price}
                    </span>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Title
                  </label>
                  <input
                    type="text"
                    name="buttonName"
                    placeholder="Enter the button name here"
                    value={formData.buttonName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button URL
                  </label>
                  <input
                    type="text"
                    name="buttonUrl"
                    placeholder="Enter the button URL"
                    value={formData.buttonUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="TinyMCE editor will be used"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 h-[400px]"
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload background image
                    </label>
                    <button>
                      <div className="w-[89px] h-[45px] flex flex-col items-center justify-center border rounded-md ">
                        <span className="text-gray-400"><Plus/></span>
                        <span className="text-gray-400 text-[0.67rem]">Add photo</span>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-x-2">
                    <label className="text-sm font-medium text-gray-700">
                      Show Promotion
                    </label>
                    <Switch
                      checked={formData.showPromotion}
                      onChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          showPromotion: checked,
                        }))
                      }
                      className={`${
                        formData.showPromotion ? "bg-[#12A833]" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Show promotion</span>
                      <span
                        className={`${
                          formData.showPromotion
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#12A833] text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#E02424] text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerModal;
