import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import '../../styles/styles.css';
import { getContactUsThunk, updateContactUsThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialContactUs = {
  content_description: "",
  phone_no: "",
  email: "",
  address: ""
}

const ContactSection = () => {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const contactItems = [
    { topic: 'Page Description', name: 'content_description', placeholder: 'Enter the text here',},
    { topic: 'Call Us', name: 'phone_no', placeholder: 'Enter the contact number here with country code',},
    { topic: 'email ID', name: 'email', placeholder: 'Enter the email id here',},
    { topic: 'address', name: 'address', placeholder: 'Enter the address here',},
  ];
  const [contactData, setContactData] = React.useState(initialContactUs);
  console.log("contact", contactData);
  
  const [newContactData, setNewContactData] = useState(contactData);
  
  const fetchContactUs = async() => {
    try {
      const result = await dispatch(getContactUsThunk()).unwrap();
      setContactData(result);
    } catch (error) {
      setContactData(initialContactUs);
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
    fetchContactUs();
  }, []);

  const handleInputChange = e => {
    setNewContactData({
      ...newContactData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newContactData?.content_description === "" || newContactData?.content_description.trim() === "" || newContactData?.phone_no === "" || newContactData?.phone_no.trim() === "" || newContactData?.email === "" || newContactData?.email.trim() === "" || newContactData?.address === "" || newContactData?.address.trim() === "") {
      toast.warning("Please fill all the fields");
    } else {
      setIsEditModalOpen(false);
      try {
        const updateContactUs = await dispatch(updateContactUsThunk({
          content_description: newContactData.content_description,
          phone_no: newContactData.phone_no,
          email: newContactData.email,
          address: newContactData.address
        }));
        setTimeout(() => {
          toast.success(updateContactUs?.payload.message);
        }, 1000);
      } catch (error) {
        toast.error("Error updating contact us");
      } finally {
        fetchContactUs();
      }
    }
  };

  const convertToPhoneNumber = (phoneString) => {
    return phoneString.replace(/\D/g, '');
  };

  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {
          setIsEditModalOpen(true);
          setNewContactData(contactData);
        }}>
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
                      className="px-3 text-center banner-table-td-1 py-2 w-[20px]"
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
        onClose={() => {
          setIsEditModalOpen(false);
          setNewContactData(contactData);
        }}
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
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewContactData(contactData);
                    }}
                  >+</button>
                </div>
              </div>

              <form className="grid sm:grid-cols-2 grid-cols-1 gap-4" onSubmit={handleSubmit}>
                {
                  contactItems.map((item, index) => {
                    return(
                      <div
                        className="flex flex-col"
                        key={index}
                      >
                        <label className="search-input-label">{item.topic}</label>
                        <input
                          type={item.name == 'email' ? 'email' : 'text'}
                          name={item.name}
                          className="w-full search-input-text"
                          placeholder={item.placeholder}
                          // defaultValue={item.name == 'phone_no' ? convertToPhoneNumber(contactData[item.name]) : contactData[item.name]}
                          defaultValue={newContactData[item.name]}
                          onChange={handleInputChange}
                        />
                      </div>
                    )
                  })
                }

                <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setNewContactData(contactData);
                    }}
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
