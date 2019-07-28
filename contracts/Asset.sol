pragma solidity >=0.4.25 <0.6.0;

contract Asset {
	     
    int public id;
    string public name;
    address public owner;
    string public asset_location;

    enum StateType { Manufacturer, Shipper, Dealer, Buyer }
    StateType public state;
        
    constructor (int assetId, string memory assetName, address assetOwner) public 
    {
        id = assetId;
        name  = assetName;
        state = StateType.Manufacturer;
        owner = assetOwner;
    }
    
    function setOwner(address assetOwner) public {
        owner = assetOwner;
    }
    
    function setState(StateType assetState) public {
        state = assetState;
    }

    function setAssetLocation(string memory assetLocation) public {
        asset_location = assetLocation;
    }
}   