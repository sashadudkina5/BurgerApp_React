import ReactDOM from "react-dom";
import modaltyles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

function Modal({ title, children, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleEscapeKey = (event) => {
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
