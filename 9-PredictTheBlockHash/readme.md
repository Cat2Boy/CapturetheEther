# 解题方法



## 通关要求：

这道题要求给定一个hash，猜当前blockNumber+1的blockhash 是否等于你给出的值

## 解题思路：

**突破点在于block.blockhash这个函数，它可以获取给定的区块号的hash值，但只支持最近的256个区块，不包含当前区块，对于256个区块之前的函数将返回0**
先传递guess为0，然后等待256个区块再调用settle函数即可

以太坊出块时间大概是 15 秒，因此等待时间为一个小时左右

本题直接用remix即可，过程如图

![]()


```
注：
block.blockhash(uint blockNumber)returns(bytes.32)：指定区块的区块哈希-一仅可用于最新的 256个区块且不包括当前区块；而b1ocks从0.4.22版本开始已经不推荐使用，由blockhash(uint blockNumber) 代替
```