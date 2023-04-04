// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlantNFT is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;
  uint256 AlreadyUsed = 0;

  uint256 fee = 0.01 ether;
  uint256 toolFee =  0.001 ether;
  

  string[] public toolType;
  function pushString() public{
    toolType.push("water");
    toolType.push("fertilizer");
    toolType.push("scissor");
  }

  struct Plant {
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

  Plant[] public plants;
  Tool[] public tools;

  event NewPlant(address indexed owner, uint256 id, uint256 dna);
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
  function _createPlant(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    Plant memory newPlant = Plant(_name, COUNTER, randDna, 1, randRarity, 0);
    plants.push(newPlant);
    _safeMint(msg.sender, COUNTER);
    emit NewPlant(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomPlant(string memory _name) public payable {
    require(msg.value >= fee);
    _createPlant(_name);
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
  function useTool(address _owner, uint256 _plantId, uint256 _toolId) public {
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
    for (uint256 c = 0; c < plants.length; c++) {
      if(!_exists(c)){
        continue;
      }
      if (ownerOf(c) == _owner) {
        counterL++;
      }
      if(plants[c].id == _plantId){
        tokenIdToLevel = c;
      }
    }
    require(ownerOf(_toolId) == msg.sender, "Tool does not belong to sender");
    require(ownerOf(_plantId) == msg.sender, "Plant does not belong to sender");
    Plant storage plant = plants[tokenIdToLevel];
    // require(lip.ableToLevel < 3, "Max ableToLevel reached");

    // Tool memory tool = tools[tokenIdToUse];
    // require(keccak256(bytes(tool.typeOfTool)) == keccak256(bytes("scissor")), "Tool must be of type 'scissor'");

    if(plant.rarity<=20){
      require(plant.ableToLevel == 10, "Plant is not ready to level up yet");
    }
    if(plant.rarity>20 && plant.rarity<=40){
      require(plant.ableToLevel < 8, "Max ableToLevel reached");
    }
    if(plant.rarity>40 && plant.rarity<=60){
      require(plant.ableToLevel < 6, "Max ableToLevel reached");
    }
    if(plant.rarity>60 && plant.rarity<=80){
      require(plant.ableToLevel < 4, "Max ableToLevel reached");
    }
    if(plant.rarity>80 && plant.rarity<=100){
      require(plant.ableToLevel < 3, "Max ableToLevel reached");
    }
    AlreadyUsed++;
    plant.ableToLevel++;
    _burn(_toolId);
    
  }


 


  // Getters
  function getPlants() public view returns (Plant[] memory) {
    return plants;
  }

  function getTools() public view returns (Tool[] memory) {
    return tools;
  }

  function getOwnerPlants(address _owner) public view returns (Plant[] memory) {
    Plant[] memory result = new Plant[](plants.length);
    uint256 counter = 0;
    for (uint256 i = 0; i < plants.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = plants[i];
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
  function levelUp(uint256 _plantId) public {
    require(ownerOf(_plantId) == msg.sender);
    Plant storage plant = plants[_plantId];
    if(plant.rarity<=20){
      require(plant.ableToLevel == 10, "plant is not ready to level up yet");
     
    }
    if(plant.rarity>20 && plant.rarity<=40){
      require(plant.ableToLevel == 8, "plant is not ready to level up yet");
     
    }
    if(plant.rarity>40 && plant.rarity<=60){
      require(plant.ableToLevel == 6, "plant is not ready to level up yet");
      
    }
    if(plant.rarity>60 && plant.rarity<=80){
      require(plant.ableToLevel == 4, "plant is not ready to level up yet");
      
    }
    if(plant.rarity>80 && plant.rarity<=100){
      require(plant.ableToLevel == 3, "plant is not ready to level up yet");
      
    }
    plant.level++;
    plant.ableToLevel = 0;
  }
}