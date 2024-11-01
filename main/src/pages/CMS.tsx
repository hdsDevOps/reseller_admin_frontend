import React from "react";
import Accordion from "../components/cms/Accordion";
import Banner from "../components/cms/Banner";
import Promotion from "../components/cms/Promotion";
import AboutUs from "../components/cms/AboutUs";
import Resources from "../components/cms/Resources";
import SEO from "../components/cms/SEO";
import HeaderSection from "../components/cms/HeaderSection";
import FooterSection from "../components/cms/FooterSection";
import ContactSection from "../components/cms/ContactSection";



interface MenuItem {
    id: string;
    title: string;
    component: React.ReactNode;
  }

const CMS = () => {
  const menuItems: MenuItem[] = [
    {
      id: "banner",
      title: "Banner",
      component: <Banner />,
    },
    {
      id: "promotion",
      title: "Promotion",
      component: <Promotion />,
    },
    {
      id: "about-us",
      title: "About us",
      component: <AboutUs />,
    },
    {
      id: "resources",
      title: "Resources",
      component: <Resources />,
    },
    {
      id: "contact-us",
      title: "Contact us",
      component: <ContactSection/>,
    },
    {
      id: "footer",
      title: "Footer",
      component: <FooterSection/>,
    },
    {
      id: "header",
      title: "Header",
      component: <HeaderSection/>,
    },
    {
      id: "seo",
      title: "SEO",
      component: <SEO/>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 px-6">CMS</h1>
        <Accordion items={menuItems} />
      </div>
    </div>
  );
};

export default CMS;
