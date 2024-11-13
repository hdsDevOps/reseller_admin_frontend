import React, { useState } from "react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface SEOData {
  contentTitle: string;
  contentDescription: string;
  altImageText: string;
  image: string;
  keywords: string;
  urlLink: string;
}

const SEO = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seoData, setSeoData] = useState({
    contentTitle: "Landing Page",
    contentDescription: "",
    altImageText: "",
    image: "images/flower-image.png",
    keywords: "",
    urlLink: "",
  });
  const seoTable = [
    { label: 'Content Title', name: 'contentTitle'},
    { label: 'Content Description', name: 'contentDescription'},
    { label: 'Alt Image Text', name: 'altImageText'},
    { label: 'Image', name: 'image'},
    { label: 'Keywords', name: 'keywords'},
    { label: 'URL Link', name: 'urlLink'},
  ];

  const editSeoTable = [
    { label: 'Title', name: 'contentTitle', placeholder: 'Enter the title', type: 'text',},
    { label: 'Description', name: 'contentDescription', placeholder: 'Enter the description meta tags with comma separator;', type: 'text',},
    { label: 'Alt Image Text', name: 'altImageText', placeholder: 'Enter the description meta tags with comma separator;', type: 'text',},
    { label: 'Keywords', name: 'keywords', placeholder: 'Enter the keywords here with comma separator;', type: 'text',},
    { label: 'Image', name: 'image', placeholder: 'Add image', type: 'file',},
    { label: 'URL Link', name: 'urlLink', placeholder: 'Enter URL link', type: 'text',},
  ];

  const handleSave = (updatedData: SEOData) => {
    setSeoData(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {setIsModalOpen(true)}}>
          EDIT
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div
          className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
        >
          <table
            className="sm:px-7 px-2 min-w-full"
          >
            <tbody>
              {
                seoTable.map((item, index) => {
                  return(
                    <tr
                      key={index}
                    >
                      <td className="banner-table-td-1 w-[70px] pl-7 py-3">{item.label}</td>
                      <td className="px-3 text-center banner-table-td-1 w-[50px] py-3">:</td>
                      <td className="banner-table-td-2 py-3">
                        {
                          item.label == "Image" ?
                          <img
                            src={process.env.BASE_URL+seoData[item.name]}
                            alt={seoData.altImageText}
                            className="w-[50%] min-w-24 max-w-40"
                          />
                          : seoData[item.name]
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {setIsModalOpen(false)}}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Edit SEO</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {setIsModalOpen(false)}}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid sm:grid-cols-2 grid-cols-1 gap-4"
                >
                  {
                    editSeoTable.map((menu, index) => {
                      if(menu.type == 'file'){
                        return(
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center md:w-48 w-full h-[163px] border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100 md:mx-0 mx-auto"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    aria-hidden="true"
                                    className="w-[57px] h-[43px] mb-1 mt-3 text-gray-400"
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
                                <p className="mb-2 text-sm text-gray-500">{menu.placeholder}</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" />
                          </label>
                        )
                      }
                      else{
                        return(
                          <div
                            key={index}
                            className="flex flex-col"
                          >
                            <label
                              className="search-input-label"
                            >{menu.label}</label>
                            <input
                              type="text"
                              className="search-input-text"
                              placeholder={menu.placeholder}
                              defaultValue={seoData[menu.name]}
                            />
                          </div>
                        )
                      }
                    })
                  }
                  <div className="sm:col-span-2 flex flex-row max-sm:justify-center gap-3 pt-4">
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
                        setIsModalOpen(false);
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

export default SEO;
