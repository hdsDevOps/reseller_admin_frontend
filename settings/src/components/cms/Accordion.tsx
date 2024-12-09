import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface AccordionProps {
  items: MenuItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState<string | null>('banner');

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="w-full mx-auto mt-[22px]">
      {items.map((item) => (
        <div key={item.id} className="border border-custom-white my-4 rounded-[4px]">
          <button
            className="w-full py-4 px-6 flex items-center justify-between bg-white hover:bg-gray-50 focus:outline-none"
            onClick={() => toggleSection(item.id)}
          >
            <span className="font-inter-20px-500-cBlack4">{item.title}</span>
            {activeSection === item.id ? (
              <div
                className='btn-chevron-up'
              >
                <ChevronUp className="mx-auto mt-[6px]" />
              </div>
            ) : (
              <div
                className="btn-chevron-down"
              >
                <ChevronDown
                  className='mx-auto mt-[8px]'
                />
              </div>
            )}
          </button>
          {activeSection === item.id && (
            <div className="px-4 pt-0 pb-4">
              {item.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;