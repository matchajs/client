#Client

[![Build Status](https://travis-ci.org/matchajs/client.png?branch=master)](https://travis-ci.org/matchajs/client)

客户端信息分析

---


##使用说明

###Client.device

`name` {String} 设备名称

`fullVersion` {String} 设备完整版本号


`Client.device[deviceName]` {Boolean} 直接判断某设备

---


###Client.os

`name` {String} 系统名称

`version` {Number} 系统版本号

`fullVersion` {String} 系统完整版本号

`Client.device[osName]` {Boolean} 直接判断某系统

---


###Client.browser

`name` {String} 浏览器名称

`version` {Number} 浏览器版本

`fullVersion` {String} 浏览器版本

`mode` {Number} 浏览器模式

`fullMode` {String} 浏览器完整模式

`compatible` {Boolean} 是否兼容模式

`Client.device[browserName]` {Boolean} 直接判断某浏览器

---


###Client.engine

`name` {String} 渲染引擎名称

`version` {Number} 渲染引擎版本号

`fullVersion` {String} 渲染引擎完整版本号

`compatible` {Boolean} 是否兼容模式


