# 解题方法



## 通关要求：

猜随机数

## 解题思路：

这道题的answer是一个和当前时间+块hash相关的随机数

看上去无懈可击，但是不要忘记 区块链的任何storage都在链上存储，可以用ethersjs的下面方法获取
[provider.getStorageAt 官方api说明](https://docs.ethers.io/v5/api/providers/provider/)
>  await provider.getStorageAt();

得到的是hex，需要把hex转为number

[Convert hex string to integer (ethers.js) [SOLVED]](https://forum.moralis.io/t/convert-hex-string-to-integer-ethers-js-solved/8663/4)

> parseInt(Number(r));
