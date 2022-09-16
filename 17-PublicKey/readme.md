# 解题方法



## 通关要求：

得到owner地址的公钥

## 解题思路：

过程 [参考资料](https://www.jianshu.com/p/af6328cc693e)

私钥 ——椭圆曲线数字签名算法——> 公钥 ——摘要算法——> 地址


过程是不可逆的，无法通过 地址来反推 公钥，

但是是可以通过交易签名中的，r、s、v 和 hash时我们是可以计算对应的公钥的，而这些值都可以在交易内进行读取，我们来看看该地址进行过的交易

访问[ropsten网络查看器](https://ropsten.etherscan.io/address/0x92b28647ae1f3264661f72fb2eb9625a89d88a31)

发现有一条out记录hash
0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb



```js
const tx = await provider.getTransaction('0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb');

console.log(tx)


结果：
  r: '0xa5522718c0f95dde27f0827f55de836342ceda594d20458523dd71a539d52ad7',
  s: '0x5710e64311d481764b5ae8ca691b05d14054782c7d489f3511a7abf2f5078962',
  v: 41,
```

用现成的ethereumjs-tx库进行恢复即可
公钥结果为:
> 613a8d23bd34f7e568ef4eb1f68058e77620e40079e88f705dfb258d7a06a1a0364dbe56cab53faf26137bec044efd0b07eec8703ba4a31c588d9d94c35c8db4
记得前面加0x

最后调用发送结果。



