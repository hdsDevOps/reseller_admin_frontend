import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../index.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface VoucherListData {
  voucherCode: string;
  currency: string;
  discount: string;
  startDate: string;
  endDate: string;
  image?: string; // Optional image property
}

const VoucherList: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [, setSelectedGroup] = useState<VoucherListData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const columns = [
    {
      header: "Voucher Code",
      accessor: "voucherCode" as keyof VoucherListData,
    },
    {
      header: "Currency",
      accessor: "currency" as keyof VoucherListData,
      renderCell: (item: VoucherListData) => (
        <div className="flex items-center gap-2">
          {item.image && (
            <img
              src="/imahes/usa.jpg"
              alt="Currency"
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span>{item.currency}</span>
        </div>
      ),
    },
    { header: "Discount", accessor: "discount" as keyof VoucherListData },
    { header: "Start Date", accessor: "startDate" as keyof VoucherListData },
    { header: "End Date", accessor: "endDate" as keyof VoucherListData },
  ];

  const sampleData: VoucherListData[] = [
    {
      voucherCode: "HORD21",
      currency: "INR",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/india-flag.jpg",
    },
    {
      voucherCode: "HORD22",
      currency: "USD",
      discount: "30%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/usa-flag.jpg",
    },
    {
      voucherCode: "HORD23",
      currency: "INR",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/india-flag.jpg",
    },
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
    },
  ];

  const openModal = (group: VoucherListData) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };

  const renderActions = (item: VoucherListData) => (
    <div className="flex items-center justify-center gap-3">
      <button className="text-black hover:text-red-600 text-md md:text-2xl">
        <FaTrash role="img" aria-label="trash" />
      </button>
      <button
        className="text-[#2e3f5d] text-xs hover:bg-[#9be9ac] hover:text-black py-2 px-4 md:py-2 md:px-5 rounded-md bg-[#CDE9D3]"
        onClick={() => openModal(item)}
      >
        Send mail
      </button>
    </div>
  );

  // Calculate displayed data based on current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  return (
    <div className="">
      <div className="flex flex-col mb-16 md:mb-20 gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-2xl">Voucher List</h1>
          <Link
            to="/add-voucher"
            className="text-white text-sm hover:bg-opacity-95 py-2 px-5 rounded-md bg-[#12A833] flex items-center justify-center"
          >
            <FiPlus className="inline-block items-center mr-2" />
            Add new
          </Link>
        </div>
        <div className="flex items-center gap-2 text-md md:text-lg">
          <h1 className="text-gray-400 text-sm md:text-xl">
            Voucher Management{" "}
            <IoChevronForward className="inline-block items-center" />
          </h1>
          <span className="text-green-500 cursor-pointer text-sm md:text-xl">
            Voucher list
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-16 mb-10">
        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center relative">
            <select className="border border-gray-300 max-w-xs w-full bg-transparent p-2 pr-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none">
              <option value="" disabled selected>
                Select Currency
              </option>
              <option value="INR">INR</option>
              <option value="USD">USA</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaCaretDown className="w-4 h-4 text-gray-500" />
            </span>
          </div>

          <input
            type="text"
            className="border border-gray-300 bg-[#F9F9F9] py-2 px-6 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer"
            placeholder="Voucher Code"
          />
          <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                className="border border-gray-300 bg-[#F9F9F9] py-2 px-6 text-[#6D6D6D] text-sm  focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                placeholderText="Start Date"
                dateFormat="MM/dd/yyyy"
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <IoCalendarClearOutline size={20} className="text-[#000000] absolute right-2 top-1/2 transform -translate-y-1/2 font-bold" />
            </div>

            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                className="border border-gray-300 bg-[#F9F9F9] py-2 px-6 text-[#6D6D6D] text-sm  focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black"
                placeholderText="End Date"
                dateFormat="MM/dd/yyyy"
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <IoCalendarClearOutline size={20} className="text-[#000000] absolute right-2 top-1/2 transform -translate-y-1/2 font-bold" />
            </div>


        </div>
      </div>

      <Table
        columns={columns}
        data={currentItems}
        renderActions={renderActions}
      />

      <div className="flex flex-col mt-4 absolute bottom-2 right-0">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className={`px-3 py-1 text-sm ${
              currentPage === 0
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-l transition`}
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 text-sm mx-1 rounded ${
                currentPage === index
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-black hover:bg-green-500 hover:text-white"
              } transition`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 text-sm ${
              currentPage === totalPages - 1
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-r transition`}
          >
            Next
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Send Mail">
        <div className="flex flex-col gap-2 text-xs font-normal">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="radio-5"
                className="radio radio-success radio-sm"
                defaultChecked
              />
              <h3 className="text-lg">Group</h3>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="radio-5"
                className="radio radio-success radio-sm"
                defaultChecked
              />
              <h3 className="text-lg">Individual Customer</h3>
            </div>
          </div>
          <div className="flex items-center relative my-5">
            <select className="border border-gray-300 w-full bg-gray-100 p-3 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none text-base">
              <option value="" disabled selected>
                Select Group
              </option>
              <option value="ABC">ABC Group</option>
              <option value="XYZ">XYZ Group</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaCaretDown className="w-4 h-4 text-gray-500" />
            </span>
          </div>
          <button
            type="button"
            className="p-3 rounded-md text-base bg-green-500 w-[30%] hover:bg-opacity-95 self-end text-white transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VoucherList;
