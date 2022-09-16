import util from 'ethereumjs-util';
import rlp  from 'rlp';
import gen from 'ethjs-account';
import sha3 from 'ethjs-sha3';
const generate = gen.generate;
let seed='892h@fs8sk^2hSFR*/8s8shfs.jk39hsoi@hohskd51D1Q8E1%^;DZ1-=.@WWRXNI()VF6/*Z%$C51D1QV*<>FE8RG!FI;"./+-*!DQ39hsoi@hoFE1F5^7E%&*QS'//生成地址所用的种子
function fuzz(){
    for(var k=0;k<50000;k++){
        seed=seed+Math.random().toString(36).substring(12);//为避免重复，生成一定数目后对种子进行更新
        for(var i=0;i<10000;i++){
            if (i%500 == 0){
                console.log(i);
            }
            
            let res=generate(seed);
            // for (var j=0;j<10;j++){
            let encodedRlp = rlp.encode([res.address, 0]);// 进行rlp编码
            let buf = sha3(encodedRlp);
            let contractAddress =buf.slice(12).toString('hex');//取buffer第12个字节后面的部分作为地址

            if(contractAddress.match("badc0de")){
                console.log(res);
                console.log(j);
                return;
                }
            // }
        //console.log(i);
        }
    }
}
fuzz();