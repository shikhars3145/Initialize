import web3 from '../utils/web3';

const minLengthValue = (wei) => {
    const valueInWei = wei + ' wei';
    const valueInGwei = Number(web3.utils.fromWei(`${wei}`, 'gwei')).toPrecision() + ' gwei';
    const valueInEth = Number(web3.utils.fromWei(`${wei}`, 'ether')).toPrecision() + ' eth';
  
    const options = [valueInWei,valueInGwei,valueInEth];
    const minLengthvalue = options.reduce((a,b)=> a.length<b.length ? a : b);
    return minLengthvalue;
}

export default minLengthValue;