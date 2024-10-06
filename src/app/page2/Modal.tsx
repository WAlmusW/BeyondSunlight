type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

export default function Modal({ isOpen, onClose, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <p>{content}</p>
      </div>
    </div>
  );
}
