import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClearOutline, IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

interface CustomerGroupData {
  groupName: string;
  numberOfCustomers: number;
  createdDate: string;
}

const CustomerGroup: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroupData | null>(
    null
  );

  const columns = [
    { header: "Group Name", accessor: "groupName" as keyof CustomerGroupData },
    {
      header: "Number of Customers",
      accessor: "numberOfCustomers" as keyof CustomerGroupData,
    },
    {
      header: "Created Date",
      accessor: "createdDate" as keyof CustomerGroupData,
    },
  ];

  const sampleData: CustomerGroupData[] = [
    {
      groupName: "ABC Group",
      numberOfCustomers: 10,
      createdDate: "23 Jan 2024",
    },
    {
      groupName: "ABC Group",
      numberOfCustomers: 15,
      createdDate: "25 Jan 2024",
    },
    {
      groupName: "ABC Group",
      numberOfCustomers: 20,
      createdDate: "30 Jan 2024",
    },
  ];

  const openModal = (group: CustomerGroupData) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };

  const renderActions = (item: CustomerGroupData) => (
    <div className="flex items-center justify-center gap-3">
      <button className="text-black hover:text-red-600 text-md md:text-2xl">
        <FaTrash role="img" aria-label="trash" />
      </button>
      <button
        className="text-[#2e3f5d] text-sm hover:bg-[#9be9ac] hover:text-black py-2 px-4 md:py-2 md:px-5 rounded-md bg-[#CDE9D3]"
        onClick={() => openModal(item)}
      >
        View
      </button>
    </div>
  );

  return (
    <div className="">
      <div className="flex flex-col mb-16 md:mb-20 gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-2xl">Customer Groups</h1>
          <Link
            to="/add-group"
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
            Customer group
          </span>
        </div>
      </div>
      <div className="flex items-center md:justify-end  gap-16 mb-10 mr-6">
        <div className="flex items-center justify-center gap-3 md:gap-10 lg:gap-28 mr-2 lg:mr-28">
          <input
            type="text"
            className="bg-[#F9F9F9] p-2 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer md:w-64"
            placeholder="Group Name"
          />
          <div className="relative mr-20">
              <DatePicker
                selected={createdDate}
                onChange={(date: Date | null) => setCreatedDate(date)}
                className="placeholder:text-black border border-[#E4E4E4] bg-[#F9F9F9] text-[#000000] text-base p-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholderText="Created date"
                dateFormat="MM/dd/yyyy"
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <IoCalendarClearOutline size={20} className="text-[#000000] absolute right-3 top-1/2 transform -translate-y-1/2 font-bold" />
            </div>
        </div>
      </div>
      <Table
        columns={columns}
        data={sampleData}
        renderActions={renderActions}
      />

      {/* Modal for Group Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Group Details">
        {selectedGroup && (
          <div className="flex justify-between items-center border-b border-black text-xs font-normal">
            <p className="">Group Name:</p>
            <p className="">{selectedGroup.groupName}</p>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-xs font-normal">Country:</p>
          <p className="text-xs font-normal">Region:</p>
          <p className="text-xs font-normal">Subscription Plan:</p>
          <p className="text-xs font-normal">Expiry Date:</p>
          <p className="text-xs font-normal">License Usage:</p>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerGroup;
