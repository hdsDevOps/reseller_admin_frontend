import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { format } from 'date-fns';
import { ArrowRightLeft, ChevronRight, Pencil } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi';
import { RiEyeCloseLine } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const initialSmtp = {
  smtp_provider: "",
  provider_name: "",
  smtp_server: "",
  smtp_port_number: "",
  username: "",
  email: "",
  password: ""
};

const testData = [
  {
    smtp_provider: "Smtp 1",
    provider_name: "Provider 1",
    smtp_server: "abc server",
    smtp_port_number: "1000",
    username: "provider1",
    email: "provider1@gmail.com",
    password: "provider123"
  },
  {
    smtp_provider: "Smtp 2",
    provider_name: "Provider 2",
    smtp_server: "xyz server",
    smtp_port_number: "2000",
    username: "provider2",
    email: "provider2@gmail.com",
    password: "provider123"
  },
  {
    smtp_provider: "Smtp 3",
    provider_name: "Provider 3",
    smtp_server: "mno server",
    smtp_port_number: "3000",
    username: "provider3",
    email: "provider3@gmail.com",
    password: "provider123"
  },
]

const EmailServices: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetails, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const modalRef = useRef();
  const [deleteModal, setDeleteModal] = useState(false);

  const [smtpList, setSmtpList] = useState(testData);
  const [newSmtp, setNewSmtp] = useState(initialSmtp);
  const [smtpId, setSmtpId] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const tableHeads = [
    {name: "provider_name", label: "Provider Name"},
    {name: "smtp_server", label: "SMTP Server"},
    {name: "smtp_port_number", label: "SMTP Port Number"},
    {name: "username", label: "Username"},
    {name: "email", label: "Email"},
    {name: "action", label: "Action"},
  ];

  const formFormat = [
    {label: 'SMTP Provider', type: 'select', name: 'smtp_provider', placeholder: 'Select your SMTP provider',},
    {label: 'Provider Name', type: 'text', name: 'provider_name', placeholder: 'Enter your provider name',},
    {label: 'SMTP Server', type: 'text', name: 'smtp_server', placeholder: 'Enter your smtp server',},
    {label: 'SMTP Port Number', type: 'text', name: 'smtp_port_number', placeholder: 'Enter your smtp port number',},
    {label: 'Username', type: 'text', name: 'username', placeholder: 'Enter your username',},
    {label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email',},
    {label: 'Password', type: 'password', name: 'password', placeholder: 'Enter your password',},
  ];

  const updateSmtpData = (e) => {
    setNewSmtp({
      ...newSmtp,
      [e.target.name]: e.target.value,
    });
  };

  const validateSmtpData = () => {
    if(
      newSmtp?.smtp_provider === "" || newSmtp?.smtp_provider?.trim() === "" ||
      newSmtp?.provider_name === "" || newSmtp?.provider_name?.trim() === "" ||
      newSmtp?.smtp_server === "" || newSmtp?.smtp_server?.trim() === "" ||
      newSmtp?.smtp_port_number === "" || newSmtp?.smtp_port_number?.trim() === "" ||
      newSmtp?.username === "" || newSmtp?.username?.trim() === "" ||
      newSmtp?.email === "" || newSmtp?.email?.trim() === "" ||
      newSmtp?.password === "" || newSmtp?.password?.trim() === ""
    ) {
      return false;
    }
    return true;
  };

  const addNewSmtp = () => {
    if(validateSmtpData()) {
      console.log("new smtp...", newSmtp);
    } else {
      toast.warning("Input fields cannot be empty.");
    }
  };

  const editNewSmtp = () => {
    if(validateSmtpData()) {
      console.log("new smtp...", newSmtp);
    } else {
      toast.warning("Input fields cannot be empty.");
    }
  };

  const smtpSubmit = (e) => {
    e.preventDefault();
    if(isEdit) {
      editNewSmtp();
    } else {
      addNewSmtp();
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text">Email services</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              onClick={() => {
                setModalOpen(true);
                setIsEdit(false);
              }}
              className="btn-green w-[139px] items-center"
              type="button"
              button-name="voucher-list-add-new-btn"
              disabled={!rolePermissionsSlice?.settings?.dashboard_widget ? true : false}
            >
              <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
              Add new
            </button>
          </div>
        </div>
        <div
          className='flex flex-row mt-5 h-[22px]'
        >
          <p
            className='page-indicator-1'
          >Settings</p>
          <ChevronRight
            className='page-indicator-arrow-4'
          />
          <p
            className='page-indicator-2'
          >Email services</p>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-[20px] mt-5">
        <table className="min-w-[1100px] lg:min-w-full max-h-screen">
          <thead className="bg-custom-blue-6 h-[53px]">
            <tr>
              {
                tableHeads.map((head, index) => (
                  <th key={index} className="th-css-2">
                    <span>{head.label}</span>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-white mt-3">
            {
              smtpList?.length>0 ? smtpList?.map((item, index) => {
                return(
                  <tr key={index} className="text-center">
                    <td className="td-css-2">{item?.provider_name}</td>
                    <td className="td-css-2">{item?.smtp_server}</td>
                    <td className="td-css-2">{item?.smtp_port_number}</td>
                    <td className="td-css-2">{item?.username}</td>
                    <td className="td-css-2">{item?.email}</td>
                    <td className="">
                      <div className="flex items-center justify-center gap-3 my-1">
                        <div className="flex flex-row gap-1">
                          <button
                            className="cursor-pointer text-black hover:text-orange-300"
                            onClick={() => {
                              setNewSmtp(item);
                              setIsEdit(true);
                              setModalOpen(true);
                            }}
                            button-name="voucher-list-edit"
                            disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.add ? true : false}
                          >
                            <Pencil className=" w-5" />
                          </button>
                          <button
                            className="cursor-pointer text-black hover:text-red-600 text-md"
                            onClick={() => {
                              setDeleteModal(true);
                              setSmtpId("");
                            }}
                            disabled={!rolePermissionsSlice?.voucher_management?.voucher_list?.delete ? true : false}
                          >
                            <FaTrash role="img" aria-label="trash" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              }): 
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {
        deleteModal && (
          <Dialog
            open={deleteModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setDeleteModal(false);
              setSmtpId("");
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Delete Voucher</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setDeleteModal(false);
                          setSmtpId("");
                        }}
                      >+</button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8"
                  >
                    <p
                      className="font-warning-popup-message"
                    >Are you sure want to delete this SMTP?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="btn-green-2 w-[79px]"
                      type="button"
                      onClick={() => {
                        //
                      }}
                    >Yes</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setDeleteModal(false);
                        setSmtpId("");
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }

      {
        isModalOpen && (
          <Dialog
            open={isModalOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setModalOpen(false);
              setNewSmtp(initialSmtp);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <form onSubmit={smtpSubmit} className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >{isEdit ? "Edit " : "Add "}your own email service</DialogTitle>
                    <button
                      className="bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                      onClick={() => {
                        setModalOpen(false);
                        setNewSmtp(initialSmtp);
                      }}
                      aria-label="Close"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div
                    className="my-4"
                  >
                    <p>Configure your SMTP provider like Outlook, Gsuite Sendgrid, etc</p>
                  </div>

                  <div className='flex flex-col max-h-[300px] overflow-y-auto'>
                    {
                      formFormat.map((form, index) => {
                        if(form.type === "select") {
                          return (
                            <div
                              key={index}
                              className='flex flex-col px-2 mb-2'
                            >
                              <label
                                className='float-left text-sm font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                              >{form.label}</label>
                              <select
                                className={`w-full h-10 border border-cWhite py-2 px-[9px] rounded-lg font-inter font-normal text-base focus:outline-none -mt-2 ${newSmtp[form.name] === "" ? "text-[#8A8A8A]" : "text-black"}`}
                                name={form.name}
                                onChange={updateSmtpData}
                                value={newSmtp[form.name] || ""}
                                required
                              >
                                <option selected value="" className='text-[#8A8A8A]'>{form.placeholder}</option>
                                <option selected value="SMTP" className='text-black'>SMTP</option><option selected value="Other" className='text-black'>Other</option>
                              </select>
                            </div>
                          )
                        } else if(form.name === "email") {
                          return (
                            <div
                              key={index}
                              className='flex flex-col px-2 mb-2'
                            >
                              <label
                                className='float-left text-sm font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                              >{form.label}</label>
                              <input
                                type={form.type}
                                name={form.name}
                                value={newSmtp[form.name] || ""}
                                required
                                className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                onChange={updateSmtpData}
                                placeholder={form?.placeholder}
                              />
                            </div>
                          )
                        } else if(form.name === "password") {
                          return (
                            <div
                              key={index}
                              className='flex flex-col px-2 mb-2'
                            >
                              <label
                                className='float-left text-sm font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                              >{form.label}</label>
                              <input
                                type={showPassword ? "text" : "password"}
                                name={form.name}
                                value={newSmtp[form.name] || ""}
                                required
                                className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                onChange={updateSmtpData}
                                placeholder={form?.placeholder}
                                minLength={8}
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
                          )
                        } else {
                          return (
                            <div
                              key={index}
                              className='flex flex-col px-2 mb-2'
                            >
                              <label
                                className='float-left text-sm font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                              >{form.label}</label>
                              <input
                                type={form.type}
                                name={form.name}
                                value={newSmtp[form.name] || ""}
                                required
                                className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                onChange={updateSmtpData}
                                placeholder={form?.placeholder}
                              />
                            </div>
                          )
                        }
                      })
                    }
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="btn-green-2 w-[79px]"
                      type="submit"
                    >{isEdit ? "Edit" : "Add"}</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setModalOpen(false);
                        setNewSmtp(initialSmtp);
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </form>
            </div>
          </Dialog>
        )
      }
    </div>
  )
};

export default EmailServices;