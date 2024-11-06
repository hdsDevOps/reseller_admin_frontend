import { ChevronRight, MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css'
import axios from 'axios';

function EditCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const customerId = location.state.customerId;
  
  const [customer, setCustomer] = useState({});
  console.log(customer);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/${customerId}`)
      .then(res => {
        setCustomer(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [customerId])
  
  const updateCustomer = e => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    })
  };

  const formList = [
    {label: 'First name', type: 'text', name: 'fname'},
    {label: 'Last name', type: 'text', name: 'lname'},
    {label: 'Street Address', type: 'text', name: 'street'},
    {label: 'Region/State', type: 'text', name: 'city'},
    {label: 'City', type: 'text', name: 'state'},
    {label: 'Country', type: 'text', name: 'country'},
    {label: 'Zip code', type: 'number', name: 'zipCode'},
    {label: 'Business phone number', type: 'number', name: 'phone'},
    {label: 'EMail address', type: 'email', name: 'email'},
  ]

  const submit = e => {
    e.preventDefault();
    navigate(-1);
  }
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
              className='grid grid-cols-2 max-[666px]:grid-cols-1 font-inter'
            >
              {
                formList?.map((item, index) => {
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
                        value={customer[item.name]}
                      />
                    </div>
                  )
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