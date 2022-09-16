# 解题说明

从本题开始进入Math 部分

## 通关要求：
需要拿走部署合约时放入的1 eth，即最终的合约中余额小于1 eth

## 解题思路：
发现题目中有 乘法，在solidity0.8前 都存在上下溢出问题

solidity的 uint256 
最大值 2**256-1
最小值 0

PRICE_PER_TOKEN = 1 ETH

1 ETH = 10**18

令：numTokens * PRICE_PER_TOKEN 上界溢出 = 2**256
由于会出现小数
numTokens  = 2**256// PRICE_PER_TOKEN +1

此时再计算 需要的 msg.value
msg.value = numTokens*PRICE_PER_TOKEN % 2*256

调用 buy方法 

在调用 sell方法取出 1eth 

结束！

