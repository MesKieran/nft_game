const PlantNFT = artifacts.require("PlantNFT");
const Reward = artifacts.require("Reward");

module.exports = async function (deployer) {
  await deployer.deploy(PlantNFT, "PlantNFT", "PLANTS");
  const plantNFTInstance = await PlantNFT.deployed();
  await deployer.deploy(Reward, plantNFTInstance.address);
};
