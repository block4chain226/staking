import React, { useContext, useEffect, useState } from "react";
import ProviderContext from "../../providers/ProviderContext";
import cl from "./Market.module.scss";

const Market = () => {
  const { contract } = useContext(ProviderContext);
  const [allTokens, setAllTokens] = useState([]);

  async function getAllTokens() {
    const allSymbols = await contract.getTokensSymbols();
    const tokensTemp = allSymbols.map(
      async (symbol) => await contract.getToken(symbol)
    );
    console.log(
      "🚀 ~ file: Market.jsx:14 ~ getAllTokens ~ tokensTemp:",
      allSymbols
    );
  }

  return (
    <div className={cl.market}>
      <button onClick={getAllTokens}>get</button>
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
