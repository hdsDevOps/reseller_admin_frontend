import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BillingDetail {
  TransactID: string;
  customerName: string;
  description: string;
  date_invoice: string;
  domain: string;
  productType: string;
  amount: string;
  status: string;
  invoice: JSX.Element;
  paymentMethod: string | null;
}

const BillingHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      invoice: <FaDownload />,
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
      invoice: <FaDownload />,
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
      invoice: <FaDownload />,
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
    <div className="flex flex-col gap-2">
      <h1 className="text-black text-[28px] font-medium mb-10">Billing History</h1>
      <div className="flex items-center flex-wrap justify-between p-4 bg-[#F9F9F9] mb-8">
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                className="border border-[#E4E4E4] bg-transparent text-[#6D6D6D] text-sm p-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholderText="Start Date"
                dateFormat="MM/dd/yyyy"
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <IoCalendarClearOutline size={20} className="text-[#000000] absolute right-8 top-1/2 transform -translate-y-1/2 font-bold" />
            </div>

            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                className="border border-[#E4E4E4] bg-transparent text-[#6D6D6D] text-sm p-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholderText="End Date"
                dateFormat="MM/dd/yyyy"
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <IoCalendarClearOutline size={20} className="text-[#000000] absolute right-8 top-1/2 transform -translate-y-1/2 font-bold" />
            </div>
            <div className="relative">
            <select
              className="border border-[#E4E4E4] bg-transparent text-[#7E7E7E] text-sm p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 w-80"
              onClick={toggleDropdown}
            >
              <option value="" disabled selected hidden>
                Auto search domain list
              </option>
              <option value="option1" className="text-gray-300">
                Robertclive@schemaphic.com
              </option>
              <option value="option2" className="text-gray-300">
                Robertclive@domain.co.in
              </option>
              <option value="option3" className="text-gray-300">
                Robertclive@hordanso.com
              </option>
            </select>
            <IoIosArrowDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            />
          </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Transaction ID, customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="placeholder:text-black placeholder:text-xs outline-none border border-[#E4E4E4] bg-transparent text-gray-700 p-2 pl-6 pr-10  w-80"
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#12A833] text-white p-2 w-24"
                onClick={() => {}}
              >
                Search
              </button>
            </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
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
                  className="p-3 text-center text-[14px] font-semibold bg-[#F7FAFF] text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBillingDetails.map((detail, index) => (
              <tr key={index} className="text-xs text-[#434D64]">
                <td className="px-2 pb-10 pt-3 text-center text-[#12A833]">
                  {detail.TransactID}
                </td>
                <td className="px-2 pb-10 pt-3 text-center">
                  {detail.customerName}
                </td>
                <td className="px-2 pb-10 pt-3 text-center flex items-center flex-col">
                  {detail.date_invoice}
                  <small className="text-[#12A833] text-xs">12309864</small>
                </td>
                <td className="px-2 pb-10 pt-3 text-center">
                  {detail.productType}
                </td>
                <td className="px-2 pb-10 pt-3 text-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail.description.replace(/<br\s*\/?>/gi, "<br />"),
                    }}
                  />
                </td>
                <td className="px-2 pb-10 pt-3 text-center">{detail.domain}</td>
                <td className="px-2 pb-10 pt-3 text-center">
                  <span className="flex items-center justify-center">
                    <img src="/images/visa.png" alt="Visa" className="h-4 mr-1" />
                    <span className="text-[0.75rem] text-gray-600 font-semibold">
                      {detail.paymentMethod}
                    </span>
                  </span>
                </td>
                <td className="px-2 pb-10 pt-3 text-center">
                  <button className="bg-[#12A833] text-white hover:bg-opacity-95 w-[80px] h-[30px] rounded">
                    {detail.status}
                  </button>
                </td>
                <td className="px-2 pb-10 pt-3 text-center text-[#12A833] font-medium">
                  {detail.amount}
                </td>
                <td className="px-2 pb-10 pt-6 cursor-pointer flex items-center justify-center text-green-500 text-xl">
                  {detail.invoice}
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
