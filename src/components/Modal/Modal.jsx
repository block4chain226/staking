import React, { useState } from "react";
import cl from "./Modal.module.scss";
import { useAllUserPositions } from "../../hooks/usePositions";
const { ethers } = require("ethers");

const Modal = ({ symbol, contract, account }) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [allUserPositions, setAllUserPositions] = useState([]);

  // const ids = useAllUserPositions(contract, account);
  // console.log("🚀 ~ file: Modal.jsx:10 ~ Modal ~ ids:", ids);

  async function stakeTokens(e) {
    e.preventDefault();
    if (stakeAmount !== "" && stakeAmount.length > 0) {
      await contract.stakeTokens(symbol, stakeAmount, {
        value: ethers.utils.parseUnits("1000", "wei"),
      });
      console.log(await contract.getPositionById(0));
    }
  }

  async function getAllUserPositionsId() {
    return await contract.getPositionsIdsByAddress(account);
  }

  async function getAllUserPositions(e) {
    e.preventDefault();
    const allUserPositionsId = getAllUserPositionsId();
    Promise.all(
      allUserPositionsId.then((data) =>
        data.map(async (item) => {
          const position = await contract.getPositionById(item.toString());
          setAllUserPositions((prev) => [...prev, position]);
        })
      )
    );
  }
  function show(e) {
    e.preventDefault();
    console.log(allUserPositions);
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
            <button
              style={{
                borderRadius: "10px",
                padding: "5px 15px",
              }}
              onClick={(e) => getAllUserPositions(e)}
            >
              Get all positions
            </button>
            <button
              style={{
                borderRadius: "10px",
                padding: "5px 15px",
              }}
              onClick={(e) => show(e)}
            >
              Show
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Modal;
