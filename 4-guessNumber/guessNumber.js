import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)


const main = async()=>{
    try{
        // 题目合约地址
        const demoaddr = '0xe62e6e5EAAB36818cCF0Fc78dCdBdDebDd2cB935';
        const demoabi = [
            "function guess(uint8 n) public payable",
            "function isComplete() public view returns (bool)"
        ];
        let overrides = {
            value: ethers.utils.parseEther("1.0")
        };
        const k = 42;
        const democontract = new ethers.Contract(demoaddr, demoabi, wallet);
        let tx = await democontract.guess(k,overrides);
        await tx.wait();
        console.log(tx);
        
        console.log("是否通过", await democontract.isComplete());

    }catch(e){
        console.log(e);
    }

}
await main();



