// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Chainlink is ERC20("Chainlink", "LINK"){
    constructor(uint totalAmount){
         _mint(msg.sender, totalAmount);
    }
}