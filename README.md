# 介绍

[capturetheether 官网](https://capturetheether.com/challenges/) 

本仓库是 ether靶场的个人题解汇总，在其中你黑客以太智能合同学习安全。它既有趣又有教育意义。这个游戏是由[@smart x](https://twitter.com/smarx)开发的。

本仓库的基础用的是ethersjs库进行开发的。
其中 7 8 9 20 使用sol由于题目限制，只能使用sol编写合约完成挑战。


## Warmup

- 1.Deploy a contract
- 2.Call me [[题解]]()
- 3.Choose a nickname [[题解]]()


## Lotteries

- 4.Guess the number [[题解]]()
- 5.Guess the secret number [[题解]]()
- 6.Guess the random number [[题解]]()
- 7.Guess the new number [[题解]]()
- 8.Predict the future [[题解]]()
- 9.Predict the block hash [[题解]]()


## Math

- 10.Token sale  [[题解]]()
- 11.Token whale [[题解]]()
- 12.Retirement fund [[题解]]()
- 13.Mapping [[题解]]()
- 14.Donation [[题解]]()
- 15.Fifty years [[题解]]()


## Accounts

- 16.Fuzzy identity [[题解]]()
- 17.Public Key [[题解]]()
- 18.Account Takeover [[题解]]()


## Miscellaneous

- 19.Assume ownership [[题解]]()
- 20.Token bank [[题解]]()


### 注：

constant.js 为存放privateKey 和 ROPSTEN_RPC，可根据自己信息在根目录进行创建格式如下：

```js
export const INFURA_ROPSTEN_URL = xxx
export const privateKey = xxx
```

ROPSTEN_RPC可点击 [infura官网](https://infura.io/zh) 进行申请


