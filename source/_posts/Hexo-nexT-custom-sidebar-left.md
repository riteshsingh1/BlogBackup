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
- 修改箭头动画方向：

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
.sidebar-toggle{
    left:30px;
}
.sidebar{
    left:0;
}
```

