import { ChevronRight, MoveLeft, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { RiAddCircleFill, RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { editPlanAndPriceThunk, uploadImageThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from 'store/hooks';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AmountBoxProps {
  item: object;
  number: number;
}

function EditPlanPriceSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const flagList = [
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
  ];
  const [subscription, setSubscription] = useState(location.state);
  // console.log(subscription);
  const [amountCount, setAMountCount] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [iconImage, setIconImage] = useState(location.state?.icon_image || null);
  // console.log("image...", iconImage);
  const [localPrice, setLocalPrice] = useState(subscription?.amount_details);
  // console.log("localPrice...", localPrice);
  const [featureTag, setFeatureTag] = useState('');
  
  useEffect(() => {
    setLocalPrice(subscription?.amount_details);
  }, [subscription]);
  
  const productivityList = [
    {logo: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=78d49456-c44c-4ff4-bb46-163e07e0a461', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'><b>Gmail</b> Business email</p>, type: 'checkbox', name: 'gmail_business_email', },
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Custom email for your business</p>, type: 'checkbox', name: 'custom_email_for_business',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Phishing and spam protection that blocks more than 99.9% of attacks</p>, type: 'checkbox', name: 'phising_protection',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Ad-free email experience</p>, type: 'checkbox', name: 'add_free_email',},
    {logo: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=37fae9c9-b466-4311-a03b-6019c3e4e29a', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'><b>Meet</b> Video and voice conferencing</p>, type: 'text', name: 'meet_video_conferencing',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Meeting length (maximum)</p>, type: 'text', name: 'meeting_lenght',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>US or international dial-in phone numbers</p>, type: 'checkbox', name: 'us_or_internation_phone_number',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Digital whiteboarding</p>, type: 'checkbox', name: 'digital_whiteboarding',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Noise cancellation</p>, type: 'checkbox', name: 'noise_cancellation',},
    {logo: '', html: <p className='font-inter font-normal text0base tracking-[-1.1%]'>Meeting recordings saved to Google Drive</p>, type: 'checkbox', name: 'meeting_recodings_save',},
  ];

  const securityManagementList = [
    { html: <p>2-Step Verification</p>, type: 'checkbox', name: 'two_step_verification',},
    { html: <p>Group-based policy controls</p>, type: 'checkbox', name: 'group_base_policy_control',},
    { html: <p>Advanced Protection Program</p>, type: 'checkbox', name: 'advanced_protection_program',},
    { html: <p>Endpoint management</p>, type: 'text', name: 'endpoint_management',},
    { html: <p>Google Workspace Migrate tool</p>, type: 'checkbox', name: 'google_wokspace_migrate_tool',},
  ];
  
  useEffect(() => {
    if(subscription?.amount_details.length > 1){
      setAMountCount(subscription?.amount_details.length);
    }
    else{
      setAMountCount(1);
    }
  }, [subscription?.amount_details]);

  const handleKeyDownFeature = e => {
    if(e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if(!newTag){
        //
      }
      if(newTag.length<3){
        toast.warning("Feature must be at least 3 characters long!");
      }
      if(newTag && !subscription?.top_features.includes(newTag) && newTag.length>=3) {
        setSubscription({
          ...subscription,
          top_features: [
            ...subscription?.top_features,
            newTag
          ],
        });
        e.target.value = "";
      }
      if(subscription?.top_features.includes(newTag)) {
        toast.warning("Duplicate features are not allowed!");
      }
    }
  };

  const handleDeleteFeature = (value) => {
    const newFeatures = subscription?.top_features.filter(item => item !== value);
    setSubscription({
      ...subscription,
      top_features: newFeatures,
    });
  };

  const handleSubscriptionChange = e => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value,
    });
  };

  const getFlag = (name) => {
    const data = flagList?.map(item => 
      item.name === name ? item.flag : undefined
    );
    const newData = data?.filter(item => item !== undefined);
    return newData;
  }

  const updateMap = (e, number) => {
    let amounts = subscription?.amount_details;
    const newAmount = amounts.map((item, index) => 
      index === number ? { ...item, currency_code: e.target.value } : item
    )
    setSubscription({
      ...subscription,
      amount_details: newAmount
    })
  }

  const addAmountCount = () => {
    const amounts = subscription?.amount_details;
    const newAmounts = [...amounts, {
      currency_code: 'USD',
      price: [
        {
          type: 'Monthly',
          price: null,
          discount_price: null,
        },
        {
          type: 'Yearly',
          price: null,
          discount_price: null,
        },
        {
          type: 'Yearly Subscription with monthly billing',
          price: null,
          discount_price: null,
        },
      ],
    },]
    setAMountCount(amountCount+1);
    setSubscription({
      ...subscription,
      amount_details: newAmounts
    })
  };

  const removeAmountCount = (number) => {
    const amounts = subscription.amount_details;
    const newAmounts = amounts.filter((_, index) => index !== number);
    setAMountCount(amountCount-1);
    setSubscription({
      ...subscription,
      amount_details: newAmounts
    })
  };

  const handleAmountChange = (e, number, parent) => {
    const value = e.target.value;
    const field = e.target.name;
    const local = localPrice[number]?.price[parent]
    local[field] = value;
  };

  const handleServicesChange = e => {
    const field = e.target.name;
    const value = subscription?.services[field];
    setSubscription({
      ...subscription,
      services: {
        ...subscription?.services,
        [field]: !value,
      },
    });
  };

  const handleServicesChange2 = e => {
    setSubscription({
      ...subscription,
      services: {
        ...subscription?.services,
        [e.target.name]: e.target.value,
      },
    });
  };

  const AmountBox = ({item, number}: AmountBoxProps) => {
    if(number === 0){
      return (
        <div
          className='flex flex-col w-full'
        >
          <div
            className='float-right ml-auto z-10'
          >
            <RiAddCircleFill
              className='text-[#08AC22] text-[25px] mr-[-10px]'
              onClick={() => {
                addAmountCount()
              }}
            />
          </div>
          <div
            className='rounded-lg border border-custom-white w-full mt-[-15px] p-4 grid grid-cols-1'
          >
            <div
              className='flex flex-row'
            >
              <img
                src={`${
                  getFlag(item?.currency_code)[0]
                  })
                }`}
                alt={item?.currency_code}
                className='w-auto h-[25px]'
              />
              <select
                onChange={e => {updateMap(e, number)}}
                className='font-inter font-normal text-[10px] tracking-[-1.1%] text-[#312E3C] focus:outline-none'
              >
                {
                  flagList.map((flag, n) => {
                    return(
                      <option selected={ item?.currency_code === flag.name ? true : false } key={n}>{flag.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div
              className='mt-2 overflow-x-auto'
            >
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[80px] px-[15px] py-2">
                      &nbsp;
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[260px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Monthly</span>
                      </div>
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[260px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Yearly</span>
                      </div>
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[400px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Yearly Subscription with monthly billing</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="min-w-[80px] text-center text-nowrap px-[15px] py-2 h-[45px]">Base Price</td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='price'
                        defaultValue={item?.price[0].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 0)}}
                        // onBlur={() => {setSubscription({
                        //   ...subscription,
                        //   amount_details: localPrice
                        // })}}
                        required
                      />
                    </td>
                    <td className="w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='price'
                        defaultValue={item?.price[1].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 1)}}
                        // onBlur={() => {setSubscription({
                        //   ...subscription,
                        //   amount_details: localPrice
                        // })}}
                        required
                      />
                    </td>
                    <td className="min-w-[400px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='price'
                        defaultValue={item?.price[2].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 2)}}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-[80px] text-center text-nowrap px-[15px] py-2 h-[45px]">Final Price</td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[0].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 0)}}
                        required
                      />
                    </td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[1].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 1)}}
                        required
                      />
                    </td>
                    <td className="min-w-[400px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[2].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 2)}}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
    else{
      return (
        <div
          className='flex flex-col w-full'
        >
          <div
            className='float-right ml-auto z-10'
          >
            <RiCloseCircleFill
              className='text-[#FF3B3B] text-[25px] mr-[-10px]'
              onClick={() => {
                removeAmountCount(number)
              }}
            />
          </div>
          <div
            className='rounded-lg border border-custom-white w-full mt-[-15px] p-4 grid grid-cols-1'
          >
            <div
              className='flex flex-row'
            >
              <img
                src={`${
                  getFlag(item?.currency_code)[0]
                }`}
                alt={item?.currency_code}
                className='w-auto h-[25px]'
              />
              <select
                onChange={e => {updateMap(e, number)}}
                className='font-inter font-normal text-[10px] tracking-[-1.1%] text-[#312E3C] focus:outline-none'
              >
                {
                  flagList.map((flag, n) => {
                    return(
                      <option selected={ item?.currency_code === flag.name ? true : false }>{flag.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div
              className='mt-2 overflow-x-auto'
            >
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[80px] px-[15px] py-2">
                      &nbsp;
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[260px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Monthly</span>
                      </div>
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[260px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Yearly</span>
                      </div>
                    </th>
                    <th className="text-base font-inter font-normal text-custom-black-4 whitespace-nowrap min-w-[400px] px-[15px] py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <RiCheckboxCircleFill className="text-xl text-[#12A833]" />
                        <span>Yearly Subscription with monthly billing</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="min-w-[80px] text-center text-nowrap px-[15px] py-2 h-[45px]">Base Price</td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='price'
                        defaultValue={item?.price[0].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 0)}}
                        required
                      />
                    </td>
                    <td className="w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='price'
                        defaultValue={item?.price[1].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 1)}}
                        required
                      />
                    </td>
                    <td className="min-w-[400px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='price'
                        defaultValue={item?.price[2].price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 2)}}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-[80px] text-center text-nowrap px-[15px] py-2 h-[45px]">Final Price</td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[0].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 0)}}
                        required
                      />
                    </td>
                    <td className="min-w-[260px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[1].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 1)}}
                        required
                      />
                    </td>
                    <td className="min-w-[400px] text-center px-[15px] py-2">
                      <input
                        className='min-w-full border border-custom-white rounded-md h-[45px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1'
                        type='number'
                        name='discount_price'
                        defaultValue={item?.price[2].discount_price || ''}
                        onChange={(e) => {handleAmountChange(e, number, 2)}}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    setIconImage(event.dataTransfer.files[0]);
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubscription({
      ...subscription,
      amount_details: localPrice
    });
    if(subscription?.plan_name.trim() === '') {
      toast.error("Plan name cannot be empty");
    } else {
      if(iconImage !== null && typeof iconImage !== "string") {
        try {
          const imageUpload = await dispatch(uploadImageThunk({image: iconImage})).unwrap();
          if(imageUpload?.message === "File uploaded successfully!") {
            try {
              const addPlan = await dispatch(editPlanAndPriceThunk({
                icon_image: imageUpload?.url,
                services: subscription?.services,
                top_features: subscription?.top_features,
                trial_period: subscription?.trial_period,
                plan_name: subscription?.plan_name,
                sticker_text: subscription?.sticker_text,
                sticker_exists: subscription?.sticker_exists,
                amount_details: subscription?.amount_details,
                record_id: subscription?.id
              })).unwrap();
              setTimeout(() => {
                toast.success(addPlan?.message)
              }, 1000);
            } catch (error) {
              toast.error("Error adding plan.");
              console.log(error)
            }
          }
        } catch (error) {
          if(error?.message == "Request failed with status code 401") {
            try {
              const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
              navigate('/login');
            } catch (error) {
              //
            }
          }
          else{
            toast.error("Please upload a valid image.");
          }
        }
      }
      else{
        try {
          const addPlan = await dispatch(editPlanAndPriceThunk({
            icon_image: subscription?.icon_image,
            services: subscription?.services,
            top_features: subscription?.top_features,
            trial_period: subscription?.trial_period,
            plan_name: subscription?.plan_name,
            sticker_text: subscription?.sticker_text,
            sticker_exists: subscription?.sticker_exists,
            amount_details: subscription?.amount_details,
            record_id: subscription?.id
          })).unwrap();
          setTimeout(() => {
            toast.success(addPlan?.message)
          }, 1000);
        } catch (error) {
          if(error?.message == "Request failed with status code 401") {
            try {
              const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
              navigate('/login');
            } catch (error) {
              //
            }
          }
          else{
            toast.error("Error editing plan.");
          }
          console.log(error)
        }
      }
    }
  }

  return (
    <form
      className='grid grid-cols-1'
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <div
        className='flex flex-row'
      >
        <a
          className='cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
        >
          <MoveLeft
            className='h-[20px] text-black mt-[7px]'
          />
        </a>
        <h3
          className='h3-text ml-[10px]'
        >Edit Subscription</h3>
      </div>

      <div
        className='flex min-sm:flex-row max-sm:flex-col mt-5 h-[22px] max-sm:mb-6 max-sm:ml-5'
      >
        <p
          className='page-indicator-1'
        >Subscription master</p>
        <ChevronRight
          className='page-indicator-arrow'
        />
        <p
          className='page-indicator-2'
        >Edit subscription</p>
      </div>

      <div
        className='grid sm:grid-cols-2 grid-cols-1 gap-2 border border-custom-white rounded-lg w-full px-8 py-4 sm:mt-3 mt-6'
      >
        <div
          className='flex flex-col mt-auto mb-[15px]'
        >
          <label
            className='search-input-label'
          >Plan Name</label>
          <input
            className='search-input-text'
            placeholder='Enter Plan Name'
            type='text'
            name="plan_name"
            onChange={handleSubscriptionChange}
            required
            defaultValue={subscription?.plan_name}
          />
        </div>
        <div
          className='flex flex-col justify-center text-center items-center'
        >
          <label
            className='font-inter font-medium text-xl text-custom-black-4 mb-1'
          >Upload Icon image</label>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-[190px] h-[69px] mt-auto border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {
              typeof iconImage === "string" ?
              <img src={iconImage} className='h-full object-cover' /> :
              (
                <div className="flex flex-col items-center justify-center">
                  <Upload
                    className='text-xl text-custom-green'
                  />
                  <p className="font-mulish font-semibold text-xs text-custom-black-8">
                    Drag & drop files or <span className='text-custom-green underline'>Browse</span>
                  </p>
                </div>
              )
               
            }
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={e => {setIconImage(e.target.files[0])}}
              name="icon_image"
              required={iconImage === null ? true : false}
            />
          </label>
          <p
            className='font-inter font-normal text-[7px] text-center text-[#A6A6A6] mt-1'
          >Dimension should be 32x32 [png]</p>
        </div>
      </div>

      <div
        className='flex flex-col my-2 gap-2'
      >
        <h5
          className='font-inter font-medium text-xl text-custom-black-4'
        >Amount</h5>

        {
          localPrice?.map((amount, index) => {
            return(
              <AmountBox
                item={amount}
                number={index}
                key={index}
              />
            )
          })
        }
      </div>

      <div
        className='grid sm:grid-cols-2 grid-cols-1 gap-2 my-3 smLpx-0 px-2'
      >
        <div className='flex flex-row w-full mt-auto'>
          <div className='flex flex-col w-full'>
            <label className='search-input-label'>Trail Period</label>
            <input
              type='number'
              className='search-input-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              placeholder='Select Trial Period'
              required
              name='trial_period'
              onChange={handleSubscriptionChange}
              defaultValue={subscription?.trial_period}
            />
          </div>
          <p className='font-inter font-normal text-base text-[#A6A6A6] w-10 my-auto px-1'>Days</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row align-middle'>
            <input
              type='checkbox'
              className='border border-[#828282] text-custom-green accent-[#12A833] focus:outline-none rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none my-auto'
              onChange={() => {
                setSubscription({
                  ...subscription,
                  sticker_exists: !subscription?.sticker_exists
                })
              }}
              name='sticker_exists'
              defaultChecked={subscription?.sticker_exists}
            />
            <label className='my-auto -mt-[1px] ml-1 font-inter font-medium text-base text-custom-black-4'>Sticker exist</label>
          </div>
          <div>
            <input
              type='text'
              placeholder='Sticker name'
              className='h-[45px] border border-custom-white rounded-[10px] w-full pl-2'
              onChange={handleSubscriptionChange}
              name='sticker_text'
              defaultValue={subscription?.sticker_text}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:px-0 px-2'>
        <div className='flex flex-wrap gap-2 my-1'>
          {
            subscription?.top_features && Object.entries(subscription?.top_features)?.map(([key, value]) => {
              return(
                <div className='flex flex-row gap-12 bg-[#C7E5CD] px-2 w-fit rounded-xl' key={key}>
                  <a className='font-inter font-normal text-[10px] text-[#545454] pt-[6px]'>{value}</a>
                  <button className='my-auto'>
                    <X className='text-[10px] text-black' onClick={() => {handleDeleteFeature(value)}} />
                  </button>
                </div>
              )
            })
          }
        </div>

        <div
          className='w-full max-w-[422px]'
        >
          <input
            className='font-inter font-normal text-base text-[#666666] border border-custom-white rounded-md h-[46px] w-full pl-2'
            type='text'
            placeholder='Enter top feature'
            onKeyDown={handleKeyDownFeature}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-2 my-2 mt-4 sm:px-0 px-2'>
        <h6 className='font-inter font-medium text-xl text-[#0D121F]'>Productivity and collaboration</h6>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <tbody>
              {
                productivityList?.map((item, index) => {
                  return(
                    <tr key={index} className='w-full'>
                      <td className='w-[100px] min-w-[100px] text-center items-center py-5'>{item.logo != '' ? 
                        <img className={`mx-auto ${index == 0 ? 'min-w-7 max-w-7' : index == 4 ? 'min-w-14 max-w-14' : ''}`} src={item.logo} alt='logo' />
                      : ''}</td>
                      <td className='w-[340px] min-w-[300px] text-left items-center py-5'>
                        {item.html}
                      </td>
                      <td className='w-[220px] text-left items-start py-5'>
                        <input
                          type={item.type}
                          className={`h-7 border border-[#828282] text-custom-green accent-[#12A833] text-xs font-inter font-normal tracking-[-1.1%] focus:outline-none rounded-sm pl-2 ${item.type == 'checkbox' ? 'w-7' : 'w-[133px]'}  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          onChange={item.type === 'checkbox' ? handleServicesChange : handleServicesChange2}
                          name={item.name}
                          defaultValue={subscription?.services[item.name] || null}
                          defaultChecked={subscription?.services[item.name] || false}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-2 my-2 mt-4 sm:px-0 px-2'>
        <h6 className='font-inter font-medium text-xl text-[#0D121F]'>Security and management</h6>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <tbody>
              {
                securityManagementList?.map((item, index) => {
                  return(
                    <tr key={index} className='w-full'>
                      <td className='w-[100px] min-w-[100px] text-center items-center py-5'></td>
                      <td className='w-[340px] min-w-[300px] text-left items-center py-5'>
                        {item.html}
                      </td>
                      <td className='w-[220px] text-left items-start py-5'>
                        <input
                          type={item.type}
                          className={`h-7 border border-[#828282] text-custom-green accent-[#12A833] text-xs font-inter font-normal tracking-[-1.1%] focus:outline-none rounded-sm pl-2 ${item.type == 'checkbox' ? 'w-7' : 'w-[133px]'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          onChange={item.type === 'checkbox' ? handleServicesChange : handleServicesChange2}
                          name={item.name}
                          defaultValue={subscription?.services[item.name] || null}
                          defaultChecked={subscription?.services[item.name] || false}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className='flex flex-row min-sm:justify-start max-sm:justify-center gap-4'>
        <button
          className='btn-green'
          type='submit'
          button-name="add-plan-and-price-btn"
        >Save</button>
        <button
          className='btn-red'
          type='button'
          onClick={() => {
            setSubscription(initialSubscription);
          }}
        >Cancel</button>
      </div>
    </form>
  )
};

export default EditPlanPriceSetup;