import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/styles.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, modalRef }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed-full-screen">
      <div className="bg-white p-10 rounded-2xl shadow-lg  sm:w-[351px] max-sm:w-full relative mx-3" ref={modalRef}>
        <button
          className="absolute top-10 right-10 bg-green-600 rounded-full text-white pl-[3.5px] hover:bg-green-500 shadow-md w-[23px] h-[23px]"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="font-inter-16px-500-black">{title}</h2>
        <div className="mt-[14px] w-[259px] voucher-table-modal">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
