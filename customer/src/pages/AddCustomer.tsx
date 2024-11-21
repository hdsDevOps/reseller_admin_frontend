import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'
import Flag from 'react-world-flags'; // Flag component

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
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
  const flagRef = useRef(null);
  const [phoneNumber,setPhoneNumber] = useState();
  const [phoneCode,setPhoneCode] = useState('+1');

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
    {label: 'First name', type: 'text', name: 'first_name'},
    {label: 'Last name', type: 'text', name: 'last_name'},
    {label: 'Street Address', type: 'text', name: 'street_name'},
    {label: 'Region/State', type: 'text', name: 'city'},
    {label: 'City', type: 'text', name: 'state'},
    {label: 'Country', type: 'text', name: 'region'},
    {label: 'Zip code', type: 'number', name: 'zipcode'},
    {label: 'Business phone number', type: 'number', name: 'phone_no'},
    {label: 'Email address', type: 'email', name: 'email'},
  ];

  const submit = e => {
    e.preventDefault();
    navigate(-1);
  };
  
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
    code: string;
    label: string;
    value: string;
  } | { code: "US", label: "United States", value: '+1' }>({ code: "US", label: "United States", value: '+1' });

  const handleOptionClick = (option: { code: string; flag: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    setPhoneCode(option?.value)
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
                              {
                                isOpen ? <ChevronUp style={{fontSize: '20px'}} /> : <ChevronDown style={{fontSize: '20px'}} />
                              }
                            </div>

                            {/* Dropdown Options */}
                            {isOpen && (
                              <div className="absolute mt-[44px] z-10 w-[40px] ml-[-3px] bg-white border border-gray-300 rounded-md shadow-lg" ref={flagRef}>
                                {currencyOptions.map((option) => (
                                  <div
                                    key={option.code}
                                    className="flex items-center py-2 px-[5px] hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionClick(option)}
                                  >
                                    <Flag code={option?.code} style={{width: '30px'}} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <p
                            className='w-fit my-auto mx-1'
                          >{selectedOption?.value}</p>
                          <input
                            type='number'
                            className='w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            defaultValue={phoneNumber}
                            onChange={e => {
                              setPhoneNumber(parseInt(e.target.value))
                            }}
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
                    checked={customer?.makeAuthorization}
                    onClick={() => {
                      setCustomer({
                        ...customer,
                        makeAuthorization: !customer.makeAuthorization
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