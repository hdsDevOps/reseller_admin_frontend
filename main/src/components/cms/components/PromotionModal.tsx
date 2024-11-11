import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
            className="w-full max-w-4xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-xl font-semibold text-gray-900 mb-5"
            >
              Promotion
            </DialogTitle>
            <div className="flex gap-x-4 w-full">
              <div className="w-1/2 space-y-3">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter here"
                  />
                </div>

                <div>
                  <label
                    htmlFor="template"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Template
                  </label>
                  <textarea
                    id="template"
                    rows={4}
                    className="h-[200px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="HTML/CSS script should be here to make the Promotion template"
                  />
                </div>
              </div>

              <div className="w-1/2 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start date
                  </label>
                  <div className="relative w-full">
                    <DatePicker
                    style={{width: '100%'}}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholderText="Select here"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholderText="Select here"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                type="button"
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Preview
              </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={() => {}}
              >
                Save
              </button>
              <button
                type="button"
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={onClose}
              >
                Cancel
              </button>
             
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PromotionModal;
