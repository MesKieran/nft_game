// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./LipToken.sol";

contract Reward is ERC20{
    LipToken public lipToken;
    IERC20 erc20Token = IERC20(address(this));
    

    constructor(address _lipTokenAddress) ERC20("TST", "TST"){
        _mint(address(this), 1000000000);
        lipToken = LipToken(_lipTokenAddress);
        
    }

    function getLips() public view returns (LipToken.Lip[] memory) {
        return lipToken.getLips();
    }

    function getLevel(uint256 _lipId) public view returns(uint256){

        return lipToken.getLips()[_lipId].level;
    }

    function getRarity(uint256 _lipId) public view returns(uint256){
        
        return lipToken.getLips()[_lipId].rarity;
    }
    

    function claimRewards(uint256 _tokenId) external {
        require(lipToken.ownerOf(_tokenId) == msg.sender, "Only NFT owner can claim reward");
        erc20Token.approve(address(this), 1000000000);
        uint256 _rarity = getRarity(_tokenId);
        uint256 _level = getLevel(_tokenId);
        uint256 reward = calculateReward(_rarity, _level);
        // require(totalReward > 0, "No rewards available");
        
        this.transferFrom(address(this),msg.sender, reward);
        // this.transfer(msg.sender, _amount);
    }

    

    function calculateReward(uint256 _rarity, uint256 _level) public pure returns (uint256) {
        uint256 reward = _level *_rarity ;
        return reward;
}
}
