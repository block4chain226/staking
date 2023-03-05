import { createContext, useEffect } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const stakingABI = require("../abi/stakingABI.json");

const ProviderContext = createContext();

export const ProviderProvider = (props) => {
  let contract;

  const [updated, setUpdated] = useState(0);
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  async function getProvider(contractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, stakingABI.abi, signer);
  }

  getProvider(contractAddress);

  return (
    <ProviderContext.Provider value={{ contract, updated, setUpdated }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
