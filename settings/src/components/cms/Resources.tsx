import React, { useState } from "react";
import ResourcesModal from "./components/ResourcesModal";
import '../../styles/styles.css';
import { Dialog } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";

const Resources: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const resourceItems = [
    { topic: 'Content title', name: 'title'},
    { topic: 'Content Description', name: 'description'},
  ];
  const [resources, setResources] = useState([
    {
      title: "Connect",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    { title: "Create", description: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Access", description: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Contact", description: "Lorem ipsum dolor sit amet consectetur." },
  ]);
  console.log(resources);
  

  const updateResouces = (value, index) => {
    const updateData = [...resources];
    updateData[index] = { ...updateData[index], title: value};
    setResources(updateData);
  }

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms"
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          EDIT
        </button>
      </div>
      {
        resources?.map((resource, i) => {
          return(
            <div className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4">
              <table
                className="sm:px-7 px-2 min-w-full"
              >
                <tbody
                  className=""
                >
                  {
                    resourceItems.map((item, index) => {
                      return(
                        <tr key={index}
                          className=""
                        >
                          <td
                            className="banner-table-td-1 w-[100px] py-2 sm:pl-7 pl-1"
                          >{item.topic}</td>
                          <td
                            className="px-3 text-center banner-table-td-1 py-2"
                          >:</td>
                          <td
                            className={`banner-table-td-2 py-2 pr-7 text-black ${
                              item.name == "title" ? "font-medium" : "font-normal"
                            }`}
                          >
                            {resource[item.name]}
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        })
      }
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="fixed-full-screen"
        onClose={() => {
          setIsEditModalOpen(false);
        }}
      >
        <div
          className="fixed-popup min-[1053px]:w-[1053px] max-[1053px]:w-full"
        >
          <div
            className='flex-row-between p-4'
          >
            <h4
              className='font-inter font-medium text-xl text-custom-black-4'
            >Edit resources</h4>
            <div className='btn-close-bg'>
              <button
                type='button'
                className='text-3xl rotate-45 mt-[-8px] text-white'
                onClick={() => {
                  setIsEditModalOpen(false);
                }}
              >+</button>
            </div>
          </div>

          <form
            className="grid md:grid-cols-2 grid-cols-1 overflow-y-auto h-[600px]"
          >
            {
              resources?.map((resource, index) => {
                return(
                  <div
                    className="p-4 flex flex-col"
                    key={index}
                  >
                    <p
                      className="search-input-label-2 font-inter"
                    >Content {index+1}</p>
                    <div
                      className="p-[10px] pb-5 search-input-text-2 w-full"
                    >
                      <div
                        className="flex flex-col w-full"
                      >
                        <label
                          className="search-input-label w-full"
                        >Content title</label>
                        <input
                          className="search-input-text w-full font-inter font-normal text-custom-black-4 text-base"
                          placeholder="Enter title here"
                          defaultValue={resource.title}
                          onChange={(e) => updateResouces(e.target.value, index)}
                        />
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
                            apiKey="1yqlfs5x0br4syeyz3nn35sqrara2uccudx0cycccjpo6pes"
                            init={{
                              height: 200,
                              menubar: false,
                              plugins: ["lists", "link", "image", "paste"],
                              toolbar:
                                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                            }}
                            initialValue={resource.description}
                            onEditorChange={(content) => {
                              const newResources = [...resources];
                              newResources[index] = {
                                ...resource,
                                description: content,
                              };
                              console.log(newResources);
                              
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }

            <div
              className="p-4 flex flex-row min-sm:justify-start max-sm:justify-center gap-[26px]"
            >
              <button
                type="button"
                className="btn-green h-[46px]"
              >Save</button>
              <button
                type="button"
                className="btn-red h-[46px]"
                onClick={() => {
                  setIsEditModalOpen(false);
                }}
              >Cancel</button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Resources;
