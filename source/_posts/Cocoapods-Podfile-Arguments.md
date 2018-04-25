---
title: Cocoapods Podfile文件参数剖析
date: 2018-04-10 16:39:25
declare: true
comments: true
tags:
- Podfile
- Cocoapods
---

![top](/assets/blogImg/cocoapods-top.jpg)

<!-- more -->

> 文章内容摘自[pluto-y大神](http://www.pluto-y.com/cocoapods-getting-stared/)的博客，感谢大神～

### Podfile文件

##### 1. pod '框架名' 参数

- **参数一：版本号。**有大于( `pod 'AFNetworking', '> 3.1'` )、小于( `pod 'AFNetworking', '< 3.1'` )、等于( `pod 'AFNetworking', '3.1'` )、大于等于( `pod 'AFNetworking', '>= 3.1'` )等。**'~> 3.1' 意思是>=3.1 并且<3.2的意思。**
- **参数二：地址。**地址Cocoapods可以指定某一个git的目录或者是本地的目录，表示一直用最新版本。例如直接在后面接上：`:git => 'https://github.com/XXX/AFNetworking.git'`，或者开发模式下：`:path => '~/Documents/AFNetworking'`。
- **参数三：tag、branch、commit。**例如：`:branch => 'branch名'`、`:tag => 'tag名'`、`:commit => '提交号'`。
- **参数四：inhibitallwarnings。**用来避免第三方框架中带来的warnings。例如：`:inhibitallwarnings => true`

##### 2. platform

依赖的库希望在哪个平台被编译。 `platform :ios, '7.0'` 希望采用iOS7.0进行编译。

1. target

   指定具体的配置适配在哪个**target**。

2. use_frameworks!

   指明编译成动态库。**swift下必须有这句话。**

3. source

   指明Cocoapods从哪些仓库中获得框架的源代码。

#### Demo：

```ruby
# open source
source 'https://github.com/CocoaPods/Specs.git'

# 私有源
source 'https://github.com/Artsy/Specs.git'

# 指定 iOS9.0 进行编译
platform :ios, '9.0'

target 'App' do
  
  # 编译动态库（swift必须）
  use_frameworks!
  
  pod 'AFNetworking'
  
  pod 'SVProgressHUD', '~>2.1' #大于等于2.1，小于2.2
  
  pod 'MJRefresh'，:git=> 'https://github.com/XXX/MJRefresh.git' #从 https://github.com/XXX/MJRefresh.git 目录更新cocoapods
  
  pod 'Masonry', :git=> 'https://github.com/XXX/MJRefresh.git', :branch => '1-1-stable' #指定从特定的git repo branch更新cocoapod
  pod 'Masonry', :git=> 'https://github.com/XXX/MJRefresh.git', :tag => '1.3.0' #指定从特定的git repo tag更新cocoapod

  target 'AppTests' do
    
    # 编译动态库（swift必须）
    use_frameworks!
    
    pod 'FBSnapshotTestCase'
    
  end
end
```

### 命令行 `pod install` 和 `pod update`

1. 参数 `--no-repo-update`

在执行`pod install`和`pod update`两条命令时，会执行`pod repo update`的操作，只更新当前项目的第三方框架。

2. 参数`—verbose` 和 `--silent`

用来控制`pod`命令，不希望看到输出的情况时可使用`--silent`。如果出错，可添加`--verbose`显示具体的出错信息。对于大多数的`Cocoapods`的命令行来说都带有着两个参数。

### 更新Ruby

1. 移除Ruby的默认源：

   `gem sources --remove https://rubygems.org/` 

2. 替换Ruby China源：

   `gem sources -a https://gems.ruby-china.org/` 

3. 验证当前的Ruby源：

   `gem sources -l` 
