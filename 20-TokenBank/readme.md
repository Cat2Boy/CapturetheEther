# 解题方法



## 通关要求和题目介绍：

1、题目合约TokenBank创建了代币SimpleERC223Token 并且将所有的代币转移给自己，
即Token的 balanceOf[Bankaddress] = totalSupply 
为了和下面bank合约中的balanceOf区分，将token的balanceOf，取名为TokenbalanceOf

2、并且在 Bank的合约中，也存在一个同名的balanceOf(单纯同名) 记录合约银行的储户情况，
将token的balanceOf，取名为BankbalanceOf

初始情况下：
BankbalanceOf[官方钱包地址] = totalSupply/2
BankbalanceOf[MywallectAddress] = totalSupply/2


通关要求是TokenbalanceOf[Bankaddress] = 0


## 解题思路：

### 分析1
这道题很绕，我们下面来慢慢分析。
我们先看bank合约中的withdraw方法，出现明显问题，
```js
require(token.transfer(msg.sender, amount));
balanceOf[msg.sender] -= amount;
```
先转账再 减余额，这是个明显的重入问题，但是这不是转eth，还要继续看token合约的transfer方法中是否有回调方法，

```js
if (isContract(to)) {
    ITokenReceiver(to).tokenFallback(msg.sender, value, data);
}
```
这里有个判断，如果转账收款的地址是合约地址，则**调用收款合约的tokenFallback方法，这个方法可以我们自己定义，加上之前的余额后减错误，叠加成了一个超级巨大的漏洞，形成重入攻击漏洞。**


想明白这里这道题就完成70%了，我们需要构建攻击合约，来的利用withdraw进行重入攻击。

### 分析2
但是还有一个小问题，就是攻击合约里中没有SimpleERC223Token，也就没法质押给bank合约，即：BankbalanceOf[攻击合约地址]=0

但是在bank合约初始化时，
BankbalanceOf[MywallectAddress] = totalSupply/2
MywallectAddress 中有totalSupply/2 个Token.

所以:
```
1、先将存在bank的token withdraw取回，此时：
TokenbalanceOf[MywallectAddress] = 0 ——> totalSupply/2
BankbalanceOf[MywallectAddress] = totalSupply/2 ——> 0

2、钱包地址调用Token合约approve 攻击合约地址
allowance[MywallectAddress][攻击合约地址] = totalSupply/2

3、攻击合约地址调用token合约的transferFrom方法将钱包合约的Token转给自己：
TokenbalanceOf[MywallectAddress] = totalSupply/2  ——> 0
TokenbalanceOf[攻击合约] = 0 ——> totalSupply/2

4、攻击合约调用方法将token质押给bank合约，利用token合约的transfer：
TokenbalanceOf[攻击合约] = totalSupply/2  ——> 0
BankbalanceOf[攻击合约] = 0 ——> totalSupply/2
```

这样才将BankbalanceOf[攻击合约] 变为totalSupply/2, 满足bank合约的withdraw的所有条件。

上面的过程非常的绕，希望大家自己去思考。



### 运行步骤

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/1.jpg?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/2.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/3.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/4.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/5.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/6.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/7.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/8.png?raw=true)

![](https://github.com/Cat2Boy/CapturetheEther/blob/main/20-TokenBank/img/9.png?raw=true)
## 结果

调用攻击合约的attack方法，重入攻击，最终完成TokenbalanceOf[Bankaddress] = 0的操作。



