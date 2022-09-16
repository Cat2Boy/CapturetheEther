# 介绍

[capturetheether 官网](https://capturetheether.com/challenges/) 

本仓库是 ether靶场的个人题解汇总，在其中你黑客以太智能合同学习安全。它既有趣又有教育意义。这个游戏是由[@smart x](https://twitter.com/smarx)开发的。

本仓库的基础用的是ethersjs库进行开发的。
其中 7 8 9 20 使用sol由于题目限制，只能使用sol编写合约完成挑战。


## Warmup

- 1.Deploy a contract
- 2.Call me [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/2-callme)
- 3.Choose a nickname [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/3-Chooseanickname)


## Lotteries

- 4.Guess the number [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/4-guessNumber)
- 5.Guess the secret number [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/5-GuessSecretNumber)
- 6.Guess the random number [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/6-GuessRandomNumber)
- 7.Guess the new number [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/7-GuessNewNumber)
- 8.Predict the future [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/8-PredictFuture)
- 9.Predict the block hash [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/9-PredictTheBlockHash)


## Math

- 10.Token sale  [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/10-TokenSale)
- 11.Token whale [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/11-TokenWhale)
- 12.Retirement fund [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/12-RetirementFund)
- 13.Mapping [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/13-Mapping)
- 14.Donation [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/14-Donation)
- 15.Fifty years [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/15-FiftyYears)


## Accounts

- 16.Fuzzy identity [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/16-FuzzyIdentity)
- 17.Public Key [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/17-PublicKey)
- 18.Account Takeover [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/18-AccountTakeover)


## Miscellaneous

- 19.Assume ownership [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/19-AssumeOwnership)
- 20.Token bank [[题解]](https://github.com/Cat2Boy/CapturetheEther/tree/main/20-TokenBank)


### 注：

constant.js 为存放privateKey 和 ROPSTEN_RPC，可根据自己信息在根目录进行创建格式如下：

```js
export const INFURA_ROPSTEN_URL = xxx
export const privateKey = xxx
```

ROPSTEN_RPC可点击 [infura官网](https://infura.io/zh) 进行申请


## 参考相关
[链接1](https://jayxv.github.io/2022/03/08/%E5%8C%BA%E5%9D%97%E9%93%BE%E9%9D%B6%E5%9C%BA%E5%88%B7%E9%A2%98%E4%B9%8Bcpaturetheether/)
[链接2](https://godorz.info/2021/08/capture-the-ether/)
[链接3](https://www.anquanke.com/post/id/154104)
