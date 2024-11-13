import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import '../../styles/styles.css';

const FooterSection = () => {
  const [showModal, setShowModal] = React.useState(false);
  const footerItems = [
    { topic: 'Heading', name: 'heading',},
    { topic: 'Menu', name: 'menu',},
  ];

  const [footerData, setFooterData] = useState([
    {heading: 'Marketing', menu: [
      {name: 'Video', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'SEO', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'SMO', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Mobile', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Campaign', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Terms & Conditions', value: 'https://simplify.jobs/', type: 'url'},
    ]},
    {heading: 'Websites', menu: [
      {name: 'Domain Name', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Design', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Hosting', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'WordPress', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Develop', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Privacy & Policy', value: 'https://simplify.jobs/', type: 'url'},
    ]},
    {heading: 'Contact Us', menu: [
      {name: 'Address 1', value: 'Hordanso LLC 4364 Western Center Blvd PMB 2012 Fort Worth', type: 'text'},
      {name: 'Call Us', value: '+1 469-893-0678', type: 'number'},
      {name: 'Email ID', value: 'contact@hordanso.com', type: 'email'},
      {name: 'Address 2', value: 'Hordanso LTD 479 Ikorodu Rd, Ketu, Lagos 100243', type: 'text'},
      {name: 'Call Us', value: '+2348060440510', type: 'number'},
      {name: 'Email ID', value: 'contact@hordanso.ng', type: 'email'},
    ]},
    {heading: 'Our NewsLetter', menu: [
      {name: 'Description', value: 'From mobile apps, marketing & websites; to automation & extreme software engineering. We tackle the difficult & not so easy technical issues of today in the always on digital world of tomorrow.', type: 'text'},
    ]},
    {heading: 'Social Link', menu: [
      {name: 'Twitter', value: 'www.twitter.com', type: 'url'},
      {name: 'Facebook', value: 'www.facebook.com', type: 'url'},
      {name: 'Pinterest', value: 'www.pinterest.com', type: 'url'},
      {name: 'Instagram', value: 'www.instagram.com', type: 'url'},
      {name: 'Youtube', value: 'www.youtube.com', type: 'url'},
    ]}
  ]);
  console.log(footerData);
  

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {setShowModal(true)}}>
          EDIT
        </button>
      </div>
      <div className="space-y-4">
        {
          footerData.map((footer, index) => {
            return(
              <div
                className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
                key={index}
              >
                <table
                  className="sm:px-7 px-2 min-w-full"
                >
                  <tbody>
                    {
                      footerItems.map((item, i) => {
                        if(i == 1){
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-[6px] sm:pl-7 pl-1 "
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2 w-[50px]"
                              >:</td>
                              <td
                                className={`banner-table-td-2 py-1 pr-7 text-black ${
                                  ""// item.name == "title" ? "font-medium" : "font-normal"
                                }`}
                              >
                                {
                                  footer?.menu.map((me, n) => {
                                    return(
                                      <tr
                                        key={n}
                                        className="py-0"
                                      >
                                        <td
                                          className="banner-table-td-1 w-[150px] py-2 sm:pl-7 pl-1"
                                        >{me.name}</td>
                                        <td
                                          className="px-3 text-center banner-table-td-1 py-2"
                                        >:</td>
                                        <td
                                          className={`banner-table-td-2 py-2 pr-7 ${
                                            me.type == 'url' ? 'text-custom-blue-9 cursor-pointer underline' : 'text-black'
                                          }`}
                                        >
                                          {
                                            me.type == 'url' ? <a onClick={() => {window.open(me.value)}}>{me.value}</a> : me.value
                                          }
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-2 sm:pl-7 pl-1"
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2 w-[50px]"
                              >:</td>
                              <td
                                className={`banner-table-td-1 py-3 sm:pl-7 pl-1`}
                              >
                                {footer[item.name]}
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
          })
        }
      </div>
      {/* <FooterEditModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      /> */}
      <Dialog
        open={showModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {setShowModal(false)}}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Edit about us</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {setShowModal(false)}}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid grid-cols-1 max-h-[400px] overflow-y-scroll"
                >
                  {
                    footerData && footerData.map((footer, index) => {
                      return(
                        <div
                          key={index}
                          className="flex flex-col"
                        >
                          <label
                            className="search-input-label"
                          >{footer.heading}</label>
                          <div
                            className="search-input-text-2 p-3"
                          >
                            {
                              index < 2 && (
                                <div
                                  className={`flex flex-row ${
                                    index < 2 ? 'gap-4 justify-between' : ''
                                  }`}
                                >
                                  <div
                                    className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                  >
                                    <div
                                      className="sm:col-span-1 flex flex-col"
                                    >
                                      <label
                                        className="search-input-label"
                                      >Name</label>
                                      <input
                                        type="text"
                                        className="search-input-text"
                                        placeholder="Enter the name"
                                      />
                                    </div>
                                    <div
                                      className="sm:col-span-2 flex flex-col"
                                    >
                                      <label
                                        className="search-input-label"
                                      >Link</label>
                                      <input
                                        type="text"
                                        className="search-input-text"
                                        placeholder="Enter the link"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className={`flex flex-col items-center justify-center w-9 h-[46px] border border-custom-white rounded-[5px] sm:mt-3 my-auto`}
                                    type="button"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-4 h-4 text-custom-gray-6"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 4v16m8-8H4"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              )
                            }

                            {
                              index == 2 && (
                                <div
                                  className={`flex flex-col h-[235px] mb-3`}
                                >
                                  <label
                                    className="search-input-label"
                                  >Content</label>
                                  <div
                                    className="search-input-text w-full font-inter font-normal text-custom-black-4 text-base min-h-full py-4 pr-2"
                                  >
                                    <Editor
                                      apiKey={process.env.TINY_MCE_API}
                                      init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: ["lists", "link", "image", "paste"],
                                        toolbar:
                                          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                                      }}
                                      // initialValue={block.description}
                                      // onEditorChange={(content) => {
                                      //   const newResources = [...resources];
                                      //   newResources[index] = {
                                      //     ...resource,
                                      //     description: content,
                                      //   };
                                      //   console.log(newResources);
                                        
                                      // }}
                                    />
                                  </div>
                                </div>
                              )
                            }

                            {
                              index == 3 && (
                                <div
                                  className="flex flex-col"
                                >
                                  <label
                                    className="search-input-label"
                                  >Content Description</label>
                                  <input
                                    type="text"
                                    className="search-input-text"
                                    placeholder="Enter the news letter"
                                  />
                                </div>
                              )
                            }

                            {
                              index == 4 && (
                                <div
                                  className={`grid sm:grid-cols-3 grid-cols-1 gap-4 w-full`}
                                >
                                  {
                                    footer.menu.map((social, ind) => {
                                      return(
                                        <div
                                          key={ind}
                                          className="sm:col-span-2 flex flex-col"
                                        >
                                          <label
                                            className="search-input-label"
                                          >{social.name}</label>
                                          <input
                                            type="text"
                                            className="search-input-text"
                                            placeholder="Enter the link"
                                            defaultValue={social.value}
                                          />
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="flex flex-row max-sm:justify-center gap-3 pt-4">
                    <button
                      type="button"
                      // onClick={handleSubmit}
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
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

export default FooterSection;
