import {ethers} from 'ethers';
import {INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)


const  name = ethers.utils.formatBytes32String("Percy");
console.log(name);

const main = async()=>{
    try{        
        // 题目合约地址
        const nickaddress = '0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee';
        const nickabi = [
            "function setNickname(bytes32 nickname) public"
        ];
        const nickcontract = new ethers.Contract(nickaddress, nickabi, wallet);
        let tx = await nickcontract.setNickname(name);
        await tx.wait();
        console.log(tx);
        
        console.log("改名结束！！");


    }catch(e){
        console.log(e);
    }

}
main();
