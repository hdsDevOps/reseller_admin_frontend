import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import { ChevronRight } from 'lucide-react';
import { LuFilterX } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
  IoClose,
} from "react-icons/io5";
import UserListData, { User } from "../components/UserListData";
import '../styles/styles.css';

const UserList = () => {
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');

  const formArray = [
    {label: 'First name', name: 'fname', placeholder: 'Enter First name', type: 'text'},
    {label: 'Last name', name: 'lname', placeholder: 'Enter Last name', type: 'text'},
    {label: 'Email address', name: 'email', placeholder: 'Enter Email address ', type: 'text'},
    {label: 'Phone No.', name: 'phone', placeholder: 'Enter Phone No.', type: 'number'},
    {label: 'Role', name: 'userType', placeholder: 'Select user type', type: 'select'},
  ];

  const modalFormat = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    userType: '',
  };
  const [modalData, setModalData] = useState(modalFormat);

  const updateModalData = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value
    });
  };
  

  const tableHeaders = ['Name', 'Email', 'Phone', 'User Type', 'Actions',];
  const userTypeColors = {
    Admin: "#B4D3DC",
    "Sub-admin": "#C5E0B2",
    Account: "#E2BFC6",
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const convertToPhoneNumber = (phoneString) => {
    return phoneString.replace(/\D/g, '');
  };

  const separateEmail = (email) => {
    const [username, domain] = email.split('@');
    
    if (username && domain) {
        return { username, domain };
    } else {
        throw new Error("Invalid email format");
    }
  };

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

  return (
    <div className="grid grid-cols-1">
      <div className="flex-row-between-responsive sm:mr-10 max-sm:mr-0">
        <h3 className="h3-text">
          User List
        </h3>
      </div>
      <div
        className='flex flex-row mt-5 h-[22px]'
      >
        <p
          className='page-indicator-1'
        >Role management</p>
        <ChevronRight
          className='page-indicator-arrow'
        />
        <p
          className='page-indicator-2'
        >User list</p>
      </div>
      <div className="bg-custom-white-2 mt-[33px] p-[19px] flex min-[1150px]:flex-row max-[1150px]:flex-col items-center justify-between">
        <button
          className="btn-green-3 ml-[9px]"
          onClick={() => {
            setIsModalOpen(true);
            setModalData(modalFormat);
            setModalType('add');
          }}
        >
          Add User
        </button>

        <div
          className="flex flex-row"
        >
          <div
            className="flex min-[985px]:flex-row max-[985px]:flex-col min-[985px]:justify-between max-[985px]:justify-center max-[985px]:items-center max-[1150px]:py-2 min-[1150px]:py-0 gap-2"
          >
            <select
              className="select-input-no-radius min-[985px]:w-[315px] max-[985px]:w-full h-10"
            >
              <option defaultChecked hidden value=''>User Type</option>
              <option value="Admin">Admin</option>
              <option value="Sub-admin">Sub-admin</option>
              <option value="Account">Account</option>
            </select>

            <div
              className="flex min-[536px]:flex-row max-[536px]:flex-col max-[985px]:mt-2"
            >
              <input type="text" placeholder="Name,Email,Phone" className="serach-input-no-radius min-[985px]:w-[315px] max-[985px]:w-full" />
              <div
                className="flex flex-row gap-3 min-[536px]:mt-0 max-[536px]:mt-2 max-[536px]:justify-between"
              >
                <button
                  type="button"
                  className="btn-green-no-radius"
                >Seacrh</button>

                <button>
                  <LuFilterX
                    className="text-[20px] text-custom-green"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-[22px] p-[6px]">
        <table className="min-w-full">
          <thead className="bg-custom-blue-6 h-12">
            <tr>
              {
                tableHeaders && tableHeaders.map((item, index) => {
                  return(
                    <th key={index} className="th-css-full-opacity">{item}</th>
                  )
                })
              }
            </tr>
          </thead>

          <tbody>
            {
              UserListData && UserListData.map((item, index) => {
                return(
                  <tr key={index}>
                    <td
                      className="flex flex-row m-2"
                    >
                      <p className={`td-initial bg-[${userTypeColors[item?.userType]}] text-center pt-3 rounded-full`}>{getInitials(item?.fname)}{getInitials(item?.lname)}</p>
                      <p className="td-css-text pt-2">{item?.fname} {item?.lname}</p>
                    </td>
                    <td className="td-css-text m-2">{item?.email}</td>
                    <td className="td-css-text m-2">{item?.phone}</td>
                    <td className="td-css-text m-2">{item?.userType}</td>
                    <td className="td-css-text m-2">
                      <div
                        className="flex flex-row justify-center gap-4"
                      >
                        <button
                          onClick={() => {
                            setModalType('edit');
                            setModalData(item);
                            setIsModalOpen(true);
                          }}
                        >
                          <BiSolidEditAlt className="text-black text-xl" />
                        </button>
                        <button>
                          <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </div>
      {
        isModalOpen && (
          <div className="fixed-full-screen">
            <div className="fixed-popup min-[627px]:w-[627px] max-[627px]:w-full p-[17px]" ref={modalRef}>
              <div className="relative mb-10">
                <h3 className="h3-text-2">
                  {
                    modalType == 'add' ? 'Add User' : 'Edit User'
                  }
                </h3>
                <p className="font-inter-normal-12px-line36px">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, odio!
                </p>
                <span
                  className="absolute right-2 top-2 5 text-2xl font-medium cursor-pointer animate-pulse"
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalType('add');
                  }}
                >
                  <IoClose />
                </span>
              </div>
              <form>
                <div className="grid min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-2">
                  {
                    formArray && formArray.map((item, index) => {
                      if(item.type == 'number'){
                        return(
                          <div
                            className='flex flex-col px-2 mb-2 min-[450px]:col-span-2 max-[450px]:col-span-1'
                            key={index}
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name={item.name}
                              required
                              className='search-input-text px-4'
                              defaultValue={modalType == 'add' ? '' : convertToPhoneNumber(modalData[item.name])}
                              onChange={updateModalData}
                            />
                          </div>
                        )
                      }
                      else if(item.type == 'select'){
                        return(
                          <div
                            className='flex flex-col px-2 mb-2 min-[450px]:col-span-2 max-[450px]:col-span-1'
                            key={index}
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <select
                              className='search-select-input'
                              onChange={updateModalData}
                            >
                              <option defaultChecked hidden value={
                                modalType == 'add' ? '' : modalData.userType
                              }>{modalType == 'add' ? 'Select user type' : modalData.userType}</option>
                              <option value='Admin'>Admin</option>
                              <option value='Sub-admin'>Sub-admin</option>
                              <option value='Account'>Account</option>
                            </select>
                          </div>
                        )
                      }
                      else if(item.label == 'Email address'){
                        return(
                          <div
                            className='flex flex-col px-2 mb-2 min-[450px]:col-span-2 max-[450px]:col-span-1'
                            key={index}
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name={item.name}
                              required
                              className='search-input-text px-4'
                              defaultValue={modalType == 'add' ? '' : separateEmail(modalData[item.name]).username}
                              onChange={(e) => {
                                setModalData({
                                  ...modalData,
                                  email: `${e.target.value}@domain.com`
                                })
                              }}
                            />
                            <p
                              className="domain-name"
                            >{modalType == 'add' ? '@domain.com' : `@${separateEmail(modalData[item.name]).domain}`}</p>
                          </div>
                        )
                      }
                      else{
                        return(
                          <div
                            className='flex flex-col px-2 mb-2'
                            key={index}
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name={item.name}
                              required
                              className='search-input-text px-4'
                              onChange={updateModalData}
                              defaultValue={modalType == 'add' ? '' : modalData[item.name]}
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>

                <div className="flex flex-row justify-center gap-[52px] my-[44px]">
                  <button
                    type="submit"
                    className="btn-green w-[181px] h-[46px]"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setModalData(modalFormat);
                      setModalType('add');
                    }}
                    className="btn-red w-[181px] h-[46px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default UserList;
