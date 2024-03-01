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

/**
 * Modal component that renders a modal window with a title, content (children), and a close function.
 * Uses React Portals to render the modal content into a DOM node into a 'modal-root' div.
 * 
 * Listens for the 'Escape' key press to trigger the onClose callback.
 * 
 * @component
 * @param {IModalProps} props - Props for the Modal component.
 * @param {string} props.title - Title of the modal to be displayed at the top.
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal.
 * @param {() => void} props.onClose - Callback function to be called when the modal is requested to be closed.
 * @returns {React.ReactPortal} A React Portal rendering the modal content into 'modal-root'.
 * 
 * @example
 * <Modal title={""} onClose={onDismissDoneOrderDetails}>
    <DoneOrderDetails matchingOrder={selectedOrder} />
   </Modal>
 */

const Modal: React.FC<IModalProps> = ({ title, children, onClose }) => {
  const modalRoot = document.getElementById("modal-root")!;

  useEffect(() => {
    /**
     * Function calls the onClose function if ESC is pressed. Closes the modal
     * @param event - keyboard pressing event
     */
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
        <button
          onClick={onClose}
          className={modaltyles.closeButton}
          id="closing_modal"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
