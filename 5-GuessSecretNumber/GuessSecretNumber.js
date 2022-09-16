import {ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)

const answerHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";

let res = 0;
for( var k=0;k<2**8-1;k++){
    let p =ethers.utils.keccak256(k);
    if (p === answerHash){
        res = k;
    }
}
console.log(res);

const main = async()=>{
    try{
        // 题目合约地址
        const demoaddr = '0x86BB3F88485f57E256e74A9BD4f8EF865aB97C55';
        const demoabi = [
            "function guess(uint8 n) public payable",
            "function isComplete() public view returns (bool)"
        ];
        let overrides = {
            value: ethers.utils.parseEther("1.0")
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


