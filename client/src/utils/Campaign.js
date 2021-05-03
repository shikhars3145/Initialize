const web3 = require('./web3');
const {abi} = require('../abi/Campaign.json');

const Campaign = (address) => {
    const campaign = new web3.eth.Contract(abi,address);
    return campaign
}

export default Campaign;