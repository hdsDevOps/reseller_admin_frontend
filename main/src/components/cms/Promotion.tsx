import React from 'react';
import { TrashIcon, PencilIcon } from 'lucide-react';

const Promotion: React.FC = () => {
  const promotions  = [
    {
      template: '2x1',
      promoCode: 'HOr20%TsDmN',
      startDate: '17-07-2024',
      endDate: '21-07-2024',
      status: 'Active'
    },
    {
      template: '50%',
      promoCode: 'Hor50%DonSa',
      startDate: '19-07-2024',
      endDate: '25-07-2024',
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
        {promotions.map((promo) => (
          <div key={promo.promoCode} className="p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={`/coupon-${promo.template}.png`}
                  alt="Coupon template"
                  className="w-32"
                />
                <div>
                  <p>Promo Code: {promo.promoCode}</p>
                  <p>Start Date: {promo.startDate}</p>
                  <p>End Date: {promo.endDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <span className={`px-3 py-1 rounded-full text-white ${
                  promo.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {promo.status}
                </span>
                <button className="p-2">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="p-2">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;