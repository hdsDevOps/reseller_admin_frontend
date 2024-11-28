import React from 'react';
import '../styles/styles.css';

interface EmailLogEntry {
  email: string;
  subject: string;
  sentDate: string;
  numberOfRecipient: number;
};

const EmailLog: React.FC = () => {
  const emailLogs: EmailLogEntry[] = [
    {
      email: "Johndoe@gmail.com",
      subject: "Email Verification",
      sentDate: "12 Jan 2024",
      numberOfRecipient: 3,
    },
    {
      email: "Johndoe@gmail.com",
      subject: "OTP verification",
      sentDate: "12 Jan 2024",
      numberOfRecipient: 5,
    },
  ];

  const tableHeads = ['Email', 'Subject', 'Sent date', 'Number of Recipient', 'Action']

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
                    <th key={index} className="th-css">{item}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {emailLogs.map((log, index) => (
              <tr 
                key={index}
                className=""
              >
                <td className="td-css-3">{log.email}</td>
                <td className="td-css-3">{log.subject}</td>
                <td className="td-css-3">{log.sentDate}</td>
                <td className="td-css-3">{log.numberOfRecipient}</td>
                <td className="text-center">
                  <button 
                    className="view-details"
                    onClick={() => console.log(`View details for ${log.email}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmailLog