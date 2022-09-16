import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL} from '../constant.js';



const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const privateKey = '614f5e36cd55ddab0947d1723693fef5456e5bee24738ba90bd33c0c6e68e269'
const wallet = new ethers.Wallet(privateKey, provider)



const main = async() =>{

    const address = '0x2084d72858cfe43E68097e88829C1aff34C981f8';
    const abi = [
        'function authenticate() public'
    ];

    const contract = new ethers.Contract(address, abi, wallet);
    const tt = await contract.authenticate();
    await tt.wait();
    console.log(tt);

}
await main();
console.log("程序运行结束！！！！！！");
