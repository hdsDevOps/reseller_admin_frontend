import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { getEmailLogsThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setCurrentPageStatus, setItemsPerPageStatus } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowRightLeft } from 'lucide-react';
import ReactPaginate from 'react-paginate';

const EmailLog: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentPageNumber, itemsPerPageNumber, rolePermissionsSlice } = useAppSelector(state => state.auth);
  const [emailLogs, setEmailLogs] = useState([]);
  console.log("emailLogs...", emailLogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const tableHeads = [
    {name: "email", label: "Email"},
    {name: "subject", label: "Subject"},
    {name: "created_at", label: "Sent date"},
    // {name: "no_receipt", label: "Number of Recipient"},
    {name: "action", label: "Action"},
  ];

  const fetchEmailLogs = async() => {
    try {
      const result = await dispatch(getEmailLogsThunk()).unwrap();
      setEmailLogs(result?.data);
    } catch (error) {
      setEmailLogs([]);
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
    fetchEmailLogs();
  }, []);

  const dateToIsoString = (date) => {
    const newDate = new Date(date);
    const isoDate = newDate.toISOString().split('T')[0];
    const formatted = format(isoDate, 'dd MMM yyyy');
    return formatted;
  };

  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageNumber);
  // Calculate displayed data based on current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = emailLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(emailLogs.length / itemsPerPage);
  // console.log({currentPage, totalPages});

  useEffect(() => {
    if(emailLogs?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, emailLogs]);

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

  return (
    <div className="grid grid-cols-1">
      <h3 className="my-[7px] h3-text">Email Log</h3>

      <div className="w-full py-3 mt-3">
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
      
      <div className="overflow-x-auto p-[13px]">
        <table className="w-full min-w-[800px]">
          <thead className='h-14 bg-gray-200'>
            <tr className="bg-gray-100">
              {
                tableHeads && tableHeads.map((item, index) => {
                  return(
                    <th key={index} className="th-css">
                      <span>{item.label}</span>
                      {/* {
                        item?.name === "action" ? "" :
                        <span className="ml-1"><button type="button" onClick={() => {
                          //
                        }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
                      } */}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              currentItems?.length>0 ? currentItems.map((log, index) => (
                <tr 
                  key={index}
                  className=""
                >
                  <td className="td-css-3">{log?.email}</td>
                  <td className="td-css-3">{log?.subject}</td>
                  <td className="td-css-3">{dateToIsoString(log?.created_at)}</td>
                  {/* <td className="td-css-3">{log?.no_receipt}</td> */}
                  <td className="text-center">
                    <button 
                      className="view-details"
                      cypress-name={`view-details-${index+1}`}
                      onClick={() => {
                        setIsModalOpen(true);
                        setModalData(log?.content);
                      }}
                      disabled={!rolePermissionsSlice?.email_log?.view_details ? true : false}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan={13} className="font-inter font-semibold text-[14px] text-black leading-6 tracking-[1px] text-center opacity-60">No data available</td>
              </tr>
            }
          </tbody>
        </table>

        <div className='flex justify-end'>
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
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsModalOpen(false);
          setModalData("");
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Email Template</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setIsModalOpen(false);
                      setModalData("");
                    }}
                    cypress-name="modal-close-btn"
                  >+</button>
                </div>
              </div>

              <div
                className="mt-8 px-8"
                dangerouslySetInnerHTML={{ __html: modalData }}
              >
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default EmailLog