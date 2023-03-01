import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const stakingABI = require("../abi/stakingABI.json");

const ProviderContext = createContext();

export const ProviderProvider = (props) => {
  let contract;
  const [updated, setUpdated] = useState(0);
  const contractAddress = "";
  async function getProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(
      props.contractAddress,
      stakingABI.abi,
      signer
    );
  }
  getProvider();

  return (
    <ProviderContext.Provider value={{ contract, updated, setUpdated }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
