import { ChevronDown, MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './countryList.css';
import { useAppDispatch } from 'store/hooks';
import { getSubscriptonPlansListThunk, editCustomerGroupThunk, getCountryListThunk, getRegionListThunk, removeUserAuthTokenFromLSThunk, getCustomerCountThunk, getPlansAndPricesThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
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

const EditCustomerGroup: React.FC = () =>  {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  
  const [customerGroup, setCustomerGroup] = useState(location.state);
  console.log(customerGroup);
  const [customerCount, setCustomerCount] = useState<number>(parseInt(location.state.no_customer));
  const [range, setRange] = useState<[Date | null, Date | null]|null>(
    location.state.start_date === "" && location.state.end_date === ""
    ? null
    : [
      location.state.start_date === "" ? null : new Date(location.state.start_date),
      location.state.end_date === "" ? null : new Date(location.state.end_date)
    ]
  );
    
  const handleChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  useEffect(() => {
    if(customerGroup?.plan === "") {
      setRange(null);
    }
  }, [customerGroup?.plan]);

  useEffect(() => {
    if(range === null) {
      setCustomerGroup({
        ...customerGroup,
        start_date: "",
        end_date: "",
      });
    } else {
      setCustomerGroup({
        ...customerGroup,
        start_date: `${range[0] === null ? "" : format(range[0], "yyyy-MM-dd")}`,
        end_date: `${range[1] === null ? "" : format(range[1], "yyyy-MM-dd")}`,
      });
    }
  }, [range]);
  
  const updateCustomerGroup = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerGroup({
      ...customerGroup,
      [e.target.name]: e.target.value
    });
  };

  const updateCustomerGroupCountry = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerGroup({
      ...customerGroup,
      country: e.target.value,
      region: ""
    });
  };
  
  const updateCustomerGroupLicenseUsage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if(value >= 0) {
      setCustomerGroup({
        ...customerGroup,
        license_usage: value
      });
    } else {
      setCustomerGroup({
        ...customerGroup,
        license_usage: 0
      });
    }
  };

  const [endDateEnable, setEndDateEnable] = useState(true);
  useEffect(() => {
    if(customerGroup?.start_date != ""){
      setEndDateEnable(false);
    }
    else{
      setEndDateEnable(true);
    }
  }, [customerGroup?.start_date]);

  const formList = [
    {label: 'Group name', placeholder: 'Enter group name', type: 'text', name: 'group_name'},
    {label: 'Country', placeholder: 'Select country', type: 'select', name: 'country'},
    {label: 'State/Region', placeholder: 'Select State/Region', type: 'select', name: 'region'},
    {label: 'Subscription Plan', placeholder: 'Select a plan', type: 'select', name: 'plan'},
    {label: 'Expiry Dare Range', placeholder: '', type: '', name: 'expiry'},
    // {label: 'End Date', placeholder: 'Select end date', type: 'date', name: 'end_date'},
    {label: 'License Usage', placeholder: 'Select number  ', type: 'number', name: 'license_usage'},
    {label: 'Number of customer', placeholder: 'Auto-filled', type: 'number', name: 'no_customer'},
  ];

  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  // console.log({countries, states});
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
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
    setCountry(countries?.find(name => name?.name.toLowerCase() === customerGroup?.country.toLowerCase()) || {})
  }, [countries, customerGroup?.country]);

  useEffect(() => {
    const findStates = async() => {
      const data = [];
      await regionList.forEach(element => {
        states?.find(name => name?.name.toLowerCase() === element.toLowerCase() ? data.push(name) : null)
      });
      setAvailableStates(data);
    };

    findStates();
  }, [regionList, states]);

  const getCountryList = async() => {
    try {
      const countries = await dispatch(
        getCountryListThunk()
      ).unwrap();
      setCountryList(countries.countrylist);
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

  const getSubscriptonPlansList = async() => {
    try {
      const result = await dispatch(getPlansAndPricesThunk({last_order: ""})).unwrap()
      setSubscriptionPlans(result?.data);
    } catch (error) {
      setSubscriptionPlans([]);
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
    getSubscriptonPlansList();
  }, []);

  useEffect(() => {
    if(customerGroup?.start_date === "") {
      setCustomerGroup({
        ...customerGroup,
        end_date: ""
      })
    }
  }, [customerGroup?.start_date]);
  
  const getCustomerCount = async() => {
    try {
      const result = await dispatch(getCustomerCountThunk({
        country: customerGroup?.country,
        state_name: customerGroup?.region,
        plan: customerGroup?.plan,
        start_date: customerGroup?.start_date,
        end_date: customerGroup?.end_date,
        license_usage: customerGroup?.license_usage
      })).unwrap();
      setCustomerCount(parseInt(result?.customer_count));
    } catch (error) {
      setCustomerCount(0);
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
    getCustomerCount();
  }, [customerGroup?.country, customerGroup?.region, customerGroup?.plan, customerGroup?.start_date, customerGroup?.end_date, customerGroup?.license_usage]);

  useEffect(() => {
    setCustomerGroup({
      ...customerGroup,
      no_customer: customerCount
    })
  }, [customerCount]);

  const dateToIsoString = (date) => {
    const newDate = new Date(date);
    const isoDate = newDate.toISOString().split('T')[0];
    return isoDate;
  };

  const validateForm = () => {
    // Check for spaces only in any field
    for (const key in customerGroup) {
      if (customerGroup[key].trim() === '') {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const submit = async(e) => {
    e.preventDefault();
   if(validateForm()) {
    try {
      const result = await dispatch(
        editCustomerGroupThunk({
          group_name: customerGroup?.group_name,
          country: customerGroup?.country,
          region: customerGroup?.region,
          plan: customerGroup?.plan,
          start_date: customerGroup?.start_date,
          end_date: customerGroup?.end_date,
          license_usage: customerGroup?.license_usage,
          no_customer: customerGroup?.no_customer,
          record_id: customerGroup?.record_id
        })
      ).unwrap()
      toast.success(result?.message);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      toast.error(error?.message || "Error adding customer group");
    }
   } else {
    toast.warning("Spaces cannot be empty");
   }
  }
  return (
    <div>
      <div
        className='flex flex-row mb-20'
      >
        <a
          className='cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
        >
          <MoveLeft
            className='h-[20px] text-black mt-[7px]'
          />
        </a>
        <h3
          className='h3-text ml-[10px]'
        >Edit Customer Group</h3>
      </div>

      <form onSubmit={submit}>
        <div
          className='grid grid-cols-1 sm:grid-cols-2'
        >
          {
            formList && formList.map((item, index) => {
              if(item.name == 'plan'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className={`search-select-text font-inter font-medium appearance-none ${customerGroup?.plan == "" ? 'text-[#00000038]' : 'text-black'}`}
                      name='plan'
                      onChange={updateCustomerGroup}
                      value={customerGroup?.plan}
                    >
                      <option selected value='' className=''>{item.placeholder}</option>
                      {
                        subscriptionPlans.length> 0 && subscriptionPlans?.map((subscription, idx) => (
                          <option key={idx} value={subscription?.id} className='text-black'>{subscription?.plan_name}</option>
                        ))
                      }
                    </select>

                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                  </div>
                )
              } else if(item.name === 'country'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className={`search-select-text font-inter font-medium appearance-none ${customerGroup?.country == "" ? 'text-[#00000038]' : 'text-black'}`}
                      onChange={updateCustomerGroupCountry}
                      name='country'
                      value={customerGroup?.country}
                    >
                      <option selected value="">Select Country</option>
                      {
                        
                        countryList && countryList.map((country, number) => (
                          <option key={number} value={country} className='text-black'>{country}</option>
                        ))
                      }
                    </select>

                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                  </div>
                )
              } else if(item.name === 'region'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className={`search-select-text font-inter font-medium appearance-none ${customerGroup?.region == "" ? 'text-[#00000038]' : 'text-black'}`}
                      onChange={updateCustomerGroup}
                      name='region'
                      value={customerGroup?.region}
                    >
                      <option selected value="" className='text-[#00000038]'>{item.placeholder}</option>
                      {
                        availableStates && availableStates?.map((region, number) => (
                          <option key={number} value={region?.name} className='text-black'>{region?.name}</option>
                        ))
                      }
                    </select>
                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                  </div>
                )
              } else if(item.name === 'expiry'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    {/* <input
                      type='text'
                      onFocus={e => {
                        e.target.type='date'
                      }}
                      onBlur={e => {
                        e.target.type='text'
                      }}
                      placeholder={item.placeholder}
                      name={item.name}
                      className='search-input-text px-4'
                      onChange={updateCustomerGroup}
                      disabled={endDateEnable}
                      min={customerGroup?.start_date == "" ? dateToIsoString(new Date()) : dateToIsoString(new Date(customerGroup?.start_date)) }
                      required={customerGroup?.start_date !== "" ? true : false}
                      value={customerGroup?.end_date}
                    /> */}
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
                      disabled={customerGroup?.plan === "" ? true : false}
                    />
                  </div>
                )
              } else if(item.name === 'license_usage'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type='number'
                      placeholder={item.placeholder}
                      name={item.name}
                      className='search-input-text px-4'
                      onChange={updateCustomerGroupLicenseUsage}
                      value={customerGroup?.license_usage}
                    />
                  </div>
                )
              } else if(item.name === 'no_customer'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type='number'
                      placeholder={item.placeholder}
                      name={item.name}
                      className='search-input-text px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      disabled
                      value={customerCount}
                    />
                  </div>
                )
              } else{
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type={item.type}
                      placeholder={item.placeholder}
                      name={item.name}
                      required
                      className='search-input-text px-4'
                      onChange={updateCustomerGroup}
                      value={customerGroup[item.name]}
                    />
                  </div>
                )
              }
            })
          }
        </div>
        <div
          className='mt-4 flex flex-row max-sm:justify-center mb-3 sm:ml-2'
        >
          <button
            className='btn-green-2 h-[46px]'
            type='submit'
          >Save</button>
          <button
            type='button'
            className='btn-red h-[46px] ml-[30px]'
            onClick={() => {setCustomerGroup(location.state)}}
          >Cancel</button>
        </div>
      </form>
    </div>
  )
};

export default EditCustomerGroup;