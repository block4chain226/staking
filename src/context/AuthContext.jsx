import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  async function requestAccount() {
    try {
      if (window.ethereum) {
        const acc = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(acc);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
