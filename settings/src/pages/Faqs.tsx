import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { ChevronUp, ChevronDown, Trash, Pencil } from 'lucide-react';
import { FiPlus } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';
import { getFaqsThunk, addFaqThunk, updateFaqThunk, deleteFaqThunk } from 'store/user.thunk';
import { useAppDispatch } from 'store/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const initialFaq = {
  question: '',
  answer: '',
  order: '',
}

const Faqs: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalRef = useRef();
  const [deleteModal, setDeleteModal] = useState(false);
  const [faqModal, setFaqModal] = useState(false);
  const [editFaq, setEditFaq] = useState(false);
  const [showList, setShowList] = useState(null);
  const [deleteId, setDeleteId] = useState('');
  const [faqs, setFaqs] = useState([]);

  const fetchFaqs = async() => {
    try {
      const result = await dispatch(getFaqsThunk()).unwrap();
      setFaqs(result.data);
    } catch (error) {
      setFaqs([]);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleShow = (index) => {
    setShowList((prev) => (prev === index ? null : index))
  };

  const editFaqArray = [
    { label: 'Question', type: 'text', placeholder: 'Enter your Question', name: 'question'},
    { label: 'Answer', type: 'text', placeholder: 'Enter your Answer', name: 'answer'},
    { label: 'Order', type: 'number', placeholder: 'Enter your Order', name: 'order'},
  ];

  const [ newFaq, setFaq ] = useState(initialFaq);
  console.log(newFaq);

  const clickOutsideModal = (event) => {
    if(modalRef.current && !modalRef.current.contains(event.target)){
      setFaqModal(false);
      setFaq(initialFaq);
      setEditFaq(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', clickOutsideModal);
    };
  }, []);

  const handleChangeFaq = e => {
    setFaq({
      ...newFaq,
      [e.target.name]: e.target.value,
    });
  };

  const addFaqSubmit = async() => {
    try {
      const addResult = await dispatch(addFaqThunk(newFaq)).unwrap();
      setTimeout(() => {
        toast.success(addResult?.message)
      }, 1000);
      setEditFaq(false);
      setFaq(initialFaq);
      setFaqModal(false);
    } catch (error) {
      toast.error("Error adding FAQ");
    } finally {
      fetchFaqs();
    }
  };

  const editFaqSubmit = async() => {
    try {
      const editResult = await dispatch(updateFaqThunk({
        record_id: newFaq?.record_id,
        question: newFaq?.question,
        answer: newFaq?.answer,
        order: newFaq?.order
      })).unwrap();
      setTimeout(() => {
        toast.success(editResult?.message)
      }, 1000);
      setEditFaq(false);
      setFaq(initialFaq);
      setFaqModal(false);
    } catch (error) {
      toast.error("Error editing faq");
    } finally {
      fetchFaqs();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(editFaq){
      editFaqSubmit();
    }
    else{
      addFaqSubmit();
    }
  };

  const deleteFaqSubmit = async(e) => {
    e.preventDefault();
    try {
      const deleteResult = await dispatch(deleteFaqThunk({record_id: deleteId})).unwrap();
      setDeleteId('');
      setDeleteModal(false);
      setTimeout(() => {
        toast.success(deleteResult?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error deleting FAQ");
      setDeleteId('');
      setDeleteModal(false);
    } finally {
      fetchFaqs();
    }
  }

  return (
    <div className="grid grid-cols-1">
      <ToastContainer />
      <div className="flex min-[629px]:flex-row max-[629px]:flex-col min-[629px]:justify-between">
        <h3 className="h3-text">FAQ's</h3>
        <div
          className="flex min-[500px]:justify-end max-[500px]:justify-center max-[500px]:mt-2"
        >
          <button
            type="button"
            onClick={() => {
              setFaqModal(true);
              setEditFaq(false);
              setFaq(initialFaq);
            }}
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
              onClick={() => {
                toggleShow(index+1)
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
                    setFaq(faq);
                    setEditFaq(true);
                  }}
                ><Pencil className='text-custom-green' /></button>
                <button
                  className='btn-faq'
                  type='button'
                  onClick={() => {
                    setDeleteModal(true);
                    setDeleteId(faq?.record_id);
                  }}
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
                <p className="font-inter-16px-500-black">{editFaq ? "Edit FAQ Content" : 'Add FAQ Content'}</p>
                <button
                  className="top-10 right-10 bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
                  onClick={() => {
                    setFaqModal(false);
                    setEditFaq(false);
                    setFaq(initialFaq);
                  }}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div
                className='w-full'
              >
                <form onSubmit={handleSubmit}>
                  {
                    editFaqArray && editFaqArray.map((e, i) => {
                      return(
                        <div
                          className='flex flex-col w-full mt-10'
                          key={i}
                        >
                          <label className='search-input-label'>{e.label}</label>
                          <input placeholder={e.placeholder} type={e.type} className='search-input-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' name={e.name} defaultValue={newFaq[e.name]} onChange={handleChangeFaq} />
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
                        setEditFaq(false);
                        setFaq(initialFaq);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
      <Dialog
        open={deleteModal}
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setDeleteModal(false);
          setDeleteId('');
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Delete FAQ</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setDeleteModal(false);
                      setDeleteId('');
                    }}
                  >+</button>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={deleteFaqSubmit}
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModal(false);
                    setDeleteId('');
                  }}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Faqs