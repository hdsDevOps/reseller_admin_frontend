import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface AboutUsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutUsEditModal = ({ isOpen, onClose }: AboutUsEditModalProps) => {
  const [pageHeading, setPageHeading] = useState("");
  const [blocks, setBlocks] = useState([
    {
      contentTitle: "",
      contentDescription: "",
      image: null,
    },
    {
      contentTitle: "",
      contentDescription: "",
      image: null,
    },
  ]);

  const handleImageUpload = (index, type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (type === "banner") {
            // Handle banner image
          } else {
            const newBlocks = [...blocks];
            newBlocks[index] = { ...newBlocks[index], image: reader.result };
            setBlocks(newBlocks);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-4xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 mt-20"
          >
            <div className="flex justify-between items-center mb-4">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-gray-900"
              >
                Edit about us
              </DialogTitle>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-5 w-full">
                <div className="w-2/3">
                  <label className="block text-sm text-gray-600 mb-2">
                    Page Heading
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter the page heading here"
                    value={pageHeading}
                    onChange={(e) => setPageHeading(e.target.value)}
                  />
                </div>

                <div className="flex justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 w-1/3">
                  <button
                    onClick={() => handleImageUpload(0, "banner")}
                    className="text-gray-500 flex flex-col items-center text-sm"
                  >
                    <svg
                      className="w-8 h-8 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add banner image</span>
                  </button>
                </div>
              </div>

              {blocks.map((block, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium mb-4">Block {index + 1}</h4>

                  <div className="flex space-x-4 w-full">
                    <div className="w-1/2 ">
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-2">
                          Content title
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter the content title"
                          value={block.contentTitle}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[index] = {
                              ...block,
                              contentTitle: e.target.value,
                            };
                            setBlocks(newBlocks);
                          }}
                        />
                      </div>

                      <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                        <button
                          onClick={() => handleImageUpload(index, "content")}
                          className="text-gray-500 flex flex-col items-center"
                        >
                          <svg
                            className="w-11 h-11 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <span className="text-[0.67rem]">Add content image</span>
                        </button>
                      </div>
                    </div>
                   
                    <div className="col-span-2 w-1/2">
                      <label className="block text-sm text-gray-600 mb-2">
                        {index === 0 ? "Content Description" : "Content"}
                      </label>
                      <div className="border border-gray-300 rounded-md">
                        <Editor
                          init={{
                            height: 200,
                            menubar: false,
                            plugins: ["lists", "link", "image", "paste"],
                            toolbar:
                              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                          }}
                          value={block.contentDescription}
                          onEditorChange={(content) => {
                            const newBlocks = [...blocks];
                            newBlocks[index] = {
                              ...block,
                              contentDescription: content,
                            };
                            setBlocks(newBlocks);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AboutUsEditModal;
