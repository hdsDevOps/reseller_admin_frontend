import React from "react";

const AboutUs: React.FC = () => {
  

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-start mb-6">
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          EDIT
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-purple-600 font-medium">
          Everything you need to know About us
        </h3>
      </div>
      <div className="p-5">
      <ContentBlock 
        imageSrc="image1.jpg" 
        title="Make decisions faster, face to face." 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      <ContentBlock 
        imageSrc="image2.jpg" 
        title="Secure your data and devices." 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
    </div>
    </div>
  );
};

export default AboutUs;


interface ContentBlockProps {
  imageSrc: string;
  title: string;
  description: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex mb-6">
      <img src={imageSrc} alt={title} className="w-24 h-auto mr-5" />
      <div>
        <div className="flex">
          <span className="font-bold mr-2 w-[10.7rem]">Content title</span>
          <span className="mr-4">:</span>
          <span>{title}</span>
        </div>
        <div className="flex mt-1">
          <span className="font-bold mr-2 w-60">Content Description</span>
          <span className="mr-4">:</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};