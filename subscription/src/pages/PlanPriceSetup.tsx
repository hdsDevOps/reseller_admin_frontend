import React, { useState } from "react";
import { ChevronDown, Plus, Grid, LayoutGrid } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { RiHeart2Fill, RiCheckboxCircleFill, RiVipCrownFill, RiFlashlightFill } from "react-icons/ri";
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";

interface Currency {
  code: string;
  symbol: string;
  position: "prefix" | "suffix";
}

interface PlanFeature {
  text: string;
}

interface PriceFeature {
  type: string;
  price: number;
  discountPrice: number;
}

interface CountryPrice {
  country: string;
  price: PriceFeature[];
}

interface PricingPlan {
  title: string;
  subtitle: string;
  prices: CountryPrice[];
  features: PlanFeature[];
  icon: React.ReactNode;
}

const initialPrice = [
  {type: 'Monthly', price: 0, discountPrice: 0},
  {type: 'Yearly', price: 0, discountPrice: 0},
  {type: 'Yearly plan with monthly billing', price: 0, discountPrice: 0},
];

const PlanPriceSetup = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const flagList = [
    {flag: 'images/european-flag.png', name: 'EUR', logo: '€',},
    {flag: 'images/australia-flag.png', name: 'AUS', logo: 'A$',},
    {flag: 'images/us-flag.png', name: 'US', logo: '$',},
    {flag: 'images/nigeria-flag.png', name: 'NIG', logo: 'N₦',},
    {flag: 'images/england-flag.png', name: 'ENG', logo: '£',},
    {flag: 'images/canada-flag.png', name: 'CAN', logo: 'C$',},
    {flag: 'images/india-flag.png', name: 'IND', logo: '₹',},
  ];

  const [currencyIndex, setCurrencyIndex] = useState('IND');
  
  const [prices, setPrices] = useState(initialPrice);
  const getPrices = (name, data) => {
    const newData = data.map(item => {
      if(item.country === name){
        return item.price
      }
      else{
        return;
      }
    });
    return newData;
  }

  const plans: PricingPlan[] = [
    {
      title: "BUSINESS STARTER",
      subtitle: "per user/month",
      prices: [
        {
          country: 'EUR',
          price: [
            {type: 'Monthly', price: 1, discountPrice: 1},
            {type: 'Yearly', price: 1, discountPrice: 1},
            {type: 'Yearly plan with monthly billing', price: 1, discountPrice: 1},
          ],
        },
        {
          country: 'AUS',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'US',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'NIG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'ENG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'CAN',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'IND',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
      ],
      icon: <RiHeart2Fill
          className="xl:text-[25px] lg:text-[20px] text-[25px] text-[#12A833]"
        />,
      features: [
        { text: "Sync across device" },
        { text: "5 workspace" },
        { text: "Collaborate with 5 user" },
      ],
    },
    {
      title: "BUSINESS STANDARD",
      subtitle: "per user/month",
      prices: [
        {
          country: 'EUR',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'AUS',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'US',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'NIG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'ENG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'CAN',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'IND',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
      ],
      icon: <RiVipCrownFill
        className="xl:text-[25px] lg:text-[20px] text-[25px] text-[#12A833]"
      />,
      features: [
        { text: "Everything in Free Plan" },
        { text: "Unlimited workspace" },
        { text: "Collaborative workspace" },
        { text: "Admin tools" },
      ],
    },
    {
      title: "BUSINESS PLUS",
      subtitle: "per user/month",
      prices: [
        {
          country: 'EUR',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'AUS',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'US',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'NIG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'ENG',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'CAN',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
        {
          country: 'IND',
          price: [
            {type: 'Monthly', price: 10, discountPrice: 10},
            {type: 'Yearly', price: 10, discountPrice: 10},
            {type: 'Yearly plan with monthly billing', price: 10, discountPrice: 10},
          ],
        },
      ],
      icon: <RiFlashlightFill
        className="xl:text-[25px] lg:text-[20px] text-[25px] text-[#12A833]"
      />,
      features: [
        { text: "Everything in Pro Plan" },
        { text: "Daily performance reports" },
        { text: "Dedicated assistant" },
        { text: "Artificial intelligence" },
        { text: "Marketing tools & automations" },
        { text: "Advanced security" },
      ],
    },
  ];

  const formatPrice = () => {
    const data = flagList.map(item => 
      item.name === currencyIndex ? item.logo : undefined
    )
    return data;
  };

  const getFlag = () => {
    const data = flagList.map(item => 
      item.name === currencyIndex ? item.flag : undefined
    );
    return data;
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div key={index} className="bg-gray-50 flex flex-col p-[15px] shadow-md rounded-xl">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              {plan.icon}
              <h4 className="font-inter font-medium xl:text-2xl lg:text-base text-2xl text-cBlue3 text-nowrap uppercase">{plan.title}</h4>
            </div>
            <div className="flex justify-end">
              <p className="flex justify-end items-end text-right text-[10px] text-[#596780] font-inter font-normal">
                {plan.subtitle}
              </p>
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
                          console.log(process.env.BASE_URL+item);
                          return process.env.BASE_URL+item;
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
                getPrices(currencyIndex, plan.prices)?.map((price, i) => {
                  if(price != undefined){
                    return(
                      price.map((element, n) => {
                        return(
                          <div
                            className="flex justify-between items-center gap-2 pr-2"
                            key={n}
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-[#12A833]">
                              <RiCheckboxCircleFill
                                className="text-xl text-[#12A833]"
                              />
                              </span>
                              <span
                                className="font-inter font-normal text-base text-[#0D121F] my-auto"
                              >{element.type}</span>
                            </div>
                            <div className="flex gap-x-2">
                              <span className="line-through font-inter font-medium text-[15px] text-center text-[#FF7272] my-auto">
                                {
                                  formatPrice().map((data, k) => {
                                    if(data != undefined){
                                      return(
                                        data+element.price
                                      )
                                    }
                                  })
                                }
                              </span>
                              <span className="border border-[#E4E4E4] font-inter font-normal text-xs text-[#0D121F] my-auto px-2 py-[2px]">
                                <a className="pr-2">{
                                  formatPrice().map((data, k) => {
                                    if(data != undefined){
                                      return(
                                        data+element.discountPrice
                                      )
                                    }
                                  })
                                }</a>
                              </span>
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                })
              }
            </div>

            <div className="flex justify-between items-center align-middle mt-3">
              <div className="text-[#FF7272] text-[10px] font-inter font-normal mb-2">Trial period</div>
              <div className="bg-[#D9D9D9] min-w-[79px] border border-[#E4E4E4] rounded-[4px] px-3 py-1 text-sm flex flex-row text-center items-center justify-center gap-1 my-auto">
                <p
                  className="font-inter font-normal text-xs text-black my-auto"
                >30</p>
                <span
                  className="font-inter font-normal text-[8px] text-black my-auto"
                >days</span>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-inter font-medium text-xl text-[#0D121F] mb-4">Top Feature</h5>
              <ul className="gap-5 grid grid-cols-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#12A833]">
                      <RiCheckboxCircleFill
                        className="text-xl"
                      />
                    </span>
                    <p
                      className="font-inter font-normal text-bsae text-[#0D121F]"
                    >{feature.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex-1 py-2 px-4 bg-[#12A833] text-white rounded-md">
              Edit
            </button>
            <button className="flex-1 py-2 px-4 bg-[#E02424] text-white rounded-md">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

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
              without monthly billing
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
          {plans.map((plan, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-center font-inter font-bold text-[10px] text-black opacity-60"> {plan.title}</div>
              </td>
              {
                getPrices(currencyIndex, plan.prices)?.map((price, i) =>  {
                  if(price != undefined){
                    return(
                      price.map((element, n) => {
                        return(
                          <td
                            className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60"
                            key={n}
                          >
                            {
                              formatPrice().map((data, k) => {
                                if(data != undefined){
                                  return(
                                    data+element.price
                                  )
                                }
                              })
                            }
                          </td>
                        )
                      })
                    )
                  }
                })
              }
              <td className="px-6 py-4 text-center font-inter font-bold text-[10px] text-black opacity-60">
                {
                  formatPrice().map((data, k) => {
                    if(data != undefined){
                      return(
                        data+6.99
                      )
                    }
                  })
                }
              </td>
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
                            console.log(process.env.BASE_URL+item);
                            return process.env.BASE_URL+item;
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
                  {plan.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex text-center items-center gap-1 text-[#12A833] font-inter font-normal text-[6px]">
                      <p className="text-center">{feature.text}</p>
                    </div>
                  ))}
                  
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex gap-2">
                  <button className="p-1 text-black hover:text-[#12A833] text-base">
                    <FaPen />
                  </button>
                  <button className="p-1 text-black hover:text-[#E02424] text-base">
                    <FaTrash />
                  </button>
                  <button className="p-1 text-[#12A833] underline font-inter font-nomral text-[10px]">
                    More
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="grid grid-cols-1">
      <div className="flex min-sm:flex-row max-sm:flex-col justify-between min-sm:items-center mb-6 max-sm:gap-2">
        <h3 className="h3-text">Plan & Price setup</h3>
        <div className="flex gap-4 max-sm:justify-end">
          <button className="btn-green w-[139px] flex flex-row items-center gap-2"
            onClick={() => {navigate('/add-plan-and-price-setup')}}
          >
            <Plus size={20} />
            Add new
          </button>
          <div className="flex gap-2">
            <button
              className={`p-2 border rounded-md ${
                viewMode === "table"
                  ? "bg-green-50 border-green-500"
                  : "bg-white"
              }`}
              onClick={() => setViewMode("table")}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              className={`p-2 border rounded-md ${
                viewMode === "grid"
                  ? "bg-green-50 border-green-500"
                  : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1"
      >
        {viewMode === "grid" ? renderGridView() : renderTableView()}
      </div>
    </div>
  );
};

export default PlanPriceSetup;
