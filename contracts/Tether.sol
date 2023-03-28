// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tether is ERC20("Tether", "USDT"){
    constructor(){
         _mint(msg.sender, 10000);
    }
}