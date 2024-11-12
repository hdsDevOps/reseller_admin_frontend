import React, { useState } from "react";
import FooterEditModal from "./components/FooterEditModal";

const FooterSection = () => {
  const [showModal, setShowModal] = React.useState(false);
  const footerItems = [
    { topic: 'Heading', name: 'heading',},
    { topic: 'Menu', name: 'menu',},
  ];

  const [footerData, setFooterData] = useState([
    {heading: 'Marketing', menu: [
      {name: 'Video', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'SEO', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'SMO', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Mobile', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Campaign', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Terms & Conditions', value: 'https://simplify.jobs/', type: 'url'},
    ]},
    {heading: 'Websites', menu: [
      {name: 'Domain Name', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Design', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Hosting', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'WordPress', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Develop', value: 'https://simplify.jobs/', type: 'url'},
      {name: 'Privacy & Policy', value: 'https://simplify.jobs/', type: 'url'},
    ]},
    {heading: 'Contact Us', menu: [
      {name: 'Address 1', value: 'Hordanso LLC 4364 Western Center Blvd PMB 2012 Fort Worth', type: 'text'},
      {name: 'Call Us', value: '+1 469-893-0678', type: 'number'},
      {name: 'Email ID', value: 'contact@hordanso.com', type: 'email'},
      {name: 'Address 2', value: 'Hordanso LTD 479 Ikorodu Rd, Ketu, Lagos 100243', type: 'text'},
      {name: 'Call Us', value: '+2348060440510', type: 'number'},
      {name: 'Email ID', value: 'contact@hordanso.ng', type: 'email'},
    ]},
    {heading: 'Our NewsLetter', menu: [
      {name: 'Description', value: 'From mobile apps, marketing & websites; to automation & extreme software engineering. We tackle the difficult & not so easy technical issues of today in the always on digital world of tomorrow.', type: 'text'},
    ]},
    {heading: 'Social Link', menu: [
      {name: 'Twitter', value: 'www.twitter.com', type: 'url'},
      {name: 'Facebook', value: 'www.pacebook.com', type: 'url'},
      {name: 'Pinterest', value: 'www.pinterest.com', type: 'url'},
      {name: 'Instagram', value: 'www.instagram.com', type: 'url'},
      {name: 'Youtube', value: 'www.youtube.com', type: 'url'},
    ]}
  ]);
  console.log(footerData);
  

  return (
    <div className="sm:p-4 p-0 bg-white">
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {setShowModal(true)}}>
          EDIT
        </button>
      </div>
      <div className="space-y-4">
        {
          footerData.map((footer, index) => {
            return(
              <div
                className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
                key={index}
              >
                <table
                  className="sm:px-7 px-2 min-w-full"
                >
                  <tbody>
                    {
                      footerItems.map((item, i) => {
                        if(i == 1){
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-[6px] sm:pl-7 pl-1 "
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-2"
                              >:</td>
                              <td
                                className={`banner-table-td-2 py-1 pr-7 text-black ${
                                  ""// item.name == "title" ? "font-medium" : "font-normal"
                                }`}
                              >
                                {
                                  footer?.menu.map((me, n) => {
                                    return(
                                      <tr
                                        key={n}
                                        className="py-0"
                                      >
                                        <td
                                          className="banner-table-td-1 w-[100px] py-2 sm:pl-7 pl-1"
                                        >{me.name}</td>
                                        <td
                                          className="px-3 text-center banner-table-td-1 py-2"
                                        >:</td>
                                        <td
                                          className={`banner-table-td-2 py-2 pr-7 ${
                                            me.type == 'url' ? 'text-custom-blue-9 cursor-pointer underline' : 'text-black'
                                          }`}
                                        >
                                          {
                                            me.type == 'url' ? <a onClick={() => {window.open(me.value)}}>{me.value}</a> : me.value
                                          }
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          return(
                            <tr key={i}>
                              <td
                                className="banner-table-td-3 w-[100px] py-2 sm:pl-7 pl-1"
                              >{item.topic}</td>
                              <td
                                className="px-3 text-center banner-table-td-1 py-[10px]"
                              >:</td>
                              <td
                                className={`banner-table-td-1 w-[100px] py-3 sm:pl-7 pl-1`}
                              >
                                {footer[item.name]}
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
          })
        }
      </div>
      <FooterEditModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default FooterSection;
