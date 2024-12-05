import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaTimes, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table";
import Modal from "../components/Modal";
import "../styles/styles.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { ChevronDown, ChevronRight, ChevronUp, Pencil } from "lucide-react";
import Flag from 'react-world-flags'; // Flag component
import { vocuherListThunk, deleteVoucherThunk, getCustomerGroupListThunk, getCustomerListThunk, sendVoucherEmailThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { format } from "date-fns";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VoucherList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const modalRef = useRef();
  const flagRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [voucher, setVoucher] = useState({});
  // console.log(voucher);
  const [customerId, setCustomerId] = useState<string>("");
  // console.log(customerId);
  
  const [customerGroupList, setCustomerGroupList] = useState([]);
  // console.log(customerGroupList);
  const [customerList, setCustomerList] = useState([]);
  // console.log(customerList);
  const [customerSearch, setCustomerSearch] = useState({
    search_data: "",
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscritption_date: "",
    renewal_date: ""
  });
  // console.log(customerSearch);

  const [dropwdownSearch, setDropdownSearch] = useState(false);
  useEffect(() => {
    if(customerSearch?.search_data != ""){
      if(customerList.length > 0){
        if(customerId == ""){
          setDropdownSearch(true);
        }
        else{
          setDropdownSearch(false);
        }
      }
      else{
        setDropdownSearch(false);
      }
    }
    else{
      setDropdownSearch(false);
      setCustomerList([]);
    }
  }, [customerSearch]);

  const getCustomerList = async() => {
    try {
      const result = await dispatch(
        getCustomerListThunk(customerSearch)
      ).unwrap()
      if(result.data){
        setCustomerList(result.data);
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
    if(customerSearch?.search_data != ""){
      getCustomerList();
    }
    else{
      setCustomerList([]);
    }
  }, [customerSearch]);

  const [selectedRadio, setSelectedRadio] = useState('group');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
    setCustomerId("");
  };

  const tableHeads = [ 'Voucher Code', 'Currency', 'Discount', 'Start Date', 'End Date', 'Actions'];

  const dateFormat = (date) => {
    const newDate = new Date(date);
    return format(newDate, "dd MMM yyyy");
  };

  const [sampleData,setSampleData] = useState([]);
  
  const getVoucherList = async() => {
    try {
      const result = await dispatch(
        vocuherListThunk()
      ).unwrap();
      setSampleData(result.data);
    } catch (error) {
      setSampleData([]);
    }
  };

  useEffect(() => {
    getVoucherList();
  },[]);

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
        getCustomerGroupListThunk()
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
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  
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

  const countryCodes = currencyOptions.map((item) => item?.value);
  
  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
    currency_code: string;
  } | { code: "US", label: "United States", value: '$', currency_code: "USD", }>({ code: "US", label: "United States", value: '$', currency_code: "USD", });

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
      toast.error("Error suspending customer")
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
    
    if(customerId == ""){
      toast.warning("Please select customer group or individual customer");
    }
    else{
      try {
        const result = await dispatch(
          sendVoucherEmailThunk({
            record_id: recordId,
            customer_id: customerId,
            customer_type: customerType
          })
        ).unwrap();
        toast.success(result?.message);
      } catch (error) {
        toast.error("Voucher email could not be sent");
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1">
      <ToastContainer />
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
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 min-sm:w-[300px] max-sm:mx-auto">
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
              >{selectedOption?.currency_code} - {selectedOption?.value}</p>
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
                      <p className="ml-2">{option?.currency_code} - {option?.value}</p>
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
              name="voucher_code"
              placeholder="Voucher Code"
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
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
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
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
                    <td className="td-css-2">{item?.voucher_code}</td>
                    <td className="td-css-2">{item?.currency}</td>
                    <td className="td-css-2">{item?.discount_rate}%</td>
                    <td className="td-css-2">{dateFormat(item?.start_date)}</td>
                    <td className="td-css-2">{dateFormat(item?.end_date)}</td>
                    <td className="">
                      <div className="flex items-center justify-center gap-3 my-1">
                        <div className="flex flex-row gap-1">
                          <button className="text-black hover:text-orange-300" onClick={() => {navigate('/edit-voucher', {state: item})}}>
                            <Pencil className=" w-5" />
                          </button>
                          <button className="text-black hover:text-red-600 text-md" onClick={() => {
                            setDeleteModal(true);
                            setVoucher(item);
                          }}>
                            <FaTrash role="img" aria-label="trash" />
                          </button>
                        </div>
                        <button
                          className="btn-green-3 w-[80px] h-7"
                          onClick={() => {
                            openModal(item);
                            setVoucher(item);
                          }}
                        >
                          Send mail
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
      
      {
        isModalOpen && (
          <div className="fixed-full-screen">
            <div className="fixed-popup max-[582px]:w-full min-[582px]:w-[582px] p-8" ref={modalRef}>
              <div className="w-full flex flex-row justify-between">
                <h5 className="h5-text-black">Send Mail</h5>
                <button
                  className="bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                  onClick={() => {setModalOpen(false)}}
                  aria-label="Close"
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
                  />
                  Individual Customer
                </label>
              </div>

              <div className="w-full my-5">
                {
                  selectedRadio === "group" ? 
                  <div className="w-full py-4">
                    <select
                      className="w-full h-[68px] px-6 py-4 bg-[#F4F4F4] focus:outline-none rounded-[10px] border border-[#C9C9C9] border-opacity-[80%] font-inter font-extralight text-base text-black"
                      onChange={e => {
                        setCustomerId(e.target.value);
                      }}
                    >
                      <option selected hidden>Select group</option>
                      {
                        customerGroupList?.map((customerGroup, index) => (
                          <option value={customerGroup?.record_id} key={index}>{customerGroup?.group_name}</option>
                        ))
                      }
                    </select>
                  </div> :
                  <div className="w-full py-4">
                    <input className="w-full h-[68px] px-6 py-4 bg-[#F4F4F4] focus:outline-none rounded-[10px] border border-[#C9C9C9] border-opacity-[80%] font-inter font-extralight text-base text-black" placeholder="Enter customer email id"
                      onChange={e => {
                        setCustomerSearch({
                          ...customerSearch,
                          search_data: e.target.value
                        });
                        setCustomerId("");
                      }}
                      value={customerSearch?.search_data}
                    />

                    {
                      dropwdownSearch && (
                        <div className="absolute bg-[#F4F4F4] max-[321px]:w-[80%] max-[376px]:w-[83%] max-[390px]:w-[84%] max-[426px]:w-[85%] max-[480px]:w-[86%] max-[582px]:w-[88%] min-[582px]:w-[516px] max-h-[200px] overflow-y-scroll flex flex-col">
                          {
                            customerList && customerList?.map((customer, index) => {
                              return(
                                <a
                                  key={index}
                                  className="w-full px-4 py-2 font-inter font-extralight font-base text-black cursor-pointer" onClick={() => {
                                    setCustomerSearch({
                                      ...customerSearch,
                                      search_data: customer?.email
                                    });
                                    setCustomerId(customer?.record_id);
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
                  onClick={() => {sendVoucherEmail(voucher?.id, customerId, selectedRadio === "group" ? 2 : 1)}}
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
