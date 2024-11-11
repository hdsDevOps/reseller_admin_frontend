import React, { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';

interface BillingDetail {
  TransactID: string;
  customerName: string;
  description: string;
  date_invoice: string;
  domain: string;
  productType: string;
  amount: string;
  status: string;
  paymentMethod: string | null;
}

const BillingHistory: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [domainList, setDomainList] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const BillingDetails: BillingDetail[] = [
    {
      TransactID: "12309864nc32",
      customerName: "Demo purpose",
      date_invoice: "Jan 30 2024",
      description: "Purchase Google <br /> Workspace Starter plan",
      domain: "examplepetstore.com",
      productType: "Google workspace",
      amount: "₹3.00",
      status: "Paid",
      paymentMethod: "...2354",
    },
    {
      TransactID: "12309864nc32",
      customerName: "Demo 1",
      date_invoice: "Jan 30 2024",
      description: "Purchase Google Domain",
      domain: "example-pet-store.com",
      productType: "Google domain",
      amount: "₹648.00",
      status: "Paid",
      paymentMethod: "...2354",
    },
    {
      TransactID: "12309864nc32",
      customerName: "Demo 1",
      date_invoice: "Jan 30 2024",
      description: "Purchase domains",
      domain: "myownpersonaldomain.com, schemaphic.com",
      productType: "Google workspace + domain",
      amount: "₹648.00",
      status: "Paid",
      paymentMethod: "...2354",
    },
  ];

  // Filter logic for the search
  const filteredBillingDetails = BillingDetails.filter((detail) => {
    const isWithinDateRange =
      (!startDate || new Date(detail.date_invoice) >= startDate) &&
      (!endDate || new Date(detail.date_invoice) <= endDate);
    const matchesSearchTerm =
      detail.TransactID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      detail.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    return isWithinDateRange && matchesSearchTerm;
  });

  return (
    <div className="grid grid-cols-1">
      <div className="flex-row-between-responsive">
        <h3 className="h3-text">
        Billing History
        </h3>
      </div>
      
      <div className="grid grid-cols-1 mt-14 sm:mb-[51px] mb-[31px]">
        <div className="lg:col-start-2 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 main-sm:w-[300px] max-sm:mx-auto">
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="startDate"
              placeholder="Start Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="endDate"
              placeholder="End Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              list="brow"
              placeholder="Auto search domain list"
              className="serach-input-2"
              name="domain"
            />
            <div
              className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-custom-white rounded-b ${
                domainList.length == 0 ? "hidden" : ""
              }`}
            >
              {domainList.map((item, index) => {
                return (
                  <a
                    key={index}
                    className={`font-inter-16px-400 pl-4 py-1 ${
                      index != 0 && `border-t border-white`
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="px-4 mb-5 sm:mb-0 flex flex-row">
            <input
              type="text"
              className="serach-input-3"
              name="groupName"
              placeholder="Transaction ID, customer name"
            />
            <button
              type="button"
              className="btn-green-no-radius"
            >Search</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            className="bg-custom-white"
          >
            <tr className="">
              {[
                "Transaction ID",
                "Customer Name",
                "Date / Invoice",
                "Production Type",
                "Description",
                "Domain",
                "Payment Method",
                "Status",
                "Amount",
                "Invoice",
              ].map((header) => (
                <th
                  key={header}
                  className="th-css-2 min-w-full"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBillingDetails.map((detail, index) => (
              <tr key={index} className="text-xs text-[#434D64]">
                <td className="td-css-3 text-custom-green">
                  {detail.TransactID}
                </td>
                <td className="td-css-3 text-custom-black-5">
                  {detail.customerName}
                </td>
                <td className="td-css-3 text-custom-black-5 flex items-center flex-col">
                  {detail.date_invoice}
                  <small className="text-custom-green">12309864</small>
                </td>
                <td className="td-css-3 text-custom-black-5">
                  {detail.productType}
                </td>
                <td className="td-css-3 text-custom-black-5">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail.description.replace(/<br\s*\/?>/gi, "<br />"),
                    }}
                  />
                </td>
                <td className="td-css-3 text-custom-black-5">{detail.domain}</td>
                <td className="td-css-full-opactiy text-custom-black-5 min-w-[150px]">
                  <span className="flex items-center justify-center">
                    <img src={process.env.BASE_URL+'/images/visa.png'} alt="Visa" className="h-[13.33px] w-[39px] mr-1" />
                    <span className="font-inter-bold-xs-60percent-black">
                      {detail.paymentMethod}
                    </span>
                  </span>
                </td>
                <td className="td-css-full-opactiy text-custom-black-5">
                  <button className="btn-green-4">
                    {detail.status}
                  </button>
                </td>
                <td className="td-css-4 text-custom-green">
                  {detail.amount}
                </td>
                <td className="cursor-pointer w-full items-center text-center">
                  <button
                    type="button"
                    className="my-auto text-lg text-custom-green"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistory;