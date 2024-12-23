import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "lucide-react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { getPromotionsListThunk, addPromotionThunk,editPromotionThunk, deletetPromotionThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialPromotion = {
  html_template: "",
  code: "",
  start_date: "",
  end_date: "",
  status: ""
};

const Promotion: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editPromo, setEditPromo] = useState(false);
  const [newPromotion, setNewPromotion] = useState(initialPromotion);
  console.log({newPromotion})
  
  const promotionItems = [
    { topic: 'Promo Code', name: 'code'},
    { topic: 'Start Date', name: 'start_date'},
    { topic: 'End Date', name: 'end_date'},
  ];
  const newPromotionItems = [
    { label: 'Promo Code', placeholder: 'Enter here', name: 'code', type: 'text'},
    { label: 'Start date', placeholder: 'Select here', name: 'start_date', type: 'date'},
    { label: 'Template', placeholder: 'HTML/CSS script should be here to make the Promotion template', name: 'html_template', type: 'textarea'},
    { label: 'End date', placeholder: 'Select here', name: 'end_date', type: 'date'},
  ];

  const [promotions, setPromotions] = useState([]);
  // console.log(promotions);

  const fetchPromotionsList = async() => {
    try {
      const result = await dispatch(getPromotionsListThunk()).unwrap();
      setPromotions(result);
    } catch (error) {
      setPromotions([]);
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
    fetchPromotionsList();
  }, []);
  
  const handleChange = e => {
    setNewPromotion({
      ...newPromotion,
      [e.target.name]: e.target.value
    });
  };

  const [endDateEnable, setEndDateEnable] = useState(true);
  useEffect(() => {
    if(newPromotion?.start_date != ""){
      setEndDateEnable(false);
    }
    else{
      setEndDateEnable(true);
    }
  }, [newPromotion?.start_date]);

  const addPromotion = async() => {
    if(newPromotion?.html_template === "" || newPromotion?.html_template.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.code === "" || newPromotion?.code.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.start_date === "" || newPromotion?.start_date.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.end_date === "" || newPromotion?.end_date.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else {
      try {
        const result = await dispatch(addPromotionThunk(newPromotion)).unwrap();
        // console.log(result);
        setTimeout(() => {
          toast.success(result?.message);
        }, 1000);
      } catch (error) {
        // console.log(error);
        toast.error("Error on promotion adding");
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        fetchPromotionsList();
        setIsEditModalOpen(false);
        setNewPromotion(initialPromotion);
      }
    }
  };

  const editPromotion = async() => {
    if(newPromotion?.html_template === "" || newPromotion?.html_template.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.code === "" || newPromotion?.code.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.start_date === "" || newPromotion?.start_date.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else if(newPromotion?.end_date === "" || newPromotion?.end_date.trim() === "") {
      toast.warning("Please fill all the inputs");
    } else {
      try {
        const result = await dispatch(editPromotionThunk({
          record_id: newPromotion?.id,
          code: newPromotion?.code,
          start_date: newPromotion?.start_date,
          end_date: newPromotion?.end_date,
          html_template: newPromotion?.html_template,
          status: newPromotion?.status
        })).unwrap();
        // console.log(result);
        setTimeout(() => {
          toast.success(result?.message);
        }, 1000);
      } catch (error) {
        // console.log(error);
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
        toast.error("Error on promotion editing");
      } finally {
        fetchPromotionsList();
        setIsEditModalOpen(false);
        setNewPromotion(initialPromotion);
        setEditPromo(false);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(editPromo){
      editPromotion();
    }
    else{
      addPromotion();
    }
  };

  const deletePromotion = async(id) => {
    try {
      const result = await dispatch(deletetPromotionThunk({record_id: id})).unwrap();
      // console.log(result);
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      // console.log(error);
      toast.error("Error on promotion deleting");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchPromotionsList();
      setIsDeleteModalOpen(false);
      setNewPromotion(initialPromotion);
    }
  };

  const dateFormat = (date) => {
    // const milliseconds = parseInt(date?._seconds) * 1000;
    // const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    // const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(date);
    if(newDate != "Invalid Date"){
      return format(newDate, "dd MMM yyyy");
    } else {
      return null;
    }
  };

  const dateFormat1 = (date) => {
    // const milliseconds = parseInt(date?._seconds) * 1000;
    // const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    // const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(date);
    if(newDate != "Invalid Date") {
      return format(newDate, "dd-MM-yyyy");
    } else {
      return null;
    }
  };

  useEffect(() => {
    console.log(dateFormat1(newPromotion?.start_date))
  }, [newPromotion?.start_date])

  const dateFormat2 = (date) => {
    // const milliseconds = parseInt(date?._seconds) * 1000;
    // const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    // const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(date);
    if(newDate != "Invalid Date"){
      return format(newDate, "dd MMM yyyy");
    } else {
      return 'N/A';
    }
  };

  const udpatePromotionStatus = async(e, promo) => {
    e.preventDefault();
    try {
      const result = await dispatch(editPromotionThunk({
        record_id: promo?.id,
        code: promo?.code,
        start_date: promo?.start_date,
        end_date: promo?.end_date,
        html_template: promo?.html_template,
        status: !promo?.status
      })).unwrap();
      // console.log(result);
      setTimeout(() => {
        toast.success("Updated promotion status.");
      }, 1000);
    } catch (error) {
      // console.log(error);
      toast.error("Error on promotion status updating");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchPromotionsList();
    }
  };
  
  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-6">
        <button
          className="btn-cms"
          onClick={() => {setIsEditModalOpen(true)}}
          cypress-name="cypress-add-promotion"
        >
          ADD
        </button>
      </div>
      <div className="bg-custom-white-2 space-y-6">
        {promotions.map((promo, index) => (
          <div key={index} className="p-4 border">
            <div className="grid grid-cols-1 gap-2">
              <div className="grid sm:grid-cols-2 grid-cols-1 items-center space-x-4">
                <div
                  className="flex flex-col items-left"
                >
                  <div
                    className="my-auto w-full border border-dashed border-black rounded-md"
                    dangerouslySetInnerHTML={{ __html: promo?.html_template }}
                  ></div>
                  <div className="flex items-center justify-start max-lg:mx-auto mt-3 lg:ml-4">
                    <div className="flex min-[400px]:flex-row max-[400px]:flex-col items-center min-[400px]:gap-6 max-[400px]:gap-0">
                      <span
                        className="font-inter-16px-bold-black"
                      >Status:</span>
                      <button
                        className={`px-3 h-[24px] font-inter-16px-400 rounded-full text-white ${
                          promo.status ? "bg-custom-green" : "bg-custom-red"
                        }`}
                        type="button"
                        onClick={(e) => {udpatePromotionStatus(e, promo)}}
                      >
                        {promo.status ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table
                    className="sm:px-7 px-0 w-full"
                  >
                    <tbody
                      className=""
                    >
                      {
                        promotionItems.map((item, i) => {
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 py-2 sm:pl-7 pl-1"
                              >{item.topic}</td>
                              <td
                                className="px-3 banner-table-td-1 text-center py-2"
                              >:</td>
                              <td
                                className="banner-table-td-2 py-2 pr-7 min-w-[100px]"
                              >
                                {item.name !== "code" ? dateFormat2(promo[item.name]) : promo[item.name]}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-end justify-end space-x-4">
                <button
                  className="px-2 text-black hover:text-orange-300 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setEditPromo(true);
                    setIsEditModalOpen(true);
                    setNewPromotion(promo);
                  }}
                  type="button"
                  cypress-name={`edit-promotion-${index+1}`}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="px-2 text-black hover:text-red-600 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setNewPromotion(promo);
                  }}
                  type="button"
                  cypress-name={`delete-promotion-${index+1}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsEditModalOpen(false);
          setNewPromotion(initialPromotion);
          setEditPromo(false);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  {editPromo ? 'Edit Promotion' : 'Add Promotion'}
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewPromotion(initialPromotion);
                      setEditPromo(false);
                    }}
                  >+</button>
                </div>
              </div>

              <form className="grid sm:grid-cols-2 grid-cols-1 gap-4" onSubmit={submitHandler}>
                {
                  newPromotionItems.map((item, index) => {
                    if(item.type == 'textarea'){
                      return(
                        <div>
                          <div
                            className="flex flex-col"
                            key={index}
                          >
                            <label className="search-input-label">{item.label}</label>
                            <textarea
                              name={item.name}
                              className="w-full search-input-text-2 h-[140px] py-2 pl-2"
                              placeholder={item.placeholder}
                              onChange={handleChange}
                              defaultValue={newPromotion[item.name]}
                            />
                          </div>
                        </div>
                      )
                    }
                    else if(item.name == 'end_date'){
                      return(
                        <div
                          className="flex flex-col justify-between"
                        >
                          <div
                            className="flex flex-col"
                            key={index}
                          >
                            <label className="search-input-label">{item.label}</label>
                            <input
                              type='text'
                              name={item.name}
                              className="w-full search-input-text"
                              placeholder={item.placeholder}
                              onChange={handleChange}
                              defaultValue={dateFormat(newPromotion[item.name])}
                              onFocus={e => {
                                item.type == 'date' ? e.target.type='date' : e.target.type='text'
                              }}
                              onBlur={e => {
                                e.target.type='text'
                              }}
                            />
                          </div>

                          <button
                            type="button"
                            className="btn-green min-w-[110px] max-w-[150px] items-start"
                            onClick={() => {
                              setIsPreviewModalOpen(true);
                            }}
                            cypress-name="cypress-promotion-preview-btn"
                          >Preview</button>
                        </div>
                      )
                    }
                    else{
                      return(
                        <div
                          className="flex flex-col"
                          key={index}
                        >
                          <label className="search-input-label">{item.label}</label>
                          <input
                            type='text'
                            name={item.name}
                            className="w-full search-input-text"
                            placeholder={item.placeholder}
                            onChange={handleChange}
                            defaultValue={item?.name === "start_date" ? dateFormat(newPromotion[item.name]) : newPromotion[item?.name]}
                            onFocus={e => {
                              item.type == 'date' ? e.target.type='date' : e.target.type='text'
                            }}
                            onBlur={e => {
                              e.target.type='text'
                            }}
                          />
                        </div>
                      )
                    }
                  })
                }

                <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                    cypress-name="submit-promotion-add-btn"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewPromotion(initialPromotion);
                      setEditPromo(false);
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
        <Dialog
          open={isPreviewModalOpen}
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={() => {
            setIsPreviewModalOpen(false);
          }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 z-60 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Promotion Preview</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {
                        setIsPreviewModalOpen(false);
                      }}
                      cypress-name="close-promotion-preview-btn"
                    >+</button>
                  </div>
                </div>
                
                <div dangerouslySetInnerHTML={{ __html: newPromotion?.html_template }}>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setNewPromotion(initialPromotion);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Delete Promotion</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setNewPromotion(initialPromotion);
                    }}
                  >+</button>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    deletePromotion(newPromotion?.id);
                  }}
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  cypress-name="delete-promotion-btn"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setNewPromotion(initialPromotion);
                  }}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Promotion;
