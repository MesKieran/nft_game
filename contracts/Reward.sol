// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./PlantNFT.sol";

contract Reward is ERC20{
    PlantNFT public plantNFT;
    IERC20 erc20Token = IERC20(address(this));

    mapping(address => mapping(uint256 => uint256)) public lastClaimTime;

    uint256 public constant CLAIM_COOLDOWN = 30 seconds;

    constructor(address _PlantNFTAddress) ERC20("TST", "TST"){
        _mint(address(this), 1000 ether);
        plantNFT = PlantNFT(_PlantNFTAddress);
        
    }

    function getPlants(address _owner) public view returns (PlantNFT.Plant[] memory) {
        return plantNFT.getOwnerPlants(_owner);
    }

    function getLevel(address _owner, uint256 _plantId) public view returns(uint256){

        return plantNFT.getOwnerPlants(_owner)[_plantId].level;
    }

    function getRarity(address _owner, uint256 _plantId) public view returns(uint256){
        
        return plantNFT.getOwnerPlants(_owner)[_plantId].rarity;
    }
    

    function claimRewards(address _owner, uint256 _tokenId) external {
        require(plantNFT.ownerOf(_tokenId) == msg.sender, "Only NFT owner can claim reward");

        uint256 lastClaim = lastClaimTime[msg.sender][_tokenId];
        require(block.timestamp - lastClaim >= CLAIM_COOLDOWN, "Can't claim rewards yet");

        erc20Token.approve(address(this), 1000 ether);
        uint256 _rarity = getRarity(_owner, _tokenId);
        uint256 _level = getLevel(_owner, _tokenId);
        uint256 reward = calculateReward(_rarity, _level);
        
        lastClaimTime[msg.sender][_tokenId] = block.timestamp;
        
        this.transferFrom(address(this),msg.sender, reward);
        // this.transfer(msg.sender, _amount);
    }

    

    function calculateReward(uint256 _rarity, uint256 _level) public pure returns (uint256) {
        uint256 reward = _level *_rarity  ;
        return reward;
    }

    function howLongCanClaim(address _owner, uint256 _tokenId) public view returns(uint256){
        uint256 lastClaim = lastClaimTime[_owner][_tokenId];
        return block.timestamp - lastClaim;
    }
    
    function ReturnBalance(address _owner) public view returns(uint256){
        return balanceOf(_owner);
    }
}


