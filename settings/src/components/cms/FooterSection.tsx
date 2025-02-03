import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/styles.css';
import { getFooterThunk, updateFooterThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialJson = {
  name: "",
  value: "",
  type: "url",
}

const FooterSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const footerItems = [
    { topic: 'Heading', name: 'heading',},
    { topic: 'Menu', name: 'menu',},
  ];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
      ['bold', 'italic', 'underline', 'strike'], // Text styling buttons
      [{ 'color': [] }, { 'background': [] }], // Text and background color
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], // Lists
      ['link',], // Links and images
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // Remove formatting
    ],
  };

  const footerNames = [
    {
      header: "Marketing",
      name: "marketing_section_data",
    },
    {
      header: "Websites",
      name: "website_section_data",
    },
    {
      header: "Contact Us",
      name: "contact_us_section_data",
    },
    {
      header: "Learning and Support",
      name: "newsletter_section_data",
    },
    // {
    //   header: "Social Link",
    //   name: "social_section_data",
    // },
  ];

  const [footerData, setFooterData] = useState([]);
  console.log(footerData);
  const [editFooterData, setEditFooterData] = useState([]);

  const fetchFooterData = async() => {
    try {
      const result = await dispatch(getFooterThunk()).unwrap();
      setFooterData(result);
    } catch (error) {
      setFooterData([]);
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
    fetchFooterData();
  }, []);

  const handleFooterArrayChange = (e, fieldName, index, field) => {
    const data = editFooterData[fieldName];
    // console.log(data[index]);
    data[index][field] = e.target.value;
    setEditFooterData({
      ...footerData,
      [fieldName]: data
    });
  };

  const handleFooterChange = (e, fieldName) => {
    var data = footerData[fieldName];
    data.value = e.target.value;
    console.log(data)
    setFooterData({
      ...footerData,
      [fieldName]: data
    });
  };

  const handleEditorChange = (content) => {
    setEditFooterData((prev) => ({
      ...prev,
      contact_us_section_data: {
        ...prev.contact_us_section_data,
        value: content,
      },
    }));
    // console.log("Updated content:", content);
  }

  const addNewJson = (fieldName) => {
    const newArray = editFooterData[fieldName];
    newArray.push(initialJson);
    setEditFooterData({
      ...editFooterData,
      [fieldName]: newArray
    })
    console.log(newArray)
  };

  const removeJson = (index, fieldName) => {
    // setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    const array = editFooterData[fieldName];
    const newArray = array?.filter((_, i) => i !== index);
    // console.log(newArray);
    setEditFooterData({
      ...editFooterData,
      [fieldName]: newArray
    })
  };

  // const validateForm = () => {
  //   // Check for spaces only in any field
  //   for (const key in customer) {
  //     if (customer[key].trim() === '') {
  //       return false;
  //     } else {
  //       if(customer?.phone_no?.length < 11) {
  //         return false;
  //       }
  //       return true;
  //     }
  //   }
  //   return true;
  // };

  const validateForm = () => {
    if (editFooterData?.marketing_section_data?.some(element => 
      !element?.name?.trim() || !element?.value?.trim()
    )) {
      return false;
    }
    if (editFooterData?.website_section_data?.some(element => 
      !element?.name?.trim() || !element?.value?.trim()
    )) {
      return false;
    }
    if (!editFooterData?.contact_us_section_data?.name?.trim() || 
      !footerData?.contact_us_section_data?.value?.trim()) {
      return false;
    }
    if (editFooterData?.newsletter_section_data?.some(element => 
      !element?.name?.trim() || !element?.value?.trim()
    )) {
      return false;
    }
    if (editFooterData?.social_section_data?.some(element => 
      !element?.name?.trim() || !element?.value?.trim()
    )) {
      return false;
    }
    return true;
  };

  const updateFooterData = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        const updateFooter = await dispatch(updateFooterThunk({
          marketing_section_data : editFooterData?.marketing_section_data,
          website_section_data: editFooterData?.website_section_data,
          contact_us_section_data: editFooterData?.contact_us_section_data,
          newsletter_section_data: editFooterData?.newsletter_section_data,
          social_section_data: editFooterData?.social_section_data,
        })).unwrap();
        setTimeout(() => {
          toast.success(updateFooter?.message);
        }, 1000);
        setShowModal(false);
      } catch (error) {
        toast.error("Error updating footer");
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        fetchFooterData();
      }
    } else {
      toast.warning("Please fill all the fields")
    }
  }

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {
          setShowModal(true);
          setEditFooterData(footerData);
        }}>
          EDIT
        </button>
      </div>
      <div className="space-y-4">
        {
          footerNames.map((footer, index) => {
            return(
              <div
                className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
                key={index}
              >
                <table
                  className="sm:px-7 px-2 min-w-full"
                >
                  <tbody>
                    {
                      footerItems.map((item, i) => {
                        if(i == 1){
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-[6px] sm:pl-7 pl-1 "
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2 w-[50px]"
                              >:</td>
                              <td
                                className={`banner-table-td-2 py-1 pr-7 text-black ${
                                  ""// item.name == "title" ? "font-medium" : "font-normal"
                                }`}
                              >
                                {
                                  // footer?.name === "newsletter_section_data" ?
                                  // (
                                  //   <tr
                                  //     className="py-0"
                                  //   >
                                  //     <td
                                  //       className="banner-table-td-1 w-[150px] py-2 sm:pl-7 pl-1"
                                  //     >{footerData?.newsletter_section_data?.name}</td>
                                  //     <td
                                  //       className="px-3 text-center banner-table-td-1 py-2"
                                  //     >:</td>
                                  //     <td
                                  //       className={`banner-table-td-2 py-2 pr-7 text-black`}
                                  //     >
                                  //       {footerData?.newsletter_section_data?.value}
                                  //     </td>
                                  //   </tr>
                                  // ) :
                                  footer?.name === "contact_us_section_data" ?
                                  (
                                    <tr
                                      className="py-0"
                                    >
                                      <td
                                        className="banner-table-td-1 w-[150px] py-2 sm:pl-7 pl-1"
                                      >{footerData?.contact_us_section_data?.name}</td>
                                      <td
                                        className="px-3 text-center banner-table-td-1 py-2"
                                      >:</td>
                                      <td
                                        className={`banner-table-td-2 py-2 pr-7 text-black`}
                                      >
                                        <div className=""
                                          dangerouslySetInnerHTML={{ __html: footerData?.contact_us_section_data?.value }}
                                        ></div>
                                        {/* {footerData?.newsletter_section_data?.value} */}
                                      </td>
                                    </tr>
                                  ) :
                                  footerData[footer?.name]?.map((me, n) => {
                                    return(
                                      <tr
                                        key={n}
                                        className="py-0"
                                      >
                                        <td
                                          className="banner-table-td-1 w-[150px] py-2 sm:pl-7 pl-1"
                                        >{me.name}</td>
                                        <td
                                          className="px-3 text-center banner-table-td-1 py-2"
                                        >:</td>
                                        <td
                                          className={`banner-table-td-2 py-2 pr-7 ${
                                            me.type == 'url' ? 'text-custom-blue-9 cursor-pointer underline' : 'text-black'
                                          }`}
                                        >
                                          {
                                            me.type == 'url' ? <a href={me.value} target="_blank">{me.value}</a> : me.value
                                          }
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-2 sm:pl-7 pl-1"
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2 w-[50px]"
                              >:</td>
                              <td
                                className={`banner-table-td-1 py-3 sm:pl-7 pl-1`}
                              >
                                {footer.header}
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
          })
        }
      </div>
      {/* <FooterEditModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      /> */}
      <Dialog
        open={showModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setShowModal(false);
          setEditFooterData([]);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Edit Footer</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {
                        setShowModal(false);
                        setEditFooterData([]);
                      }}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid grid-cols-1 max-h-[400px] overflow-y-scroll"
                  onSubmit={updateFooterData}
                >
                  {
                    footerNames && footerNames.map((footer, index) => {
                      return(
                        <div
                          key={index}
                          className="flex flex-col"
                        >
                          <label
                            className="search-input-label"
                          >{footer.header}</label>
                          <div
                            className="search-input-text-2 p-3"
                          >
                            {
                              index < 2 && editFooterData[footer.name]?.map((item, idx) => {
                                if(idx == 0){
                                  return (
                                    <div
                                      className={`flex flex-row ${
                                        index < 2 ? 'gap-4 justify-between' : ''
                                      }`}
                                    >
                                      <div
                                        className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                      >
                                        <div
                                          className="sm:col-span-1 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Name</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the name"
                                            value={item?.name}
                                            onChange={(e) => {handleFooterArrayChange(e, footer.name, idx, "name")}}
                                            required
                                          />
                                        </div>
                                        <div
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Link</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            value={item?.value}
                                            onChange={(e) => {handleFooterArrayChange(e, footer.name, idx, "value")}}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <button
                                        className={`flex flex-col items-center justify-center w-9 h-[46px] border border-custom-white rounded-[5px] sm:mt-3 my-auto`}
                                        type="button"
                                        onClick={() => {addNewJson(footer.name)}}
                                      >
                                        <svg
                                          aria-hidden="true"
                                          className="w-4 h-4 text-custom-gray-6"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M12 4v16m8-8H4"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div
                                      className={`flex flex-row ${
                                        index < 2 ? 'gap-4 justify-between' : ''
                                      }`}
                                    >
                                      <div
                                        className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                      >
                                        <div
                                          className="sm:col-span-1 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Name</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the name"
                                            value={item?.name}
                                            onChange={(e) => {handleFooterArrayChange(e, footer.name, idx, "name")}}
                                            required
                                          />
                                        </div>
                                        <div
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Link</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            value={item?.value}
                                            onChange={(e) => {handleFooterArrayChange(e, footer.name, idx, "value")}}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <button
                                        className={`flex flex-col items-center justify-center w-9 h-[46px] border border-custom-white rounded-[5px] sm:mt-3 my-auto`}
                                        type="button"
                                        onClick={() => {removeJson(idx, footer.name)}}
                                      >
                                        <svg
                                          aria-hidden="true"
                                          className="w-4 h-4 text-custom-gray-6"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h14"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  )
                                }
                              })
                            }

                            {
                              index === 2 && (
                                <div
                                  className={`flex flex-col h-[235px] mb-3`}
                                >
                                  <label
                                    className="search-input-label"
                                  >Content</label>
                                  <div
                                    className="search-input-text w-full font-inter font-normal text-custom-black-4 text-base min-h-full py-4 pr-2"
                                  >
                                    <ReactQuill
                                      value={editFooterData?.contact_us_section_data?.value}
                                      onChange={handleEditorChange}
                                      theme="snow"
                                      style={{height: 135}}
                                      modules={modules}
                                    />
                                  </div>
                                </div>
                              )
                            }

                            {
                              index === 3 && editFooterData?.newsletter_section_data?.map((item, idx) => {
                                if(idx == 0){
                                  return (
                                    <div
                                      className={`flex flex-row ${
                                        index === 3 ? 'gap-4 justify-between' : ''
                                      }`}
                                    >
                                      <div
                                        className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                      >
                                        <div
                                          className="sm:col-span-1 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Name</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the name"
                                            value={item?.name}
                                            onChange={(e) => {handleFooterArrayChange(e, footer?.name, idx, "name")}}
                                            required
                                          />
                                        </div>
                                        <div
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Link</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            value={item?.value}
                                            onChange={(e) => {handleFooterArrayChange(e, footer?.name, idx, "value")}}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <button
                                        className={`flex flex-col items-center justify-center w-9 h-[46px] border border-custom-white rounded-[5px] sm:mt-3 my-auto`}
                                        type="button"
                                        onClick={() => {addNewJson(footer?.name)}}
                                      >
                                        <svg
                                          aria-hidden="true"
                                          className="w-4 h-4 text-custom-gray-6"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M12 4v16m8-8H4"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div
                                      className={`flex flex-row ${
                                        index === 3 ? 'gap-4 justify-between' : ''
                                      }`}
                                    >
                                      <div
                                        className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                      >
                                        <div
                                          className="sm:col-span-1 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Name</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the name"
                                            value={item?.name}
                                            onChange={(e) => {handleFooterArrayChange(e, footer?.name, idx, "name")}}
                                            required
                                          />
                                        </div>
                                        <div
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >Link</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            value={item?.value}
                                            onChange={(e) => {handleFooterArrayChange(e, footer?.name, idx, "value")}}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <button
                                        className={`flex flex-col items-center justify-center w-9 h-[46px] border border-custom-white rounded-[5px] sm:mt-3 my-auto`}
                                        type="button"
                                        onClick={() => {removeJson(idx, footer?.name)}}
                                      >
                                        <svg
                                          aria-hidden="true"
                                          className="w-4 h-4 text-custom-gray-6"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h14"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  )
                                }
                              })
                            }

                            {
                              index === 4 && (
                                <div
                                  className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                >
                                  {
                                    editFooterData?.social_section_data?.map((social, ind) => {
                                      return(
                                        <div
                                          key={ind}
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >{social?.name}</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            value={social?.value}
                                            onChange={(e) => {handleFooterArrayChange(e, "social_section_data", ind, "value")}}
                                            required
                                          />
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditFooterData([]);
                      }}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FooterSection;
