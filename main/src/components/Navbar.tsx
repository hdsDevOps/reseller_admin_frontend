import React, { useEffect, useRef, useState } from "react";
import {
  ChartLine,
  Mail,
  ClipboardList,
  Users,
  Ticket,
  CreditCard,
  PanelLeftClose,
  ShieldCheck,
  Settings,
  LogOut,
  CircleChevronLeft,
  CircleChevronRight,
  ListChecks,
  TicketPercent,
  LayoutTemplate,
  ReceiptText,
  MessageCircleQuestion,
  History,
  UserPen,
  GitPullRequestDraft,
  ChevronDown,
  ChevronUp,
  Dot,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setTokenDetails } from "store/authSlice";
import { RiCashFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { removeUserAuthTokenFromLSThunk, getUserAuthTokenFromLSThunk, setUserIdToLSThunk, getRolesThunk } from 'store/user.thunk';
import { setRolesPermissionsStatus } from 'store/authSlice';

const intitalPermissions = {
  dashboard: false,
  customer_management: {
      overall: false,
      add: false,
      edit: false,
      delete: false,
      login: false,
      authorization: false,
      send_mail: false,
      details: false,
      reset_password: false
  },
  voucher_management: {
      overall: false,
      customer_group: {
          overall: false,
          add: false,
          view: false,
          delete: false
      },
      voucher_list: {
          overall: false,
          send_mail: false,
          add: false,
          delete: false
      }
  },
  notification_template: {
      overall: false,
      add: false,
      preview: false,
      update: false,
      cancel: false,
      send_mail: false
  },
  subscription_master: {
      overall: false,
      plan_and_price_setup: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      },
      gemini_setup: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      }
  },
  payment_method: {
      overall: false,
      action: false
  },
  billing_history: {
      overall: false,
      download: false
  },
  faqs: {
      overall: false,
      add: false
  },
  email_log: {
      overall: false,
      view_details: false
  },
  role_management: {
      overall: false,
      user_list: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      },
      role: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      }
  },
  cms: {
      overall: false,
      view_details: false
  },
  settings: {
      overall: false,
      dashboard_widget: false,
      about: false,
      privacy_policy: false,
      terms_and_conditions: false,
      customer_agreement: false
  }
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [username] = useState("Robert Clive"); // Replace with actual username
  const [email] = useState("roberclive@domain.co.in"); // Replace with actual email
  const { userId, userDetails, rolePermissionsSlice } = useAppSelector(state => state.auth);
  // console.log("userId....", userId);
  // console.log("userDetails....", userDetails);
  const [width, setWidth] = useState(window.innerWidth);
  const [ dropdowns, setDropdowns ] = useState({});
  const dropdownRef = useRef([]);

  const [rolePermissions, setRolePermissions] = useState(rolePermissionsSlice !== null ? rolePermissionsSlice : intitalPermissions);
  // console.log("rolePermissions...", rolePermissions);

  useEffect(() => {
    const getRole = async() => {
      try {
        const result = await dispatch(getRolesThunk({user_type: ""})).unwrap();
        const rolesList = result?.roles;
        if(rolesList?.length > 0) {
          const findUserRole = rolesList?.find(item => item?.id === userDetails?.role);
          if(findUserRole) {
            await dispatch(setRolesPermissionsStatus(findUserRole?.permission));
            setRolePermissions(findUserRole?.permission);
          } else {
            await dispatch(setRolesPermissionsStatus(intitalPermissions));
            setRolePermissions(intitalPermissions);
          }
        }
      } catch (error) {
        setRolePermissions(intitalPermissions);
        await dispatch(setRolesPermissionsStatus(intitalPermissions));
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    };

    getRole();
  }, [userDetails?.role]);

  const toggleDropdown = (index) => {
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setIsOpen(true);
  };

  const handleClickOutOfDropdown = e => {
    dropdownRef.current.forEach((ref, index) => {
      if(ref && !ref.contains(e.target)){
        setDropdowns((prev) => ({
          ...prev,
          [index]: false,
        }));
      }
    })
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutOfDropdown);
    return() => {
      document.removeEventListener('mousedown', handleClickOutOfDropdown);
    };
  }, [])

  const links = [
    {
      path: ["/dashboard"],
      label: "Dashboard",
      icon: <ChartLine className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'dashboard',
    },
    {
      path: ["/customers"],
      label: "Customer Management",
      icon: <ListChecks className="w-[18.5px] h-[15.5px]  border-[2px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'customer_management',
    },
    {
      path: ["/customer-group", "/voucher-list"],
      label: "Voucher Management",
      icon: <TicketPercent className={`w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]"`} />,
      subDomain: [
        { path: '/customer-group', label: 'Customer group', name: 'customer_group', },
        { path: '/voucher-list', label: 'Voucher list', name: 'voucher_list', }
      ],
      name: 'voucher_management',
    },
    {
      path: ["/notification-template"],
      label: "Notification Template",
      icon: <LayoutTemplate className={`w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]`} />,
      subDomain: [],
      name: 'notification_template',
    },
    {
      path: ["/plan-and-price-setup", "/gemini-setup"],
      label: "Subscription Master",
      icon: <i className={`bi bi-cash-stack w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]`}></i>,
      subDomain: [
        { path: '/plan-and-price-setup', label: 'Plan & price setup', name: 'plan_and_price_setup', },
        { path: '/gemini-setup', label: 'Gemini setup', name: 'gemini_setup', },
      ],
      name: 'subscription_master',
    },
    {
      path: ["/payment-method"],
      label: "Payment Method",
      icon: <CiCreditCard1 className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'payment_method',
    },
    {
      path: ["/billing-history"],
      label: "Billing History",
      icon: <ReceiptText className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'billing_history',
    },
    {
      path: ["/faqs"],
      label: "FAQ's",
      icon: <MessageCircleQuestion className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'faqs',
    },
    {
      path: ["/email-log"],
      label: "Email Log",
      icon: <History className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'email_log',
    },
    {
      path: ["/user-list", "/role"],
      label: "Role Management",
      icon: <UserPen className={`w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]`} />,
      subDomain: [
        { path: '/user-list', label: 'User list', name: 'user_list', },
        { path: '/role', label: 'Role', name: 'role', },
      ],
      name: 'role_management',
    },
    {
      path: ["/cms"],
      label: "CMS",
      icon: <GitPullRequestDraft className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
      name: 'cms',
    },
  ];
  
  const links2= [
    {
      path: ["/customer-agreement", "/privacy-policy", "/terms-and-conditions"],
      label: "Settings",
      icon: <Settings className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [
        { path: '/customer-agreement', label: 'Customer agreement', name: 'customer_agreement', },
        { path: '/privacy-policy', label: 'Privacy policy', name: 'privacy_policy', },
        { path: '/terms-and-conditions', label: 'Terms & conditions', name: 'terms_and_conditions', },
      ],
    },
    {
      path: ["/logout"],
      label: "Logout",
      icon: <RiLogoutCircleLine className="w-[18.5px] h-[15.5px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
    },
  ]

  const handleLogout = async () => {
    // dispatch(setTokenDetails(""));
    // navigate("/login");
    try {
      const result = await dispatch(
        removeUserAuthTokenFromLSThunk()
      )
      navigate('/login');
    } catch (error) {
      console.log("Error on logging out")
    } finally {
      try {
        const getToken = await dispatch(
          getUserAuthTokenFromLSThunk()
        ).unwrap()
        navigate('/login')
      } catch (error) {
        console.log("Error on token")
      }
    }
  };  

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(width < 769){
      setIsOpen(false);
      setDropdowns({});
    }
    else{
      setIsOpen(true);
    }
  }, [width]);

  useEffect(() => {
    if(width < 769){
      setIsOpen(false);
    }
  }, [width, location.pathname]);

  return (
    <aside
      className={`sticky transition-all duration-300 ease-in-out shadow-md bg-[#F4F4F4] ${
        isOpen ? "w-[307px]" : "max-w-[307px]"
      } pt-[24px] drop-shadow-md`}
    >
      <div
        className={`transition-all duration-300 ease-in-out text-black flex flex-col`}
        // 
      >
        {
          links && links.map((item, index) => {
            if(item.path[0] === '/dashboard' && rolePermissions?.dashboard){
              return(
                <>
                  <div key={index}
                    className="flex flex-row px-[7px] border-b-[1px] border-[#E4E4E4] pb-[20px] my-[4px]"
                  >
                    <button
                      type='button'
                      onClick={() => {navigate(item.path[0])}}
                      className="w-full items-start"
                    >
                      <div
                        className={`items-center flex w-full py-[12px] px-[10px] ${
                          location.pathname == item.path[0]  && `bg-[#12A83333] rounded-[8px]`
                        } hover:bg-[#12A83333] hover:rounded-[8px] ${
                          !isOpen && (
                            `ml-[10px] max-w-12 pl-[15px]`
                          )
                        }`}
                      >
                        <span>{item.icon}</span>
                        <p
                          className={`ml-[12px] font-poppins text-[16px] font-medium ${
                            !isOpen && (
                              `hidden`
                            )
                          }`}
                        >{item.label}</p>
                      </div>
                    </button>
                  </div>

                  <div>
                    <button
                      type='button'
                      className="float-right mr-[-9px] mt-[-16px] cursor-pointer"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <i className={`bi ${
                        isOpen ? `bi-text-indent-right` : 'bi-text-indent-left'
                      } text-[14px] text-white bg-custom-green border-[2px] border-custom-green rounded-full w-[21px] h-[21px] px-[2px]`}></i>
                    </button>
                  </div>
                </>
              )
            }
            else if(item.subDomain.length != 0 && rolePermissions[item.name]?.overall){
              return(
                <>
                  <div key={index}
                    className="flex flex-col px-[7px] whitespace-nowrap"
                  >
                    <button
                      type='button'
                      className={`w-full`}
                      onClick={() => {
                        if(dropdowns[index]){
                          setIsOpen(true);
                          toggleDropdown(index);
                        }
                        else{
                          if(width < 769){
                            setIsOpen(false);
                            toggleDropdown(index);
                          }
                          else{
                            toggleDropdown(index);
                          }
                        }
                      }}
                    >
                      <div
                        className={`flex flex-row justify-between w-full py-[12px] px-[10px] items-start ${
                          location.pathname == item.path[0] && `bg-[#12A83333] rounded-[8px]` || location.pathname == item.path[1] && `bg-[#12A83333] rounded-[8px]`
                        } hover:bg-[#12A83333] hover:rounded-[8px] ${
                          !isOpen && (
                            `ml-[10px] max-w-12 pl-[15px]`
                          )
                        } ${
                          dropdowns[index] ? 'bg-[#12A83333] rounded-lg' : ''
                        } `}
                      >
                        <div
                          className="flex items-center"
                        >
                          <span>{item.icon}</span>
                          <p
                            className={`ml-[12px] font-poppins text-[16px] font-medium text-left ${
                              !isOpen && (
                                `hidden`
                              )
                            }`}
                          >{item.label}</p>
                        </div>
                        <button
                          type='button'
                          className="float-right mt-[2px]"
                        >
                          {
                            dropdowns[index] ? <ChevronUp /> : <ChevronDown />
                          }
                        </button>
                      </div>
                    </button>
                    {
                      dropdowns[index] && (
                        <div
                          className={`flex flex-col bg-white rounded-b-lg shadow-xl h-fit absolute w-[93.5%] mt-[53px]`}
                          ref={(el) => (dropdownRef.current[index] = el)}
                        >
                          {
                            item.subDomain.map((element, key) => {
                              if(rolePermissions[item.name][element?.name]?.overall) {
                                // console.log(element?.name, rolePermissions[item.name][element?.name])
                                return(
                                  <div
                                    className={`first:border-t-0 border-t-[1px] border-black py-[5px] px-[5px] items-start`}
                                    key={key}
                                  >
                                    <button
                                      type='button'
                                      onClick={() => {navigate(element.path)}}
                                    >
                                      {/*  border-t-[1px]  */}
                                      <button
                                        type='button'
                                        className="flex flex-row items-center"
                                        onClick={() => {
                                          if(width < 769){
                                            setIsOpen(false);
                                            toggleDropdown(index);
                                          }
                                          else{
                                            toggleDropdown(index);
                                          }
                                        }}
                                      >
                                        <Dot />
                                        {element.label}
                                      </button>
                                    </button>
                                  </div>
                                )
                              }
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                </>
              )
            }
            else{
              if(rolePermissions[item.name]?.overall) {
                return(
                  <>
                    <div key={index}
                      className="flex flex-row px-[7px] my-[4px]"
                    >
                      <button
                        type='button'
                        onClick={() => {navigate(item.path[0])}}
                        className="w-full"
                      >
                        <div
                          className={`flex flex-row justify-between w-full py-[12px] px-[10px] items-start ${
                            location.pathname == item.path[0]  && `bg-[#12A83333] rounded-[8px]`
                          } hover:bg-[#12A83333] hover:rounded-[8px] ${
                              !isOpen && (
                                `ml-[10px] max-w-12 pl-[15px]`
                              )
                            }`}
                        >
                          <div
                            className="flex items-center"
                          >
                            <span>{item.icon}</span>
                            <p
                              className={`ml-[12px] font-poppins text-[16px] font-medium ${
                                !isOpen && (
                                  `hidden`
                                )
                              }`}
                            >{item.label}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  
                  </>
                )
              }
            }
          })
        }

        <div
          className="sticky top-[100vh] border-t-[1px] border-custom-white6 pt-[30px] pb-[15px] mt-[35px]"
        >
          {
            rolePermissions?.settings?.overall && links2 && links2.map((item, index) => {
              if(item.path[0] == '/logout'){
                return(
                  <div key={index}
                    className="flex flex-row px-[7px] my-[4px] text-custom-red"
                  >
                    <button
                      type='button'
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <div
                        className={`flex flex-row py-[12px] px-[10px] ${
                          location.pathname == item.path[0] && `bg-custom-red text-white rounded-lg`
                        } hover:bg-[#E02424] hover:rounded-lg hover:text-white ${
                          !isOpen && (
                            `ml-[10px] max-w-12 pl-[15px]`
                          )
                        }`}
                      >
                        <span>{item.icon}</span>
                        <p
                          className={`ml-3 font-poppins text-base font-medium ${
                            !isOpen && (
                              `hidden`
                            )
                          }`}
                        >{item.label}</p>
                      </div>
                    </button>
                  </div>
                )
              }
              else{
                return(
                  <>
                    {
                      dropdowns[index] && (
                        <div
                          className={`flex flex-col bg-white rounded-t-lg shadow-xl h-fit absolute w-[92%] mt-[-101px] ml-[8px]`}
                          ref={(el) => (dropdownRef.current[index] = el)}
                        >
                          {
                            item.subDomain.map((element, key) => {
                              if(rolePermissions?.settings[element.name]) {
                                return(
                                  <div
                                    className={`first:border-t-0 border-t-[1px] border-black py-[5px] px-[5px]`}
                                    key={key}
                                  >
                                    <button
                                      type='button'
                                      onClick={() => {navigate(element.path)}}
                                    >
                                      {/*  border-t-[1px]  */}
                                      <button
                                        type='button'
                                        className="flex flex-row"
                                        onClick={() => {
                                          if(width < 769){
                                            setIsOpen(false);
                                            toggleDropdown(index);
                                          }
                                          else{
                                            toggleDropdown(index);
                                          }
                                        }}
                                      >
                                        <Dot />
                                        {element.label}
                                      </button>
                                    </button>
                                  </div>
                                )
                              }
                            })
                          }
                        </div>
                      )
                    }
                    <div key={index}
                      className="flex flex-row px-[7px] my-[4px]"
                    >
                      <button
                        type='button'
                        className="w-full"
                        onClick={() => {
                          if(dropdowns[index]){
                            setIsOpen(true);
                            toggleDropdown(index);
                          }
                          else{
                            if(width < 769){
                              setIsOpen(false);
                              toggleDropdown(index);
                            }
                            else{
                              toggleDropdown(index);
                            }
                          }
                        }}
                      >
                        <div
                          className={`flex-row-between w-full py-[12px] px-[10px] hover:bg-[#12A83333] hover:rounded-lg ${
                            !isOpen && (
                              `ml-[10px] max-w-12 pl-[15px]`
                            )
                          } ${
                            dropdowns[index] ? 'bg-[#12A83333] rounded-lg' : ''
                          } ${
                            (location.pathname == item.path[0] || location.pathname == item.path[1] || location.pathname == item.path[2]) && ( `bg-[#12A83333] rounded-lg` )
                          }`}
                        >
                          <div
                            className="grid grid-cols-[auto,1fr]"
                          >
                            <span>{item.icon}</span>
                            <p
                              className={`ml-3 font-poppins text-base font-medium ${
                                !isOpen && (
                                  `hidden`
                                )
                              }`}
                            >{item.label}</p>
                          </div>
                          <button
                            type='button'
                            className="float-right mt-[2px]"
                          >
                            {
                              dropdowns[index] ? <ChevronDown /> : <ChevronUp />
                            }
                          </button>
                        </div>
                      </button>
                    </div>
                  </>
                )
              }
            })
          }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;