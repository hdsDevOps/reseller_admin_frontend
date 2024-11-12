import React from "react";
import { TrashIcon, PencilIcon } from "lucide-react";
import '../../styles/styles.css';

const Promotion: React.FC = () => {
  const promotionItems = [
    { topic: 'Promo Code', name: 'promoCode'},
    { topic: 'Start Date', name: 'startDate'},
    { topic: 'End Date', name: 'endDate'},
  ];
  const promotions = [
    {
      template: "2x1",
      promoCode: "HOr20%TsDmN",
      startDate: "17-07-2024",
      endDate: "21-07-2024",
      status: "Active",
    },
    {
      template: "50%",
      promoCode: "Hor50%DonSa",
      startDate: "19-07-2024",
      endDate: "25-07-2024",
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
                      src={`${process.env.BASE_URL}images/coupon-${promotions[0].template}.png`}
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
                          promo.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {promo.status}
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
                <button className="px-2">
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
    </div>
  );
};

export default Promotion;
