import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, MoveLeft } from "lucide-react";
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPrivacyPolicyThunk, updatePrivacyPolicyThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Define types for props and editor config
type PrivacyPolicyProps = {
  initialContent?: string;
  onSubmit?: (content: string) => void;
};

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");
  console.log("Content...", content);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
      ['bold', 'italic', 'underline', 'strike'], // Text styling buttons
      [{ 'color': [] }, { 'background': [] }], // Text and background color
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], // Lists
      ['link',], // Links and images
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // Remove formatting
    ],
  };

  const fetchPrivacyPolicy = async() => {
    try {
      const result = await dispatch(getPrivacyPolicyThunk()).unwrap();
      setContent(result?.content);
    } catch (error) {
      setContent("");
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
    fetchPrivacyPolicy();
  }, []);

  const updatePrivacyPolicy = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updatePrivacyPolicyThunk({content: content})).unwrap();
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error updating Privacy Policy");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchPrivacyPolicy();
    }
  };

  return (
    <div className="flex flex-col px-2 max-[400px]:px-0">
      <ToastContainer />
      {/* Header */}
      <div
        className='flex flex-row'
      >
        <a
          className='cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
        >
          <MoveLeft
            className='h-[20px] text-black mt-[7px]'
          />
        </a>
        <h3
          className='h3-text ml-[10px]'
        >Privacy policy</h3>
      </div>

      <div
        className='flex flex-row mt-5 h-[22px]'
      >
        <p
          className='page-indicator-1'
        >Settings</p>
        <ChevronRight
          className='page-indicator-arrow-2'
        />
        <p
          className='page-indicator-2'
        >Privacy policy</p>
      </div>

      <p className="font-inter-bold-16px-cGray7 mt-10">Privacy policy</p>
      <div
        className="mt-2 shadow-md h-[450px] px-2"
      >
        <ReactQuill
          value={content}
          onChange={(content) => { setContent(content) }}
          theme="snow"
          style={{height: 370}}
          modules={modules}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={e => {updatePrivacyPolicy(e)}}
          className="btn-green w-[131px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
