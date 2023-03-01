// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zil is ERC20("Zilliqa", "ZIL"){
    constructor(){
        _mint(msg.sender, 10000);
    }
}