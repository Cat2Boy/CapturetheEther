# 解题方法



## 通关要求：

题目越来越短，这道题让直接让你得到owner的权限。 

## 解题思路：

这道题对于我来说明显超纲，因为涉及到很深的密码学知识，这里贴两个题目解析

[参考资料1 中文版](https://xz.aliyun.com/t/2718)
[参考资料2 英文版](https://medium.com/coinmonks/smart-contract-exploits-part-3-featuring-capture-the-ether-accounts-c86d7e9a1400)

总结下来原理: 两笔交易的r值一样，意味着这两笔交易使用了相同的随机数k，而通过这我们就能利用这两笔交易的信息来还原出私钥.

看了大佬的答案，带入私钥，通关。