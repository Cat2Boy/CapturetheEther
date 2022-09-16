# 解题方法



## 通关要求：

题目越来越短，这道题让直接让你得到owner权限。

## 解题思路：

这道题乍看一下 不知道怎么做，但是看了网上的解析才发现有多扯

0.4.x 版本默认和合约名一样的函数为构造函数，仅在部署的时候运行一次。 升级后现在已经被 constructor关键字 替代。

但是核心是function名字   AssumeOwmershipChallenge() 是Owm
而contract名字          AssumeOwnershipChallenge() 是Own  
障眼法呀，名字不一样。AssumeOwmershipChallenge 压根不是构造函数。再加上public标签。所以这其实是一个任何账户都可以调用的函数。

可以直接调用AssumeOwmershipChallenge() 函数便可以成为owner，过关。