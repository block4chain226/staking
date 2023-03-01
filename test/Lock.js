const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("Staking", function () {
  async function deployStakingAndZil() {
    const [zilOwner, StakingOwner, user1, user2] =
      await hre.ethers.getSigners();
    const Zil = await hre.ethers.getContractFactory("Zil", zilOwner);
    const zilContract = await Zil.deploy(10000);
    await zilContract.deployed();

    const Staking = await hre.ethers.getContractFactory(
      "Staking",
      StakingOwner
    );
    const stakingContract = await Staking.deploy(
      2000,
      hre.ethers.utils.parseUnits("1000", "wei")
    );
    await stakingContract.deployed();
    await zilContract.approve(stakingContract.address, 1000);
    return {
      zilOwner,
      StakingOwner,
      zilContract,
      stakingContract,
      user1,
      user2,
    };
  }
  describe("Staking", () => {
    it("should return zil token", async () => {
      const {
        zilOwner,
        zilContract,
        StakingOwner,
        stakingContract,
        user1,
        user2,
      } = await loadFixture(deployStakingAndZil);
      console.log(
        await zilContract.allowance(zilOwner.address, stakingContract.address)
      );
      await stakingContract
        .connect(StakingOwner)
        .addToken(zilContract.address, "Zilliqa", "ZIL", 1, 5);
      await stakingContract.connect(zilOwner).stakeTokens("ZIL", 1000, {
        value: hre.ethers.utils.parseUnits("1000", "wei"),
      });
      console.log("balance:", await zilContract.balanceOf(zilOwner.address));
      await time.increase(2629743);
      await stakingContract.connect(zilOwner).closePosition(0);
      console.log(await stakingContract.stakedTokens("ZIL"));
      console.log("balance:", await zilContract.balanceOf(zilOwner.address));
      console.log(await stakingContract.positions(0));
      // expect(await stakingContract.getToken("ZIL")).to.eq([
      //   ethers.BigNumber.from("1"),
      //   "Zilliqa",
      //   "ZIL",
      //   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      //   hre.ethers.BigNumber.from("1"),
      //   hre.ethers.BigNumber.from("0"),
      //   hre.ethers.BigNumber.from("5"),
      // ]);
    });
  });
});
