// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LipToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;
  uint256 AlreadyUsed = 0;

  uint256 fee = 0 ether;
  uint256 toolFee =  0 ether;
  // uint256 fee = 0.01 ether;
  // uint256 toolFee =  0.001 ether;
  

  string[] public toolType;
  function pushString() public{
    toolType.push("water");
    toolType.push("fertilizer");
    toolType.push("scissor");
  }

  struct Lip {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
    uint8 ableToLevel;
  }

  struct Tool{
    string typeOfTool;
    uint256 id;
    uint8 rarity;
  }

  Lip[] public lips;
  Tool[] public tools;

  event NewLip(address indexed owner, uint256 id, uint256 dna);
  event NewTool(address indexed owner, uint256 id);

  // Helpers
  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function updateFee(uint256 _fee) external onlyOwner {
    fee = _fee;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  // Creation of seeds
  function _createLip(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    Lip memory newLip = Lip(_name, COUNTER, randDna, 1, randRarity, 0);
    lips.push(newLip);
    _safeMint(msg.sender, COUNTER);
    emit NewLip(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomLip(string memory _name) public payable {
    require(msg.value >= fee);
    _createLip(_name);
  }

  // Creation of tools
  function _createTools() internal {
    pushString();
    uint8 randToolRarity = uint8(_createRandomNum(10));
    string memory randTool = toolType[uint8(_createRandomNum(3))];
    Tool memory newTool = Tool(randTool, COUNTER, randToolRarity);
    tools.push(newTool);
    _safeMint(msg.sender, COUNTER);
    emit NewTool(msg.sender, COUNTER);
    COUNTER++;
  }

  function createRandomTool() public payable {
    require(msg.value >= toolFee);
    _createTools();
  }

  // UseTool
  function useTool(address _owner, uint256 _lipId, uint256 _toolId) public {
    uint256 tokenIdToUse = 0;
    uint256 counterT = 0;
    for (uint256 i = 0; i < tools.length; i++) {
      if(!_exists(i)){
        continue;
      }
      if (ownerOf(i) == _owner) {
        counterT++;
      }
      if(tools[i].id == _toolId){
        tokenIdToUse = i;
      }
    }
    uint256 tokenIdToLevel = 0;
    uint256 counterL = 0;
    for (uint256 c = 0; c < lips.length; c++) {
      if(!_exists(c)){
        continue;
      }
      if (ownerOf(c) == _owner) {
        counterL++;
      }
      if(lips[c].id == _lipId){
        tokenIdToLevel = c;
      }
    }
    require(ownerOf(_toolId) == msg.sender, "Tool does not belong to sender");
    require(ownerOf(_lipId) == msg.sender, "Lip does not belong to sender");
    Lip storage lip = lips[tokenIdToLevel];
    require(lip.ableToLevel < 3, "Max ableToLevel reached");

    Tool memory tool = tools[tokenIdToUse];
    require(keccak256(bytes(tool.typeOfTool)) == keccak256(bytes("scissor")), "Tool must be of type 'scissor'");

    AlreadyUsed++;
    lip.ableToLevel++;
    _burn(_toolId);
    
  }


 


  // Getters
  function getLips() public view returns (Lip[] memory) {
    return lips;
  }

  function getTools() public view returns (Tool[] memory) {
    return tools;
  }

  function getOwnerLips(address _owner) public view returns (Lip[] memory) {
    Lip[] memory result = new Lip[](lips.length);
    uint256 counter = 0;
    for (uint256 i = 0; i < lips.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = lips[i];
        counter++;
      }
    }
    return result;
  }

  function getOwnerTools(address _owner) public view returns (Tool[] memory) {
    Tool[] memory resultTool = new Tool[](tools.length-AlreadyUsed);
    uint256 counterT = 0;
    for (uint256 i = 0; i < tools.length; i++) {
      if(!_exists(tools[i].id)){
        continue;
      }
      if (ownerOf(tools[i].id) == _owner) {
        resultTool[counterT] = tools[i];
        counterT++;
      }
    }
    return resultTool;
  }

 


  // Actions
  function levelUp(uint256 _lipId) public {
    require(ownerOf(_lipId) == msg.sender);
    Lip storage lip = lips[_lipId];
    require(lip.ableToLevel == 3, "Lip is not ready to level up yet");
    lip.level++;
    lip.ableToLevel = 0;
  }
}