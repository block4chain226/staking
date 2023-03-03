import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProviderContext from "../../providers/ProviderContext";
import AuthContext from "../../context/AuthContext";
import cl from "./Market.module.scss";
import Modal from "../Modal/Modal";
//lsof -i:8545
//kill -9
const Market = () => {
  const { contract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);
  const [allTokens, setAllTokens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [supply, setSupply] = useState([]);
  let symbolRef = useRef("");

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
      {showModal && <Modal symbol={symbolRef.current} contract={contract} />}
      {accounts[0] ? (
        <div className={cl.market}>
          {/* <button onClick={getAllTokens}>get</button> */}
          <div className={cl.market__container}>
            <div className={cl.market__title}>
              <p>Ethereum market</p>
            </div>
            <div className={cl.market__content}>
              <div
                className={cl.market__row}
                style={{ padding: "10px", textAlign: "center" }}
              >
                <div className={cl.market__item}>
                  <p>Asset</p>
                </div>
                <div className={cl.market__item}>
                  <p>Asset</p>
                </div>
                <div className={cl.market__item}>
                  <p>Asset</p>
                </div>
                <div className={cl.market__item}>
                  <p>Asset</p>
                </div>
                <div className={cl.market__item}>
                  <p>Asset</p>
                </div>
                <div className={cl.market__item}></div>
              </div>
              {allTokens &&
                allTokens.map((item, key) => (
                  <div key={item.tokenId.toString()} className={cl.market__row}>
                    <div className={cl.market__item}>
                      <p>{item.tokenName}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.tokenSymbol}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.usdtPrice.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{supply.toString()[key]}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.apy.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      <button
                        onClick={(e) => {
                          symbolRef.current = item.tokenSymbol;
                          setShowModal(true);
                          console.log(e.target.getAttribute("data-id"));
                          console.log(symbolRef);
                        }}
                      >
                        Stake
                      </button>
                    </div>
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
