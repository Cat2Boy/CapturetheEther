import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)
// 题目合约地址
const res = await provider.getStorageAt("0xB592CF8Bea8a401676CbCCf90945a07bAe8553Ac", 0);

console.log(res);
const r = parseInt(Number(res));
console.log(r);

const main = async()=>{
    try{
        // 题目合约地址
        const demoaddr = '0xB592CF8Bea8a401676CbCCf90945a07bAe8553Ac';
        const demoabi = [
            "function guess(uint8 n) public payable",
            "function isComplete() public view returns (bool)"
        ];
        let overrides = {
            value: ethers.utils.parseEther("1.0"),
            gasLimit: 100000
        };
        const democontract = new ethers.Contract(demoaddr, demoabi, wallet);
        // let tx = await democontract.guess(k,overrides);
        let tx = await democontract.guess(res,overrides);
        await tx.wait();
        console.log(tx);  


        console.log("是否通过", await democontract.isComplete());


    }catch(e){
        console.log(e);
    }

}
main();


