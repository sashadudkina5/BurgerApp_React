import modalOverlayStyles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  onClick: () => void;
}

/**
 * Covers the viewport behind the modal content. 
 * To be used inside a modal component.
 * Clicking on the overlay triggers the modal's close function.
 * 
 * @component
 * @param {IModalOverlayProps} props - Props for the ModalOverlay component.
 * @param {() => void} props.onClick - Callback function to be called when the overlay is clicked. Closes the modal.
 * @returns {ReactElement} A div element representing the overlay, which captures click events to close the modal.
 * 
 * @example
 * <ModalOverlay onClick={onClose} />
 */

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClick }) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClick} id="modal_overlay"></div>;
}

export default ModalOverlay;
