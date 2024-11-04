import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { ChevronRight } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";


// Define types for props and editor config
type TermsConditionsProps = {
  initialContent?: string;
  onSubmit?: (content: string) => void;
};

const TermsConditions: React.FC<TermsConditionsProps> = ({
  initialContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.",
  onSubmit = () => {},
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialContent);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    height: 500,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "middle" as
      | "middle"
      | "small"
      | "tiny"
      | "xsmall"
      | "large",
    toolbarAdaptive: false,
    statusbar: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    defaultActionOnPaste: "insert_clear_html" as
      | "insert_clear_html"
      | "insert_as_text"
      | "insert_only_text"
      | undefined,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    removeButtons: ["about"],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "Start typing...",
  };

  const handleSubmit = () => {
    onSubmit(content);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-600 text-2xl font-bold mb-5">
          <FaArrowLeft />
          <span>Terms & Conditions</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-500 text-sm">Settings</span>
          <span className="text-gray-500 text-sm">
            <ChevronRight />
          </span>
          <span className="text-green-500 text-sm">Terms & Conditions</span>
        </div>
      </div>

      {/* Jodit Editor */}
      <p className="text-lg text-gray-500 font-bold">Terms & Conditions</p>
      <div className="border rounded-lg">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsConditions;
