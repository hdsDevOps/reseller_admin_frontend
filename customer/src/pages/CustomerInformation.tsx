import axios from 'axios';
import { ChevronRight, Mail, MoveLeft, Phone, UserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import '../styles/styles.css';
import { getCustomerDomainsListThunk, logInAsCustomerThunk, updateCustomerPasswordThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerInformation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { rolePermissionsSlice, userDetails } = useAppSelector(state => state.auth);

  const [primaryDomain, setPrimaryDomain] = useState("");

  const [customer, setCustomer] = useState(location?.state?.item);
  console.log(customer, 'customer information');
  const [domains, setDomains] = useState([]);
  // console.log("domains....", domains);
  
  const bottomData = [
    { icon: <Mail className='mx-auto' />, title: `Email : ${customer?.email}` },
    { icon: <Phone className='mx-auto' />, title: `Phone : +${customer?.phone_no}` },
    { icon: <UserRound className='mx-auto' />, title: `Domain: ${
      customer?.domain_details
      ? customer?.domain_details?.domain_name
      : "N/A"
    }` },
  ];

  const [resetPasswordShow, setResetPasswordShow] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = async(e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      toast.warning("Password and confirm password do not match");
    } else if(
      newPassword === "" || newPassword?.trim() === "" ||
      confirmPassword === "" || confirmPassword?.trim() === ""
    ) {
      toast.warning("Password fields cannot be empty");
    } else {
      try {
        const result = await dispatch(
          updateCustomerPasswordThunk({record_id: customer?.id, password: newPassword})
        ).unwrap()
        // console.log(result);
        setResetPasswordShow(false);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          toast.success("Password updated successfully");
        }, 1000);
      } catch (error) {
        toast.error("Error resetting customer password");
        console.log(error);
      }
    }
  };

  const getCustomerDomainsList = async(id:string) => {
    try {
      const result = await dispatch(getCustomerDomainsListThunk({search_text: "", customer_id: id})).unwrap();
      setDomains(result?.data);
    } catch (error) {
      setDomains([]);
    }
  };

  useEffect(() => {
    getCustomerDomainsList(customer?.record_id);
  }, [customer?.record_id]);

  const getPrimaryDomain = async() => {
    const name = domains?.find(domain => domain?.domain_type === "primary");
    if(name) {
      setPrimaryDomain(name?.domain_name);
    } else {
      setPrimaryDomain("");
    }
  };

  useEffect(() => {
    getPrimaryDomain();
  }, [domains]);
  
  const handleLoginAsCustomer = async(email:string) => {
    try {
      const result = await dispatch(logInAsCustomerThunk({email: email})).unwrap();
      console.log("result....", result);
      if(result?.status === 200) {
        window.location.href=`https://main.customer.gworkspace.withhordanso.com/redirecting-to-customer-portal?token=${result?.token}&customer_id=${result?.customer_id}&admin_name=${userDetails?.first_name}${" "}${userDetails?.last_name}`
        // window.location.href=`${process.env.CUSTOMER_PORTAL_BASE_URL}redirecting-to-customer-portal?token=${result?.token}&customer_id=${result?.customer_id}&admin_name=${userDetails?.first_name}${" "}${userDetails?.last_name}`
      }
    } catch (error) {
      toast.error("Unable to login as customer");
      // if(error?.message == "Request failed with status code 401") {
      //   try {
      //     const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
      //     navigate('/login');
      //   } catch (error) {
      //     //
      //   }
      // }
      console.log("error....", error);
    }
  };
  
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
            className='h5-text mb-3 uppercase'
          >{customer?.first_name || 'First'} {customer?.last_name || 'Last'}</h5>

          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Customer ID : #{customer?.profile_id || 'N/A'}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Business Name : {customer?.business_name || 'N/A'}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Address : {customer?.address || 'N/A'}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Country : {customer?.country || 'N/A'}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray'
          >Region : {customer?.state || 'N/A'}</p>
          <p
            className='py-2 font-inter-16px-400-custom-gray flex max-[400px]:flex-col min-[400px]:flex-row'
          >
            <p>Domain :</p>
            <div className='flex flex-col ml-1'>
              {
                domains?.length > 0 
                ? domains?.map((domain, index) => (
                  <p key={index} className='py-[1px]'>{domain?.domain_name}<br /></p>
                )) : (
                  <p>N/A</p>
                )
              } 
            </div>
          </p>
        </div>
        <div
          className='flex flex-col justify-between text-right max-[631px]:items-center'
        >
          <button
            type='button'
            className='btn-as-customer-login max-w-fit'
            disabled={!rolePermissionsSlice?.customer_management?.login ? true : false}
            onClick={() => {handleLoginAsCustomer(customer?.email)}}
          >Login as Customer</button>

          <button
            type='button'
            className='a-reset-password max-[631px]:my-2 hover:underline'
            button-name="customer-information-reset-password"
            onClick={() => {
              setResetPasswordShow(true);
            }}
            disabled={!rolePermissionsSlice?.customer_management?.reset_password ? true : false}
          >Reset Password</button>
        </div>
      </div>

      {
        resetPasswordShow && (
          <div
            className={`fixed-full-screen`}
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
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder='New Password'
                      minLength={8}
                      required
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
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      minLength={8}
                      required
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
                    type='submit'
                  >Save</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
      <div
        className='w-full grid min-[1150px]:grid-cols-3 grid-cols-1 mt-8'
      >
        {
          bottomData && bottomData.map((item, index) => {
            return(
              <div
                className='w-[268px] h-[119px] rounded-[5px] border border-[#dbffe380] bg-[#dbffe380] flex flex-col justify-center min-[1150px]:my-0 my-2 mx-auto min-[1150px]:first:ml-0 min-[1150px]:last:mr-0 text-black hover:text-black no-underline hover:no-underline'
                key={index}
              >
                {item.icon}
                <a className='mx-auto break-normal text-center'>{item.title}</a>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CustomerInformation;