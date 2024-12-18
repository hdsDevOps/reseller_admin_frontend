import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { getEmailLogsThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowRightLeft } from 'lucide-react';

const EmailLog: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [emailLogs, setEmailLogs] = useState([]);
  console.log("emailLogs...", emailLogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const tableHeads = [
    {name: "email", label: "Email"},
    {name: "subject", label: "Subject"},
    {name: "created_at", label: "Sent date"},
    {name: "no_receipt", label: "Number of Recipient"},
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

  return (
    <div className="grid grid-cols-1">
      <h3 className="my-[7px] h3-text">Email Log</h3>
      
      <div className="overflow-x-auto p-[13px] mt-[33px]">
        <table className="w-full min-w-[800px]">
          <thead className='h-14 bg-gray-200'>
            <tr className="bg-gray-100">
              {
                tableHeads && tableHeads.map((item, index) => {
                  return(
                    <th key={index} className="th-css">
                      <span>{item.label}</span>
                      {
                        item?.name === "action" ? "" :
                        <span className="ml-1"><button type="button" onClick={() => {
                          //
                        }}><ArrowRightLeft className="w-3 h-3 rotate-90" /></button></span>
                      }
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              emailLogs?.length>0 ? emailLogs.map((log, index) => (
                <tr 
                  key={index}
                  className=""
                >
                  <td className="td-css-3">{log?.email}</td>
                  <td className="td-css-3">{log?.subject}</td>
                  <td className="td-css-3">{dateToIsoString(log?.created_at)}</td>
                  <td className="td-css-3">{log?.no_receipt}</td>
                  <td className="text-center">
                    <button 
                      className="view-details"
                      cypress-name={`view-details-${index+1}`}
                      onClick={() => {
                        setIsModalOpen(true);
                        setModalData(log?.content);
                      }}
                    >
                      View Details
                    </button>
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
              className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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