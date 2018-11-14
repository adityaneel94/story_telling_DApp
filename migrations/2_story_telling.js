var story_telling = artifacts.require("./story_telling.sol");

module.exports = function(deployer) {
	var intro = "Once upon a time...";
  	deployer.deploy(story_telling,intro);
};
