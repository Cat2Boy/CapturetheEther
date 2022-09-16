import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)
const main = async()=>{
    try{
        // 题目合约地址
        const demoaddr = '0xE738cF5908088a14fc4669A50283073e34A093AE';
        const demoabi = [
            "function callme() public"
        ];
        const democontract = new ethers.Contract(demoaddr, demoabi, wallet);
        let tx = await democontract.callme()
        await tx.wait()
        console.log(tx)   
    }catch(e){
        console.log(e);
    }

}
main();
