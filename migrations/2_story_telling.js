var story_telling = artifacts.require("./story_telling.sol");

module.exports = function(deployer) {
	var intro = "abc";
  	deployer.deploy(story_telling,intro);
};
