import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'; // Flag component
import { addVoucherThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';

interface Props {
  htmlContent: string;
}

const AddVoucher: React.FC = () =>  {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const flagRef = useRef(null);
  const [voucher, setVoucher] = useState({
    voucher_code: "",
    start_date: "",
    end_date: "",
    discount_rate: "",
    template_details: "",
    currency: ""
  });
  // console.log("voucher...", voucher);
  const { defaultCurrency } = useAppSelector((state) => state.auth);
  // console.log("defaultCurrency....", defaultCurrency);

  const [endDateEnable, setEndDateEnable] = useState(true);
  useEffect(() => {
    if(voucher?.start_date != ""){
      setEndDateEnable(false);
    }
    else{
      setEndDateEnable(true);
    }
  }, [voucher?.start_date]);

  const dateToIsoString = (date) => {
    const newDate = new Date(date);
    const isoDate = newDate.toISOString().split('T')[0];
    return isoDate;
  };
  

  const updateVoucher = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value
    });
  };

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

  const formList = [
    {label: 'Voucher Code', placholder: 'Enter Voucher Code', type: 'text', name: 'voucher_code'},
    {label: 'Start Date', placholder: 'Select Start Date', type: 'date', name: 'start_date'},
    {label: 'Discount -%', placholder: 'Enter Discount Rate', type: 'number', name: 'discount_rate'},
    {label: 'End Date', placholder: 'Select End Date', type: 'date', name: 'end_date'},
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  const currencyOptions = [
    { code: "US", label: "United States", value: '$', currency_code: "USD", },
    { code: "EU", label: "Europe", value: '€', currency_code: "EUR", },
    { code: "AU", label: "Australia", value: 'A$', currency_code: "AUD", },
    { code: "NG", label: "Nigeria", value: 'N₦', currency_code: "NGN", },
    { code: "GB", label: "United Kingdom", value: '£', currency_code: "GBP", },
    { code: "CA", label: "Canada", value: 'C$', currency_code: "CAD", },
    { code: "IN", label: "India", value: '₹', currency_code: "INR", },
  ];

  const countryCodes = currencyOptions.map((item) => item?.value);
  
  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
  } | { code: "US", label: "United States", value: '$', currency_code: "USD" }>({ code: "US", label: "United States", value: '$', currency_code: "USD" });

  useEffect(() => {
    const result = currencyOptions.filter((item) => item.currency_code === defaultCurrency);
    setSelectedOption(result[0]);
  }, [defaultCurrency]);

  useEffect(() => {
    setVoucher({
      ...voucher,
      currency: selectedOption?.currency_code
    })
  }, [selectedOption])

  const handleOptionClick = (option: { code: string; flag: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (flagRef.current && !flagRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const addVoucher = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        addVoucherThunk(voucher)
      ).unwrap()
      toast.success(result?.message);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      toast.error("Error adding voucher");
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
  
  const HtmlRenderer: React.FC<Props> = ({ htmlContent }) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };
  return (
    <div>
      <ToastContainer />
      <div
        className='flex flex-row mb-[20px]'
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
        >Add Voucher</h3>
      </div>
      <div
          className='flex flex-row my-3 h-[22px]'
        >
          <p
            className='page-indicator-1-1'
          >Voucher</p>
          <ChevronRight
            className='page-indicator-arrow-5'
          />
          <p
            className='page-indicator-1'
          >Voucher list</p>
          <ChevronRight
            className='page-indicator-arrow-5'
          />
          <p
            className='page-indicator-2'
          >Add Voucher</p>
        </div>

      <form onSubmit={addVoucher}>
        <div
          className='grid grid-cols-1 sm:grid-cols-2'
        >
          {
            formList && formList.map((item, index) => {
              if(item.type == 'number'){
                return(
                  <div className='flex flex-col px-2 mb-2'>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type={item.type}
                      placeholder={item.placholder}
                      name={item.name}
                      required
                      className='search-input-text px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      onChange={updateVoucher}
                    />
                    <div
                      key={index}
                      className="float-right flex flex-row -mt-[34px] ml-auto"
                    >
                      <p
                        className='w-fit my-auto mx-1'
                      >{selectedOption?.value}</p>
                      <div
                        className='w-[60px] flex flex-col'
                      >
                        <div className="relative w-[40px] h-full flex mx-auto items-center justify-between border-0 cursor-pointer"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <Flag code={selectedOption?.code} style={{width: '30px', margin: 'auto'}} />
                          {
                            isOpen ? <ChevronUp style={{fontSize: '20px'}} /> : <ChevronDown style={{fontSize: '20px'}} />
                          }
                        </div>

                        {/* Dropdown Options */}
                        {isOpen && (
                          <div className="absolute mt-[44px] z-10 w-[40px] ml-[5px] bg-white border border-gray-300 rounded-md shadow-lg" ref={flagRef}>
                            {currencyOptions.map((option) => (
                              <div
                                key={option.code}
                                className="flex items-center py-2 px-[5px] hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleOptionClick(option)}
                              >
                                <Flag code={option?.code} style={{width: '30px'}} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }
              else if(item.name == 'start_date'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type='text'
                      onFocus={e => {
                        e.target.type='date'
                      }}
                      onBlur={e => {
                        e.target.type='text'
                      }}
                      placeholder={item.placholder}
                      name='start_date'
                      required
                      className='search-input-text px-4'
                      onChange={updateVoucher}
                    />
                  </div>
                )
              }
              else if(item.name == 'end_date'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type='text'
                      onFocus={e => {
                        e.target.type='date'
                      }}
                      onBlur={e => {
                        e.target.type='text'
                      }}
                      placeholder={item.placholder}
                      name='end_date'
                      required
                      className='search-input-text px-4'
                      onChange={updateVoucher}
                      disabled={endDateEnable}
                      min={voucher?.start_date == "" ? dateToIsoString(new Date()) : dateToIsoString(new Date(voucher?.start_date)) }
                    />
                  </div>
                )
              }
              else{
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type={item.type}
                      placeholder={item.placholder}
                      name={item.name}
                      required
                      className='search-input-text px-4'
                      onChange={updateVoucher}
                    />
                  </div>
                )
              }
            })
          }
          <div
            className='flex flex-col px-2 mb-2'
          >
            <label
              className='search-input-label'
            >Template</label>
            <textarea className='textarea-template' placeholder='HTML/CSS script should be here to make the Promotion template' name='template_details' onChange={updateVoucher} />
          </div>

          <div className='flex flex-col max-sm:mx-auto px-2 mb-2 mt-5'>
            <button
              type='button'
              className='btn-green-2 h-[46px] w-fit'
              button-name="voucher-template-preview"
              onClick={() => {setIsModalOpen(true);}}
            >Preview</button>
          </div>
        </div>
        <div
          className='mt-4 flex flex-row max-sm:justify-center mb-3 sm:ml-2'
        >
          <button
            className='btn-green-2 h-[46px]'
            type='submit'
            button-name="add-new-voucher"
          >Save</button>
          <button
            type='button'
            className='btn-red h-[46px] ml-[30px]'
          >Cancel</button>
        </div>
      </form>

      {
        isModalOpen && (
          <div className='fixed-full-screen'>
            <div className='fixed-popup w-[449px] min-h-[200px] p-[18px]' ref={modalRef}>
              <div className='flex flex-col'>
                <div
                  className='flex-row-between'
                >
                  <h4
                    className='text-2xl font-medium'
                  >Voucher Preview</h4>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      button-name="voucher-preview-close"
                    >+</button>
                  </div>
                </div>
              </div>

              <div className='w-full border rounded-sm p-1 mt-5 shadow-sm'>
                <HtmlRenderer htmlContent={voucher?.template_details || `<div style="text-align: center; min-height: 100px; padding-top: 35px;">No data Available</div>`} />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddVoucher;