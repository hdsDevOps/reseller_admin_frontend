import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { ChevronRight } from "lucide-react";

interface VoucherListData {
  voucherCode: string;
  currency: string;
  discount: string;
  startDate: string;
  endDate: string;
  image?: string; // Optional image property
}

const VoucherList: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setSelectedGroup] = useState<VoucherListData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const modalRef = useRef();

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
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
    },
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
    },
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
    },
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
    },
    {
      voucherCode: "HORD24",
      currency: "GBP",
      discount: "50%",
      startDate: "10 Jan 2024",
      endDate: "10 Feb 2024",
      image: "/images/uk-flag.jpg",
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
    <div className="flex items-center justify-center gap-3 my-1">
      <button className="text-black hover:text-red-600 text-md">
        <FaTrash role="img" aria-label="trash" />
      </button>
      <button
        className="btn-green-3 w-[80px] h-7"
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
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text">Voucher List</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              onClick={() => navigate('/add-voucher')}
              className="btn-green w-[139px] items-center"
            >
              <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
              Add new
            </button>
          </div>
        </div>
        <div
          className='flex flex-row mt-5 h-[22px]'
        >
          <p
            className='page-indicator-1'
          >Voucher Management</p>
          <ChevronRight
            className='page-indicator-arrow-4'
          />
          <p
            className='page-indicator-2'
          >Voucher list</p>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-14 sm:mb-[51px] mb-[31px]">
        <div className="lg:col-start-2 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 main-sm:w-[300px] max-sm:mx-auto">
          <div className="px-4 mb-5 sm:mb-0">
            <select className="select-input">
              <option selected hidden value=''>Select Currency</option>
              <option>INR</option>
              <option>USD</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2"
              name="groupName"
              placeholder="Group name"
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="startDate"
              placeholder="Start Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="endDate"
              placeholder="End Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={currentItems}
        renderActions={renderActions}
      />

      <div className="flex flex-col mt-12 relative bottom-2 right-0">
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

      <Modal isOpen={isModalOpen} onClose={closeModal} modalRef={modalRef} title="Send Mail">
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
