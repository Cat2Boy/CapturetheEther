import {Contract, ethers} from 'ethers';
import { INFURA_ROPSTEN_URL, privateKey, mnemonic } from '../constant.js';

import EthereumTx from 'ethereumjs-tx';
import util from 'ethereumjs-util';

const provider = new ethers.providers.JsonRpcProvider(INFURA_ROPSTEN_URL)
const wallet = new ethers.Wallet(privateKey, provider)

const tradeTx = await provider.getTransaction('0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb');

console.log(tradeTx)


let pubkeys;
const recoverPublicKey = async() =>{


    
    var rawTx = {
      nonce: '0x00',
      gasPrice: '0x3b9aca00',
      gasLimit: '0x15f90',
      to: '0x6B477781b0e68031109f21887e6B5afEAaEB002b',
      value: '0x00',
      data: '0x5468616e6b732c206d616e21',
      v: '0x29',
      r: '0xa5522718c0f95dde27f0827f55de836342ceda594d20458523dd71a539d52ad7',
      s: '0x5710e64311d481764b5ae8ca691b05d14054782c7d489f3511a7abf2f5078962'
    };
    
    var tx = new EthereumTx.Transaction(rawTx,{ chain: 'ropsten'});
    
    let pubkey=tx.getSenderPublicKey();
    pubkeys=pubkey.toString('hex');
    var address = util.keccak256(pubkey).toString('hex').slice(24);
    
    console.log(pubkeys);
    console.log(address);
}
await recoverPublicKey();


const main = async() =>{

    const address = '0xe7f9e7aeCFf2b0E87dfac5f04e8Bdc83E2EC8c1e';
    const abi = [
        'function authenticate(bytes publicKey) public'
    ];

    const contract = new ethers.Contract(address, abi, wallet);
    pubkeys = '0x'+pubkeys;  
    const tt = await contract.authenticate(pubkeys.toString('hex'));
    await tt.wait();
    console.log(tt);

}
await main();
console.log("程序运行结束！！！！！！");
