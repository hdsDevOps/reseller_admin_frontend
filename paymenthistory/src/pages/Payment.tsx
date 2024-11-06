import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const PaymentMethod = () => {
  const [, setStripeStatus] = useState<string>("active");
  const [, setPaystackStatus] = useState<string>("active");
  const [stripeDropdownVisible, setStripeDropdownVisible] = useState<boolean>(false);
  const [paystackDropdownVisible, setPaystackDropdownVisible] = useState<boolean>(false);

  const toggleStripeDropdown = () => {
    setStripeDropdownVisible((prev) => !prev);
  };

  const togglePaystackDropdown = () => {
    setPaystackDropdownVisible((prev) => !prev);
  };

  const changeStripeStatus = (newStatus: string) => {
    setStripeStatus(newStatus);
    setStripeDropdownVisible(false);
  };

  const changePaystackStatus = (newStatus: string) => {
    setPaystackStatus(newStatus);
    setPaystackDropdownVisible(false);
  };

  return (
    <div>
      <h1 className="text-black text-3xl font-medium">Payment method</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl w-full">
        <div
          className="flex flex-col items-center justify-center p-2"
          style={{ width: "20rem", height: "12rem", border: "1px solid gray", position: "relative" }}
        >
          <div className="flex items-center justify-between w-full my-2 px-2">
            <div className="w-full flex justify-end">
              <div
                onClick={toggleStripeDropdown}
                className="flex items-center text-green-500 cursor-pointer gap-2"
              >
                <p>Action</p>
                <IoChevronDownOutline size={24} />
              </div>
            </div>
            {stripeDropdownVisible && (
              <div className="absolute mt-2 bg-white border border-gray-300 shadow-md flex flex-col top-8 right-0">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => changeStripeStatus("active")}
                >
                  Active
                </div>
                <div className="border-t border-gray-300"></div>
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => changeStripeStatus("inactive")}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
          <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
            <img src="/images/stripe.png" alt="stripe" className="w-full h-full" />
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2"
          style={{ width: "20rem", height: "12rem", border: "1px solid gray", position: "relative" }}
        >
          <div className="flex items-center justify-between w-full my-2 px-2">
            <div className="w-full flex justify-end text-green-500">
              
              <div
                onClick={togglePaystackDropdown}
                className="flex items-center cursor-pointer gap-2"
              >
                <p>Action</p>
                <IoChevronDownOutline size={24} />
              </div>
            </div>
            {paystackDropdownVisible && (
              <div className="absolute mt-2 bg-white border border-gray-300 shadow-md flex flex-col top-8 right-0">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => changePaystackStatus("active")}
                >
                  Active
                </div>
                <div className="border-t border-gray-300"></div>
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => changePaystackStatus("inactive")}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
          <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
            <img src="/images/paystack.png" alt="paystack" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
