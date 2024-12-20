import React, { useEffect, useState } from "react";
import ResourcesModal from "./components/ResourcesModal";
import '../../styles/styles.css';
import { Dialog } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import { getResourcesThunk, updateResourcesThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";

const initialResources = {
  connect: {
    content_title: "",
    description: ""
  },
  create: {
    content_title: "",
    description: ""
  },
  Access: {
    content_title: "",
    description: ""
  },
  contact: {
    content_title: "",
    description: ""
  }
}

const Resources: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const resourceItems = [
    { topic: 'Content title', name: 'content_title'},
    { topic: 'Content Description', name: 'description'},
  ];
  const [resources, setResources] = useState(initialResources);
  // console.log(resources);
  const [newResources, setNewResources] = useState(resources);
  console.log(newResources);
  
  const fetchResources = async() => {
    try {
      const result = await dispatch(getResourcesThunk()).unwrap();
      setResources(result);
    } catch (error) {
      setResources(initialResources);
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
    fetchResources();
  }, []);

  const updateResouces = (key: string, field: string, value: string) => {
    setNewResources((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleEditorChange = (key: string, content: string) => {
    setNewResources((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        description: content,
      },
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(
      newResources?.connect?.content_title === "" || newResources?.connect?.content_title.trim() === "" || newResources?.create?.content_title === "" || newResources?.create?.content_title.trim() === "" || newResources?.Access?.content_title === "" || newResources?.Access?.content_title.trim() === "" || newResources?.contact?.content_title === "" || newResources?.contact?.content_title.trim() === ""
    ) {
      toast.warning("Please fill all the fields");
    } else {
      try {
        const updateResouce = await dispatch(updateResourcesThunk(newResources)).unwrap();
        setTimeout(() => {
          toast.success("Updated Recources data.");
        }, 1000);
      } catch (error) {
        toast.error("Error updating the resources.");
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        fetchResources();
        setIsEditModalOpen(false);
      }
    }
  }

  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms"
          onClick={() => {
            setIsEditModalOpen(true);
            setNewResources(resources);
          }}
        >
          EDIT
        </button>
      </div>
      {
        Object.entries(resources).map(([key, value]) => {
          if(key === "connect" || key === "create" || key === "Access" || key === "contact") {
            return (
              <div className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4" key={key}>
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
                              className="px-3 text-center banner-table-td-1 py-2 w-[10px]"
                            >:</td>
                            <td
                              className={`banner-table-td-2 py-2 pr-7 text-black ${
                                item.name == "content_title" ? "font-medium" : "font-normal"
                              }`}
                            >
                              {
                                item.name === "content_title" ?
                                value.content_title :
                                <div className=""
                                  dangerouslySetInnerHTML={{ __html: value.description }}
                                ></div>
                              }
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        })
      }
      <Dialog
        open={isEditModalOpen}
        as="div"
        className="fixed-full-screen"
        onClose={() => {
          setIsEditModalOpen(false);
          setNewResources(resources);
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
                  setNewResources(resources);
                }}
              >+</button>
            </div>
          </div>

          <form
            className="grid md:grid-cols-2 grid-cols-1 overflow-y-auto h-[600px]"
            onSubmit={handleSubmit}
          >
            {
              Object.entries(newResources).map(([key, value], index) => {
                if(key === "connect" || key === "create" || key === "Access" || key === "contact") {
                  return (
                    <div
                      className="p-4 flex flex-col"
                      key={key}
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
                            value={value?.content_title}
                            onChange={(e) => updateResouces(key, "content_title", e.target.value)}
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
                              apiKey={process.env.TINY_MCE_API}
                              init={{
                                height: 200,
                                menubar: false,
                                plugins: ["lists", "link", "image", "paste"],
                                toolbar:
                                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                              }}
                              value={value?.description}
                              onEditorChange={(content) => {handleEditorChange (key, content)}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }

            <div
              className="p-4 flex flex-row min-sm:justify-start max-sm:justify-center gap-[26px]"
            >
              <button
                type="submit"
                className="btn-green h-[46px]"
              >Save</button>
              <button
                type="button"
                className="btn-red h-[46px]"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setNewResources(resources);
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
