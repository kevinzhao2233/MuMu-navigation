# MUMU导航

:earth_africa:一款移动端的浏览器导航工具

PC端的导航有太多太多了，可是移动端却没有几个得心应手的导航网站。打开浏览器映入眼帘的可能是各种广告咨询，于是萌生了做一个导航页的想法

[:chestnut:DEMO地址](https://nav-1259075300.cos-website.ap-chengdu.myqcloud.com)

静态网站托管在腾讯云的COS上，对于我这种没什么人访问的情况来说，四舍五入之后就是免费的呀，嘿嘿

### 特色功能

- 自定义搜索引擎（能用的，可能不能用的都有:stuck_out_tongue_closed_eyes:）
- 自定义主题色
- 快捷方式（目前最多添加10个:stuck_out_tongue_winking_eye:）
- 5个常用小工具（可能只是我常用）
  - :bread::spaghetti:今天吃什么——一个抓阄工具，也可以是这回谁喝酒
  - :clock1:全屏时钟——对，就是网上很流行的那种全黑屏的时钟
  - :ab:翻译——暂时只支持 英-汉、汉-英 互译，调用[有道翻译](http://ai.youdao.com/?keyfrom=fanyi-new-nav)的Api
  - :performing_arts:进制转换——支持2、8、10、16进制互相转换
  - :pencil2:颜色转换——支持Hex和RGB颜色互相转换

### 使用到的技术

[zepto.js](https://zeptojs.com/)

[touch.js](https://allcky.github.io/touchjs/)

### 至开发者

```bash
git clone https://github.com/kevinzhao2233/MuMu-navigation.git
```

或者直接下载 zip 文件也可以哦