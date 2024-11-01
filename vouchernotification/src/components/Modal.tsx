import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-6 right-6 bg-green-600 rounded-full text-white p-1 hover:bg-green-500 shadow-md"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg pb-2">{title}</h2>
        <div className="mt-4  w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
