import { createContext, useEffect } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const stakingABI = require("../abi/stakingABI.json");

const ProviderContext = createContext();

export const ProviderProvider = (props) => {
  let contract;
  const [updated, setUpdated] = useState(0);
  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
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
