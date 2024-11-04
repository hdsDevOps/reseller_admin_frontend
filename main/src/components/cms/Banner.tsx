import React from "react";
import { Switch } from "@headlessui/react";

const Banner: React.FC = () => {
  const banners = [
    {
      image: "/ai-collaboration.jpg",
      title: "Create, connect and collaborate with the power of AI",
      description:
        "Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortirisus suscipit curabitur leo id est. Quam est volutpat hendrerit vitae dui turpis sit. Ut amet aliquam etiam montes.  diam enas a risus lacus enim. Nec turpis facilisis elit accumsan morbi. Tempus enim vitae ",
      buttonTitle: "Registration",
      buttonURL: "https://www.simplelearn.com/",
      startingPrice: [
        "€2.74",
        "A$4.45",
        "£3.00",
        "N₦886.58",
        "¥2.30",
        "C$4.10",
        "₹50.61",
      ],
      showCoupon: true,
      showVideo: false,
      status: "Active",
    },
    {
      image: "/domain-growth.jpg",
      title: "All you need to know how to grow up with your domain",
      description:
        "you can spare business worldwide to buy a domain , choose your own  Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortirisus suscipit curabitur leo id est. Quam est volutpat hendrerit ",
      buttonTitle: "Learn More",
      buttonURL: "https://www.simplelearn.com/",
      startingPrice: [
        "€2.74",
        "A$4.45",
        "£3.00",
        "N₦886.58",
        "¥2.30",
        "C$4.10",
        "₹50.61",
      ],
      showCoupon: true,
      showVideo: false,
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-start mb-6">
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          ADD
        </button>
      </div>

      <div className="space-y-6">
        {banners.map((banner, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span>Show Coupon:</span>
                  <Switch
                    // checked={enabled}
                    // onChange={setEnabled}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-green-500 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-500"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Show Video:</span>
                  <Switch
                    // checked={banner.showVideo}
                    // onChange={setEnabled}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-red-500 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-red-500"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="col-span-2 space-y-4">
                <div className="flex space-x-4">
                  <p className="text-gray-600 w-24">Title</p>
                  <p className="text-gray-600">:</p>
                  <p className="font-medium">{banner.title}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-gray-600 w-24">Description</p>
                  <p className="text-gray-600">:</p>
                  <p>{banner.description}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-gray-600 w-24">Button Title</p>
                  <p className="text-gray-600">:</p>
                  <p>{banner.buttonTitle}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-gray-600 w-24">Button URL</p>
                  <p className="text-gray-600">:</p>
                  <p className="text-blue-600">{banner.buttonURL}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-gray-600 text-nowrap w-24">Starting price</p>
                  <p className="text-gray-600">:</p>
                  <div className="flex flex-wrap gap-2">
                    {banner.startingPrice.map((price, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-200 rounded-full"
                      >
                        {price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start">
              <div className="flex items-center space-x-2">
                <span>Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    banner.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {banner.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
