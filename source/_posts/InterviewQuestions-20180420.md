---
layout: post
title: "我遇到的一些面试题（2）"
date: 2018-04-020 11:01
comments: false
toc: true
tags: 

	- 面试
---
![top](/assets/blogImg/InterviewQuestions/interview-top.jpg)

<!-- more -->

### 1. KVC的底层实现？

当一个对象调用`setValue`方法时，方法内部会做如下处理：

- 检查是否存在相应key的`setter`方法，如果存在，就调用`setter`方法。
- 如果`setter`方法不存在，就会查找与`key`相同名称并且带下划线的成员属性，如果有，则直接给成员属性赋值。
- 如果没有找到`_key`，就会查找相同名称的属性`key`，如果有就直接赋值。
- 如果还没找到，则调用`valueForUnderfinekey:`和`setValue:forUnderfinedkey:`方法。这些方法默认抛出异常，可根据需要进行重写。

### 2. KVO的底层实现？

- `KVO`基于`runtime`机制实现。

- 使用`isa`混写（`isa-swizzling`），当一个对象发生改变时，系统会自动生成一个类，继承自该类的属性制，在这个类的`setter`方法里面，调用`[super setX:x]`、`[self willChangeValueForKey:@"x"]`  和`[self didChangeValueForKey:@"x"]`，这两个方法内部会主动调用监听者内部的 `- (void)observeValueForKeyPath`这个方法。


### 3. 数据库建表时索引有什么用（优点和缺点）？

**优点：**

- 通过创建唯一性索引，可以保证数据库表中每一行数据的唯一性。
- 可以大大加快数据的检索速度。
- 可以加速表与表之间的链接。
- 使用分组和排序子句进行数据检索时，可以显著减少查询中分组和排序的时间。
- 可以在查询过程中，使用优化隐藏器，提高系统的性能。

**缺点：**

- 创建索引和维护索引需要耗费时间，这种时间随着数据量的增加而增加。
- 索引需要占用物理内存。
- 当对表中的数据进行增加、删除和修改时，需要动态维护相应的索引，降低了数据的维护速度。

### 4. 通过[UIImage imageNamed:] 成的对象 么时候被释放?

如果没有使用局部释放池，并且在主线程，则是当前主线程Runloop一次循环结束前释放。

### 5. selector、SEL、Method和IMP分别指什么？

- selector：`selector`是一个方法的名称。
- SEL：`SEL`是类成员方法的指针，只是一个方法编号。
- Method：`Method`是一个组合体，包含了方法名和实现。
- IMP：`IMP`是一个函数指针，保存了方法的地址。

### 6. isa指针的作用？

当我们向一个对象发送消息时，`runtime`会根据这个对象的`isa`指针找到该对象所属的类。

### 7. 多线程中栈与堆是公有的还是私有的？

在多线程环境下，每个线程拥有一个栈和一个程序计数器。栈和程序计数器用来保存线程的执行历史和线程的执行状态，是线程私有的资源。其他的资源（比如堆、地址空间、全局变量）是由同一个进程内的多个线程共享。

### 8. @property (atomic, strong) NSString *str; 如果重写了str的set方法，那atomic还有效吗？

`get`方法中的同步锁@`synchronized`还有，`set`方法不会有。

### 9. Session 和 Cookie 的区别。

- `session`在服务器端，`cookie` 在客户端（浏览器）。
- `session` 默认被存在在服务器的一个文件里（不是内存）。
- `session` 的运行依赖 `session id`，而 `session id` 是存在 `cookie` 中的，也就是说，如果浏览器禁用了 `cookie` ，同时 `session` 也会失效（但是可以通过其它方式实现，比如在 `url` 中传递 `session_id`）。
- `session` 可以放在 文件、数据库、或内存中都可以。
- 用户验证这种场合一般会用 `session`。

