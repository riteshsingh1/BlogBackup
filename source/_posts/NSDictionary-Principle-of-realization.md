---
title: NSDictionary内部实现
declare: false
comments: true
reward: false
date: 2018-04-29 15:00:09
tags:
- NSDictionary
---

> `NSDictionary`（字典）是使用 `hash`表来实现`key`和`value`之间的映射和存储的， `hash`函数设计的好坏影响着数据的查找访问效率。数据在`hash`表中分布的越均匀，其访问效率越高。而在`Objective-C`中，通常都是利用`NSString` 来作为键值，其内部使用的`hash`函数也是通过使用 `NSString`对象作为键值来保证数据的各个节点在`hash`表中均匀分布。

<!-- more -->

### 思考

首先，看下给一个`Dictionary`赋值的方法：

```objective-c
- (void)setObject:(id)anObject forKey:(id <NSCopying>)aKey; 
```

从这个方法中可以知道， 要作为 `Key` 值，必须遵循 `NSCopying` 协议。也就是说在`NSDictionary`内部，会对 `aKey` 对象 `copy` 一份新的。而  `anObject` 对象在其内部是作为强引用（`retain`或`strong`)。所以在`MRC`下，向该方法发送消息之后，我们会向`anObject`发送 `release` 消息进行释放。

既然知道了作为 `key` 值，必须遵循 `NSCopying` 协议，说明除了 `NSString` 对象之外，我们还可以使用其他类型对象来作为 `NSDictionary` 的 key值。不过这还不够，作为 `key` 值，该类型还必须继承于 `NSObject` 并且要重载一下两个方法：

```objective-c
- (NSUInteger)hash; 
- (BOOL)isEqual:(id)object;  
```

其中，`hash` 方法是用来计算该对象的 `hash` 值，最终的 hash 值决定了该对象在 hash 表中存储的位置。使用`isEqual`方法来通过`hash`值查找对象在`hash`表中的位置。

因此，`NSDictionary`在调用`setObject: forKey:` 后，内部会去调用 `key` 对象的 `hash` 方法确定 `object` 在`hash`表内的入口位置，然后会调用 `isEqual :` 来确定该值是否已经存在于 `NSDictionary`中。

### 内部实现

`NSDictionary`是使用`NSMapTable`实现。`NSMapTable`同样是一个`key－value`的容器。

```objective-c
typedef struct {
   NSMapTable        *table;
   NSInteger                i;
   struct _NSMapNode *j;
} NSMapEnumerator;
```

上述结构体描述了遍历一个`NSMapTable`时的一个指针对象，其中包含`table`对象自身的指针，计数值，和节点指针。

```objective-c
typedef struct {
   NSUInteger (*hash)(NSMapTable *table,const void *);
   BOOL (*isEqual)(NSMapTable *table,const void *,const void *);
   void (*retain)(NSMapTable *table,const void *);
   void (*release)(NSMapTable *table,void *);
   NSString  *(*describe)(NSMapTable *table,const void *);
   const void *notAKeyMarker;
} NSMapTableKeyCallBacks;
```

上述结构体中存放的是几个函数指针，用于计算`key`的`hash`值，判断`key`是否相等，`retain`，`release`操作。

```objective-c
typedef struct {
   void       (*retain)(NSMapTable *table,const void *);
   void       (*release)(NSMapTable *table,void *);
   NSString  *(*describe)(NSMapTable *table, const void *);
} NSMapTableValueCallBacks;
```

上述存放的三个函数指针，定义在对`NSMaptable`插入一对`key－value`时，对`value`对象的操作。

```objective-c
@interface NSMapTable : NSObject {
   NSMapTableKeyCallBacks   *keyCallBacks;
   NSMapTableValueCallBacks *valueCallBacks;
   NSUInteger             count;
   NSUInteger             nBuckets;
   struct _NSMapNode  **buckets;
}
```

上面是`NSMtabtable`真正的描述，可以看出来`NSMapTable`是一个**哈希＋链表**的数据结构，因此在`NSMapTable`中插入或者删除一对对象时寻找的时间是`O（1）＋O（m）`，m最坏时可能为n。

- O（1）：为对`key`进行`hash`得到`bucket`的位置
- O（m）：遍历该`bucket`后面冲突的`value`，通过链表连接起来。

因此：`NSDictionary`中的`Key - Value`遍历时是无序的，至如按照什么样的顺序，跟`hash`函数相关。`NSMapTable`使用`NSObject`的哈希函数。

```objective-c
-(NSUInteger)hash {
   return (NSUInteger)self>>4;
}
```

上述是`NSObject`的哈希值的计算方式，简单通过移位实现。右移4位，左边补0.

因为对象大多存于堆中，地址相差4位应该很正常。

### setValue和setObject的区别：

```objective-c
- (void)setObject:(ObjectType)anObject forKey:(KeyType <NSCopying>)aKey;
- (void)setValue:(nullable ObjectType)value forKey:(NSString *)key;
```

首先：`setObject: ForKey:`是NSMutableDictionary特有的；`setValue: ForKey:`是KVC的主要方法。

- `setValue: ForKey:`的`value`是可以为`nil`的（但是当`value`为`nil`的时候，方法内部会有`if`判断自动调用`removeObject：forKey`方法）；

  `setObject: ForKey:`的`value`则不可以为`nil`。

- `setValue: ForKey:`的`key`必须是不为`nil`的字符串类型；
  `setObject: ForKey:`的`key`可以是不为`nil`的所有继承`NSCopying`的类型。



> ⚠️本篇文章是为了方便自己查阅整理，如有冒犯原作者，可以联系本人删除。
>
> 参考链接：
>
> [ 1 ] : [https://blog.csdn.net/linshaolie/article/details/41494303](https://blog.csdn.net/linshaolie/article/details/41494303)
> [ 2 ] : [https://www.cnblogs.com/doudouyoutang/p/4379068.html](https://www.cnblogs.com/doudouyoutang/p/4379068.html)

