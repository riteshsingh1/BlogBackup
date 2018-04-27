---
title: 让NexT主题的Muse模板侧边栏居左
declare: true
comments: true
date: 2018-04-26 10:56:21
tags:
- NexT
- Hexo
---

> NexT主题（v5.14）只有`Pisces`和`Gemini`主题支持侧边栏居左，因此本文将使用Muse模板并使其侧边栏在左侧，修改内容如下：

<!-- more -->

### 1. 修改motion.js

- 在主题目录下`source/js/src/motion.js`中查找`paddingRight`，将其修改为`paddingLeft`（一共两处）。
- 修改菜单箭头动画方向：

```javascript
var sidebarToggleLine1st = new SidebarToggleLine({
    el: '.sidebar-toggle-line-first',
    status: {
      arrow: {width: '60%', rotateZ: '45deg', top: '2px', left: '5px'},
      close: {width: '100%', rotateZ: '-45deg', top: '5px', left: '0px'}
    }
  });
  var sidebarToggleLine2nd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-middle',
    status: {
      arrow: {width: '90%'},
      close: {opacity: 0}
    }
  });
  var sidebarToggleLine3rd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-last',
    status: {
      arrow: {width: '60%', rotateZ: '-45deg', top: '-2px', left: '5px'},
      close: {width: '100%', rotateZ: '45deg', top: '-5px', left: '0px'}
    }
  });
```

### 2. 修改custom.styl

在主题目录下`source/css\_custom/custom.styl`添加以下内容：

```css
/* 修改菜单为左侧 */
.sidebar-toggle{
    left:30px;
}
/* 修改siedebar为左侧 */
.sidebar{
    left:0;
}
/* 修改上滑按钮为左侧 */
.back-to-top{
    left:30px;
}
```

### 3. 去掉社交链接圆点和下划线

在主题目录下`source/css\_custom/custom.styl`添加以下内容：

```css
.links-of-author a,
.links-of-author .exturl{
  border-bottom-color: rgba(255, 255, 255, 0);
  &:before {
        display: none;
      }
}
```

### 4. 为侧边栏链接添加鼠标悬浮放大效果

在主题目录下`source/css\_custom/custom.styl`添加以下内容：

```css
.sidebar {
    left:0;
    background:url(/images/sidebar.jpg);
    background-size: cover;
    background-position:left;
    background-repeat:no-repeat;
    a, .exturl {
      padding: 0px 10px 0px 10px;
      font-size: 20px;
      -webkit-transition-duration: .3s;
      transition-duration: .3s;
      -webkit-transition-property: transform;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      &:hover, &:focus, &:active { 
        color:rgb(252, 100, 35);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
}
```

假如在 `.sidebar` 修改链接字体和颜色并含有`RSS`元素，同时会导致`RSS`样式有所不协调，需要添加如下代码：

```css
.feed-link {
  a,.exturl {
    font-size: 14px;
  }
}
.feed-link {
  a:hover, a:focus, a:active {
    color:white;
      background: rgb(252, 100, 35);

      i { color: white; }
  }
}
```

文章目录也会发现有所变化，添加如下代码：

```css
.post-toc ol {
  a {
    font-size: 14px;
    &:hover {
        color: rgb(252, 100, 35);
    }
  }
}
```



> 参考链接：
>
> [hexo的next主题个性化教程:打造炫酷网站](http://shenzekun.cn/hexo的next主题个性化配置教程.html)
>
> [NexT主题 6.0+](https://github.com/theme-next/hexo-theme-next)
>
> [Next主题新官网](https://theme-next.org)