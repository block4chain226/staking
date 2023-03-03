import React from "react";
import cl from "./Modal.module.scss";

const Modal = () => {
  return (
    <div className={cl.modal}>
      <div className={cl.modal__button}></div>
      <div className={cl.modal__center}>
        <p>vasa</p>
      </div>
    </div>
  );
};

export default Modal;
