import React, { useCallback, useContext, useEffect, useState } from "react";
import ProviderContext from "../../providers/ProviderContext";
import AuthContext from "../../context/AuthContext";
import cl from "./Market.module.scss";
import Modal from "../Modal/Modal";

const Market = () => {
  const { contract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);
  const [allTokens, setAllTokens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [supply, setSupply] = useState([]);

  const getAllTokens = useCallback(async () => {
    const allSymbols = await contract.getTokensSymbols();
    const tokensTemp = allSymbols.map(
      async (symbol) => await contract.getToken(symbol)
    );
    Promise.all(tokensTemp).then((tokens) => {
      setAllTokens((prevTokens) => [...prevTokens, ...tokens]);
    });
    const totalSupply = allSymbols.map(async (symbol) => {
      return await contract.getStakedTokenTotalSupply(symbol);
    });
    Promise.all(totalSupply).then((tokens) => {
      setSupply([tokens]);
    });
  }, []);

  useEffect(() => {
    getAllTokens();
  }, [getAllTokens]);

  return (
    <>
      {showModal && <Modal />}
      {accounts[0] ? (
        <div className={cl.market}>
          {/* <button onClick={getAllTokens}>get</button> */}
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
              </div>
              {allTokens &&
                allTokens.map((item, key) => (
                  <div
                    key={item.tokenId.toString()}
                    className={cl.market__item}
                  >
                    <p>{item.tokenName}</p>
                    <p>{item.tokenSymbol}</p>
                    <p>{item.usdtPrice.toString()}</p>
                    <p>{supply.toString()[key]}</p>
                    <p>{item.apy.toString()}</p>
                    <button
                      data-id="vasa"
                      onClick={(e) => {
                        setShowModal(true);
                        console.log(e.target.getAttribute("data-id"));
                      }}
                    >
                      Stake
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Market;
