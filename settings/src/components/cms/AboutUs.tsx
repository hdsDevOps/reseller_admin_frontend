import React from "react";
import '../../styles/styles.css';

const AboutUs: React.FC = () => {

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms">
          EDIT
        </button>
      </div>
      <div
        className="border border-custom-white bg-custom-white p-1"
      >
        <div className="mb-3">
          <div className="flex min-sm:flex-row max-sm:flex-col align-middle min-sm:gap-7 max-sm:gap-1">
            <h2 className="h2-text text-nowrap">Heading  :</h2>
            <h3 className="h3-text-2 my-auto">
              Everything you need to know About us
            </h3>
          </div>
        </div>
        <div
          className='relative w-full h-[62px] blur-sm bg-custom-image'
        >
          <div
            className="absolute inset-0 bg-[#12a8334f]"
          ></div>
        </div>
        <div className="px-5 my-2">
          <ContentBlock 
            imageSrc={process.env.BASE_URL+"images/meetimage1.png"} 
            title="Make decisions faster, face to face." 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
            block="Block 1"
          />
          <ContentBlock 
            imageSrc={process.env.BASE_URL+"images/about-us.jpeg"} 
            title="Secure your data and devices." 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
            block="Block 2"
          />
        </div>
      </div>
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