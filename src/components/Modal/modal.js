import ReactDOM from "react-dom";
import modaltyles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

function Modal({ title, children, isOpen, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    if (!isOpen) {
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={modaltyles.modal}>
        <h1 className="text text_type_main-medium">{title}</h1>
        <button onClick={onClose} className={modaltyles.closeButton}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
