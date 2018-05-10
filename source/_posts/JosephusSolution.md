---
title: 约瑟夫环问题解法
declare: false
comments: true
reward: false
date: 2018-05-07 10:23:31
tags:
- Algorithm
---

> 问题描述：
>
> ​	**约瑟夫环问题(Josephus)**
>
> - `n`个数字（0、1 … 、 n-1）排成一个圈。
> - 从数字0开始，每次从 圆圏里删除第 `m`个数字，求圈里剩下的最后1个数字。

### 解法

- [解法一：环链表](#1)
- [解法二：数学推理最优解](#2)

<!-- more -->

<h3 id="1">解法一：环链表</h3>

**思想：**建立一个有`n`个元素的循环链表，然后从链表头开始遍历并记数，如果计数`i==m`(i初始为1)踢出元素，继续循环，当当前元素与下一元素相同时退出循环。

**算法实现(Swift版)：**

```swift
func JosephusSol_1(_ n : Int, _ m : Int) -> Int {
    
    // 判断输入数据的合法性
    if (n < 1 || m < 1) {
        return -1
    }
    
    // 创建n个节点的环链表
    let ringList = List()
    for i in 0..<n {
        ringList.appendToTail(i)
    }
    
    var index = 0 // 要删除元素的位置
    
    while ringList.size() > 1 {
        //只要移动(m-1)次就可移动到下1个要删除的元素上
        index = (index + m - 1) % ringList.size()
        ringList.remove(index: index)
    }
    
    return (ringList.head?.val)!
}
```

**结论：**时间效率低，需要消耗额外的空间创建环链表，空间复杂度 = O(n)。

<h3 id="2">解法二：数学推理最优解</h3>

**思想：**令`f[i]`表示`i`个元素报`m`时推出最后胜利者的编号，最后的结果自然是`f[n]`。

递推公式：
`f[1]=0;`
`f[i]=(f[i-1]+m)%i;  (i>1)`

**算法实现(Swift版)：**

```swift
func JosephusSol_2(_ n : Int, _ m : Int) -> Int {
    
    // 判断输入数据的合法性
    if (n < 1 || m < 1) {
        return -1
    }
    
    // s:移除之后的第一位编号
    var s = 0
    for i in 2...n {
        s = (s + m) % i
    }
    return s
}
```

**结论：**效率高，时间复杂度 = O(n)，空间复杂度 = O(1)。

> 本文[Demo - Josephus.swift](https://github.com/liuzhida33/AlgorithmLearning.git)