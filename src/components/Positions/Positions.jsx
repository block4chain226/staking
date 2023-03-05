import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProviderContext from "../../providers/ProviderContext";
import AuthContext from "../../context/AuthContext";
import cl from "./Positions.module.scss";
import Modal from "../Modal/Modal";
import usePositions from "../../hooks/usePositions";
//lsof -i:8545
//kill -9
//npx hardhat run scripts/deploy.js --network localhost
const Positions = () => {
  const { contract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);
  const [allTokens, setAllTokens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [supply, setSupply] = useState([]);

  // const accountPositions = usePositions(contract, accounts[0]);

  return (
    <>
      {showModal && (
        <Modal
          symbol={symbolRef.current}
          account={accounts[0]}
          contract={contract}
        />
      )}
      {accounts[0] ? (
        <div className={cl.market}>
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
                  <p>Staked</p>
                </div>
                <div className={cl.market__item}>
                  <p>Market Usdt</p>
                </div>
                <div className={cl.market__item}>
                  <p>Accrued interest(USDT)</p>
                </div>
                <div className={cl.market__item}>
                  <p>Accrued interest(ETH)</p>
                </div>
                <div className={cl.market__item}></div>
              </div>
              {accountPositions &&
                accountPositions.map((item, key) => (
                  <div
                    key={item.positionId.toString()}
                    className={cl.market__row}
                  >
                    <div className={cl.market__item}>
                      <p>{item.symbol}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.tokenQuantity}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.usdtValue.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.ethValue.toString()[key]}</p>
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
                        Withdraw
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
