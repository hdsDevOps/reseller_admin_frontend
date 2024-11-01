import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";


interface CustomerGroupData {
  groupName: string;
  numberOfCustomers: number;
  createdDate: string;
}

const CustomerGroup: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroupData | null>(null);

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
    { groupName: "ABC Group", numberOfCustomers: 10, createdDate: "23 Jan 2024" },
    { groupName: "XYZ Group", numberOfCustomers: 15, createdDate: "25 Jan 2024" },
    { groupName: "LMN Group", numberOfCustomers: 20, createdDate: "30 Jan 2024" },
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
      <button className="text-black hover:text-red-600 text-2xl">
        <FaTrash role="img" aria-label="trash" />
      </button>
      <button
        className="text-[#2e3f5d] text-sm hover:bg-[#9be9ac] hover:text-black py-2 px-5 rounded-md bg-[#CDE9D3]"
        onClick={() => openModal(item)}
      >
        View
      </button>
    </div>
  );

  return (
    <div className="">
      <div className="flex flex-col mb-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl mb-4">Customer Groups</h1>
          <Link to="/add-group" className="text-white text-sm hover:bg-opacity-95 py-2 px-5 rounded-md bg-[#12A833] flex items-center justify-center">
            <FiPlus className="inline-block items-center mr-2" />
            Add new
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg text-gray-400">Voucher Management <IoChevronForward className="inline-block items-center text-lg" /></h1>
          <Link to="/customer-group">
            <span className="text-green-500 cursor-pointer text-lg">Customer group</span>
          </Link>
        </div>
      </div>

      <Table
        columns={columns}
        data={sampleData}
        renderActions={renderActions}
      />

      {/* Modal for Group Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Group Details"
      >
        {selectedGroup && (
            <div className="flex justify-between items-center border-b border-black text-sm">
              <p className="">Group Name:</p>
              <p className="">{selectedGroup.groupName}</p>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm">Country:</p>
          <p className="text-sm">Region:</p>
          <p className="text-sm">Subscription Plan:</p>
          <p className="text-sm">Expiry Date:</p>
          <p className="text-sm">License Usage:</p>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerGroup;
