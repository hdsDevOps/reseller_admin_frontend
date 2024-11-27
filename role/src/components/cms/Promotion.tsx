import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "lucide-react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const initialPromotion = {
  template: "",
  promoCode: "",
  startDate: "",
  endDate: "",
  status: false
};

const Promotion: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ editPromo, setEditPromo ] = useState(false);
  const [editPromotData, setEditPromoData] = useState(initialPromotion);
  const [newPromotion, setNewPromotion] = useState(initialPromotion);
  
  const promotionItems = [
    { topic: 'Promo Code', name: 'promoCode'},
    { topic: 'Start Date', name: 'startDate'},
    { topic: 'End Date', name: 'endDate'},
  ];
  const newPromotionItems = [
    { label: 'Promo Code', placeholder: 'Enter here', name: 'promoCode', type: 'text'},
    { label: 'Start date', placeholder: 'Select here', name: 'startDate', type: 'date'},
    { label: 'Template', placeholder: 'HTML/CSS script should be here to make the Promotion template', name: 'template', type: 'textarea'},
    { label: 'End date', placeholder: 'Select here', name: 'endDate', type: 'date'},
  ];
  const promotions = [
    {
      template: "2x1",
      promoCode: "HOr20%TsDmN",
      startDate: "17-07-2024",
      endDate: "21-07-2024",
      status: true,
      image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2x1.png?alt=media&token=c83ac2c6-827b-4d17-b2fc-4e9776fe6eaf',
    },
    {
      template: "50%",
      promoCode: "Hor50%DonSa",
      startDate: "19-07-2024",
      endDate: "25-07-2024",
      status: false,
      image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-50%25.png?alt=media&token=84ea9b03-3ef2-4f17-8f04-eb7f8c70cb34',
    },
  ];
  
  const handleInputChange = e => {
    setNewPromotion({
      ...newPromotion,
      [e.target.name]: e.target.value
    });
  };
  const handleEditChange = e => {
    setEditPromoData({
      ...editPromotData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-6">
        <button
          className="btn-cms"
          onClick={() => {setIsEditModalOpen(true)}}
        >
          ADD
        </button>
      </div>
      <div className="bg-custom-white-2 space-y-6">
        {promotions.map((promo) => (
          <div key={promo.promoCode} className="p-4 border">
            <div className="grid grid-cols-1 gap-2">
              <div className="grid sm:grid-cols-2 grid-cols-1 items-center space-x-4">
                <div
                  className="flex flex-col items-left"
                >
                  <div
                    className="my-auto"
                  >
                    <img
                      src={promo.image}
                      alt="Coupon template"
                      className="w-full border border-dashed border-black rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-start max-lg:mx-auto mt-3 lg:ml-4">
                    <div className="flex min-[400px]:flex-row max-[400px]:flex-col items-center min-[400px]:gap-6 max-[400px]:gap-0">
                      <span
                        className="font-inter-16px-bold-black"
                      >Status:</span>
                      <span
                        className={`px-3 h-[24px] font-inter-16px-400 rounded-full text-white ${
                          promo.status ? "bg-custom-green" : "bg-custom-red"
                        }`}
                      >
                        {promo.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table
                    className="sm:px-7 px-0 w-full"
                  >
                    <tbody
                      className=""
                    >
                      {
                        promotionItems.map((e, i) => {
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 py-2 sm:pl-7 pl-1"
                              >{e.topic}</td>
                              <td
                                className="px-3 banner-table-td-1 text-center py-2"
                              >:</td>
                              <td
                                className="banner-table-td-2 py-2 pr-7"
                              >
                                {promo[e.name]}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-end justify-end space-x-4">
                <button className="px-2"
                  onClick={() => {
                    setEditPromo(true);
                    setIsEditModalOpen(true);
                    setEditPromoData(promo);
                  }}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="px-2">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {setIsEditModalOpen(false)}}
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
                >
                  Promotion
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {setIsEditModalOpen(false)}}
                  >+</button>
                </div>
              </div>

              <form className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                {
                  newPromotionItems.map((item, index) => {
                    if(item.type == 'textarea'){
                      return(
                        <div>
                          <div
                            className="flex flex-col"
                            key={index}
                          >
                            <label className="search-input-label">{item.label}</label>
                            <textarea
                              name={item.name}
                              className="w-full search-input-text-2 h-[140px] py-2 pl-2"
                              placeholder={item.placeholder}
                              onChange={
                                editPromo ? handleEditChange : handleInputChange
                              }
                              defaultValue={
                                editPromo ? editPromotData[item.name] : ''
                              }
                            />
                          </div>
                        </div>
                      )
                    }
                    else if(item.name == 'endDate'){
                      return(
                        <div
                          className="flex flex-col justify-between"
                        >
                          <div
                            className="flex flex-col"
                            key={index}
                          >
                            <label className="search-input-label">{item.label}</label>
                            <input
                              type='text'
                              name={item.name}
                              className="w-full search-input-text"
                              placeholder={item.placeholder}
                              onChange={
                                editPromo ? handleEditChange : handleInputChange
                              }
                              defaultValue={
                                editPromo ? editPromotData[item.name] : ''
                              }
                              onFocus={e => {
                                item.type == 'date' ? e.target.type='date' : e.target.type='text'
                              }}
                              onBlur={e => {
                                e.target.type='text'
                              }}
                            />
                          </div>

                          <button
                            type="button"
                            className="btn-green min-w-[110px] max-w-[150px] items-start"
                          >Preview</button>
                        </div>
                      )
                    }
                    else{
                      return(
                        <div
                          className="flex flex-col"
                          key={index}
                        >
                          <label className="search-input-label">{item.label}</label>
                          <input
                            type='text'
                            name={item.name}
                            className="w-full search-input-text"
                            placeholder={item.placeholder}
                            onChange={
                              editPromo ? handleEditChange : handleInputChange
                            }
                            defaultValue={
                              editPromo ? editPromotData[item.name] : ''
                            }
                            onFocus={e => {
                              item.type == 'date' ? e.target.type='date' : e.target.type='text'
                            }}
                            onBlur={e => {
                              e.target.type='text'
                            }}
                          />
                        </div>
                      )
                    }
                  })
                }

                <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                  <button
                    type="button"
                    // onClick={handleSubmit}
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewPromotion(initialPromotion);
                      setEditPromoData(initialPromotion);
                    }}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Promotion;
