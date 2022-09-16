import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey, mnemonic } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)

// const B = new ethers.Wallet.createRandom();
// let mnemonic = B.mnemonic;
const B = new ethers.Wallet.fromMnemonic(mnemonic).connect(provider)
// console.log(`wallet: ${ethers.utils.formatEther(await wallet.getBalance())} ETH`);
// console.log(`钱包2增加: ${ethers.utils.formatEther( await B.getBalance())} ETH`);




const contractABI = [
    "    function isComplete() public view returns (bool) ",
    "    function transferFrom(address from, address to, uint256 value) public ",
    "    function approve(address spender, uint256 value) public ",
    "    function transfer(address to, uint256 value) public ",
    "    function getBalance(address addr) public view returns(uint256)",
    "    function getAllowance(address addr1, address addr2) public view returns(uint256)"
];
const contractAdd = "0x5896d37f7d64933465F01aEB9bc93058714520a8";

const contractA = new ethers.Contract(contractAdd,contractABI, wallet);

const contractB = new ethers.Contract(contractAdd, contractABI, B);



// console.log("查看结果A===========", ethers.utils.formatEther(await contractA.getBalance(wallet.getAddress())));

// console.log("查看结果B===========", ethers.utils.formatEther(await contractA.getBalance(B.getAddress())));

// 先给B钱包一些ETH
const transETH = async()=>{
    
    const tx = {
        to: B.getAddress(),
        value:ethers.utils.parseEther("0.1")
    }

    // 3、发送请求

    const receipt = await wallet.sendTransaction(tx)

    // 4、接收结果
    // console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    await receipt.wait()

    console.log(receipt)

    console.log(`\niii. 发送后余额`)
    console.log(`wallet: ${ethers.utils.formatEther(await wallet.getBalance())} ETH`);
    console.log(`钱包2增加: ${ethers.utils.formatEther( await B.getBalance())} ETH`);
}

// transETH()

const main = async() => {




    let tx = await contractA.transfer(B.getAddress(), 1000,  {gasLimit: 5000000});
    await tx.wait();
    console.log("A 转 B ", tx);

    // console.log("查看结果A===========", ethers.utils.formatEther(await contractA.getBalance(wallet.getAddress())));

    // console.log("查看结果B===========", ethers.utils.formatEther(await contractA.getBalance(B.getAddress())));  

    let tx2 = await contractB.approve(wallet.getAddress(), 1000,  {gasLimit: 5000000});
    await tx2.wait();
    // console.log("B 授权 ", tx2);

    // console.log("查看授权B===========", ethers.utils.formatEther(await contractA.getAllowance(B.getAddress(), B.getAddress())));  
    // console.log("查看授权B 给A===========", ethers.utils.formatEther(await contractA.getAllowance(B.getAddress(), wallet.getAddress())));  


    let tx3 = await contractA.transferFrom(B.getAddress(), B.getAddress(), 100, {gasLimit: 5000000});
    await tx3.wait();

    // console.log("A 调用 transferFrom  B 转给 B", tx3);

    // console.log("查看结果===========", await contractA.isComplete());



}

main()
