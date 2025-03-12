import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon, X } from "lucide-react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { getPromotionsListThunk, addPromotionThunk,editPromotionThunk, deletetPromotionThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const initialPromotion = {
  html_template: "",
  code: "",
  start_date: "",
  end_date: "",
  status: "",
  discount: [],
  record_id: "",
};

const currencyOptions = [
  { code: "US", label: "United States", value: '$', currency_code: "USD", amount: "", },
  { code: "EU", label: "Europe", value: '€', currency_code: "EUR", amount: "", },
  { code: "AU", label: "Australia", value: 'A$', currency_code: "AUD", amount: "", },
  { code: "NG", label: "Nigeria", value: 'N₦', currency_code: "NGN", amount: "", },
  { code: "GB", label: "United Kingdom", value: '£', currency_code: "GBP", amount: "", },
  { code: "CA", label: "Canada", value: 'C$', currency_code: "CAD", amount: "", },
  { code: "IN", label: "India", value: '₹', currency_code: "INR", amount: "", },
];

const flagList = [
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
];

const Promotion: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editPromo, setEditPromo] = useState(false);
  const [newPromotion, setNewPromotion] = useState(initialPromotion);
  console.log("newPromotion...", newPromotion);;
  const initialPrice = { code: "US", label: "United States", value: '$', currency_code: "USD", amount: ''};
  const [price,setPrice] = useState(initialPrice);
  
  const promotionItems = [
    { topic: 'Promo Code', name: 'code'},
    { topic: 'Start Date', name: 'start_date'},
    { topic: 'End Date', name: 'end_date'},
  ];
  const newPromotionItemsLeft = [
    { label: 'Promo Code', placeholder: 'Enter here', name: 'code', type: 'text'},
    { label: 'Template', placeholder: 'HTML/CSS script should be here to make the Promotion template (Dimension: 325px X 200px)', name: 'html_template', type: 'textarea'},
  ];
  const newPromotionItemsRight = [
    { label: 'Start date', placeholder: 'Select here', name: 'start_date', type: 'date'},
    { label: 'End date', placeholder: 'Select here', name: 'end_date', type: 'date'},
    { label: 'Discount Amount', placeholder: 'Enter discount percentage', name: 'discount', type: 'number'},
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

  const updatePrice = (name, price) => {
    const data = newPromotion?.discount;
    const priceAmount = price?.amount;
    const exists = data?.some(item => item?.currency_code === name);
    if(priceAmount > 0) {
      if(exists){
        const newData = data?.map(item => 
          item?.currency_code === name ? { ...item, amount: priceAmount} : item
        );
        setNewPromotion({
          ...newPromotion,
          discount: newData
        });
      }
      else{
        const newData = [ ...data, price];
        setNewPromotion({
          ...newPromotion,
          discount: newData
        });
      }
    } else {
      toast.warning("Amount cannot be 0.")
    }
  };

  const removePrice = (name) => {
    const data = newPromotion?.discount;
    const newData = data.filter(item => item.name !== name);
    setNewPromotion({
      ...newPromotion,
      discount: newData,
    });
  };

  const getFlagImage = (name) => {
    const result = flagList.find(item => item.name === name);
    return result?.flag;
  };

  const getFlagLogo = (name) => {
    const result = flagList.find(item => item.name === name);
    return result?.logo;
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
    } else if(newPromotion?.discount?.length < 1) {
      toast.warning("Minimum 1 discount is needed");
    } else {
      try {
        const result = await dispatch(addPromotionThunk({
          html_template: newPromotion?.html_template,
          code: newPromotion?.code,
          start_date: newPromotion?.start_date,
          end_date: newPromotion?.end_date,
          discount: newPromotion?.discount
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
        } else {
          toast.error(error?.message || "Error on promotion adding");
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
          record_id: newPromotion?.record_id,
          code: newPromotion?.code,
          start_date: newPromotion?.start_date,
          end_date: newPromotion?.end_date,
          html_template: newPromotion?.html_template,
          status: newPromotion?.status,
          discount: newPromotion?.discount
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
        toast.error(error?.message || "Error on promotion editing");
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
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      } else {
        toast.error(error?.message || "Error on promotion deleting");
      }
    } finally {
      fetchPromotionsList();
      setIsDeleteModalOpen(false);
      setNewPromotion(initialPromotion);
    }
  };

  const dateFormat = (date) => {
    const milliseconds = parseInt(date?._seconds) * 1000;
    const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(totalMilliseconds);
    if(newDate != "Invalid Date"){
      return format(newDate, "dd MMM yyyy");
    } else {
      return format(new Date(), "dd MMM yyyy");
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
  }, [newPromotion?.start_date]);

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

  const dateFormat3 = (date) => {
    const milliseconds = parseInt(date?._seconds) * 1000;
    const extraMilliseconds = parseInt(date?._nanoseconds) / 1e6;
    const totalMilliseconds = milliseconds+extraMilliseconds;
    const newDate = new Date(totalMilliseconds);
    if(newDate != "Invalid Date"){
      return format(newDate, "yyyy-MM-dd");
    } else {
      return format(new Date(), "yyyy-MM-dd");
    }
  };

  const udpatePromotionStatus = async(e, promo) => {
    e.preventDefault();
    console.log("promo...", promo);
    try {
      const result = await dispatch(editPromotionThunk({
        record_id: promo?.id,
        code: promo?.code,
        start_date: dateFormat3(promo?.start_date),
        end_date: dateFormat3(promo?.end_date),
        html_template: promo?.html_template,
        status: !promo?.status,
        discount: promo?.discount || [],
      })).unwrap();
      // console.log(result);
      setTimeout(() => {
        toast.success("Updated promotion status.");
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
      } else {
        toast.error(error?.message || "Error on promotion status updating");
      }
    } finally {
      fetchPromotionsList();
    }
  };
  
  return (
    <div className="sm:p-4 p-0 bg-white">
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
                                {item.name === "start_date" || item.name === "end_date" ? dateFormat(promo[item.name]) : promo[item.name]}
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
                    setNewPromotion({
                      html_template: promo?.html_template,
                      code: promo?.code,
                      start_date: dateFormat3(promo?.start_date),
                      end_date: dateFormat3(promo?.end_date),
                      status: promo?.status,
                      discount: promo?.discount || [],
                      record_id: promo?.id
                    });
                  }}
                  type="button"
                  cypress-name="edit-promotion-button"
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
                  cypress-name="delete-promotion-button"
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
        className="relative z-50 focus:outline-none"
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
                <div className=''>
                  <button
                    type='button'
                    className='btn-close-custom text-white'
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewPromotion(initialPromotion);
                      setEditPromo(false);
                    }}
                  ><X className="w-5 h-5 mx-auto" /></button>
                </div>
              </div>

              <form className="grid sm:grid-cols-2 grid-cols-1 gap-4" onSubmit={submitHandler}>
                <div className="col-span-1 grid grid-cols-1">
                  {
                    newPromotionItemsLeft.map((item, index) => {
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
                                value={newPromotion[item.name]}
                              />
                            </div>
                          </div>
                        )
                      } else{
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
                              value={newPromotion[item?.name]}
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>
                
                <div className="col-span-1 grid grid-cols-1">
                  {
                    newPromotionItemsRight.map((item, index) => {
                      if(item.name == 'discount'){
                        return(
                          <div
                            key={index}
                            className="flex flex-col"
                          >
                            <label className="search-input-label">{item.label}</label>
                            <div
                              className="search-input-text grid grid-cols-5 relative"
                            >
                              <p className="absolute mt-[9px] ml-1">{price?.value}</p>
                              <input
                                className="col-span-3 h-full focus:outline-none pl-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type={item.type}
                                placeholder={item.placeholder}
                                value={price?.amount}
                                onChange={e => {
                                  setPrice({
                                    ...price,
                                    amount: e.target.value,
                                  });
                                }}
                                cypress-name="cms-add-promotion-discount"
                              />
                              <select
                                className="col-span-1 h-full"
                                onChange={e => {
                                  setPrice(currencyOptions[e.target.value]);
                                }}
                              >
                                {
                                  currencyOptions.map((currency, inx) => (
                                    <option key={inx} value={inx} defaultChecked={currency.currency_code === "USD" ? true : false}>{currency.currency_code}</option>
                                  ))
                                }
                              </select>
                              <div
                                className="col-span-1 h-full flex justify-center"
                              >
                                <button
                                  type="button"
                                  className="btn-cms-2 my-auto"
                                  onClick={() => {updatePrice(price.currency_code, price)}}
                                  cypress-name="cms-add-promotion-discount-button"
                                >ADD</button>
                              </div>
                            </div>

                            {
                              <div
                                className="flex flex-wrap gap-1 py-2"
                              >
                                {
                                  newPromotion?.discount?.length > 0 ?
                                  newPromotion?.discount?.map((price, i) => {
                                    return(
                                      <div key={i}
                                        className="h-6 rounded-[15px] bg-black bg-opacity-40 flex flex-row px-2 gap-1"
                                      >
                                        <img
                                          src={`${getFlagImage(price.currency_code)}`}
                                          alt={price.name}
                                          className="w-5 h-5 my-auto"
                                        />
                                        <p>{getFlagLogo(price.currency_code)}{price.amount}</p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            removePrice(price.name)
                                          }}
                                        >
                                          <X className="ml-1 w-4" />
                                        </button>
                                      </div>
                                    )
                                  }) : ''
                                }
                              </div>
                            }
                          </div>
                        )
                      } else{
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
                              value={newPromotion[item.name]}
                              onFocus={e => {
                                item.type == 'date' ? e.target.type='date' : e.target.type='text'
                              }}
                              onBlur={e => {
                                e.target.type='text'
                              }}
                              disabled={
                                item.name === "end_date"
                                ? newPromotion?.start_date === ""
                                  ? true
                                  : false
                                : false
                              }
                              min={
                                item.name === "end_date"
                                ? newPromotion?.start_date
                                : ""
                              }
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>

                <div className="flex flex-col w-full sm:col-span-2 col-span-1">
                  <div className="flex justify-center w-full">
                    <button
                      type="button"
                      className="btn-green min-w-[110px] max-w-[150px] items-start mt-2 mx-auto"
                      onClick={() => {
                        setIsPreviewModalOpen(true);
                      }}
                      cypress-name="cypress-promotion-preview-btn"
                    >Preview</button>
                  </div>

                  <div className="flex flex-row max-sm:justify-center gap-3 pt-4 w-full">
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
        className="relative z-50 focus:outline-none"
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
