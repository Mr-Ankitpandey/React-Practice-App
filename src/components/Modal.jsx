import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open,onClose, className = "" }) => {
  const dialogBox = useRef();

  useEffect(() => {
    const modal = dialogBox.current;
    if (open) {
      modal.showModal();
    }
    return ()=> modal.close()
  }, [open]);

  return createPortal(
    <dialog ref={dialogBox} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
};

export default Modal;
