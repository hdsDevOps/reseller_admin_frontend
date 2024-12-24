import React, { useEffect, useState } from "react";
import { ChevronDown, Plus, Grid, LayoutGrid, TableProperties } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { RiHeart2Fill, RiCheckboxCircleFill, RiVipCrownFill, RiFlashlightFill } from "react-icons/ri";
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { getPlansAndPricesThunk, deletePlanAndPriceThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface topFeatures {
  text: string;
}

interface amountPrice {
  type: string;
  price: Number;
  discount_price: Number
}

interface amountDetails {
  currency_code: string;
  price: amountPrice[];
}

interface Services {
  gmailBusinessEmail: Boolean,
  customEmailForBusiness: Boolean,
  phisingProtection: Boolean,
  addFreeEmail: Boolean,
  meetVideoConferencing: string,
  meetingLenght: string,
  UsOrInternationPhoneNumber: Boolean,
  digitalWhiteboarding: Boolean,
  noiseCancellation: Boolean,
  meetingRecodingsSave: Boolean,
  twoStepVerification: Boolean,
  groupBasePolicyControl: Boolean,
  advancedProtectionProgram: Boolean,
  endpointManagement: string,
  googleWokspaceMigrateTool: Boolean,
}

interface PlansAndPirces {
  icon_image: string;
  services: Services;
  top_features: topFeatures[];
  trial_period: Number;
  plan_name: string;
  sticker_text: string;
  sticker_exists: Boolean,
  amount_details: amountDetails[];
  created_at: JSON;
  id: string;
  status: Boolean;
}

const initialPrice = [
  {type: 'Monthly', price: 0, discountPrice: 0},
  {type: 'Yearly', price: 0, discountPrice: 0},
  {type: 'Yearly plan with monthly billing', price: 0, discountPrice: 0},
];

const initialSubscription = {
  icon_image: '',
  services: {
    gmail_business_email: false,
    custom_email_for_business: false,
    phising_protection: false,
    add_free_email: false,
    meet_video_conferencing: '',
    meeting_lenght: '',
    us_or_internation_phone_number: false,
    digital_whiteboarding: false,
    noise_cancellation: false,
    meeting_recodings_save: false,
    two_step_verification: false,
    group_base_policy_control: false,
    advanced_protection_program: false,
    endpoint_management: '',
    google_wokspace_migrate_tool: false,
  },
  top_features: [],
  trial_period: 0,
  plan_name: '',
  sticker_text: '',
  sticker_exists: false,
  amount_details: [
    {
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
    },
  ],
};

const PlanPriceSetup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [viewMore, setViewMore] = useState(initialSubscription);
  console.log("viewMore...", viewMore);
  
  const { defaultCurrency, rolePermissionsSlice } = useAppSelector((state) => state.auth);
  // console.log("defaultCurrency....", defaultCurrency);

  const flagList = [
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
    {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
  ];

  const [currencyIndex, setCurrencyIndex] = useState('USD');

  useEffect(() => {
    setCurrencyIndex(defaultCurrency);
  }, [defaultCurrency]);
  
  const [prices, setPrices] = useState(initialPrice);
  const getPrices = (name, data) => {
    const newData = data?.map(item => {
      if(item.currency_code === name){
        return item.price
      }
      else{
        return;
      }
    });
    const sortedData = newData?.filter(item => item !== undefined)
    if(sortedData?.length > 0){
      return sortedData[0];
    } else {
      return [];
    }
  };

  const [plansAndPrices, setPlansAndPrices] = useState([]);
  console.log(plansAndPrices);

  useEffect(() => {
    getPrices(currencyIndex, plansAndPrices[1]?.amount_details);
  }, [plansAndPrices]);

  const fetchPlansAndPrices = async() => {
    try {
      const result = await dispatch(getPlansAndPricesThunk()).unwrap();
      setPlansAndPrices(result.data);
    } catch (error) {
      setPlansAndPrices([]);
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
    fetchPlansAndPrices();
  }, []);

  const formatPrice = () => {
    const data = flagList.map(item => 
      item.name === currencyIndex ? item.logo : undefined
    )
    const sortedData = data?.filter(item => item !== undefined);
    
    if(sortedData?.length > 0){
      return sortedData;
    } else {
      return [];
    }
  };

  const getFlag = () => {
    const data = flagList.map(item => 
      item.name === currencyIndex ? item.flag : undefined
    );
    return data;
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
      {
        plansAndPrices?.length>0 ? plansAndPrices?.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-50 flex flex-col p-[15px] shadow-md rounded-xl"
            cypress-grid-name={`grid${index}`}
          >
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <img src={plan?.icon_image ? plan?.icon_image : ""} alt={plan?.plan_name} className="xl:w-[25px] lg:w-[20px] w-[25px]" />
                <h4 className="font-inter font-medium xl:text-2xl lg:text-base text-2xl text-cBlue3 text-nowrap uppercase">{plan?.plan_name}</h4>
              </div>
              <div className="flex justify-end">
                <p className="flex justify-end items-end text-right text-[10px] text-[#596780] font-inter font-normal">per user/month</p>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-3 align-top">
              <div className="flex flex-row items-start justify-between mb-[10px] gap-x-2">
                <h5 className="font-inter font-medium text-xl leading-6">Amount</h5>
                <div
                  className="flex flex-row px-2 py-[3px] bg-[#EBEBEB] rounded-sm gap-1"
                >
                  <img
                    src={`${
                      getFlag()
                        .filter(item => item !== undefined)
                        .map((item, m) => {
                          if(item != undefined){
                            return item;
                          }
                      })
                    }`}
                    alt={currencyIndex}
                    className="w-auto h-[15px] my-auto"
                  />
                  <select
                    className="bg-transparent font-inter font-normal text-[8px] tracking[-1.1%] text-[#312E3c] focus:outline-none"
                    onChange={e => {setCurrencyIndex(e.target.value)}}
                  >
                    {
                      flagList.map((flag, i) => {
                        return(
                          <option
                            key={i}
                            selected={flag.name == currencyIndex ? true : false}
                            value={flag.name}
                          >{flag.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="space-y-4 grid grid-cols-1">
                {
                  getPrices(currencyIndex, plan?.amount_details)?.map((price, i) =>(
                    <div
                      className="flex justify-between items-center gap-2 pr-2"
                      key={i}
                    >
                      <div className="flex items-center gap-x-2">
                        <span className="text-[#12A833]">
                        <RiCheckboxCircleFill
                          className="text-xl text-[#12A833]"
                        />
                        </span>
                        <span
                          className="font-inter font-normal text-base text-[#0D121F] my-auto"
                        >{price?.type}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <span className="line-through font-inter font-medium text-[15px] text-center text-[#FF7272] my-auto">
                          {
                            formatPrice()?.map((data, k) => (
                              `${data}`
                            ))
                          }
                          {price?.price}
                        </span>
                        <span className="border border-[#E4E4E4] font-inter font-normal text-xs text-[#0D121F] my-auto px-2 py-[2px] min-w-[54px]">
                          <a className="pr-2 text-nowrap">{
                            formatPrice()?.map((data, k) => (
                              `${data}`
                            ))
                          } {price?.discount_price}</a>
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="flex justify-between items-center align-middle mt-3">
                <div className="text-[#FF7272] text-[10px] font-inter font-normal mb-2">Trial period</div>
                <div className="bg-[#D9D9D9] min-w-[79px] border border-[#E4E4E4] rounded-[4px] px-3 py-1 text-sm flex flex-row text-center items-center justify-center gap-1 my-auto">
                  <p
                    className="font-inter font-normal text-xs text-black my-auto"
                  >{plan?.trial_period}</p>
                  <span
                    className="font-inter font-normal text-[8px] text-black my-auto"
                  >days</span>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="font-inter font-medium text-xl text-[#0D121F] mb-4">Top Feature</h5>
                <ul className="gap-5 grid grid-cols-1">
                  {plan?.top_features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#12A833]">
                        <RiCheckboxCircleFill
                          className="text-xl"
                        />
                      </span>
                      <p
                        className="font-inter font-normal text-bsae text-[#0D121F]"
                      >{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                className="flex-1 py-2 px-4 bg-[#12A833] text-white rounded-md"
                onClick={() => {navigate('/edit-plan-and-price-setup', {state: plan})}}
                type="button"
                cypress-name="plan-and-price-edit"
                disabled={!rolePermissionsSlice?.subscription_master?.plan_and_price_setup?.edit ? true : false}
              >
                Edit
              </button>
              <button
                className="flex-1 py-2 px-4 bg-[#E02424] text-white rounded-md"
                onClick={() => {
                  setDeleteId(plan?.id);
                  setIsModalOpen(true);
                }}
                type="button"
                cypress-name="plan-and-price-delete"
                disabled={!rolePermissionsSlice?.subscription_master?.plan_and_price_setup?.delete ? true : false}
              >
                Delete
              </button>
            </div>
          </div>
        )) :
        <div className="bg-gray-50 flex flex-col p-[15px] shadow-md rounded-xl">No data avaibale</div>
      }
    </div>
  );

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
  
  const renderTableView = () => (
    <div className="bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Plan name
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Amount(Monthly)
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Amount(Yearly)
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Amount Yearly Subscription
              <br />
              with monthly billing
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Amount
              <br />
              (Starting at)
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Currency
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Top features
            </th>
            <th className="px-6 py-3 text-xs font-normal text-black opacity-60 text-nowrap w-fit text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-[0.65rem]">
          {
            plansAndPrices?.length>0 ? plansAndPrices?.map((plan, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-center font-inter font-bold text-[10px] text-black opacity-60 uppercase">
                    {
                      plan?.plan_name ? plan?.plan_name : " "
                    }
                  </div>
                </td>
                {
                  getPrices(currencyIndex, plan?.amount_details).length > 0 ?
                  getPrices(currencyIndex, plan?.amount_details)?.map((price, i) => (
                    <td
                      className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60"
                      key={i}
                    >
                      {
                        formatPrice()?.map((data, k) => (
                          `${data} ${price?.discount_price}`
                        ))
                      }
                    </td>
                  )) :
                  Array.from({ length: 3 }).map((_, index) => (
                    <td
                      className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60"
                      key={index}
                    > </td>
                  ))
                }
                {
                  getPrices(currencyIndex, plan?.amount_details).length > 0 ?
                  getPrices(currencyIndex, plan?.amount_details)?.map((price, i) => {
                    if(price?.type === "Monthly"){
                      return (
                        <td
                          className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60"
                          key={i}
                        >
                          {
                            formatPrice()?.map((data, k) => (
                              `${data} ${price?.price}`
                            ))
                          }
                        </td>
                      )
                    }
                  }) :
                  Array.from({ length: 1 }).map((_, index) => (
                    <td
                      className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60"
                      key={index}
                    > </td>
                  ))
                }
                <td className="px-6 py-4 text-center flex flex-row gap-2 font-inter font-bold text-[10px] text-black">
                  <div
                    className="flex flex-row px-2 py-[3px] rounded-sm gap-1"
                  >
                    <img
                      src={`${
                        getFlag()
                          .filter(item => item !== undefined)
                          .map((item, m) => {
                            if(item != undefined){
                              return item;
                            }
                        })
                      }`}
                      alt={currencyIndex}
                      className="w-auto h-[15px] my-auto"
                    />
                    <select
                      className="bg-transparent font-inter font-bold text-[10px] tracking-[-1.1%] text-[#666666] focus:outline-none"
                      onChange={e => {setCurrencyIndex(e.target.value)}}
                    >
                      {
                        flagList.map((flag, i) => {
                          return(
                            <option
                              key={i}
                              selected={flag.name == currencyIndex ? true : false}
                              value={flag.name}
                            >{flag.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 text-center items-center">
                  <div className="flex flex-col gap-1 text-center items-center">
                    {
                      plan?.top_features?.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex text-center items-center gap-1 text-[#12A833] font-inter font-normal text-[6px]">
                          <p className="text-center">{feature}</p>
                        </div>
                      ))
                    }
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2">
                    <button
                      className="p-1 text-black hover:text-[#12A833] text-base"
                      onClick={() => {navigate('/edit-plan-and-price-setup', {state: plan})}}
                      disabled={!rolePermissionsSlice?.subscription_master?.plan_and_price_setup?.edit ? true : false}
                    >
                      <FaPen />
                    </button>
                    <button
                      className="p-1 text-black hover:text-[#E02424] text-base"
                      onClick={() => {
                        setDeleteId(plan?.id);
                        setIsModalOpen(true);
                      }}
                      disabled={!rolePermissionsSlice?.subscription_master?.plan_and_price_setup?.delete ? true : false}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="p-1 text-[#12A833] underline font-inter font-nomral text-[10px]"
                      type="button"
                      onClick={() => {
                        setIsMoreOpen(true);
                        setViewMore(plan);
                      }}
                    >
                      More
                    </button>
                  </div>
                </td>
              </tr>
            )) :
            <tr>
              <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data avaibale</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );

  const handleDeletePlan = async(e) => {
    e.preventDefault();
    try {
      const deletePlan = await dispatch(deletePlanAndPriceThunk({record_id: deleteId})).unwrap();
      setIsModalOpen(false);
      setTimeout(() => {
        toast.success(deletePlan?.message);
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
      else {
        toast.error("Error deleting plan")
      }
    } finally {
      fetchPlansAndPrices();
    }
  }

  return (
    <div className="grid grid-cols-1">
      <ToastContainer />
      <div className="flex min-sm:flex-row max-sm:flex-col justify-between min-sm:items-center mb-6 max-sm:gap-2">
        <h3 className="h3-text">Plan & Price setup</h3>
        <div className="flex gap-4 max-sm:justify-end">
          <button
            className="btn-green w-[139px] flex flex-row items-center gap-2"
            onClick={() => {navigate('/add-plan-and-price-setup')}}
            button-name="add-plan-and-price-btn"
            disabled={!rolePermissionsSlice?.subscription_master?.plan_and_price_setup?.add ? true : false}
          >
            <Plus size={20} />
            Add new
          </button>
          <div className="flex gap-2">
            <button
              className={`p-2 border rounded-md ${
                viewMode === "table"
                  ? "bg-green-50 border-green-500 text-black"
                  : "bg-white text-[#737373]"
              }`}
              onClick={() => setViewMode("table")}
              button-name="change-plan-and-price-view-mode-table"
            >
              <TableProperties className="rotate-180" size={20} />
            </button>
            <button
              className={`p-2 border rounded-md ${
                viewMode === "grid"
                  ? "bg-green-50 border-green-500 text-black"
                  : "bg-white text-[#737373]"
              }`}
              onClick={() => setViewMode("grid")}
              button-name="change-plan-and-price-view-mode-grid"
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1"
      >
        {viewMode === "grid" ? renderGridView() : renderTableView()}
      </div>

      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsModalOpen(false);
          setDeleteId("");
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[400px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="flex justify-between items-center mb-6 text-center">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Delete Plan</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {
                        setIsModalOpen(false);
                        setDeleteId("");
                      }}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid sm:grid-cols-2 grid-cols-1 gap-4"
                  onSubmit={handleDeletePlan}
                >
                  <div className="sm:col-span-2 flex flex-row justify-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                      cypress-name="delete-plan-and-price"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setDeleteId("");
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
        open={isMoreOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsMoreOpen(false);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen mt-20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[800px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6 text-center">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Details of the Plan</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setIsMoreOpen(false);
                    }}
                  >+</button>
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                <table className="min-w-full">
                  <tbody>
                    <tr className="font-inter font-normal text-base text-black">
                      <td className="w-[400px] py-2">Trail Period</td>
                      <td className="w-[20px] py-2">:</td>
                      <td className="py-2 text-[#12A833]">{viewMore?.trial_period} days</td>
                    </tr>
                    <tr className="font-inter font-normal text-base text-black">
                      <td className="w-[400px] py-2">Sticker name</td>
                      <td className="w-[20px] py-2">:</td>
                      <td className="py-2 text-[#12A833]">{viewMore?.sticker_text}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pt-4 font-inter font-medium text-xl text-[#0D121F]" colSpan={3}>Productivity and collaboration</td>
                    </tr>
                    {
                      productivityList.map((productivity, index) => (
                        <tr key={index} className="font-inter font-normal text-base text-black">
                          <td className="w-[400px] py-2">{productivity?.html}</td>
                          <td className="w-[20px] py-2">:</td>
                          <td className="py-2">
                            {
                              productivity?.name === "meet_video_conferencing" ? 
                              (
                                <div className="text-[#12A833]">{viewMore?.services?.meet_video_conferencing}</div>
                              ) :
                              productivity?.name === "meeting_lenght" ? 
                              (
                                <div className="text-[#12A833]">{viewMore?.services?.meeting_lenght}</div>
                              ) :
                              (
                                <input
                                  type={productivity?.type}
                                  className={`h-7 border border-[#828282] text-custom-green accent-[#12A833] text-xs font-inter font-normal tracking-[-1.1%] focus:outline-none rounded-sm pl-2 ${productivity?.type == 'checkbox' ? 'w-7' : 'w-[133px]'}  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                  checked={viewMore?.services[productivity?.name]}
                                />
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                    <tr className="font-inter font-normal text-base text-black">
                      <td className="py-2 pt-4 font-inter font-medium text-xl text-[#0D121F]" colSpan={3}>Security and management</td>
                    </tr>
                    {
                      securityManagementList.map((securityManagement, index) => (
                        <tr key={index} className="font-inter font-normal text-base text-black">
                          <td className="w-[400px] py-2">	
                          {securityManagement?.html}</td>
                          <td className="w-[20px] py-2">:</td>
                          <td className="py-2">
                            {
                              securityManagement?.name === "endpoint_management" ?
                              (
                                <div className="text-[#12A833]">{viewMore?.services?.endpoint_management}</div>
                              ) :
                              (
                                <input
                                  type={securityManagement?.type}
                                  className={`h-7 border border-[#828282] text-custom-green accent-[#12A833] text-xs font-inter font-normal tracking-[-1.1%] focus:outline-none rounded-sm pl-2 ${securityManagement?.type == 'checkbox' ? 'w-7' : 'w-[133px]'}  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                  checked={viewMore?.services[securityManagement?.name]}
                                />
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PlanPriceSetup;
