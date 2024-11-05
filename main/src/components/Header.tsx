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

export default function Header() {
  const[showNotification,setShowNotfication] = useState(true);

  const openModal = () => setShowNotfication(true);
  const closeModal = () => setShowNotfication(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    // dispatch(resetUserSlice());
    // localStorage.clear();
    navigate("/login");
  };

  const [ showProfile, setShowProfile ] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  

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
    <header
      className="bg-white flex flex-row text-black px-2 items-center justify-between z-50 fixed top-0 left-0 right-0 w-full h-[94px] border border-b-[#E4E4E4]"
    >
      <a
        className="flex items-center justify-center md:ml-[70px] sm:ml-[20px]"
      >
        <img 
          src={process.env.BASE_URL + "/images/logo.jpeg"} 
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
          className="bg-[#DCEBDF] sm:p-[5px] p-[7px] sm:w-[40px] w-[25px] sm:h-[40px] h-[25px] rounded-[8px] mr-[10px] sm:mt-0 mt-[8px]"
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
                      >
                        <RiLock2Line
                          className="sm:mt-[4px] mt-[3px] sm:text-[15px] text-[12px]"
                        />
                        <a
                          className="sm:text-[15px] text-[12px] pl-[5px]"
                        >Change password</a>
                      </div>
                    </li>
                    <li>
                      <div
                        className="flex flex-row cursor-pointer py-[5px]"
                      >
                        {/* <RiSettings4Line
                          className="mt-[4px]"
                        /> */}
                        <img 
                          src={process.env.BASE_URL + '/images/India-flag.png'}
                          alt="India flag"
                          className="w-[12px] h-[12px] mt-[6px] ml-[1px]"
                        />
                        <a
                          className="sm:text-[15px] text-[12px] pl-[5px]"
                        >Default currency</a>
                      </div>
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
  );
}