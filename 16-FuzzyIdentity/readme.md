# 解题方法



## 通关要求：

要求调用该合约的外部合约满足两个要求：
- 有name方法，并且调用name方法返回 bytes32的"smarx"   这条比较简单
- 必须调用合约的地址末尾必须为 ”badc0de“hex string   这个比较难 

## 解题思路：

我们在以太坊上创建一个合约时，新生成的合约的地址是根据发送者(sender)的地址和其已生成的事务数(nonce)确定的，经
过RLP编码后再Hash( Keccak-256)运算得出的.

生成的方式很多 
[js 利用 ethereumjs-util 生成](https://blog.csdn.net/wumingzhifu/article/details/106171680)
[登链 利用python 和solidity java 生成](https://learnblockchain.cn/2019/06/10/address-compute)
[python ethereum 生成特定hexstring 地址](https://hitcxy.com/2020/generate-address/)

本次利用python 和 js两种方法 生成，直接copy 上面参考资料的代码，将条件改为”badc0de“ 运行，时间可能会比较长 python用了1h js要了1.5h (因为是随机生成判断，时间可长可短 主要看点子) 网上有些人几分钟就生成了
nonce默认为0  即我们链上操作部署的第一个合约即为目标合约

得到 address 和 privatekey后 

[为address 获取ropsten测试网代币](https://faucet.egorfine.com/)
利用remix 使用得到的私钥添加到metamask钱包 复用题目地址的solidity 合约运行   即可！！

js py 为生成符合私钥方法
