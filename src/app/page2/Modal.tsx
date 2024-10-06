import React from "react";
import "./modal.css"; // Add your styles for the modal here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div
      className="modal-overlay bg-gray-200 opacity-50 text-black rounded-lg pl-6 pt-6 text-3xl"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
