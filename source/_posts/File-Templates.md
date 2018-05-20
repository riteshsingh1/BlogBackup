---
title: 定制XCode9工程目录以及文件模板
declare: true
comments: true
reward: false
date: 2018-05-20 10:03:00
tags:
- XCode
- Templates
---

### 目标

定制Xcode项目模板和文件模板

- [项目模板](#1)
- [文件模板](#2)

<!-- more -->

### 实现

<h3 id = "1">1. 项目模板</h3>

##### 1. 创建一个工程模板结构：

<pre>

User Defined App.xctemplate
├── Application
│   └── README.md
├── BootLoader
│   └── README.md
├── Classes
│   └── README.md
├── Resource
│   └── README.md
├── Services
│   ├── AppContext.h
│   ├── AppContext.m
│   ├── AppDelegate+Service.h
│   ├── AppDelegate+Service.m
│   └── README.md
├── TemplateInfo.plist
├── Tools
│   └── README.md
├── Utils
│   ├── Category
│   │   └── README.md
│   └── Common
│       └── README.md
└── Vendors
​    └── README.md

</pre>

##### 2. 修改TemplateInfo.plist文件

1. 修改下`Identifier`字段，以防冲突。
2. ​

> 参考链接
> [ 1 ] : [http://mama.indstate.edu/users/ice/tree/](http://mama.indstate.edu/users/ice/tree/)
> [ 2 ] : [http://jeanetienne.net/2017/09/10/xcode-templates.html](http://jeanetienne.net/2017/09/10/xcode-templates.html)
> [ 3 ] : [http://kentonyu.com/2016/04/27/如何Copy框架：自定义Xcode%20Template/](http://kentonyu.com/2016/04/27/如何Copy框架：自定义Xcode%20Template/)



