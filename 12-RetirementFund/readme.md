# 解题方法



## 通关要求：
养老金账号中余额为0

10年后取钱 直接取 所有余额
不到10年收取手续费10%留在账户中


## 解题思路：

withdraw 方法我们无能为力 因为 now 和expiration都是无法改变的

题目中有 减法，在solidity0.8前 都存在上下溢出问题

withdrawn = startBalance - address(this).balance;

startBalance = 1eth 固定的

我们只能改变 address(this).balance

但是合约除了构造函数之外都没有 payable 修饰 无法发送代币 

但是我们直到 solidity中有自爆方法 selfdestruct(add)
可以强制将 合约中的余额发送给 add 无视是否合约能否接收代币

值得注意的是我们不能使用sol编写合约调用 collectPenalty()方法,因为有限制条件

> require(msg.sender == beneficiary);

注意 gasLimit的最大值不能超过 3kw wei



js为题解
sol文件为辅助自爆合约，不需要运行


