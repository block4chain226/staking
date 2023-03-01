// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WrappedEther is ERC20("WrappedEther", "WETH"){
    constructor(){
         _mint(msg.sender, 10000);
    }
}