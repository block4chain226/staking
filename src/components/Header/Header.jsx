import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import cl from "./Header.module.scss";

const Header = () => {
  const { accounts, setAccounts, requestAccount } = useContext(AuthContext);
  return (
    <div className={cl.header}>
      <div className={cl.header__wallet}>
        <p>{accounts[0]}</p>
      </div>
      <div className={cl.header__connect}>
        <button onClick={requestAccount}>Connect wallet</button>
      </div>
    </div>
  );
};

export default Header;
