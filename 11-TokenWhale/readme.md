# 解题方法



## 通关要求：
调用者账户中要超过100w个代币



## 解题思路：

但是发现题目中有 减法，在solidity0.8前 都存在上下溢出问题

solidity的 uint256 
最大值 2**256-1
最小值 0

最小值-1 变成最大值，


虽然该REC20代币一共发布1000个， 发现在调用transferFrom时 调用底层 _transfer 

_transfer 没有对from地址 减余额 而是只对msg.sender 减余额 这就是漏洞所在

准备两个钱包 
A (主钱包)
B (随机钱包)

A token transfer -> B 
B approve allowance[B][A] = 1000

A 调用 transferFrom (B, B , 100)


此时: 
balanceOf[A] = 2**256 -10
balanceOf[B] = 1100

结束！！

js为题解
sol文件为题目合约添加测试方法，辅助理解





