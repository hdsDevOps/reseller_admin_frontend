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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            className="w-full py-4 px-6 flex items-center justify-between bg-white hover:bg-gray-50 focus:outline-none"
            onClick={() => toggleSection(item.id)}
          >
            <span className="text-xl font-medium">{item.title}</span>
            {activeSection === item.id ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {activeSection === item.id && (
            <div className="p-6 bg-gray-50">
              {item.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;