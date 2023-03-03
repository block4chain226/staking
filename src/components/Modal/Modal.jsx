import React from "react";
import cl from "./Modal.module.scss";

const Modal = ({ symbol, contract }) => {
  return (
    <div className={cl.modal}>
      <div className={cl.modal__button}></div>
      <div className={cl.modal__center}>
        <form>
          <label style={{ display: "flex", justifyContent: "space-around" }}>
            <p>Tokens amount</p>
            <input value={symbol} />
            <button
              style={{
                borderRadius: "10px",
                padding: "5px 15px",
              }}
            >
              Stake
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Modal;
