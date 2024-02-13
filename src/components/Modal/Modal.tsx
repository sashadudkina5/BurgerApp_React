import ReactDOM from "react-dom";
import modaltyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

interface IModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  extraClass?: string;
}

const Modal: React.FC<IModalProps> = ({ title, children, onClose, extraClass }) => {
  const modalRoot = document.getElementById("modal-root")!;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={modaltyles.modal} id="modal">
        <h1 className="text text_type_main-medium">{title}</h1>
        <button onClick={onClose} className={modaltyles.closeButton} id="closing_modal">
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
