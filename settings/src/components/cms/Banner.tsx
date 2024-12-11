import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { getBannerListThunk, addBannerThunk, editBannerThunk, deleteBannerThunk, uploadImageThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialBanner = {
  title: '',
  description: '',
  video_url: '',
  show_video_status: false,
  currency_details: [],
  button_title: '',
  button_url: '',
  background_image: '',
  show_promotion_status: false,
}



const Banner: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { defaultCurrency } = useAppSelector((state) => state.auth);
  const initialPrice = { code: "US", label: "United States", value: '$', currency_code: "USD", amount: ''};
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState(initialBanner);
  const [price,setPrice] = useState(initialPrice);
  const [editBanner, setEditBanner] = useState(false);
  // console.log(newBanner);
  const [imageFile, setImage] = useState(null);
  const imageRef = useRef(null);
  
  const showImage = () => {
    const file = imageFile;
    if(file){
      if(file instanceof File){
        const reader = new FileReader();
        reader.onload = () => {
          if (imageRef.current) {
            imageRef.current.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
      else if(typeof file === 'string'){
        if (imageRef.current) {
          imageRef.current.src = file;
        }
      }
    }
  };

  useEffect(() => {
    showImage();
  }, [imageFile]);
  
  const bannerItems = [
    { topic: 'Title', name: 'title'},
    { topic: 'Description', name: 'description'},
    { topic: 'Button Title', name: 'button_title'},
    { topic: 'Button URL', name: 'button_url'},
    { topic: 'Starting price', name: 'currency_details'},
  ];
  
  const [banners, setBanners] = useState([]);
  // console.log(banners);

  const fetchBannerList = async() => {
    try {
      const result = await dispatch(getBannerListThunk()).unwrap();
      setBanners(result.data);
    } catch (error) {
      setBanners([]);
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
    fetchBannerList();
  }, []);
  

  const flagList = [
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
  ];

  const currencyOptions = [
    { code: "US", label: "United States", value: '$', currency_code: "USD", amount: "", },
    { code: "EU", label: "Europe", value: '€', currency_code: "EUR", amount: "", },
    { code: "AU", label: "Australia", value: 'A$', currency_code: "AUD", amount: "", },
    { code: "NG", label: "Nigeria", value: 'N₦', currency_code: "NGN", amount: "", },
    { code: "GB", label: "United Kingdom", value: '£', currency_code: "GBP", amount: "", },
    { code: "CA", label: "Canada", value: 'C$', currency_code: "CAD", amount: "", },
    { code: "IN", label: "India", value: '₹', currency_code: "INR", amount: "", },
  ];

  const bannerLeft = [
    {label: 'Title', name: 'title', placeholder: 'Enter the banner heading here', type: 'text',},
    {label: 'Video URL', name: 'video_url', placeholder: 'Enter the video URL', type: 'text',},
    {label: 'Starting at', name: 'currency_details', placeholder: 'Enter the amount here', type: 'number',},
    {label: 'Button Title', name: 'button_title', placeholder: 'Enter the button name here', type: 'text',},
    {label: 'Button URL', name: 'button_url', placeholder: 'Enter the button URL', type: 'text',},
  ];

  const bannerRight = [
    {label: 'Description', name: 'description', placeholder: 'TinyMCE editor will be used', type: 'text',},
    {label: 'Upload background image ', name: 'background_image', placeholder: 'Add photo', type: 'file',},
  ];

  const updateBanner = e => {
    setNewBanner({
      ...newBanner,
      [e.target.name]: e.target.value,
    });
  };

  const updatePrice = (name, price) => {
    const data = newBanner.currency_details;
    const exists = data.some(item => item.currency_code === name);
    if(exists){
      const newData = data.map(item => 
        item.currency_code === name ? { ...item, amount: price.amount} : item
      );
      setNewBanner({
        ...newBanner,
        currency_details: newData
      });
    }
    else{
      const newData = [ ...data, price];
      setNewBanner({
        ...newBanner,
        currency_details: newData
      });
    }
  };

  const removePrice = (name) => {
    const data = newBanner.currency_details;
    const newData = data.filter(item => item.name !== name);
    setNewBanner({
      ...newBanner,
      currency_details: newData
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

  const addBannerSubmit = async(e) => {
    e.preventDefault();
    if(imageFile !== null && typeof imageFile !== "string"){
      try {
        const imageUpload = await dispatch(uploadImageThunk({image: imageFile})).unwrap();
        console.log("imageUpload", imageUpload);
        if(imageUpload?.message === "File uploaded successfully!") {
          try {
            const result = await dispatch(addBannerThunk({
              title: newBanner.title,
              description: newBanner.description,
              video_url: newBanner.video_url,
              show_video_status: newBanner.show_video_status,
              currency_details: newBanner.currency_details,
              button_title: newBanner.button_title,
              button_url: newBanner.button_url,
              background_image: imageUpload.url,
              show_promotion_status: newBanner.show_promotion_status,
            })).unwrap()
            console.log(result);
            setTimeout(() => {
              toast.success(result?.message);
            }, 1000);
          } catch (error) {
            console.log(error);
            toast.error("Error adding banner");
          } finally {
            fetchBannerList();
            setIsEditModalOpen(false);
            setNewBanner(initialBanner);
            setImage(null);
          }
        }
        else{
          toast.error("Error uploading the image.");
        }
      } catch (error) {
        toast.error("Please upload a valid image.");
      }
    }
    else{
      toast.error("Enter a valid image");
    }
  }

  const editBannerSubmit = async(e) => {
    e.preventDefault();
    if(imageFile !== null && typeof imageFile !== "string"){
      try {
        const imageUpload = await dispatch(uploadImageThunk({image: imageFile})).unwrap();
        console.log("imageUpload", imageUpload);
        if(imageUpload?.message === "File uploaded successfully!") {
          try {
            const result = await dispatch(editBannerThunk({
              record_id: newBanner?.id,
              title: newBanner?.title,
              description: newBanner?.description,
              video_url: newBanner?.video_url,
              button_title: newBanner?.button_title,
              button_url: newBanner?.button_url,
              background_image: imageUpload.url,
              show_video_status: newBanner?.show_video_status,
              show_promotion_status: newBanner?.show_promotion_status,
              currency_details: newBanner?.currency_details,
              active: newBanner?.active
            })).unwrap()
            console.log(result);
            setIsEditModalOpen(false);
            setImage(null);
            setTimeout(() => {
              toast.success(result?.message);
            }, 1000);
          } catch (error) {
            // console.log(error);
            toast.error("Error editing banner");
          } finally {
            fetchBannerList();
            setEditBanner(false);
            setNewBanner(initialBanner);
          }
        }
        else{
          toast.error("Error uploading the image.");
        }
      } catch (error) {
        toast.error("Please upload a valid image.");
      }
    }
    else{
      try {
        const result = await dispatch(editBannerThunk({
          record_id: newBanner?.id,
          title: newBanner?.title,
          description: newBanner?.description,
          video_url: newBanner?.video_url,
          button_title: newBanner?.button_title,
          button_url: newBanner?.button_url,
          background_image: newBanner?.background_image,
          show_video_status: newBanner?.show_video_status,
          show_promotion_status: newBanner?.show_promotion_status,
          currency_details: newBanner?.currency_details,
          active: newBanner?.active
        })).unwrap()
        console.log(result);
        setIsEditModalOpen(false);
        setImage(null);
        setTimeout(() => {
          toast.success(result?.message);
        }, 1000);
      } catch (error) {
        // console.log(error);
        toast.error("Error editing banner");
      } finally {
        fetchBannerList();
        setEditBanner(false);
        setNewBanner(initialBanner);
      }
    }
  }

  const formSubmit = (e) => {
    if(editBanner){
      editBannerSubmit(e);
    }
    else{
      addBannerSubmit(e);
    }
  };

  const deleteBanner = async(id) => {
    try {
      const result = await dispatch(deleteBannerThunk({record_id: id})).unwrap();
      console.log(result);
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      // console.log("Error deleting banner");
      toast.error("Error deleting banner");
    } finally {
      fetchBannerList();
      setIsDeleteModalOpen(false);
      setNewBanner(initialBanner);
    }
  };

  const updateActiveStatus = async(e, banner) => {
    e.preventDefault();
    try {
      const result = await dispatch(editBannerThunk({
        record_id: banner?.id,
        active: !banner?.active
      })).unwrap()
      console.log(result);
      toast.success("Status updated successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Error updating status");
    } finally {
      fetchBannerList();
    }
  }

  const updateShowCoupon = async(e, banner) => {
    e.preventDefault();
    try {
      const result = await dispatch(editBannerThunk({
        record_id: banner?.id,
        show_promotion_status: !banner?.show_promotion_status
      })).unwrap()
      console.log(result);
      toast.success("Show coupon status updated successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Error updating show coupon status");
    } finally {
      fetchBannerList();
    }
  }

  const updateShowVideo = async(e, banner) => {
    e.preventDefault();
    try {
      const result = await dispatch(editBannerThunk({
        record_id: banner?.id,
        show_video_status: !banner?.show_video_status
      })).unwrap()
      console.log(result);
      toast.success("Show video status updated successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Error updating show video status");
    } finally {
      fetchBannerList();
    }
  }

  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-6">
        <button className="btn-cms"
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          ADD
        </button>
      </div>

      <div className="bg-custom-white-2">
        {banners.map((banner, index) => (
          <div key={index} className="p-4 border">
            <div className="flex items-center justify-end mb-4">
              <div className="flex min-sm:flex-row max-sm:flex-col sm:items-center items-end sm:gap-4 gap-2">
                <div className="flex sm:items-center items-end h-5 gap-2">
                  <span
                    className="font-inter font-normal text-xs text-black opacity-60"
                  >Show Coupon :</span>
                  <div
                    className="transition-transform duration-1000 ease-in-out"
                    // onClick={() => setShowNotfication(!showNotification)}
                  >
                    {/* {notificationToggle()} */}
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={banner?.show_promotion_status} onClick={(e) => {
                        updateShowCoupon(e, banner);
                      }} />
                      <div
                        className="w-[37px] h-[19px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D13B]">
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex sm:items-center items-end h-5 gap-2">
                  <span
                    className="font-inter font-normal text-xs text-black opacity-60"
                  >Show Video :</span>
                  <div
                    className="transition-transform duration-1000 ease-in-out"
                    // onClick={() => setShowNotfication(!showNotification)}
                  >
                    {/* {notificationToggle()} */}
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={banner?.show_video_status} onClick={(e) => {
                        updateShowVideo(e, banner);
                      }} />
                      <div
                        className="w-[37px] h-[19px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D13B]">
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 grid-cols-1 gap-3">
              <div
                className="flex flex-col items-left"
              >
                <div
                  className="my-auto"
                >
                  <img
                    src={banner?.background_image}
                    alt={banner?.title}
                    className="w-full max-h-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-start max-lg:mx-auto mt-3 lg:ml-4">
                  <div className="flex min-[400px]:flex-row max-[400px]:flex-col items-center min-[400px]:gap-6 max-[400px]:gap-0">
                    <span
                      className="font-inter-16px-bold-black"
                    >Status:</span>
                    <button
                      className={`px-3 h-[24px] font-inter-16px-400 rounded-full text-white ${
                        banner?.active ? "bg-custom-green" : "bg-custom-red"
                      }`}
                      type="button"
                      onClick={(e) => {
                        updateActiveStatus(e, banner);
                      }}
                    >
                      {banner?.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 overflow-x-auto">
                <table
                  className="sm:px-7 px-0 w-full"
                >
                  <tbody
                    className=""
                  >
                    {
                      bannerItems.map((e, i) => {
                        if(e.name == 'currency_details'){
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 w-[141px] py-2 sm:pl-7 pl-1"
                              >Starting price</td>
                              <td
                                className="px-3 w-[10px] banner-table-td-1 text-center py-2"
                              >:</td>
                              <td
                                className="flex flex-wrap gap-2 py-2 pr-7"
                              >
                                {
                                  banner.currency_details.map((price, n) => {
                                    return(
                                      <span
                                        key={n}
                                        className="banner-price-span px-2"
                                      >
                                        <img src={`${getFlagImage(price?.currency_code)}`} alt={price.currency_code} className="w-auto h-auto p-1" />
                                        <p
                                          className="banner-price-p"
                                        >{price.amount}</p>
                                        <button>
                                          <X className="ml-1 w-4" />
                                        </button>
                                      </span>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 w-[141px] py-2 sm:pl-7 pl-0"
                              >{e.topic}</td>
                              <td
                                className="px-3 w-[10px] text-center banner-table-td-1 py-2"
                              >:</td>
                              <td
                                className={`banner-table-td-2 py-2 pr-7 ${
                                  e.name == "title" ? "font-medium text-black" : e.name == "description" ? "font-normal text-black": e.name == "button_title" ? "font-bold text-black" : e.name == "button_url" ? "font-normal text-custom-blue-8 cursor-pointer" : ""
                                }`}
                              >
                                {
                                  e.name == "button_url" ?
                                  <a href={banner?.button_url} target="_blank" className="cursor-pointer text-cBlue">{banner?.button_url}</a> :
                                  e.name === "description" ?
                                  <div className=""
                                    dangerouslySetInnerHTML={{ __html: banner?.description }}
                                  ></div> :
                                  banner[e.name]
                                }
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex items-end justify-end space-x-4">
                <button className="px-2 text-black hover:text-orange-300 duration-300 transition-all ease-in-out"
                  type="button"
                  onClick={() => {
                    setEditBanner(true);
                    setIsEditModalOpen(true);
                    setNewBanner(banner);
                    setImage(banner?.background_image);
                  }}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="px-2 text-black hover:text-red-600 duration-300 transition-all ease-in-out"
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setNewBanner(banner);
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
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
          setNewBanner(initialBanner);
          setEditBanner(false);
          setImage(null);

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
                  {editBanner ? 'Edit Banner' : 'Add Banner'}
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewBanner(initialBanner);
                      setEditBanner(false);
                      setImage(null);
                    }}
                  >+</button>
                </div>
              </div>

              <form className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-[400px]" onSubmit={formSubmit}>
                <div
                  className="grid sm:grid-cols-2 grid-cols-1 gap-2"
                >
                  <div
                    className="grid grid-cols-1 gap-2"
                  >
                    {
                      bannerLeft.map((banner, index) => {
                        if(banner.label == ''){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                        else if(banner.label == 'Starting at'){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <div
                                className="search-input-text grid grid-cols-5 relative"
                              >
                                <p className="absolute mt-[9px] ml-1">{price?.value}</p>
                                <input
                                  className="col-span-3 h-full focus:outline-none pl-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  type={banner.type}
                                  placeholder={banner.placeholder}
                                  value={price?.amount}
                                  onChange={e => {
                                    setPrice({
                                      ...price,
                                      amount: e.target.value,
                                    });
                                  }}
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
                                  >ADD</button>
                                </div>
                              </div>

                              {
                                <div
                                  className="flex flex-wrap gap-1 py-2"
                                >
                                  {
                                    newBanner.currency_details.length > 0 ?
                                    newBanner.currency_details.map((price, i) => {
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
                        }
                        else if(banner.label == 'Video URL'){
                          return(
                            <div
                              key={index}
                              className="grid grid-cols-1"
                            >
                              <div
                                className="flex flex-row gap-16"
                              >
                                <p
                                  className="font-inter-16px-400 text-black"
                                >Show Video</p>
                                <div
                                  className="transition-transform duration-1000 ease-in-out my-auto tracking-[-1.1%]"
                                >
                                  <label className="relative cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={newBanner?.show_video_status}
                                      onClick={() => {
                                        setNewBanner({
                                          ...newBanner,
                                          show_video_status: !newBanner.show_video_status
                                        })
                                      }}
                                    />
                                    <div
                                      className="w-[28px] h-[15px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00D13B]">
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div
                                key={index}
                                className="flex flex-col"
                              >
                                <label className="search-input-label">{banner.label}</label>
                                <input
                                  className="search-input-text"
                                  type={banner.type}
                                  placeholder={banner.placeholder}
                                  name={banner.name}
                                  onChange={updateBanner}
                                  defaultValue={newBanner[banner.name]}
                                />
                              </div>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                  <div
                    className="grid grid-cols-1 gap-2"
                  >
                    {
                      bannerRight.map((banner, index) => {
                        if(banner.label == 'Description'){
                          return(
                            <div
                              className="flex flex-col w-full h-[230px]"
                              key={index}
                            >
                              <label
                                className="search-input-label w-full"
                              >Description</label>
                              <div
                                className="search-input-text w-full font-inter font-normal text-custom-black-4 text-base min-h-full py-4 pr-2"
                              >
                                <Editor
                                  apiKey={process.env.TINY_MCE_API}
                                  onChange={updateBanner}
                                  init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: ["lists", "link", "image", "paste"],
                                    toolbar:
                                      "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                                  }}
                                  value={newBanner.description}
                                  onEditorChange={(content) => {
                                    setNewBanner({
                                      ...newBanner,
                                      description: content,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          )
                        }
                        else if(banner.label = "Upload background image"){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <div
                                className="flex flex-col gap-1"
                              >
                                <label
                                  className="font-inter-14px-normal-cGray text-nowrap"
                                >{banner.label}</label>
                                <div
                                  className="flex flex-row gap-6 justify-end"
                                >
                                  <p
                                    className="font-inter-16px-400 text-black"
                                  >Show Banner</p>
                                  <div
                                    className="transition-transform duration-1000 ease-in-out my-auto tracking-[-1.1%]"
                                  >
                                    <label className="relative cursor-pointer">
                                      <input type="checkbox"
                                        className="sr-only peer" defaultChecked={newBanner.show_promotion_status}
                                        onClick={() => {
                                          setNewBanner({
                                            ...newBanner,
                                            show_promotion_status: !newBanner.show_promotion_status
                                          })
                                        }}
                                      />
                                      <div
                                        className="w-[28px] h-[15px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00D13B]">
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-[45px] mt-auto border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                  {
                                    imageFile === null
                                    ? (<React.Fragment>
                                        <svg
                                          aria-hidden="true"
                                          className="w-3 h-3 mt-2 mb-1 text-gray-400"
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
                                      <p className="text-[10px] font-inter text-gray-500">Add photo</p>
                                    </React.Fragment>)
                                    : (<img ref={imageRef} src={imageFile} alt="image" className="h-full object-cover" />)
                                  }
                                </div>
                                <input id="file-upload" type="file" className="hidden" name={banner.name} accept="image/*" onChange={e => {setImage(e.target.files[0])}} />
                              </label>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>

                <div className="flex flex-row justify-center gap-3 pt-4">
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewBanner(initialBanner);
                      setEditBanner(false);
                      setImage(null);
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
      
      <Dialog
        open={isDeleteModalOpen}
        className="relative z-10 focus:outline-none"
        onClose={() => {setIsDeleteModalOpen(false)}}
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
                >Delete Banner</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {setIsDeleteModalOpen(false)}}
                  >+</button>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-3 pt-4">
                <button
                  type="submit"
                  onClick={() => {
                    deleteBanner(newBanner?.id);
                  }}
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setNewBanner(initialBanner);
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

export default Banner;
