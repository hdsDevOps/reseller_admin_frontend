import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { ChevronRight, Pencil } from 'lucide-react';
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format } from "date-fns";
import { useAppDispatch } from "store/hooks";
import { getCustomerGroupListThunk, deleteCustomerGroupThunk, removeUserAuthTokenFromLSThunk, getUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerGroup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const modalRef = useRef();
  const [deleteModal, setDeleteModal] = useState(false);
  const [voucherGroup, setVoucherGroup] = useState({});
  // console.log(voucherGroup);
  

  const [sampleData, setSampleData] = useState([]);
  console.log(sampleData);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const dateFormat = (date) => {
    const newDate = new Date(date);
    return format(newDate, "dd MMM yyyy");
  };

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

  const getCustomerGroupListData = async() => {
    try {
      const result = await dispatch(
        getCustomerGroupListThunk()
      ).unwrap();
      setSampleData(result.data);
    } catch (error) {
      setSampleData([]);
      if(error?.message == "Request failed with status code 401"){
        try {
          const result2 = await dispatch(
            removeUserAuthTokenFromLSThunk()
          ).unwrap()
          navigate('/login');
        } catch (error) {
          console.log("Error on logging out")
        } finally {
          try {
            const getToken = await dispatch(
              getUserAuthTokenFromLSThunk()
            ).unwrap()
            navigate('/login')
          } catch (error) {
            console.log("Error on token")
          }
        }
      }
      else{
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCustomerGroupListData();
  }, []);

  const tableHeads = ['Group Name', 'Number of Customers', 'Created Date', 'Actions',];

  const openModal = (group) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };

  const deleteCustomerGroup = async(id:string) => {
    try {
      const result = await dispatch(
        deleteCustomerGroupThunk({record_id: id})
      ).unwrap()
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
      setDeleteModal(false);
      setVoucherGroup({});
    } catch (error) {
      toast.error("Error suspending customer")
    } finally {
      getCustomerGroupListData();
    }
  };

  function convertToDate(seconds:any, nanoseconds:any) {
    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;
    return new Date(milliseconds);
  };

  return (
    <div className="grid grid-cols-1">
      <ToastContainer />
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

      <div className="w-full overflow-x-auto pb-[20px]">
        <table className="min-w-[1100px] lg:min-w-full max-h-screen">
          <thead className="bg-custom-blue-6 h-[53px]">
            <tr>
              {
                tableHeads.map((head, index) => (
                  <th key={index} className="th-css-2">{head}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-white mt-3">
            {
              currentItems && currentItems?.map((item, index) => {
                return(
                  <tr key={index} className="text-center">
                    <td className="td-css-2">{item?.group_name}</td>
                    <td className="td-css-2">{item?.no_customer}</td>
                    <td className="td-css-2">
                      {/* {dateFormat(item?.start_date)} */}
                      {/* {item?.created_at?._seconds} */}
                      {`${convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds), 'dd MMM yyyy')}`}
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center gap-3 my-1">
                        <div className="flex flex-row gap-1">
                          <button className="text-black hover:text-orange-300" onClick={() => {navigate('/edit-customer-group', {state: item})}}>
                              <Pencil className=" w-5" />
                            </button>
                          <button className="text-black hover:text-red-600 text-md" onClick={() => {
                            setDeleteModal(true);
                            setVoucherGroup(item);
                          }}>
                            <FaTrash role="img" aria-label="trash" />
                          </button>
                        </div>
                        <button
                          className="btn-green-3 w-[80px] h-7"
                          onClick={() => {
                            openModal(item);
                            setVoucherGroup(item);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {
        deleteModal && (
          <Dialog
            open={deleteModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setDeleteModal(false);
              setVoucherGroup({});
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Delete Voucher</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setDeleteModal(false);
                          setVoucherGroup({});
                        }}
                      >+</button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8"
                  >
                    <p
                      className="font-warning-popup-message"
                    >Are you sure want to delete this voucher?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="btn-green-2 w-[79px]"
                      type="button"
                      onClick={() => {deleteCustomerGroup(voucherGroup?.record_id)}}
                    >Yes</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setDeleteModal(false);
                        setVoucherGroup({});
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }

      {/* Modal for Group Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} modalRef={modalRef} title="Group Details">
        {selectedGroup && (
          <div className="flex justify-between border-b border-black leading-none">
            <p className="">Group Name:</p>
            <p className="">{selectedGroup?.group_name}</p>
          </div>
        )}
        <div className="mt-px flex flex-col">
          <div className="mt-0 flex flex-row justify-between">
            <p>Country:</p>
            <p>{selectedGroup?.country}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Region:</p>
            <p>{selectedGroup?.region}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Subscription Plan:</p>
            <p>{selectedGroup?.plan}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Expiry Date:</p>
            <p>{convertToDate(selectedGroup?.created_at?._seconds, selectedGroup?.created_at?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(selectedGroup?.created_at?._seconds, selectedGroup?.created_at?._nanoseconds), 'dd MMM yyyy')}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>License Usage:</p>
            <p>{selectedGroup?.license_usage}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Number of Customers:</p>
            <p>{selectedGroup?.no_customer}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerGroup;
