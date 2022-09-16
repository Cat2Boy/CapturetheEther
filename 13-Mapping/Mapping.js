import {Contract, ethers, utils} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)


const main = async() =>{
    const contractaddr = "0x477EDC4840Ad6179a72eE8bEC3090Fc6030fa929";
    const contractabi = [
        "function set(uint256 key, uint256 value) public"
    ]
    const contract = new ethers.Contract(contractaddr, contractabi, wallet);
    
    const max = ethers.BigNumber.from(2n**256n);

    const amount =  ethers.utils.hexZeroPad(ethers.BigNumber.from(1).toHexString(), 32);
    console.log(amount);
    const local = ethers.BigNumber.from(utils.keccak256(amount))

    // const local = ethers.BigNumber.from(utils.keccak256(1))
    const key = ethers.BigNumber.from( max.sub(local) );

    console.log(key.toString());

    // console.log(key.mod(max).toString());

    let tx = await contract.set(key, 1, {gasLimit:300000});
    await tx.wait();


    console.log(tx);

    console.log("运行完毕！！！！");

}
main();