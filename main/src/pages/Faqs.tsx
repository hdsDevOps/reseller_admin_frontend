import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const Faqs = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What is Google Workspace?",
      answer: "Google Workspace is a cloud-based productivity suite that includes everything you need to get work done, like email, calendars, video conferencing, online storage, and more. It's a powerful tool that makes collaboration easy and efficient, and it's trusted by millions of businesses around the world. At Bluehive, we offer Google Workspace as a way to help our customers streamline their workflow and focus on what they do best. For a more in-depth look, read our introduction to Google Workspace.",
      isOpen: true
    },
    {
      question: "How much is Google Workspace?",
      answer: "Contact us for pricing details.",
      isOpen: false
    },
    {
      question: "What is Google Workspace used for?",
      answer: "Google Workspace is used for business collaboration and productivity.",
      isOpen: false
    },
    {
      question: "What does Google Workspace include?",
      answer: "Google Workspace includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  return (
    // <div className="max-w-3xl mx-auto p-6">
    <div className="min-h-screen p-4">
      <h1 className="text-[#00A551] text-3xl font-semibold mb-8">FAQ's</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-[#12A833] border-dashed pb-2"
          >
            <button
              className="w-full flex justify-between items-center py-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-800 font-medium text-lg">{faq.question}</span>
              {faq.isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {faq.isOpen && (
              <div className="pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;