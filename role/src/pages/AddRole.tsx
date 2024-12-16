import { ChevronRight, MoveLeft } from "lucide-react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import '../styles/styles.css';

const AddRole = () => {
  const navigate = useNavigate();
  const permissionGroups = [
    {
      label: "Customer management",
      subPermissions: ["Add", "Edit","Delete", "Login", "Authorization", "Send mail", "Details", "Reset password",],
    }
  ];
  const permissionGroups2 = [
    {
      label: "Customer group",
      subPermissions: ["Add", "View","Delete"],
    },
    {
      label: "Voucher list",
      subPermissions: ["Send mail","Add","Delete"],
    }
  ];
  const permissionGroups3 = [
    {
      label: "Notification Template",
      subPermissions: ["Add", "Preview", "Update", "Cancel", "Send mail"],
    },
    {
      label: "Subscription Master",
      subPermissions: ["Add", "Edit", "Delete"],
    },
    {
      label: "Payment Method",
      subPermissions: ["Action"],
    },
    {
      label: "Billing History",
      subPermissions: ["Download"],
    },
    {
      label: "FAQ's",
      subPermissions: ["Add"],
    },
    {
      label: "Email log",
      subPermissions: ["View details"],
    },
    {
      label: "Role management",
      subPermissions: ["Add", "Edit", "Delete"],
    },
    {
      label: "CMS",
      subPermissions: ["View details"],
    },
    {
      label: "Settings",
      subPermissions: ["Dashboard widget", "About", "Privacy policy", "Terms & conditions", "Customer agreement"],
    },
  ];
  
  return (
    <div className="grid- grid-cols-1 p-4 md:p-8">
      <div
        className='flex flex-row'
      >
        <a
          className='cursor-pointer'
          onClick={() => {
            navigate('/role');
          }}
        >
          <MoveLeft
            className='h-[20px] text-black mt-[7px]'
          />
        </a>
        <h3
          className='h3-text ml-[10px]'
        >Add Role</h3>
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
          className='page-indicator-1'
        >Role</p>
        <ChevronRight
          className='page-indicator-arrow'
        />
        <p
          className='page-indicator-2'
        >Add Role</p>
      </div>
      <form className="grid grid-cols-1 mt-[25px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-20">
          <div className="flex flex-col">
            <label className="search-input-label">
              Role name*
            </label>
            <input
              type="text"
              className="search-input-text"
              placeholder="Enter role name"
            />
          </div>
          <div className="flex flex-col">
            <label className="search-input-label">
              Description*
            </label>
            <input
              type="text"
              className="search-input-text"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="flex flex-col my-4">
          <div className="search-input-label">
            Permission*
          </div>
          <div className="search-input-text-2 p-4">
            <div
              className="grid grid-cols-1 ml-1"
            >
              <div
                className="flex flex-row gap-1 border-b border-cWhite pb-3"
              >
                <input type="checkbox" />
                <label>Dashboard</label>
              </div>
            </div>
            {
              permissionGroups && permissionGroups.map((item, index) => {
                return(
                  <div
                    className="grid grid-cols-1 ml-1 py-3"
                    key={index}
                  >
                    <div
                      className="flex flex-row gap-1"
                    >
                      <input type="checkbox" />
                      <label>{item.label}</label>
                    </div>
                    <div
                      className="checkbox-list"
                    >
                      {
                        item.subPermissions.map((e, i) => {
                          return(
                            <div
                              className="flex flex-row gap-1 "
                              key={i}
                            >
                              <input type="checkbox" />
                              <label>{e}</label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <div
              className="grid grid-cols-1 ml-1"
            >
              <div
                className="flex flex-row gap-1"
              >
                <input type="checkbox" />
                <label>Vouchers management</label>
              </div>

              <div
                className="grid grid-cols-1 ml-1"
              >
                {
                  permissionGroups2 && permissionGroups2.map((item, index) => {
                    return(
                      <div
                        className="grid grid-cols-1 ml-1"
                        key={index}
                      >
                        <div
                          className="flex flex-row gap-1"
                        >
                          <input type="checkbox" />
                          <label>{item.label}</label>
                        </div>
                        <div
                          className="checkbox-list"
                        >
                          {
                            item.subPermissions.map((e, i) => {
                              return(
                                <div
                                  className="flex flex-row gap-1 "
                                  key={i}
                                >
                                  <input type="checkbox" />
                                  <label>{e}</label>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {
              permissionGroups3 && permissionGroups3.map((item, index) => {
                return(
                  <div
                    className="grid grid-cols-1 ml-1"
                    key={index}
                  >
                    <div
                      className="flex flex-row gap-1"
                    >
                      <input type="checkbox" />
                      <label>{item.label}</label>
                    </div>

                    <div
                      className="checkbox-list"
                    >
                      {
                        item.subPermissions.map((e, i) => {
                          return(
                            <div
                              className="flex flex-row gap-1 "
                              key={i}
                            >
                              <input type="checkbox" />
                              <label>{e}</label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="flex justify-center gap-7 my-10">
            <button
              type="submit"
              className="btn-green w-[130px]"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn-red w-[130px]"
            >
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
};

export default AddRole;
