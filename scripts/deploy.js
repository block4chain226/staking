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

  console.log("stakingContract address", stakingContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
