// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Cardano is ERC20("Cardano", "ADA"){
    constructor(uint totalAmount){
         _mint(msg.sender, totalAmount);
    }
}