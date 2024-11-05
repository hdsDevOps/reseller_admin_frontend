import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';

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
        <div className="flex-row-between mr-10">
          <h3 className="h3-text">
            Customers Management
          </h3>
          <button
            type="button"
            className="bg-custom-green px-5 py-[7px] w-[139px] h-[40px] rounded-[10px] font-inter-16px-400-white float-right"
          >
            +&nbsp;&nbsp;Add new
          </button>
        </div>

        <div className="flex-row-between mt-[58px] mr-[40px]">
          <div className="flex flex-row">
            <input
              type="checkbox"
              className="w-3 h-3 border border-black mt-[12px] mr-[6px]"
            />
            <p className="font-inter-bold text-[14px] opacity-60 text-custom-blue mt-[8px]">
              Select All
            </p>
          </div>
          <div className="flex flex-row">
            <select className="mr-2 w-[198px] h-[38px] select-notification">
              <option selected hidden>
                Select a notification
              </option>
            </select>

            <button
              type="button"
              className="w-[79px] h-[38px] btn-blue"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex-row-between py-4 mr-[40px]">
          <div
            className="grid grid-cols-1 min-[968px]:grid-cols-2"
          >
            <div className="w-[300px] px-4">
              <input
                list="brow"
                placeholder="Auto search domain list"
                className="serach-input"
                name="domain"
                onChange={handleFilterChange}
                value={filters.domain}
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
            <div className="w-[300px] px-4 min-[968px]:mt-0 mt-[15px]">
              <input
                className="serach-input"
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
              className="btn-green w-[80px] h-[38px]"
              onClick={() => {
                setFilterShow(true);
              }}
            >
              Filter
            </button>
          </div>
        </div>
        
        <div
          className={`fixed-full-screen ${
            !filterShow ? "hidden" : ""
          }`}
        >
          <div className="fixed-popup max-w-xl w-full">
            <div className="flex-row-between px-8 pt-2 pb-4 border-b-[1px] border-cWhite3">
              <h3 className="text-xl font-medium">Filter</h3>
              <button
                type="button"
                className="btn-close mt-[-4px]"
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

            <div className="flex-row-end px-8 pt-4 pb-2">
              <button
                type="button"
                className="btn-light-green w-[90px] h-[38px]"
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

            <div className="flex flex-col pb-8 border-b-[1px] border-cWhite3">
              <div className="flex flex-row px-4 py-2">
                <div className="w-1/2 px-4">
                  <select
                    className="select-input"
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
                    className="select-input"
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
                    className="select-input"
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
                    className="select-input"
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
                    className="serach-input"
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
                    className="serach-input"
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

            <div className="flex-row-end pt-8 pb-4 px-8">
              <div className="flex flex-row">
                <button
                  type="button"
                  className="btn-blue w-[90px] h-[38px] mr-4"
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
                  className="btn-green w-[90px] h-[38px]"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-[20px]">
          <table className="min-w-[1100px]">
            <thead className="h-[53px] thead-css">
              <tr>
                {tableHeads?.map((item, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className="w-[95px] th-css"
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
                        className="td-css"
                      >#{item.customerId}</td>
                      <td
                        className="td-css text-[#1F86E5] underline"
                      >
                        <a
                          onClick={() => navigate('/customer-information', { state: {customerId: item.customerId} })}
                          className="cursor-pointer"
                        >{item.name}</a>
                      </td>
                      <td
                        className="td-css w-[180px]"
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
                        className="td-css"
                      >{item.domain}</td>
                      <td
                        className="td-css"
                      >{item.subscriptionPlan}</td>
                      <td
                        className="td-css"
                      >{item.licenseUsage}</td>
                      <td
                        className="td-css"
                      >
                        {new Intl.DateTimeFormat("en-GB", options).format(
                          new Date(item.createDate)
                        )}
                      </td>
                      <td
                        className="td-css"
                      >{item.paymentCycle}</td>
                      <td
                        className="td-css"
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
                            className="w-20 h-[22px] active-status"
                          >
                            Active
                          </button> : <button
                            type="button"
                            className="w-20 h-[22px] inactive-status"
                          >
                            Inactive
                          </button>
                        }
                      </td>
                      <td>
                        <button
                          type="button"
                          className="w-[33.66px] h-[33.66px] text-custom-green border border-custom-green rounded-full"
                        >
                          <Ellipsis
                            className="w-[19px] m-auto"
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