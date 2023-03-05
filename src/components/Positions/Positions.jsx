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
import { type } from "@testing-library/user-event/dist/type";
import { ethers } from "hardhat";
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
        const accruedInterestEther =
          ethers.utils.parseEther(accruedInterestWei);
      });
    }
  }

  async function getNumberDays(numberDays) {
    return await contract.calculateNumberDays(numberDays);
  }

  async function getInterest(apy, value, daysNumber) {
    return await contract.calculateInterest(apy, value, daysNumber);
  }

  useEffect(() => {
    setAllAccountPositions(accountPositions);
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
              {allAccountPositions &&
                allAccountPositions.map((item, key) => (
                  <div
                    key={item.positionId.toString()}
                    className={cl.market__row}
                  >
                    <div className={cl.market__item}>
                      <p>{item.symbol}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.tokenQuantity.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      {/* <p>{item.usdtValue.toString()}</p> */}
                      <p>
                        {/* {(
                          (item.apy *
                            2000 *
                            (new Date().getTime() +
                              (1000 * 60 * 60 * 24 * 1) / 1000 -
                              new Date(+item.createDate))) /
                          1000 /
                          60 /
                          60 /
                          24 /
                          1000 /
                          365
                        ).toLocaleString("en-US", {
                          minimumIntegerDigits: 1,
                          useGrouping: false,
                        })} */}

                        {}
                      </p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.ethValue.toString()[key]}</p>
                    </div>
                    <div className={cl.market__item}>
                      <p>{item.apy.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      <button
                      // onClick={(e) => {
                      //   symbolRef.current = item.tokenSymbol;
                      //   setShowModal(true);
                      //   console.log(e.target.getAttribute("data-id"));
                      //   console.log(symbolRef);
                      // }}
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

export default Positions;
