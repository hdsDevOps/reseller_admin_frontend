import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'; // Flag component
import { editVoucherThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from 'store/hooks';
import { format } from 'date-fns';

interface Props {
  htmlContent: string;
}

const EditVoucher: React.FC = () =>  {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const flagRef = useRef(null);
  const [voucher, setVoucher] = useState(location.state);
  console.log(voucher);

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
    if(typeof date === "string"){
      const newDate = new Date(date);
      return format(newDate, "dd MMM yyyy");
    } else {
      const milliseconds = date?._seconds * 1000;
      const extraMilliseconds = date?._nanoseconds / 1000000;
      const totalMilliseconds = milliseconds+extraMilliseconds;
      const newDate = new Date(totalMilliseconds);
      return format(newDate, "dd MMM yyyy");
    }
  };
  
  const finalDate = (date) => {
    if(typeof date === "string"){
      const newDate = new Date(date);
      return format(newDate, "yyyy-MM-dd");
    } else {
      const milliseconds = date?._seconds * 1000;
      const extraMilliseconds = date?._nanoseconds / 1000000;
      const totalMilliseconds = milliseconds+extraMilliseconds;
      const newDate = new Date(totalMilliseconds);
      return format(newDate, "yyyy-MM-dd");
    }
  }

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

  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
  } | { code: "US", label: "United States", value: '$', currency_code: "USD" }>({ code: "US", label: "United States", value: '$', currency_code: "USD" });

  useEffect(() => {
    const data = currencyOptions.filter(item => item.currency_code == location.state?.currency)[0];
    setSelectedOption(data);
  }, []);

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

  const validateForm = () => {
    // Check for spaces only in any field
    for (const key in voucher) {
      if (voucher[key].trim() === '') {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const addVoucher = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        const result = await dispatch(editVoucherThunk({
          voucher_code: voucher?.voucher_code,
          start_date: finalDate(voucher?.start_date),
          end_date: finalDate(voucher?.end_date),
          discount_rate: voucher?.discount_rate,
          template_details: voucher?.template_details,
          currency: voucher?.currency,
          record_id: voucher?.id
        })).unwrap()
        toast.success(result?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (error) {
        toast.error("Error editing voucher");
        console.log("error...", error)
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    } else {
      toast.warning("Spaces cannot be empty");
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
        className='flex flex-row mb-[35px]'
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
        >Edit Voucher</h3>
      </div>
      <div
          className='flex flex-row mt-5 h-[22px]'
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
                      value={voucher[item.name] || null}
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
                      value={dateToIsoString(voucher?.start_date)}
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
                      min={dateToIsoString(voucher?.end_date)}
                      value={dateToIsoString(voucher?.end_date)}
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
                      value={voucher[item.name] || null}
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
            <textarea className='textarea-template' placeholder='HTML/CSS script should be here to make the Promotion template' name='template_details' onChange={updateVoucher} value={voucher?.template_details} required />
          </div>

          <div className='flex flex-col max-sm:mx-auto px-2 mb-2 mt-5'>
            <button
              type='button'
              className='btn-green-2 h-[46px] w-fit'
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
            button-name="edit-voucher-list"
          >Save</button>
          <button
            type='button'
            className='btn-red h-[46px] ml-[30px]'
            onClick={() => {
              setVoucher(location.state);
              navigate(-1);
            }}
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
};

export default EditVoucher;