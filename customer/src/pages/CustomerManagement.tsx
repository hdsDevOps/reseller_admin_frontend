import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCustomerListThunk, editCustomerThunk, deleteCustomerThunk, suspendCustomerThunk, cancelCustomerSubscriptionThunk, declineCustomerSubscriptionThunk, getCountryListThunk, getRegionListThunk, removeUserAuthTokenFromLSThunk, getNotificationTemplateThunk, sendEmailToCustomerThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filterRef = useRef();
  const intialFilter= {
    search_data: "",
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscritption_date: "",
    renewal_date: ""
  };
  const intialFilter2= {
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscritption_date: "",
    renewal_date: ""
  };
  const [filterShow, setFilterShow] = useState(false);
  const [filters, setFilters] = useState(intialFilter);
  console.log("filters...", filters);
  
  const [filters2, setFilters2] = useState(intialFilter2);
  
  const [domain, setDomain] = useState("");
  const [domainList, setDomainList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  // console.log(customerList);
  const [checked, setChecked] = useState([]);
  // console.log("checked...", checked);
  
  
  const [showList, setShowList] = useState(null);
  const listRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [commonModal, setCommonModal] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [authorization, setAuthorization] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [notificationTemplates, setNotificationTemplates] = useState([]);
  // console.log("notificationTemplates...", notificationTemplates);
  const [notificationId, setNotificationId] = useState("");
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customerList.length / itemsPerPage);
  
  useEffect(() => {
    if(authorization == "true"){
      setFilters({
        ...filters,
        authentication: true
      })
    }
    else if(authorization == "false"){
      setFilters({
        ...filters,
        authentication: false
      })
    }
    else{
      setFilters({
        ...filters,
        authentication: ""
      })
    }
  }, [authorization]);

  const getCustomerList = async() => {
    try {
      const result = await dispatch(
        getCustomerListThunk(filters)
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
  }

  useEffect(() => {
    getCustomerList();
  }, [filters]);

  const getCountryList = async() => {
    try {
      const countries = await dispatch(
        getCountryListThunk()
      ).unwrap();
      setCountryList(countries.countrylist);
    } catch (error) {
      // console.log("Error on token");
    }
  }
  
  useEffect(() => {
    getCountryList();
  }, []);

  const getRegionList = async() => {
    try {
      const regions = await dispatch(getRegionListThunk()).unwrap();
      setRegionList(regions?.regionlist);
    } catch (error) {
      // console.log("Error on token");
    }
  }
  
  useEffect(() => {
    getRegionList();
  }, []);

  const getNotificationTemplate = async() => {
    try {
      const result = await dispatch(getNotificationTemplateThunk()).unwrap();
      setNotificationTemplates(result?.data);
    } catch (error) {
      setNotificationTemplates([]);
    }
  };

  useEffect(() => {
    getNotificationTemplate();
  }, []);
  
  const handleClickOutOfFilter = e => {
    if(filterRef.current && !filterRef.current.contains(e.target)){
      setFilterShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutOfFilter);
    return() => {
      document.removeEventListener('mousedown', handleClickOutOfFilter);
    };
  }, []);

  const handleFilterChange = (e) => {
    setFilters2({
      ...filters2,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetFilter = () => {
    setFilters({
      ...filters,
      country: filters2.country,
      state_name: filters2.state_name,
      authentication: filters2.authentication,
      license_usage: filters2.license_usage,
      subscritption_date: filters2.subscritption_date,
      renewal_date: filters2.renewal_date
    })
  }

  const handleAuthorizeChange = async(item) => {
    const customerItem = item;
    customerItem.authentication = !customerItem?.authentication;
    try {
      const result = await dispatch(
        editCustomerThunk(customerItem)
      ).unwrap();
    } catch (error) {
      toast.error("Authentication could not be updated");
    } finally{
      getCustomerList();
      setTimeout(() => {
        toast.success("Authentication updated");
      }, 1000);
    }
  };

  const handleStatusChange = async(item) => {
    const customerItem = item;
    const accountStatus = customerItem?.account_status;
    customerItem.account_status = `${
      accountStatus == "active" ? "inactive"
      : accountStatus == "suspended" ? "suspended"
      : "active"
    }`;
    try {
      const result = await dispatch(
        editCustomerThunk(customerItem)
      ).unwrap();
    } catch (error) {
      toast.error("Status could not be updated");
    } finally{
      getCustomerList();
      setTimeout(() => {
        if(customerItem?.account_status == "suspended"){
          toast.warning("Account is suspended!");
        }
        else{
          toast.success("Status updated");
        }
      }, 1000);
    }
  };

  const tableHeads = [
    '',
    "Customer ID",
    "Name",
    "Product",
    "Domain",
    "Subscription Plan",
    "License Usage",
    "Create Date",
    "Payment Cycle",
    "Renewed Date",
    "Make Authorization",
    "Status",
    "Action",
  ];

  const toggleList = (customerId) => {
    setShowList((prev) => (prev === customerId ? null : customerId))
  };
  const handleClickOutOfList = e => {
    if(listRef.current && !listRef.current.contains(e.target)){
      setShowList(null);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutOfList);
    return() => {
      document.removeEventListener('mousedown', handleClickOutOfList);
    };
  }, []);
  
  const cancelCustomerSubscription = async(item) => {
    try {
      const result = await dispatch(
        cancelCustomerSubscriptionThunk({record_id: item?.record_id})
      ).unwrap()
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
      setShowSubscriptionModal(false);
    } catch (error) {
      toast.error("Error suspending customer")
    } finally {
      getCustomerList();
    }
  };
  
  const declineCustomerSubscription = async(item) => {
    try {
      const result = await dispatch(
        declineCustomerSubscriptionThunk({record_id: item?.record_id})
      ).unwrap()
      setTimeout(() => {
        toast.success("Subscription cancellation has been declined.");
      }, 1000);
      setShowSubscriptionModal(false);
    } catch (error) {
      toast.error("Error suspending customer")
    } finally {
      getCustomerList();
    }
  };

  const deleteCustomer = async(item) => {
    try {
      const result = await dispatch(
        deleteCustomerThunk({record_id: item?.record_id})
      ).unwrap()
      // console.log(result);
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
      setShowDeleteModal(false);
      setCommonModal(false);
    } catch (error) {
      toast.error("Error deleting customer")
    } finally {
      getCustomerList();
    }
  };

  const suspendCustomer = async(item) => {
    try {
      const result = await dispatch(
        suspendCustomerThunk({record_id: item?.record_id})
      ).unwrap()
      // console.log(result);
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
      setShowSuspendModal(false);
      setCommonModal(false);
    } catch (error) {
      toast.error("Error suspending customer")
    } finally {
      getCustomerList();
    }
  };

  const transferCustomer = async(item) => {
    console.log('transfer');
  };
  
  function convertToDate(seconds:any, nanoseconds:any) {
    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;
    return new Date(milliseconds);
  };

  const selectAllButton = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);
    setChecked(customerList);
  };

  const toggleCheck = (newJson) => {
    setChecked((prevChecked) => {
      const index = prevChecked.findIndex((item) => item?.id === newJson?.id);

      if (index !== -1) {
        // If found, remove it
        return prevChecked.filter((item) => item?.id !== newJson?.id);
      } else {
        // If not found, add it
        return [...prevChecked, newJson];
      }
    });
  };

  const sendEmailToCustomer = async(e) => {
    e.preventDefault();
    try {
      const emails = checked?.map(item => item?.email);
      // console.log("emails...", emails);
      // console.log("notificationId...", notificationId);
      if(emails.length === 0){
        toast.warning("Please select customer");
      }
      else{
        if(notificationId === ""){
          toast.warning("Please select a notification");
        }
        else{
          const sendMail = await dispatch(sendEmailToCustomerThunk({
            email_ids: emails,
            record_id: notificationId
          })).unwrap();
          toast.success(sendMail?.message);
        }
      }
    } catch (error) {
      toast.error("Error sending email");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  }

  return (
    <div
      className="grid grid-cols-1"
    >
      <ToastContainer />
      <div className="flex flex-col w-full">
        <div className="flex-row-between-responsive sm:mr-10 max-sm:mr-0">
          <h3 className="h3-text">
            Customers Management
          </h3>
          <div>
            <button
              type="button"
              className="btn-green w-[139px] h-[40px] float-right sm-mt-0 mt-2"
              onClick={() => {
                navigate('/add-customer');
              }}
            >
              +&nbsp;&nbsp;Add new
            </button>
          </div>
        </div>

        <div className="flex-row-between-responsive mt-[58px] sm:mr-10 max-sm:mr-0">
          <div className="flex flex-row w-full">
            <input
              type="checkbox"
              className={`w-3 h-3 border border-black mt-[12px] mr-[6px] accent-[#12A833]`}
              onClick={() => {selectAllButton()}}
              checked={customerList.length !== checked.length ? false : customerList.length === 0 ? false : true}
            />
            <p className="font-inter-bold text-[14px] opacity-60 text-custom-blue mt-[8px]">
              Select All
            </p>
          </div>
          <div className="flex sm:flex-row max-sm:flex-col sm:justify-end max-sm:items-end w-full">
            <select className="sm:mr-2 max-sm:mr-0 w-[198px] h-[38px] select-notification" onChange={(e) => {setNotificationId(e.target.value)}}>
              <option selected value="">Select a notification</option>
              {
                notificationTemplates && notificationTemplates?.map((notification, index) => (
                  <option value={notification?.id} key={index}>{notification?.template_header}</option>
                ))
              }
            </select>

            <button
              type="button"
              className="w-[79px] h-[38px] btn-blue max-sm:mt-1"
              onClick={(e) => {sendEmailToCustomer(e)}}
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex-row-between-responsive py-4 sm:mr-10 max-sm:mr-0">
          <div
            className="grid grid-cols-1 min-[968px]:grid-cols-2"
          >
            <div className="sm:w-[300px] max-sm:w-full sm:px-4 max-sm:px-0">
              <input
                list="brow"
                placeholder="Auto search domain list"
                className="serach-input"
                name="domain"
                onChange={e => {setDomain(e.target.value)}}
                value={domain}
              />
              {
                domainList.length !== 0 && (
                  <div
                    className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-custom-white rounded-b`}
                  >
                    {domainList.map((item, index) => {
                      return (
                        <a
                          key={index}
                          className={`font-inter-16px-400 pl-4 py-1 ${
                            index != 0 && `border-t border-white`
                          }`}
                        >
                          {item}
                        </a>
                      );
                    })}
                  </div>
                )
              }
              
            </div>
            <div className="sm:w-[300px] max-sm:w-full sm:px-4 max-sm:px-0 min-[968px]:mt-0 mt-[15px]">
              <input
                className="serach-input"
                name="search_data"
                onChange={e => {
                  setFilters({
                    ...filters,
                    search_data: e.target.value,
                  });
                }}
                placeholder="Name, Email"
                value={filters.search_data}
              />
            </div>
          </div>
          <div
            className="min-[968px]:mt-0 mt-[27px]"
          >
            <button
              type="button"
              className="btn-green w-[80px] h-[38px] max-sm:float-right"
              onClick={() => {
                setFilterShow(true);
              }}
            >
              Filter
            </button>
          </div>
        </div>
        
        {
          filterShow && (
            <div
              className={`fixed-full-screen`}
            >
              <div className="fixed-popup max-w-xl w-full" ref={filterRef}>
                <div className="flex-row-between px-8 pt-2 pb-4 border-b-[1px] border-cWhite3">
                  <h3 className="text-xl font-medium">Filter</h3>
                  <button
                    type="button"
                    className="mt-[1px]"
                    onClick={() => {
                      setFilterShow(false);
                      setFilters2(intialFilter2)
                    }}
                  >
                    <img src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/close.png?alt=media&token=3fac7102-9ead-4bfa-a6f0-2c84d72260c6" alt="close" className="w-[25px] h-[25px]" />
                  </button>
                </div>

                <div className="flex-row-end px-8 pt-4 pb-2">
                  <button
                    type="button"
                    className="btn-light-green w-[90px] h-[38px]"
                    onClick={() => {
                      setFilters(intialFilter);
                      setFilters2(intialFilter2)
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-col pb-8 border-b-[1px] border-cWhite3">
                  <div className="flex flex-row px-4 py-2">
                    <div className="w-1/2 px-4">
                      <select
                        className="select-input"
                        name="country"
                        onChange={handleFilterChange}
                        value={filters2.country}
                      >
                        <option selected value="">
                          Select Country
                        </option>
                        {
                          countryList && countryList.map((country, number) => (
                            <option key={number} value={country}>{country}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="w-1/2 px-4">
                      <select
                        className="select-input"
                        name="state_name"
                        onChange={handleFilterChange}
                        value={filters2.state_name}
                      >
                        <option selected value="">
                          Select Region
                        </option>
                        {
                          regionList && regionList.map((region, number) => (
                            <option key={number} value={region}>{region}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-row px-4 py-2">
                    <div className="w-1/2 px-4">
                      <select
                        className="select-input"
                        name="authentication"
                        onChange={handleFilterChange}
                        value={authorization}
                      >
                        <option selected value="">
                          Select Authorization
                        </option>
                        <option value="true">ON</option>
                        <option value="false">OFF</option>
                      </select>
                    </div>
                    <div className="w-1/2 px-4">
                      <input
                        type="number"
                        className="serach-input"
                        name="license_usage"
                        onChange={handleFilterChange}
                        value={filters2.license_usage}
                        placeholder="Enter License Usage Value"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row px-4 py-2">
                    <div className="w-1/2 px-4">
                      <input
                        type="text"
                        className="serach-input"
                        name="subscritption_date"
                        onChange={handleFilterChange}
                        value={filters2.subscritption_date}
                        placeholder="Subscription Date"
                        onFocus={e => {
                          e.target.type='date'
                        }}
                        onBlur={e => {
                          e.target.type='text'
                        }}
                      />
                    </div>
                    <div className="w-1/2 px-4">
                      <input
                        type="text"
                        className="serach-input"
                        name="renewal_date"
                        onChange={handleFilterChange}
                        value={filters2.renewal_date}
                        placeholder="Renewal Date"
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

                <div className="flex-row-end pt-8 pb-4 px-8">
                  <div className="flex flex-row">
                    <button
                      type="button"
                      className="btn-blue w-[90px] h-[38px] mr-4"
                      onClick={() => {
                        setFilterShow(false);
                        setFilters2(intialFilter2)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-green w-[90px] h-[38px]"
                      onClick={() => {
                        setFilterShow(false);
                        // getCustomerList();
                        handleSetFilter();
                      }}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        <div className="w-full overflow-x-auto pb-[20px]">
          <table className="min-w-[1100px] max-h-screen">
            <thead className="h-[53px] thead-css">
              <tr>
                {tableHeads?.map((item, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className="w-[95px] th-css"
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody
              className="h-fit"
            >
              {
                currentItems && currentItems.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>
                        <input type="checkbox"
                          className="w-3 h-3 border border-black accent-[#12A833]"
                          checked={checked?.some((check) => check?.id === item?.id)}
                          onClick={() => {toggleCheck(item)}}
                        />
                      </td>
                      <td
                        className="td-css"
                      >#{item?.record_id}</td>
                      <td
                        className="td-css text-[#1F86E5] underline"
                      >
                        <a
                          onClick={() => navigate('/customer-information', { state: item })}
                          className="cursor-pointer"
                        >{item?.first_name} {item?.last_name}</a>
                      </td>
                      <td
                        className="td-css w-[180px]"
                      >
                        {/* {item?.product?.map((e, i) => {
                          if (i > 0) {
                            return (
                              <p key={i}>
                                + &nbsp; {e}
                              </p>
                            );
                          } else {
                            return <p key={i}>{e}</p>;
                          }
                        })} */}
                        N/A
                      </td>
                      <td
                        className="td-css"
                      >
                        {/* {item?.domain} */}
                        N/A
                      </td>
                      <td
                        className="td-css"
                      >
                        {/* {item?.subscriptionPlan} */}
                        N/A
                      </td>
                      <td
                        className="td-css"
                      >
                        {/* {item?.licenseUsage} */}
                        N/A
                      </td>
                      <td
                        className="td-css"
                      >
                        {`${convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(item?.created_at?._seconds, item?.created_at?._nanoseconds), 'dd MMM yyyy')}`}
                      </td>
                      <td
                        className="td-css"
                      >
                        {/* {item?.paymentCycle} */}
                        N/A
                      </td>
                      <td
                        className="td-css"
                      >
                        {`${convertToDate(item?.createdAt?._seconds, item?.createdAt?._nanoseconds) == "Invalid Date" ? "N/A" : format(convertToDate(item?.createdAt?._seconds, item?.createdAt?._nanoseconds), 'dd MMM yyyy')}`}
                      </td>
                      <td>
                        <div className="mt-[7.5px] transition-transform duration-1000 ease-in-out flex justify-center">
                          {/* {notificationToggle()} */}
                          <label className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={item?.authentication}
                              onClick={() => handleAuthorizeChange(item)}
                            />
                            <div className="w-[30px] h-[15.5px] flex items-center bg-[#E02424] rounded-full peer-checked:text-[#12A833] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[12px] after:absolute after:left-[3px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#12A833]"></div>
                          </label>
                        </div>
                      </td>
                      <td
                        className="px-[7px] py-[20px]"
                      >
                        <button
                          className={`w-20 h-[22px] ${
                          item?.account_status == "active" ? 'active-status' : 'inactive-status'
                          }`}
                          onClick={() => handleStatusChange(item)}
                        >
                          {
                            item?.account_status == "active" ? 'Active' : 'Inactive'
                          }
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="w-[33.66px] h-[33.66px] text-custom-green border border-custom-green rounded-full"
                        >
                          <Ellipsis
                            className="w-[19px] m-auto"
                            onClick={() => {toggleList(item?.record_id)}}
                          />
                        </button>

                        {
                          showList === item?.record_id && (
                            <div
                              className={`absolute right-0 rounded-3xl bg-white border-2 w-[186px]`}
                              ref={listRef}
                            >
                              <ul
                                className="customer-table-more-list"
                              >
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                      navigate('/edit-customer', { state: item});
                                    }}
                                  >Edit Customer</a>
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setShowDeleteModal(!showDeleteModal);
                                      setCommonModal(true);
                                    }}
                                  >Delete Customer</a>
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer"
                                  >Login as Customer</a>
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setShowSubscriptionModal(!showSubscriptionModal);
                                    }}
                                  >Cancel Subscription
                                  </a>
                                  {
                                    showSubscriptionModal && (
                                      <div
                                        className="fixed-full-screen"
                                      >
                                        <div
                                          className="fixed-popup min-[560px]:w-[557px] max-[560px]:w-full h-[372px] flex flex-col font-inter"
                                        >
                                          <div className="flex-row-between px-8 pt-[31px] pb-7 border-b-[1px] border-cWhite3 h-[74px]">
                                            <h3 className="text-xl font-medium">Cancel subscription</h3>
                                            <div
                                              className="w-[30px] h-[30px] bg-gray-100 rounded-full mt-[-2px]"
                                            >
                                              <button
                                                type="button"
                                                className="rotate-45 text-4xl ml-[5.5px] mt-[-7px]"
                                                onClick={() => {
                                                  setShowSubscriptionModal(false);
                                                }}
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>

                                          <p
                                            className="font-roboto font-medium text-xl leading-6 text-black mt-4 ml-[30px]"
                                          >
                                            The reason of cancel request
                                          </p>

                                          <textarea
                                            className="m-[18px] mt-[22px] bg-gray-100 h-[111px] p-[14px]"
                                          />

                                          <div
                                            className="flex min-[560px]:flex-row max-[560px]:flex-col justify-center max-[560px]:items-center w-full mt-4"
                                          >
                                            <button
                                              className="btn-app-dec text-custom-green border-custom-green mb-1"
                                              onClick={() => {cancelCustomerSubscription(item)}}
                                              type="button"
                                            >Approve</button>
                                            <button
                                              className="btn-app-dec text-black  border-gray-500 min-[560px]:ml-[26px] max-[560px]:ml-0"
                                              type="button"
                                              onClick={() => {declineCustomerSubscription(item)}}
                                            >Decline</button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                  {
                                    commonModal && (
                                      <div
                                        className="fixed-full-screen"
                                      >
                                        <div
                                          className="fixed-popup-round3xl min-[540px]:w-[538px] max-[540px]:w-full h-[315px] p-6"
                                        >
                                          <div
                                            className="flex flex-row justify-between"
                                          >
                                            <h3
                                              className="h3-text"
                                            >
                                              {
                                                showDeleteModal ? 'Delete Account' :
                                                showSuspendModal ? 'Suspend Account' :
                                                showTransferModal ? 'Transfer Account' : ''
                                              }
                                            </h3>
                                            <div
                                              className="w-[30px] h-[30px] bg-gray-100 rounded-full mt-[-2px]"
                                            >
                                              <button
                                                type="button"
                                                className="rotate-45 text-4xl ml-[5.5px] mt-[-7px]"
                                                onClick={() => {
                                                  setCommonModal(false);
                                                  setShowDeleteModal(false);
                                                  setShowSuspendModal(false);
                                                  setShowTransferModal(false);
                                                }}
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>

                                          <div
                                            className="mt-16 px-8"
                                          >
                                            <p
                                              className="font-warning-popup-message"
                                            >
                                              {
                                                showDeleteModal ? 'Are you sure want to delete this account?' :
                                                showSuspendModal ? 'Are you sure want to suspend this account?' :
                                                showTransferModal ? 'Are you sure want to transfer this account?' : ''
                                              }
                                            </p>
                                          </div>

                                          <div
                                            className="flex flex-row justify-center items-center mt-14"
                                          >
                                            <button
                                              className="btn-green-2 w-[79px]"
                                              type="button"
                                              onClick={() => {
                                                showDeleteModal ? deleteCustomer(item) :
                                                showSuspendModal ? suspendCustomer(item) :
                                                showTransferModal ? transferCustomer(item) : ''
                                              }}
                                            >Yes</button>
                                            <button
                                              className="btn-red ml-[60px]"
                                              type="button"
                                              onClick={() => {
                                                setCommonModal(false);
                                                setShowDeleteModal(false);
                                                setShowSuspendModal(false);
                                                setShowTransferModal(false);
                                              }}
                                            >Cancel</button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setShowSuspendModal(!showSuspendModal);
                                      setCommonModal(true);
                                    }}
                                  >Suspend Account</a>
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                    onClick={() => {
                                      setShowTransferModal(!showTransferModal);
                                      setCommonModal(true);
                                    }}
                                >
                                  <a
                                    className="cursor-pointer"
                                  >Transfer Account</a>
                                </li>
                              </ul>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>

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
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;