import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { ChevronRight, MoveLeft } from "lucide-react";
import '../styles/styles.css';
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";


// Define types for props and editor config
type TermsConditionsProps = {
  initialContent?: string;
  onSubmit?: (content: string) => void;
};

const TermsConditions: React.FC<TermsConditionsProps> = ({
  initialContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.",
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    onSubmit(content);
  };

  return (
    <div className="flex flex-col px-2 max-[400px]:px-0">
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
          onChange={e => {setContent(e.target.value)}}
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
          onClick={handleSubmit}
          className="btn-green w-[131px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsConditions;
