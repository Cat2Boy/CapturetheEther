# 解题方法



## 通关要求：

将isComplete 从false变为true


## 解题思路：

代码量很少 而且也没有isComplete的状态更改方法，但是题目中有一个变长的map 在EVM中 合约存储是按照一定的方法的，目标肯定是要覆盖掉isComplete的值

我们知道对于动态数组，**其在声明中所在位置决定的存储位里存放的是数组长度，而数组中变量值存储位则是基于hash后位置决定的**，这部分的详细内容可以参见此处一篇翻译文章了解以太坊智能合约存储参考[了解以太坊智能合约存储](https://segmentfault.com/a/1190000013791133)

根据上述链接，我们可知动态数组内变量所在的存储位的计算公式即为
>     keccak256(slot) + index
solt 起始为 0 结束在2\**256 -1 ，共 2**256位

已题中map为例 
动态数组的第一个值在 keccak256(1)+0 上
第二个在keccak256(1)+1 上，并以此类推

已知 isComplete 占据 slot0  并且只占用 最后一位 因为是bool类型
uint[] map的起始存储位置是keccak(1)+index
但是题目中的set方法 是将map设置为 key值 长度的map 并且设置第key位 即最后一位的值为value

此时存储value的index只需要等于0(2**256即可)
> keccak256(1) + key == 2**256

value设置为1 覆盖最低位即可

输入为(
    key =  2**256-keccak256(uint256(1)), 
    value =uint256(1)
    )
