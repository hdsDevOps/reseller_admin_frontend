import React from "react";
import { Switch } from "@headlessui/react";
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const Banner: React.FC = () => {
  const navigate = useNavigate();

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
        {flag: 'images/european-flag.png', price: '€2.74', name: 'Europe',},
        {flag: 'images/australia-flag.png', price: 'A$4.45', name: 'Australia',},
        {flag: 'images/us-flag.png', price: '$3.00', name: 'United States',},
        {flag: 'images/nigeria-flag.png', price: 'N₦886.58', name: 'Nigeria',},
        {flag: 'images/england-flag.png', price: '£2.30', name: 'England',},
        {flag: 'images/canada-flag.png', price: 'C$4.10', name: 'Canada',},
        {flag: 'images/india-flag.png', price: '₹50.61', name: 'India',},
      ],
      showCoupon: true,
      showVideo: false,
      status: "Active",
    },
    {
      image: `${process.env.BASE_URL}images/domain-growth.png`,
      title: "All you need to know how to grow up with your domain",
      description:
        "you can spare business worldwide to buy a domain , choose your own  Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortirisus suscipit curabitur leo id est. Quam est volutpat hendrerit ",
      buttonTitle: "Learn More",
      buttonURL: "https://www.simplelearn.com/",
      startingPrice: [
        {flag: 'images/european-flag.png', price: '€2.74', name: 'Europe',},
        {flag: 'images/australia-flag.png', price: 'A$4.45', name: 'Australia',},
        {flag: 'images/us-flag.png', price: '$3.00', name: 'United States',},
        {flag: 'images/nigeria-flag.png', price: 'N₦886.58', name: 'Nigeria',},
        {flag: 'images/england-flag.png', price: '£2.30', name: 'England',},
        {flag: 'images/canada-flag.png', price: 'C$4.10', name: 'Canada',},
        {flag: 'images/india-flag.png', price: '₹50.61', name: 'India',},
      ],
      showCoupon: true,
      showVideo: false,
      status: "Inactive",
    },
  ];

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-6">
        <button className="btn-cms">
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
                    <span
                      className={`px-3 h-[24px] font-inter-16px-400 rounded-full text-white ${
                        banner.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {banner.status}
                    </span>
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
                                        <img src={process.env.BASE_URL+price.flag} alt={price.name} className="w-auto h-auto p-1" />
                                        <p
                                          className="banner-price-p"
                                        >{price.price}</p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
