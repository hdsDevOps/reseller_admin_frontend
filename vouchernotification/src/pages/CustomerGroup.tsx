import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { ArrowRightLeft, ChevronRight, FilterX, Pencil } from 'lucide-react';
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCustomerGroupListThunk, deleteCustomerGroupThunk, removeUserAuthTokenFromLSThunk, getPlansAndPricesThunk } from 'store/user.thunk';
import { setCustomerGroupFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";

const initialFilters = {
  group_name: "",
  create_date: "",
  sortdata: {
    sort_text: "",
    //no_customer
    order: "asc"
  }
};

const CustomerGroup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {customerGroupFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const modalRef = useRef();
  const [deleteModal, setDeleteModal] = useState(false);
  const [voucherGroup, setVoucherGroup] = useState({});
  // console.log(voucherGroup);
  const [filters, setFilters] = useState(customerGroupFilters === null ? initialFilters : customerGroupFilters);
  console.log(filters);
  const [plansList, setPlansList] = useState([]);
  console.log(plansList);

  useEffect(() => {
    const setCustomerGroupFiltersSlice = async() => {
      await dispatch(setCustomerGroupFiltersStatus(filters)).unwrap();
    }

    setCustomerGroupFiltersSlice();
  }, [filters]);

  const [sampleData, setSampleData] = useState([]);
  // console.log(sampleData);
  
  const [currentPage, setCurrentPage] = useState(customerGroupFilters === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(customerGroupFilters === null ? 20 : itemsPerPageNumber);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  // console.log({currentPage, totalPages});

  useEffect(() => {
    if(sampleData?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, sampleData]);

  useEffect(() => {
    const setCurrentPageNumberSlice = async() => {
      await dispatch(setCurrentPageStatus(currentPage)).unwrap();
    }

    setCurrentPageNumberSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageSlice = async() => {
      await dispatch(setItemsPerPageStatus(itemsPerPage)).unwrap();
    }

    setItemsPerPageSlice();
  }, [itemsPerPage]);

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const formatted = format(newDate, "dd MMM yyyy");
    if(formatted === "Invalid Date"){
      return "Invalid Date";
    }
    else{
      return `${formatted}`;
    }
    // console.log({date, newDate})
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
        getCustomerGroupListThunk(filters)
      ).unwrap();
      setSampleData(result.data);
    } catch (error) {
      setSampleData([]);
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getCustomerGroupListData();
  }, [filters]);

  const tableHeads = [
    {name: "group_name", label: "Group Name",},
    {name: "no_customer", label: "Number of Customers",},
    {name: "create_date", label: "Created Date",},
    {name: "action", label: "Actions",},
  ];

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
      toast.error(error?.message || "Error suspending customer")
    } finally {
      getCustomerGroupListData();
    }
  };

  function convertToDate(seconds:any, nanoseconds:any) {
    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;
    return new Date(milliseconds);
  };

  const updateFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getPlansAndPricesList = async() => {
      try {
        const result = await dispatch(getPlansAndPricesThunk({last_order: ""})).unwrap();
        setPlansList(result?.data);
      } catch (error) {
        setPlansList([]);
      }
    };

    getPlansAndPricesList();
  }, []);

  const getPlanName = (id:string) => {
    if(plansList?.length > 0) {
      const foundPlan = plansList?.find(item => item?.id === id);
      if(foundPlan) {
        return foundPlan?.plan_name;
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  }

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text-resp">Customer Groups</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              onClick={() => navigate('/add-customer-group')}
              className="btn-green w-[139px] items-center"
              disabled={!rolePermissionsSlice?.voucher_management?.customer_group?.add ? true : false}
              cypress-name="add-new-customer-group-btn"
            >
              <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
              Add new
            </button>
          </div>
        </div>
        <div
          className='flex flex-row mt-5 h-[22px] items-center justify-start'
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
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-14 mb-3">
        <div className="lg:col-start-2 grid sm:grid-cols-2 grid-cols-1 max-sm:w-[300px] max-sm:mx-auto">
          <div className="px-4">
            <input
              type="text"
              className="serach-input-2"
              name="group_name"
              placeholder="Group name"
              onChange={updateFilters}
              value={filters?.group_name}
            />
          </div>
          <div className="px-4 sm:mt-0 mt-1 flex gap-1">
            <input
              type="text"
              className="serach-input-2 placeholder-cGray"
              name="create_date"
              placeholder="Created date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
              onChange={updateFilters}
              value={filters?.create_date}
            />
            <button
              className="ml-1"
              onClick={() => {
                setFilters(initialFilters);
              }}
              button-name="clear-customer-group-filter"
            >
              <FilterX
                className="text-[20px] text-custom-green"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <div className="flex items-center justify-start gap-1">
          <select
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value));
            }}
            value={itemsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20} selected>20</option>
            <option value={50}>50</option>
          </select>
          <label>items</label>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-[20px]">
        <table className="min-w-[1100px] lg:min-w-full max-h-screen">
          <thead className="bg-custom-blue-6 h-[53px]">
            <tr>
              {
                tableHeads.map((head, index) => (
                  <th key={index} className="th-css-2">
                    <span>{head.label}</span>
                    {
                      head?.name === "no_customer"
                      ? <span className="ml-1"><button type="button" onClick={() => {
                        setFilters({
                          ...filters,
                          sortdata: {
                            sort_text: head.name,
                            order: filters?.sortdata?.sort_text === head.name
                            ? filters?.sortdata?.order === "desc"
                              ? "asc"
                              : "desc"
                            : "asc"
                          }
                        })
                      }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span> : ""
                    }
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-white mt-3">
            {
              currentItems?.length>0 ? currentItems?.map((item, index) => {
                return(
                  <tr key={index} className="text-center">
                    <td className="td-css-2">{item?.group_name}</td>
                    <td className="td-css-2">{item?.no_customer}</td>
                    <td className="td-css-2">
                      {/* {dateFormat(item?.start_date)} */}
                      {/* {item?.created_at?._seconds} */}
                      {/* {`${convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds), 'dd MMM yyyy')}`} */}
                      {item?.create_date ? dateFormat(item?.create_date) : "N/A"}
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center gap-3 my-1">
                        <div className="flex flex-row gap-1">
                          <button className="text-black hover:text-orange-300"
                            onClick={() => {navigate('/edit-customer-group', {state: item})}}
                            disabled={!rolePermissionsSlice?.voucher_management?.customer_group?.add ? true : false}
                          >
                              <Pencil className=" w-5" />
                            </button>
                          <button
                            className="text-black hover:text-red-600 text-md"
                            onClick={() => {
                              setDeleteModal(true);
                              setVoucherGroup(item);
                            }}
                            disabled={!rolePermissionsSlice?.voucher_management?.customer_group?.delete ? true : false}
                          >
                            <FaTrash role="img" aria-label="trash" />
                          </button>
                        </div>
                        <button
                          className="customer-group-view-btn"
                          onClick={() => {
                            openModal(item);
                            setVoucherGroup(item);
                          }}
                          disabled={!rolePermissionsSlice?.voucher_management?.customer_group?.view ? true : false}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }) :
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
          </tbody>
        </table>

        <div className="flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                }}
                disabled={currentPage === totalPages - 1}
                className={`px-3 py-1 text-sm ${
                  currentPage === totalPages - 1
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-r transition`}
              >
                Next
              </button>
            )}
            onPageChange={(event) => {
              setCurrentPage(event.selected);
              // console.log(event.selected);
            }}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 0));
                }}
                disabled={currentPage === 0}
                className={`px-3 py-1 text-sm ${
                  currentPage === 0
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-l transition`}
              >
                Prev
              </button>
            )}

            containerClassName="flex justify-start"

            renderOnZeroPageCount={null}
            className="pagination-class-name"

            pageClassName="pagination-li"
            pageLinkClassName="pagination-li-a"

            breakClassName="pagination-ellipsis"
            breakLinkClassName="pagination-ellipsis-a"

            activeClassName="pagination-active-li"
            activeLinkClassName	="pagination-active-a"
          />
        </div>
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
            <p>{selectedGroup?.country || "N/A"}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Region:</p>
            <p>{selectedGroup?.region || "N/A"}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Subscription Plan:</p>
            <p>{getPlanName(selectedGroup?.plan) || "N/A"}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Expiry Date:</p>
            {/* <p>{convertToDate(selectedGroup?.created_at?._seconds, selectedGroup?.created_at?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(selectedGroup?.created_at?._seconds, selectedGroup?.created_at?._nanoseconds), 'dd MMM yyyy')}</p> */}
            <p>{selectedGroup?.create_date ? dateFormat(selectedGroup?.create_date) : "N/A"}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>License Usage:</p>
            <p>{selectedGroup?.license_usage || "N/A"}</p>
          </div>
          <div className="mt-0 flex flex-row justify-between">
            <p>Number of Customers:</p>
            <p>{selectedGroup?.no_customer || "N/A"}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerGroup;
