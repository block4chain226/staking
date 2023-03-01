import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import cl from "./Header.module.css";

const Header = () => {
  const { account, setAccount } = useContext(AuthContext);
  return (
    <div className={cl.header}>
      <div className={cl.connect}>
        <button />
      </div>
      <div className={cl.wallet}>
        <p></p>
      </div>
    </div>
  );
};

export default Header;
