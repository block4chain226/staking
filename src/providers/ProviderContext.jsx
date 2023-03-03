import { createContext, useEffect } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const stakingABI = require("../abi/stakingABI.json");

const ProviderContext = createContext();

export const ProviderProvider = (props) => {
  let contract;
  const [updated, setUpdated] = useState(0);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  async function getProvider(contractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, stakingABI.abi, signer);
  }

  // useEffect(() => {
  getProvider(contractAddress);
  // }, []);

  return (
    <ProviderContext.Provider value={{ contract, updated, setUpdated }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
