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
document.onclick = i;
document.ontouchstart = i;
i()
