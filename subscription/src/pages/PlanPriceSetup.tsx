import React, { useState } from "react";
import { ChevronDown, Plus, Grid, LayoutGrid } from "lucide-react";
import LovelyIcon from "../../public/images/lovely.svg";
import Crown from "../../public/images/crown-1.svg";
import FlashIcon from "../../public/images/flash-1.svg";
import TickCircleIcon from "../../public/images/tick-circle.svg";

interface Currency {
  code: string;
  symbol: string;
  position: "prefix" | "suffix";
}

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  title: string;
  subtitle: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyWithMonthlyPrice: number;
  features: PlanFeature[];
  icon: React.ReactNode;
}

const PlanPriceSetup = () => {
  const currencies: Currency[] = [
    { code: "INR", symbol: "₹", position: "prefix" },
    { code: "USD", symbol: "$", position: "prefix" },
    { code: "EUR", symbol: "€", position: "prefix" },
    { code: "GBP", symbol: "£", position: "prefix" },
    { code: "JPY", symbol: "¥", position: "prefix" },
  ];

  const [currencyIndex, setCurrencyIndex] = useState(0);
  const selectedCurrency = currencies[currencyIndex];

  const cycleCurrency = () => {
    setCurrencyIndex((prevIndex) => (prevIndex + 1) % currencies.length);
  };

  const plans: PricingPlan[] = [
    {
      title: "BUSINESS STARTER",
      subtitle: "per user/month",
      monthlyPrice: 3.15,
      yearlyPrice: 36.0,
      yearlyWithMonthlyPrice: 5.0,
      icon: <LovelyIcon />,
      features: [
        { text: "Sync across device" },
        { text: "5 workspace" },
        { text: "Collaborate with 5 user" },
      ],
    },
    {
      title: "BUSINESS STANDARD",
      subtitle: "per user/month",
      monthlyPrice: 8.1,
      yearlyPrice: 72.0,
      yearlyWithMonthlyPrice: 12.0,
      icon: <Crown />,
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
      monthlyPrice: 9.15,
      yearlyPrice: 108.0,
      yearlyWithMonthlyPrice: 18.0,
      icon: <FlashIcon />,
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

  const formatPrice = (price: number) => {
    if (selectedCurrency.position === "prefix") {
      return `${selectedCurrency.symbol}${price}`;
    }
    return `${price}${selectedCurrency.symbol}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Plan & Price setup</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#12A833] text-white rounded-md">
            <Plus size={20} />
            Add new
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white border rounded-md">
              <LayoutGrid size={20} />
            </button>
            <button className="p-2 bg-white border rounded-md">
              <Grid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md">
            <div className="h-[38rem]">
              <div className="mb-6 gap-x-2">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-nowrap">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50">
                    {plan.icon}
                  </div>
                  {plan.title}
                </h2>
                <p className="flex justify-end items-end text-right text-sm text-gray-500">
                  {plan.subtitle}
                </p>
              </div>

              <div className="flex items-start justify-between mb-6 gap-x-2">
                <h5 className="text-xl font-semibold">Amount</h5>
                <button
                  onClick={cycleCurrency}
                  className="flex items-center gap-1 px-3 py-1 text-gray-500 hover:bg-gray-200 bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <span className="text-gray-700">{selectedCurrency.code}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#12A833]">
                      <TickCircleIcon />
                    </span>
                    <span>Monthly</span>
                  </div>
                  <div className="flex gap-x-2">
                    <span className="line-through text-[#FF7272]">
                      {formatPrice(6.99)}
                    </span>
                    <span className="border px-2">
                      {formatPrice(plan.monthlyPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#12A833]">
                      <TickCircleIcon />
                    </span>
                    <span>Yearly</span>
                  </div>
                  <div className="flex gap-x-2">
                    <span className="line-through text-[#FF7272]">
                      {formatPrice(80.0)}
                    </span>
                    <span className="border px-2">
                      {formatPrice(plan.yearlyPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#12A833]">
                      <TickCircleIcon />
                    </span>
                    <span>Yearly plan with monthly billing</span>
                  </div>
                  <span className="border px-2">
                    `{formatPrice(plan.yearlyWithMonthlyPrice)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-[#FF7272] text-sm mb-2">Trial period</div>
                <div className="bg-gray-200 rounded px-3 py-1 text-sm mb-6 inline-block">
                  30 days
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4 text-xl">Top Feature</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#12A833]">
                        {" "}
                        <TickCircleIcon />
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-2 px-4 bg-[#12A833] text-white rounded-md">
                Edit
              </button>
              <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanPriceSetup;
