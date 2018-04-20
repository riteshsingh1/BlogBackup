---
title: 在 Hexo 中给文章添加版权信息(yilia主题)
date: 2018-03-20 15:26:32
tags:
- Hexo
- yilia
---

![top](/assets/blogImg/hexo-add-deciare-top.jpg)

<!-- more -->

### Step 1

在`layout\_partial\post\` 目录下新建 `declare.ejs` 内如如下：

```javascript
<% if ((theme.declare_type === 2 || (theme.declare_type === 1 && post.declare)) && !index){ %>
<div class="declare">
	<strong>本文标题：</strong>
	<%= post.title %>
	<br>
	<strong>本文作者：</strong>
	<%= theme.author%>
	<br>
	<strong>发布时间：</strong>
	<%= page.date.format("YYYY年MM月DD日 - HH:MM")%>
	<br>
	<strong>本文链接：</strong>
	<a href="<%= post.permalink %>"><%= post.permalink %></a>
	<br>
	<strong>许可协议：</strong>
	<i class="fa fa-creative-commons"></i><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 
	<a rel="license" href="<%= theme.licensee_url%>" target="_blank" title="Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)"><%= theme.licensee_name%></a> 转载请保留原文链接及作者。
</div>
<% } %>
```

### Step 2

在`layout\_partial\article.ejs` 文件下添加如下代码：

```javascript
<%- partial('post/declare') %>
```

### Step 3

创建新文件`themes/yilia/source-src/css/declare.scss`，添加如下CSS代码：

```javascript
.declare {
    background-color: #eaeaea;
    margin-top: 2em;
    border-left: 3px solid #ff1700;
    padding: .5em 1em;
}
```

同时在`themes/yilia/source-src/css/main.scss`添加如下代码：

```javascript
@import "./declare";
```

### Step 4

在`themes/yilia/`目录下输入：

`npm run dev`生成新代码，
或`npm run dist`生成新代码，并压缩。

> 提示：`yilia`文件夹需要单独copy一份执行`npm install webpack-cli -D`局部安装`webpack`，然后再执行`npm run dev`或`npm run dist`，执行命令之前可先清空`themes/yilia/source`里面的文件（不包括文件夹），最后再复制到hexo项目中覆盖，否则可能会因为权限问题导致ERROR。

### Step 5

修改`themes/yilia/_config.yml`：

```javascript
#版权声明：0-关闭声明； 1-文章对应的md文件里有declare: true属性，才有版权声明； 2-所有文章均有版权声明
declare_type: 2 
licensee_url: https://creativecommons.org/licenses/by-nc-nd/4.0/
licensee_name: '署名-非商业性使用-禁止演绎 4.0 国际'
```

### End

