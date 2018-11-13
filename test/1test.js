var story_telling = artifacts.require("story_telling");
expect = require("chai").expect;

contract("Test the story_telling contract",function(accounts){
	describe("Deploy the story_telling contract",function(){
		it("Catch an instance of story_telling",function(){
			return story_telling.new("abc").then(function(instance){
				story_telling_contract = instance;
			});
		});
	});

	describe("Check the contract variables",function(){
		it("The intro should be abc",function(){
			return story_telling_contract.intro().then(function(res){
				expect(res.toString()).to.be.equal("abc");
			});
		});

		it("The maxLen should be 1",function(){
			return story_telling_contract.maxLen().then(function(res){
				expect(res.toString()).to.be.equal("1");
			});
		});
	});

	
})