# 解题方法



## 通关要求：

猜hash前数字

## 解题思路：

给出了数字的hash值 求数字
hash是无法反推的，但是题目中uint8 范围是从0-2**8-1(255)的,所以遍历即可

```js
for( var k=0;k<2**8-1;k++){
    let p =ethers.utils.keccak256(k);
    if (p === answerHash){
        res = k;
    }
}
```