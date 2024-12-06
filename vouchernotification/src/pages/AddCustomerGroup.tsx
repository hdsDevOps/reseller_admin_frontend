import { ChevronDown, MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './countryList-2.css';
import { useAppDispatch } from 'store/hooks';
import { getSubscriptonPlansListThunk, addCustomerGroupThunk, getCountryListThunk, getRegionListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomerGroup: React.FC = () =>  {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  
  const [customerGroup, setCustomerGroup] = useState({
    group_name: "",
    country: "",
    region: "",
    plan: "",
    start_date: "",
    end_date: "", 
    license_usage: "", 
    no_customer: "",
  });
  // console.log(customerGroup);

  const updateCustomerGroup = (e) => {
    setCustomerGroup({
      ...customerGroup,
      [e.target.name]: e.target.value
    });
  };

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
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
    {label: 'Start Date', placeholder: 'Select start date', type: 'date', name: 'start_date'},
    {label: 'End Date', placeholder: 'Select end date', type: 'date', name: 'end_date'},
    {label: 'License Usage', placeholder: 'Select number  ', type: 'number', name: 'license_usage'},
    {label: 'Number of customer', placeholder: 'Auto-filled', type: 'number', name: 'no_customer'},
  ];

  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);

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
      const result = await dispatch(
        getSubscriptonPlansListThunk()
      ).unwrap()
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

  const dateToIsoString = (date) => {
    const newDate = new Date(date);
    const isoDate = newDate.toISOString().split('T')[0];
    return isoDate;
  };

  const submit = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        addCustomerGroupThunk(customerGroup)
      ).unwrap()
      toast.success(result?.message);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      toast.error("Error adding customer group");
    }
  }
  return (
    <div>
      <ToastContainer />
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
        >Add Customer Group</h3>
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
                    >
                      <option hidden selected value='' className=''>{item.placeholder}</option>
                      {
                        subscriptionPlans.length> 0 && subscriptionPlans?.map((subscription, idx) => (
                          <option key={idx} value={subscription?.plan_name} className='text-black'>{subscription?.plan_name}</option>
                        ))
                      }
                    </select>

                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                  </div>
                )
              }
              else if(item.name == 'country'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className={`search-select-text font-inter font-medium appearance-none ${customerGroup?.country == "" ? 'text-[#00000038]' : 'text-black'}`}
                      onChange={updateCustomerGroup}
                      name='country'
                    >
                      <option selected hidden>Select Country</option>
                      {
                        countryList && countryList.map((country, number) => (
                          <option key={number} value={country} className='text-black'>{country}</option>
                        ))
                      }
                    </select>

                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                    {/* <div
                      className='search-input-text focus:outline-none w-full h-full p-0'
                    >
                      <CountrySelect
                        onChange={(e) => {
                          setCustomerGroup({
                            ...customerGroup,
                            country: e.name
                          });
                          setCountryid(e.id);
                        }}
                        placeHolder={item?.placeholder}
                      />
                    </div> */}
                  </div>
                )
              }
              else if(item.name == 'region'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className={`search-select-text font-inter font-medium appearance-none ${customerGroup?.country == "" ? 'text-[#00000038]' : 'text-black'}`}
                      onChange={updateCustomerGroup}
                      name='country'
                    >
                      <option selected hidden>Select Country</option>
                      {
                        regionList && regionList.map((region, number) => (
                          <option key={number} value={region} className='text-black'>{region}</option>
                        ))
                      }
                    </select>
                    <ChevronDown className='float-right -mt-8 ml-auto mr-[7px] w-[20px] pointer-events-none' />
                    {/* <StateSelect
                      countryid={countryid}
                      onChange={(e) => {
                        setCustomerGroup({
                          ...customerGroup,
                          region: e.name
                        });
                        setstateid(e.id);
                      }}
                      placeHolder={item?.placeholder}
                    /> */}
                  </div>
                )
              }
              else if(item.name == 'start_date'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
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
                    />
                  </div>
                )
              }else if(item.name == 'end_date'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                    key={index}
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
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
                    />
                  </div>
                )
              }
              else if(item.type == 'number'){
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
                      onChange={updateCustomerGroup}
                    />
                  </div>
                )
              }
              else{
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
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomerGroup;