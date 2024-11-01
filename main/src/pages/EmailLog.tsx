import React from 'react';

interface EmailLogEntry {
  email: string;
  subject: string;
  sentDate: string;
  numberOfRecipient: number;
}

const EmailLog = () => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-6">Email Log</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Subject</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Sent date</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Number of Recipient</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {emailLogs.map((log, index) => (
              <tr 
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">{log.email}</td>
                <td className="py-3 px-4 text-gray-700">{log.subject}</td>
                <td className="py-3 px-4 text-gray-700">{log.sentDate}</td>
                <td className="py-3 px-4 text-gray-700">{log.numberOfRecipient}</td>
                <td className="py-3 px-4">
                  <button 
                    className="text-green-600 hover:text-green-800 font-medium"
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
};

export default EmailLog;