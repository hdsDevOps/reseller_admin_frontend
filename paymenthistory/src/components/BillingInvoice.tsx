import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { getBase64ImageThunk, getCustomerListThunk, getCustomerSubscriptionDataThunk, getPaymentMethodsListThunk } from 'store/user.thunk';

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899";
// const logo = "";
const stripeImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
const paystackImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

const BillingInvoice: React.FC = ({pdfRef, data, paymentMethods}) => {
  const dispatch = useAppDispatch();

  const [base64ImageLogo, setBase64ImageLogo] = useState("");
  // console.log("base64ImageLogo...", base64ImageLogo);
  const [paymentMethodImage, setPaymentMethodImage] = useState("");

  const [customer, setCustomer] = useState<object|null>(null);
  console.log("customer....", customer);

  
  const [subscriptionData, setSubscriptionData] = useState<object|null>(null);
  console.log("subscriptionData...", subscriptionData);
  
  const getCustomerSubscriptionData = async () => {
    try {
      const result = await dispatch(getCustomerSubscriptionDataThunk({subscription_id: data?.subscription_id})).unwrap();
      setSubscriptionData(result?.subscriptions[0]);
    } catch (error) {
      setSubscriptionData(null);
    }
  };

  useEffect(() => {
    if(data !== null) {
      getCustomerSubscriptionData();
    }
  }, [data]);

  const getCustomerLists = async () => {
    try {
      const result = await dispatch(getCustomerListThunk({
        search_data: "",
        country: "",
        state_name: "",
        authentication: "",
        license_usage: "",
        subscription_date: "",
        renewal_date: "",
        domain: "",
        sortdata: {
          sort_text: "",
          order: ""
        }
      })).unwrap();
      const totalArray = result?.data;
      if(totalArray?.length > 0) {
        const foundData = totalArray?.find(item => item?.id === data?.user_id);
        console.log("found data...", foundData);
        setCustomer(foundData);
      } else {
        setCustomer(null);
      }
    } catch (error) {
      setCustomer(null);
    }
  };

  useEffect(() => {
    if(data !== null || data !== "" || data !== undefined) {
      getCustomerLists();
    }
  }, [data]);

  const getBase64ImageLogo = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: logo})).unwrap();
      setBase64ImageLogo(result?.base64);
    } catch (error) {
      setBase64ImageLogo("");
    }
  };

  useEffect(() => {
    getBase64ImageLogo();
  }, []);

  const getBase64ImagePaymentMethod = async(url:string) => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: url})).unwrap();
      setPaymentMethodImage(result?.base64);
    } catch (error) {
      setPaymentMethodImage("");
    }
  };

  useEffect(() => {
    if(data !== null && paymentMethods?.length > 0) {
      const paymentGatewayImage = paymentMethods?.find(item => item?.method_name?.toLowerCase() === data?.payment_method?.toLowerCase())?.method_image;
      getBase64ImagePaymentMethod(paymentGatewayImage);
    }
  }, [paymentMethods, data]);

  console.log("billing invoice data...", data);

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = (parseInt(seconds) * 1000) + (parseInt(nanoseconds) / 1e6);

    const date = new Date(miliseconds);

    if(date == "Invalid Date") {
      return {top: "Invalid Date", bottom: ""};
    } else {
      return {top: format(date, "MMM dd, yyyy"), bottom: format(date, "h:mm:ss a")}
    }
  };
  return (
    <div
      className='max-w-[700px]'
      ref={pdfRef}
    >
      <div
        className='bg-white px-1 w-full mx-auto'
      >
        <div
          className='relative h-40 bg-white overflow-hidden'
        >
          <div
            style={{position: 'absolute', top: 0, width: "100%", height: "100%", backgroundColor: '#12A833', zIndex: '10', transform: 'skewY(-11deg)', transformOrigin: 'top left'}}
          ></div>
          <div
            className='absolute top-0 right-0 w-[200px] h-[80%] bg-[#f4f4f6] opacity-50 transform -skew-y-[17deg] origin-top-left z-10'
          ></div>
          {/* <div
            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[300px]'
          ></div>
          <div
            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[390px]'
          ></div> */}
          <div className='absolute top-2 right-2 flex flex-row z-20 items-start'>
            <div className='flex flex-col items-start'>
              <p className='mr-1 text-white font-normal font-inter text-sm'>Date:</p>
            </div>
            <div className='flex flex-col items-start'>
              <p className='mr-1 text-white font-normal font-inter text-sm p-0'>{formatDate(data?.created_at?._seconds, data?.created_at?._nanoseconds)?.top}</p>
              <p className='mr-1 text-white font-normal font-inter text-sm p-0 mt-0'>{formatDate(data?.created_at?._seconds, data?.created_at?._nanoseconds)?.bottom}</p>
            </div>
          </div>
          <div
            className='absolute bottom-7 left-1/2 transform -translate-x-1/2 z-30'
          >
            <div
              className='w-[60px] h-[60px] bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg'
            >
              <img
                src={base64ImageLogo}
                className='w-[51px] rounded-full object-cover'
              />
            </div>
          </div>
        </div>

        <div
          className='text-center py-1 border-b border-black'
        >
          <h3 className='font-inter text-[black] text-lg'>Receipt from Hordanso LLC</h3>
          <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #{data?.invoice}</p>
        </div>

        <div
          className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
        >
          <table className="w-full min-w-[400px]">
            <tbody>
              <tr>
                <td className="font-inter font-normal text-sm items-start text-start content-start">Inovice To</td>
                <td className="flex flex-col font-inter font-normal text-sm text-black content-start">
                  <p>{data?.customer_name}</p>
                  <p>{customer?.email}</p>
                  <p>{customer?.country}</p>
                </td>
              </tr>
              <tr>
                <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Method</td>
                <td>
                  <img
                    src={paymentMethodImage}
                    alt={data?.payment_method}
                    className="w-10 object-contain"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Cycle</td>
                <td className="flex flex-col font-inter font-normal text-sm text-black content-start">{subscriptionData?.payment_cycle}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
        >
          <table className="w-full min-w-[400px]">
            <thead>
              <tr>
                <th className="w-[150px] text-left border-b border-black">Description</th>
                <th className="w-[50px] text-center border-b border-black">Qty</th>
                <th className="w-[100px] text-center border-b border-black">
                  {/* Unit Price */}
                </th>
                <th className="w-[100px] text-center border-b border-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black">Domain</td>
                <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">1</td>
                <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                  <div className="inline-block">
                    <span className="inline-block">1</span>
                    <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                    <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.selectedDomain?.price[data?.currency])?.toFixed(2)}</span>
                  </div>
                </td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">{currencyList?.find(item => item?.name === data?.currency)?.logo}{data?.selectedDomain?.price[data?.currency]}</td>
              </tr> */}
              <tr>
                <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black capitalize">{subscriptionData?.description}</td>
                <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">
                {/* {data?.license_usage} */}
                1
                </td>
                <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                  {/* <div className="inline-block">
                    <span className="inline-block">{data?.license_usage}</span>
                    <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                    <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.plan?.amount_details?.find(amount => amount?.currency_code === data?.currency)?.price?.find(priceList => priceList?.type === data?.period)?.discount_price)?.toFixed(2)}</span>
                  </div> */}
                </td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                  {data?.amount}
                </td>
              </tr>

              {/* <tr>
                <td></td>
                <td></td>
                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Voucher</td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                  -{currencyList?.find(item => item?.name === data?.currency)?.logo}
                  {data?.discountedPrice}
                </td>
              </tr> */}

              {/* <tr>
                <td></td>
                <td></td>
                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Tax</td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                  {data?.taxedPrice}
                </td>
              </tr> */}

              {/* <tr>
                <td></td>
                <td></td>
                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Total</td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                  {data?.finalTotalPrice}
                </td>
              </tr> */}

              {/* <tr>
                <td></td>
                <td></td>
                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Amount Charged</td>
                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                  {data?.finalTotalPrice}
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className='px-16 py-8'
      >
        <div
          className='w-full h-px bg-[#9A9597] opacity-15'
        ></div>

        <h6
          className='mt-4 text-[#7F8E96]'
        >
          If you have any questions, contact us at&nbsp;
          <span className='text-[#12A833] font-medium'>stripe@hordanso.com</span>
          &nbsp;or call us at&nbsp;
          <span className='text-[#12A833] font-medium'>+1 469-893-0678</span>.
        </h6>
      </div>
    </div>
  );
};

export default BillingInvoice;