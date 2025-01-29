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
import { ArrowRightLeft, FilterX } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const BillingInvoice = React.lazy(() => import('../components/BillingInvoice'));
import { format } from 'date-fns';
import ReactPaginate from "react-paginate";

const initialFilter = {
  start_date: "",
  end_date: "",
  domain: "",
  search_data: ""
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
  console.log("payment methods....", paymentMethods);

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
  }, [filter]);

  const fetchInitialBillingHistory = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk(initialFilter)).unwrap();
      setInitialBillingHistory(result?.data);
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
      await dispatch(setCurrentPageStatus(currentPage)).unwrap();
    }

    setCurrentPageNumberSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageSlice = async() => {
      await dispatch(setItemsPerPageStatus(itemsPerPage)).unwrap();
    }

    setItemsPerPageSlice();
  }, [itemsPerPage]);

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
    const miliseconds = (parseInt(seconds) * 1000) + (parseInt(nanoseconds) / 1e6);

    const date = new Date(miliseconds);

    const formattedDate = format(new Date(date?.toISOString()), "dd MMM yyyy");
    return formattedDate;
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
      <div className="flex-row-between-responsive">
        <h3 className="h3-text">
        Billing History
        </h3>
      </div>
      
      <div className="grid grid-cols-1 mt-14 sm:mb-[51px] mb-[31px]">
        <div className="lg:col-start-2 grid xl:grid-cols-4 min-[900px]:grid-cols-2 grid-cols-1 min-md:w-[300px] max-md:mx-auto">
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
              value={filter?.start_date}
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
              value={filter?.end_date}
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
                    header?.name === "transaction_id" || header?.name === "customer_name"  || header?.name === "created_at"  || header?.name === "amount" ?
                    <span className="ml-1"><button type="button" onClick={() => {
                      //
                    }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span> : ""
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
                  <td className="td-custom-css">
                    {/* <a>{detail?.date_invoice || ' '}</a> */}
                    <p>{formatDate(detail?.date?._seconds, detail?.date?._nanoseconds)}</p>
                    <p className="text-custom-green">{detail?.invoice}</p>
                  </td>
                  <td className="td-css-3 text-custom-black-5">
                    {detail?.product_type || ' '}
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
                  <td className="td-css-full-opactiy text-custom-black-5">
                    <button className="btn-green-4 uppercase">
                      {detail?.payment_status || ' '}
                    </button>
                  </td>
                  <td className="td-css-4 text-custom-green">
                    {detail?.amount || ' '}
                  </td>
                  <td className="cursor-pointer w-full items-center text-center">
                    <button
                      type="button"
                      className="my-auto text-lg text-custom-green"
                      onClick={() => {downloadInvoice()}}
                      disabled={!rolePermissionsSlice?.billing_history?.download ? true : false}
                      cypress-name="invoice_download"
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
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
          </tbody>
        </table>

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
  );
};

export default BillingHistory;