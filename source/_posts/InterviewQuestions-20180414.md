---
layout: post
title: "我遇到的一些面试题（1）"
date: 2018-04-014 10:36
comments: false
toc: true
tags: 

	- 面试
---
![top](/assets/blogImg/InterviewQuestions/interview-top.jpg)

<!-- more -->

### 1. 一个objc对象的isa的指针指向什么？

isa指针指向它的类对象，类对象的isa指针指向该类对象元对象(meta class)，元对象的isa指针指向根元对象，根元对象的isa指针指向自身。

> **类对象：**当向一个class发送消息时，class本身是一个对象，未编译时是一个结构体。

### 2. 类对象的superclass指针指向什么？ 

类对象的superclass指针指向它的父类对象，如果该类为根类（NSObject），则指向nil。

### 3. 一个由C/C++编译的程序占用的内存（内存分配方式）有哪几种？

- **堆区（heap）：**由程序员分配和释放，如果程序员不释放，程序结束时，可能会由操作系统回收。堆空间饿分配总是动态的，地址由低向高增长。

- **栈区（stack）：**由编译器自动分配释放。栈空间分静态分配和动态分配两种，静态分配由编译器完成，动态分配由alloca函数分配（自动释放）,地址由高向低增长。
- **静态区（全局区）（static）：**全局变量和静态变量的存储放在一起的，初始化的全局变量和静态变量是放在一块内存区域，未初始化的全局变量和静态变量放在相邻的另一块内存区域。程序结束后由系统自动释放。
- **常量区：**由系统自动释放。
- **代码区：**存放函数的二进制代码，只准许读取，不允许写入。

### 4.  如何用GCD同步若干个异步调用？

使用dispatch_group_enter和dispatch_group_level处理异步任务的同步。

```objective-c
dispatch_queue_t queue = dispatch_queue_create("com.queue.demo", DISPATCH_QUEUE_CONCURRENT);
dispatch_group_t group = dispatch_group_create();

dispatch_group_async(group, queue, ^{
    /*模拟异步耗时操作 */
    dispatch_group_enter(group);
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        sleep(3);
        NSLog(@"任务1");
        dispatch_group_leave(group);
    });
});
dispatch_group_async(group, queue, ^{
    /*模拟异步耗时操作 */
    dispatch_group_enter(group);
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        sleep(1);
        NSLog(@"任务2");
        dispatch_group_leave(group);
    });
});
dispatch_group_async(group, queue, ^{
    /*模拟异步耗时操作 */
    dispatch_group_enter(group);
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        sleep(2);
        NSLog(@"任务3");
        dispatch_group_leave(group);
    });
});
dispatch_group_notify(group, dispatch_get_main_queue(), ^{
    // 任务完成
    NSLog(@"任务完成");
});
```

### 5. 并发与并行的概念

并发指能够让多个任务在逻辑上同时执行的程序设计，而并行则是指在物理上真正的同时执行。并行是并发的子集，属于并发的一种实现方式。通过时间片轮转实现的多任务同时执行是通过调度算法实现逻辑上的同步执行，属于并发。通过多核 CPU 实现并发时，多任务是真正物理上的同时执行，才属于并行。

> [iOS中的多线程技术](http://xuyafei.cn/post/draft/ios-thread)

### 6.集合对象的深复制实现方式 

- 第一种方法：通过归解档生成两份完全独立的对象，但是前提是对象必须支持 NSCoding 协议。
- 第二种方法：使用`initWithSet:copyItems:`第二个参数为`YES`实现深复制，集合里的每个对象都会收到 `copyWithZone:` 消息。如果集合里的对象遵循 `NSCopying` 协议，那么对象就会被深复制到新的集合。

> [iOS 集合的深复制与浅复制](https://www.zybuluo.com/MicroCai/note/50592)

### 7. `@autoreleasepool`如何实现的？释放时机是什么？什么时候需要显式使用@autoreleasepool{}？ 

- 对 autorelease 分别执行 push和 pop 操作。销毁对象时执行release操作。
- 在没有手加Autorelease Pool的情况下，Autorelease对象是在当前的`runloop`迭代结束时释放的，而它能够释放的原因是**系统在每个runloop迭代中都加入了自动释放池Push和Pop**。
- 1. 写非UI framework的程序时，需要自己管理对象生存周期。
  2. autorelease 触发时机发生在下一次runloop的时候。
  3. 自己创建的线程。

> [黑幕背后的Autorelease](https://blog.sunnyxx.com/2014/10/15/behind-autorelease/)

### 8. iOS事件是如何响应的？

iOS获取到了用户的“点击”这一行为后，把这个事件封装成UITouch和UIEvent形式的实例，然后找到当前运行的程序，并逐级寻找能够响应这个事件的对象，直到没有响应者响应。这个过程就叫做事件的响应链。

> 示例：`UIButton` -> `UIView` -> `UIViewController` -> `UIWindow` -> `UIApplication` -> `AppDelegate`

### 9. 数组和链表的区别？

- 数组静态分配内存，链表动态分配内存。
- 数组在内存中连续，链表不连续。
- 数组元素在栈区，链表元素在堆区。
- 数组元素利用下标定位，时间复杂度为O(1)，链表定位元素时间复杂度为O(n)。
- 数组插入或删除元素的时间复杂度为O(n)，链表的时间复杂度为O(1)。


