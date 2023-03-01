// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Zil.sol";

contract Staking is Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private currentTokenIdCounter;
    Counters.Counter private currentPositionId;

    uint public ethInUsdtPrice;
    uint public STAKINGFEE;

    bool locked;

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
        address owner;
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
    mapping(string=>uint) public stakedTokens;

    event AddToken(uint tokenId, address indexed tokenAddress, string indexed name,
    string symbol, uint usdtPrice, uint indexed ethInUsdtPrice, uint apy);
    event StakingTokens(uint indexed positionId, address indexed owner, uint stakingAmount, uint indexed date);
    event StopStaking(uint indexed positionId, address indexed owner, uint rewardPaid, uint indexed date);

    constructor(uint currentEtherPrice, uint stakingFee) payable{
        require(stakingFee>0, "staking fee can't be 0");
        STAKINGFEE = stakingFee;
        ethInUsdtPrice = currentEtherPrice;
       transferOwnership(msg.sender);
    }

    function addToken(address tokenAddress, string calldata name, string calldata symbol, uint usdtPrice, uint apy) external onlyOwner{
        require(tokenAddress!=address(0), "You can't add not existing token");
        require(bytes(name).length>0 && bytes(symbol).length>0, "you did not enter name or symbol");
        require(usdtPrice>0, "price can't be 0");
        currentTokenIdCounter.increment();
        uint tokenId = currentTokenIdCounter.current();
        Token memory newToken = Token(tokenId, name, symbol, tokenAddress, usdtPrice, usdtPrice/ethInUsdtPrice, apy);
        tokenSymbols.push(symbol);
        tokens[symbol] = newToken;
        emit AddToken(tokenId, tokenAddress, name, symbol, usdtPrice, usdtPrice/ethInUsdtPrice, apy);
    }
        /////
     function getTokensSymbols() public view returns(string[] memory){
        return tokenSymbols;
    }

    function getToken(string calldata symbol) public view returns(Token memory){
        return tokens[symbol];
    }

    function stakeTokens(string calldata symbol, uint stakingAmount) public payable  {
        require(msg.value == STAKINGFEE, "you must pay fee for staking");
        require(stakingAmount>0, "you can't stake 0 tokens");
        require(tokens[symbol].tokenId!=0, "you can't stake not existent token");

        address tokenAddress = tokens[symbol].tokenAddress;
        uint userBalance = IERC20(tokenAddress).balanceOf(msg.sender);
        require(userBalance>=stakingAmount, "you have not enough tokens");

        IERC20(tokenAddress).transferFrom(msg.sender, address(this), stakingAmount);
        
        positions[currentPositionId.current()] = Position(
            currentPositionId.current(),
            msg.sender,
            tokens[symbol].tokenName, 
            tokens[symbol].tokenSymbol,
            block.timestamp,
            tokens[symbol].apy,
            stakingAmount,
            tokens[symbol].usdtPrice * stakingAmount,
            (tokens[symbol].ethPrice * stakingAmount) / ethInUsdtPrice,
            true);
            positionsIdsByAddress[msg.sender].push(currentPositionId.current());
            stakedTokens[symbol]+=stakingAmount;
            emit StakingTokens(currentPositionId.current(), msg.sender, stakingAmount, block.timestamp);
            currentPositionId.increment();
    }

    function getPositionsIdsByAddress(address user) external view returns(uint[] memory){
        return positionsIdsByAddress[user];
    }

    function getPositionById(uint positionid) external view returns(Position memory){
        return positions[positionid];
    }

    function calculateInterest(uint apy, uint ethValue, uint daysNumber) public pure  returns(uint){
        return apy * ethValue * daysNumber / 10000 / 365;
    }

    function closePosition(uint index) public noReentrancy{
        Position memory position = positions[index];
        require(position.owner == msg.sender, "not the position owner");
        require(position.open == true, "position has already been closed");
        require(position.positionId == index, "not right position id");
        stakedTokens[position.symbol]-=position.tokenQuantity;
        IERC20(tokens[position.symbol].tokenAddress).transfer(msg.sender, position.tokenQuantity);
        uint daysDiff = (block.timestamp - position.createDate) / 60 / 60 / 24;
        uint reward = calculateInterest(position.apy, position.ethValue, daysDiff);
        payable(msg.sender).transfer(reward);
        position.open = false;
        positions[index] = position;
        emit StopStaking(position.positionId, position.owner, reward, block.timestamp);
    }

    modifier noReentrancy(){
        require(!locked, "reentrancy");
        locked = true;
        _;
        locked = false;
    }



    
}