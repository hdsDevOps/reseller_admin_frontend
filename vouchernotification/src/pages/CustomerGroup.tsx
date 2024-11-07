import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { ChevronRight } from 'lucide-react';
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css"

interface CustomerGroupData {
  groupName: string;
  numberOfCustomers: number;
  createdDate: string;
}

const CustomerGroup: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroupData | null>(
    null
  );
  const modalRef = useRef();

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

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
    <div className="flex items-center justify-center gap-3 my-1">
      <button className="text-black hover:text-red-600 text-md">
        <FaTrash role="img" aria-label="trash" />
      </button>
      <button
        className="btn-green-3 w-14 h-7"
        onClick={() => openModal(item)}
      >
        View
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text">Customer Groups</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              onClick={() => navigate('/add-customer-group')}
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
            className='page-indicator-arrow-3'
          />
          <p
            className='page-indicator-2'
          >Customer group</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-14 mb-[51px]">
        <div className="lg:col-start-2 grid sm:grid-cols-2 grid-cols-1 max-sm:w-[300px] max-sm:mx-auto">
          <div className="px-4">
            <input
              type="text"
              className="serach-input-2"
              name="groupName"
              placeholder="Group name"
            />
          </div>
          <div className="px-4 sm:mt-0 mt-1">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="createdDate"
              placeholder="Created date"
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
        data={sampleData}
        renderActions={renderActions}
      />

      {/* Modal for Group Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} modalRef={modalRef} title="Group Details">
        {selectedGroup && (
          <div className="flex justify-between border-b border-black leading-none">
            <p className="">Group Name:</p>
            <p className="">{selectedGroup.groupName}</p>
          </div>
        )}
        <div className="mt-px flex flex-col">
          <p className="mt-0">Country:</p>
          <p className="mt-0">Region:</p>
          <p className="mt-0">Subscription Plan:</p>
          <p className="mt-0">Expiry Date:</p>
          <p className="mt-0">License Usage:</p>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerGroup;
