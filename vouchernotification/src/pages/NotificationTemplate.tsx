import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import { BsEnvelopePlusFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { addNotificationTemplateThunk, getNotificationTemplateThunk, updateNoficationTemplateContentThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  console.log(selectedItem);
  
  const [isToggled, setIsToggled] = useState(false);
  const modalRef = useRef();
  const previewRef = useRef();
  const [templateHeading, setTemplateHeading] = useState({template_heading: ""});
  // console.log(templateHeading);
  const [notificationTemplates, setNotificationTemplates] = useState([]);
  // console.log(notificationTemplates);
  const [templateContent, setTemplateContent] = useState("");

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

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsidePreview);

    return () => {
      document.removeEventListener('mousedown', clickOutsidePreview);
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
            >
              <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
              Add new
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-[46px]">
          <select className="notification-select w-[275px] max-[400px]:w-full" onChange={e => {
            setSelectedItem(notificationTemplates[e.target.value]);
          }}>
            <option selected hidden value=''>Select a notification section </option>
            {
              notificationTemplates && notificationTemplates.map((item, index) => {
                return(
                  <option key={index} value={index}>{item?.template_header}</option>
                )
              })
            }
          </select>
        </div>

        {!selectedItem ? (
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
                // onClick={() => setShowNotfication(!showNotification)}
              >
                <label className="relative cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
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
                <select className="select-dynamic-code">
                  <option selected>Dynamic code list</option>
                </select>
              </div>

              <div className="w-full">
              <textarea
                className="notification-template-textarea"
                placeholder="HTML/CSS script should be here to make the Promotion template"
                name="template_content"
                onChange={e => {setTemplateContent(e.target.value)}}
                defaultValue={selectedItem?.template_content || ""}
              />
              </div>
            </div>

            <div className="flex min-lg:flex-row max-lg:flex-col justify-between items-center w-full h-[41px]">
              <div className="flex items-center lg:w-full">
                <select
                  className="border border-custom-white h-[41px] lg:ml-[15px] ml-0"
                >
                  <option selected>Separate multiple emails with comma'.</option>
                </select>
                <BsEnvelopePlusFill className="text-[#525050] hidden sm:block" size={32} />
              </div>

              <div className="flex min-[570px]:flex-row max-[570px]:flex-col justify-end gap-[10px] pt-[2px] min-lg:mt-0 max-lg:mt-1">
                <button
                  className='btn-green'
                  type="button"
                  onClick={() => {setIsPreviewOpen(true)}}
                >Preview</button>
                <button
                  className='btn-different'
                  type="button"
                  onClick={() => {updateNoficationTemplateContent()}}
                >Update</button>
                <button
                  className='btn-red-2'
                >Cancel</button>
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
                  >Save</button>
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
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className='w-full border rounded-sm p-1 mt-5 shadow-sm'>
                  <HtmlRenderer htmlContent={templateContent || `<div style="text-align: center; min-height: 100px; padding-top: 35px;">No data Available</div>`} />
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
