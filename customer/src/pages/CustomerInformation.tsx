import axios from 'axios';
import { ChevronRight, Mail, MoveLeft, Phone, UserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import '../styles/styles.css';

const CustomerInformation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [customerId, setCustomerId] = useState(location.state.customerId);
  
  const [ customerData, setCustomerData ] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/${customerId}`)
      .then(res => setCustomerData(res.data))
      .catch(err => console.log(err))
  }, [customerId]);
  
  const bottomData = [
    { icon: <Mail className='mx-auto' />, title: `Email : ${customerData?.email}` },
    { icon: <Phone className='mx-auto' />, title: `Phone : ${customerData?.phone}` },
    { icon: <UserRound className='mx-auto' />, title: customerData?.domain },
  ]

  const [resetPasswordShow, setResetPasswordShow] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = e => {
    e.preventDefault()
    setResetPasswordShow(false);
    setNewPassword('');
    setConfirmPassword('');
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
        >Customer Information</p>
      </div>

      <div
        className='flex-row-between mt-8'
      >
        <div
          className='flex flex-col'
        >
          <h5
            className='h5-text mb-3'
          >Robert Clive</h5>

          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Customer ID : #{customerId}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Business Name : {customerData?.business_name}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Address : {customerData?.address}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Country : {customerData?.country}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Region : {customerData?.region}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Domain : {customerData?.domain}</p>
        </div>
        <div
          className='flex flex-col justify-between text-right'
        >
          <button
            type='button'
            className='btn-as-customer-login'
          >Login as Customer</button>

          <a
            className='a-reset-password'
            onClick={() => {
              setResetPasswordShow(true);
            }}
          >Reset Password</a>
        </div>
      </div>

      <div
        className={`fixed-full-screen ${
          !resetPasswordShow ? "hidden" : ""
        }`}
      >
        <div className="fixed-popup-round3xl w-[538px] h-[284px] p-6 flex flex-col font-inter">
          <div
            className='flex-row-between'
          >
            <h4
              className='text-2xl font-medium'
            >Reset Password</h4>
            <button
              type='button'
              className='text-3xl rotate-45'
              onClick={() => {
                setResetPasswordShow(false);
                setNewPassword('');
                setConfirmPassword('');
              }}
            >+</button>
          </div>

          <form
            onSubmit={resetPasswordSubmit}
          >
            <div
              className='flex flex-row font-inter mt-[37px]'
            >
              <div
                className='flex flex-col w-1/2 px-2'
              >
                <label
                  className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                >New Password</label>
                <input type={showNewPassword ? 'text' : 'password'} placeholder='New Password' minLength={8} required
                  className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2'
                  onChange={e => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
                />
                <button
                  type="button"
                  // onClick={togglePasswordVisibility}
                  className="float-right mt-[-35px] mr-2 ml-auto"
                  onClick={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                >
                  {showNewPassword ? (
                    <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                  ) : (
                    <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div
                className='flex flex-col w-1/2 px-2'
              >
                <label
                  className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                >Confirm Password</label>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' minLength={8} required
                  className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2'
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                  }}
                  value={confirmPassword}
                />
                <button
                  type="button"
                  // onClick={togglePasswordVisibility}
                  className="float-right mt-[-35px] mr-2 ml-auto"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                  ) : (
                    <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div
              className='flex justify-center mt-[39px]'
            >
              <button
                className='w-[181px] h-[46px] btn-green-2'
              >Save</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className='grid min-[1150px]:grid-cols-3 grid-cols-1 min-[1150px]:gap-5 mt-8 w-full'
      >
        {
          bottomData && bottomData.map((item, index) => {
            return(
              <div
                className='w-[268px] h-[119px] rounded-[5px] border border-[#dbffe380] bg-[#dbffe380] flex flex-col justify-center min-[1150px]:my-0 my-2'
                key={index}
              >
                {item.icon}
                <a className='mx-auto' >{item.title}</a>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CustomerInformation;