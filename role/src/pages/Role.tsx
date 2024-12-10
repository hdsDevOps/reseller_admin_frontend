import React, { useEffect, useState } from "react";
import { LuFilterX } from "react-icons/lu";
import {
  IoChevronDown,
  IoChevronForward,
  IoTrashOutline,
} from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import '../styles/styles.css';
import { getRolesThunk, deleteRoleThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Role = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filterUserList, setFilterUserList] = useState([]);
  const [roles, setRoles] = useState([]);
  // console.log("roles...", roles);
  const [deleteRoleId, setDeleteRoleId] = useState("");
  // console.log(deleteRoleId);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const fetchRoles = async() => {
    try {
      const result = await dispatch(getRolesThunk()).unwrap();
      // console.log("result...", result.roles);
      setRoles(result.roles);
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
  }

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
        <Link to="/add-role"
          className="btn-green ml-[19px]"
        >
          Add Role
        </Link>

        <div className="sm:px-4 max-sm:px-0 sm:w-[350px] max-sm:w-full max-[835px]:mt-2">
          <div
            className="flex flex-row gap-2"
          >
            <input
              list="brow"
              placeholder="Auto search"
              className="serach-input-no-radius"
              name="domain"
              // onChange={handleFilterChange}
              // value={filters.domain}
            />
            <button>
              <LuFilterX
                className="text-[20px] text-custom-green"
              />
            </button>
          </div>
          {
            filterUserList?.length !== 0 && (
              <div
                className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-custom-white rounded-b`}
              >
                {filterUserList?.map((item, index) => {
                  return (
                    <a
                      key={index}
                      className={`font-inter-16px-400 pl-4 py-1 ${
                        index != 0 && `border-t border-white`
                      }`}
                    >
                      {item?.fname} {item?.lname}
                    </a>
                  );
                })}
              </div>
            )
          }
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border-separate border-spacing-y-6">
          <thead className="bg-custom-blue-6 h-12">
            <tr>
              <th className="th-css-full-opacity-text-left">User Type</th>
              <th className="th-css-full-opacity">Permissions</th>
              <th className="th-css-full-opacity">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role, index) => (
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
                    >
                      <BiSolidEditAlt className="text-black text-xl" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteRoleId(role?.id);
                      }}
                    >
                      <IoTrashOutline className="text-red-500 text-xl hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
