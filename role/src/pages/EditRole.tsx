import { ChevronRight, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "store/hooks";
import { editRoleThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';


const initialRole = {
  role_name: "",
  description: "",
  permission: {
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
      reset_password: false,
    },
    voucher_management: {
      overall: false,
      customer_group: {
        overall: false,
        add: false,
        view: false,
        delete: false,
      },
      voucher_list: {
        overall: false,
        send_mail: false,
        add: false,
        delete: false,
      },
    },
    notification_template: {
      overall: false,
      add: false,
      preview: false,
      update: false,
      cancel: false,
      send_mail: false,
    },
    subscription_master: {
      overall: false,
      plan_and_price_setup: {
        overall: false,
        add: false,
        edit: false,
        delete: false,
      },
      gemini_setup: {
        overall: false,
        add: false,
        edit: false,
        delete: false,
      },
    },
    payment_method: {
      overall: false,
      action: false,
    },
    billing_history: {
      overall: false,
      download: false,
    },
    faqs: {
      overall: false,
      add: false,
    },
    email_log: {
      overall: false,
      view_details: false,
    },
    role_management: {
      overall: false,
      user_list: {
        overall: false,
        add: false,
        edit: false,
        delete: false,
      },
      role: {
        overall: false,
        add: false,
        edit: false,
        delete: false,
      },
    },
    cms: {
      overall: false,
      view_details: false,
    },
    settings: {
      overall: false,
      dashboard_widget: false,
      about: false,
      privacy_policy: false,
      terms_and_conditions: false,
      customer_agreement: false,
    },
  }
}


const EditRole = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if(!location.state){
      navigate('/');
    }
  }, [location.state]);

  const initialStateRole = location.state;

  const permissionGroups = [
    {
      label: "Customer management",
      name: "customer_management",
      subPermissions: [
        {name: "add", label: "Add"},
        {name: "edit", label: "Edit"},
        {name: "delete", label: "Delete"},
        {name: "login", label: "Login"},
        {name: "authorization", label: "Authorization"},
        {name: "send_mail", label: "Send mail"},
        {name: "details", label: "Details"},
        {name: "reset_password", label: "Reset password"}
      ],
    }
  ];
  const permissionGroups2 = [
    {
      label: "Customer group",
      name: "customer_group",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'view', label: 'View'},
        {name: 'delete', label: 'Delete'},
      ],
    },
    {
      label: "Voucher list",
      name: "voucher_list",
      subPermissions: [
        {name: 'send_mail', label: 'Send mail'},
        {name: 'add', label: 'Add'},
        {name: 'delete', label: 'Delete'},
      ],
    }
  ];
  const permissionGroups3 = [
    {
      label: "Notification Template",
      name: "notification_template",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'preview', label: 'Preview'},
        {name: 'update', label: 'Update'},
        {name: 'cancel', label: 'Cancel'},
        {name: 'send_mail', label: 'Send mail'},
      ],
    },
  ];
  const permissionGroups4 = [
    {
      label: "Plan & Price setup",
      name: "plan_and_price_setup",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'edit', label: 'Edit'},
        {name: 'delete', label: 'Delete'},
      ],
    },
    {
      label: "Gemini setup",
      name: "gemini_setup",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'edit', label: 'Edit'},
        {name: 'delete', label: 'Delete'},
      ],
    }
  ];
  const permissionGroups5 = [
    {
      label: "Payment Method",
      name: "payment_method",
      subPermissions: [
        {name: 'action', label: 'Action'},
      ],
    },
    {
      label: "Billing History",
      name: "billing_history",
      subPermissions: [
        {name: 'download', label: 'Download'},
      ],
    },
    {
      label: "FAQ's",
      name: "faqs",
      subPermissions: [
        {name: 'add', label: 'Add'},
      ],
    },
    {
      label: "Email log",
      name: "email_log",
      subPermissions: [
        {name: 'view_details', label: 'View details'},
      ],
    },
  ];
  const permissionGroups6 = [
    {
      label: "User List",
      name: "user_list",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'edit', label: 'Edit'},
        {name: 'delete', label: 'Delete'},
      ],
    },
    {
      label: "Role",
      name: "role",
      subPermissions: [
        {name: 'add', label: 'Add'},
        {name: 'edit', label: 'Edit'},
        {name: 'delete', label: 'Delete'},
      ],
    },
  ];
  const permissionGroups7 = [
    {
      label: "CMS",
      name: "cms",
      subPermissions: [
        {name: 'view_details', label: 'View details'},
      ],
    },
    {
      label: "Settings",
      name: "settings",
      subPermissions: [
        {name: 'dashboard_widget', label: 'Dashboard widget'},
        {name: 'about', label: 'About'},
        {name: 'privacy_policy', label: 'Privacy policy'},
        {name: 'terms_and_conditions', label: 'Terms & conditions'},
        {name: 'customer_agreement', label: 'Customer agreement'},
      ],
    },
  ];

  const [role, setRole] = useState(initialStateRole);
  // console.log("role?...", role);

  useEffect(() => {
    if(role?.permission?.customer_management.overall == false){
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          customer_management: initialRole?.permission?.customer_management,
        }
      })
    }
  }, [role?.permission?.customer_management]);

  useEffect(() => {
    if(role?.permission?.voucher_management.overall == false){
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          voucher_management: initialRole?.permission?.voucher_management
        }
      })
    }
  }, [role?.permission?.voucher_management]);

  useEffect(() => {
    if(role?.permission?.voucher_management.customer_group.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          voucher_management: {
            ...role?.permission?.voucher_management,
            customer_group: initialRole?.permission?.voucher_management.customer_group
          }
        }
      })
    }
  }, [role?.permission?.voucher_management.customer_group]);

  useEffect(() => {
    if(role?.permission?.voucher_management.voucher_list.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          voucher_management: {
            ...role?.permission?.voucher_management,
            voucher_list: initialRole?.permission?.voucher_management.voucher_list
          }
        }
      })
    }
  }, [role?.permission?.voucher_management.voucher_list]);

  useEffect(() => {
    if(role?.permission?.notification_template.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          notification_template: initialRole?.permission?.notification_template
        }
      })
    }
  }, [role?.permission?.notification_template]);

  useEffect(() => {
    if(role.permission.subscription_master.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role.permission,
          subscription_master: initialRole.permission.subscription_master
        }
      })
    }
  }, [role.permission.subscription_master]);

  useEffect(() => {
    if(role.permission.subscription_master.plan_and_price_setup.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role.permission,
          subscription_master: {
            ...role.permission.subscription_master,
            plan_and_price_setup: initialRole.permission.subscription_master.plan_and_price_setup,
          }
        }
      })
    }
  }, [role.permission.subscription_master.plan_and_price_setup]);

  useEffect(() => {
    if(role.permission.subscription_master.gemini_setup.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role.permission,
          subscription_master: {
            ...role.permission.subscription_master,
            gemini_setup: initialRole.permission.subscription_master.gemini_setup,
          }
        }
      })
    }
  }, [role.permission.subscription_master.gemini_setup]);

  useEffect(() => {
    if(role?.permission?.payment_method.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          payment_method: initialRole?.permission?.payment_method
        }
      })
    }
  }, [role?.permission?.payment_method]);

  useEffect(() => {
    if(role?.permission?.billing_history.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          billing_history: initialRole?.permission?.billing_history
        }
      })
    }
  }, [role?.permission?.billing_history]);

  useEffect(() => {
    if(role?.permission?.faqs.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          faqs: initialRole?.permission?.faqs
        }
      })
    }
  }, [role?.permission?.faqs]);

  useEffect(() => {
    if(role?.permission?.email_log.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          email_log: initialRole?.permission?.email_log
        }
      })
    }
  }, [role?.permission?.email_log]);

  useEffect(() => {
    if(role?.permission?.role_management.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          role_management: initialRole?.permission?.role_management
        }
      })
    }
  }, [role?.permission?.role_management]);

  useEffect(() => {
    if(role.permission.role_management.user_list.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role.permission,
          role_management: {
            ...role.permission.role_management,
            user_list: initialRole.permission.role_management.user_list,
          }
        }
      })
    }
  }, [role.permission.role_management.user_list]);

  useEffect(() => {
    if(role.permission.role_management.role.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role.permission,
          role_management: {
            ...role.permission.role_management,
            role: initialRole.permission.role_management.role,
          }
        }
      })
    }
  }, [role.permission.role_management.role]);

  useEffect(() => {
    if(role?.permission?.cms.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          cms: initialRole?.permission?.cms
        }
      })
    }
  }, [role?.permission?.cms]);

  useEffect(() => {
    if(role?.permission?.settings.overall == false) {
      setRole({
        ...role,
        permission: {
          ...role?.permission,
          settings: initialRole?.permission?.settings
        }
      })
    }
  }, [role?.permission?.settings]);

  const validateForm = () => {
    // Check for spaces only in any field
    for (const key in role) {
      if (role[key].trim() === '') {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const submitEditRole = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        const result = await dispatch(editRoleThunk(role)).unwrap();
        toast.success(result?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        toast.error("Error updating role");
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    } else {
      toast.warning("Spaces cannot be empty");
    }
  }
  
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
        >Edit Role</h3>
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
        >Edit Role</p>
      </div>
      <form className="grid grid-cols-1 mt-[25px]" onSubmit={submitEditRole}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-20">
          <div className="flex flex-col">
            <label className="search-input-label">
              Role name*
            </label>
            <input
              type="text"
              className="search-input-text"
              placeholder="Enter role name"
              required
              name="role_name"
              onChange={e => {
                setRole({
                  ...role,
                  [e.target.name]: e.target.value,
                })
              }}
              value={role?.role_name}
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
              required
              name="description"
              onChange={e => {
                setRole({
                  ...role,
                  [e.target.name]: e.target.value,
                })
              }}
              value={role?.description}
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
                <input type="checkbox" name="dashboard" checked={role.permission.dashboard} onClick={() => {
                  setRole({
                    ...role,
                    permission: {
                      ...role.permission,
                      dashboard: !role.permission.dashboard
                    }
                  })
                }} />
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
                      <input type="checkbox" name={item?.name} checked={role.permission[item.name].overall} onClick={() => {
                        const value = !role.permission[item.name].overall
                        setRole({
                          ...role,
                          permission: {
                            ...role.permission,
                            [item.name]: {
                              ...role.permission[item.name],
                              overall: !role.permission[item.name].overall
                            }
                          }
                        })
                        console.log(value)
                        
                      }} />
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
                              <input type="checkbox" disabled={role.permission[item.name].overall ? false : true} name={e.name} checked={role.permission[item.name][e.name]} onClick={() => {
                                setRole({
                                  ...role,
                                  permission: {
                                    ...role.permission,
                                    [item.name]: {
                                      ...role.permission[item.name],
                                      [e.name]: !role.permission[item.name][e.name],
                                    }
                                  }
                                })
                              }} />
                              <label>{e.label}</label>
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
                <input type="checkbox" name="voucher_management" checked={role.permission.voucher_management.overall} onClick={() => {
                  setRole({
                    ...role,
                    permission: {
                      ...role.permission,
                      voucher_management: {
                        ...role.permission.voucher_management,
                        overall: !role.permission.voucher_management.overall
                      }
                    }
                  });
                }} />
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
                          <input type="checkbox" checked={role.permission.voucher_management[item.name].overall} disabled={role.permission.voucher_management.overall ? false : true} onClick={() => {
                            setRole({
                              ...role,
                              permission: {
                                ...role.permission,
                                voucher_management: {
                                  ...role.permission.voucher_management,
                                  [item.name]: {
                                    ...role.permission.voucher_management[item.name],
                                    overall: !role.permission.voucher_management[item.name].overall
                                  }
                                }
                              }
                            })
                          }} />
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
                                  <input type="checkbox" name={e.name} disabled={role.permission.voucher_management[item.name].overall ? false : true} checked={role.permission.voucher_management[item.name][e.name]} onClick={() => {
                                    setRole({
                                      ...role,
                                      permission: {
                                        ...role.permission,
                                        voucher_management: {
                                          ...role.permission.voucher_management,
                                          [item.name]: {
                                            ...role.permission.voucher_management[item.name],
                                            [e.name]: !role.permission.voucher_management[item.name][e.name],
                                          }
                                        }
                                      }
                                    })
                                  }} />
                                  <label>{e.label}</label>
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
                      <input type="checkbox" name={item.name} checked={role.permission[item.name].overall} onClick={() => {
                        setRole({
                          ...role,
                          permission: {
                            ...role.permission,
                            [item.name]: {
                              ...role.permission[item.name],
                              overall: !role.permission[item.name].overall
                            }
                          }
                        })
                      }} />
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
                              <input type="checkbox" checked={role.permission[item.name][e.name]} disabled={role.permission[item.name].overall ? false : true} onClick={() => {
                                setRole({
                                  ...role,
                                  permission: {
                                    ...role.permission,
                                    [item.name]: {
                                      ...role.permission[item.name],
                                      [e.name]: !role.permission[item.name][e.name]
                                    }
                                  }
                                })
                              }} />
                              <label>{e.label}</label>
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
                <input type="checkbox" name="subscription_master" checked={role.permission.subscription_master.overall} onClick={() => {
                  setRole({
                    ...role,
                    permission: {
                      ...role.permission,
                      subscription_master: {
                        ...role.permission.subscription_master,
                        overall: !role.permission.subscription_master.overall
                      }
                    }
                  });
                }} />
                <label>Subscription Master</label>
              </div>

              <div
                className="grid grid-cols-1 ml-1"
              >
                {
                  permissionGroups4 && permissionGroups4.map((item, index) => {
                    return(
                      <div
                        className="grid grid-cols-1 ml-1"
                        key={index}
                      >
                        <div
                          className="flex flex-row gap-1"
                        >
                          <input type="checkbox" checked={role.permission.subscription_master[item.name].overall} disabled={role.permission.subscription_master.overall ? false : true} onClick={() => {
                            setRole({
                              ...role,
                              permission: {
                                ...role.permission,
                                subscription_master: {
                                  ...role.permission.subscription_master,
                                  [item.name]: {
                                    ...role.permission.subscription_master[item.name],
                                    overall: !role.permission.subscription_master[item.name].overall
                                  }
                                }
                              }
                            })
                          }} />
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
                                  <input type="checkbox" name={e.name} disabled={role.permission.subscription_master[item.name].overall ? false : true} checked={role.permission.subscription_master[item.name][e.name]} onClick={() => {
                                    setRole({
                                      ...role,
                                      permission: {
                                        ...role.permission,
                                        subscription_master: {
                                          ...role.permission.subscription_master,
                                          [item.name]: {
                                            ...role.permission.subscription_master[item.name],
                                            [e.name]: !role.permission.subscription_master[item.name][e.name],
                                          }
                                        }
                                      }
                                    })
                                  }} />
                                  <label>{e.label}</label>
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
              permissionGroups5 && permissionGroups5.map((item, index) => {
                return(
                  <div
                    className="grid grid-cols-1 ml-1"
                    key={index}
                  >
                    <div
                      className="flex flex-row gap-1"
                    >
                      <input type="checkbox" name={item.name} checked={role.permission[item.name].overall} onClick={() => {
                        setRole({
                          ...role,
                          permission: {
                            ...role.permission,
                            [item.name]: {
                              ...role.permission[item.name],
                              overall: !role.permission[item.name].overall
                            }
                          }
                        })
                      }} />
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
                              <input type="checkbox" checked={role.permission[item.name][e.name]} disabled={role.permission[item.name].overall ? false : true} onClick={() => {
                                setRole({
                                  ...role,
                                  permission: {
                                    ...role.permission,
                                    [item.name]: {
                                      ...role.permission[item.name],
                                      [e.name]: !role.permission[item.name][e.name]
                                    }
                                  }
                                })
                              }} />
                              <label>{e.label}</label>
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
                <input type="checkbox" name="role_management" checked={role.permission.role_management.overall} onClick={() => {
                  setRole({
                    ...role,
                    permission: {
                      ...role.permission,
                      role_management: {
                        ...role.permission.role_management,
                        overall: !role.permission.role_management.overall
                      }
                    }
                  });
                }} />
                <label>Role Management</label>
              </div>

              <div
                className="grid grid-cols-1 ml-1"
              >
                {
                  permissionGroups6 && permissionGroups6.map((item, index) => {
                    return(
                      <div
                        className="grid grid-cols-1 ml-1"
                        key={index}
                      >
                        <div
                          className="flex flex-row gap-1"
                        >
                          <input type="checkbox" checked={role.permission.role_management[item.name].overall} disabled={role.permission.role_management.overall ? false : true} onClick={() => {
                            setRole({
                              ...role,
                              permission: {
                                ...role.permission,
                                role_management: {
                                  ...role.permission.role_management,
                                  [item.name]: {
                                    ...role.permission.role_management[item.name],
                                    overall: !role.permission.role_management[item.name].overall
                                  }
                                }
                              }
                            })
                          }} />
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
                                  <input type="checkbox" name={e.name} disabled={role.permission.role_management[item.name].overall ? false : true} checked={role.permission.role_management[item.name][e.name]} onClick={() => {
                                    setRole({
                                      ...role,
                                      permission: {
                                        ...role.permission,
                                        role_management: {
                                          ...role.permission.role_management,
                                          [item.name]: {
                                            ...role.permission.role_management[item.name],
                                            [e.name]: !role.permission.role_management[item.name][e.name],
                                          }
                                        }
                                      }
                                    })
                                  }} />
                                  <label>{e.label}</label>
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
              permissionGroups7 && permissionGroups7.map((item, index) => {
                return(
                  <div
                    className="grid grid-cols-1 ml-1"
                    key={index}
                  >
                    <div
                      className="flex flex-row gap-1"
                    >
                      <input type="checkbox" name={item.name} checked={role.permission[item.name].overall} onClick={() => {
                        setRole({
                          ...role,
                          permission: {
                            ...role.permission,
                            [item.name]: {
                              ...role.permission[item.name],
                              overall: !role.permission[item.name].overall
                            }
                          }
                        })
                      }} />
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
                              <input type="checkbox" checked={role.permission[item.name][e.name]} disabled={role.permission[item.name].overall ? false : true} onClick={() => {
                                setRole({
                                  ...role,
                                  permission: {
                                    ...role.permission,
                                    [item.name]: {
                                      ...role.permission[item.name],
                                      [e.name]: !role.permission[item.name][e.name]
                                    }
                                  }
                                })
                              }} />
                              <label>{e.label}</label>
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
              onClick={() => {setRole(initialStateRole)}}
            >
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
};

export default EditRole;
