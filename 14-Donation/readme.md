# 解题方法



## 通关要求：

取走合约中所有的主币

## 解题思路：

需要我们改变 owner的地址，那么怎么去更改呢，用覆盖的方式,可以参考这篇文章[Solidity中存储方式错误使用所导致的变量覆盖
](https://www.freebuf.com/articles/blockchain-articles/175237.html) 

显式初始化：
```
Donation memory do = A(now,amount);
```

隐式初始化：
```
Donation donation;
donation.timestamp = now;
donation.etherAmount = etherAmount;
```

隐式初始化 struct结构 会将局部变量转化为 全局变量 所以一般隐式初始化必须加memory:

> memory代表的是使用内存来存储，这样可以避免占用storage的存储位，因为memory所需的gas要少得多，记得之前看到说在函数里直接初始化结构体必须加memory关键字.
> 数组类型，不管是固定长度的数组函数动态的数组，隐式初始化，在函数内定义时没有加上memory关键字的话都会默认使用storage存储，去占领全局变量的空间。

未运行donate() 方法之前：

合约存储位置如下:

```
slot0   -> donations.length
slot1   -> owner
```

运行donate() 方法之后:


```
slot0   -> timestamp
slot1   -> etherAmount
```

令etherAmount 值 为自己的address即可

msg.value = address / (10\**18\*10\**18)

最后别忘了 用withdraw 取回余额！！！！

js为题解
sol文件为题目合约添加测试方法，辅助理解