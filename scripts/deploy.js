const hre = require("hardhat");

async function main() {
  const [stakingOwner, tokensOwner] = await hre.ethers.getSigners();
  const Staking = await hre.ethers.getContractFactory("Staking", stakingOwner);
  const stakingContract = await Staking.deploy(
    2000,
    hre.ethers.utils.parseUnits("1000", "wei"),
    { value: hre.ethers.utils.parseEther("10") }
  );
  await stakingContract.deployed();
  /////
  const Cardano = await hre.ethers.getContractFactory("Cardano", tokensOwner);
  const cardanoContract = await Cardano.deploy();
  await cardanoContract.deployed();
  /////
  const Zil = await hre.ethers.getContractFactory("Zil", tokensOwner);
  const zilContract = await Zil.deploy();
  await zilContract.deployed();
  /////
  const ChainLink = await hre.ethers.getContractFactory(
    "ChainLink",
    tokensOwner
  );
  const chainLinkContract = await ChainLink.deploy();
  await chainLinkContract.deployed();
  /////
  const Tether = await hre.ethers.getContractFactory("Tether", tokensOwner);
  const tetherContract = await Tether.deploy();
  await tetherContract.deployed();
  /////
  const UsdCoin = await hre.ethers.getContractFactory("UsdCoin", tokensOwner);
  const usdCoinContract = await UsdCoin.deploy();
  await usdCoinContract.deployed();

  console.log("stakingContract address", stakingContract.address);
  console.log("cardanoContract address", cardanoContract.address);
  console.log("zilContract address", zilContract.address);
  console.log("chainLinkContract address", chainLinkContract.address);
  console.log("tetherContract address", tetherContract.address);
  console.log("usdCoinContractContract address", usdCoinContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
