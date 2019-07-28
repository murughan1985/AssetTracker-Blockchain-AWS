var AssetTracker = artifacts.require("../contracts/AssetTracker.sol");

contract('AssetTracker', (accounts) => {

    let assetTrackerInstance;
    let assetId = 0;
    let owner = "";
    
    //Intial Setup
    beforeEach(async function() {
      //Deploy AssetTracker contract to test
      assetTrackerInstance = await AssetTracker.deployed();
      });
    
  it('Create participants and asset, owner should be Manufacturer', async () => {
    //Create all the Participants
    assetTrackerInstance.createManufacturer("manufacturer1", accounts[0], "AL");
    assetTrackerInstance.createShipper("shipper1", accounts[1], "IL")
    assetTrackerInstance.createDealer("dealer1", accounts[2], "CO")
    assetTrackerInstance.createBuyer("b", accounts[3], "CA")

    //Create an Vehicle asset
    assetTrackerInstance.createAsset("Aston Martin DB11");

    //Get AssetId of the vehicle create from above statement
    assetId = await assetTrackerInstance.assetId.call();
    
    //Get the current owner
    owner = await assetTrackerInstance.getCurrentOwner.call(assetId.valueOf());
    
          //Assert is current owner account address is Manaufacurer's account address
      //If it fails prints below message "Current owner is not the Manufacturer"
    assert.equal(owner, accounts[0], "Manufacturer is not the owner");
  });


    it('Transfer to Shipper, owner should be shipper', async () => {
    //Execute transfer function to transfer Aston Martin DB11 asset to Shipper (accounts[1])
    assetTrackerInstance.transferAsset(accounts[1], assetId.valueOf());
      
    owner = await assetTrackerInstance.getCurrentOwner.call(assetId.valueOf());
   
    assert.equal(owner, accounts[1], "Shipper is not the owner");
  });

    it('Transfer to Dealer, owner should be Dealer', async () => {
    
    //Transfer to dealer
    assetTrackerInstance.transferAsset(accounts[2], assetId.valueOf());
      
    owner = await assetTrackerInstance.getCurrentOwner.call(assetId.valueOf());
   
    assert.equal(owner, accounts[2], "Dealer is not the owner");
  });

    it('Transfer to Buyer, owner should be Buyer', async () => {
      
    //Transfer to buyer
    assetTrackerInstance.transferAsset(accounts[3], assetId.valueOf());
 
    owner = await assetTrackerInstance.getCurrentOwner.call(assetId.valueOf());

    assert.equal(owner, accounts[3], "Buyer is not the owner");
  });

});
 
