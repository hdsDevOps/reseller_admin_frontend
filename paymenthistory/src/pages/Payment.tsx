import React, { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import '../styles/styles.css';
import { getPaymentMethodsListThunk, updatePaymentMethodStatusThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentMethod: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [paymentMethods, setPaymentMethods] = useState([]);
  console.log(paymentMethods);
  
  const getPaymentMethodsList = async() => {
    try {
      const result = await dispatch(getPaymentMethodsListThunk()).unwrap();
      setPaymentMethods(result.data);
    } catch (error) {
      setPaymentMethods([]);
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
    getPaymentMethodsList()
  }, []);

  const updateStatus = async(value, index) => {
    if(value === paymentMethods[index].status){
      //
    }
    else{
      try {
        const statusResult = await dispatch(updatePaymentMethodStatusThunk({
          record_id: paymentMethods[index].id,
          status: value,
        })).unwrap();
        setTimeout(() => {
          toast.success(statusResult.message);
        }, 1000);
      } catch (error) {
        toast.error(`Error updating ${paymentMethods[index].method_name} status`);
      } finally {
        getPaymentMethodsList();
      }
    }
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
                  <select
                    className={`${item.status == 'INACTIVE' ? 'payment-select-2' : 'payment-select'}`}
                    onChange={(e) => {
                      updateStatus(e.target.value, index)
                    }}
                    cypress-name={`payment-status-${index}`}
                    disabled={!rolePermissionsSlice?.payment_method?.action ? true : false}
                  >
                    <option selected={item.status == 'ACTIVE' ? false : item.status == 'INACTIVE' ? false : true} hidden>Action</option>
                    <option selected={item.status == 'ACTIVE' ? true:  false} className="payment-option" value='ACTIVE'>Active</option>
                    <option selected={item.status == 'INACTIVE' ? true:  false} className="payment-option" value='INACTIVE'>Inactive</option>
                  </select>
                </div>

                <img src={item.method_image} alt='image' className="w-[150px] h-[71px] object-cover mx-auto mt-4" />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PaymentMethod;
