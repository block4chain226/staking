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
                      <p>{item.tokenQuantity.toString()}</p>
                    </div>
                    <div className={cl.market__item}>
                      {/* <p>{item.usdtValue.toString()}</p> */}
                      <p>
                        {/* {item.apy *
                          ((item.apy / 100) *
                            2000 *
                            ((new Date().getTime() - item.createDate) /
                              100000000000 /
                              365))} */}
                        {(item.apy *
                          2000 *
                          Math.floor(
                            (new Date().getTime() / 1000 -
                              new Date(+item.createDate)) /
                              1000 /
                              60 /
                              60 /
                              24
                          )) /
                          1000 /
                          365}
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
