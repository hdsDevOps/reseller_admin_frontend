import React, { useEffect, useRef, useState } from "react";
import { LuFilterX } from "react-icons/lu";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
} from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightLeft, ChevronRight } from "lucide-react";
import '../styles/styles.css';
import { getRolesThunk, deleteRoleThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setRolesFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown } from "react-icons/fa6";

const initialFilter = {
  user_type: ''
}

const Role = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filterRef = useRef(null);
  const { rolesFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [roles, setRoles] = useState([]);
  // console.log("roles...", roles);
  const [initialRoles, setIntialRoles] = useState([]);
  // console.log("initialRoles...", initialRoles);
  const [deleteRoleId, setDeleteRoleId] = useState("");
  // console.log(deleteRoleId);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filter, setFilter] = useState(rolesFilters === null ? initialFilter : rolesFilters);
  // console.log("filters", filter);
  useEffect(() => {
    const setRolesFiltersSlice = async() => {
      await dispatch(setRolesFiltersStatus(filter));
    }

    setRolesFiltersSlice();
  }, [filter]);

  const [search, setSearch] = useState("");
  // console.log("search", search);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  // console.log("isDropdownOpen", isDropdownOpen);
  
  const handleClickOutsideInput = (event: MouseEvent) => {
    if(filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideInput);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideInput);
    };
  }, []);

  useEffect(() => {
    if(initialRoles?.length === 0) {
      setIsDropdownOpen(false);
    }
    if(search.length > 0) {
      setIsDropdownOpen(true)
    }
  }, [initialRoles, search])
  
  const fetchRoles = async() => {
    try {
      const result = await dispatch(getRolesThunk(filter)).unwrap();
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
  }, [filter]);

  const fetchIntialRoles = async() => {
    try {
      const result = await dispatch(getRolesThunk(initialFilter)).unwrap();
      // console.log("result...", result.roles);
      setIntialRoles(result?.roles);
    } catch (error) {
      setIntialRoles([]);
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
    fetchIntialRoles();
  }, []);

  const permissionsList = [
    {name: "dashboard", label: "Dashboard"},
    {name: "customer_management", label: "Customer management"},
    {name: "voucher_management", label: "Vouchers management"},
    {name: "notification_template", label: "Notification Template"},
    {name: "subscription_master", label: "Subscription Master"},
    {name: "payment_method", label: "Payment Method"},
    {name: "billing_history", label: "Billing History"},
    {name: "faqs", label: "FAQ's"},
    {name: "email_log", label: "Email log"},
    {name: "role_management", label: "Role management"},
    {name: "cms", label: "CMS"},
    {name: "settings", label: "Settings"},
  ];

  const deleteRole = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(deleteRoleThunk({id: deleteRoleId})).unwrap();
      setDeleteModal(false);
      setDeleteRoleId("");
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error deleting role");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchRoles();
    }
  };
  
  const [currentPage, setCurrentPage] = useState(rolesFilters === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(rolesFilters === null ? 20 : itemsPerPageNumber);
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
  const currentItems = roles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roles.length / itemsPerPage);
  
  useEffect(() => {
    if(roles?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, roles]);

  return (
    <div className="grid grid-cols-1 p-4">
      <ToastContainer />
      <div className="flex-row-between-responsive sm:mr-10 max-sm:mr-0">
        <h3 className="h3-text">
          Role
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
        >Role</p>
      </div>
      <div className="bg-[#F9F9F9] p-[19px] mb-6 flex min-[835px]:flex-row max-[835px]:flex-col items-center justify-between mt-2">
        <button
          type="button"
          className="btn-green ml-[19px]"
          onClick={() => {navigate('/add-role')}}
          disabled={!rolePermissionsSlice?.role_management?.role?.add ? true : false}
        >
          Add Role
        </button>

        <div className="sm:px-4 max-sm:px-0 sm:w-[350px] max-sm:w-full max-[835px]:mt-2">
          <div
            className='flex flex-row gap-2 relative'
            ref={filterRef}
          >
            <input
              list="brow"
              placeholder="Auto search"
              className="serach-input-no-radius"
              name="user_type"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setSearch(e.target.value);}}
              value={search || filter?.user_type}
              onFocus={() => {setIsDropdownOpen(true)}}
            />
            <div className="absolute mt-[11px] w-full pointer-events-none">
              <FaChevronDown className="ml-auto mr-8" />
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter(initialFilter);
              }}
            >
              <LuFilterX
                className="text-[20px] text-custom-green"
              />
            </button>
            {
              isDropdownOpen === true && initialRoles?.filter(role => role?.role_name.toLowerCase().includes(search.toLowerCase())).length > 0 && (
                <div className='absolute flex flex-col py-1 sm:w-[290px] max-sm:w-[calc(100%-28px)] bg-custom-white rounded-b mt-10 max-h-40 overflow-y-auto z-[9999]'>
                  {
                    initialRoles?.filter(role => role?.role_name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                      <p
                        key={index}
                        className={`font-inter-16px-400 pl-4 py-1 ${
                          index !== 0 ? "border-t border-white" : ""
                        } cursor-pointer`}
                        onClick={() => {
                          setSearch("");
                          setFilter({
                            ...filter,
                            user_type: item?.role_name
                          });
                          setIsDropdownOpen(false);
                        }}
                      >{item?.role_name}</p>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border-separate border-spacing-y-6">
          <thead className="bg-custom-blue-6 h-12">
            <tr>
              <th className="th-css-full-opacity-text-left">
                <span>User Type</span>
                <span className="ml-1"><button type="button" onClick={() => {
                  //
                }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
              </th>
              <th className="th-css-full-opacity">
                <span>Permissions</span>
                <span className="ml-1"><button type="button" onClick={() => {
                  //
                }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
              </th>
              <th className="th-css-full-opacity">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems?.length>0 ? currentItems?.map((role, index) => {
                if(role?.role_name === "Super Admin"){
                  return(
                    <tr key={index} className="hover:bg-gray-100 mb-10">
                      <td className="min-w-[180px]">{role?.role_name}</td>
                      <td className="min-w-[180px] flex flex-wrap gap-1">
                        {
                          permissionsList.map((permission, idx) => {
                            if(idx === 0){
                              if(role.permission[permission.name]){
                                return(
                                  <button
                                    key={idx}
                                    className="bg-[#12a83241] rounded-3xl text-xs text-left py-1 px-4 hover:bg-gray-300 transition inline-block max-w-max"
                                  >
                                    {permission.label}
                                  </button>
                                )
                              }
                            } else {
                              if(role.permission[permission.name].overall){
                                return(
                                  <button
                                    key={idx}
                                    className="bg-[#12a83241] rounded-3xl text-xs text-left py-1 px-4 hover:bg-gray-300 transition inline-block max-w-max"
                                  >
                                    {permission.label}
                                  </button>
                                )
                              }
                            }
                          })
                        }
                      </td>
      
                      <td className="min-w-[180px]">
                        <div className="flex justify-center gap-4">
                          
                        </div>
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={index} className="hover:bg-gray-100 mb-10">
                      <td className="min-w-[180px]">{role?.role_name}</td>
                      <td className="min-w-[180px] flex flex-wrap gap-1">
                        {
                          permissionsList.map((permission, idx) => {
                            if(idx === 0){
                              if(role.permission[permission.name]){
                                return(
                                  <button
                                    key={idx}
                                    className="bg-[#12a83241] rounded-3xl text-xs text-left py-1 px-4 hover:bg-gray-300 transition inline-block max-w-max"
                                  >
                                    {permission.label}
                                  </button>
                                )
                              }
                            } else {
                              if(role.permission[permission.name].overall){
                                return(
                                  <button
                                    key={idx}
                                    className="bg-[#12a83241] rounded-3xl text-xs text-left py-1 px-4 hover:bg-gray-300 transition inline-block max-w-max"
                                  >
                                    {permission.label}
                                  </button>
                                )
                              }
                            }
                          })
                        }
                      </td>
      
                      <td className="min-w-[180px]">
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              navigate('/edit-role', {state: role});
                            }}
                            disabled={!rolePermissionsSlice?.role_management?.role?.edit ? true : false}
                          >
                            <BiSolidEditAlt className="text-black text-xl" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteModal(true);
                              setDeleteRoleId(role?.id);
                            }}
                            disabled={!rolePermissionsSlice?.role_management?.role?.delete ? true : false}
                          >
                            <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                }
              }) :
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data avaibale</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-12 relative bottom-2 right-0">
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
        <div className="flex">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className={`px-3 py-1 text-sm ${
              currentPage === 0
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-l transition`}
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 text-sm mx-1 rounded ${
                currentPage === index
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-black hover:bg-green-500 hover:text-white"
              } transition`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 text-sm ${
              currentPage === totalPages - 1
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-r transition`}
          >
            Next
          </button>
        </div>
      </div>
      
      {
        deleteModal && (
          <Dialog
            open={deleteModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setDeleteModal(false);
              setDeleteRoleId("");
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
                    >Delete Role</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setDeleteModal(false);
                          setDeleteRoleId("");
                        }}
                      >+</button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8"
                  >
                    <p
                      className="font-warning-popup-message"
                    >Are you sure want to delete this role?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="btn-green-2 w-[79px]"
                      type="button"
                      onClick={(e) => {deleteRole(e)}}
                    >Yes</button>
                    <button
                      className="btn-red ml-[60px]"
                      type="button"
                      onClick={() => {
                        setDeleteModal(false);
                        setDeleteRoleId("");
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

export default Role;
