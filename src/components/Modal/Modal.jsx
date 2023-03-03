import React, { useState } from "react";
import cl from "./Modal.module.scss";
const { ethers } = require("ethers");

const Modal = ({ symbol, contract }) => {
  const [stakeAmount, setStakeAmount] = useState("");

  async function stakeTokens(e) {
    e.preventDefault();
    if (stakeAmount !== "" && stakeAmount.length > 0) {
      await contract.stakeTokens(symbol, stakeAmount, {
        value: ethers.utils.parseUnits("1000", "wei"),
      });
      console.log(await contract.getPositionById(0));
    }
  }
  return (
    <div className={cl.modal}>
      <div className={cl.modal__button}></div>
      <div className={cl.modal__center}>
        <form>
          <label style={{ display: "flex", justifyContent: "space-around" }}>
            <p>Tokens amount</p>
            <input
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <button
              style={{
                borderRadius: "10px",
                padding: "5px 15px",
              }}
              onClick={(e) => stakeTokens(e)}
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
