App = {
  contracts: {},

  init: async () => {
    await App.initWeb3();
    await App.initContract();
  },

  /* For AWS */
  // initWeb3: async () => {

  //   if (typeof web3 !== 'undefined') {
  //     App.web3Provider = new Web3(web3.currentProvider)
  //   } else {
  //     App.web3Provider = new Web3(new Web3.providers.HttpProvider('<AWS RpcURL>:8545'))
  //   }
  // },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  /* For AWS */
  // initContract: async () => {

  //   // Create a JavaScript version of the smart contract
  //   const AssetTrackerArtifact = await $.getJSON('AssetTracker.json')
  //   App.contracts.AssetTracker = TruffleContract(AssetTrackerArtifact)
  //   App.contracts.AssetTracker.setProvider(new Web3.providers.HttpProvider("http://internal-ether-loadb-uvk200xdnq5w-60636998.us-east-2.elb.amazonaws.com:8545/"));

  //   // Hydrate the smart contract with values from the blockchain
  //   App.instanceAssetTracker = await App.contracts.AssetTracker.deployed()
  // },
  initContract: async () => {

    // Create a JavaScript version of the smart contract
    const AssetTrackerArtifact = await $.getJSON('AssetTracker.json')
    App.contracts.AssetTracker = TruffleContract(AssetTrackerArtifact)
    App.contracts.AssetTracker.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.instanceAssetTracker = await App.contracts.AssetTracker.deployed()
  },


  createManufacturer: async () => {
    await App.instanceAssetTracker.createManufacturer($('#manufacturerName').val(), $('#manufacturerAddress').val(), $('#manufacturerLoc').val());
  },
  createShipper: async () => {
    await App.instanceAssetTracker.createShipper($('#shipperName').val(), $('#shipperAddress').val(), $('#shipperLoc').val());
  },
  createDealer: async () => {
    await App.instanceAssetTracker.createDealer($('#dealerName').val(), $('#dealerAddress').val(), $('#dealerLoc').val());
  },
  createBuyer: async () => {
    await App.instanceAssetTracker.createBuyer($('#buyerName').val(), $('#buyerAddress').val(), $('#buyerLoc').val());
  },
  createAsset: async () => {
    await App.instanceAssetTracker.createAsset($('#assetName').val());
    const assetId = await App.instanceAssetTracker.assetId.call();
    alert("Asset is succesfully created with the ID of: " + assetId.valueOf())
  },

  transferAsset: async () => {
    await App.instanceAssetTracker.transferAsset($('#toAddress').val(), $('#asssetId').val());
    const owner = await App.instanceAssetTracker.getCurrentOwner.call($('#asssetId').val());
    alert("Current asset owner is : " + owner.valueOf())
  },
  getCurrentOwner: async () => {

    const owner = await App.instanceAssetTracker.getCurrentOwner.call($('#asssetIdOwner').val());
    alert("Current asset owner is : " + owner.valueOf())
  }
}

$(() => {
  $(window).init(() => {
    App.init()
  })
})
