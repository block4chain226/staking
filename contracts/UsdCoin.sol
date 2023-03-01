// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UsdCoin is ERC20("UsdCoin", "USDT"){
    constructor(){
        _mint(msg.sender, 10000);
    }
}