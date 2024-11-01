import React from 'react';
import { Switch } from '@headlessui/react';


const Banner: React.FC = () => {
  const banners = [
    {
      image: '/ai-collaboration.jpg',
      title: 'Create, connect and collaborate with the power of AI',
      description: 'Lorem ipsum dolor sit amet consectetur...',
      buttonTitle: 'Registration',
      buttonURL: 'https://www.simplelearn.com/',
      startingPrice: ['€2.74', 'A$4.45', '£3.00', 'N₦886.58', '¥2.30', 'C$4.10', '₹50.61'],
      showCoupon: true,
      showVideo: false,
      status: 'Active'
    },
    {
      image: '/domain-growth.jpg',
      title: 'All you need to know how to grow up with your domain',
      description: 'you can spare business worldwide to buy a domain...',
      buttonTitle: 'Learn More',
      buttonURL: 'https://www.simplelearn.com/',
      startingPrice: ['€2.74', 'A$4.45', '£3.00', 'N₦886.58', '¥2.30', 'C$4.10', '₹50.61'],
      showCoupon: true,
      showVideo: false,
      status: 'Inactive'
    }
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
            <div className="grid grid-cols-3 gap-6">
              <div>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="col-span-2 space-y-4">
                <div>
                  <p className="text-gray-600">Title:</p>
                  <p className="font-medium">{banner.title}</p>
                </div>
                <div>
                  <p className="text-gray-600">Description:</p>
                  <p>{banner.description}</p>
                </div>
                <div>
                  <p className="text-gray-600">Button Title:</p>
                  <p>{banner.buttonTitle}</p>
                </div>
                <div>
                  <p className="text-gray-600">Button URL:</p>
                  <p className="text-blue-600">{banner.buttonURL}</p>
                </div>
                <div>
                  <p className="text-gray-600">Starting price:</p>
                  <div className="flex flex-wrap gap-2">
                    {banner.startingPrice.map((price, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full">
                        {price}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span>Show Coupon:</span>
                      <Switch checked={banner.showCoupon} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Show Video:</span>
                      <Switch checked={banner.showVideo} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Status:</span>
                    <span className={`px-3 py-1 rounded-full text-white ${
                      banner.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {banner.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;