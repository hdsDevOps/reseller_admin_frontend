import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown, FaDownload } from "react-icons/fa6";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { getBillingHistoryThunk, getPaymentMethodsListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setBillingHistoryFiltersStatus, setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ArrowRightLeft, Download, FilterX, X } from 'lucide-react';
// import html2canvas from "html2canvas";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";
const BillingInvoice = React.lazy(() => import('../components/BillingInvoice'));
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from 'date-fns';
import ReactPaginate from "react-paginate";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import './DateRangePickerPlaceholder.css';

interface RangeType<T> {
  label: string;
  value: [T, T] | ((value: T[]) => [T, T]);
  placement?: string;
  closeOverlay?: boolean;
  appearance?: string;
}

const predefinedRanges: RangeType<Date>[] = [
  { label: "Today", value: [new Date(), new Date()], placement: "left" },
  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last week",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
];

const initialFilter = {
  start_date: "",
  end_date: "",
  domain: "",
  search_data: "",
  sortdata: {
    sort_text: "",
    order: "asc"
  }
}

const BillingHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filterRef = useRef(null);
  const { billingHistoryFilters, currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [domainList, setDomainList] = useState([]);
  const pdfRef = useRef();
  // console.log("pdfRef...", pdfRef.current);
  const [pdfDownload, setPdfDownload] = useState('hidden');
  const [paymentMethods, setPaymentMethods] = useState([]);
  // console.log("payment methods....", paymentMethods);
  const [currentInvoiceData, setCurrentInvoiceData] = useState<object|null>(null);

  const [logoUrl, setLogoUrl] = useState("");
  // console.log("logo url...", logoUrl);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const [filter, setFilter] = useState(billingHistoryFilters === null ? initialFilter : billingHistoryFilters);
  // console.log("filter...", filter);

  useEffect(() => {
    const setBillingHistoryFiltersSlice = async() => {
      await dispatch(setBillingHistoryFiltersStatus(filter));
    }

    setBillingHistoryFiltersSlice();
  }, [filter]);

  const [searchData, setSearchData] = useState("");
  

  const [billingHistory, setBillingHistory] = useState([]);
  // console.log("billingHistory...", billingHistory);
  const [initialBillingHistory, setInitialBillingHistory] = useState([]);

  const [range, setRange] = useState<[Date | null, Date | null]|null>(null);

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  useEffect(() => {
    if(range === null) {
      setFilter({
        ...filter,
        start_date: "",
        end_date: "",
      });
    } else {
      setFilter({
        ...filter,
        start_date: `${range[0] === null ? "" : format(range[0], "yyyy-MM-dd")}`,
        end_date: `${range[1] === null ? "" : format(range[1], "yyyy-MM-dd")}`,
      });
    }
  }, [range]);
  
  const handleRangeChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const tableHeads = [
    {name: "transaction_id", label: "Transaction ID"},
    {name: "customer_name", label: "Customer Name"},
    {name: "created_at", label: "Date / Invoice"},
    {name: "product_type", label: "Product Type"},
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
          await dispatch(removeUserAuthTokenFromLSThunk());
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    fetchBillingHistory();
  }, [filter]);

  const fetchInitialBillingHistory = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk(initialFilter)).unwrap();
      setInitialBillingHistory(result?.data);
    } catch (error) {
      setBillingHistory([]);
      if(error?.message == "Request failed with status code 401") {
        try {
          await dispatch(removeUserAuthTokenFromLSThunk());
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    fetchInitialBillingHistory();
  }, []);

  const getPaymentMethodsList = async() => {
    try {
      const result = await dispatch(getPaymentMethodsListThunk()).unwrap();
      setPaymentMethods(result?.data);
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  const getUsedPaymentMethod = (method) => {
    const found = paymentMethods?.find(item => item?.method_name?.toLowerCase() === method?.toLowerCase());
    if(found) {
      return found?.method_image;
    }
  }

  useEffect(() => {
    getPaymentMethodsList();
  }, []);

  const handleChangeFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  
  const [currentPage, setCurrentPage] = useState(billingHistoryFilters === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(billingHistoryFilters === null ? 20 : itemsPerPageNumber);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = billingHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);
  // console.log({currentPage, totalPages});

  useEffect(() => {
    if(billingHistory?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, billingHistory]);

  useEffect(() => {
    const setCurrentPageNumberSlice = async() => {
      await dispatch(setCurrentPageStatus(currentPage));
    }

    setCurrentPageNumberSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageSlice = async() => {
      await dispatch(setItemsPerPageStatus(itemsPerPage));
    }

    setItemsPerPageSlice();
  }, [itemsPerPage]);

  const convertImageToBase64 = async (url) => {
    const response = await fetch(url, { mode: 'no-cors' });
    console.log('===========response',response)
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const downloadInvoice = async() => {
    // await setPdfDownload("fixed z-[9999] left-0 top-0");

    const element = pdfRef.current;
    console.log("element,,,", element);
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,  // Allow CORS requests for images
      allowTaint: true,
      logging: true
    });
    const imgData = canvas.toDataURL('image/png');

    if (imgData.startsWith('data:image/png;base64,')) {
      console.log(imgData);
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = 210;
      const PdfHeight = 297;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const scaleFactor = Math.min(pdfWidth / imgWidth, PdfHeight / imgHeight);

      const adjustedWidth = (imgWidth * scaleFactor) - 10;
      const adjustedHeight = (imgHeight * scaleFactor) - 10;

      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (PdfHeight - adjustedHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, 0, adjustedWidth, adjustedHeight);

      pdf.save('invoice.pdf');
    } else {
      console.error("Image data is invalid or empty", imgData);
    }

    // setPdfDownload('hidden');
  };

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = (parseInt(seconds) * 1000) + (parseInt(nanoseconds) / 1e6);

    const date = new Date(miliseconds);
    if(date == "Invalid Date") {
      return "Invalid Date";
    } else {
      return format(date, "dd MMM yyyy");
    }
  };

  const [search, setSearch] = useState("");
  // console.log("search", search);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  // console.log("isDropdownOpen", isDropdownOpen);
  
  const handleClickOutsideInput = (event: MouseEvent) => {
    if(filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideInput);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideInput);
    };
  }, []);

  useEffect(() => {
    if(initialBillingHistory?.length > 0 && search?.length > 0) {
      setIsDropdownOpen(true);
    }
  }, [initialBillingHistory, search])

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col justify-start">
        <h3 className="h3-text">
        Billing History
        </h3>
        <p className="text-gray-900 text-sm mt-1">
        View your billing details and download invoices
        </p>
        {/* View your billing details and download invoices */}
      </div>
      
      <div className="grid grid-cols-1 mt-14 mb-3">
        <div className="lg:col-start-2 grid xl:grid-cols-3 min-[900px]:grid-cols-2 grid-cols-1 min-md:w-[300px] max-md:mx-auto">
          <div className="px-4 mb-5 sm:mb-0 w-full">
            <DateRangePicker
              range={predefinedRanges}
              placeholder="Select Subscription Date Range"
              style={{ width: '100%' }}
              onChange={handleRangeChange}
              value={range}
              showHeader={false}
              renderValue={renderValue} // Custom render for the selected value
              calendarSnapping={true}
              cleanable
              size="lg"
            />
          </div>
          <div
            className='px-4 mb-5 sm:mb-0 relative'
            ref={filterRef}
          >
            <input
              list="brow"
              placeholder="Auto search domain list relative"
              className="serach-input-2"
              name="domain"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setSearch(e.target.value);}}
              value={search}
              onFocus={() => {setIsDropdownOpen(true)}}
            />
            <div className={`absolute right-0  -mt-7 w-full pointer-events-none`}>
              <FaChevronDown className={`ml-auto mr-5 ${isDropdownOpen ? "rotate-180" : ""} transition duration-300`} />
            </div>
            {
              isDropdownOpen && initialBillingHistory?.filter(history => history?.domain?.toLowerCase()?.includes(search?.toLowerCase())).length > 0 && (
                <div className='absolute flex flex-col py-1 2xl:w-[90%] min-[1450px]:w-[89%] min-[1350px]:w-[88%] xl:w-[87%] min-[900px]:w-[90%] md:w-[94%] min-[415px]:w-[90%] w-[88%] bg-custom-white rounded-b max-h-40 overflow-y-auto z-[9999] border'>
                  {
                    initialBillingHistory?.filter((history, idx, self) => self?.findIndex(h => h?.domain === history?.domain) === idx)?.filter(history => history?.domain.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                      <p
                        key={index}
                        className={`font-inter-16px-400 pl-4 py-1 ${
                          index !== 0 ? "border-t border-white" : ""
                        } cursor-pointer`}
                        onClick={() => {
                          setSearch(item?.domain);
                          setFilter({
                            ...filter,
                            domain: item?.domain
                          });
                          setIsDropdownOpen(false);
                        }}
                      >{item?.domain}</p>
                    ))
                  }
                </div>
              )
            }
          </div>
          <div className="px-4 mb-5 sm:mb-0 flex flex-row">
            <input
              type="text"
              className="serach-input-3"
              name="search_data"
              placeholder="Transaction ID, name"
              onChange={e => {setSearchData(e.target.value)}}
              value={searchData}
            />
            <button
              type="button"
              className="btn-green-no-radius"
              onClick={() => {
                setFilter({
                  ...filter,
                  search_data: searchData
                })
              }}
            >Search</button>

            <button
              className="ml-1"
              type="button"
              onClick={() => {
                setFilter(initialFilter);
                setSearchData("");
                setSearch("");
                setRange(null);
              }}
            >
              <FilterX
                className="text-[20px] text-custom-green"
              />
            </button>
          </div>
          </div>
      </div>

      <div className="w-full py-3">
        <div className="flex items-center justify-start gap-1">
          <select
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value));
            }}
            value={itemsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20} selected>20</option>
            <option value={50}>50</option>
          </select>
          <label>items</label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            // className="bg-custom-white"
            style={{backgroundColor: '#E4E4E4'}}
          >
            <tr className="">
              {tableHeads.map((header, index) => (
                <th
                  key={index}
                  className="th-css-2 text-nowrap px-2 h-[46px] min-w-full"
                >
                  <span>{header.label}</span>
                  {
                    header?.name === "domain" || header?.name === "customer_name"  || header?.name === "created_at"  || header?.name === "amount" ?
                    <span className="ml-1"><button type="button" onClick={() => {
                      setFilter({
                        ...filter,
                        sortdata: {
                          sort_text: header.name,
                          order: filter?.sortdata?.sort_text === header.name
                          ? filter?.sortdata?.order === "desc"
                            ? "asc"
                            : "desc"
                          : "asc"
                        }
                      })
                    }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span> : ""
                  }
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              currentItems?.length>0 ? currentItems?.map((detail, index) => (
                <tr key={index} className="text-xs text-[#434D64]" style={{margin: '4px 0'}}>
                  <td className="billing-history-td billing-history-td-text-custom-green">
                    {detail?.transaction_id}
                  </td>
                  <td className="billing-history-td text-custom-black-5">
                    {/* {`${detail?.first_name} ${detail?.last_name}`} */}
                    {detail?.customer_name}
                  </td>
                  <td className="td-custom-css">
                    {/* <a>{detail?.date_invoice || ' '}</a> */}
                    <div>
                      <p>{formatDate(detail?.date?._seconds, detail?.date?._nanoseconds)}</p>
                      <p className="billing-history-td-text-custom-green">{detail?.invoice}</p>
                    </div>
                  </td>
                  <td className="billing-history-td text-custom-black-5">
                    {detail?.product_type || ' '}
                  </td>
                  <td className="billing-history-td text-custom-black-5">
                    {detail?.description || ' '}
                  </td>
                  <td className="billing-history-td text-custom-black-5">{detail?.domain || ' '}</td>
                  <td className="billing-history-td-full-opactiy text-custom-black-5 min-w-[150px]">
                    <span className="flex items-center justify-center">
                      {/* <img src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa.png?alt=media&token=793767a0-a14e-4f5a-a6e4-fc490119413a"} alt="Visa" className="h-[13.33px] w-[39px] mr-1" />
                      <span className="font-inter-bold-xs-60percent-black">
                        {detail?.paymentMethod || ' '}
                      </span> */}
                      {
                        getUsedPaymentMethod(detail?.payment_method)
                        ? (
                          <img src={getUsedPaymentMethod(detail?.payment_method)} alt={detail?.payment_method} className="h-6 object-contain mr-1" />
                        ) : (
                          <img src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa.png?alt=media&token=793767a0-a14e-4f5a-a6e4-fc490119413a"} alt="Visa" className="h-6 object-contain mr-1" />
                        )
                      }
                      <span className="font-inter-bold-xs-60percent-black capitalize">...{detail?.transaction_data?.payment_method_details?.card?.last4 || "0000"}</span>
                    </span>
                  </td>
                  <td className="billing-history-td-full-opactiy text-custom-black-5">
                    <button className="btn-green-4-customer uppercase">
                      {detail?.payment_status || ' '}
                    </button>
                  </td>
                  <td className="billing-history-td billing-history-td-text-custom-green">
                    {detail?.amount || ' '}
                  </td>
                  <td className="cursor-pointer w-full items-center text-center">
                    <button
                      type="button"
                      className="my-auto text-lg billing-history-td-text-custom-green"
                      // onClick={() => {downloadInvoice()}}
                      onClick={() => {
                        setIsInvoiceOpen(true);
                        setCurrentInvoiceData(detail);
                      }}
                      disabled={!rolePermissionsSlice?.billing_history?.download ? true : false}
                      cypress-name="invoice_download"
                    >
                      <FaDownload />
                    </button>

                    {/* <div className={pdfDownload}>
                      <BillingInvoice pdfRef={pdfRef} data={detail} paymentMethods={paymentMethods} />
                    </div> */}
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
          </tbody>
        </table>

        <div className="flex justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                }}
                disabled={currentPage === totalPages - 1}
                className={`px-3 py-1 text-sm ${
                  currentPage === totalPages - 1
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-r transition`}
              >
                Next
              </button>
            )}
            onPageChange={(event) => {
              setCurrentPage(event.selected);
              // console.log(event.selected);
            }}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel={(
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 0));
                }}
                disabled={currentPage === 0}
                className={`px-3 py-1 text-sm ${
                  currentPage === 0
                    ? "bg-transparent text-gray-300"
                    : "bg-transparent text-black hover:bg-green-500 hover:text-white"
                } rounded-l transition`}
              >
                Prev
              </button>
            )}

            containerClassName="flex justify-start"

            renderOnZeroPageCount={null}
            className="pagination-class-name"

            pageClassName="pagination-li"
            pageLinkClassName="pagination-li-a"

            breakClassName="pagination-ellipsis"
            breakLinkClassName="pagination-ellipsis-a"

            activeClassName="pagination-active-li"
            activeLinkClassName	="pagination-active-a"
          />
        </div>
      </div>

      <Dialog
        open={isInvoiceOpen}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={() => {
          setIsInvoiceOpen(false);
          setCurrentInvoiceData(null);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-[600px] max-h-[600px] overflow-auto bg-white py-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="w-full flex justify-between mb-3 px-4">
                <Download
                  className="h-5 text-[#12A833] cursor-pointer"
                  onClick={() => {downloadInvoice()}}
                />
                <X
                  className="h-5 text-[#12A833] cursor-pointer"
                  onClick={() => {
                    setIsInvoiceOpen(false);
                    setCurrentInvoiceData(null);
                  }}
                />
              </div>
              <BillingInvoice pdfRef={pdfRef} data={currentInvoiceData} paymentMethods={paymentMethods} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BillingHistory;