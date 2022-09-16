# 解题方法



## 通关要求：

取走合约中所有的主币

## 解题思路：
这个题有2000分，的确也比较复杂，现在开始慢慢抽丝剥茧。

题目的owner方法是自己的钱包地址，所以拥有withdraw和upsert方法的调用权限。withdraw没什么问题，重点观察upsert,发现利用storage初始化Contribution，这就是问题所在【这里是比较奇怪的，在upsert的else分支里面，甚至都没有声明contribution变量，但是却可以用，可能是solidity的一个特性吧，因为我把if分支里面的声明去掉之后，else分支里的才报变量未声明的错误】

可以参考这篇文章[Solidity中存储方式错误使用所导致的变量覆盖
](https://www.freebuf.com/articles/blockchain-articles/175237.html) 

### 举例

显式初始化：
```
Donation memory donation = A(now,amount);
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


### 本题分析 

#### 存储分析
合约存储位置如下:

我们知道数组的存储时 
- length  存在 指定slot位置 
- 数据  存在   keccak256(slot) + index * elementsize


```
slot0   -> queue.length 
slot1   -> head
```
head初始值为0

运行upsert(indexm timestamp){msg.value}
```
if  head <= index < queue.length:  
    queue[index].amount += msg.value
    并出现出现结构体 存储为storage覆盖 slot漏洞
else:
    timestamp >= queue[queue.length - 1].unlockTimestamp + 1 days (出现数字上溢漏洞)
    
    contribution.amount = msg.value; 漏洞:存储为storage覆盖 slot0
    contribution.unlockTimestamp = timestamp; 漏洞:存储为storage覆盖 slot1
    queue.push(contribution); 更新queue.length  + 1
```

经历upsert后存储
```
slot0   -> queue.length  和 msg.sender
slot1   -> head  和 timestamp
```

#### 做法
我们不能覆盖queue中第一个 Contribution 因为这里存着部署时的1eth

通过运行两次upsert 
- 第一次将timestamp 设置 为 2^256 - 86400(1day 24*360) 并将queue.length 设置成为2 
- 第一次将timestamp 设置为 0 使得新的Contribution的unlockTimestamp 设置为0 并将queue.length 设置成为2

注意：
由于queue.length和amount共用一块内存 
首先 amount = msg.value msg.value值存入slot0
而  queue.push 使得 queue.length + 1 导致 value[slot0] += 1

所以:
- 初始queue.length = 1 
- 第一次 传 upsert(index = 1,  timestamp =2^256 - 86400){value:1wei} => queue.length = 2 = amount

- 第二次 传 upsert(index = 2,  timestamp =0){value:2wei} => queue.length = 3 = amount

为什么amount = queue.length = msg.value+1?
因为 amount和queue.length 共用slot0
queue push时 slot0中的值已经进行了 +1(push操作先将length+1) 操作

这就导致合约中剩余1eth 3wei 而我们的存储总amount为 1eth 5wei

解决方法：
- 新建合约 存入2wei 利用selfdestruct 转入该合约  常见操作
- 利用upsert中的 if条件 index <queue.length时 amount + msg.value 即 在第一次和第二次传参之间再进行一次传参：upsert(index = 1,  timestamp =任意值){value:2wei}




最后别忘了 用withdraw(2) 取回余额！！！！

js为题解
sol文件为题目合约添加测试方法，辅助理解