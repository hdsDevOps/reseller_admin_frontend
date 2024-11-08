import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { ChevronUp, ChevronDown, Trash, Pencil } from 'lucide-react';
import { FiPlus } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const Faqs: React.FC = () => {
  const modalRef = useRef();
  const [faqModal, setFaqModal] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What is Google Workspace?",
      answer: "Google Workspace is a cloud-based productivity suite that includes everything you need to get work done, like email, calendars, video conferencing, online storage, and more. It's a powerful tool that makes collaboration easy and efficient, and it's trusted by millions of businesses around the world. At Bluehive, we offer Google Workspace as a way to help our customers streamline their workflow and focus on what they do best. For a more in-depth look, read our introduction to Google Workspace.",
      isOpen: true
    },
    {
      question: "How much is Google Workspace?",
      answer: "Contact us for pricing details.",
      isOpen: false
    },
    {
      question: "What is Google Workspace used for?",
      answer: "Google Workspace is used for business collaboration and productivity.",
      isOpen: false
    },
    {
      question: "What does Google Workspace include?",
      answer: "Google Workspace includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more.",
      isOpen: false
    }
  ]);

  const editFaqArray = [
    { label: 'Question', type: 'text', placeholder: 'Enter your Question', name: 'question'},
    { label: 'Answer', type: 'text', placeholder: 'Enter your Answer', name: 'answer'},
    { label: 'Order', type: 'text', placeholder: 'Enter your Order', name: 'order'},
  ]

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

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  return (
    <div className="grid grid-cols-1">
      <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
        <h3 className="h3-text">FAQ's</h3>
        <div
          className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
        >
          <button
            type="button"
            // onClick={() => {
            //   setIsModalOpen(true);
            // }}
            className="btn-green w-[139px] items-center"
          >
            <FiPlus className="inline-block items-center mr-2 mt-[-2px]" />
            Add new
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b first:border-t border-[#12A833] border-dashed py-4 mt-[54px]"
          >
            <button
              className="w-full flex justify-between items-center py-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-header">{faq.question}</span>
              {faq.isOpen ? (
                <ChevronUp className="w-5 h-5 text-black" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black" />
              )}
            </button>
            
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden flex min-sm:flex-row max-sm:flex-col justify-between ${
                faq.isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
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
                  onClick={() => {setFaqModal(true)}}
                ><Pencil className='text-custom-green' /></button>
                <button
                  className='btn-faq'
                  type='button'
                ><Trash className='text-custom-red' /></button>
              </div>
            </div>

            {
              faqModal && (
                <div
                  className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10'
                >
                  <div
                    className='fixed-popup w-[488px] h-[511px] py-9 px-[46px]'
                    ref={modalRef}
                  >
                    <div className="flex-row-between">
                      <p className="font-inter-16px-500-black">Add FAQ Content</p>
                      <button
                        className="top-10 right-10 bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                        onClick={() => {setFaqModal(false)}}
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
                                <input placeholder={e.placeholder} type={e.type} className='search-input-text' name={e.name} />
                              </div>
                            )
                          })
                        }

                        <div className="flex flex-row gap-3 mt-[70px] justify-end">
                          <button
                            type="button"
                            className="btn-red w-[105px] h-[45px]"
                            onClick={() => {setFaqModal(false)}}
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
        ))}
      </div>
    </div>
  );
}

export default Faqs