import { MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './countryList.css';
import { useAppDispatch } from 'store/hooks';
import { getSubscriptonPlansListThunk, editCustomerGroupThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomerGroup: React.FC = () =>  {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  
  const [customerGroup, setCustomerGroup] = useState(location.state);
  console.log(customerGroup);

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
                      className='search-select-text'
                      name='plan'
                      onChange={updateCustomerGroup}
                    >
                      <option value="" hidden selected={customerGroup?.plan == "" ? true : false}>Select plan</option>
                      {
                        subscriptionPlans.length> 0 && subscriptionPlans?.map((subscription, idx) => (
                          <option key={idx} value={subscription?.plan_name} selected={subscription?.plan_name == customerGroup?.plan ? true : false}>{subscription?.plan_name}</option>
                        ))
                      }
                    </select>
                  </div>
                )
              }
              else if(item.name == 'country'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <div
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
                        placeHolder={customerGroup?.country || 'Select country'}
                      />
                    </div>
                  </div>
                )
              }
              else if(item.name == 'region'){
                return(
                  <div className='flex flex-col px-2 mb-2' key={index}>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <div
                      className='search-input-text focus:outline-none w-full h-full p-0'
                    >
                      <StateSelect
                        countryid={countryid}
                        onChange={(e) => {
                          setCustomerGroup({
                            ...customerGroup,
                            region: e.name
                          });
                          setstateid(e.id);
                        }}
                        placeHolder={customerGroup?.region || 'Select State/Region'}
                      />
                    </div>
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
                      defaultValue={customerGroup?.start_date}
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
                      defaultValue={customerGroup?.end_date}
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
                      defaultValue={customerGroup[item?.name]}
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
                      defaultValue={customerGroup[item?.name]}
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
};

export default EditCustomerGroup;