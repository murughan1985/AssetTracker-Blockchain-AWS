pragma solidity >=0.4.25 <0.6.0;

import "./Asset.sol";
import "./Manufacturer.sol";
import "./Shipper.sol";
import "./Dealer.sol";
import "./Buyer.sol";

contract AssetTracker
{
    //Participants
    mapping (address => Manufacturer) public manufacturers;
    mapping (address => Shipper) public shippers;
    mapping (address => Dealer) public dealers;
    mapping (address => Buyer) public buyers;
    
    //Asset 
    mapping (int => Asset) public assets;
    int public assetId ;
    
    //Events
    event AssetCreate(address account, int assetID, string manufacturer);
    event AssetTransfer(address from, address to, int assetID);
    
    //Create Participants
    function createManufacturer(string memory manufacturerName, address manufacturerAddress, string memory manufacturerLocation) public
    {
        Manufacturer manufacturer = new Manufacturer(manufacturerName, manufacturerAddress, manufacturerLocation);
        manufacturers[manufacturerAddress] = manufacturer;
    }
    
    function createShipper(string memory shipperName, address shipperAddress, string memory shipperLocation) public
    {
        Shipper shipper = new Shipper(shipperName, shipperAddress, shipperLocation);
        shippers[shipperAddress] = shipper;
    }
    
    function createDealer(string memory dealerName, address dealerAddress, string memory dealerLocation) public
    {
        Dealer dealer = new Dealer(dealerName, dealerAddress, dealerLocation);
        dealers[dealerAddress] = dealer;
    }
    
    function createBuyer(string memory buyerName, address buyerAddress, string memory buyerLocation) public
    {
        Buyer buyer = new Buyer(buyerName, buyerAddress, buyerLocation);
        buyers[buyerAddress] = buyer;
    }
    
    //Create Assets
    function createAsset(string memory assetName) public returns (int)
    {
      //Only manufacturer can create an asset
       if (msg.sender != manufacturers[msg.sender].manufacturer_address())
            revert();
        assetId = assetId + 1;
        Asset asset =  new Asset(assetId, assetName, msg.sender);
        assets[assetId] = asset;
        
        emit AssetCreate (msg.sender, assetId, manufacturers[msg.sender].name());
        return assetId;
    }

 
    function getCurrentOwner(int assetID) public view returns(address) {
        Asset asset = assets[assetID];
        return asset.owner();
    }
    function getManufacturerAdress(address adr) public view returns(address) {
             Manufacturer manufacturer = manufacturers[adr];
             return manufacturer.manufacturer_address();
    }
    function getCurrentState(int assetID) public view returns(Asset.StateType) {
        Asset asset = assets[assetID];
        return asset.state();
    }
     function setAssetCurrentLocation(int assetID, string memory assetLocation) public 
    {
        //Transfer to Shipper from Manufacturer
        Asset asset = assets[assetID];
        asset.setAssetLocation(assetLocation);
    }

    function transferAsset(address to, int assetID) public 
    {
        //Transfer to Shipper from Manufacturer
        Asset asset = assets[assetID];
        if(int(asset.state()) == 0 && to == shippers[to].shipper_address())
        {
         asset.setOwner(to);
         asset.setState(Asset.StateType.Shipper);
        }
        
        //Transfer to Dealer from Shipper
        else  if(int(asset.state()) == 1 && to == dealers[to].dealer_address())
        {
            asset.setOwner(to);
            asset.setState(Asset.StateType.Dealer);
        }
        
        //Transfer to Buyer from Dealer
        else  if(int(asset.state()) == 2 && to == buyers[to].buyer_address())
        {
            asset.setOwner(to);
            asset.setState(Asset.StateType.Buyer);
        }
       
        emit AssetTransfer (msg.sender, to, assetID);
    
      
	}
}



