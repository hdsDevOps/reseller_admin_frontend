import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Flag from 'react-world-flags'; // Flag component
import { vocuherListThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { format } from "date-fns";

const VoucherList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const modalRef = useRef();
  const flagRef = useRef(null);

  const columns = [
    {
      header: "Voucher Code",
      accessor: "voucher_code",
    },
    {
      header: "Currency",
      accessor: "currency",
      renderCell: (item) => (
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
    { header: "Discount", accessor: "discount_rate" },
    { header: "Start Date", accessor: "start_date" },
    { header: "End Date", accessor: "end_date" },
  ];

  const [sampleData,setSampleData] = useState([]);
  
  const getVoucherList = async() => {
    try {
      const result = await dispatch(
        vocuherListThunk()
      ).unwrap();
      console.log(result.data);
      setSampleData(result.data);
    } catch (error) {
      setSampleData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    getVoucherList();
  },[])

  const openModal = (group) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };

  const renderActions = (item) => (
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
  
  const [isOpen, setIsOpen] = useState(false);

  const currencyOptions = [
    { code: "US", label: "United States", value: '$' },
    { code: "EU", label: "Europe", value: '€' },
    { code: "AU", label: "Australia", value: 'A$' },
    { code: "NG", label: "Nigeria", value: 'N₦' },
    { code: "GB", label: "United Kingdom", value: '£' },
    { code: "CA", label: "Canada", value: 'C$' },
    { code: "IN", label: "India", value: '₹' },
  ];

  const countryCodes = currencyOptions.map((item) => item?.value);
  
  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
  } | { code: "US", label: "United States", value: '$' }>({ code: "US", label: "United States", value: '$' });

  const handleOptionClick = (option: { code: string; flag: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (flagRef.current && !flagRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
        <div className="lg:col-start-2 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 min-sm:w-[300px] max-sm:mx-auto">
          <div
            className='flex flex-col relative px-4 mb-5 sm:mb-0'
          >
            <div
              className="serach-input-2 flex flex-row"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative w-[40px] h-full flex mx-auto items-center justify-between border-0 cursor-pointer">
                <Flag code={selectedOption?.code} style={{width: '30px', margin: 'auto'}} />
              </div>
              <p
                className="w-full ml-2"
              >{selectedOption?.label} - {selectedOption?.value}</p>
              {
                isOpen ? <ChevronUp style={{fontSize: '20px'}} /> : <ChevronDown style={{fontSize: '20px'}} />
              }
              {/* Dropdown Options */}
              {isOpen && (
                <div className="absolute mt-[32px] z-10 w-[88%] max-[1250px]:w-[82%] max-lg:w-[88%] -ml-2 bg-white border border-gray-300 rounded-md shadow-lg" ref={flagRef}>
                  {currencyOptions.map((option) => (
                    <div
                      key={option.code}
                      className="flex items-center py-2 px-[5px] hover:bg-gray-100 cursor-pointer border-b-[1px]"
                      onClick={() => handleOptionClick(option)}
                    >
                      <Flag code={option?.code} style={{width: '30px'}} />
                      <p className="ml-2">{option?.label} - {option?.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
