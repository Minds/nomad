const Usernames = artifacts.require('./Usernames.sol')

module.exports = (deployer) => {

  deployer.deploy(Usernames);

};