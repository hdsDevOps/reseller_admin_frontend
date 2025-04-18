import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import '../styles/styles.css';

const PaymentMethod: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58', status: 'Inactive' },
    { image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3', status: 'Active' },
  ]);
  console.log(paymentMethods);
  

  const updateStatus = (value, index) => {
    const data = paymentMethods;
    data[index].status = value;
    // console.log(value);
    // console.log(data);
    setPaymentMethods(data);
  };

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
                  <select className={`${item.status == 'Inactive' ? 'payment-select-2' : 'payment-select'}`} onChange={(e) => {
                    updateStatus(e.target.value, index)
                  }}>
                    <option selected={item.status == 'Active' ? false : item.status == 'Inactive' ? false : true} hidden>Action</option>
                    <option selected={item.status == 'Active' ? true:  false} className="payment-option" value='Active'>Active</option>
                    <option selected={item.status == 'Inactive' ? true:  false} className="payment-option" value='Inactive'>Inactive</option>
                  </select>
                </div>

                <img src={item.image} alt='image' className="w-[150px] h-[71px] object-cover mx-auto mt-4" />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PaymentMethod;
