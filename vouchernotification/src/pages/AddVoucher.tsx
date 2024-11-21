import { ChevronDown, ChevronRight, ChevronUp, MoveLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'; // Flag component

const AddVoucher: React.FC = () =>  {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const flagRef = useRef(null);

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
    {label: 'Voucher Code', placholder: 'Enter Voucher Code', type: 'text', name: 'voucherCode'},
    {label: 'Start Date', placholder: 'Select Start Date', type: 'date', name: 'startDate'},
    {label: 'Discount -%', placholder: 'Enter Discount', type: 'number', name: 'dicount'},
    {label: 'End Date', placholder: 'Select End Date', type: 'date', name: 'endDate'},
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  const currencyOptions = [
    { code: "US", label: "United States", value: '$' },
    { code: "EU", label: "Europe", value: '€' },
    { code: "AU", label: "Australia", value: 'A$' },
    { code: "NG", label: "Nigeria", value: 'N₦' },
    { code: "GB", label: "United Kingdom", value: '£' },
    { code: "CA", label: "Canada", value: 'C$' },
    { code: "IN", label: "India", value: '₹' },
  ];

  const countryCodes = currencyOptions.map((item) => item?.value);
  
  const [selectedOption, setSelectedOption] = useState<{
    code: string;
    label: string;
    value: string;
  } | { code: "US", label: "United States", value: '$' }>({ code: "US", label: "United States", value: '$' });

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
  return (
    <div>
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
        >Add Voucher</h3>
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

        <form>
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
                      // onChange={updateCustomer}
                      // value={customer[item.name]}
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
              else if(item.type == 'date'){
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
                      name={item.name}
                      required
                      className='search-input-text px-4'
                      // onChange={updateCustomer}
                      // value={customer[item.name]}
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
                      // onChange={updateCustomer}
                      // value={customer[item.name]}
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
            <textarea className='textarea-template' placeholder='palceholder' />
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
            <div className='fixed-popup w-[449px] h-[312px] p-[18px]' ref={modalRef}>
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
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddVoucher