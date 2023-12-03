import modalOverlayStyles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClick }) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;
