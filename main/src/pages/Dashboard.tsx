import React, { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { RiDownloadCloud2Line } from "react-icons/ri";
import '../styles/styles.css';
import { RiExchangeDollarFill } from "react-icons/ri";
import { PieChart, Pie, Cell, Label } from "recharts";
import {format} from 'date-fns';
import { Chart } from "react-google-charts";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  // console.log("userDetails...", userDetails);
  const location = useLocation();
  const revenue = [
    {name: 'Revenue Last Month', amount: '₹0.05k',},
    {name: 'monthly Recurring Income', amount: '₹0.07k',},
    {name: 'Customers in Stripe', amount: '14',},
    {name: 'Customers this month', amount: '0',},
  ];

  const data1 = [
    { name: "Group A", value: 75 },
    { name: "Group B", value: 25 },
  ];
  const COLORS = ['#12A833', '#EEEEEE',];

  const data = [
    ["", ""],
    ["Jan", 16],
    ["Feb", 8],
    ["Mar", 18],
    ["Apr", 13],
    ["May", 10],
    ["Jun", 20],
    ["Jul", 13],
    ["Aug", 14],
    ["Sep", 20],
    ["Oct", 17],
    ["Nov", 13],
    ["Dec", 18],
  ];
  const options = {
    // chart: {
    //   title: "Company Performance",
    //   subtitle: "Sales and Expenses over the Years",
    // },
    colors: ["#12A833", "#FFC700"],
    bar: {groupWidth: "15%"},
    chartArea: { width: '50%' },
  };

  useEffect(() => {
    if(location.state?.from == "otp"){
      toast.success("Login successful!");
    }
  }, [location.state]);

  const customers = [
    {name: 'A', start_date: '2024-02-10', end_date: '2024-12-31'},
    {name: 'B', start_date: '2024-03-10', end_date: '2024-10-31'},
    {name: 'C', start_date: '2024-04-10', end_date: '2024-05-31'},
    {name: 'D', start_date: '2024-02-10', end_date: '2024-02-31'},
    {name: 'E', start_date: '2024-03-10', end_date: '2024-12-31'},
    {name: 'F', start_date: '2024-03-10', end_date: '2024-10-31'},
    {name: 'G', start_date: '2024-04-10', end_date: '2024-11-31'},
    {name: 'H', start_date: '2024-05-10', end_date: '2024-09-31'},
    {name: 'I', start_date: '2024-01-10', end_date: '2024-01-31'},
    {name: 'J', start_date: '2024-05-10', end_date: '2024-06-31'},
    {name: 'K', start_date: '2024-04-10', end_date: '2024-11-31'},
    {name: 'L', start_date: '2024-05-10', end_date: '2024-10-31'},
    {name: 'M', start_date: '2024-04-10', end_date: '2024-09-31'},
    {name: 'N', start_date: '2024-01-10', end_date: '2024-06-31'},
    {name: 'O', start_date: '2024-08-10', end_date: '2024-09-31'},
    {name: 'P', start_date: '2024-09-10', end_date: '2024-10-31'},
    {name: 'Q', start_date: '2024-10-10', end_date: '2024-12-31'},
    {name: 'R', start_date: '2024-12-10', end_date: '2024-12-31'},
    {name: 'S', start_date: '2024-10-10', end_date: '2024-12-31'},
    {name: 'T', start_date: '2024-09-10', end_date: '2024-09-31'},
    {name: 'U', start_date: '2024-11-10', end_date: '2024-12-31'},
    {name: 'V', start_date: '2024-07-10', end_date: '2024-12-31'},
    {name: 'W', start_date: '2024-06-10', end_date: '2024-12-31'},
    {name: 'X', start_date: '2024-11-10', end_date: '2024-12-31'},
    {name: 'Y', start_date: '2024-12-10', end_date: '2024-12-31'},
    {name: 'Z', start_date: '2024-01-10', end_date: '2024-02-31'},
  ];

  const getCustomersCount = (start_date:any, end_date:any) => {
    const startDate = new Date(start_date); // Start of the range
    const endDate = new Date(end_date);   // End of the range

    const betweenRange = (date:any) => {
      const testDate = new Date(date);
      if (testDate >= startDate && testDate <= endDate) {
        return true;
      } else {
        return false;
      }
    };

    const beforeDate = (date1:any, date2:any) => {
      const testDate1 = new Date(date1);
      const testDate2 = new Date(date2);
      if(testDate1 <= startDate && testDate2 >= startDate) {
        return true;
      } else {
        return false;
      }
    }

    const newCustomers = customers.filter((item) => betweenRange(item?.start_date));
    const oldCustomers = customers.filter((item) => beforeDate(item?.start_date, item?.end_date));
    return {
      new_customers: newCustomers.length,
      old_customers: oldCustomers.length
    };
  };

  console.log(getCustomersCount('2024-02-01', '2024-02-28'))

  return (
    <div
      className='flex flex-col px-2 max-[400px]:px-0'
    >
      <ToastContainer />
      <div
        className='flex flex-row justify-between'
      >
        <h3
          className='h3-text ml-[10px]'
        >Dashboard</h3>

        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-[79px] h-[31px] mt-auto border border-[#0C63FF] rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
        >
          <div className="flex flex-row justify-between text-[#0C63FF] gap-[10px]">
            <RiDownloadCloud2Line />
            <p className="text-[18px] font-inter font-medium text-xs">Export</p>
          </div>
          <input id="file-upload" type="file" className="hidden" name='export' />
        </label>
      </div>

      <div
        className="mt-2 py-12"
      >
        <div
          className="p-5 bg-white border border-custom-white shadow-lg rounded-[10px]"
        >
          <h6
            className="mt-1 font-inter font-medium text-[25px] text-custom-green"
          >Welcome to your dashboard, {userDetails?.first_name} {userDetails?.last_name}</h6>
          <p
            className="mt-[3px] font-inter font-light text-xs text-black"
          >Great to see you back again!</p>
        </div>
      </div>

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
                  <p className="font-inter font-normal text-xs text-black opacity-50 text-nowrap">{rev.name}</p>
                  <h4 className="font-inter font-medium text-2xl text-[#434D64]">{rev.amount}</h4>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-[18px] py-6">
        <div className="lg:col-span-2 col-span-1 border border-custom-white shadow-md rounded-lg flex flex-col">
          <p
            className="p-4 font-inter font-bold text-base tracking-[1px] text-black opacity-50 border-b border-[#D0D3D8]"
          >Revenue Distribution</p>

          <div className="w-full my-auto">
            <PieChart width={200} height={200} className="mx-auto">
              <Pie
                data={data1}
                // cx={120}
                // cy={100}
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                  value="Total"
                  position="center"
                  dy={-15}
                  style={{ fontSize: '12px', fontWeight: 'normal', fill: '#333' }}
                />
                <Label
                  value={data1[0].value}
                  dy={15}
                  position="centerBottom"
                  style={{ fontSize: '24px', fontWeight: 'bold', fill: '#333' }}
                />
              </Pie>
            </PieChart>
            
            <div
              className="flex flex-col justify-end text-end p-5 gap-2"
            >
              <p className="font-inter font-bold text-base tracking-[1px] text-[#2A2B2D]">TEXT_SUB (100%)</p>
              <p className="font-inter font-normal text-base text-[#727A8B]">Why are my stats inaccurate?</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 col-span-1 border border-custom-white shadow-md rounded-lg flex flex-col justify-center">
          <p
            className="p-4 font-inter font-bold text-base tracking-[1px] text-black opacity-50 border-b border-[#D0D3D8]"
          >Growth in the last 12 months</p>

          <div
            className="p-5 flex flex-row justify-between"
          >
            <p className="font-inter font-bold text-base tracking-[1px] text-[#1A202C]">Spending Statistics</p>
            <div className="flex flex-row justify-between w-[110px]">
              <button><ChevronLeft className="text-[6px] text-[#1A202C]" /></button>
              <p className="font-inter font-bold text-base tracking-[1px] text-[#1A202C]">2024</p>
              <button><ChevronRight className="text-[6px] text-[#1A202C]" /></button>
            </div>
          </div>
          <div
            className="px-5 pb-5"
          >
            <Chart
              width="100%"
              height="270px"
              chartType="Bar"
              data={data}
              options={options}
            />
          </div>

          <div className="flex min-[1190px]:flex-row max-[1190px]:flex-col max-lg:flex-row max-[860px]:flex-col items-center justify-between px-5 pt-2 pb-5">
            <div className="flex flex-row gap-1">
              <div className="w-[12px] h-[12px] bg-[#FFC700] rounded-full my-auto"></div>
              <p className="font-inter font-normal text-base text-[#727A8B]">New customer</p>
            </div>
            <div className="flex flex-row gap-1">
              <div className="w-[12px] h-[12px] bg-[#12A833] rounded-full my-auto"></div>
              <p className="font-inter font-normal text-base text-[#727A8B]">Old customer</p>
            </div>
            <div className="flex flex-row gap-1">
              <div className="w-[12px] h-[12px] bg-[#905F00] rounded-full my-auto"></div>
              <p className="font-inter font-normal text-base text-[#727A8B]">Monthly Recurring Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
