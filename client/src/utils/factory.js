const web3 = require('./web3');
const CampaignFactory = require('../abi/CampaignFactory.json');

// const factory = new web3.eth.Contract(CampaignFactory.abi,"0x1BD6A15a4ceFaFDcbD893E42c3B8878d64723642");
// const networkId = await web3.eth.net.getId();

// const networkId = "5777"; // "Development/ganache"
// const networkId = "3"; // "Ropsten"
let factory;
try{
    const networkId = process.env.DEPLOYED_NETWORK_ID;
    console.log(networkId);
    // console.log("networkData",CampaignFactory.networks[networkId]);
    const networkData = CampaignFactory.networks[networkId];
    if(networkData){
        factory = new web3.eth.Contract(CampaignFactory.abi,networkData.address);
    }
    else{
        if(typeof alert !== 'undefined')
            alert("Contract not deployed to current network");
        console.log("Contract not deployed to current network");
        throw("Contract not deployed to current network");
    }
}
catch(err){
    factory=false;
    console.log("catch working");
}
// console.log("factory",factory);
module.exports = factory;