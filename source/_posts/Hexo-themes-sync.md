---
title: Hexo主题同步
declare: true
comments: true
date: 2018-04-26 16:20:51
tags:
- Hexo
---

### 问题

由于修改`hexo`主题的默认设置需要使用`git`管理来方便备份，所以如何同步主题的设置也是一件很重要的事。

### 原因

[NexT主题](https://github.com/theme-next/hexo-theme-next)的使用方法

```shell
$ git clone https://github.com/theme-next/hexo-theme-next themes/next
```

这样配置完其实`thems/next/`就是一个包含`.git/`的子项目仓库。所以在`push`主项目的时候不会上传子项目，子项目的文件夹是灰的，并且里面是空的。所以从远程仓库拉取的项目中是没有Next主题的。

<!-- more -->

### 解决

解决方法在[Issues](https://github.com/iissnan/hexo-theme-next/issues/328)里，使用`fork + subtree`。

首先要`fork` `Next`，然后拉取到本地做修改，修改好后`push`到远程仓库。然后用`git subtree`把`themes/next/`当做子项目来统一管理。

### 步骤

- 首先进入Hexo博客所在的目录，本例子中是`BlogBackup`。

- 新建名为`themes`的分支:

  ```shell
  $ git branch themes
  ```

  切换到`themes`分支:

  ```shell
  $ git checkout themes
  ```

- 绑定`fork`的`next`仓库：

  ```shell
  $ git remote add -f next https://github.com/liuzhida33/hexo-theme-next.git
  ```

- 添加`subtree`：

  ```shell
  $ git subtree add --prefix=themes/next next master
  ```

  这样就把`fork`之后的`next`的`master`分支所有`checkout`出来的文件作为一次提交加到了`BlogBackup`项目的`themes`分支中。

- 合并`themes`分支到主分支：

  ```shell
  $ git checkout master 
  $ git merge themes --squash 
  $ git commit
  ```

### 提交对主题配置文件的修改

```shell
$ git subtree push --prefix=themes/next next master
```

这样提交之后`fork`的`next`主题仓库也会保持更新。

### 更新主题

```shell
git checkout themes 
git merge master 
git subtree pull --prefix=themes/next next master 
git checkout master 
git merge themes --squash 
git commit
```

