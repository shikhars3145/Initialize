import web3 from '../utils/web3';

const correctChain = async(showAlert=true)=> {
    const networkId = await web3.eth.net.getId();
    const DEPLOYED_NETWORK_ID = process.env.DEPLOYED_NETWORK_ID;

    if (DEPLOYED_NETWORK_ID != networkId)
    {
        if(typeof alert !== 'undefined' && showAlert)
        alert(`Please Change network to ${chainMap[DEPLOYED_NETWORK_ID]} network`);
        return false;
    } 
    else return true;
}

export const chainMap = {
    5777: "Ganache",
    1: "Ethereum Mainnet",
    3: "Ropsten",
    4: "Rinkeby" 
}
export default correctChain;

