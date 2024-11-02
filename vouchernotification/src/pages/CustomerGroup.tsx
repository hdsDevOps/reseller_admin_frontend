import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../index.css";
import { MdOutlineCalendarToday } from "react-icons/md";

interface CustomerGroupData {
  groupName: string;
  numberOfCustomers: number;
  createdDate: string;
}

const CustomerGroup: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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
      groupName: "XYZ Group",
      numberOfCustomers: 15,
      createdDate: "25 Jan 2024",
    },
    {
      groupName: "LMN Group",
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
      <div className="flex items-center justify-end  gap-16 mb-10 mr-6">
        <div className="flex items-center justify-center gap-10">
          <input
            type="text"
            className="border border-gray-300 bg-[#F9F9F9] py-3 px-6 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer"
            placeholder="Group Name"
          />
          <div className="flex-1 mr-2 relative  bg-red-500">
            <input
              type="text"
              className="border border-gray-300 bg-[#F9F9F9] py-3 px-6 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-black cursor-pointer"
              placeholder="Created Date"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-4 text-black" />
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
