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

    event AddToken(uint tokenId, address indexed _tokenAddress, string indexed _name,
    string _symbol, uint _usdtPrice, uint indexed ethInUsdtPrice, uint apy);

    constructor(uint _currentEtherPrice){
        ethInUsdtPrice = _currentEtherPrice;
       _transferOwnership(msg.sender);
    }

    function addToken(address _tokenAddress, string calldata _name, string calldata _symbol, uint _usdtPrice, uint _apy) external onlyOwner{
        require(_tokenAddress!=address(0), "You can't add not existing token");
        require(bytes(_name).length>0 && bytes(_symbol).length>0, "you did not enter name or symbol");
        require(_usdtPrice>0, "price can't be 0");
        _currentTokenIdCounter.increment();
        uint tokenId = _currentTokenIdCounter.current();
        _currentPositionId.increment();
        Token memory newToken = Token(tokenId, _name, _symbol, _tokenAddress, _usdtPrice, _usdtPrice/ethInUsdtPrice, _apy);
        tokenSymbols.push(_symbol);
        tokens[_symbol] = newToken;
        emit AddToken(tokenId, _tokenAddress, _name, _symbol, _usdtPrice, _usdtPrice/ethInUsdtPrice, _apy);
    }


    
}