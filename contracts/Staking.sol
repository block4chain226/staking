// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Staking is Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _currentTokenIdCounter;
    Counters.Counter private _currentPositionId;

    uint public ethInUsdtPrice;
    uint public STAKINGFEE;

    struct Token{
        uint tokenId;
        string tokenName;
        string tokenSymbol;
        address tokenAddress;
        uint usdtPrice;
        uint ethPrice;
        uint apy;
    }

    struct Position{
        uint positionId;
        address wallet;
        string name;
        string symbol;
        uint createDate;
        uint apy;
        uint tokenQuantity;
        uint usdtValue;
        uint ethValue;
        bool open;
    }

    string[] public tokenSymbols;

    mapping(string=>Token) public tokens;
    mapping(uint=>Position) public positions;
    mapping(address=>uint[]) public positionsIdsByAddress;
    mapping(string=>int) public stakedTokens;

    
}