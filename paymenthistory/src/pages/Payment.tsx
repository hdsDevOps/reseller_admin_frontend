import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import '../styles/styles.css';

const PaymentMethod = () => {
  const paymentMethods = [
    { image: '/images/stripe.png' },
    { image: '/images/paystack.png' },
  ];

  return (
    <div className="grid">
      <h3 className="h3-text">Payment method</h3>

      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-3 min-[1500px]:grid-cols-4 min-[1900px]:grid-cols-5 mt-5">
        {
          paymentMethods && paymentMethods.map((item, index) => {
            return(
              <div
                className="min-[375px]:w-[285px] max-[375px]:w-[220px] h-[200px] border border-custom-gray mx-auto mt-5"
                key={index}
              >
                <div
                  className="select-div"
                >
                  <select className="payment-select">
                    <option selected hidden>Action</option>
                    <option className="payment-option">Active</option>
                    <option className="payment-option">Inactive</option>
                  </select>
                </div>

                <img src={`${process.env.BASE_URL}${item.image}`} alt='image' className="w-[150px] h-[71px] object-cover mx-auto mt-4" />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PaymentMethod;
