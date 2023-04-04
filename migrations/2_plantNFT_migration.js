const PlantNFT = artifacts.require("PlantNFT");

module.exports = function (deployer) {
  deployer.deploy(PlantNFT, "PlantNFT", "PLANTS");
};



