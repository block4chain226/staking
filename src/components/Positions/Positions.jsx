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
  const [allAccountPositions, setAllAccountPositions] = useState([]);

  const [accountPositions, tokensTotalMarket] = usePositions(
    contract,
    accounts[0]
  );

  async function prepareAsset() {
    if (accountPositions) {
      accountPositions.map(async (position) => {
        const daysStaked = await contract.calculateNumberDays(
          position.createDate
        );
        const accruedInterestWei = await contract.calculateInterest(
          position.apy,
          position.ethValue,
          daysStaked
        );
        const parsedAsset = {
          positionId: Number(position.positionId),
          tokenName: position.name,
          tokenSymbol: position.symbol,
          createdDate: Number(position.createDate),
          apy: position.apy / 100,
          tokensStaked: Number(position.tokenQuantity),
          usdtValue: position.usdtValue / 100,
          usdAccruedInterest: Number(accruedInterestWei),
          ethAccruedInterest: Number(accruedInterestWei),
          open: position.open,
        };

        setAllAccountPositions((prev) => [...prev, parsedAsset]);
      });
    }
  }

  function f() {
    console.log(allAccountPositions);
  }

  useEffect(() => {
    prepareAsset();
  }, [accountPositions]);

  return (
    <>
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
              {allAccountPositions.length &&
                Object.values(allAccountPositions).map((item, key) => (
                  <div key={item.positionId} className={cl.market__row}>
                    <div className={cl.market__item}>
                      <p>{item.tokenSymbol}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.tokensStaked}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.usdtValue}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.usdAccruedInterest}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.usdAccruedInterest}</p>
                    </div>
                    <div className={cl.market__item}>
                      <button>Withdraw</button>
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

export default Positions;
