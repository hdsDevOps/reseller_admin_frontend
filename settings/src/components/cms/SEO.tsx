import React, { useEffect, useRef, useState } from "react";
import '../../styles/styles.css';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { getSeoDataThunk, updateSeoDataThunk, uploadImageThunk } from 'store/user.thunk';import { useAppDispatch } from "store/hooks";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { X } from "lucide-react";

const initialSeoData = {
  title: "",
  desc: [],
  alt_image: "",
  image_path: "",
  keywords: [],
  urllink: "",
};

const SEO = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seoData, setSeoData] = useState(initialSeoData);
  // console.log(seoData);
  const [descTags, setDescTags] = useState([]);
  const [keywordTags, setKeywordTags] = useState([]);
  const [editedSeo, setEditedSeo] = useState(seoData);
  // console.log(editedSeo);
  const [imageFile, setImage] = useState(null);
  // console.log(imageFile);
  const imageRef = useRef(null);
  
  const showImage = () => {
    const file = imageFile;
    if(file){
      if(file instanceof File){
        const reader = new FileReader();
        reader.onload = () => {
          if (imageRef.current) {
            imageRef.current.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
      else if(typeof file === 'string'){
        if (imageRef.current) {
          imageRef.current.src = file;
        }
      }
    }
  };

  useEffect(() => {
    showImage();
  }, [imageFile]);

  useEffect(() => {
    setDescTags(seoData.desc);
    setKeywordTags(seoData.keywords);
  }, [seoData]);

  useEffect(() => {
    setEditedSeo({
      ...editedSeo,
      desc: descTags,
      keywords: keywordTags
    });
  }, [descTags, keywordTags]);

  const handleKeyDownDesc = (e) => {
    if(e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if(!newTag){
        toast.warning("Tag cannot be empty");
      }
      if(newTag.length<3){
        toast.warning("Tag must be at least 3 characters long!");
      }
      if(newTag && !descTags.includes(newTag) && newTag.length>=3) {
        setDescTags([...descTags, newTag]);
        e.target.value = "";
      }
      if(descTags.includes(newTag)){
        toast.warning("Duplicate tags are not allowed!");
      }
    }
  };

  const handleDeleteDesc = (index) => {
    setDescTags(descTags.filter((_, i) => i !== index));
  };

  const handleKeyDownKeyword = (e) => {
    if(e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if(!newTag){
        toast.warning("Tag cannot be empty");
      }
      if(newTag.length<3){
        toast.warning("Tag must be at least 3 characters long!");
      }
      if(newTag && !keywordTags.includes(newTag) && newTag.length>=3) {
        setKeywordTags([...keywordTags, newTag]);
        e.target.value = "";
      }
      if(descTags.includes(newTag)){
        toast.warning("Duplicate tags are not allowed!");
      }
    }
  };

  const handleDeleteKeyword = (index) => {
    setKeywordTags(keywordTags.filter((_, i) => i !== index));
  };

  const seoTable = [
    { label: 'Content Title', name: 'title'},
    { label: 'Content Description', name: 'desc'},
    { label: 'Alt Image Text', name: 'alt_image'},
    { label: 'Image', name: 'image_path'},
    { label: 'Keywords', name: 'keywords'},
    { label: 'URL Link', name: 'urllink'},
  ];

  const editSeoTable = [
    { label: 'Title', name: 'title', placeholder: 'Enter the title', type: 'text',},
    { label: 'Description', name: 'desc', placeholder: 'Enter the description meta tags with comma separator,', type: 'text',},
    { label: 'Alt Image Text', name: 'alt_image', placeholder: 'Enter the alternative image text', type: 'text',},
    { label: 'Keywords', name: 'keywords', placeholder: 'Enter the keywords here with comma separator,', type: 'text',},
    { label: 'Image', name: 'image_path', placeholder: 'Add image', type: 'file',},
    { label: 'URL Link', name: 'urllink', placeholder: 'Enter URL link', type: 'text',},
  ];

  const fetchSeoData = async() => {
    try {
      const result = await dispatch(getSeoDataThunk()).unwrap();
      setSeoData(result);
    } catch (error) {
      setSeoData(initialSeoData);
    }
  };

  useEffect(() =>{
    fetchSeoData();
  }, []);

  const handleSeoChange = e => {
    setEditedSeo({
      ...editedSeo,
      [e.target.name]: e.target.value
    })
  };

  const handleSave = async(e) => {
    e.preventDefault();
    // setIsModalOpen(false);
    if(imageFile !== null || typeof imageFile !== "string"){
      try {
        const imageUpload = await dispatch(uploadImageThunk({image: imageFile})).unwrap();
        console.log("imageUpload", imageUpload);
        if(imageUpload?.message === "File uploaded successfully!") {
          try {
            // console.log(imageUpload?.url)
            const udpateSeo = await dispatch(updateSeoDataThunk({
              title: editedSeo.title,
              desc: editedSeo.desc,
              alt_image: editedSeo.alt_image,
              image_path: imageUpload.url,
              keywords: editedSeo.keywords,
              urllink: editedSeo.urllink
            })).unwrap();
            console.log("udpateSeo", udpateSeo);
            setTimeout(() => {
              toast.success(udpateSeo?.message)
            }, 1000);
          } catch (error) {
            toast.error("Error updating SEO data1");
          } finally {
            fetchSeoData();
          }
        }
        else{
          toast.error("Error uploading the image.");
        }
      } catch (error) {
        toast.error("Please upload a valid image.");
      }
    }
    else{
      try {
        // console.log(imageUpload?.url)
        const udpateSeo = await dispatch(updateSeoDataThunk({
          title: editedSeo.title,
          desc: editedSeo.desc,
          alt_image: editedSeo.alt_image,
          image_path: editedSeo.image_path,
          keywords: editedSeo.keywords,
          urllink: editedSeo.urllink
        })).unwrap();
        console.log("udpateSeo", udpateSeo);
        setTimeout(() => {
          toast.success(udpateSeo?.message)
        }, 1000);
      } catch (error) {
        toast.error("Error updating SEO data1");
      } finally {
        fetchSeoData();
      }
    }
  };

  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {
          setIsModalOpen(true);
          setEditedSeo(seoData);
          setImage(seoData?.image_path);
        }}>
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
                  if(item.name === "desc" || item.name === "keywords"){
                    return(
                      <tr
                        key={index}
                      >
                        <td className="banner-table-td-1 w-[70px] pl-7 py-3">{item.label}</td>
                        <td className="px-3 text-center banner-table-td-1 w-[50px] py-3">:</td>
                        <td className="banner-table-td-2 py-3 flex flex-wrap gap-1">
                          {
                            seoData[item.name]?.map((tag, idx) => (
                              <div key={idx} className="flex flex-row gap-1 items-center bg-black bg-opacity-[38%] px-2 py-0 rounded-[15px]">
                                <a className="text-[11px]">{tag}</a>
                                <X className="w-4 cursor-pointer" />
                              </div>
                            ))
                          }
                        </td>
                      </tr>
                    )
                  }
                  else{
                    return(
                      <tr
                        key={index}
                      >
                        <td className="banner-table-td-1 w-[70px] pl-7 py-3">{item.label}</td>
                        <td className="px-3 text-center banner-table-td-1 w-[50px] py-3">:</td>
                        <td className="banner-table-td-2 py-3">
                          {
                            item.label == "Image"
                            ? <img
                              src={seoData[item.name]}
                              alt={seoData.alt_image}
                              className="w-[50%] min-w-24 max-w-40"
                            />
                            : item.label == "URL Link"
                            ? <a href={seoData.urllink} target="_blank" className="text-blue">{seoData.urllink}</a> 
                            : seoData[item.name]
                          }
                        </td>
                      </tr>
                    )
                  }
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
        onClose={() => {
          setIsModalOpen(false);
          setImage(null);
          setEditedSeo(seoData);
        }}
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
                      onClick={() => {
                        setIsModalOpen(false)
                        setImage(null);
                        setEditedSeo(seoData);
                      }}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid sm:grid-cols-2 grid-cols-1 gap-4"
                  onSubmit={handleSave}
                >
                  {
                    editSeoTable.map((menu, index) => {
                      if(menu.type == 'file'){
                        return(
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center md:w-48 w-full h-[163px] border-2 border-custom-white border-dashed rounded-[5px] cursor-pointer bg-white hover:bg-gray-100 md:mx-0 mx-auto"
                            key={index}
                          >
                            <div className={`flex flex-col items-center justify-center ${imageFile === null ? 'pt-5 pb-6' : ''} w-full h-full`}>
                              {
                                imageFile === null
                                ? (<React.Fragment>
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
                                </React.Fragment>)
                                : (<img ref={imageRef} src={imageFile} alt="image" className="h-full object-cover" />)
                              }
                            </div>
                            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={e => {setImage(e.target.files[0])}} />
                          </label>
                        )
                      }
                      else if(menu.name === "desc" || menu.name === "keywords"){
                        return(
                          <div
                            key={index}
                            className="flex flex-col"
                          >
                            <div
                              className="flex flex-col"
                            >
                              <label
                                className="search-input-label"
                              >{menu.label}</label>
                              <input
                                type="text"
                                className="search-input-text"
                                placeholder={menu.placeholder}
                                // defaultValue={seoData[menu.name]}
                                onKeyDown={menu.name === "desc" ? handleKeyDownDesc : handleKeyDownKeyword}
                              />
                            </div>

                            <div className="flex flex-wrap my-1 gap-1">
                              {
                                menu.name === "desc"
                                ? descTags.map((tag, idx) => (
                                  <div key={idx} className="flex flex-row gap-1 items-center bg-black bg-opacity-[38%] px-2 py-0 rounded-[15px]">
                                    <a className="text-[11px]">{tag}</a>
                                    <X className="w-4 cursor-pointer" onClick={() => {handleDeleteDesc(idx)}} />
                                  </div>
                                ))
                                : keywordTags.map((tag, idx) => (
                                  <div key={idx} className="flex flex-row gap-1 items-center bg-black bg-opacity-[38%] px-2 py-0 rounded-[15px]">
                                    <a className="text-[11px]">{tag}</a>
                                    <X className="w-4 cursor-pointer" onClick={() => {handleDeleteKeyword(idx)}} />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
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
                              defaultValue={editedSeo[menu.name]}
                              onChange={handleSeoChange}
                              name={menu.name}
                              required
                            />
                          </div>
                        )
                      }
                    })
                  }
                  <div className="sm:col-span-2 flex flex-row max-sm:justify-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setImage(null);
                        setEditedSeo(seoData);
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
