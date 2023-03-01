import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import cl from "./Header.module.css";

const Header = () => {
  const { accounts, setAccounts, requestAccount } = useContext(AuthContext);
  return (
    <div className={cl.header}>
      <div className={cl.connect}>
        <button onClick={requestAccount}>Connect wallet</button>
      </div>
      <div className={cl.wallet}>
        <p></p>
      </div>
    </div>
  );
};

export default Header;
