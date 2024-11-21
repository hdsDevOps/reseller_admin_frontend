import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import { RiNotification4Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";
import { RiLock2Line } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { ChevronDown } from 'lucide-react';
import '../styles/styles.css';
import { RiUser3Fill } from "react-icons/ri";
import {format} from 'date-fns';
import { RiCloseCircleFill } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";

export default function Header() {
  const[showNotification,setShowNotfication] = useState(false);
  const notificationRef = useRef();
  const currencyRef = useRef();

  const openModal = () => setShowNotfication(true);
  const closeModal = () => setShowNotfication(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { image: '', header: 'Frankie sulliva commented on your post', text: 'This is a notification template. Here is it ', date: '20 Sep 2024 14:20:00'},
    { image: '', header: 'Frankie sulliva commented on your post', text: 'This is a notification template. Here is it ', date: '20 Sep 2024 14:20:00'},
    { image: '', header: 'Frankie sulliva commented on your post', text: 'This is a notification template. Here is it ', date: '20 Sep 2024 14:20:00'},
  ]);
  const [showCurrency, setShowCurrency] = useState(false);
  const flagList = [
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUS', logo: 'A$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'US', logo: '$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NIG', logo: 'N₦',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'ENG', logo: '£',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAN', logo: 'C$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'IND', logo: '₹',},
  ];
  const [currency, setCurrency] = useState('US');
  const [passwordModal, setPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const getflag = (name) => {
    const flag = flagList
      .map(item => item.name === name ? item : undefined)
      .filter(item => item !== undefined);
    return flag[0];
  };

  const currencySubmit = e => {
    e.preventDefault();
    setShowCurrency(false);
  }

  const handleClickOutside2 = (event) => {
    if(notificationRef.current && !notificationRef.current.contains(event.target)){
      setShowNotfication(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside2);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside2);
    };
  }, []);
  const handleClickOutside3 = (event) => {
    if(currencyRef.current && !currencyRef.current.contains(event.target)){
      setShowCurrency(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside3);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside3);
    };
  }, []);

  const onLogoutHandler = () => {
    // dispatch(resetUserSlice());
    // localStorage.clear();
    navigate("/login");
  };

  const [ showProfile, setShowProfile ] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const notificationDate1 = (date) => {
    const weekDay = format(date, 'EEEE');
    const hour = format(date, 'hh');
    const minutes = format(date, 'mm');
    const meridian = format(date, 'a');
    return `${weekDay} ${hour}:${minutes}${meridian}`;
  }

  const notificationDate2 = (date) => {
    const month = format(date, 'MMM');
    const day = format(date, 'd');
    const year = format(date, 'yyyy');
    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent) => {
      if(elementRef.current && !elementRef.current.contains(event.target as Node)){
        setShowProfile(false);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
        document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header
        className="bg-white flex flex-row text-black px-2 items-center justify-between z-50 fixed top-0 left-0 right-0 w-full h-[94px] border border-b-[#E4E4E4]"
      >
        <a
          className="flex items-center justify-center md:ml-[70px] sm:ml-[20px]"
        >
          <img 
            src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"} 
            alt="logo" 
            className="w-[51px] "
          />
        </a>

        <div
          className={`flex flex-row ${
            !showProfile ? "mr-0" : "mr-[60px]"
          } sm:mr-[60px]`}
        >
          <div
            className="bg-[#DCEBDF] sm:p-[5px] p-[7px] sm:w-[40px] w-[25px] sm:h-[40px] h-[25px] rounded-[8px] mr-[10px] sm:mt-0 mt-[8px] cursor-pointer"
            onClick={openModal}
          >
            <Bell className="sm:w-[16px] w-[12px] sm:h-[18px] h-[12px] text-black" />
            <a
              className="float-right flex sm:mt-[-28px] mt-[-25px] sm:mr-[-5px] mr-[-7px] pl-[3.5px] text-[#FFFFFF] text-[9px] w-[12px] h-[12px] bg-[#070000] rounded-full"
            >
              1
            </a>
          </div>

          <div
            className="flex flex-row"
          >
            <div
              className="flex flex-row"
            >
              <div
                className="text-center sm:pt-[1px] bg-custom-green sm:w-[41px] w-[25px] sm:h-[41px] h-[25px] rounded-full sm:mt-0 mt-[8px] sm:mr-[10px] mr-0"
              >
                <a
                  className="font-montserrat sm:text-base text-[12px] font-semibold text-white"
                >
                  LU
                </a>
              </div>
              <button
                type="button"
                className="sm:mr-[10px] mr-[5px] sm:mt-0 mt-[7px]"
              >
                <ChevronDown
                  className="sm:w-[22px] w-[15px] sm:h-[22px] h-[15px] text-[#000000]"
                  onClick={() => setShowProfile(true)}
                />
              </button>

              {
                showProfile && <div 
                  className="fixed flex flex-col bg-white sm:w-[220px] w-[200px] ml-[-5px] sm:mt-[-13px] mt-[-5px] rounded-[8px] shadow-md p-[5px]"
                  ref={elementRef}
                >
                  <div
                    className="flex flex-row"
                  >
                    <div
                      className="text-center sm:pt-[1px] bg-custom-green sm:w-[41px] w-[25px] sm:h-[41px] h-[25px] rounded-full sm:mt-[8px] mt-[8px] sm:mr-[10px] mr-0"
                    >
                      <a
                        className="font-montserrat sm:text-base text-[10px] font-semibold text-white"
                      >
                        LU
                      </a>
                    </div>
                    <div
                      className="flex flex-col w-[123px] sm:ml-[5px] ml-[10px]"
                    >
                      <p
                        className="text-poppins sm:text-[14px] text-[12px] text-normal text-custom-black2"
                      >
                        Lemmy Ugochukwu
                      </p>
                      <p
                        className="text-inter sm:text-[12px] text-[10px] text-normal text-custom-gray2"
                      >
                        philipbassey@mail.com
                      </p>
                      <p
                        className="text-inter sm:text-[10px] text-[8px] text-normal text-custom-gray3"
                      >
                        (Super admin)
                      </p>
                    </div>
                  </div>

                  <div
                    className="border-t-[0.4px] border-custom-gray4 sm:w-[210px] w-[190px] my-[5px]"
                  ></div>
                  <div
                    className="pl-[10px]"
                  >
                    <ul>
                      <li>
                        <div
                          className="flex flex-row cursor-pointer py-[5px]"
                        >
                          <RiSettings4Line
                            className="sm:mt-[4px] mt-[3px] sm:text-[15px] text-[12px]"
                          />
                          <a
                            className="sm:text-[15px] text-[12px] pl-[5px]"
                            onClick={() => {navigate('/profile-settings')}}
                          >Profile setting</a>
                        </div>
                      </li>
                      <li
                        className="flex-row-between"
                      >
                        <div
                          className="flex flex-row cursor-pointer py-[5px]"
                        >
                          {/* <RiSettings4Line
                            className="mt-[4px]"
                          /> */}
                          <Bell
                            className="sm:w-[15px] w-[12px] sm:h-[15px] h-[12px] sm:mt-[5px] mt-[4px]"
                          />
                          <a
                            className="sm:text-[15px] text-[12px] pl-[5px]"
                          >Notification setting</a>
                        </div>
                        <div
                          className="mt-[7.5px] transition-transform duration-1000 ease-in-out"
                          onClick={() => setShowNotfication(!showNotification)}
                        >
                          {/* {notificationToggle()} */}
                          <label className="relative cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div
                              className="sm:w-[45px] w-[30px] sm:h-[20px] h-[13px] flex items-center bg-gray-300 rounded-full sm:text-[7px] text-[6px] peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['OFF'] peer-checked:after:content-['ON'] sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute sm:after:left-[2px] after:left-[0px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full sm:after:h-4 after:h-3 sm:after:w-5 after:w-5 after:transition-all peer-checked:bg-[#00D13B]">
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex flex-row cursor-pointer py-[5px]"
                          onClick={e => {setPasswordModal(true)}}
                        >
                          <RiLock2Line
                            className="sm:mt-[4px] mt-[3px] sm:text-[15px] text-[12px]"
                          />
                          <a
                            className="sm:text-[15px] text-[12px] pl-[5px]"
                          >Change password</a>
                        </div>
                        {
                          passwordModal && (
                            <div
                              className="fixed-full-screen"
                            >
                              <div
                                className="fixed-popup w-full max-w-[526px] h-[400px] flex flex-col p-7"
                                ref={currencyRef}
                              >
                                <div
                                  className='flex-row-between'
                                >
                                  <h4
                                    className='text-2xl font-medium'
                                  >Change password</h4>
                                  <button
                                    type='button'
                                    className='text-3xl'
                                    onClick={() => {
                                      setPasswordModal(false);
                                    }}
                                  >
                                    <RiCloseCircleFill className="text-custom-green" />
                                  </button>
                                </div>

                                <div className="w-full py-5 flex min-sm:flex-row max-sm:flex-col gap-2">
                                  <div
                                    className='flex flex-col my-1 w-full'
                                  >
                                    <label className='search-input-label'>Password</label>
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      defaultValue={password}
                                      onChange={e => {setPassword(e.target.value)}}
                                      className="search-input-text"
                                      minLength={8}
                                      placeholder="Enter password"
                                      required
                                    />
                                    <button
                                      type="button"
                                      onClick={() => { setShowPassword(!showPassword) }}
                                      className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                                    >
                                      {showPassword ? (
                                        <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                                      ) : (
                                        <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                                      )}
                                    </button>
                                  </div>

                                  <div
                                    className='flex flex-col w-full my-1'
                                  >
                                    <label className='search-input-label'>Confirm Password</label>
                                    <input
                                      type={showCPassword ? "text" : "password"}
                                      name='cPassword'
                                      placeholder='Enter password'
                                      defaultValue={cPassword}
                                      onChange={e => {setCPassword(e.target.value)}}
                                      minLength={8}
                                      required
                                      className='search-input-text'
                                    />
                                    <button
                                      type="button"
                                      onClick={() => { setShowCPassword(!showCPassword) }}
                                      className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                                    >
                                      {showCPassword ? (
                                        <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                                      ) : (
                                        <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <div className="flex flex-row justify-center gap-2">
                                  <button className="btn-green w-full max-w-[150px] mx-auto">Save</button>
                                  <button className="text-base font-normal font-inter text-white focus:outline-none rounded-[10px] px-5 py-[7px] bg-red-600 w-full max-w-[150px] mx-auto" onClick={e => {
                                    setPassword('');
                                    setCPassword('');
                                    setPasswordModal(false);
                                  }}>Cancel</button>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </li>
                      <li>
                        <div
                          className="flex flex-row cursor-pointer py-[5px]"
                          onClick={() => setShowCurrency(true)}
                        >
                          {/* <RiSettings4Line
                            className="mt-[4px]"
                          /> */}
                          <img 
                            src={`${
                              getflag(currency)
                              ?.flag
                            }`}
                            alt={currency}
                            className="h-[12px] mt-[6px] ml-[1px]"
                          />
                          <a
                            className="sm:text-[15px] text-[12px] pl-[5px]"
                          >Default currency</a>
                        </div>
                        {
                          showCurrency && (
                            <div
                              className="fixed-full-screen"
                            >
                              <div
                                className="fixed-popup w-full max-w-[526px] h-[200px] flex flex-col p-7"
                                ref={currencyRef}
                              >
                                <div
                                  className='flex-row-between'
                                >
                                  <h4
                                    className='text-2xl font-medium'
                                  >Select currency</h4>
                                  <button
                                    type='button'
                                    className='text-3xl'
                                    onClick={() => {
                                      setShowCurrency(false);
                                    }}
                                  >
                                    <RiCloseCircleFill className="text-custom-green" />
                                  </button>
                                </div>

                                <div className="w-full py-5">
                                  <select className="select-input" onChange={e => {
                                    setCurrency(e.target.value)
                                  }}>
                                    {
                                      flagList.map((flag, index) => {
                                        return(
                                          <option selected={flag.name == currency ? true : false} value={flag.name} key={index}>{flag.name} - {flag.logo}</option>
                                        )
                                      })
                                    }
                                  </select>
                                </div>

                                <button className="btn-green w-full max-w-[150px] mx-auto" onClick={currencySubmit}>Save</button>
                              </div>
                            </div>
                          )
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              }
            </div>

            <a
              className="font-inter font-normal sm:mt-[1px] mt-[9px] sm:text-[16px] text-[14px]"
            >
              Super admin
            </a>
          </div>
        </div>
      </header>
      {
        showNotification && (
          <div className="fixed-full-screen">
            <div
              className="fixed w-full max-w-[434px] h-[496px] bg-white rounded-[20px] z-50 ml-auto top-0 mt-16 right-3 max-[450px]:right-0 p-7 shadow-md border-custom-gray4"
              ref={notificationRef}
            >
              <div
                className="flex flex-row justify-between h-[50px]"
              >
                <h6
                  className="font-inter font-bold text-xl text-black"
                >Notfications</h6>
                <label className="relative cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div
                    className="w-[45px] h-[20px] flex items-center bg-gray-300 rounded-full text-[7px] peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['OFF'] peer-checked:after:content-['ON'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-5 after:transition-all peer-checked:bg-[#00D13B]">
                  </div>
                </label>
              </div>
              <div
                className="mt-0 h-[400px] overflow-y-auto"
              >
                {
                  notifications && notifications.map((notification, index) => {
                    return(
                      <div
                        className="py-[15px] flex flex-row"
                        key={index}
                      >
                        <div
                          className="w-[43.2px] h-[38.2px] bg-[#D9D9D9] rounded-full flex justify-center"
                        >
                          {
                            notification.image == '' ?
                            <RiUser3Fill
                              className="text-[21.1px] text-white m-auto"
                            /> :
                            <img
                              src=''
                              alt="logo"
                              className="w-[21.1px]"
                            />
                          }
                        </div>

                        <div
                          className="px-4 flex flex-col w-full"
                        >
                          <h6 className="font-inter font-semibold text-[15px] text-black">{notification?.header}</h6>
                          <p className="my-[6px] px-[11px] py-[2px] font-inter font-normal text-[13px] text-black border border-gray-200 rounded-[10px]">{notification?.text}</p>
                          <div className="flex flex-row justify-between w-full font-inter font-semibold text-[10px] text-black">
                            <p className="">{notificationDate1(notification?.date)}</p>
                            <p>{notificationDate2(notification?.date)}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}