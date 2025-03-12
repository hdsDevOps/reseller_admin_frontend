import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'
import Flag from 'react-world-flags'; // Flag component
import { useAppDispatch } from 'store/hooks';
import { addCustomerThunk, hereMapSearchThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const hereRef = useRef(null);
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    address: '',
    state: '',
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
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // console.log({country, state, city});
  // console.log("countries...", countries);
  // console.log("states...", states);
  // console.log("cities...", cities);
  // console.log({countryName, stateName, cityName});
  const [hereData, setHereData] = useState<object|null>(null);
  const [hereList, setHereList] = useState([]);
  const [hereSearch, setHereSearch] = useState("");
  const [isHereDropdownOpen, setIsHereDropdownOpen] = useState<Boolean>(false);
  console.log({hereData, hereList, hereSearch});

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  // console.log("isDropdownOpen", isDropdownOpen);
  
  const handleClickOutsideCountry = (event: MouseEvent) => {
    if(countryRef.current && !countryRef.current.contains(event.target as Node)) {
      setCountryDropdownOpen(false);
    }
  };
  const handleClickOutsideState = (event: MouseEvent) => {
    if(stateRef.current && !stateRef.current.contains(event.target as Node)) {
      setStateDropdownOpen(false);
    }
  };
  const handleClickOutsideCity = (event: MouseEvent) => {
    if(cityRef.current && !cityRef.current.contains(event.target as Node)) {
      setCityDropdownOpen(false);
    }
  };
  const handleClickOutsideHere = (event: MouseEvent) => {
    if(hereRef.current && !hereRef.current.contains(event.target as Node)) {
      setIsHereDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCountry);
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    document.addEventListener('mousedown', handleClickOutsideHere);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCountry);
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
      document.removeEventListener('mousedown', handleClickOutsideHere);
    };
  }, []);

  useEffect(() => {
    if(countries.length > 0 && countryName !== "") {
      setCountryDropdownOpen(true);
    }
  }, [countries, countryName]);

  useEffect(() => {
    if(states.length > 0 && stateName !== "") {
      setStateDropdownOpen(true);
    }
  }, [states, stateName]);

  useEffect(() => {
    if(cities.length > 0 && cityName !== "") {
      setCityDropdownOpen(true);
    }
  }, [cities, cityName]);
  
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

  const handlePhoneChange = (value: string) => {
    setCustomer((prevData) => ({ ...prevData, phone_no: value }));
  };
  
  const findHereData = async () => {
    try {
      const result = await dispatch(hereMapSearchThunk({address: hereSearch})).unwrap();
      setHereList(result?.data?.items)
    } catch (error) {
      setHereData([]);
    }
  };

  useEffect(() => {
    if(hereSearch !== "") {
      findHereData();
    }
  }, [hereSearch]);

  useEffect(() => {
    if(hereData !== null) {
      if(countries?.length > 0) {
        const findCountry = countries?.find(item => item?.name?.toLowerCase() === hereData?.address?.countryName?.toLowerCase());
        if(findCountry) {
          setCountry(findCountry);
          setCustomer({
            ...customer,
            address: hereData,
            zipcode: hereData?.address?.postalCode,
            country: findCountry?.name
          });
          if(states?.length > 0) {
            const findState = states?.find(item => item?.name?.toLowerCase() === hereData?.address?.state?.toLowerCase());
            if(findState) {
              setState(findState);
              setCustomer({
                ...customer,
                address: hereData,
                zipcode: hereData?.address?.postalCode,
                country: findCountry?.name,
                state: findState?.name
              });
              if(cities?.length > 0) {
                const findCity = cities?.find(item => item?.name?.toLowerCase() === hereData?.address?.city?.toLowerCase());
                if(findCity) {
                  setCity(findCity);
                  setCustomer({
                    ...customer,
                    address: hereData,
                    zipcode: hereData?.address?.postalCode,
                    country: findCountry?.name,
                    state: findState?.name,
                    city: findCity?.name
                  })
                }
              }
            }
          }
        }
      }
    }
  }, [hereData, countries, states, cities]);

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
    if(country?.iso2 !== undefined && state?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states/${state?.iso2}/cities`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setCitites(res.data);
      })
      .catch(err => {
        setCitites([]);
        console.log("error...", err);
      })
    } else {
      setCitites([]);
    }
  }, [country, state]);

  const formList = [
    {label: 'First name', type: 'text', name: 'first_name', placeholder: 'Enter the first name',},
    {label: 'Last name', type: 'text', name: 'last_name', placeholder: 'Enter the last name',},
    {label: 'Street Address', type: 'text', name: 'address', placeholder: 'Enter the street address',},
    {label: 'Country/Region', type: 'text', name: 'country', placeholder: 'Select the Country/Region',},
    {label: 'State/Territory', type: 'text', name: 'state', placeholder: 'Select the State/Territory',},
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
    if(country?.iso2 != undefined){
      
      setSelectedOption({ name: country?.name, dial_code: `+${country?.phonecode}`, code: country?.iso2 });
      setPhoneCode(`+${country?.phonecode}`);
    }
    else{
      setSelectedOption({ name: "United States", dial_code: '+1', code: "US" });
      setPhoneCode('+1');
    }
  }, [country])

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
        if(customer?.phone_no?.length < 11) {
          return false;
        }
        return true;
      }
    }
    return true;
  };

  const submit = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        const result = await dispatch(addCustomerThunk(customer)).unwrap();
        toast.success(result?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        } else {
          toast.error(error?.message || "Error adding customer");
        }
      }
    } else {
      toast.error("Spaces cannot be empty");
    }
  };
  // hello
  return (
    <div
      className='flex flex-col px-2'
    >
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
                  if(item.name == 'phone_no') {
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2'
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <PhoneInput
                          country={selectedOption?.code?.toLowerCase()}
                          onChange={handlePhoneChange}
                          value={customer?.phone_no}
                          placeholder='00000-00000'
                          inputProps={{
                            required: true,
                            name: 'phone_no'
                          }}
                          containerClass='min-w-full border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] items-center'
                          inputClass="react-tel-input outline-none !w-full bord !border-0 !h-full"
                          dropdownClass="peer"
                          buttonClass="!border-0 !h-full !w-[40px]"
                          cypress-name="phone_no_input"
                        />
                      </div>
                    )
                  } else if(item.name == 'country') {
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                        ref={countryRef}
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
                              country: '',
                              state: '',
                              city: ''
                            });
                            setCountryName(e.target.value);
                            setStateName("");
                            setCityName("");
                            setCountry({});
                            setState({});
                            setCity({});
                          }}
                          value={customer?.country || countryName}
                          required
                          onFocus={() => {setCountryDropdownOpen(true)}}
                          cypress-name="country_input"
                        />
                        {
                          countryDropdownOpen && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute mt-14 bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                countries?.filter(name => name?.name.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    dropdown-name="country-dropdown"
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        country: country?.name
                                      });
                                      setCountryName("");
                                      setStateName("");
                                      setCityName("");
                                      setCountry(country);
                                      setState({});
                                      setCity({});
                                      setCountryDropdownOpen(false);
                                    }}
                                  >{country?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  } else if(item.name == 'state') {
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                        ref={stateRef}
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <input
                          type='text'
                          className='search-input-text focus:outline-none w-full h-full p-0'
                          placeholder={item?.placeholder}
                          name='state'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              state: "",
                              city: ""
                            });
                            setStateName(e.target.value);
                            setCityName("");
                            setState({});
                            setCity({});
                          }}
                          value={customer?.state || stateName}
                          required={states?.length > 0 ? true : false}
                          onFocus={() => {setStateDropdownOpen(true)}}
                          cypress-name="state_input"
                        />
                        {
                          stateDropdownOpen && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute mt-14 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                states?.filter(name => name?.name.toLowerCase().includes(stateName.toLowerCase())).map((region, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        state: region?.name,
                                        city: ""
                                      });
                                      setStateName("");
                                      setCityName("");
                                      setState(region);
                                      setCity({});
                                      setStateDropdownOpen(false);
                                    }}
                                    dropdown-name="state_dropdown"
                                  >{region?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  } else if(item.name == 'city') {
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                        ref={cityRef}
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
                              city: ''
                            });
                            setCityName(e.target.value);
                            setCity({});
                          }}
                          value={customer?.city || cityName}
                          required={cities?.length > 0 ? true : false}
                          onFocus={() => {setCityDropdownOpen(true)}}
                          cypress-name="city_input"
                        />
                        {
                          cityDropdownOpen && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute mt-14 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                cities?.filter(name => name?.name.toLowerCase().includes(cityName.toLowerCase())).map((city_name, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        city: city_name?.name
                                      });
                                      setCityName("");
                                      setCity(city_name);
                                      setCityDropdownOpen(false);
                                    }}
                                    dropdown-name="city-dropdown"
                                  >{city_name?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  } else if(item.name == 'address') {
                    return(
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2 relative'
                        ref={hereRef}
                      >
                        <label
                          className='search-input-label'
                        >{item.label}</label>
                        <input
                          type='text'
                          className='search-input-text focus:outline-none w-full h-full p-0'
                          placeholder={item?.placeholder}
                          name='addrress'
                          onChange={e => {
                            setHereData(null);
                            setHereSearch(e.target.value);
                          }}
                          value={hereData?.title || hereSearch}
                          required
                          onFocus={() => {setIsHereDropdownOpen(true)}}
                        />
                        {
                          isHereDropdownOpen && hereList?.length > 0 && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute mt-14 bg-[#E4E4E4] overflow-y-auto z-[100] px-2' cypress-name="address-dropdown">
                              {
                                hereList?.map((name, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setHereSearch("");
                                      setHereData(name);
                                      setIsHereDropdownOpen(false);
                                    }}
                                  >{name?.title}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  } else{
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
                          cypress-name={item.name+"_input"}
                          value={customer[item.name]}
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
                <label className="relative cursor-pointer" cypress-name="authorization-toggle-button">
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
                    cypress-name="authentication_input"
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
                type='submit'
              >Save</button>
              <button
                type='button'
                cypress-name="cancel_input"
                className='btn-red h-[46px] ml-[30px]'
                onClick={() => {
                  setCustomer({
                    first_name: '',
                    last_name: '',
                    address: '',
                    state: '',
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