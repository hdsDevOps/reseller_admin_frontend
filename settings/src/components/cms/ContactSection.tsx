import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import '../../styles/styles.css';

const ContactSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const contactItems = [
    { topic: 'Page Description', name: 'pageDescription', placeholder: 'Enter the text here',},
    { topic: 'Call Us', name: 'callUs', placeholder: 'Enter the contact number here',},
    { topic: 'Email ID', name: 'email', placeholder: 'Enter the email id here',},
    { topic: 'Address', name: 'address', placeholder: 'Enter the address here',},
  ];
  const [contactData, setContactData] = React.useState({
    pageDescription: "For any information not hesitate to reach us.",
    callUs: "+1 469-893-0678",
    email: "contact@hordanso.com",
    address: "Hordanso LLC 4364 Western Center Blvd PMB 2012 Fort Worth"
  });

  const handleInputChange = e => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const convertToPhoneNumber = (phoneString) => {
    return phoneString.replace(/\D/g, '');
  };

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {setIsEditModalOpen(true)}}>
          EDIT
        </button>
      </div>
      <div
        className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
      >
        <table
          className="sm:px-7 px-2 min-w-full"
        >
          <tbody>
            {
              contactItems.map((item, i) => {
                return(
                  <tr key={i}>
                    <td
                      className="banner-table-td-1 w-[100px] py-2 sm:pl-7 pl-1"
                    >{item.topic}</td>
                    <td
                      className="px-3 text-center banner-table-td-1 py-2"
                    >:</td>
                    <td
                      className={`banner-table-td-2 py-2 pr-7 text-black ${
                        ""// item.name == "title" ? "font-medium" : "font-normal"
                      }`}
                    >
                      {contactData[item.name]}
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
      </div>
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {setIsEditModalOpen(false)}}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Edit contact us
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {setIsEditModalOpen(false)}}
                  >+</button>
                </div>
              </div>

              <form className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                {
                  contactItems.map((item, index) => {
                    return(
                      <div
                        className="flex flex-col"
                        key={index}
                      >
                        <label className="search-input-label">{item.topic}</label>
                        <input
                          type={item.name == 'callUs' ? 'number' : item.name == 'email' ? 'email' : 'text'}
                          name={item.name}
                          className="w-full search-input-text"
                          placeholder={item.placeholder}
                          defaultValue={item.name == 'callUs' ? convertToPhoneNumber(contactData[item.name]) : contactData[item.name]}
                          onChange={handleInputChange}
                        />
                      </div>
                    )
                  })
                }

                <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {setIsEditModalOpen(false)}}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ContactSection;