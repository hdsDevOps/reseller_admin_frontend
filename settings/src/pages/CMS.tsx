import React from 'react';
import Banner from '../components/cms/Banner';
import Promotion from '../components/cms/Promotion';
import AboutUs from '../components/cms/AboutUs';
import Resources from '../components/cms/Resources';
import ContactSection from '../components/cms/ContactSection';
import FooterSection from '../components/cms/FooterSection';
import HeaderSection from '../components/cms/HeaderSection';
import SEO from '../components/cms/SEO';
import Accordion from '../components/cms/Accordion';
import '../styles/styles.css';

interface MenuItem {
  id: string;
  title: string;
  component: React.ReactNode;
}

const CMS: React.FC = () => {
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
      component: <ContactSection />,
    },
    {
      id: "footer",
      title: "Footer",
      component: <FooterSection />,
    },
    {
      id: "header",
      title: "Header",
      component: <HeaderSection />,
    },
    {
      id: "seo",
      title: "SEO",
      component: <SEO />,
    },
  ];
  return (
    <div className="min-h-screen p-[27px]">
      <div className="max-w-full mx-auto ">
        <h3 className="h3-text">CMS</h3>
        <Accordion items={menuItems} />
      </div>
    </div>
  )
};

export default CMS;