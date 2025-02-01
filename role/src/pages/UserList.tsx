import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
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
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getRolesThunk, getUsersThunk, addUsersThunk, updateUsersThunk, deleteUsersThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setUserListFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactPaginate from "react-paginate";

const intialUserFilter = {
  role: "",
  searchdata: "",
  sortdata: {
    sort_text: "",
    order: "asc"
  }
};

const UserList = () => {
  const modalRef = useRef();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userListFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [users, setUsers] = useState([]);
  // console.log("users...", users);
  const [userFilter, setUserFilter] = useState(userListFilters === null ? intialUserFilter : userListFilters);

  useEffect(() => {
    const setUserListFiltersSlice = async() => {
      await dispatch(setUserListFiltersStatus(userFilter)).unwrap();
    }

    setUserListFiltersSlice();
  }, [userFilter]);

  const [searchData, setSearchData] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const backgroundColors = ['bg-[#B4D3DC]', 'bg-[#C5E0B2]', 'bg-[#E2BFC6]',];

  const formArray = [
    {label: 'First name', name: 'first_name', placeholder: 'Enter First name', type: 'text'},
    {label: 'Last name', name: 'last_name', placeholder: 'Enter Last name', type: 'text'},
    {label: 'Email address', name: 'email', placeholder: 'Enter Email address ', type: 'email'},
    {label: 'Phone No.', name: 'phone', placeholder: '+0 000 000 0000', type: 'text'},
    {label: 'User Type', name: 'role', placeholder: 'Select user type', type: 'select'},
  ];

  const modalFormat = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: '',
  };
  const [modalData, setModalData] = useState(modalFormat);
  // console.log("modal data....", modalData);

  const [isNumberValid, setIsNumberValid] = useState(false);
  console.log(isNumberValid);
  const [prevNumber, setPrevNumber] = useState("");

  useEffect(() => {
    if(prevNumber === modalData?.phone_no) {
      setIsNumberValid(true);
    }
  }, [prevNumber, modalData]);

  const updateModalData = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value
    });
  };
  
  const updateModalName = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setModalData({
      ...modalData,
      [e.target.name]: filteredValue
    });
  };
  
  const [roles, setRoles] = useState([]);
  // console.log("roles...", roles);

  const fetchUsers = async() => {
    try {
      const result = await dispatch(getUsersThunk(userFilter)).unwrap();
      console.log("result...", result);
      setUsers(result.users);
    } catch (error) {
      setUsers([]);
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

  useEffect(() => {
    fetchUsers();
  }, [userFilter]);

  const fetchRoles = async() => {
    try {
      const result = await dispatch(getRolesThunk({user_type: "", sortdata: { sort_text: "", order: "asc" }})).unwrap();
      // console.log("result...", result.roles);
      setRoles(result?.roles);
    } catch (error) {
      setRoles([]);
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

  useEffect(() => {
    fetchRoles();
  }, []);

  const roleName = (id:string) => {
    if(roles?.length > 0) {
      const roleTypeName = roles?.find(item => item?.id === id)?.role_name;
      return roleTypeName;
    } else {
      return "";
    }
  }

  const tableHeaders = [
    {name: "first_name", label: "Name"},
    {name: "email", label: "Email"},
    {name: "phone", label: "Phone"},
    {name: "role", label: "User Type"},
    {name: "action", label: "Actions"}];
  const roleColors = {
    Admin: "#B4D3DC",
    "Sub-admin": "#C5E0B2",
    Account: "#E2BFC6",
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const handlePhoneInputChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue
      .replace(/[^0-9+]/g, "")
      .replace(/(?!^)\+/g, "");
    setModalData((prevData) => ({
      ...prevData,
      phone: sanitizedValue,
    }));
  };

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setIsModalOpen(false);
      setPrevNumber("");
    }
  };

  const handlePhoneChange = (value: string) => {
    setModalData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const removePrefix = (input:string, prefix:string) => {
    if(input.startsWith(prefix)) {
      return input.slice(prefix.length);
    } else if(input.startsWith('0')) {
      return input.slice(1);
    }
    return input;
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

  useEffect(() => {
    if(!isModalOpen){
      setModalData(modalFormat);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if(!deleteModalOpen){
      setDeleteUserId("");
    }
  }, [deleteModalOpen]);

  const validateForm = () => {
    // Check for spaces only in any field
    if(
      modalData?.first_name?.trim() === "" ||
      modalData?.last_name?.trim() === "" ||
      modalData?.email?.trim() === "" ||
      modalData?.role?.trim() === "" ||
      modalData?.phone?.trim() === ""
    ) {
      return false;
    }
    return true;
  };

  const handleAddSubmit = async() => {
    if(isNumberValid) {
      if(validateForm()) {
        try {
          const result = await dispatch(addUsersThunk(modalData)).unwrap();
          setModalData(modalFormat);
          setModalType("add");
          setIsModalOpen(false);
          setPrevNumber("");
          setTimeout(() => {
            toast.success(result?.message);
          }, 1000);
        } catch (error) {
          if(error?.message == "Request failed with status code 401") {
            try {
              const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
              navigate('/login');
            } catch (error) {
              //
            }
          } else if(error === "Failed to add user.Error: The email address is already in use by another account.") {
            toast.error("The email address is already in use by another account.")
          } else {
            toast.error("Error adding user");
          }
        } finally {
          fetchUsers();
        }
      } else {
        toast.warning("Spaces cannot be empty");
      }
    } else {
      toast.warning("Please enter a valid number");
    }
  };

  const handleEditSubmit = async() => {
    if(isNumberValid) {
      if(validateForm()) {
        try {
          const result = await dispatch(updateUsersThunk(modalData)).unwrap();
          setModalData(modalFormat);
          setModalType("add");
          setIsModalOpen(false);
          setPrevNumber("");
          setTimeout(() => {
            toast.success(result?.message);
          }, 1000);
        } catch (error) {
          toast.error("Error adding user");
          if(error?.message == "Request failed with status code 401") {
            try {
              const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
              navigate('/login');
            } catch (error) {
              //
            }
          }
        } finally {
          fetchUsers();
        }
      } else {
        toast.warning("Spaces cannot be empty");
      }
    } else {
      toast.warning("Please enter a valid number");
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(modalType === "add"){
      handleAddSubmit();
    } else{
      handleEditSubmit()
    }
  };

  const handleDeleteUser = async(e) => {
    try {
      const result = await dispatch(deleteUsersThunk({id: deleteUserId})).unwrap();
      console.log("result...", result);
      setDeleteUserId("");
      setDeleteModalOpen(false);
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error adding user");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchUsers();
    }
  };

  const handleFilterSearch = () => {
    setUserFilter({
      ...userFilter,
      searchdata: searchData,
    });
  };

  const [currentPage, setCurrentPage] = useState(userListFilters === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(userListFilters === null ? 20 : itemsPerPageNumber);
  // console.log({currentPage, totalPages});

  useEffect(() => {
    const setCurrentPageNumberSlice = async() => {
      await dispatch(setCurrentPageStatus(currentPage)).unwrap();
    }

    setCurrentPageNumberSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageSlice = async() => {
      await dispatch(setItemsPerPageStatus(itemsPerPage)).unwrap();
    }

    setItemsPerPageSlice();
  }, [itemsPerPage]);
  
  // Calculate displayed data based on current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    if(users?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, users]);

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
            setPrevNumber("");
          }}
          disabled={!rolePermissionsSlice?.role_management?.user_list?.add ? true : false }
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
              onChange={e => {
                setUserFilter({
                  ...userFilter,
                  role: e.target.value,
                });
              }}
              name="role"
              value={userFilter?.role}
            >
              <option defaultChecked value=''>Select User Type</option>
              {
                roles?.map((role, idx) => (
                  <option key={idx} value={role?.id}>{role?.role_name}</option>
                ))
              }
            </select>

            <div
              className="flex min-[536px]:flex-row max-[536px]:flex-col max-[985px]:mt-2"
            >
              <input
                type="text"
                placeholder="Name,Email,Phone"
                className="serach-input-no-radius min-[985px]:w-[315px] max-[985px]:w-full min-w-[200px]"
                onChange={e => {setSearchData(e.target.value.replace(/\+/g, ""))}}
                value={searchData}
              />
              <div
                className="flex flex-row gap-3 min-[536px]:mt-0 max-[536px]:mt-2 max-[536px]:justify-between"
              >
                <button
                  type="button"
                  className="btn-green-no-radius"
                  onClick={() => {handleFilterSearch()}}
                >Seacrh</button>

                <button
                  type="button"
                  onClick={() => {
                    setUserFilter(intialUserFilter);
                    setSearchData("");
                  }}
                >
                  <LuFilterX
                    className="text-[20px] text-custom-green"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-3">
        <div className="flex items-center gap-1">
          <select
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value));
            }}
            value={itemsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20} selected>20</option>
            <option value={50}>50</option>
          </select>
          <label>items</label>
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-[10px] p-[6px]">
        <table className="min-w-full">
          <thead className="bg-custom-blue-6 h-12">
            <tr>
              {
                tableHeaders && tableHeaders.map((item, index) => {
                  return(
                    <th key={index} className="th-css-full-opacity">
                      <span>{item.label}</span>
                      {
                        item.name === "first_name" ?
                        <span className="ml-1"><button type="button" onClick={() => {
                          setUserFilter({
                            ...userFilter,
                            sortdata: {
                              sort_text: item.name,
                              order: userFilter?.sortdata?.sort_text === item.name
                              ? userFilter?.sortdata?.order === "desc"
                                ? "asc"
                                : "desc"
                              : "asc"
                            }
                          })
                        }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span> : ""
                      }
                    </th>
                  )
                })
              }
            </tr>
          </thead>

          <tbody>
            {
              currentItems?.length> 0 ? currentItems?.map((user, index) => {
                return(
                  <tr key={index}>
                    <td
                      className="flex flex-row m-2 justify-center items-center"
                    >
                      <p
                        className={`td-initial text-center pt-3 rounded-full ${backgroundColors[index % backgroundColors.length]}`}
                        // bg-[${roleColors[item?.role]}]
                      >{user?.first_name?.charAt(0).toUpperCase()}{user?.last_name?.charAt(0).toUpperCase()}</p>
                      <p className="td-css-text">{user?.first_name} {user?.last_name}</p>
                    </td>
                    <td className="td-css-text m-2">{user?.email}</td>
                    <td className="td-css-text m-2">+{user?.phone}</td>
                    <td className="td-css-text m-2">{roleName(user?.role)}</td>
                    <td className="td-css-text m-2">
                      {
                        roleName(user?.role) === 'Super Admin' ?
                        (<div
                          className="flex flex-row justify-center gap-4"
                        ></div>) :
                        (
                          <div
                            className="flex flex-row justify-center gap-4"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setModalType('edit');
                                setModalData(user);
                                setIsModalOpen(true);
                                setPrevNumber(user?.phone_no);
                              }}
                              disabled={!rolePermissionsSlice?.role_management?.user_list?.edit ? true : false }
                            >
                              <BiSolidEditAlt className="text-black text-xl" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteModalOpen(true);
                                setDeleteUserId(user?.id);
                              }}
                              disabled={!rolePermissionsSlice?.role_management?.user_list?.delete ? true : false }
                            >
                              <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
                            </button>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                )
              }) : 
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
            
          </tbody>
        </table>
        <div className="flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                }}
                disabled={currentPage === totalPages - 1}
                className={`px-3 py-1 text-sm ${
                  currentPage === totalPages - 1
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-r transition`}
              >
                Next
              </button>
            )}
            onPageChange={(event) => {
              setCurrentPage(event.selected);
              // console.log(event.selected);
            }}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 0));
                }}
                disabled={currentPage === 0}
                className={`px-3 py-1 text-sm ${
                  currentPage === 0
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-l transition`}
              >
                Prev
              </button>
            )}

            containerClassName="flex justify-start"

            renderOnZeroPageCount={null}
            className="pagination-class-name"

            pageClassName="pagination-li"
            pageLinkClassName="pagination-li-a"

            breakClassName="pagination-ellipsis"
            breakLinkClassName="pagination-ellipsis-a"

            activeClassName="pagination-active-li"
            activeLinkClassName	="pagination-active-a"
          />
        </div>
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
                <span
                  className="absolute right-2 top-2 5 text-2xl font-medium cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalType('add');
                    setModalData(modalFormat);
                    setPrevNumber("");
                  }}
                >
                  <IoClose />
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-2">
                  {
                    formArray && formArray.map((item, index) => {
                      if(item.name == 'role'){
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
                              name={item.name}
                              required
                              value={modalData?.role}
                            >
                              <option selected={modalType == 'add' ? true : false} value="" disabled>Select user type</option>
                              {
                                roles?.map((role, idx) => {
                                  if(role?.role_name !== "Super Admin") {
                                    return (
                                      <option key={idx} selected={modalType === "add" ? false : true} value={role?.id}>{role?.role_name}</option>
                                    )
                                  }
                                })
                              }
                            </select>
                          </div>
                        )
                      } else if(item.name === "phone") {
                        return(
                          <div
                            className='flex flex-col px-2 mb-2'
                            key={index}
                          >
                            <label
                              className='search-input-label [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            >{item.label}</label>
                            {/* <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name="phone"
                              required
                              // onInput={handlePhoneInputChange}
                              onChange={handlePhoneInputChange}
                              className='search-input-text px-4'
                              // onChange={updateModalData}
                              value={modalData?.phone}
                            /> */}
                            <PhoneInput
                              country={"us"}
                              value={modalData?.phone}
                              onChange={(inputPhone, countryData, event, formattedValue) => {
                                handlePhoneChange(inputPhone);
                                if(countryData?.format?.length === formattedValue.length) {
                                  const newValue = removePrefix(inputPhone, countryData?.dialCode);
                                  if (newValue.startsWith('0')) {
                                    setIsNumberValid(false);
                                  } else {
                                    setIsNumberValid(true);
                                  }
                                } else {
                                  setIsNumberValid(false);
                                }
                              }}
                              inputClass="!w-full !outline-none border !border-black/30 !bg-[#E7E8F4] !h-[45px]"
                              dropdownClass="peer"
                            // border border-cWhite rounded-[10px] h-[45px] mt-[-9px] pl-2
                              containerClass="!outline-none !w-full !border !border-[#E4E4E4] !rounded-[10px] !bg-[#E7E8F4] !h-[45px] !-mt-[10px]"
                            />
                          </div>
                        )
                      } else if(item.name === "first_name" || item.name === "last_name"){
                        return(
                          <div
                            className='flex flex-col px-2 mb-2'
                            key={index}
                          >
                            <label
                              className='search-input-label [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            >{item.label}</label>
                            <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name={item.name}
                              required
                              className='search-input-text px-4'
                              onChange={updateModalName}
                              value={modalData[item.name]}
                            />
                          </div>
                        )
                      } else{
                        return(
                          <div
                            className='flex flex-col px-2 mb-2'
                            key={index}
                          >
                            <label
                              className='search-input-label [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            >{item.label}</label>
                            <input
                              type={item.type}
                              placeholder={item.placeholder}
                              name={item.name}
                              required
                              className='search-input-text px-4'
                              onChange={updateModalData}
                              value={modalData[item.name]}
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
                      setPrevNumber("");
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

      {
        deleteModalOpen && (
          <Dialog
            open={deleteModalOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setDeleteModalOpen(false);
              setDeleteUserId("");
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
                    >Delete User</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setDeleteModalOpen(false);
                          setDeleteUserId("");
                        }}
                      >+</button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8"
                  >
                    <p
                      className="font-warning-popup-message"
                    >Are you sure want to delete this user?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="btn-green-2 w-[79px]"
                      type="button"
                      onClick={(e) => {handleDeleteUser(e)}}
                    >Yes</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setDeleteModalOpen(false);
                        setDeleteUserId("");
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};

export default UserList;
