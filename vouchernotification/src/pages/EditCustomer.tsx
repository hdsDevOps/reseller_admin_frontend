import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import Flag from 'react-world-flags'; // Flag component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editCustomerThunk } from 'store/user.thunk';
import { useAppDispatch } from 'store/hooks';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './countryList.css';
import { CountryList } from '../components/CountryList';
import 'react-toastify/dist/ReactToastify.css';

function EditCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const flagRef = useRef(null);
  const dispatch = useAppDispatch();
  
  const [customer, setCustomer] = useState(location.state);
  console.log(customer);
  const [phoneNumber,setPhoneNumber] = useState();
  const [phoneCode,setPhoneCode] = useState('+1');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  useEffect(() => {
    setCustomer({
      ...customer,
      phone_no: `${phoneCode}${phoneNumber}`
    })
  }, [phoneNumber, phoneCode]);
  
  const updateCustomer = e => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    })
  };

  const formList = [
    {label: 'First name', type: 'text', name: 'first_name', placeholder: 'Enter the first name',},
    {label: 'Last name', type: 'text', name: 'last_name', placeholder: 'Enter the last name',},
    {label: 'Street Address', type: 'text', name: 'address', placeholder: 'Enter the street address',},
    {label: 'Country/Region', type: 'text', name: 'country', placeholder: 'Select the Country/Region',},
    {label: 'State/Territory', type: 'text', name: 'state_name', placeholder: 'Select the State/Territory',},
    {label: 'City', type: 'text', name: 'city', placeholder: 'Enter the city name',},
    {label: 'Zip code', type: 'number', name: 'zipcode', placeholder: 'Enter the zipcode',},
    {label: 'Business phone number', type: 'number', name: 'phone_no', placeholder: '0000000000',},
    {label: 'Email address', type: 'email', name: 'email', placeholder: 'Enter the email address',},
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  const currencyOptions = [
    { code: "US", label: "United States", value: '+1' },
    { code: "EU", label: "Europe", value: '011' },
    { code: "AU", label: "Australia", value: '+61' },
    { code: "NG", label: "Nigeria", value: '+234' },
    { code: "GB", label: "United Kingdom", value: '+44' },
    { code: "CA", label: "Canada", value: '+1' },
    { code: "IN", label: "India", value: '+91' },
  ];

  const countryCodes = currencyOptions.map((item) => item?.value);
  
  const [selectedOption, setSelectedOption] = useState<{
    name: string;
    dial_code: string;
    code: string;
  } | { name: "United States", dial_code: '+1', code: "US" }>({ name: "United States", dial_code: '+1', code: "US" });

  useEffect(() => {
    if(customer?.country != ''){
      const data = CountryList.find(item => item.name === customer?.country);
      setSelectedOption(data);
      setPhoneCode(data?.dial_code);
    }
    else{
      setSelectedOption({ name: "United States", dial_code: '+1', code: "US" });
      setPhoneCode('+1');
    }
  }, [customer?.country])

  useEffect(() => {
    const phoneNo = customer?.phone_no;
    if(phoneNo){
      for(const { dial_code } of CountryList){
        if(phoneNo.startsWith(dial_code)){
          const nationalNumber = phoneNo.slice(dial_code.length);
          console.log(nationalNumber, '96')
          setPhoneNumber(parseInt(nationalNumber));
          setPhoneCode(dial_code);
          return;
        }
      }
    }
  }, []);

  const handleOptionClick = (option: { name: string; dial_code: string; code: string; }) => {
    setSelectedOption(option);
    setIsOpen(false);
    setPhoneCode(option?.dial_code)
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

  const submit = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        editCustomerThunk(customer)
      ).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error("Error")
    } finally {
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };
  
  return (
    <div
      className='flex flex-col px-2'
    >
      <ToastContainer />
      <div
        className='flex flex-row'
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
        >Customer Information</h3>
      </div>

      <div
        className='flex flex-row mt-5 h-[22px]'
      >
        <p
          className='page-indicator-1'
        >Customer Managemnet</p>
        <ChevronRight
          className='page-indicator-arrow'
        />
        <p
          className='page-indicator-2'
        >Edit Customer</p>
      </div>

      <div
        className='mt-14 border-custom-white rounded-10px p-[10px]'
      >
        <div>
        <form
            onSubmit={submit}
          >
            <div
            // grid-cols-2 max-[546px]:grid-cols-1
              className='grid grid-cols-2 max-[666px]:grid-cols-1 font-inter '
            >
              {
                formList?.map((item, index) => {
                  if(item.name == 'phone_no'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <div
                          key={index}
                          className="search-input-text flex flex-row"
                        >
                          <div
                            className='w-[60px] flex flex-col'
                          >
                            <div className="relative w-[40px] h-full flex mx-auto items-center justify-between border-0 cursor-pointer"
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              <Flag code={selectedOption?.code} style={{width: '30px', margin: 'auto'}} />
                            </div>
                          </div>
                          <p
                            className='w-fit my-auto mx-1'
                          >{selectedOption?.dial_code}</p>
                          <input
                            type='number'
                            className='w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            onChange={e => {
                              setPhoneNumber(parseInt(e.target.value))
                            }}
                            placeHolder={item?.placeholder}
                            defaultValue={phoneNumber}
                          />
                        </div>
                      </div>
                    )
                  }
                  else if(item.name == 'state_name'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <div
                          className='search-input-text focus:outline-none w-full h-full p-0'
                        >
                          <StateSelect
                            countryid={countryid}
                            onChange={(e) => {
                              setCustomer({
                                ...customer,
                                state_name: e.name
                              });
                              setstateid(e.id);
                            }}
                            placeHolder={customer?.state_name}
                          />
                        </div>
                      </div>
                    )
                  }
                  else if(item.name == 'country'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <div
                          className='search-input-text focus:outline-none w-full h-full p-0'
                        >
                          <CountrySelect
                            onChange={(e) => {
                              setCustomer({
                                ...customer,
                                country: e.name
                              });
                              setCountryid(e.id);
                            }}
                            placeHolder={customer?.country}
                          />
                        </div>
                      </div>
                    )
                  }
                  else if(item.name == 'city'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <div
                          className='search-input-text focus:outline-none w-full h-full p-0'
                        >
                          <CitySelect
                            countryid={countryid}
                            stateid={stateid}
                            onChange={(e) => {
                              setCustomer({
                                ...customer,
                                city: e.name
                              })
                            }}
                            placeHolder={customer?.city}
                          />
                        </div>
                      </div>
                    )
                  }
                  else{
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <input
                          type={item.type}
                          placeholder={item.label}
                          name={item.name}
                          required
                          className='search-input-text'
                          onChange={updateCustomer}
                          defaultValue={customer[item.name]}
                        />
                      </div>
                    )
                  }
                })
              }
            </div>

            <div
              className='mt-[30px] flex'
            >
              <h5
                className='h5-text-no-uppercase'
              >Authorization</h5>
              <div className="transition-transform duration-1000 ease-in-out flex justify-center ml-5 mt-[3px]">
                {/* {notificationToggle()} */}
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={customer?.authentication}
                    onClick={() => {
                      if(customer?.authentication == undefined){
                        setCustomer({
                          ...customer,
                          authentication: true
                        });
                      }
                      else{
                        setCustomer({
                          ...customer,
                          authentication: !customer.authentication
                        });
                      }
                      console.log(customer?.authentication);
                    }}
                  />
                  <div
                    className="w-[45px] h-[20px] flex items-center bg-gray-300 rounded-full text-[7px] peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['OFF'] peer-checked:after:content-['ON'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-5 after:transition-all peer-checked:bg-[#00D13B]">
                  </div>
                </label>
              </div>
            </div>

            <div
              className='mt-4 flex flex-row max-[666px]:justify-center mb-3'
            >
              <button
                className='btn-green-2 h-[46px]'
              >Save</button>
              <button
                type='button'
                className='btn-red h-[46px] ml-[30px]'
                onClick={() => {
                  setCustomer({
                    fname: '',
                    lname: '',
                    street: '',
                    state: '',
                    city: '',
                    country: '',
                    zipCode: '',
                    phone: '',
                    email: '',
                    makeAuthorization: false
                  });
                }}
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCustomer