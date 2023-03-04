const hre = require("hardhat");

async function main() {
  const [stakingOwner, tokensOwner] = await hre.ethers.getSigners();
  /////
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
  const Tether = await hre.ethers.getContractFactory("Tether", tokensOwner);
  const tetherContract = await Tether.deploy();
  await tetherContract.deployed();
  /////
  const WrappedEther = await hre.ethers.getContractFactory(
    "WrappedEther",
    tokensOwner
  );
  const wrappedEtherContract = await WrappedEther.deploy();
  await wrappedEtherContract.deployed();

  await cardanoContract
    .connect(tokensOwner)
    .approve(stakingContract.address, 10000);
  await zilContract
    .connect(tokensOwner)
    .approve(stakingContract.address, 10000);
  await wrappedEtherContract
    .connect(tokensOwner)
    .approve(stakingContract.address, 10000);
  await tetherContract
    .connect(tokensOwner)
    .approve(stakingContract.address, 10000);

  await stakingContract.addToken(
    cardanoContract.address,
    "Cardano",
    "ADA",
    3,
    10
  );
  await stakingContract.addToken(zilContract.address, "Zilliqa", "ZIL", 5, 12);
  await stakingContract.addToken(
    wrappedEtherContract.address,
    "WrappedEther",
    "ETH",
    2000,
    8
  );
  await stakingContract.addToken(
    tetherContract.address,
    "Tether",
    "USDT",
    1,
    5
  );

  console.log("stakingContract address", stakingContract.address);
  console.log("cardanoContract address", cardanoContract.address);
  console.log("zilContract address", zilContract.address);
  console.log("tetherContract address", tetherContract.address);
  console.log("wrappedEtherContract address", wrappedEtherContract.address);
  console.log("stakingOwner", stakingOwner.address);
  console.log("tokensOwner", tokensOwner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
