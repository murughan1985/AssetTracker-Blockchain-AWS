var AssetTracker = artifacts.require("AssetTracker");
AssetTracker.synchronization_timeout = 0;
module.exports = function(deployer) {
  deployer.deploy(AssetTracker);
};