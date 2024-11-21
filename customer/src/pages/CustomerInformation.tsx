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

  const [customer, setCustomer] = useState(location.state);
  console.log(customer);
  
  const bottomData = [
    { icon: <Mail className='mx-auto' />, title: `Email : ${customer?.email}` },
    { icon: <Phone className='mx-auto' />, title: `Phone : ${customer?.phone_no}` },
    { icon: <UserRound className='mx-auto' />, title: `${customer?.domain ? customer?.domain : 'N/A'}` },
  ]

  const [resetPasswordShow, setResetPasswordShow] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = e => {
    e.preventDefault();
    setResetPasswordShow(false);
    setNewPassword('');
    setConfirmPassword('');
  }
  
  return (
    <div
      className='flex flex-col px-2 max-[400px]:px-0'
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
          className='page-indicator-arrow-2'
        />
        <p
          className='page-indicator-2'
        >Customer Information</p>
      </div>

      <div
        className='flex-row-between-2 mt-8'
      >
        <div
          className='flex flex-col'
        >
          <h5
            className='h5-text mb-3'
          >Robert Clive</h5>

          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Customer ID : #{customer?.record_id}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Business Name : {customer?.business_name}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Address : {customer?.street_name}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Country : {customer?.region}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Region : {customer?.state}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Domain : {customer?.domain ? customer?.domain : 'N/A'}</p>
        </div>
        <div
          className='flex flex-col justify-between text-right max-[631px]:items-center'
        >
          <button
            type='button'
            className='btn-as-customer-login max-w-fit'
          >Login as Customer</button>

          <a
            className='a-reset-password max-[631px]:my-2'
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
        <div className="fixed-popup-round3xl min-[546px]:w-[538px] max-[546px]:w-full h-[284px] p-6 flex flex-col font-inter">
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
              className='grid min-[546px]:grid-cols-2 max-[546px]:grid-cols-1 font-inter min-[546px]:mt-[37px] max-[546px]:mt-[20px]'
            >
              <div
                className='flex flex-col px-2 max-[546px]:mb-3'
              >
                <label
                  className='search-input-label'
                >New Password</label>
                <input type={showNewPassword ? 'text' : 'password'} placeholder='New Password' minLength={8} required
                  className='search-input-text'
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
                className='flex flex-col px-2'
              >
                <label
                  className='search-input-label'
                >Confirm Password</label>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' minLength={8} required
                  className='search-input-text'
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
                type='button'
              >Save</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className='w-full grid min-[1150px]:grid-cols-3 grid-cols-1 mt-8'
      >
        {
          bottomData && bottomData.map((item, index) => {
            return(
              <div
                className='w-[268px] h-[119px] rounded-[5px] border border-[#dbffe380] bg-[#dbffe380] flex flex-col justify-center min-[1150px]:my-0 my-2 mx-auto min-[1150px]:first:ml-0 min-[1150px]:last:mr-0'
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