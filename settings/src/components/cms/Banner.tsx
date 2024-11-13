import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const initialBanner = {
  title: '',
  description: '',
  videoURL: '',
  videoShow: false,
  startingPrice: [
    { name: 'IND', amount: '1'},
    { name: 'US', amount: '2'},
  ],
  buttonTitle: '',
  buttonURL: '',
  image: '',
  promotionShow: false,
}

const initialPrice = { name: 'IND', amount: ''};

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState(initialBanner);
  const [price,setPrice] = useState(initialPrice);
  const [editBanner, setEditBanner] = useState(false);
  

  const bannerItems = [
    { topic: 'Title', name: 'title'},
    { topic: 'Description', name: 'description'},
    { topic: 'Button Title', name: 'buttonTitle'},
    { topic: 'Button URL', name: 'buttonURL'},
    { topic: 'Starting price', name: 'startingPrice'},
  ];
  
  const banners = [
    {
      image: `${process.env.BASE_URL}images/ai-collaboration.jpeg`,
      title: "Create, connect and collaborate with the power of AI",
      description:
        "Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortirisus suscipit curabitur leo id est. Quam est volutpat hendrerit vitae dui turpis sit. Ut amet aliquam etiam montes.  diam enas a risus lacus enim. Nec turpis facilisis elit accumsan morbi. Tempus enim vitae ",
      buttonTitle: "Registration",
      buttonURL: "https://www.simplelearn.com/",
      startingPrice: [
        {amount: '€2.74', name: 'EUR',},
        {amount: 'A$4.45', name: 'AUS',},
        {amount: '$3.00', name: 'US',},
        {amount: 'N₦886.58', name: 'NIG',},
        {amount: '£2.30', name: 'ENG',},
        {amount: 'C$4.10', name: 'CAN',},
        {amount: '₹50.61', name: 'IND',},
      ],
      showCoupon: true,
      showVideo: false,
      status: true,
    },
    {
      image: `${process.env.BASE_URL}images/domain-growth.png`,
      title: "All you need to know how to grow up with your domain",
      description:
        "you can spare business worldwide to buy a domain , choose your own  Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortirisus suscipit curabitur leo id est. Quam est volutpat hendrerit ",
      buttonTitle: "Learn More",
      buttonURL: "https://www.simplelearn.com/",
      startingPrice: [
        {amount: '€2.74', name: 'EUR',},
        {amount: 'A$4.45', name: 'AUS',},
        {amount: '$3.00', name: 'US',},
        {amount: 'N₦886.58', name: 'NIG',},
        {amount: '£2.30', name: 'ENG',},
        {amount: 'C$4.10', name: 'CAN',},
        {amount: '₹50.61', name: 'IND',},
      ],
      showCoupon: true,
      showVideo: false,
      status: false,
    },
  ];

  const flagList = [
    {flag: 'images/european-flag.png', name: 'EUR', logo: '€',},
    {flag: 'images/australia-flag.png', name: 'AUS', logo: 'A$',},
    {flag: 'images/us-flag.png', name: 'US', logo: '$',},
    {flag: 'images/nigeria-flag.png', name: 'NIG', logo: 'N₦',},
    {flag: 'images/england-flag.png', name: 'ENG', logo: '£',},
    {flag: 'images/canada-flag.png', name: 'CAN', logo: 'C$',},
    {flag: 'images/india-flag.png', name: 'IND', logo: '₹',},
  ];

  const bannerLeft = [
    {label: 'Title', name: 'title', placeholder: 'Enter the banner heading here', type: 'text',},
    {label: 'Video URL', name: 'videoURL', placeholder: 'Enter the video URL', type: 'text',},
    {label: 'Starting at', name: 'startingPrice', placeholder: 'Enter the amount here', type: 'number',},
    {label: 'Button Title', name: 'buttonTitle', placeholder: 'Enter the button name here', type: 'text',},
    {label: 'Button URL', name: 'buttonURL', placeholder: 'Enter the button URL', type: 'text',},
  ];

  const bannerRight = [
    {label: 'Description', name: 'description', placeholder: 'TinyMCE editor will be used', type: 'text',},
    {label: 'Upload background image ', name: 'image', placeholder: 'Add photo', type: 'file',},
  ];

  const updateBanner = e => {
    setNewBanner({
      ...newBanner,
      [e.target.name]: e.target.value,
    });
  };

  const updatePrice = (name, price) => {
    const data = newBanner.startingPrice;
    const exists = data.some(item => item.name === name);
    if(exists){
      const newData = data.map(item => 
        item.name === name ? { ...item, amount: price.amount} : item
      );
      setNewBanner({
        ...newBanner,
        startingPrice: newData
      });
    }
    else{
      const newData = [ ...data, price];
      setNewBanner({
        ...newBanner,
        startingPrice: newData
      });
    }
  };

  const removePrice = (name) => {
    const data = newBanner.startingPrice;
    const newData = data.filter(item => item.name !== name);
    setNewBanner({
      ...newBanner,
      startingPrice: newData
    });
  }

  const getFlagImage = (name) => {
    const result = flagList.find(item => item.name === name);
    return result?.flag;
  }

  const getFlagLogo = (name) => {
    const result = flagList.find(item => item.name === name);
    return result?.logo;
  }

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-6">
        <button className="btn-cms"
          onClick={() => {setIsEditModalOpen(true)}}
        >
          ADD
        </button>
      </div>

      <div className="bg-custom-white-2">
        {banners.map((banner, index) => (
          <div key={index} className="p-4 border">
            <div className="flex items-center justify-end mb-4">
              <div className="flex min-sm:flex-row max-sm:flex-col sm:items-center items-end sm:gap-4 gap-2">
                <div className="flex sm:items-center items-end h-5 gap-2">
                  <span
                    className="font-inter font-normal text-xs text-black opacity-60"
                  >Show Coupon :</span>
                  <div
                    className="transition-transform duration-1000 ease-in-out"
                    // onClick={() => setShowNotfication(!showNotification)}
                  >
                    {/* {notificationToggle()} */}
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div
                        className="w-[37px] h-[19px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D13B]">
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex sm:items-center items-end h-5 gap-2">
                  <span
                    className="font-inter font-normal text-xs text-black opacity-60"
                  >Show Video :</span>
                  <div
                    className="transition-transform duration-1000 ease-in-out"
                    // onClick={() => setShowNotfication(!showNotification)}
                  >
                    {/* {notificationToggle()} */}
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div
                        className="w-[37px] h-[19px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D13B]">
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 grid-cols-1 gap-3">
              <div
                className="flex flex-col items-left"
              >
                <div
                  className="my-auto"
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full max-h-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-start max-lg:mx-auto mt-3 lg:ml-4">
                  <div className="flex min-[400px]:flex-row max-[400px]:flex-col items-center min-[400px]:gap-6 max-[400px]:gap-0">
                    <span
                      className="font-inter-16px-bold-black"
                    >Status:</span>
                    <button
                      className={`px-3 h-[24px] font-inter-16px-400 rounded-full text-white ${
                        banner.status ? "bg-custom-green" : "bg-custom-red"
                      }`}
                    >
                      {banner.status ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 overflow-x-auto">
                <table
                  className="sm:px-7 px-0 w-full"
                >
                  <tbody
                    className=""
                  >
                    {
                      bannerItems.map((e, i) => {
                        if(e.name == 'startingPrice'){
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 py-2 sm:pl-7 pl-1"
                              >Starting price</td>
                              <td
                                className="px-3 banner-table-td-1 text-center py-2"
                              >:</td>
                              <td
                                className="flex flex-wrap gap-2 py-2 pr-7"
                              >
                                {
                                  banner.startingPrice.map((price, n) => {
                                    return(
                                      <span
                                        key={n}
                                        className="banner-price-span px-2"
                                      >
                                        <img src={`${process.env.BASE_URL}${getFlagImage(price?.name)}`} alt={price.name} className="w-auto h-auto p-1" />
                                        <p
                                          className="banner-price-p"
                                        >{price.amount}</p>
                                        <button>
                                          <X className="ml-1 w-4" />
                                        </button>
                                      </span>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          return(
                            <tr key={i}
                              className=""
                            >
                              <td
                                className="banner-table-td-1 py-2 sm:pl-7 pl-0"
                              >{e.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2"
                              >:</td>
                              <td
                                className={`banner-table-td-2 py-2 pr-7 ${
                                  e.name == "title" ? "font-medium text-black" : e.name == "description" ? "font-normal text-black": e.name == "buttonTitle" ? "font-bold text-black" : e.name == "buttonURL" ? "font-normal text-custom-blue-8 cursor-pointer" : ""
                                }`}
                              >
                                {
                                  e.name == "buttonURL" ? <a
                                    onClick={() => {
                                      window.open(`${banner.buttonURL}`)
                                    }}
                                  >{banner.buttonURL}</a> : banner[e.name]
                                }
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="flex items-end justify-end space-x-4">
                <button className="px-2"
                  onClick={() => {
                    setEditBanner(true);
                    setIsEditModalOpen(true);
                    setNewBanner(banner);
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
                  {editBanner ? 'Edit Promotion' : 'Add Promotion'}
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {setIsEditModalOpen(false)}}
                  >+</button>
                </div>
              </div>

              <form className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-[400px]">
                <div
                  className="grid sm:grid-cols-2 grid-cols-1 gap-2"
                >
                  <div
                    className="grid grid-cols-1 gap-2"
                  >
                    {
                      bannerLeft.map((banner, index) => {
                        if(banner.label == ''){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                        else if(banner.label == 'Starting at'){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <div
                                className="search-input-text grid grid-cols-5"
                              >
                                <input
                                  className="col-span-3 h-full focus:outline-none pl-2"
                                  type={banner.type}
                                  placeholder={banner.placeholder}
                                  onChange={e => {
                                    setPrice({
                                      ...price,
                                      amount: e.target.value,
                                    });
                                  }}
                                />
                                <select
                                  className="col-span-1 h-full"
                                  onChange={e => {
                                    setPrice({
                                      ...price,
                                      name: e.target.value,
                                    });
                                  }}
                                >
                                  <option value='IND' defaultChecked>IND</option>
                                  <option value='EUR'>EUR</option>
                                  <option value='AUS'>AUS</option>
                                  <option value='US'>US</option>
                                  <option value='NIG'>NIG</option>
                                  <option value='ENG'>ENG</option>
                                  <option value='CAN'>CAN</option>
                                </select>
                                <div
                                  className="col-span-1 h-full flex justify-center"
                                >
                                  <button
                                    type="button"
                                    className="btn-cms-2 my-auto"
                                    onClick={() => updatePrice(price.name, price)}
                                  >ADD</button>
                                </div>
                              </div>

                              {
                                <div
                                  className="flex flex-wrap gap-1 py-2"
                                >
                                  {
                                    newBanner.startingPrice.length > 0 ?
                                    newBanner.startingPrice.map((price, i) => {
                                      return(
                                        <div key={i}
                                          className="h-6 rounded-[15px] bg-black bg-opacity-40 flex flex-row px-2 gap-1"
                                        >
                                          <img
                                            src={`${process.env.BASE_URL}${getFlagImage(price.name)}`}
                                            alt={price.name}
                                            className="w-5 h-5 my-auto"
                                          />
                                          <p>{getFlagLogo(price.name)}{price.amount}</p>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              removePrice(price.name)
                                            }}
                                          >
                                            <X className="ml-1 w-4" />
                                          </button>
                                        </div>
                                      )
                                    }) : ''
                                  }
                                </div>
                              }
                            </div>
                          )
                        }
                        else if(banner.label == 'Video URL'){
                          return(
                            <div
                              key={index}
                              className="grid grid-cols-1"
                            >
                              <div
                                className="flex flex-row gap-16"
                              >
                                <p
                                  className="font-inter-16px-400 text-black"
                                >Show Video</p>
                                <div
                                  className="transition-transform duration-1000 ease-in-out my-auto tracking-[-1.1%]"
                                >
                                  <label className="relative cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={newBanner.videoShow}
                                      onClick={() => {
                                        setNewBanner({
                                          ...newBanner,
                                          videoShow: !newBanner.videoShow
                                        })
                                      }}
                                    />
                                    <div
                                      className="w-[28px] h-[15px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00D13B]">
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div
                                key={index}
                                className="flex flex-col"
                              >
                                <label className="search-input-label">{banner.label}</label>
                                <input
                                  className="search-input-text"
                                  type={banner.type}
                                  placeholder={banner.placeholder}
                                  name={banner.name}
                                  onChange={updateBanner}
                                  defaultValue={newBanner[banner.name]}
                                />
                              </div>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                  <div
                    className="grid grid-cols-1 gap-2"
                  >
                    {
                      bannerRight.map((banner, index) => {
                        if(banner.label == 'Description'){
                          return(
                            <div
                              className="flex flex-col w-full h-[230px]"
                              key={index}
                            >
                              <label
                                className="search-input-label w-full"
                              >Description</label>
                              <div
                                className="search-input-text w-full font-inter font-normal text-custom-black-4 text-base min-h-full py-4 pr-2"
                              >
                                <Editor
                                  apiKey={process.env.TINY_MCE_API}
                                  onChange={updateBanner}
                                  init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: ["lists", "link", "image", "paste"],
                                    toolbar:
                                      "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                                  }}
                                  onEditorChange={(content) => {
                                    setNewBanner({
                                      ...newBanner,
                                      description: content,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          )
                        }
                        else if(banner.label = "Upload background image"){
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <div
                                className="flex flex-col gap-1"
                              >
                                <label
                                  className="font-inter-14px-normal-cGray text-nowrap"
                                >{banner.label}</label>
                                <div
                                  className="flex flex-row gap-6 justify-end"
                                >
                                  <p
                                    className="font-inter-16px-400 text-black"
                                  >Show Promotion</p>
                                  <div
                                    className="transition-transform duration-1000 ease-in-out my-auto tracking-[-1.1%]"
                                  >
                                    <label className="relative cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" defaultChecked={newBanner.promotionShow}
                                        onClick={() => {
                                          setNewBanner({
                                            ...newBanner,
                                            promotionShow: !newBanner.promotionShow
                                          })
                                        }}
                                      />
                                      <div
                                        className="w-[28px] h-[15px] flex items-center bg-red-500 rounded-full peer-checked:text-[#00D13B] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[10px] after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00D13B]">
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-[45px] mt-auto border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <svg
                                      aria-hidden="true"
                                      className="w-3 h-3 mt-2 mb-1 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 4v16m8-8H4"
                                      ></path>
                                  </svg>
                                  <p className="text-[10px] font-inter text-gray-500">Add photo</p>
                                </div>
                                <input id="file-upload" type="file" className="hidden" name={banner.name} />
                              </label>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div
                              key={index}
                              className="flex flex-col"
                            >
                              <label className="search-input-label">{banner.label}</label>
                              <input
                                className="search-input-text"
                                type={banner.type}
                                placeholder={banner.placeholder}
                                name={banner.name}
                                onChange={updateBanner}
                                defaultValue={newBanner[banner.name]}
                              />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>

                <div className="flex flex-row justify-center gap-3 pt-4">
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
                      setNewBanner(initialBanner);
                      setEditBanner(false);
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

export default Banner;
