import React, { ReactNode, useState } from "react";
import { Plus } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const FooterEditModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Footer</h2>
        </div>

        <div className="space-y-6">
          {/* Marketing Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Marketing</div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Name
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Link
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md border">
                  <Plus />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Name
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Link
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md border">
                  <Plus />
                </button>
              </div>
            </div>
          </div>

          {/* Website Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Website</div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Name
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Link
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md border">
                  <Plus />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Name
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                    Link
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                  />
                </div>
                <button className="h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md border">
                  <Plus />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Contact Us</div>
            <div className="relative">
              <div className="text-sm text-gray-500 mb-5 absolute bg-white px-2 -top-2 left-2">
                Content
              </div>
              <div className="border border-gray-300 rounded-md">
                <Editor
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: ["lists", "link", "image", "paste"],
                    toolbar:
                      "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                  }}
                  value={blocks}
                  onEditorChange={(content) => {
                    setBlocks(content);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Our News Letter Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Our News Letter</div>
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Content Description
              </div>
              <input
                type="text"
                defaultValue="For mobile apps, marketing & website , automation & extreme software engineering. We tackle the difficult ..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
              />
            </div>
          </div>

          {/* Social Link Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Social Link</div>

            <div className="space-y-5">
              {["Twitter", "Facebook", "Pinterest", "Instagram", "Youtube"].map(
                (social) => (
                  <div className="relative" key={social}>
                    <div className="text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">{social}</div>
                    <input
                      type="text"
                      placeholder="Enter the link"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A833]"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-start mt-6">
          <button className="px-4 py-2 bg-[#12A833] text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#12A833]">
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#E02424] text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#12A833]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FooterEditModal;
