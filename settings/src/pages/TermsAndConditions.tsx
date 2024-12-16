import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { ChevronRight, MoveLeft } from "lucide-react";
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getTermsAndConditionsThunk, updateTermsAndConditionsThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TermsConditions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");
  console.log("Content...", content);

  const fetchTermsAndConditions = async() => {
    try {
      const result = await dispatch(getTermsAndConditionsThunk()).unwrap();
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
    fetchTermsAndConditions();
  }, []);

  const updateTermsAndConditions = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateTermsAndConditionsThunk({content: content})).unwrap();
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error updating Terms & Conditions");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      fetchTermsAndConditions();
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
        >Terms & Conditions</h3>
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
        >Terms & Conditions</p>
      </div>

      <p className="font-inter-bold-16px-cGray7 mt-10">Terms & Conditions</p>
      <div
        className="mt-2 shadow-md"
      >
        <Editor
          apiKey={process.env.TINY_MCE_API}
          value={content}
          init={{
            height: 400,
            menubar: false,
            plugins: ["lists", "link", "image", "paste", "code",],
            toolbar:
              "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | image | code",
          }}
          onEditorChange={(content) => { setContent(content) }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={e => {updateTermsAndConditions(e)}}
          type="button"
          className="btn-green w-[131px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsConditions;
