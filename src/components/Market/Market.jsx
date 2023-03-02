import React from "react";
import cl from "./Market.module.scss";

const Market = () => {
  return (
    <div className={cl.market}>
      <div className={cl.market__container}>
        <div className={cl.market__title}>
          <p>Ethereum market</p>
        </div>
        <div className={cl.market__content}>
          <div className={cl.market__item}>
            <p>Asset</p>
            <p>Symbol</p>
            <p>Price</p>
            <p>Supply</p>
            <p>Apy</p>
            <button>Stake</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
