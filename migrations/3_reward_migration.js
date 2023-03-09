const LipToken = artifacts.require("LipToken");
const Reward = artifacts.require("Reward");

module.exports = async function (deployer) {
  await deployer.deploy(LipToken, "LipTokens", "LIPS");
  const lipTokenInstance = await LipToken.deployed();
  await deployer.deploy(Reward, lipTokenInstance.address);
};
