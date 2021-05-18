const Web3 = require('web3');

let web3;


if(typeof window === 'undefined' || typeof window.ethereum === 'undefined')
{
    // server or metamask not in use
    const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/5844f93f3d524909a82e2a2b569cfdcf');
    // const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    
    web3 = new Web3(provider);
} 
else {
    // frontend metamask connected
    web3 = new Web3(window.ethereum);
    // ethereum.request({ method: 'eth_requestAccounts' }).then(accounts=>account = accounts[0]);
}

module.exports =  web3;