import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { ChevronUp, ChevronDown, Trash, Pencil } from 'lucide-react';
import { FiPlus } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
  order: Number;
}

const Faqs: React.FC = () => {
  const modalRef = useRef();
  const modalRef2 = useRef();
  const [faqModal, setFaqModal] = useState(false);
  const [faqModal2, setFaqModal2] = useState(false);
  const [showList, setShowList] = useState(null);
  console.log(showList);
  
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What is Google Workspace?",
      answer: "Google Workspace is a cloud-based productivity suite that includes everything you need to get work done, like email, calendars, video conferencing, online storage, and more. It's a powerful tool that makes collaboration easy and efficient, and it's trusted by millions of businesses around the world. At Bluehive, we offer Google Workspace as a way to help our customers streamline their workflow and focus on what they do best. For a more in-depth look, read our introduction to Google Workspace.",
      order: 1,
    },
    {
      question: "How much is Google Workspace?",
      answer: "Contact us for pricing details.",
      order: 2,
    },
    {
      question: "What is Google Workspace used for?",
      answer: "Google Workspace is used for business collaboration and productivity.",
      order: 3,
    },
    {
      question: "What does Google Workspace include?",
      answer: "Google Workspace includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more.",
      order: 4,
    }
  ]);

  const toggleShow = (order) => {
    setShowList((prev) => (prev === order ? null : order))
  };

  const editFaqArray = [
    { label: 'Question', type: 'text', placeholder: 'Enter your Question', name: 'question'},
    { label: 'Answer', type: 'text', placeholder: 'Enter your Answer', name: 'answer'},
    { label: 'Order', type: 'number', placeholder: 'Enter your Order', name: 'order'},
  ];

  const [ editableFaq, setEditableFaq ] = useState({
    question: '',
    answer: '',
    order: '',
  });
  

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setFaqModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

  const clickOutsideModal2 = (event) => {
    if(modalRef2.current && !modalRef2.current.contains(event.target)){
      setFaqModal2(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal2);

    return () => {
      document.removeEventListener('mousedown', clickOutsideModal2);
    };
  }, []);

  return (
    <div className="grid grid-cols-1">
      <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
        <h3 className="h3-text">FAQ's</h3>
        <div
          className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
        >
          <button
            type="button"
            onClick={() => {
              setFaqModal2(true);
            }}
            className="btn-green w-[139px] items-center"
          >
            <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
            Add new
          </button>
        </div>
      </div>

      {
        faqModal2 && (
          <div
            className='fixed-full-screen'
          >
            <div
              className='fixed-popup w-[488px] h-[511px] py-9 px-[46px]'
              ref={modalRef2}
            >
              <div className="flex-row-between">
                <p className="font-inter-16px-500-black">Add FAQ Content</p>
                <button
                  className="top-10 right-10 bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                  onClick={() => {
                    setFaqModal2(false);
                  }}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div
                className='w-full'
              >
                <form>
                  {
                    editFaqArray && editFaqArray.map((e, i) => {
                      return(
                        <div
                          className='flex flex-col w-full mt-10'
                          key={i}
                        >
                          <label className='search-input-label'>{e.label}</label>
                          <input placeholder={e.placeholder} type={e.type} className='search-input-text  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' name={e.name} />
                        </div>
                      )
                    })
                  }

                  <div className="flex flex-row gap-3 mt-[70px] justify-end">
                    <button
                      type="button"
                      className="btn-red w-[105px] h-[45px]"
                      onClick={() => {
                        setFaqModal2(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-green w-[105px] h-[45px]"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b first:border-t border-[#12A833] border-dashed py-4 mt-[54px]"
          >
            <button
              className="w-full flex justify-between items-center py-4 text-left"
              onClick={() => {
                toggleShow(faq?.order)
              }}
            >
              <span className="faq-header">{faq.question}</span>
              {
                showList == faq?.order ? (
                  <ChevronUp className="w-5 h-5 text-black" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-black" />
                )
              }
            </button>
            
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden flex min-sm:flex-row max-sm:flex-col justify-between ${
                showList == faq?.order ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="faq-details">
                {faq.answer}
              </div>
              <div
                className='min-sm:w-32 max-sm:w-full p-2 flex flex-row gap-[10px] mt-auto max-sm:justify-end'
              >
                <button
                  className='btn-faq'
                  type='button'
                  onClick={() => {
                    setFaqModal(true);
                    setEditableFaq(faq);
                  }}
                ><Pencil className='text-custom-green' /></button>
                <button
                  className='btn-faq'
                  type='button'
                ><Trash className='text-custom-red' /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {
        faqModal && (
          <div
            className='fixed-full-screen'
          >
            <div
              className='fixed-popup w-[488px] h-[511px] py-9 px-[46px]'
              ref={modalRef}
            >
              <div className="flex-row-between">
                <p className="font-inter-16px-500-black">Edit FAQ Content</p>
                <button
                  className="top-10 right-10 bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                  onClick={() => {
                    setFaqModal(false);
                  }}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div
                className='w-full'
              >
                <form>
                  {
                    editFaqArray && editFaqArray.map((e, i) => {
                      return(
                        <div
                          className='flex flex-col w-full mt-10'
                          key={i}
                        >
                          <label className='search-input-label'>{e.label}</label>
                          <input placeholder={e.placeholder} type={e.type} className='search-input-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' name={e.name} defaultValue={editableFaq[e.name]} />
                        </div>
                      )
                    })
                  }

                  <div className="flex flex-row gap-3 mt-[70px] justify-end">
                    <button
                      type="button"
                      className="btn-red w-[105px] h-[45px]"
                        onClick={() => {  
                      setFaqModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-green w-[105px] h-[45px]"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Faqs