import React, { useState } from "react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";

const AboutUs: React.FC = () => {
  const [isEditModalOpen,setIsEditModalOpen]=useState(false);
  const [heading, setHeading]=useState({
    heading: 'Everything you need to know About us',
    image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/bg-image.jpeg?alt=media&token=4b755044-4c3d-471d-b717-70cd1a24d97a'
  })
  const [blocks,setBlock]=useState([
    { block: 'Block 1', contentTitle: 'Make decisions faster, face to face.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/meetimage1.png?alt=media&token=c16dfe83-9303-4b2b-a6d0-fe0961b1420b'},
    { block: 'Block 2', contentTitle: 'Secure your data and devices.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/about-us.jpeg?alt=media&token=29188efe-f571-46be-b0a6-542eab7b3f48'},
  ])

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {setIsEditModalOpen(true)}}>
          EDIT
        </button>
      </div>
      <div
        className="border border-custom-white bg-custom-white p-1"
      >
        <div className="mb-3 flex flex-col">
          <div className="flex min-sm:flex-row max-sm:flex-col align-middle min-sm:gap-7 max-sm:gap-1">
            <h2 className="h2-text text-nowrap">Heading  :</h2>
            <h3 className="h3-text-2 my-auto">
              {heading.heading}
            </h3>
          </div>
          <img
            src={heading.image}
            alt={heading.heading}
            className="w-full h-16 object-cover"
          />
        </div>
        <div className="px-5 my-2">
          {
            blocks && blocks.map((block, index) => {
              return(
                <ContentBlock
                  key={index}
                  imageSrc={block.image} 
                  title={block.contentTitle} 
                  description={block.description} 
                  block={block.block}
                />
              )
            })
          }
          
        </div>
      </div>
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {setIsEditModalOpen(false)}}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
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
                    onClick={() => {setIsEditModalOpen(false)}}
                  >+</button>
                </div>
              </div>
              <form
                className="grid grid-cols-1 max-h-[400px] overflow-y-scroll"
              >
                <div className="flex flex-col">
                  <label className="search-input-label">Page Heading</label>
                  <div className="search-input-text-2 grid md:grid-cols-3 grid-cols-1 p-[15px] gap-6">
                    <input
                      type="text"
                      placeholder="Enter the page heading here"
                      className="md:col-span-2 h-[69px] p-5 my-auto border border-custom-white rounded-[10px]"
                      defaultValue={heading.heading}
                    />
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center md:w-48 w-full h-[73px] border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100 md:mx-0 mx-auto"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                className="w-[25px] h-5 mb-1 mt-3 text-gray-400"
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
                            <p className="mb-2 text-sm text-gray-500">Add banner image</p>
                        </div>
                        <input id="file-upload" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                {
                  blocks?.map((block, index) => {
                    return(
                      <div className="flex flex-col" key={index}>
                        <label className="search-input-label">{block.block}</label>
                        <div
                          className="grid md:grid-cols-2 grid-cols-1 search-input-text-2 p-5 gap-6"
                        >
                          <div
                            className="grid grid-cols-1 gap-4"
                          >
                            <div
                              className="flex flex-col"
                            >
                              <label className="search-input-label">Content title</label>
                              <input
                                className="search-input-text"
                                type="text"
                                placeholder="Enter the content title"
                                defaultValue={block.contentTitle}
                              />
                            </div>
                            <label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-[165px] border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    aria-hidden="true"
                                    className="w-[49px] h-[44px] mb-1 mt-3 text-gray-400"
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
                                <p className="mb-2 text-sm text-gray-500">Add content image</p>
                              </div>
                              <input id="file-upload" type="file" className="hidden" />
                            </label>
                          </div>

                          <div
                            className="flex flex-col w-full h-[230px]"
                          >
                            <label
                              className="search-input-label w-full"
                            >Description</label>
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
                                initialValue={block.description}
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
                      setIsEditModalOpen(false);
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

export default AboutUs;


interface ContentBlockProps {
  imageSrc: string;
  title: string;
  description: string;
  block: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ imageSrc, title, description, block }) => {
  const contentItems = [
    { topic: 'Content title', name: title},
    { topic: 'Content Description', name: description},
  ];
  return (
    <div className="flex min-sm:flex-row max-sm:flex-col mb-6">
      <div 
        className="flex flex-col text-center items-center justify-center min-md:w-[100px] max-md:w-full"
      >
        <h5 className="h5-text-2">{block}</h5>
        <img src={imageSrc} alt={title} className="max-w-[100px] min-md:mr-5 max-md:mr-0" />
      </div>
      <div className="grid grid-cols-1 overflow-x-auto">
        <table
          className="sm:px-7 px-0 min-w-[600px]"
        >
          <tbody
            className=""
          >
            {
              contentItems.map((item, index) => {
                return(
                  <tr key={index}
                    className=""
                  >
                    <td
                      className="banner-table-td-1 py-2 sm:pl-7 pl-1"
                    >{item.topic}</td>
                    <td
                      className="px-3 text-center banner-table-td-1 py-2"
                    >:</td>
                    <td
                      className={`banner-table-td-2 py-2 pr-7 text-black ${
                        item.name == "title" ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.name}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};