App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	hasVoted: false,

	init: function() {
		return App.initWeb3();
	},

	initWeb3: function() {
		// TODO: refactor conditional
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
			web3 = new Web3(App.web3Provider);
		}
		return App.initContract();
	},

	initContract: function() {
		$.getJSON("story_telling.json", function(story_telling) {
			// Instantiate a new truffle contract from the artifact
			App.contracts.story_telling = TruffleContract(story_telling);
			// Connect provider to interact with contract
			App.contracts.story_telling.setProvider(App.web3Provider);

			return App.render();
		});
	},

	render: function() {
		var storyInstance;

		web3.eth.getCoinbase(function(err, account) {
			if (err === null) {
				App.account = account;
				$("#accountAddress").html("Your Account: " + account);
			}
		});

		// Load contract data
		App.contracts.story_telling.deployed().then(function(instance) {
			storyInstance = instance;
			return storyInstance;
		}).then(function(storyInstance) {
			var finalStory = $("#finalStory");
			// finalStory.empty();

			storyInstance.allStories().then(function(res){
				res = res.split("#");
				tableEle = document.getElementById('storyTable');
				tableEle.style.display = "block";
				for (var i = 0; i < res.length; i++) {
					tableEle.innerHTML += ("<tr><td>"+res[i]+"</td></tr>");
				}
			});
		});
	},

	myFunction: function() 
	{
		var myId = $('#myID').val();
		var myText = $('#myText').val();
		//console.log(candidateId)
		App.contracts.story_telling.deployed().then(function(instance) {
		  // return instance.casteVote(candidateId, { from: App.account });
		  return instance.userRegister(myId,myText);
		}).then(function(result) {
		  // Wait for votes to update
		  App.render()
		}).catch(function(err) {
		  console.error(err);
		});
	},
};

$(function() {
	$(window).load(function() {
		App.init();
	});
});