const MyToken = artifacts.require("MyToken");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
    deployer.deploy(MyToken, 100);
    deployer.deploy(MarketPlace);
};