
 const HDWalletProvider = require('truffle-hdwallet-provider');
 const fs = require('fs');
 const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {
      development: {
       host: "127.0.0.1",     
       port: 7545,            
       network_id: "*",       
      },

     live: {
       provider: () => new HDWalletProvider(mnemonic,
         `http://internal-Ether-LoadB-UVK200XDNQ5W-60636998.us-east-2.elb.amazonaws.com:8545`),
       network_id: 1234,  
       port: 8545, 
       gas: 8000000,             
       from: 0x456547af228745206f6245ae287fe7ecad740d0c
     }
  }
}
