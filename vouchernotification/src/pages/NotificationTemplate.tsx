import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import { BsEnvelopePlusFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { addNotificationTemplateThunk, getNotificationTemplateThunk, updateNoficationTemplateContentThunk, getCustomerListThunk, removeUserAuthTokenFromLSThunk, sendTestEmailNotificationThunk, deleteNotificationTemplateThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Send, X } from "lucide-react";

const NotificationTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  // console.log("selectedItem", selectedItem);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showNotification, setShowNotification] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Number|string>("");
  const modalRef = useRef(null);
  const previewRef = useRef(null);
  const deleteRef = useRef(null);
  const filterRef = useRef(null);
  const [templateHeading, setTemplateHeading] = useState({template_heading: ""});
  // console.log(templateHeading);
  const [notificationTemplates, setNotificationTemplates] = useState([]);
  // console.log("notificationTemplates...", notificationTemplates);
  const [templateContent, setTemplateContent] = useState("");
  const intialFilter= {
    search_data: "",
    country: "",
    state_name: "",
    authentication: "",
    license_usage: "",
    subscritption_date: "",
    renewal_date: ""
  };
  const [filters, setFilters] = useState(intialFilter);
  // console.log("filters...", filters);
  const [searchData, setSearchData] = useState("");
  const [customerList, setCustomerList] = useState([]);
  // console.log("customerList", customerList.length)
  // console.log("customerList", customerList);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  // console.log("selectedCustomers...", selectedCustomers);
  const [showCustomerList, setShowCustomerList] = useState([]);
  const [dynamicCodes, setDynamicCodes] = useState([
    "{first_name}",
    "{last_name}",
    "{email}",
  ]);
  const [sendEmailNotification, setSendEmailNotification] = useState("");
  
  const handleFilterChange = (e) => {
    // console.log("User Input:", e.target.value);
    const { value, selectionStart, selectionEnd } = e.target;

    setSearchData((prevContent) => {
      // Set the new value
      const newContent = value;

      // Use a timeout to preserve cursor position
      setTimeout(() => {
        if (filterRef.current) {
          filterRef.current.selectionStart = selectionStart;
          filterRef.current.selectionEnd = selectionEnd;
        }
      }, 0);

      return newContent;
    });
  };

  useEffect(() => {
    setFilters({
      ...filters,
      search_data: searchData
    })
  }, [searchData]);

  useEffect(() => {
    const getCustomerList = async() => {
      try {
        const result = await dispatch(
          getCustomerListThunk(filters)
        ).unwrap()
        if(result.data){
          setCustomerList(result.data);
        }
        else{
          setCustomerList([]);
        }
      } catch (error) {
        setCustomerList([]);
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }

    if(searchData.length > 1){
      getCustomerList();
    }
  }, [searchData]);

  const handleSelectCustomer = (index) => {
    const array = selectedCustomers;
    array.push(showCustomerList[index]);
    setSelectedCustomers(array);
    setShowCustomerList([]);
    setSearchData("");
  };

  const removeSelected = (index) => {
    const newArray = selectedCustomers.filter((_, number) => number !== index);
    setSelectedCustomers(newArray);
  }

  useEffect(() => {
    const notSelectedArray = customerList.filter(item => !selectedCustomers.some(item2 => item2.record_id === item.record_id));
    setShowCustomerList(notSelectedArray);
  }, [customerList, selectedCustomers])

  useEffect(() => {
    if(selectedItem?.id == null || selectedItem?.id == undefined){
      setSelectedItem("");
      setSelectedOption("");
    }
    else{
      setSelectedItem({
        ...selectedItem,
        template_content: templateContent
      });
    }
  }, [templateContent]);
  
  const handleTextareaChange = (e) => {
    // console.log("User Input:", e.target.value);
    const { value, selectionStart, selectionEnd } = e.target;

    setTemplateContent((prevContent) => {
      // Set the new value
      const newContent = value;

      // Use a timeout to preserve cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart;
          textareaRef.current.selectionEnd = selectionEnd;
        }
      }, 0);

      return newContent;
    });
  };

  const handleInsertCode = (code) => {
    // Insert the selected code into the textarea at the current cursor position
    const textarea = textareaRef.current;

    if (textarea) {
      // Fetch current selection positions
      const { selectionStart, selectionEnd } = textarea;

      // Update the content with the inserted code
      setTemplateContent((prevContent) => {
        const newContent =
          prevContent.slice(0, selectionStart) +
          code +
          prevContent.slice(selectionEnd);

        // Update cursor position after insertion
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = selectionStart + code.length;
            textareaRef.current.selectionEnd = selectionStart + code.length;
            textareaRef.current.focus();
          }
        }, 0);

        return newContent;
      });

      setTimeout(() => {
        const dropdown = document.querySelector(".select-dynamic-code");
        if (dropdown) {
          dropdown.value = ""; // Set the dropdown to its default state
        }
      }, 0);
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

  const clickOutsidePreview = (event) => {
    if(previewRef.current && !previewRef.current.contains(event.target)){
      setIsPreviewOpen(false);
    }
  };

  const clickOutsideDelete = (event) => {
    if(deleteRef.current && !deleteRef.current.contains(event.target)){
      setIsPreviewOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsidePreview);
    document.addEventListener('mousedown', clickOutsideDelete);
    return () => {
      document.removeEventListener('mousedown', clickOutsidePreview);
      document.removeEventListener('mousedown', clickOutsideDelete);
    };
  }, []);

  const getNotificationTemplate = async() => {
    try {
      const result = await dispatch(
        getNotificationTemplateThunk()
      ).unwrap();
      setNotificationTemplates(result?.data);
    } catch (error) {
      setNotificationTemplates([]);
    }
  };

  useEffect(() => {
    getNotificationTemplate();
  }, []);

  const addNotificationTemplate = async() => {
    if(templateHeading?.template_heading.trim() === '') {
      toast.warning("Spaces cannot be empty");
    } else {
      try {
        const result = await dispatch(
          addNotificationTemplateThunk(templateHeading)
        ).unwrap();
        // console.log(result);
        setIsModalOpen(false);
        getNotificationTemplate();
        setTimeout(() => {
          toast.success(result?.message);
        }, 1000);
      } catch (error) {
        // console.log(error);
        toast.error("Error adding customer group");
      }
    }
  };

  const HtmlRenderer: React.FC<Props> = ({ htmlContent }) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  const updateNoficationTemplateContent = async() => {
    try {
      const result = await dispatch(
        updateNoficationTemplateContentThunk({
          record_id: selectedItem?.id,
          template_content: templateContent
        })
      ).unwrap();
      getNotificationTemplate();
      setTimeout(() => {
        toast.success(result?.message)
      }, 1000);
    } catch (error) {
      toast.error("Tamplate content could not be updated.")
    }
  };

  const deleteNotificationTemplate = async() => {
    try {
      const result = await dispatch(
        deleteNotificationTemplateThunk({
          record_id: selectedItem?.id
        })
      ).unwrap();
      setSelectedItem("");
      setSelectedOption("");
      setIsDeleteOpen(false);
      getNotificationTemplate();
      setTimeout(() => {
        toast.success(result?.message)
      }, 1000);
    } catch (error) {
      toast.error("Tamplate content could not be deleted.")
    }
  }

  const sendNotificationEmail = async(e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(sendEmailNotification)) {
      toast.warning("No emails are selected");
    } else {
      const emailLists = selectedCustomers.map(item => item?.email);
      try {
        const result = await dispatch(sendTestEmailNotificationThunk({
          email_ids: [sendEmailNotification],
          record_id: selectedItem?.id
        })).unwrap();
        toast.success("Email sent successfully");
        // console.log("result...", result);
      } catch (error) {
        toast.error("Error sending email.")
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-1">
      <ToastContainer />
      <div className="flex flex-col">
        <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
          <h3 className="h3-text">Notification Template</h3>
          <div
            className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
          >
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="btn-green w-[139px] items-center"
              button-name="add-new-template"
              disabled={!rolePermissionsSlice?.notification_template?.add ? true : false}
            >
              <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
              Add new
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-[46px]">
          <select
            className="notification-select w-[275px] max-[400px]:w-full"
            onChange={e => {
              setTemplateContent(notificationTemplates[e.target.value]?.template_content);
              setSelectedItem(notificationTemplates[e.target.value]);
              setSelectedOption(e.target.value);
            }}
            name="select-notification"
            value={selectedOption}
          >
            <option selected value=''>Select a notification section </option>
            {
              notificationTemplates && notificationTemplates.map((item, index) => {
                return(
                  <option key={index} value={index}>{item?.template_header}</option>
                )
              })
            }
          </select>
        </div>

        {!selectedItem || selectedItem == "" ? (
          <div className="bg-gray-100 border border-gray-300 w-full min-h-48 h-full flex flex-col mt-16">
            <div className="h-[77px] border-b border-custom-white text-center pt-[26px]">
              <h5 className="h5-text-red">
                Please choose a template first
              </h5>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-20">
            <div className="flex items-center justify-between w-full my-3">
              <h5 className="h5-text-black">
                Template
              </h5>
              <div
                className="mt-[7.5px] transition-transform duration-1000 ease-in-out"
                onClick={() => setShowNotification(!showNotification)}
              >
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={showNotification}
                  />
                  <div
                    className="w-[40px] h-[20px] flex items-center bg-gray-300 rounded-full after:flex after:items-center after:justify-center peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-[#00D13B]">
                  </div>
                </label>
              </div>
            </div>
            <div className="w-full flex flex-col items-center  border-2 border-[#E4E4E4]">
              <div className="notification-template-head">
                <h3 className="notification-template-header py-3 pl-3">
                  {selectedItem?.template_header}
                </h3>
                <select className="select-dynamic-code" onChange={e => {handleInsertCode(e.target.value)}}>
                  <option selected hidden value="">Dynamic code list</option>
                  {
                    dynamicCodes && dynamicCodes.map((code, index) => (
                      <option key={index} value={code}>{code}</option>
                    ))
                  }
                </select>
              </div>

              <div className="w-full">
              <textarea
                className="notification-template-textarea"
                placeholder="HTML/CSS script should be here to make the Promotion template"
                name="template_content"
                onChange={handleTextareaChange}
                value={selectedItem?.template_content || ""}
                ref={textareaRef}
              />
              </div>
            </div>

            <div
              className="flex min-[1100px]:flex-row max-[1100px]:flex-col justify-between w-full mt-2 items-start"
            >
              <div
                className="flex flex-col lg:w-full max-sm:w-full"
              >
                <div className="flex flex-row gap-3 w-full">
                  <input
                    className="border border-custom-white h-[41px] sm:min-w-[400px] max-sm:w-full max-w-[400px] p-2"
                    name="search_data"
                    onChange={(e) => {setSendEmailNotification(e.target.value)}}
                    type="email"
                    placeholder="Enter email"
                    value={sendEmailNotification}
                    ref={filterRef}
                  />
                  <button
                    type="button"
                    onClick={(e) => {sendNotificationEmail(e)}}
                    disabled={!rolePermissionsSlice?.notification_template?.send_mail ? true : false}
                  >
                    <Send className="w-6 text-[#12A833] sm:block my-auto" size={32} />
                  </button>
                </div>

                {/* {
                  filters?.search_data != "" && filters?.search_data.length > 1 && showCustomerList.length > 0 && (
                    <div
                      className={`absolute sm:min-w-[400px] flex flex-col max-sm:w-full max-w-[400px] mt-[44px] bg-custom-white shadow-sm max-lg:mx-auto p-2`}
                    >
                      {
                        showCustomerList && showCustomerList?.map((customer, index) => (
                          <a key={index} className="py-1 font-roboto font-normal text-[14px] text-[#222222] cursor-pointer" onClick={() => {handleSelectCustomer(index)}}>{customer?.email}</a>
                        ))
                      }
                    </div>
                  )
                } */}

                <div className="flex flex-wrap">
                  {
                    selectedCustomers.length > 0 && selectedCustomers.map((selected, index) => (
                      <div className='flex flex-row gap-2 bg-[#C7E5CD] px-2 w-fit rounded-xl m-1' key={index}>
                        <a className='font-inter font-normal text-[10px] text-[#545454] pt-[6px]'>{selected?.email}</a>
                        <button className='my-auto' onClick={() => {removeSelected(index)}}>
                          <X className='text-[10px] text-black' />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="flex min-[570px]:flex-row max-[570px]:flex-col justify-end mx-auto gap-[10px] pt-[2px] min-lg:mt-0 max-lg:mt-1">
                <button
                  className='btn-green max-w-fit'
                  type="button"
                  onClick={() => {setIsPreviewOpen(true)}}
                  button-name="notificaiton-template-update-preview"
                  disabled={!rolePermissionsSlice?.notification_template?.preview ? true : false}
                >Preview</button>
                <button
                  className='btn-different max-w-fit'
                  type="button"
                  onClick={() => {updateNoficationTemplateContent()}}
                  button-name="notificaiton-template-update-add"
                  disabled={!rolePermissionsSlice?.notification_template?.update ? true : false}
                >Update</button>
                <button
                  className='btn-orange max-w-fit'
                  onClick={() => {
                    setSelectedItem("");
                    setSelectedOption("");
                  }}
                  button-name="notificaiton-template-update-cancel"
                  disabled={!rolePermissionsSlice?.notification_template?.cancel ? true : false}
                >Cancel</button>
                <button
                  className='btn-red-2 max-w-fit'
                  onClick={() => {setIsDeleteOpen(true)}}
                  button-name="notificaiton-template-update-delete"
                  disabled={!rolePermissionsSlice?.notification_template?.cancel ? true : false}
                >Delete</button>
              </div>
            </div>
          </div>
        )}

        {
          isModalOpen && (
            <div className='fixed-full-screen'>
              <div className='fixed-popup w-[488px] h-[343px] p-[30px]' ref={modalRef}>
                <div className='flex flex-col'>
                  <div
                    className='flex-row-between'
                  >
                    <h4
                      className='text-2xl font-medium'
                    >Add Notification Template</h4>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div
                  className='flex flex-col px-2 mt-10'
                >
                  <label
                    className='search-input-label'
                  >Subject</label>
                  <input
                    type='text'
                    placeholder='Enter Subject'
                    name='subject'
                    required
                    className='search-input-text px-4'
                    onChange={e => {setTemplateHeading({template_heading: e.target.value})}}
                    // value={customer[item.name]}
                  />
                </div>

                <div
                  className='mt-11 flex flex-row justify-center mb-3'
                >
                  <button
                    type='button'
                    className='btn-red h-[46px]'
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >Cancel</button>
                  <button
                    className='btn-green-2 h-[46px] ml-[30px]'
                    type="button"
                    onClick={() => {addNotificationTemplate()}}
                    button-name="add-voucher-submit-btn"
                  >Save</button>
                </div>
              </div>
            </div>
          )
        }

        {
          isDeleteOpen && (
            <div className='fixed-full-screen'>
              <div className='fixed-popup w-[488px] p-[30px]' ref={deleteRef}>
                <div className='flex flex-col'>
                  <div
                    className='flex-row-between'
                  >
                    <h4
                      className='text-2xl font-medium'
                    >Delete Notification Template</h4>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setIsDeleteOpen(false);
                        }}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col px-2 mt-10 font-inter font-normal text-base text-black'>Are you sure you want to delete this notification template?</div>

                <div
                  className='mt-10 flex flex-row justify-center mb-3'
                >
                  <button
                    className='btn-red h-[46px]'
                    type="button"
                    onClick={() => {deleteNotificationTemplate()}}
                    button-name="add-voucher-submit-btn"
                  >Delete</button>
                  <button
                    type='button'
                    className='btn-green-2 h-[46px] ml-[30px]'
                    onClick={() => {
                      setIsDeleteOpen(false);
                    }}
                  >Cancel</button>
                </div>
              </div>
            </div>
          )
        }

        {
          isPreviewOpen && (
            <div className='fixed-full-screen'>
              <div className='fixed-popup w-[449px] min-h-[200px] p-[18px]' ref={previewRef}>
                <div className='flex flex-col'>
                  <div
                    className='flex-row-between'
                  >
                    <h4
                      className='text-2xl font-medium'
                    >Voucher Preview</h4>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-white'
                        onClick={() => {
                          setIsPreviewOpen(false);
                        }}
                        button-name="notification-template-preview-close"
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className='w-full border rounded-sm p-1 mt-5 shadow-sm max-h-[400px] overflow-auto'>
                  <HtmlRenderer htmlContent={templateContent || `<div style="text-align: center; min-height: 100px; padding-top: 35px;">No data available</div>`} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default NotificationTemplate;
