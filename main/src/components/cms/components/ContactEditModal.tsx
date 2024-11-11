import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    pageDescription?: string;
    callUs?: string;
    email?: string;
    address?: string;
  };
}

const ContactEditModal: React.FC<ContactEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    pageDescription: initialData?.pageDescription || "",
    callUs: initialData?.callUs || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
  });

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    onClose();
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
            className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-between items-center mb-6">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900"
              >
                Edit contact us
              </DialogTitle>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Page description
                </label>
                <input
                  type="text"
                  name="pageDescription"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the text here"
                  value={formData.pageDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Call us
                </label>
                <input
                  type="text"
                  name="callUs"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the contact number here"
                  value={formData.callUs}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the email id here"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the address here"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
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

export default ContactEditModal;
