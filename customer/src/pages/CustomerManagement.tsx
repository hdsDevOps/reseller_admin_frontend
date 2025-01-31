import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { ArrowRightLeft, ChevronDown, Ellipsis } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCustomerListThunk, editCustomerThunk, deleteCustomerThunk, suspendCustomerThunk, cancelCustomerSubscriptionThunk, declineCustomerSubscriptionThunk, getCountryListThunk, getRegionListThunk, removeUserAuthTokenFromLSThunk, getNotificationTemplateThunk, sendEmailToCustomerThunk, getPlansAndPricesThunk, getCustomerDomainsListThunk, getCustomerEmailsCountThunk, logInAsCustomerThunk } from 'store/user.thunk';
import { setCustomerFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import ReactPaginate from "react-paginate";

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

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

interface SortData {
  sort_text:string;
  order:string
}

interface Filter {
  search_data: string,
  country: string,
  state_name: string,
  authentication: string | Boolean,
  license_usage: string | Number,
  subscription_date: object,
  renewal_date: object,
  domain: string,
  sortdata: SortData
}

interface DateRange {
  start_date: string,
  end_date: string
}

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const filterRef = useRef();
  const initialDateRange:DateRange = {
    start_date: "",
    end_date: ""
  }
  const intialFilter:Filter = {
    search_data: "",
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscription_date: initialDateRange,
    renewal_date: initialDateRange,
    domain: "",
    sortdata: {
      sort_text: "",
      //next_payment,createdAt,license_usage,name
      order: "asc"
    }
  };
  const intialFilter2= {
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscription_date: initialDateRange,
    renewal_date: initialDateRange,
    domain: ""
  };
  const {customerFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice, userDetails } = useAppSelector(state => state.auth);
  // console.log('customerFilters', customerFilters);
  const [filterShow, setFilterShow] = useState(false);
  const [filters, setFilters] = useState(customerFilters === null ? intialFilter : customerFilters);
  // console.log("filters...", filters);
  
  const [filters2, setFilters2] = useState(customerFilters === null ? intialFilter2 : {
    country: customerFilters?.country || "",
    state_name: customerFilters?.state_name || "",
    authentication: customerFilters?.authentication || "",
    license_usage: customerFilters?.license_usage || "",
    subscription_date: customerFilters?.subscription_date || initialDateRange,
    renewal_date: customerFilters?.renewal_date || initialDateRange,
    domain: customerFilters?.domain || ""
  });
  // console.log("filters2...", filters2);

  useEffect(() => {
    const setCustomerFiltersSlice = async() => {
      await dispatch(setCustomerFiltersStatus(filters));
    }

    setCustomerFiltersSlice();
  }, [filters]);
  
  const [domain, setDomain] = useState("");
  const [domainList, setDomainList] = useState([]);
  // console.log("domains list...", domainList);
  const [customerList, setCustomerList] = useState([]);
  // console.log("customerList...", customerList);
  const [checked, setChecked] = useState([]);
  // console.log("checked...", checked);
  const domainRef = useRef(null);
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  
  
  const [showList, setShowList] = useState(null);
  // console.log("show list...", showList);
  const listRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [commonModal, setCommonModal] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  // console.log("selectAll...", selectAll)
  const [selectAllCount, setSelectAllCount] = useState<number>(0);
  // console.log("selected count...", selectAllCount);
  const [selectAllPage, setSelectAllPage] = useState<number>(0);
  const [authorization, setAuthorization] = useState("");
  const [notificationTemplates, setNotificationTemplates] = useState([]);
  // console.log("notificationTemplates...", notificationTemplates);
  const [notificationId, setNotificationId] = useState("");
  
  const [currentPage, setCurrentPage] = useState(customerFilters === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(customerFilters === null ? 20 : itemsPerPageNumber);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerList?.slice(indexOfFirstItem, indexOfLastItem);
  // console.log("currentItems...", currentItems);
  const totalPages = Math.ceil(customerList.length / itemsPerPage);
  // console.log({currentPage, totalPages, lenght: currentItems?.length});

  const [plansList, setPlansList] = useState([]);
  // console.log("plan list...", plansList);

  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  // console.log({countryList, regionList})
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  // console.log({countries, states});
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});

  const [emailsCount, setEmailsCount] = useState([]);
  // console.log("emailsCount...", emailsCount);

  const [subscriptionRange, setSubscriptionRange] = useState<[Date | null, Date | null]>([null, null]);
  const [renewalRange, setRenewalRange] = useState<[Date | null, Date | null]>([null, null]);
  // console.log({subscriptionRange, renewalRange});

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  useEffect(() => {
    if(subscriptionRange === null) {
      setFilters({
        ...filters,
        subscription_date: initialDateRange,
      });
    } else {
      setFilters({
        ...filters,
        subscription_date: {
          start_date: `${subscriptionRange[0] === null ? "" : format(subscriptionRange[0], "yyyy-MM-dd")}`,
          end_date: `${subscriptionRange[1] === null ? "" : format(subscriptionRange[1], "yyyy-MM-dd")}`,
        },
      });
    }
  }, [subscriptionRange]);
  
  const handleSubscriptionRangeChange = (value: [Date | null, Date | null]) => {
    setSubscriptionRange(value);
  };

  useEffect(() => {
    if(renewalRange === null) {
      setFilters({
        ...filters,
        renewal_date: initialDateRange,
      });
    } else {
      setFilters({
        ...filters,
        renewal_date: {
          start_date: `${renewalRange[0] === null ? "" : format(renewalRange[0], "yyyy-MM-dd")}`,
          end_date: `${renewalRange[1] === null ? "" : format(renewalRange[1], "yyyy-MM-dd")}`,
        },
      });
    }
  }, [renewalRange]);
  
  const handleRenewalnRangeChange = (value: [Date | null, Date | null]) => {
    setRenewalRange(value);
  };

  // useEffect(() => {
  //   if(currentItems?.length > 0) {
  //     setEmailsCount(currentItems?.map((_, index) => 0));
  //   }
  // }, [currentItems]);

  useEffect(() => {
    if(customerList?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, customerList]);

  const getPlansList = async() => {
    try {
      const result = await dispatch(getPlansAndPricesThunk({last_order: ''})).unwrap();
      setPlansList(result?.data);
    } catch (error) {
      setPlansList([]);
    }
  };

  useEffect(() => {
    getPlansList();
  }, []);

  const getDomainsList = async() => {
    try {
      const result = await dispatch(getCustomerDomainsListThunk({search_text: "", customer_id: ""})).unwrap();
      setDomainList(result?.domainlist);
    } catch (error) {
      setDomainList([]);
    }
  };

  useEffect(() => {
    getDomainsList();
  }, []);

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
  };

  useEffect(() => {
    getCustomerList();
  }, [filters]);

  const handleLoginAsCustomer = async(email:string) => {
    try {
      const result = await dispatch(logInAsCustomerThunk({email: email})).unwrap();
      // console.log("result....", result);
      if(result?.status === 200) {
        window.location.href=`https://main.customer.gworkspace.withhordanso.com/redirecting-to-customer-portal?token=${result?.token}&customer_id=${result?.customer_id}&admin_name=${userDetails?.first_name}${" "}${userDetails?.last_name}`
        // window.location.href=`${process.env.CUSTOMER_PORTAL_BASE_URL}redirecting-to-customer-portal?token=${result?.token}&customer_id=${result?.customer_id}&admin_name=${userDetails?.first_name}${" "}${userDetails?.last_name}`
      }
    } catch (error) {
      toast.error("Unable to login as customer");
      // if(error?.message == "Request failed with status code 401") {
      //   try {
      //     const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
      //     navigate('/login');
      //   } catch (error) {
      //     //
      //   }
      // }
      console.log("error....", error);
    }
  }

  // const getCustomerEmailsCount = async(id:string, index:Number) => {
  //   if(currentItems?.length === emailsCount?.length) {
  //     const newEmailCounts = [...emailsCount];
  //     try {
  //       const result = await dispatch(getCustomerEmailsCountThunk({customer_id: id})).unwrap();
  //       console.log("result...", result?.emaillist?.length);
  //       // return result?.emaillist?.length || 0;
  //       newEmailCounts[index] = result?.emaillist?.length;
  //       setEmailsCount(newEmailCounts);
  //     } catch (error) {
  //       newEmailCounts[index] = 0;
  //       setEmailsCount(newEmailCounts);
  //     }
  //   }
  // };

  // console.log({country, state});
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
      }
    };
    axios(config)
      .then(res => {
        setCountries(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
      })
  }, []);

  useEffect(() => {
    if(filters2?.country !== "") {
      const data = countries?.find(country => country?.name === filters2?.country)
      setCountry(data)
    } else {
      setCountry({})
    }
  }, [countries, filters2?.country]);
  
  useEffect(() => {
    if(country?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setStates(res.data);
      })
      .catch(err => {
        setStates([]);
        console.log("error...", err);
      })
    } else {
      setStates([]);
    }
  }, [country]);

  useEffect(() => {
    const findAvailableStates = async() => {
      if(states?.length > 0 && regionList?.length > 0) {
        const data = [];
        await regionList?.forEach(element => {
          states?.find(item => {
            if(item?.name === element) {
              data.push(item?.name)
            } else {
              return;
            }
          })
        })
        setAvailableStates(data)
      } else {
        setAvailableStates([]);
      }
    }

    findAvailableStates();
  }, [states, regionList])

  const getCountryList = async() => {
    try {
      const countries = await dispatch(getCountryListThunk()).unwrap();
      setCountryList(countries?.countrylist);
    } catch (error) {
      console.log("Error on token")
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
  
  const handleClickOutOfDomain = e => {
    if(domainRef.current && !domainRef.current.contains(e.target)){
      setIsDomainDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutOfDomain);
    return() => {
      document.removeEventListener('mousedown', handleClickOutOfDomain);
    };
  }, []);

  useEffect(() => {
    if(domainList?.length > 0 && domain !== "") {
      setIsDomainDropdownOpen(true);
    }
  }, [domainList, domain]);

  const handleFilterChange = (e) => {
    setFilters2({
      ...filters2,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterCountryChange = (e) => {
    setFilters2({
      ...filters2,
      country: e.target.value,
      state_name: ""
    });
  };

  const handleSetFilter = () => {
    setFilters({
      ...filters,
      country: filters2?.country,
      state_name: filters2?.state_name,
      authentication: filters2?.authentication == "true" ? true : filters2?.authentication == "false" ? false: "",
      license_usage: filters2?.license_usage === "" ? "" : Number(filters2?.license_usage),
      subscritption_date: filters2?.subscritption_date,
      renewal_date: filters2?.renewal_date
    })
  }

  const handleAuthorizeChange = async(item) => {
    const customerAuthentication = item?.authentication;
    // console.log(item);
    const newCustomerAuthentication = !customerAuthentication;
    try {
      const result = await dispatch(editCustomerThunk({
        first_name: item?.first_name,
        last_name: item?.last_name,
        address: item?.address,
        state: item?.state,
        city: item?.city,
        country: item?.country,
        zipcode: item?.zipcode,
        phone_no: item?.phone_no,
        email: item?.email,
        authentication: newCustomerAuthentication,
        record_id: item?.id,
        account_status: item?.account_status
      })).unwrap();
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
    const newAccountStatus = `${
      accountStatus == "active" ? "inactive"
      : accountStatus == "suspended" ? "suspended"
      : "active"
    }`;
    try {
      const result = await dispatch(
        editCustomerThunk({
          first_name: item?.first_name,
          last_name: item?.last_name,
          address: item?.address,
          state: item?.state,
          city: item?.city,
          country: item?.country,
          zipcode: item?.zipcode,
          phone_no: item?.phone_no,
          email: item?.email,
          authentication: item?.authentication,
          record_id: item?.id,
          account_status: newAccountStatus
        })
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
    {name: "checkbox", label: ""},
    {name: "profile_id", label: "Customer ID",},
    {name: "name", label: "Name",},
    {name: "product", label: "Product",},
    {name: "domain", label: "Domain",},
    {name: "plan", label: "Subscription Plan",},
    {name: "license_usage", label: "License Usage",},
    {name: "createdAt", label: "Create Date",},
    {name: "payment_cycle", label: "Payment Cycle",},
    {name: "next_payment", label: "Renewal Date",},
    {name: "authentication", label: "Make Authorization",},
    {name: "account_status", label: "Status",},
    {name: "action", label: "Action",},
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
        cancelCustomerSubscriptionThunk({record_id: item?.id})
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
        declineCustomerSubscriptionThunk({record_id: item?.id})
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
        deleteCustomerThunk({record_id: item?.id})
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
        suspendCustomerThunk({record_id: item?.id})
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
    // console.log('transfer');
  };
  
  function convertToDate(seconds:any, nanoseconds:any) {
    const milliseconds = (parseInt(seconds) * 1000) + (parseInt(nanoseconds) / 1e6);
    const newDate = new Date(milliseconds);
    // if(newDate === )
    // console.log(newDate);
    if(newDate == "Invalid Date") {
      return "Invalid Date"
    } else {
      return format(newDate, 'dd MMM yyyy');
    }
    // convertToDate(item?.createdAt?._seconds, item?.createdAt?._nanoseconds) === "Invalid Date" ? "N/A" : format(convertToDate(item?.createdAt?._seconds, item?.createdAt?._nanoseconds), 'dd MMM yyyy')}
  };

  const renewalDate = (item) => {
    if(item?.workspace) {
      return convertToDate(item?.workspace?.next_payment?._seconds, item?.workspace?.next_payment?._nanoseconds);
    } else if(item?.domain) {
      return convertToDate(item?.domain_details?.next_payment?._seconds, item?.domain_details?.next_payment?._nanoseconds);
    } else {
      return "N/A";
    }
  }

  const selectAllButton = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);

    if(newSelectAllState) {
      setChecked(currentItems);
      setSelectAllCount(currentItems.length);
    } else {
      setChecked([]);
      setSelectAllCount(0);
    }
  };
  
  useEffect(() => {
    if(selectAllCount === checked?.length && checked?.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [currentItems, selectAllCount, checked]);

  const toggleCheck = (newJson:any) => {
    setChecked((prevChecked) => {
      const isChecked = prevChecked.some((item) => item?.id === newJson?.id);

      if (isChecked) {
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
      if(emails?.length === 0){
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
  };

  return (
    <div
      className="grid grid-cols-1"
    >
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
              cypress-name="customers-add-new"
              disabled={!rolePermissionsSlice?.customer_management?.add ? true : false}
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
              checked={selectAll}
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
              disabled={!rolePermissionsSlice?.customer_management?.send_mail ? true : false}
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex-row-between-responsive py-4 sm:mr-10 max-sm:mr-0">
          <div className="flex flex-col">
            <div
              className="grid grid-cols-1 min-[968px]:grid-cols-2"
            >
              <div className="sm:w-[300px] max-sm:w-full sm:px-4 max-sm:px-0 relative" ref={domainRef}>
                <input
                  list="brow"
                  placeholder="Auto search domain list"
                  className="serach-input"
                  name="domain"
                  onChange={e => {
                    setFilters({
                      ...filters,
                      domain: ""
                    });
                    setDomain(e.target.value);
                  }}
                  value={filters?.domain || domain}
                  onFocus={() => {setIsDomainDropdownOpen(true)}}
                  // onChange={e => {setFilters({
                  //   ...filters,
                  //   domain: e.target.value
                  // })}}
                  // value={filters?.domain}
                />
                {
                  isDomainDropdownOpen && domainList?.length > 0 && (
                    <div
                      className={`absolute flex flex-col py-1 domain-dropdown bg-custom-white rounded-b overflow-y-auto z-10`}
                    >
                      {/* min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] */}
                      {
                        domainList?.filter((history, idx, self) => self?.findIndex(h => h?.domain_name === history?.domain_name) === idx)?.filter(item => item?.domain_name?.toLowerCase()?.includes(domain?.toLowerCase()))?.map((item, index) => {
                          return (
                            <a
                              key={index}
                              className={`font-inter-16px-400 pl-4 py-1 text-black no-underline hover:text-black hover:no-underline ${
                                index != 0 && `border-t border-white break-words`
                              }`}
                              onClick={() => {
                                setDomain("");
                                setIsDomainDropdownOpen(false);
                                setFilters({
                                  ...filters,
                                  domain: item?.domain_name
                                })
                              }}
                            >
                              {item?.domain_name}
                            </a>
                          );
                        })
                      }
                    </div>
                  )
                }
                <ChevronDown className={`absolute top-[9px] right-5 w-5 h-5 pointer-events-none ${isDomainDropdownOpen ? "rotate-180" : ""} transition duration-300`} />
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
                  value={filters?.search_data}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 min-[968px]:grid-cols-2 mt-3 min-[968px]:gap-0 gap-3">
              <DateRangePicker
                range={predefinedRanges}
                placeholder="Select Subscription Date Range"
                style={{ width: '100%', maxWidth: '300px', padding: '0 16px' }}
                onChange={handleSubscriptionRangeChange}
                value={subscriptionRange}
                showHeader={false}
                renderValue={renderValue} // Custom render for the selected value
                calendarSnapping={true}
                cleanable
              />

              <DateRangePicker
                range={predefinedRanges}
                placeholder="Select Renewal Date Range"
                style={{ width: '100%', maxWidth: '300px', padding: '0 16px' }}
                onChange={handleRenewalnRangeChange}
                value={renewalRange}
                showHeader={false}
                renderValue={renderValue} // Custom render for the selected value
                calendarSnapping={true}
                cleanable
              />
            </div>
          </div>
          <div
            className="min-[968px]:mt-0 mt-[27px]"
          >
            <button
              type="button"
              button-name="customers-filter-btn"
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
                    button-name="customers-filter-close"
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
                    button-name="customers-filter-reset"
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
                        onChange={handleFilterCountryChange}
                        value={filters2?.country}
                      >
                        <option selected value="">
                          Select Country/Region
                        </option>
                        {
                          countryList && countryList?.map((country, number) => (
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
                        value={filters2?.state_name}
                      >
                        <option selected value="">
                          Select State
                        </option>
                        {
                          availableStates && availableStates?.map((region, number) => (
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
                        value={filters2?.authentication}
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
                        value={filters2?.license_usage}
                        placeholder="Enter License Usage Value"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row px-4 py-2">
                    {/* <DateRangePicker
                      range={predefinedRanges}
                      placeholder="Select Date Range"
                      style={{ width: '50%', padding: '0 16px', zIndex: '50' }}
                      onChange={handleSubscriptionRangeChange}
                      value={subscriptionRange}
                      showHeader={false}
                      renderValue={renderValue} // Custom render for the selected value
                      calendarSnapping={true}
                      cleanable
                    />

                    <DateRangePicker
                      range={predefinedRanges}
                      placeholder="Select Date Range"
                      style={{ width: '50%', padding: '0 16px' }}
                      onChange={handleRenewalnRangeChange}
                      value={renewalRange}
                      showHeader={false}
                      renderValue={renderValue} // Custom render for the selected value
                      calendarSnapping={true}
                      cleanable
                    /> */}
                    {/* <div className="w-1/2 px-4">
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
                    </div> */}
                  </div>
                </div>

                <div className="flex-row-end pt-8 pb-4 px-8">
                  <div className="flex flex-row">
                    <button
                      type="button"
                      button-name="customers-filter-cancel-btn"
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
                      button-name="customers-filter-search-btn"
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
          <table className="min-w-[1100px] w-full max-h-screen">
            <thead className="h-[53px] thead-css">
              <tr>
                {tableHeads?.map((item, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className="w-[95px] th-css"
                    >
                      <span>{item.label}</span>
                      {
                        //next_payment,createdAt,license_usage,name
                        item?.name === "next_payment"
                        || item?.name === "createdAt"
                        || item?.name === "name"
                        || item?.name === "license_usage"
                        ? <span className="ml-1">
                          <button type="button" onClick={() => {
                            setFilters((prev) => {
                              const newFilData = {
                                ...prev,
                                sortdata: {
                                  sort_text: item?.name,
                                  //next_payment,createdAt,license_usage,name
                                  order: prev?.sortdata?.sort_text === item?.name 
                                    ? prev?.sortdata?.order === "asc" ? "desc" : "asc"
                                    : "asc"
                                }
                              }
                              return newFilData;
                            })
                          }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button>
                        </span> : ""
                      }
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody
              className="h-fit"
            >
              {
                currentItems?.length>0 ?
                currentItems?.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>
                        <input type="checkbox"
                          className="w-3 h-3 border border-black accent-[#12A833]"
                          checked={checked?.some((check) => check?.id === item?.id)}
                          onChange={() => {toggleCheck(item)}}
                        />
                      </td>
                      <td
                        className="td-css"
                      >#{item?.profile_id}</td>
                      <td
                        className="td-css"
                      >
                        <button
                          onClick={() => navigate('/customer-information', { state: {item, filters} })}
                          button-name="go-to-customer-information"
                          className={!rolePermissionsSlice?.customer_management?.edit ? "" : "cursor-pointer text-[#1F86E5] underline"}
                          disabled={!rolePermissionsSlice?.customer_management?.edit ? true : false}
                        >{item?.first_name} {item?.last_name}</button>
                      </td>
                      <td
                        className="td-css w-[180px] items-center justify-center content-center"
                      >
                        {
                          item?.workspace
                          ? item?.domain_details
                            ? "Google workspace + Domain"
                            : "Google workspace"
                          : item?.domain_details
                            ? "Domain"
                            : "N/A"
                        }
                      </td>
                      <td
                        className="td-css"
                      >
                        {
                          item?.domain_details
                          ? item?.domain_details?.domain_name
                            ? item?.domain_details?.domain_name
                            : "N/A"
                          : "N/A"
                        }
                      </td>
                      <td
                        className="td-css"
                      >
                        {
                          item?.workspace
                          ? plansList?.find(plan => plan?.id === item?.workspace?.plan_name_id)
                            ? plansList?.find(plan => plan?.id === item?.workspace?.plan_name_id)?.plan_name
                            : "N/A"
                          : "N/A"
                        }
                      </td>
                      <td
                        className="td-css"
                      >
                        {/* ${getCustomerEmailsCount(item?.id, index)}/ */}
                        {
                          item?.license_usage
                          ? `${item?.license_usage}`
                          : "N/A"
                        }
                      </td>
                      <td
                        className="td-css"
                      >
                        {convertToDate(item?.createdAt?._seconds, item?.createdAt?._nanoseconds)}
                      </td>
                      <td
                        className="td-css"
                      >
                        {
                          item?.workspace
                          ? item?.workspace?.payment_cycle
                          : item?.domain_details
                          ? item?.domain_details?.payment_cycle
                          : "N/A"
                        }
                      </td>
                      <td
                        className="td-css"
                      >
                        {renewalDate(item)}
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
                              disabled={!rolePermissionsSlice?.customer_management?.authorization ? true: false}
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
                            onClick={() => {toggleList(item?.id)}}
                          />
                        </button>

                        {
                          showList === item?.id && (
                            <div
                              className={`absolute right-0 rounded-3xl bg-white border-2 w-[186px] z-10`}
                              ref={listRef}
                            >
                              <ul
                                className="customer-table-more-list"
                              >
                                <li
                                  className={`customer-table-more-list-li ${!rolePermissionsSlice?.customer_management?.edit ? "hidden" : ""}`}
                                >
                                  <a
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
                                    onClick={() => {
                                      navigate('/edit-customer', { state: item});
                                    }}
                                  >Edit Customer</a>
                                </li>
                                <li
                                  className={`customer-table-more-list-li ${!rolePermissionsSlice?.customer_management?.delete ? "hidden" : ""}`}
                                >
                                  <a
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
                                    onClick={() => {
                                      setShowDeleteModal(!showDeleteModal);
                                      setCommonModal(true);
                                    }}
                                  >Delete Customer</a>
                                </li>
                                <li
                                  className={`customer-table-more-list-li ${!rolePermissionsSlice?.customer_management?.login ? "hidden" : ""}`}
                                >
                                  <a
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
                                    onClick={() => {handleLoginAsCustomer(item?.email)}}
                                  >Login as Customer</a>
                                </li>
                                <li
                                  className="customer-table-more-list-li"
                                >
                                  <a
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
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
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
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
                                    className="cursor-pointer text-black no-underline hover:text-black hover:no-underline"
                                  >Transfer Account</a>
                                </li>
                              </ul>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  );
                }) :
                <tr>
                  <td colSpan={13} className="font-inter font-normal text-base opacity-60 text-center">No data available</td>
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
      </div>
    </div>
  );
}

export default CustomerManagement;