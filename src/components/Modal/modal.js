import ReactDOM from "react-dom";

function Modal({ title, children }) {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <>
      <div className="Modal">
        <h1 className="text text_type_main-medium">{title}</h1>
        <button></button>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;