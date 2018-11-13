pragma solidity ^0.4.24;
import "./strings.sol";

contract story_telling{
    using strings for *;
	string public intro;
	string public allStories;
	uint public id;
	int public maxLen;
	
	struct userInfo{
        uint node_id;
        string plot; 
        uint parentId;
        int lenTillNode;
    }

    //mapping of Id to user
    mapping(uint => userInfo) public idToNode;

    //mapping of every leaf node path length
    mapping(uint => int) public leafNodeToLen;

    modifier validID(uint _id){
        require(_id <= id && _id > 0,"Enter valid ID");
    _;}

	constructor(string _intro) public
	{
		intro = _intro;
		id = 1;
		userInfo memory newUser = userInfo(id,_intro,0,1);
		idToNode[id] = newUser;
		leafNodeToLen[id] = 1;
		maxLen = 1;
		allStories = " ";
	}

    function uint2str(uint i) pure public 
    returns (string)
    {
	    if (i == 0) 
	    	return "0";
	    uint j = i;
	    uint length;
	    while (j != 0){
	        length++;
	        j /= 10;
	    }
	    bytes memory bstr = new bytes(length);
	    uint k = length - 1;
	    while (i != 0){
	        bstr[k--] = byte(48 + i % 10);
	        i /= 10;
	    }
	    return string(bstr);
	}

	function printStories() public
	{
		string memory open = "[";
		string memory close = "]";

		for(uint nodeID = 1;nodeID <= id;nodeID++){
			if(leafNodeToLen[nodeID] != -666){
				uint curID = nodeID;
				string memory wholeStory = " ";
				while(curID != 0){
					
					string memory IDtoStr = uint2str(curID);
					string memory curPlot = idToNode[curID].plot;
					string memory temp = open;
					
					temp = temp.toSlice().concat(IDtoStr.toSlice());
					temp = temp.toSlice().concat(close.toSlice());
					temp = temp.toSlice().concat(curPlot.toSlice());
					temp = temp.toSlice().concat(wholeStory.toSlice());
					wholeStory = temp;
					curID = idToNode[curID].parentId;
				}
				if(idToNode[nodeID].lenTillNode == maxLen)
					allStories = wholeStory.toSlice().concat(allStories.toSlice());
				else
					allStories = allStories.toSlice().concat(wholeStory.toSlice());
				allStories = allStories.toSlice().concat(" # ".toSlice());
			}
		}
	}

	//user providing id of node to extend and his plot
	function userRegister(uint _id,string _plot) public
	validID(_id)
	returns(bool)
	{
		id += 1;
		allStories = " ";
		//create new user object
		int l = idToNode[_id].lenTillNode + 1;
		if(maxLen < l){
			maxLen = l;
		}

		userInfo memory newUser = userInfo(id,_plot,_id,l);
		idToNode[id] = newUser;

		//add the new user as leaf node to the leafNodeToLen map
		leafNodeToLen[id] = l;
		//disable its parent from the leafNodeToLen map
		if(leafNodeToLen[_id] != -666){
			leafNodeToLen[_id] = -666;
		}
		printStories();
		return true;
	}
}