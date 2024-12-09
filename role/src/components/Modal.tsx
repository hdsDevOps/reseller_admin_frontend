import React from "react";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  

  return (
    
  );
};

export default ModalForm;
