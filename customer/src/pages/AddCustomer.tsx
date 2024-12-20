import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'
import Flag from 'react-world-flags'; // Flag component
import { useAppDispatch } from 'store/hooks';
import { addCustomerThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './countryList-2.css';
import { CountryList } from '../components/CountryList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City }  from 'country-state-city';
import axios from 'axios';

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    address: '',
    state_name: '',
    city: '',
    country: '',
    zipcode: '',
    phone_no: '',
    email: '',
    authentication: false
  });
  console.log("customer...", customer);
  
  const flagRef = useRef(null);
  const [phoneNumber,setPhoneNumber] = useState();
  const [phoneCode,setPhoneCode] = useState('+1');
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  // console.log("countries...", countries);
  // console.log("states...", states);
  // console.log("cities...", cities);
  // console.log({countryName, stateName, cityName})
  
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

  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {headers: {
        "Accept": "application/json",
        "api-token": "AtAMX2sSL0P0xiNSJ5gEmgL9uNc9MH31bPRqvD4dlqQvl9KEfHiAjzJUYjrbDLdAS6Q",
        "user-email": "hesham.reza@schemaphic.com"
      }})
      .then(res => {
        axios
          .get("https://www.universal-tutorial.com/api/countries/", { headers: {
            "Authorization": `Bearer ${res.data.auth_token}`,
            "Accept": "application/json"
          }})
          .then(response => {
            setCountries(response.data);
          })
          .catch(error => {
            setCountries([]);
            console.log("error...", error);
          })
      })
      .catch(err => {
        console.log("err...", err);
      })
  }, []);
  
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {headers: {
        "Accept": "application/json",
        "api-token": "AtAMX2sSL0P0xiNSJ5gEmgL9uNc9MH31bPRqvD4dlqQvl9KEfHiAjzJUYjrbDLdAS6Q",
        "user-email": "hesham.reza@schemaphic.com"
      }})
      .then(res => {
        if(customer?.country !== ""){
          axios
          .get(`https://www.universal-tutorial.com/api/states/${customer?.country}`, { headers: {
            "Authorization": `Bearer ${res.data.auth_token}`,
            "Accept": "application/json"
          }})
          .then(response => {
            setStates(response.data);
          })
          .catch(error => {
            setStates([]);
            console.log("error...", error);
          })
        } else {
          setStates([]);
        }
      })
      .catch(err => {
        console.log("err...", err);
      })
  }, [customer]);
  
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {headers: {
        "Accept": "application/json",
        "api-token": "AtAMX2sSL0P0xiNSJ5gEmgL9uNc9MH31bPRqvD4dlqQvl9KEfHiAjzJUYjrbDLdAS6Q",
        "user-email": "hesham.reza@schemaphic.com"
      }})
      .then(res => {
        if(customer?.state_name !== ""){
          axios
          .get(`https://www.universal-tutorial.com/api/cities/${customer?.state_name}`, { headers: {
            "Authorization": `Bearer ${res.data.auth_token}`,
            "Accept": "application/json"
          }})
          .then(response => {
            setCitites(response.data);
          })
          .catch(error => {
            setCitites([]);
            console.log("error...", error);
          })
        } else {
          setCitites([]);
        }
      })
      .catch(err => {
        console.log("err...", err);
      })
  }, [customer]);

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

  const validateForm = () => {
    // Check for spaces only in any field
    for (const key in customer) {
      if (customer[key].trim() === '') {
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
          addCustomerThunk(customer)
        ).unwrap();
        toast.success(result?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        toast.error("Error adding customer");
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    } else {
      toast.error("Spaces cannot be empty");
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
        >Add Customer</h3>
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
        >Add Customer</p>
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
              className='grid grid-cols-2 max-[666px]:grid-cols-1 font-inter'
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
                            placeholder={item?.placeholder}
                          />
                        </div>
                      </div>
                    )
                  }
                  else if(item.name == 'country'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <input
                          className='search-input-text relative focus:outline-none w-full h-full p-0'
                          type='text'
                          placeholder={item?.placeholder}
                          name='country'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              country: e.target.value,
                              state_name: '',
                              city: ''
                            });
                            setCountryName(e.target.value);
                            setStateName("");
                            setCityName("");
                          }}
                          value={customer?.country}
                        />
                        {
                          countryName?.length>2 && (
                            <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                              {
                                countries?.filter(name => name?.country_name.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    dropdown-name="country-dropdown"
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        country: country?.country_name
                                      });
                                      setCountryName("");
                                      setStateName("");
                                      setCityName("");
                                    }}
                                  >{country?.country_name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  else if(item.name == 'state_name'){
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <input
                          type='text'
                          className='search-input-text focus:outline-none w-full h-full p-0'
                          placeholder={item?.placeholder}
                          name='state_name'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              state_name: e.target.value,
                              city: ""
                            });
                            setStateName(e.target.value);
                            setCityName("");
                          }}
                          value={customer?.state_name}
                        />
                        {
                          stateName?.length>2 && (
                            <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                              {
                                states?.filter(name => name?.state_name.toLowerCase().includes(stateName.toLowerCase())).map((state, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        state_name: state?.state_name,
                                        city: ""
                                      });
                                      setStateName("");
                                      setCityName("");
                                    }}
                                  >{state?.state_name}</p>
                                ))
                              }
                            </div>
                          )
                        }
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
                        <input
                          type='text'
                          className='search-input-text focus:outline-none w-full h-full p-0'
                          placeholder={item?.placeholder}
                          name='city'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              city: e.target.value
                            });
                            setCityName(e.target.value);
                          }}
                          value={customer?.city}
                        />
                        {
                          cityName?.length>2 && (
                            <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                              {
                                cities?.filter(name => name?.city_name.toLowerCase().includes(cityName.toLowerCase())).map((city, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        city: city?.city_name
                                      });
                                      setCityName("");
                                    }}
                                  >{city?.city_name}</p>
                                ))
                              }
                            </div>
                          )
                        }
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
                          name={item.name}
                          required
                          className='search-input-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          onChange={updateCustomer}
                          placeholder={item?.placeholder}
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
                      setCustomer({
                        ...customer,
                        authentication: !customer.authentication
                      })
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
                    first_name: '',
                    last_name: '',
                    address: '',
                    state_name: '',
                    city: '',
                    country: '',
                    zipcode: '',
                    phone_no: '',
                    email: '',
                    authentication: false
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

export default AddCustomer