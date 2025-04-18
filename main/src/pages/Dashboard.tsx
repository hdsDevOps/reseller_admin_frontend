import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { RiDownloadCloud2Line } from "react-icons/ri";
import '../styles/styles.css';
import { RiExchangeDollarFill } from "react-icons/ri";
import { PieChart, Pie, Cell, Label } from "recharts";
import {format} from 'date-fns';
import { Chart } from "react-google-charts";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { monthlyRevenueDataThunk, yearlySpendingStatisticsThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';

const initialMonthlyRevenueData = {
  last_month_revenue: "0",
  current_month_recurring_income: "0",
  customers_who_use_stripe: "0",
  new_customers_count_this_month: "0"
};

const current_date = new Date();

const initialYearlySpendingStatistics = {
  year: current_date.getFullYear(),
  current_month_revenue: 0,
  data: [
    {
        month: "Jan",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Feb",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Mar",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Apr",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "May",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Jun",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Jul",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Aug",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Sep",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Oct",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Nov",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    },
    {
        month: "Dec",
        revenue_from_old_customers: 0,
        revenue_from_new_customers: 0
    }
  ]
};

const Dashboard: React.FC = () => {
  const { userDetails, defaultCurrency } = useAppSelector((state) => state.auth);
  // console.log("defaultCurrency", defaultCurrency);
  // console.log("userDetails...", userDetails);
  const pdfRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [monthlyRevenueData, setMonthlyRevenueData] = useState(initialMonthlyRevenueData);
  // console.log("monthlyRevenueData...", monthlyRevenueData);
  const [yearlySpendingStatistics, setYearlySpendingStatistics] = useState([initialYearlySpendingStatistics]);
  // console.log("yearlySpendingStatistics...", yearlySpendingStatistics);
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log("Current index...", currentIndex);
  const [currentRevenueData, setCurrentRevenueData] = useState(yearlySpendingStatistics[currentIndex]);
  // console.log("currentRevenueData...", currentRevenueData);
  useEffect(() => {
    setCurrentRevenueData(yearlySpendingStatistics?.length>0 ? yearlySpendingStatistics[currentIndex] : initialYearlySpendingStatistics);
  }, [yearlySpendingStatistics, currentIndex]);

  const currencyList = [
    { name: 'EUR', logo: '€',},
    { name: 'AUD', logo: 'A$',},
    { name: 'USD', logo: '$',},
    { name: 'NGN', logo: 'N₦',},
    { name: 'GBP', logo: '£',},
    { name: 'CAD', logo: 'C$',},
    { name: 'INR', logo: '₹',},
  ];

  const currencyLogo = () => {
    if(defaultCurrency !== '' || defaultCurrency !== null || defaultCurrency !== undefined) {
      const data = currencyList.find(item => item?.name === defaultCurrency);
      return data?.logo;
    } else {
      return "$";
    }
  };

  const changeIndex = (buttonType: string) => {
    const length = yearlySpendingStatistics?.length;
    if(currentIndex === 0 && length === 1) {
      setCurrentIndex(0);
    } else if(length > 1) {
      if(currentIndex === 0) {
        console.log("no next");
        if(buttonType === "prev") {
          setCurrentIndex(currentIndex + 1);
        } else {
          //
        }
      } else if(currentIndex > 0 && length - currentIndex > 1) {
        console.log("next + prev");
        if(buttonType === "prev") {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(currentIndex - 1);
        }
      } else if(currentIndex > 0 && length - currentIndex <= 1) {
        console.log("no prev");
        if(buttonType === "prev") {
          //
        } else {
          setCurrentIndex(currentIndex - 1);
        }
      }
    }
  };

  const revenue = [
    {label: 'Revenue Last Month', name: 'last_month_revenue',},
    {label: 'Monthly Recurring Revenue', name: 'current_month_recurring_income',},
    {label: 'Customers in Stripe', name: 'customers_who_use_stripe',},
    {label: 'Customers this month', name: 'new_customers_count_this_month',},
  ];

  const data1 = [
    { name: "Group A", value: 75 },
    { name: "Group B", value: 25 },
  ];
  const COLORS = ['#12A833', '#EEEEEE',];

  useEffect(() => {
    const getMonltyRevenueData = async() => {
      try {
        const result = await dispatch(monthlyRevenueDataThunk({currency: defaultCurrency})).unwrap();
        setMonthlyRevenueData(result?.result);
      } catch (error) {
        setMonthlyRevenueData(initialMonthlyRevenueData);
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

    getMonltyRevenueData();
  }, [defaultCurrency]);

  useEffect(() => {
    const getYearlySpendingStatistics = async() => {
      try {
        const result = await dispatch(yearlySpendingStatisticsThunk()).unwrap();
        setYearlySpendingStatistics(result?.result);
      } catch (error) {
        setYearlySpendingStatistics([]);
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
    
    getYearlySpendingStatistics();
  }, []);

  useEffect(() => {
    if(location.state?.from == "otp"){
      toast.success("Login successful!");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const maxMonth = currentRevenueData?.data?.reduce((max, current) => {
    const total_revenue = current.revenue_from_new_customers + current.revenue_from_old_customers;
    if(total_revenue > max.total_revenue) {
      return { month: current.month, total_revenue};
    }
    return max;
  },{
    month: null,
    total_revenue: 0
  });  

  const roundToUpper5x = (num: any) => Math.ceil(num / 5) * 5;

  const makeTheArray = (num: any) => {
    const roundedValue = roundToUpper5x(num);
    const step = roundedValue / 5;

    return Array.from({ length: 6 }, (_,i) => i*step).reverse();
  };

  const getHeight = (item) => {
    const newRevenue = item?.revenue_from_new_customers;
    const oldRevenue = item?.revenue_from_old_customers;

    const max = roundToUpper5x(maxMonth?.total_revenue);

    const yellowHeight = (newRevenue/max)*100;
    const greenHeight = (oldRevenue/max)*100;
    return {yellowHeight, greenHeight, max};
  };

  const exportPdf = async() => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

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

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, adjustedWidth, adjustedHeight);

    pdf.save('revenue.pdf');
  };

  useEffect(() => {
    console.log((currentRevenueData?.current_month_revenue/roundToUpper5x(maxMonth?.total_revenue)) * 100)
    // console.log(currentRevenueData?.current_month_revenue)
  }, [currentRevenueData]);

  return (
    <div
      className='flex flex-col px-2 max-[400px]:px-0'
    >
      <div
        className='flex flex-row justify-between'
      >
        <h3
          className='dashboard-header ml-[10px]'
        >Dashboard</h3>

        <button
          className="flex items-center justify-center w-[79px] h-[31px] mt-auto border border-[#0C63FF] rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
          onClick={() => {exportPdf()}}
        >
          <div className="flex flex-row justify-between text-[#0C63FF] gap-[10px]">
            <RiDownloadCloud2Line />
            <p className="text-[18px] font-inter font-medium text-xs">Export</p>
          </div>
        </button>
      </div>

      <div
        className="mt-2 py-12"
      >
        <div
          className="p-5 bg-white border border-custom-white shadow-lg rounded-[10px]"
        >
          <h6
            className="dashboard-name"
          >Welcome to your dashboard, {userDetails?.first_name} {userDetails?.last_name}</h6>
          <p
            className="mt-[3px] font-inter font-light text-xs text-black"
          >Great to see you back again!</p>
        </div>
      </div>

      <div className="grid grid-cols-1" ref={pdfRef}>
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[10px]"
        >
          {
            revenue?.map((rev, index) => {
              return(
                <div
                  className="flex flex-row rounded-[15px] px-4 py-6 bg-white border border-custom-white shadow-md gap-2"
                  key={index}
                >
                  <RiExchangeDollarFill
                    className="text-xl text-custom-green"
                  />
          
                  <div
                    className="flex flex-col"
                  >
                    <p className="font-inter font-normal text-xs text-black opacity-50 text-nowrap">{rev.label}</p>
                    <h4 className="revenue-count">{rev.name === "last_month_revenue" ? currencyLogo() : rev.name === "current_month_recurring_income" ? currencyLogo() : ""}{monthlyRevenueData[rev.name]}</h4>
                  </div>
                </div>
              )
            })
          }
        </div>
        
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-[18px] py-6 w-full">
          {/* COMMENTING WAS GIVING ERROR, HAS COPIED IT TO revenue.tsx file */}

          {/* THIS IS A DIFFERENT PART */}
          {/* <div className="lg:col-span-3 col-span-1 border border-custom-white shadow-md rounded-lg flex flex-col w-full"> */}
          <div className="lg:col-span-5 col-span-1 border border-custom-white shadow-md rounded-lg flex flex-col w-full">
            <p
              className="p-4 font-inter font-bold text-base tracking-[1px] text-black opacity-50 border-b border-[#D0D3D8] top-0"
            >Growth (Yearly)</p>

            <div
              className="statistics-year-section"
            >
              <p className="font-inter font-bold text-base tracking-[1px] text-[#1A202C]">Spending Statistics</p>
              <div className="flex flex-row justify-between w-[110px]">
                <button
                  type="button"
                  onClick={() => {
                    if(currentIndex > 0) {
                      changeIndex("prev");
                    } else {
                      //
                    }
                  }}
                  style={currentIndex > 0 ? {} : {cursor: "not-allowed"}}
                  disabled={currentIndex > 0 ? false : true}
                ><ChevronLeft className="text-[6px] text-[#1A202C]" /></button>
                <p className="font-inter font-bold text-base tracking-[1px] text-[#1A202C] mx-auto">{currentRevenueData?.year}</p>
                <button
                  type="button"
                  onClick={() => {
                    if(currentIndex < yearlySpendingStatistics?.length - 1) {
                      changeIndex("next");
                    } else {
                      //
                    }
                  }}
                  style={currentIndex < yearlySpendingStatistics?.length - 1 ? {} : {cursor: "not-allowed"}}
                  disabled={currentIndex < yearlySpendingStatistics?.length - 1 ? false : true}
                ><ChevronRight className="text-[6px] text-[#1A202C]" /></button>
              </div>
            </div>
            <div
              className="px-5 grid grid-cols-1 w-full overflow-y-auto"
            >
              <div className="relative w-full h-[260px] p-1 flex min-w-[500px] justify-between">
                <div className="w-7 mt-[5px]">
                  {
                    makeTheArray(maxMonth?.total_revenue)?.map((number, index) => (
                      <div
                        key={index}
                        className="h-[40px]"
                      ><p className="my-auto font-plusJakarta font-semibold text-[10px] text-[#14141F99] tracking-[-2%] text-center">{number}</p></div>
                    ))
                  }
                </div>
                <div
                  className="w-full h-full"
                >
                  <div className="w-full p-3 h-full flex flex-col justify-end">
                    <div
                      className="grid grid-cols-12 h-full"
                    >
                      {
                        currentRevenueData?.data?.map((item, index) => (
                          <div key={index} className="flex flex-col items-center gap-3">
                            {/* Bar */}
                            <div className={`w-3 h-full flex flex-col mt-auto`}>
                              <div className={`w-full h-[${getHeight(item)?.yellowHeight}%] bg-[#FFC700] rounded-t-[25px] bottom-0 mt-auto`}></div>
                              <div className={`w-full h-[${getHeight(item)?.greenHeight}%] bg-[#12A833] ${item?.newCustomerRevenue === 0 ? "rounded-t-[25px] mt-auto" : ""} bottom-0`}></div>
                            </div>
                            {/* Month Label */}
                            <p className="font-plusJakarta font-semibold text-[10px] text-[#14141F99] tracking-[-2%]">{item?.month}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div
                    className="absolute top-4 left-0 w-full h-full pointer-events-none z-[-1]"
                  >
                    {
                      makeTheArray(maxMonth?.total_revenue)?.map((number, index) => (
                        <div
                          key={index}
                          className="h-[40px] px-9 w-full"
                        >
                          <div
                            className="h-px bg-[#F0F0F0]"
                          ></div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="w-7 mt-[5px]">
                  {
                    makeTheArray(maxMonth?.total_revenue)?.map((number, index) => (
                      <div
                        key={index}
                        className="h-[40px]"
                      ><p className="my-auto font-plusJakarta font-semibold text-[10px] text-[#14141F99] tracking-[-2%] text-center">{number}</p></div>
                    ))
                  }
                </div>

                <div className={`absolute w-full px-14 pb-[58px] pr-16 top-[18px] h-full`}>
                  <div className={`border-b-4 border-[#905F00] h-[${100- ((currentRevenueData?.current_month_revenue/roundToUpper5x(maxMonth?.total_revenue)) * 100)}%] `}></div>
                </div>
              </div>
            </div>

            <div className="flex min-[1190px]:flex-row max-[1190px]:flex-col max-lg:flex-row max-[860px]:flex-col items-center justify-between px-5 pt-2 pb-5">
              <div className="flex flex-row gap-1">
                <div className="color-show bg-[#FFC700] rounded-full my-auto"></div>
                <p className="color-show-text">New customer</p>
              </div>
              <div className="flex flex-row gap-1">
                <div className="color-show bg-[#12A833] rounded-full my-auto"></div>
                <p className="color-show-text">Old customer</p>
              </div>
              <div className="flex flex-row gap-1">
                <div className="color-show bg-[#905F00] rounded-full my-auto"></div>
                <p className="color-show-text">Monthly Recurring Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
