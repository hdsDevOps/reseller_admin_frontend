import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filterShow, setFilterShow] = useState(false);
  const [filters, setFilters] = useState({
    domain: "",
    country: "",
    region: "",
    authorization: "",
    license: "",
    subscription: "",
    renewal: "",
    name: "",
  });
  const [domainList, setDomainList] = useState([]);
  const [data, setData] = useState([]);
  console.log(filters);

  const getData = () => {
    axios
      .get(`http://localhost:8080/customers`)
      .then((res) => {
        setData(res.data);
      })
      .catch(err => {
        setData([]);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthorizeChange = (item) => {
    axios
      .patch(`http://localhost:8080/edit-customer/${item.customerId}`, { makeAuthorization: !item.makeAuthorization})
      .then(res => {
        getData();
      })
      .catch(err => console.log(err))
  };

  const tableHeads = [
    '',
    "Customer ID",
    "Name",
    "Product",
    "Domain",
    "Subscription Plan",
    "License Usage",
    "Create Date",
    "Payment Cycle",
    "Renewed Date",
    "Make Authorization",
    "Status",
    "Action",
  ];

  return (
    <div
      className="grid grid-cols-1"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between mr-[40px]">
          <h3 className="font-inter font-medium text-[28px]">
            Customers Management
          </h3>
          <button
            type="button"
            className="bg-[#12A833] px-[20px] py-[7px] w-[139px] h-[40px] rounded-[10px] font-inter font-normal text-base text-[#FFFFFF] float-right"
          >
            +&nbsp;&nbsp;Add new
          </button>
        </div>

        <div className="flex flex-row justify-between mt-[58px] mr-[40px]">
          <div className="flex flex-row">
            <input
              type="checkbox"
              className="w-3 h-3 border border-[#000000] mt-[12px] mr-[6px]"
            />
            <p className="font-inter font-bold text-[14px] opacity-60 text-[#0066FF] mt-[8px]">
              Select All
            </p>
          </div>
          <div className="flex flex-row">
            <select className="mr-2 w-[198px] h-[38px] rounded-[10px] border border-[#E4E4E4] bg-[#CDE9D3] pl-[15px] text-[16px] font-inter font-normal focus:outline-none">
              <option selected hidden>
                Select a notification
              </option>
            </select>

            <button
              type="button"
              className="w-[79px] h-[38px] rounded-[10px] px-[20px] py-[7px] bg-[#0084FF] text-base font-normal font-inter text-[#FFFFFF] focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between py-4 mr-[40px]">
          <div
            className="grid grid-cols-1 min-[968px]:grid-cols-2"
          >
            <div className="w-[300px] px-4">
              <input
                list="brow"
                placeholder="Auto search domain list"
                className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal text-base focus:outline-none"
                name="domain"
                onChange={handleFilterChange}
                value={filters.domain}
              />
              <div
                className={`fixed flex flex-col py-1 min-[576px]:w-[240px] max-[576px]:w-[41%] max-[520px]:w-[40%] bg-[#E4E4E4] rounded-b ${
                  domainList.length == 0 ? "hidden" : ""
                }`}
              >
                {domainList.map((item, index) => {
                  return (
                    <a
                      key={index}
                      className={`font-inter font-normal text-base pl-4 py-1 ${
                        index != 0 && `border-t border-white`
                      }`}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="w-[300px] px-4 min-[968px]:mt-0 mt-[15px]">
              <input
                className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                name="name"
                onChange={handleFilterChange}
                value={filters.name}
                placeholder="Name, Email"
              />
            </div>
          </div>
          <div
            className="min-[968px]:mt-0 mt-[27px]"
          >
            <button
              type="button"
              className="bg-[#12A833] text-white px-[20px] py-[7px] rounded-[10px] w-[80px] h-[38px]"
              onClick={() => {
                setFilterShow(true);
              }}
            >
              Filter
            </button>
          </div>
        </div>
        
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
            !filterShow ? "hidden" : ""
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
            <div className="flex flex-row justify-between px-8 pt-2 pb-4 border-b-[1px] border-[#f4f4f4]">
              <h3 className="text-xl font-medium">Filter</h3>
              <button
                type="button"
                className="text-[25px] rotate-45 mt-[-4px]"
                onClick={() => {
                  setFilterShow(false);
                  setFilters({
                    domain: "",
                    country: "",
                    region: "",
                    authorization: "",
                    license: "",
                    subscription: "",
                    renewal: "",
                    name: "",
                  });
                }}
              >
                +
              </button>
            </div>

            <div className="flex flex-row justify-end px-8 pt-4 pb-2">
              <button
                type="button"
                className="bg-[#CDE9D3] border border-[#E4E4E4] text-black px-[20px] py-[6px] rounded-[10px] w-[90px] h-[38px]"
                onClick={() => {
                  setFilters({
                    domain: "",
                    country: "",
                    region: "",
                    authorization: "",
                    license: "",
                    subscription: "",
                    renewal: "",
                    name: "",
                  });
                }}
              >
                Reset
              </button>
            </div>

            <div className="flex flex-col pb-8 border-b-[1px] border-[#f4f4f4]">
              <div className="flex flex-row px-4 py-2">
                <div className="w-1/2 px-4">
                  <select
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="country"
                    onChange={handleFilterChange}
                    value={filters.country}
                  >
                    <option selected hidden value="">
                      Select Country
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="w-1/2 px-4">
                  <select
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="region"
                    onChange={handleFilterChange}
                    value={filters.region}
                  >
                    <option selected hidden value="">
                      Select Region
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row px-4 py-2">
                <div className="w-1/2 px-4">
                  <select
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="authorization"
                    onChange={handleFilterChange}
                    value={filters.authorization}
                  >
                    <option selected hidden value="">
                      Select Authorization
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="w-1/2 px-4">
                  <select
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="license"
                    onChange={handleFilterChange}
                    value={filters.license}
                  >
                    <option selected hidden value="">
                      Licnese Usage
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row px-4 py-2">
                <div className="w-1/2 px-4">
                  <input
                    type="text"
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="subscription"
                    onChange={handleFilterChange}
                    value={filters.subscription}
                    placeholder="Subscription Date"
                    onFocus={e => {
                      e.target.type='date'
                    }}
                    onBlur={e => {
                      e.target.type='text'
                    }}
                  />
                </div>
                <div className="w-1/2 px-4">
                  <input
                    type="text"
                    className="w-full h-[38px] border border-[#E4E4E4] bg-[#F9F9F9] py-[8px] px-[9px] rounded-[8px] font-inter font-normal font-base focus:outline-none"
                    name="renewal"
                    onChange={handleFilterChange}
                    value={filters.renewal}
                    placeholder="Renewal Date"
                    onFocus={e => {
                      e.target.type='date'
                    }}
                    onBlur={e => {
                      e.target.type='text'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-8 pb-4 px-8">
              <div className="flex flex-row">
                <button
                  type="button"
                  className="bg-[#0084FF] text-white px-[20px] py-[7px] rounded-[10px] w-[90px] h-[38px] mr-4"
                  onClick={() => {
                    setFilterShow(false);
                    setFilters({
                      domain: "",
                      country: "",
                      region: "",
                      authorization: "",
                      license: "",
                      subscription: "",
                      renewal: "",
                      name: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-[#12A833] text-white px-[20px] py-[7px] rounded-[10px] w-[90px] h-[38px]"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-[20px]">
          <table className="min-w-[1100px]">
            <thead className="h-[53px] border border-[#E4E4E4] bg-[#F9F9F9]">
              <tr>
                {tableHeads?.map((item, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className="w-[95px] opacity-60 text-black font-inter text-[12.8px] text-center font-normal"
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {
                data && data.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>
                        <input type="checkbox"
                          className="w-3 h-3 border border-black"
                        />
                      </td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >#{item.customerId}</td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60 text-[#1F86E5] underline"
                      >
                        <a
                          onClick={() => navigate('/customer-information', { state: {customerId: item.customerId} })}
                          className="cursor-pointer"
                        >{item.name}</a>
                      </td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60 w-[180px]"
                      >
                        {item.product?.map((e, i) => {
                          if (i > 0) {
                            return (
                              <p key={i}>
                                + &nbsp; {e}
                              </p>
                            );
                          } else {
                            return <p key={i}>{e}</p>;
                          }
                        })}
                      </td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >{item.domain}</td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >{item.subscriptionPlan}</td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >{item.licenseUsage}</td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >
                        {new Intl.DateTimeFormat("en-GB", options).format(
                          new Date(item.createDate)
                        )}
                      </td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >{item.paymentCycle}</td>
                      <td
                        className="font-inter font-normal text-[10px] opacity-60"
                      >
                        {new Intl.DateTimeFormat("en-GB", options).format(
                          new Date(item.renewedDate)
                        )}
                      </td>
                      <td>
                        <div className="mt-[7.5px] transition-transform duration-1000 ease-in-out flex justify-center">
                          {/* {notificationToggle()} */}
                          <label className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={item.makeAuthorization}
                              onClick={() => handleAuthorizeChange(item)}
                            />
                            <div className="w-[30px] h-[15.5px] flex items-center bg-[#E02424] rounded-full peer-checked:text-[#12A833] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[12px] after:absolute after:left-[3px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#12A833]"></div>
                          </label>
                        </div>
                      </td>
                      <td
                        className="px-[7px] py-[20px]"
                      >
                        {
                          item.status ? <button
                            type="button"
                            className="w-20 h-[22px] border border-[#12A833] bg-[#F3FAF7] rounded-[10px] font-inter font-normal text-[13px] text-black"
                          >
                            Active
                          </button> : <button
                            type="button"
                            className="w-20 h-[22px] border border-[#E02424] bg-[#f9dedc] rounded-[10px] font-inter font-normal text-[13px] text-black"
                          >
                            Inactive
                          </button>
                        }
                      </td>
                      <td>
                        <button
                          type="button"
                          className="w-[33.66px] h-[33.66px] text-[#12A833] border border-[#12A833] rounded-full pl-[5px]"
                        >
                          <Ellipsis
                            className="w-[19px]"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;