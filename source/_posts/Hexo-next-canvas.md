---
title: 为NexT主题header添加彩带动画
declare: true
comments: true
date: 2018-04-27 16:26:49
tags:
- Hexo
- NexT
---

![top](/assets/blogImg/Hexo-next-canvas/hexo-next-canvas.png)

<!-- more -->

### Step 1

新建`JS`文件，保存至`source\js\src\`目录下，内容如下：

```javascript
//监听触摸移动事件
// document.addEventListener('touchmove', function (e) {
//     e.preventDefault()  //（禁止触摸移动，手机端会出现无法滑动的现象）
// })

//初始化变量
var c = document.getElementsByTagName('canvas')[0],
  x = c.getContext('2d'),
  pr = window.devicePixelRatio || 1, //设置像素比
  w = window.innerWidth,
  h = window.innerHeight,
  f = 90,
  q,
  m = Math,
  r = 0,
  u = m.PI * 2, //Math.PI*2
  v = m.cos, //余弦值
  z = m.random //随机数值
c.width = w * pr //设置 Canvas 宽度为可视窗口的宽度*像素比
c.height = h * pr //设置 Canvas 高度为可视窗口的高度*像素比
x.scale(pr, pr) //缩放 Canvas pr = 1 = 100%
x.globalAlpha = 0.2 //设置 Canvas 透明度

//循环函数
function i() {
  x.clearRect(0, 0, w, h) //清空矩形
  //数组变量对象
  q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
  //循环，0 < 可视窗口宽度+90
  while (q[1].x < w + f) {
    d(q[0], q[1]) //绘制函数传参
  }
}

//绘制函数传参，i 和 j 均有一个 x 与 y 数值对象
function d(i, j) {
  x.beginPath() //开始路径
  x.moveTo(i.x, i.y) //移动路径
  x.lineTo(j.x, j.y) //创建线条
  var k = j.x + (z() * 2 - 0.25) * f, //重新定义数组对象 q[1] 的变量对象，z() 随机数值
    n = y(j.y) //将 y() 传参函数赋值给 n
  x.lineTo(k, n) //创建线条
  x.closePath() //关闭路径
  r -= u / -50
  //填充颜色，toString(16)转换为16进制颜色值
  //关于（<< 与 |）位运算操作参考：http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp
  x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16);
  x.fill()
  //重新定义数组对象，增加无限可变性
  q[0] = q[1]
  q[1] = { x: k, y: n }
}

//传参函数 return 返回数值
function y(p) {
  var t = p + (z() * 2 - 1.1) * f //z() 随机数值
  return (t > h || t < 0) ? y(p) : t //判断后返回不同数值后增加了更多的可变性
}

//点击与触摸时执行 i() 函数
var headerDiv = document.getElementById("canvas-header");
headerDiv.onclick = i;
i()

```

### Step 2

在`layout\_layout.swig`文件中结尾`</body>`前添加引入`JS`代码：

```html
  <script id="canvas-lzd" type="text/javascript" src="/js/src/canvas-lzd.js"></script>
```

并搜索`<div class="header-inner">`标签代码，在`<header>`之后添加` <div id="canvas-header" class="header" position:absolute>`标签，使`header`部分拥有`onclick`事件， 在`</div>`和`</header>`之间添加`<canvas>`标签代码：

```html
<header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
  <div id="canvas-header" class="header" position:absolute>
  <div class="header-inner">{% include '_partials/header/index.swig' %}
  </div>
  
  <canvas class="canvas-lzd" position:absolute>
  </canvas>
  
  </div>
</header>
```

### Step 3

在`source/css\_custom/custom.styl`添加以下内容：

```css
/* canvas样式 */
.canvas-lzd {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 334px;
  pointer-events: none;
}
```

重新部署后就能看到彩带header了

>参考链接：
>
>[为你的网站添加动画彩带背景](https://zproo.github.io/2017/为Next主题添加canvas-ribbon/)

