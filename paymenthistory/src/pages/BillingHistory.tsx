import React, { useEffect, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { getBillingHistoryThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { FilterX } from 'lucide-react';

const initialFilter = {
  start_date: "",
  end_date: "",
  domain_id: "",
  search_data: ""
}

const BillingHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [domainList, setDomainList] = useState([]);

  const [filter, setFilter] = useState(initialFilter);
  console.log("filter...", filter);
  

  const [billingHistory, setBillingHistory] = useState([]);
  console.log(billingHistory);
  

  const fetchBillingHistory = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk(filter)).unwrap();
      setBillingHistory(result?.data);
    } catch (error) {
      setBillingHistory([]);
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  const handleChangeFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = billingHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);

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
              name="start_date"
              placeholder="Start Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
              onChange={handleChangeFilter}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              type="text"
              className="serach-input-2 placeholder-black"
              name="end_date"
              placeholder="End Date"
              onFocus={e => {
                e.target.type='date'
              }}
              onBlur={e => {
                e.target.type='text'
              }}
              onChange={handleChangeFilter}
            />
          </div>
          <div className="px-4 mb-5 sm:mb-0">
            <input
              list="brow"
              placeholder="Auto search domain list"
              className="serach-input-2"
              name="domain_id"
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
              name="search_data"
              placeholder="Transaction ID, customer name"
              onChange={handleChangeFilter}
            />
            <button
              type="button"
              className="btn-green-no-radius"
            >Search</button>

            <button className="ml-1">
              <FilterX
                className="text-[20px] text-custom-green"
              />
            </button>
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
            {currentItems?.map((detail, index) => (
              <tr key={index} className="text-xs text-[#434D64]">
                <td className="td-css-3 text-custom-green">
                  {detail?.transaction_id}
                </td>
                <td className="td-css-3 text-custom-black-5">
                  {`${detail?.first_name} ${detail?.last_name}`}
                </td>
                <td className="td-css-3 text-custom-black-5 flex items-center flex-col">
                  <a>{detail?.date_invoice || ' '}</a>
                  <small className="text-custom-green">12309864</small>
                </td>
                <td className="td-css-3 text-custom-black-5">
                  {detail?.productType || ' '}
                </td>
                <td className="td-css-3 text-custom-black-5">
                  {detail?.description || ' '}
                </td>
                <td className="td-css-3 text-custom-black-5">{detail?.domain || ' '}</td>
                <td className="td-css-full-opactiy text-custom-black-5 min-w-[150px]">
                  <span className="flex items-center justify-center">
                    <img src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa.png?alt=media&token=793767a0-a14e-4f5a-a6e4-fc490119413a"} alt="Visa" className="h-[13.33px] w-[39px] mr-1" />
                    <span className="font-inter-bold-xs-60percent-black">
                      {detail?.paymentMethod || ' '}
                    </span>
                  </span>
                </td>
                <td className="td-css-full-opactiy text-custom-black-5">
                  <button className="btn-green-4">
                    {detail?.status || ' '}
                  </button>
                </td>
                <td className="td-css-4 text-custom-green">
                  {detail?.amount || ' '}
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

        <div className="flex flex-col mt-12 relative bottom-2 right-0">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`px-3 py-1 text-sm ${
                currentPage === 0
                  ? "bg-transparent text-gray-300"
                  : "bg-transparent hover:bg-green-500 hover:text-white"
              } rounded-l transition`}
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-3 py-1 text-sm mx-1 rounded ${
                  currentPage === index
                    ? "bg-green-500 text-white"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } transition`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className={`px-3 py-1 text-sm ${
                currentPage === totalPages - 1
                  ? "bg-transparent text-gray-300"
                  : "bg-transparent hover:bg-green-500 hover:text-white"
              } rounded-r transition`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;