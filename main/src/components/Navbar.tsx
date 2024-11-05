import React, { useEffect, useState } from "react";
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
import { useAppDispatch } from "store/hooks";
import { setTokenDetails } from "store/authSlice";
import { RiCashFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    localStorage.getItem("profileImage") || null
  );
  const [username] = useState("Robert Clive"); // Replace with actual username
  const [email] = useState("roberclive@domain.co.in"); // Replace with actual email
  const [width, setWidth] = useState(window.innerWidth);
  const dropdown="dropdown"
  const [ dropdowns, setDropdowns ] = useState({
    dropdown1: "hidden",
    dropdown2: "hidden",
    dropdown4: "hidden",
    dropdown9: "hidden",
  });

  const links = [
    {
      path: ["/dashboard"],
      label: "Dashboard",
      icon: <ChartLine className="navbar-w-h" />,
      subDomain: [],
    },
    {
      path: ["/customers"],
      label: "Customer Management",
      icon: <ListChecks className="w-[18.5px] h-[15.5px] mt-[17px] border-[2px] border-[#000000] rounded-[5px]" />,
      subDomain: [],
    },
    {
      path: ["/customer-group", "/voucher-list"],
      label: "Voucher Management",
      icon: <TicketPercent className={`${isOpen ? "navbar-w-h-2 mt-[11px]" : "navbar-w-h"}`} />,
      subDomain: [
        { path: '/customer-group', label: 'Customer group' },
        { path: '/voucher-list', label: 'Voucher list' }
      ]
    },
    {
      path: ["/notification-template"],
      label: "Notification Template",
      icon: <LayoutTemplate className={`${isOpen ? "navbar-w-h-2 mt-[11px]" : "navbar-w-h"}`} />,
      subDomain: [],
    },
    {
      path: ["/plan-and-price-setup", "/gemini-setup"],
      label: "Subscription Master",
      icon: <i className={`bi bi-cash-stack ${isOpen ? "navbar-w-h-2 mt-[11px]" : "navbar-w-h"}`}></i>,
      subDomain: [
        { path: '/plan-and-price-setup', label: 'Plan & price setup' },
        { path: '/gemini-setup', label: 'Gemini setup' },
      ],
    },
    {
      path: ["/payment-method"],
      label: "Payment Method",
      icon: <CiCreditCard1 className="navbar-w-h" />,
      subDomain: [],
    },
    {
      path: ["/billing-history"],
      label: "Billing History",
      icon: <ReceiptText className="navbar-w-h" />,
      subDomain: [],
    },
    {
      path: ["/faqs"],
      label: "FAQ's",
      icon: <MessageCircleQuestion className="navbar-w-h" />,
      subDomain: [],
    },
    {
      path: ["/email-log"],
      label: "Email Log",
      icon: <History className="navbar-w-h" />,
      subDomain: [],
    },
    {
      path: ["/user-list", "/role"],
      label: "Role Management",
      icon: <UserPen className={`${isOpen ? "navbar-w-h-2 mt-[11px]" : "navbar-w-h"}`} />,
      subDomain: [
        { path: '/user-list', label: 'User list' },
        { path: '/role', label: 'Role' },
      ],
    },
    {
      path: ["/cms"],
      label: "CMS",
      icon: <GitPullRequestDraft className="navbar-w-h" />,
      subDomain: [],
    },
  ];
  
  const links2= [
    {
      path: ["/customer-agreement", "/privacy-policy", "/terms-and-conditions"],
      label: "Settings",
      icon: <Settings className="navbar-w-h" />,
      subDomain: [
        { path: '/customer-agreement', label: 'Customer agreement' },
        { path: '/privacy-policy', label: 'Privacy policy' },
        { path: '/terms-and-conditions', label: 'Terms & conditions' },
      ],
    },
    {
      path: ["/logout"],
      label: "Logout",
      icon: <RiLogoutCircleLine className="navbar-w-h" />,
      subDomain: [],
    },
  ]

  const handleLogout = async () => {
    dispatch(setTokenDetails(""));
    navigate("/login");
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
    }
    else{
      setIsOpen(true);
    }
  }, [width]);

  return (
    <aside
      className={`h-full sticky transition-all duration-300 ease-in-out shadow-md bg-[#F4F4F4] ${
        isOpen ? "max-w-[307px]" : "max-w-20"
      } pt-[24px] drop-shadow-md`}
    >
      <div
        className={`transition-all duration-300 ease-in-out text-black flex flex-col`}
        // 
      >
        {
          links && links.map((item, index) => {
            if(item.path == '/dashboard'){
              return(
                <>
                  <div key={index}
                    className="flex flex-row px-[7px] border-b-[1px] border-[#E4E4E4] pb-[20px] my-[4px]"
                  >
                    <Link
                      to={item.path[0]}
                      className="w-full"
                    >
                      <div
                        className={`flex flex-row w-full py-[12px] px-[10px] ${
                          location.pathname == item.path[0]  && `bg-[#12A83333] rounded-[8px]`
                        } hover:bg-[#12A83333] hover:rounded-[8px] ${
                          !isOpen && (
                            `ml-[10px] max-w-12 pl-[15px]`
                          )
                        }`}
                      >
                        {item.icon}
                        <p
                          className={`ml-[12px] font-poppins text-[16px] font-medium ${
                            !isOpen && (
                              `hidden`
                            )
                          }`}
                        >{item.label}</p>
                      </div>
                    </Link>
                  </div>

                  <div>
                    <a
                      className="float-right mr-[-9px] mt-[-16px] cursor-pointer"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setDropdowns({
                          dropdown1: "hidden",
                          dropdown2: "hidden",
                          dropdown4: "hidden",
                          dropdown9: "hidden",
                        });
                      }}
                    >
                      <i className={`bi ${
                        isOpen ? `bi-text-indent-right` : 'bi-text-indent-left'
                      } text-[14px] text-white bg-custom-green border-[2px] border-custom-green rounded-full w-[21px] h-[21px] px-[2px]`}></i>
                    </a>
                  </div>
                </>
              )
            }
            else if(item.subDomain.length != 0){
              return(
                <>
                  <div key={index}
                    className="flex flex-row px-[7px] my-[4px]t"
                  >
                    <button
                      type='button'
                      className={`w-full`}
                      onClick={() => {
                        if(dropdowns["dropdown"+index] == "hidden"){
                          setIsOpen(true);
                          setDropdowns({
                            ...dropdowns,
                            ["dropdown"+index]: ""
                          })
                        }
                        else{
                          if(width <= 768){
                            setIsOpen(false);
                            setDropdowns({
                              dropdown1: "hidden",
                              dropdown2: "hidden",
                              dropdown4: "hidden",
                              dropdown9: "hidden"
                            })
                          }
                          else{
                            setDropdowns({
                              dropdown1: "hidden",
                              dropdown2: "hidden",
                              dropdown4: "hidden",
                              dropdown9: "hidden"
                            })
                          }
                        }
                      }}
                    >
                      <div
                        className={`flex flex-row justify-between w-full py-[12px] px-[10px] ${
                          location.pathname == item.path[0] && `bg-[#12A83333] rounded-[8px]` || location.pathname == item.path[1] && `bg-[#12A83333] rounded-[8px]`
                        } hover:bg-[#12A83333] hover:rounded-[8px] ${
                            !isOpen && (
                              `ml-[10px] max-w-12 pl-[15px]`
                            )
                          }`}
                      >
                        <div
                          className="flex flex-row transition-all duration-300 ease-in-out"
                        >
                          {item.icon}
                          <p
                            className={`ml-[12px] font-poppins text-[16px] font-medium text-left ${
                              !isOpen && (
                                `hidden`
                              )
                            }`}
                          >{item.label}</p>
                        </div>
                        <a
                          className="float-right mt-[2px]"
                        >
                          {
                            dropdowns["dropdown"+index] == "hidden" ? <ChevronDown /> : <ChevronUp />
                          }
                        </a>
                      </div>
                    </button>
                  </div>
                  <div
                    className="flex flex-col mx-[11px] mt-[-5px] bg-white rounded-b-lg shadow-md"
                  >
                    {
                      item.subDomain.map((element, key) => {
                        return(
                          <div
                            className={`border-t-[1px] border-custom-white w-full py-[5px] px-[5px] ${dropdowns["dropdown"+index]}`}
                            key={key}
                          >
                            <Link
                              to={element.path}
                            >
                              {/*  border-t-[1px]  */}
                              <a
                                className="flex flex-row"
                                onClick={() => {
                                  if(width <= 768){
                                    setIsOpen(false);
                                    setDropdowns({
                                      dropdown1: "hidden",
                                      dropdown2: "hidden",
                                      dropdown4: "hidden",
                                      dropdown9: "hidden"
                                    })
                                  }
                                  else{
                                    setDropdowns({
                                      dropdown1: "hidden",
                                      dropdown2: "hidden",
                                      dropdown4: "hidden",
                                      dropdown9: "hidden"
                                    })
                                  }
                                }}
                              ><Dot />{element.label}</a>
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </>
              )
            }
            else{
              return(
                <>
                  <div key={index}
                    className="flex flex-row px-[7px] my-[8px]"
                  >
                    <Link
                      to={item.path[0]}
                      className="w-full"
                    >
                      <div
                        className={`flex flex-row justify-between w-full py-[12px] px-[10px] ${
                          location.pathname == item.path[0]  && `bg-[#12A83333] rounded-[8px]`
                        } hover:bg-[#12A83333] hover:rounded-[8px] ${
                            !isOpen && (
                              `ml-[10px] max-w-12 pl-[15px]`
                            )
                          }`}
                      >
                        <div
                          className="flex flex-row"
                        >
                          {item.icon}
                          <p
                            className={`ml-[12px] font-poppins text-[16px] font-medium ${
                              !isOpen && (
                                `hidden`
                              )
                            }`}
                          >{item.label}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                
                </>
              )
            }
          })
        }

        <div
          className="sticky top-[100vh] border-t-[1px] border-custom-white6 pt-[30px] pb-[15px] mt-[15px]"
        >
          {
            links2 && links2.map((item, index) => {
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
                        className={`flex flex-row w-full py-[12px] px-[10px] ${
                          location.pathname == item.path[0] && `bg-custom-red text-white rounded-lg`
                        } hover:bg-[#E02424] hover:rounded-lg hover:text-white ${
                          !isOpen && (
                            `ml-[10px] max-w-12 pl-[15px]`
                          )
                        }`}
                      >
                        {item.icon}
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
                    <div
                      className="flex flex-col mx-[11px] mb-[-3px] bg-white rounded-t-lg shadow-md"
                    >
                      {
                        item.subDomain.map((element, key) => {
                          return(
                            <div
                              className={`border-t-[1px] border-custom-white w-full py-[5px] px-[5px] ${dropdowns["dropdown1"]}`}
                              key={key}
                            >
                              <Link
                                to={element.path}
                              >
                                {/*  border-t-[1px]  */}
                                <a
                                  className="flex flex-row"
                                  onClick={() => {
                                    if(width <= 768){
                                      setIsOpen(false);
                                      setDropdowns({
                                        dropdown1: "hidden",
                                        dropdown2: "hidden",
                                        dropdown4: "hidden",
                                        dropdown9: "hidden"
                                      })
                                    }
                                    else{
                                      setDropdowns({
                                        dropdown1: "hidden",
                                        dropdown2: "hidden",
                                        dropdown4: "hidden",
                                        dropdown9: "hidden"
                                      })
                                    }
                                  }}
                                ><Dot />{element.label}</a>
                              </Link>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div key={index}
                      className="flex flex-row px-[7px] my-[4px]"
                    >
                      <button
                        type='button'
                        className="w-full"
                        onClick={() => {
                          if(dropdowns["dropdown1"] == "hidden"){
                            setIsOpen(true);
                            setDropdowns({
                              ...dropdowns,
                              dropdown1: ""
                            })
                          }
                          else{
                            if(width <= 768){
                              setIsOpen(false);
                              setDropdowns({
                                dropdown1: "hidden",
                                dropdown2: "hidden",
                                dropdown4: "hidden",
                                dropdown9: "hidden"
                              })
                            }
                            else{
                              setDropdowns({
                                dropdown1: "hidden",
                                dropdown2: "hidden",
                                dropdown4: "hidden",
                                dropdown9: "hidden"
                              })
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
                            (location.pathname == item.path[0] || location.pathname == item.path[1] || location.pathname == item.path[2] || location.pathname == item.path[3]) && ( `bg-[#12A83333] rounded-lg` )
                          }`}
                        >
                          <div
                            className="flex flex-row transition-all duration-300 ease-in-out"
                          >
                            {item.icon}
                            <p
                              className={`ml-3 font-poppins text-base font-medium ${
                                !isOpen && (
                                  `hidden`
                                )
                              }`}
                            >{item.label}</p>
                          </div>
                          <a
                            className="float-right mt-[2px]"
                          >
                            {
                              dropdowns["dropdown1"] == "hidden" ? <ChevronUp /> : <ChevronDown />
                            }
                          </a>
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