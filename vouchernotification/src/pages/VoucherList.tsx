import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaTimes, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { ArrowRightLeft, ChevronDown, ChevronRight, ChevronUp, FilterX, Pencil } from "lucide-react";
import Flag from 'react-world-flags'; // Flag component
import { vocuherListThunk, deleteVoucherThunk, getCustomerGroupListThunk, getCustomerListThunk, sendVoucherEmailThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setVoucherFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from 'date-fns';

interface RangeType<T> {
  label: string;
  value: [T, T] | ((value: T[]) => [T, T]);
  placement?: string;
  closeOverlay?: boolean;
  appearance?: string;
}

const predefinedRanges: RangeType<Date>[] = [
  { label: "Today", value: [new Date(), new Date()], placement: "left" },
  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last week",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
];

const initialFilters = {
  currency: "",
  voucher_code: "",
  start_date: "",
  end_date: "",
  sortdata: {
    sort_text: "",
    order: "asc"
  }
}

const VoucherList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {voucherFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(voucherFilters === null ? 0: currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(voucherFilters === null ? 20 : itemsPerPageNumber);
  const modalRef = useRef();
  const flagRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [voucher, setVoucher] = useState({});
  // console.log(voucher);
  const [customerId, setCustomerId] = useState<string>("");
  const [customerGroupId, setCustomerGroupId] = useState<string>("");
  console.log("customerId...", customerId);

  const dropwdownSearchRef = useRef(null);
  const dropwdownSearchRef2 = useRef(null);

  const [customerGroupNameFound, setCustomerGroupNameFound] = useState("");
  const [customerEmailFound, setCustomerEmailFound] = useState("");
  
  const [customerGroupList, setCustomerGroupList] = useState([]);
  // console.log("customerGroupList...", customerGroupList);
  const [customerGroupName, setCustomerGroupName] = useState("");
  const [customerList, setCustomerList] = useState([]);
  // console.log(customerList);
  const [customerSearch, setCustomerSearch] = useState({
    search_data: "",
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscription_date: {
      start_date: "",
      end_date: ""
    },
    renewal_date: {
      start_date: "",
      end_date: ""
    },
    domain: "",
    sortdata: {
      sort_text: "",
      //next_payment,createdAt,license_usage,name
      order: "asc"
    }
  });
  // console.log(customerSearch);

  // console.log({currentPage, totalPages});
  const [range, setRange] = useState<[Date | null, Date | null]|null>(null);
    
  const handleChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  useEffect(() => {
    const setCurrentPageNumberSlice = async() => {
      await dispatch(setCurrentPageStatus(currentPage));
    }

    setCurrentPageNumberSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageSlice = async() => {
      await dispatch(setItemsPerPageStatus(itemsPerPage));
    }

    setItemsPerPageSlice();
  }, [itemsPerPage]);

  const [dropwdownSearch, setDropdownSearch] = useState(false);
  useEffect(() => {
    if(customerSearch?.search_data !== ""){
      if(customerList?.length > 0){
        setDropdownSearch(true);
      }
      else{
        setDropdownSearch(false);
      }
    }
    else{
      setDropdownSearch(false);
    }
  }, [customerSearch, customerId]);

  const [dropwdownSearch2, setDropdownSearch2] = useState(false);
  useEffect(() => {
    if(customerGroupName !== ""){
      if(customerGroupList?.length > 0){
        setDropdownSearch2(true);
      }
      else{
        setDropdownSearch2(false);
      }
    }
    else{
      setDropdownSearch2(false);
    }
  }, [customerGroupName, customerId]);

  const getCustomerList = async() => {
    try {
      const result = await dispatch(getCustomerListThunk(customerSearch)).unwrap()
      if(result?.data){
        setCustomerList(result?.data);
      }
      else{
        setCustomerList([]);
      }
    } catch (error) {
      setCustomerList([]);
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
    getCustomerList();
  }, [customerSearch]);

  const [selectedRadio, setSelectedRadio] = useState('group');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
  };

  const tableHeads = [
    {name: "voucher_code", label: "Voucher Code"},
    {name: "currency", label: "Currency"},
    {name: "discount_rate", label: "Discount"},
    {name: "start_date", label: "Start Date"},
    {name: "end_date", label: "End Date"},
    {name: "action", label: "Actions"},
  ];

  const dateFormat = (date) => {
    const milliseconds = parseInt(date?._seconds) * 1000;
    const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(totalMilliseconds);
    if(newDate == "Invalid Date") {
      return "Invalid Date";
    } else {
      return format(newDate, "dd MMM yyyy");
    }
  };

  const [sampleData,setSampleData] = useState([]);
  // console.log(sampleData);
  
  const [filters, setFilters] = useState(voucherFilters === null ? initialFilters : voucherFilters);
  console.log("filters....", filters);

  const handleFilterChange = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if(range === null) {
      setFilters({
        ...filters,
        start_date: "",
        end_date: "",
      });
    } else {
      setFilters({
        ...filters,
        start_date: `${range[0] === null ? "" : format(range[0], "yyyy-MM-dd")}`,
        end_date: `${range[1] === null ? "" : format(range[1], "yyyy-MM-dd")}`,
      });
    }
  }, [range]);
  
  useEffect(() => {
    const setVouhcerFiltersSlice = async() => {
      await dispatch(setVoucherFiltersStatus(filters));
    }

    setVouhcerFiltersSlice();
  }, [filters]);
  
  const getVoucherList = async() => {
    try {
      const result = await dispatch(vocuherListThunk(filters)).unwrap();
      setSampleData(result.data);
    } catch (error) {
      setSampleData([]);
    }
  };

  useEffect(() => {
    getVoucherList();
  },[filters]);

  const openModal = (group) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup(null);
  };

  const getCustomerGroupListData = async() => {
    try {
      const result = await dispatch(
        getCustomerGroupListThunk({group_name: "", create_date: ""})
      ).unwrap();
      setCustomerGroupList(result.data);
    } catch (error) {
      setCustomerGroupList([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomerGroupListData();
  }, []);

  // Calculate displayed data based on current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData?.length / itemsPerPage);

  useEffect(() => {
    if(sampleData?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, sampleData]);
  
  const [isOpen, setIsOpen] = useState(false);

  const currencyOptions = [
    { code: "US", label: "United States", value: '$', currency_code: "USD", },
    { code: "EU", label: "Europe", value: '€', currency_code: "EUR", },
    { code: "AU", label: "Australia", value: 'A$', currency_code: "AUD", },
    { code: "NG", label: "Nigeria", value: 'N₦', currency_code: "NGN", },
    { code: "GB", label: "United Kingdom", value: '£', currency_code: "GBP", },
    { code: "CA", label: "Canada", value: 'C$', currency_code: "CAD", },
    { code: "IN", label: "India", value: '₹', currency_code: "INR", },
  ];

  const initialCurrencyOption = { code: "", label: "", value: '', currency_code: "", };

  const countryCodes = currencyOptions.map((item) => item?.value);

  const initialSelectedOption = { code: "", label: "", value: 'Currency', currency_code: "Select", };
  
  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
    currency_code: string;
  } | { code: "US", label: "United States", value: '$', currency_code: "USD", }>(initialSelectedOption);

  const handleOptionClick = (option: { code: string; flag: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    setFilters({
      ...filters,
      currency: option?.currency_code,
    });
  };

  useEffect(() => {
    if(voucherFilters === null) {
      setSelectedOption(initialSelectedOption)
    } else {
      const currencyOption = voucherFilters?.currency;
      if(currencyOption === "") {
        setSelectedOption(initialSelectedOption);
      } else {
        const findOption = currencyOptions.find(item => item?.currency_code === currencyOption);
        setSelectedOption(findOption);
        // console.log(findOption);
      }
    }
  }, []);

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

  const deleteVoucher = async(id:string) => {
    try {
      const result = await dispatch(
        deleteVoucherThunk({record_id: id})
      ).unwrap()
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
      setDeleteModal(false);
      setVoucher({});
    } catch (error) {
      toast.error(error?.message || "Error suspending customer")
    } finally {
      getVoucherList();
    }
  };

  const sendVoucherEmail = async(recordId:string, customerId:string, customerType: number) => {
    console.log({
      record_id: recordId,
      customer_id: customerId,
      customer_type: customerType
    });
    
    if(customerId === ""){
      toast.warning("Please select customer group or individual customer");
    } else{
      try {
        const result = await dispatch(
          sendVoucherEmailThunk({
            record_id: recordId,
            customer_id: customerId,
            customer_type: customerType
          })
        ).unwrap();
        if(result?.status === 200) {
          toast.success(result?.message);
          setTimeout(() => {
            setCustomerGroupId("");
            setCustomerGroupName("");
            setCustomerGroupNameFound("");
            setCustomerId("");
            setCustomerEmailFound("");
            setCustomerSearch({
              ...customerSearch,
              search_data: ""
            });
          }, 1000);
        } else {
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error(error?.message || "Voucher email could not be sent");
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text-resp">Voucher List</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              onClick={() => navigate('/add-voucher')}
              className="btn-green w-[139px] items-center"
              type="button"
              button-name="voucher-list-add-new-btn"
              disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.add ? true : false}
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
          >Voucher list</p>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-14 mb-3">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 min-sm:w-[300px] max-sm:mx-auto">
          <div
            className='flex flex-col relative px-4 mb-5 sm:mb-0'
          >
            <div
              className="serach-input-2 flex flex-row"
              onClick={() => setIsOpen(!isOpen)}
              cypress-name="currency-selector-button"
            >
              <div className="relative w-[40px] h-full flex mx-auto items-center justify-between border-0 cursor-pointer">
                <Flag code={selectedOption?.code} style={{width: '30px', margin: 'auto'}} />
              </div>
              <p
                className="w-full ml-2 text-nowrap overflow-hidden"
              >{selectedOption?.currency_code === "" ? "Select" : selectedOption?.currency_code} - {selectedOption?.value === "" ? "Currency": selectedOption?.value}</p>
              {
                isOpen ? <ChevronUp style={{fontSize: '20px'}} /> : <ChevronDown style={{fontSize: '20px'}} />
              }
              {/* Dropdown Options */}
              {isOpen && (
                <div className="absolute mt-[32px] z-10 w-[88%] max-[1250px]:w-[82%] max-lg:w-[88%] -ml-2 bg-white border border-gray-300 rounded-md shadow-lg" ref={flagRef}>
                  <div
                    className="flex items-center py-2 px-[5px] hover:bg-gray-100 cursor-pointer border-b-[1px]"
                    onClick={() => handleOptionClick(initialCurrencyOption)}
                  >
                    <Flag code={initialSelectedOption?.code} style={{width: '30px', margin: 'auto'}} />
                    <p className="ml-2">{initialSelectedOption.currency_code} - {initialSelectedOption.value}</p>
                  </div>
                  {currencyOptions.map((option) => (
                    <div
                      key={option.code}
                      className="flex items-center py-2 px-[5px] hover:bg-gray-100 cursor-pointer border-b-[1px]"
                      onClick={() => handleOptionClick(option)}
                      cypress-name="currency-selector-options"
                    >
                      <Flag code={option?.code} style={{width: '30px'}} />
                      <p className="ml-2">{option?.currency_code || "Select"} - {option?.value || "Option"}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-[#8A8A8A]"
              name="voucher_code"
              placeholder="Voucher Code"
              onChange={handleFilterChange}
              value={filters?.voucher_code}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <DateRangePicker
              ranges={predefinedRanges}
              placeholder="Select Date Range"
              style={{ width: '100%', height: '45px !important', marginTop: '-7px' }}
              size='lg'
              // border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 placeholder:opacity-60 font-inter font-normal
              onChange={handleChange}
              value={range}
              showHeader={false}
              renderValue={renderValue} // Custom render for the selected value
              calendarSnapping={true}
              cleanable
            />
            {/* <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="start_date"
              placeholder="Start Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
              onChange={handleFilterChange}
              value={filters?.start_date}
            /> */}
          </div>
          {/* <div className="px-4 mb-5 sm:mb-0 flex gap-1s">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="end_date"
              placeholder="End Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
              onChange={handleFilterChange}
              value={filters?.end_date}
            />
            <button
              className="ml-1"
              type="button"
              onClick={() => {
                setFilters(initialFilters);
                setSelectedOption(initialSelectedOption);
              }}
              button-name="vouhcer-list-clear-filter"
            >
              <FilterX
                className="text-[20px] text-custom-green"
              />
            </button>
          </div> */}
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
                      head?.name === "voucher_code" ? "" :
                      head?.name === "currency" ? "" :
                      head?.name === "action" ? "" :
                      <span className="ml-1"><button type="button" onClick={() => {
                        setFilters({
                          ...filters,
                          sortdata: {
                            sort_text: head.name,
                            order: filters?.sortdata?.sort_text === head.name
                            ? filters?.sortdata?.order === "desc"
                              ? "desc"
                              : "asc"
                            : "asc"
                          }
                        })
                      }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
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
                    <td className="td-css-2">{item?.voucher_code}</td>
                    <td className="td-css-2">{item?.currency}</td>
                    <td className="td-css-2">{item?.discount_rate}%</td>
                    <td className="td-css-2">{dateFormat(item?.start_date)}</td>
                    <td className="td-css-2">{dateFormat(item?.end_date)}</td>
                    <td className="">
                      <div className="flex items-center justify-center gap-3 my-1">
                        <div className="flex flex-row gap-1">
                          <button
                            className="text-black hover:text-orange-300"
                            onClick={() => {navigate('/edit-voucher', {state: item})}}
                            button-name="voucher-list-edit"
                            disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.add ? true : false}
                          >
                            <Pencil className=" w-5" />
                          </button>
                          <button
                            className="text-black hover:text-red-600 text-md"
                            onClick={() => {
                              setDeleteModal(true);
                              setVoucher(item);
                            }}
                            disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.delete ? true : false}
                          >
                            <FaTrash role="img" aria-label="trash" />
                          </button>
                        </div>
                        <button
                          className="send-mail-btn"
                          onClick={() => {
                            openModal(item);
                            setVoucher(item);
                          }}
                          disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.send_mail ? true : false}
                          cypress-name="send-voucher-mail-button"
                        >
                          Send mail
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }): 
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
              setVoucher({});
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
                          setVoucher({});
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
                      onClick={() => {deleteVoucher(voucher?.id)}}
                    >Yes</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setDeleteModal(false);
                        setVoucher({});
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
      
      {
        isModalOpen && (
          <div className="fixed-full-screen">
            <div className="fixed-popup max-[582px]:w-full min-[582px]:w-[582px] p-8" ref={modalRef} cypress-name="send-voucher-mail-modal">
              <div className="w-full flex flex-row justify-between">
                <h5 className="h5-text-black">Send Mail</h5>
                <button
                  className="bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                  onClick={() => {setModalOpen(false)}}
                  aria-label="Close"
                  type="button"
                  cypress-name="send-voucher-mail-close-btn"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="my-4 px-10 flex flex-row justify-between">
                <label className={`flex flex-row gap-2`}>
                  <input
                    className={selectedRadio == "group" ? "radio-checked" : "radio-unchecked"}
                    type="radio"
                    value="group"
                    checked={selectedRadio === "group"}
                    onChange={handleRadioChange}
                    cypress-name="group"
                  />
                  Group
                </label>
                <label className={`flex flex-row gap-2`}>
                  <input
                    className={selectedRadio == "individual" ? "radio-checked" : "radio-unchecked"}
                    type="radio"
                    value="individual"
                    checked={selectedRadio === "individual"}
                    onChange={handleRadioChange}
                    cypress-name="individual"
                  />
                  Individual Customer
                </label>
              </div>

              <div className="w-full my-5">
                {
                  selectedRadio === "group" ? 
                  <div className="w-full py-4 relative" ref={dropwdownSearchRef2}>
                    <input type="text" className="w-full h-[68px] px-6 py-4 bg-[#F4F4F4] focus:outline-none rounded-[10px] border border-[#C9C9C9] border-opacity-80 font-inter font-extralight text-base text-black" onChange={e => {
                      setCustomerGroupName(e.target.value);
                      setCustomerGroupId("");
                      setCustomerGroupNameFound("");
                    }} placeholder="Search group" value={customerGroupName || customerGroupNameFound} onFocus={() => {setDropdownSearch2(true)}} cypress-name="customer-group-search-input" />
                    {
                      dropwdownSearch2 && (
                        <div className="absolute bg-[#F4F4F4] w-full max-h-40 overflow-y-auto p-1 grid grid-cols-1" cypress-name='customer-group-search-dropdown'>
                          {
                            customerGroupList?.filter(item => item?.group_name?.toLowerCase()?.includes(customerGroupName?.toLowerCase()))?.map((group, index) => (
                              <div key={index} className="py-1 px-4 font-inter font-extralight text-base text-black border-b border-[#C9C9C9] last:border-0 cursor-pointer w-full" onClick={() => {
                                setCustomerGroupId(group?.record_id);
                                setCustomerGroupName("");
                                setCustomerGroupNameFound(group?.group_name);
                                setDropdownSearch2(false);
                              }}>{group?.group_name}</div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div> :
                  <div className="w-full py-4" ref={dropwdownSearchRef}>
                    <input
                      className="w-full h-[68px] px-6 py-4 bg-[#F4F4F4] focus:outline-none rounded-[10px] border border-[#C9C9C9] border-opacity-80 font-inter font-extralight text-base text-black"
                      placeholder="Enter customer email id"
                      onChange={e => {
                        setCustomerSearch({
                          ...customerSearch,
                          search_data: e.target.value
                        });
                        setCustomerId("");
                        setCustomerEmailFound("");
                      }}
                      value={customerSearch?.search_data || customerEmailFound}
                      onFocus={() => {setDropdownSearch(true)}}
                      cypress-name="customer-individual-search-input"
                    />

                    {
                      dropwdownSearch && (
                        <div className="absolute bg-[#F4F4F4] max-[321px]:w-[80%] max-[376px]:w-[83%] max-[390px]:w-[84%] max-[426px]:w-[85%] max-[480px]:w-[86%] max-[582px]:w-[88%] min-[582px]:w-[516px] max-h-[200px] overflow-y-scroll flex flex-col" cypress-name="customer-individual-search-dropdown">
                          {
                            customerList && customerList?.map((customer, index) => {
                              return(
                                <a
                                  key={index}
                                  className="w-full px-4 py-2 font-inter font-extralight font-base text-black hover:text-black no-underline hover:no-underline cursor-pointer" onClick={() => {
                                    setCustomerSearch({
                                      ...customerSearch,
                                      search_data: ""
                                    });
                                    setCustomerId(customer?.id);
                                    setDropdownSearch(false);
                                    setCustomerEmailFound(customer?.email);
                                  }}
                                >{customer?.email}</a>
                              )
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                }
              </div>

              <div className="flex justify-end">
                <button
                  className="btn-green-2 font-inter w-[95px]"
                  type="button"
                  onClick={() => {sendVoucherEmail(voucher?.id, selectedRadio === "group" ? customerGroupId : customerId, selectedRadio === "group" ? 2 : 1)}}
                  cypress-name="send-voucher-mail-send-button"
                >Send</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default VoucherList;
