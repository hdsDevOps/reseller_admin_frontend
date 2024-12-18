import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { getBillingHistoryThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ArrowRightLeft, FilterX } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const BillingInvoice = React.lazy(() => import('../components/BillingInvoice'));
import { format } from 'date-fns';

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
  const pdfRef = useRef();
  // console.log("pdfRef...", pdfRef.current);
  const [pdfDownload, setPdfDownload] = useState('hidden');

  const [filter, setFilter] = useState(initialFilter);
  // console.log("filter...", filter);
  

  const [billingHistory, setBillingHistory] = useState([]);
  console.log("billingHistory...", billingHistory);

  const tableHeads = [
    {name: "transaction_id", label: "Transaction ID"},
    {name: "customer_name", label: "Customer Name"},
    {name: "created_at", label: "Date / Invoice"},
    {name: "production_type", label: "Production Type"},
    {name: "description", label: "Description"},
    {name: "domain", label: "Domain"},
    {name: "payment_method", label: "Payment Method"},
    {name: "payment_status", label: "Status"},
    {name: "amount", label: "Amount"},
    {name: "invoice", label: "Invoice"},
  ];

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

  const downloadInvoice = async() => {
    await setPdfDownload("fixed z-[9999] left-[-9999px]");
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,  // Allow CORS requests for images
      allowTaint: true, 
    });
    const imgData = canvas.toDataURL('image/png');

    if (imgData.startsWith('data:image/png;base64,')) {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save('invoice.pdf');
    } else {
      console.error("Image data is invalid or empty", imgData);
    }

    setPdfDownload('hidden');
  };

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);

    const formattedDate = format(date, "dd MMM yyyy");
    return formattedDate;
  };

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
            {
              domainList.length > 0 ?
              (
                <div
                  className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-custom-white rounded-b`}
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
              ) : null
            }
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
              {tableHeads.map((header, index) => (
                <th
                  key={index}
                  className="th-css-2 text-nowrap px-2 h-[46px] min-w-full"
                >
                  <span>{header.label}</span>
                  {
                    header?.name === "invoice" ? "" :
                    <span className="ml-1"><button type="button" onClick={() => {
                      //
                    }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
                  }
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              currentItems?.length>0 ? currentItems?.map((detail, index) => (
                <tr key={index} className="text-xs text-[#434D64]">
                  <td className="td-css-3 text-custom-green">
                    {detail?.transaction_id}
                  </td>
                  <td className="td-css-3 text-custom-black-5">
                    {/* {`${detail?.first_name} ${detail?.last_name}`} */}
                    {detail?.customer_name}
                  </td>
                  <td className="td-css-3 text-custom-black-5 flex items-center flex-col">
                    {/* <a>{detail?.date_invoice || ' '}</a> */}
                    <a>{formatDate(detail?.created_at?._seconds,detail?.created_at?._nanoseconds)}</a>
                    <small className="text-custom-green">12309864</small>
                  </td>
                  <td className="td-css-3 text-custom-black-5">
                    {detail?.production_type || ' '}
                  </td>
                  <td className="td-css-3 text-custom-black-5">
                    {detail?.description || ' '}
                  </td>
                  <td className="td-css-3 text-custom-black-5">{detail?.domain || ' '}</td>
                  <td className="td-css-full-opactiy text-custom-black-5 min-w-[150px]">
                    <span className="flex items-center justify-center">
                      {/* <img src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa.png?alt=media&token=793767a0-a14e-4f5a-a6e4-fc490119413a"} alt="Visa" className="h-[13.33px] w-[39px] mr-1" />
                      <span className="font-inter-bold-xs-60percent-black">
                        {detail?.paymentMethod || ' '}
                      </span> */}
                      <span className="font-inter-bold-xs-60percent-black">{detail?.payment_method}</span>
                    </span>
                  </td>
                  <td className="td-css-full-opactiy text-custom-black-5">
                    <button className="btn-green-4 uppercase">
                      {detail?.payment_status || ' '}
                    </button>
                  </td>
                  <td className="td-css-4 text-custom-green">
                    ${detail?.amount || ' '}
                  </td>
                  <td className="cursor-pointer w-full items-center text-center">
                    <button
                      type="button"
                      className="my-auto text-lg text-custom-green"
                      onClick={() => {downloadInvoice()}}
                    >
                      <FaDownload />
                    </button>

                    <div className={pdfDownload}>
                      <BillingInvoice pdfRef={pdfRef} data={detail} />
                    </div>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data avaibale</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

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
  );
};

export default BillingHistory;