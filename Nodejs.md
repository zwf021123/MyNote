# Node.js入门

## 什么是Node.js

- 概念：Node.js是一个跨平台JavaScript运行环境，使得开发者可以搭建服务器端的JavaScript应用程序
  - 简单来说就是执行在服务端的JavaScript
- 作用：使用Node.js编写服务器端程序
  - 编写数据接口，提供网页资源浏览功能

## Node.js为何能执行JS

首先，浏览器能够执行JS代码，依靠的是浏览器内核中的**V8引擎**(C++程序)

其次，Node.js基于ChromeV8引擎进行封装(运行环境)，即简单理解为Node.js将V8引擎从浏览器中拿了出来

**区别：浏览器与Node.js都支持ECMAScript标准语法，但Node.js有自己独立的API，没有DOM和BOM等**

![69432332724](../../%E7%AC%94%E8%AE%B0/MyNotes/Nodejs+npm+webpack+git.assets/1694323327248.png)





## 使用Node.js

### fs模块-读写文件

- 模块：类似插件，封装了方法和属性(python中模块的概念)
- fs模块：封装了与本机文件系统进行交互的方法和属性
- 语法：
  1. 加载fs模块对象``const fs = require('fs')``
  2. 创建并写入文件内容``fs.writeFile('文件路径', '写入内容' , err=>{写入后的回调函数})``
  3. 读取文件内容``fs.readFile('文件路径', (err,data)=>{读取后的回调函数})``

> 注意这里readFile读取后的回调函数中的data得到的是文件内容的Buffer数据流，即计算机中16进制的存储信息，如果需要显示原本的内容可以调用data.toString()方法



### path模块-路径处理

- 问题：

因为在Nodejs环境的代码中，js代码不再依靠html文件，而是可以直接使用终端进行执行

因此==代码的相对路径值以终端中的路径为起点，而不再是原先的VsCode资源管理器==，因此容易导致目标文件找不到的错误

- 建议：在Node.js代码中的路径，都使用**绝对路径**
- 补充：**__dirname**内置变量(获取当前模块目录-绝对路径)
- 注意：==path.join()会检测当前适用于本平台的分隔符，作为定界符，将所有的路径片段连接在一起==
- 语法：

1. 加载path模块 ``const path = require('path')``
2. 使用path.join()方法，拼接路径``path.join('路径1', '路径2', ...)``



### http模块-创建Web服务

- 语法：

1. 加载http模块，创建web服务对象
2. 监听request请求事件，设置响应头和响应体
3. 配置该服务的端口号同时开始监听(启动web服务)
4. 浏览器请求http:localhost:3000测试

```javascript
const http = require('http')
const server = http.createServer()

//监听请求事件
server.on('request', (ret, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.end('欢迎使用Nodejs与http模块创建的web服务')
})

//配置端口号并开始监听
server.listen(3000, () => {
  console.log('开始监听');
})
```



## NodeJs使用过程中遇到的问题与解答

> path模块下的resolve与join路径拼接有何不同
>
> [path.resolve 与 path.join 的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/269536704#:~:text=%E6%80%BB%E7%BB%93%E4%B8%8B%E6%9D%A5%E5%B0%B1%E6%98%AF%EF%BC%9A%201%EF%BC%8C%E4%B8%A4%E8%80%85%E8%8E%B7%E5%8F%96%E7%9A%84%E8%B7%AF%E5%BE%84%E7%9B%B8%E5%AF%B9%E6%80%A7%E4%B8%8D%E4%B8%80%E6%A0%B7%EF%BC%9A%EF%BC%88%E7%AC%AC%E4%B8%80%E7%BB%84%EF%BC%8C%E7%AC%AC%E4%BA%8C%E7%BB%84%EF%BC%89%20join%20%E8%8E%B7%E5%8F%96%E7%9A%84%E6%98%AF%E6%A0%87%E5%87%86%E5%8C%96%E7%9A%84%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%20resolve%20%E8%8E%B7%E5%8F%96%E7%9A%84%E6%98%AF%E7%BB%9D%E5%AF%B9%E8%B7%AF%E5%BE%84%202%EF%BC%8C%E5%A4%84%E7%90%86,%27%2F%27%20%E7%9A%84%E6%96%B9%E5%BC%8F%E4%B8%8D%E4%B8%80%E6%A0%B7%20%E5%AF%B9%E4%BA%8E%20join%20%EF%BC%8C%E5%B8%A6%E4%B8%8D%E5%B8%A6%20%2F%20%E5%A4%84%E7%90%86%E6%96%B9%E5%BC%8F%E9%83%BD%E6%98%AF%E4%B8%80%E6%A0%B7%EF%BC%9A%E7%9B%B4%E6%8E%A5%E6%8B%BC%E6%8E%A5%EF%BC%88%E7%AC%AC%E4%B8%89%E7%BB%84%EF%BC%8C%E7%AC%AC%E5%9B%9B%E7%BB%84%EF%BC%89)
>
> - 两者区别：
>
> **注： 当前工作目录为 /home/myself/node**
>
> 1、**join是把各个path片段连接在一起， resolve把‘／’当成根目录**
>
> path.join('/a', '/b') // Outputs '/a/b'
> path.resolve('/a', '/b') // Outputs '/b'
>
> 2、**join直接拼接字段，resolve解析路径并返回**
>
> path.join("a", "b1", "..", "b2")
>
> console打印会得到"a/b2"
>
> path.resolve("a", "b1", "..", "b2")
>
> console打印得到"/home/myself/node/a/b2"



## Nodejs入门

### 进程管理

**process**是一个**全局内置对象**，可以在代码中的任何位置访问此对象，这个对象代表我们的node.js代码宿主的操作系统**进程**对象。

使用process对象可以截获进程的异常、退出等事件，也可以获取进程的当前目录、环境变量、内存占用等信息，还可以执行进程退出、工作目录切换等操作。



#### cwd函数

cwd即curent work dir当前工作目录，用于查看当前应用程序的工作目录，使用语法如下：

```js
process.cwd();
```



#### chdir函数

如果需要改变应用程序目录，就要使用chdir函数了，它的用法如下：

```js
process.chdir("目录");
```



#### stdout

stdout是标准输出流，用于将内容打印到输出设备上，``console.log()``就是对他的封装

```js
console.log = function(d){
    process.stdout.write(d+'\n');
}
```



#### stderr

stderr是标准错误流，和stdout的作用差不多，不同的是它是用来打印错误信息的，我们可以通过它来捕获错误信息，基本使用方法如下：

```js
process.stderr.write(输入内容);
```



#### stdin

stdin是进程输入流，我们可以通过注册事件的方式来获取输入的内容，如下：

```js
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk);
  }
});
```

示例中的chunk就是输入流中的内容。



#### exit函数

exit函数用于杀死进程，退出程序，示例如下：

```js
process.exit(code);
```

参数code为退出后返回的代码，如果省略则默认返回0；



#### 监听进程事件

使用``process.on()``方法进行监听进程事件

- exit事件

当进程要退出之前，会触发**exit**事件。通过监听*exit*事件，我们可就以在进程退出前进行一些清理工作：

```js
process.on('exit',function(){
	console.log('I am tired...')
})
var tick = Date.now()
console.log(tick)
process.exit()
```

- uncaughtException事件

如果进程发生了未捕捉的异常，会触发**uncaughtException**事件。通过监听这个事件，你可以 让进程优雅的退出：

```js
process.on('uncaughtException',function(err){
	console.log('err：',err)
})
throw new Error('我是故意的嘻嘻')
```



#### 编码设置

在我们的输入输出的内容中有中文的时候，可能会乱码的问题，这是因为编码不同造成的，所以在这种情况下需要为流设置编码，如下示例：

```js
process.stdin.setEncoding(编码);
process.stdout.setEncoding(编码);
process.stderr.setEncoding(编码);
```





## 文件IO

在开发中，我们经常需要对文件进行操作，nodejs提供了一个名为``fs``的模块来支持操作文件



### 写入文件

fs模块提供writeFile函数，可以**异步的**将数据写入一个文件, **如果文件已经存在则会被替换**。用法如下：

例：fs.writeFile(filename, data, callback)

```js
var fs= require("fs");
 
fs.writeFile('test.txt', 'Hello Node', function (err) {
   if (err) throw err;
   console.log('Saved successfully'); //文件被保存
});
 
```

数据参数可以是string或者是Buffer,编码格式参数可选，默认为"utf8"，回调函数只有一个参数err。



### 追加写入

fs模块提供了另外一个函数``appendFile``允许我们对文件内容进行追加而非覆盖，如果文件不存在则会自动创建新的文件，同样的，该函数也是**异步的**

例：fs.appendFile(文件名,数据,编码,回调函数(err));

```js
var fs= require("fs");
 
fs.appendFile('test.txt', 'data to append', function (err) {
   if (err) throw err;
 
    //数据被添加到文件的尾部
    console.log('The "data to append" was appended to file!'); 
});
```

编码格式默认为"utf8"，



### exists函数

该函数用于检查一个文件是否存在

例：fs.exists(文件，回调函数(exists));

exists的回调函数只有一个参数，类型为布尔型，通过它来表示文件是否存在。

```js
var fs= require("fs");
 
fs.exists('/etc/passwd', function (exists) {
  console.log(exists ? "存在" : "不存在!");
});
```





### rename函数

``rename``函数允许我们重命名一个文件

```js
var fs= require("fs");
 
fs.rename(旧文件名，新文件名，回调函数(err){
   if (err) throw err;
   console.log('Successful modification,');
});
```

注意：这里的参数``旧文件名，新文件名``可以是``oldPath,newPath``，也就是说，我们可以利用rename实现文件移动

```js
var fs = require('fs');
 
fs.rename(oldPath,newPath,function (err) {
   if (err) throw err;
   console.log('renamed complete');
});
```





### 读取文件

例：fs.readFile(文件,编码,回调函数);

```js
const fs = require('fs')

fs.readFile('/etc/test1.txt','utf8',function(err,data){
	if(err)throw err
    console.log('读取到：',data)
})
```

回调函数里面的data,就是读取的文件内容。



### unlink函数

``unlink``函数用于删除文件，该函数是**异步的**

例：fs.unlink(文件,回调函数(err));

```js
var fs = require('fs');
 
fs.unlink(文件, function(err) {
  if (err) throw err;
  console.log('successfully deleted');
});
```







### mkdir函数

mkdir函数用于创建一个目录

```js
fs.mkdir(路径，权限，回调函数(err));
参数

路径：新创建的目录。
权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，表示文件所有者、文件所有者所在的组的用户、所有用户，都有权限进行读、写、执行的操作。
回调函数：当发生错误时，错误信息会传递给回调函数的err参数。
```

```js
const fs = require('fs')

fs.mkdir('/myDir',function(err){
	if(err) throw err
    console.log('目录创建成功')
})
```



### rmdir函数

删除目录使用``rmdir``

rmdir函数可以删除指定的目录：

例：fs.rmdir(路径，回调函数(err));

```js
const fs = require('fs')

fs.rmdir('/myDir',function(err){
	if(err) throw err
    console.log('目录删除成功')
})
```



### readdir

readdir函数可以读取到指定目录下所有的文件，示例如下：

```js
const fs = require('fs')

fs.readdir('/',function(err,files) {
	if(err) throw err
    console.log('所有文件:',files)
})

```

回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'





## URL处理

node.js为互联网而生，和url打交道是无法避免的了，**url模块**提供一些基础的url处理



### 解析URL-parse函数

parse函数用于解析URL，并返回一个JSON格式的数组

```js
const url  = require('url')

console.log(url.parse('https://www.baidu.com'))
```

```js
{
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'https://www.baidu.com/' 
}
```

- 第二个参数

parse函数的第二个参数是布尔类型，当参数为true时，会将**查询条件**也解析成json格式的对象。

```js
const url  = require('url')

console.log(url.parse('http://www.baidu.com?page=1',false))
console.log(url.parse('http://www.baidu.com?page=1',true))

//返回值
 { protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?page=1',
  query: 'page=1',
  pathname: '/',
  path: '/?page=1',
  href: 'http://www.baidu.com/?page=1' }
 
{ protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?page=1',
  query: { page: '1' },
  pathname: '/',
  path: '/?page=1',
  href: 'http://www.baidu.com/?page=1' }
```

可以看到query字段返回值格式的不同



- 第三个参数

parse函数的第三个参数也是布尔类型的，当参数为true，解析时会将url的"//"和第一个"/"之间的部分解析为主机名，示例如下：

```js
var url = require('url');
url.parse('http://www.baidu.com/news',false,true);
```

经过测试，发现不传第三个参数/传值为false都可以得到host字段值





### format函数

format函数与parse函数作用相反，它的参数是一个json对象，返回值是一个组装的URL

```js
const url  = require('url')

console.log(url.format({
	protocol:'https',
  	hostname:'www.baidu.com',
  	port:'8080',
  	pathname:'/news',
  	query:{page:1}
}))
// 返回值
> https://www.baidu.com:8080/news?page=1
```





### resolve函数

该函数的参数是两个路径，第一个参数是当前路径或开始路径，第二个则是想要去往的路径，返回一个组装好的url

```js
const url  = require('url')

console.log(url.resolve('http://www.baidu.com/','http://www.baidu.com/one'))
console.log(url.resolve('http://www.baidu.com/one','http://www.baidu.com/two'))

// 返回值
> http://www.baidu.com/one
> http://www.baidu.com/two
```



## path优化

path模块包含一套用于处理和转换文件路径的工具集,用于处理目录的对象，提高用户开发效率



### normalize函数

normalize函数将不符合规范的路径经过格式化转换为标准路径,解析路径中的.与..外，还能去掉多余的斜杠。

```js
const path = require('path')

console.log(path.normalize('./path///mydir/./'))
// 结果
path/mydir
```



### join函数

join函数将传入的多个路径拼接为标准路径并进行格式化，返回规范的路径，避免手工拼接路径字符串的繁琐. 如下示例：

```js
const path = require('path')

console.log(path.join('///you','/are','./beautiful'))
// 打印
/you/are/beautiful
```



### dirname函数

该函数用于返回路径中的目录名

```js
const path = require('path')

console.log(path.dirname('/foo/dir/test.txt'))
// 打印
/foo/dir
```



### basename函数

basename函数用于返回路径中的最后一部分，并且可以进行条件排除

```js
例1：path.basename('路径字符串');

例2：path.basename('路径字符串', '[ext]')<排除[ext]后缀字符串>;

const path = require('path')

console.log(path.basename('/foo/mydir/index.html'))
console.log(path.basename('/foo/mydir/index.html','.html'))
// 打印
index.html
index
```



### extname函数

extname函数用于返回路径中文件的扩展名，以最后一个'.'开始,返回'.'以及'.'以后的所有字符串,如没有'.',则返回空字符串). 如下示例：

```js
const path = require('path')

console.log(path.extname('index.html'))
// 打印
.html
```



## 字符串转换

```Query String``模块用于实现**URL参数字符串与参数对象之间的互相转换**，提供了"stringify"、"parse"等一些实用函数来针对字符串进行处理，通过序列化和反序列化，来更好的应对实际开发中的条件需求，对于逻辑的处理也提供了很好的帮助



### stringify函数

该函数用于序列化对象，即将对象转换为一个字符串（默认分隔符``&``默认分配符``=``）

```js
const querystring  = require('querystring')

console.log(querystring.stringify({
	get:['fire','ice'],
  	want:'go'
}))
// 打印
> get=fire&get=ice&want=go
```

> 该函数拥有第二个参数与第三个参数分别用于指定需要使用的分隔符与分配符的
>
> ```js
> querystring.stringify("对象"，"分隔符"，"分配符")
>
> const querystring  = require('querystring')
>
> console.log(querystring.stringify({
> 	get:['fire','ice'],
>   	want:'go'
> },'@','#'))
> // 打印
> > get#fire@get#ice@want#go
> ```





### parse函数

与stringify函数相反，反序列化函数parse用于将字符串转换为对象（默认分隔符``&``默认分配符``=``）

```js
const querystring  = require('querystring')

console.log(querystring.parse('get=fire&get=ice&want=go'))
// 打印
> { get: [ 'fire', 'ice' ], want: 'go' }

```

同理，parse的第二个参数与第三个参数也是用于指定想要的分隔符与分配符的



## 实用工具

util模块呢，是一个Node.js核心模块，提供常用函数的集合，用于弥补核心JavaScript的一些功能过于精简的不足。并且还提供了一系列常用工具，用来对数据的输出和验证。



### inspect函数

``util.inspect(object,[showHidden],[depth],[colors])``是一个将任意对象转换为字符串的函数，通常用于调试和错误输出。它至少接受一个参数object，即要转换的对象,我们来学习它的简单用法。使用语法如下：

```js
var util = require('util');
var result = util.inspect(object);
console.log(result);
```



### format函数

format函数根据第一个参数，返回一个格式化字符串，第一个参数是一个可包含零个或多个占位符的字符串。每一个占位符被替换为与其对应的转换后的值，支持的占位符有："%s(字符串)"、"%d(数字<整型和浮点型>)"、"%j(JSON)"、"%(单独一个百分号则不作为一个参数)"。(类似c语言的printf)

```js
1：如果占位符没有相对应的参数，占位符将不会被替换.如示例：

var util = require('util');
var result = util.format('%s:%s', 'foo');
console.log(result);
运行结果：
'foo:%s'

2：如果有多个参数占位符，额外的参数将会调用util.inspect()转换为字符串。这些字符串被连接在一起，并且以空格分隔。如示例：

var util = require('util');
var result = util.format('%s:%s', 'foo', 'bar', 'baz');
console.log(result);
运行结果：
'foo:bar baz'

3：如果第一个参数是一个非格式化字符串，则会把所有的参数转成字符串并以空格隔开拼接在一块，而且返回该字符串。如示例：

var util = require('util');
var result = util.format(1, 2, 3);
console.log(result);
运行结果：
'1 2 3'
```



### isArray函数

isArray函数可以判断对象是否为数组类型，是则返回ture,否则为false。语法如下：

```js
var util = require('util');
var result = util.isArray(object);
console.log(result);
```



### isDate函数

isDate函数可以判断对象是否为日期类型，是则返回ture,否则返回false。语法如下：

```js
var util = require('util');
var result = util.isDate(object);
console.log(result);
```



### isRegExp函数

isRegExp函数可以判断对象是否为正则类型，是则返回ture,否则返回false。语法如下：

```js
var util = require('util');
var result = util.isRegExp(object);
console.log(result);
```



## 子进程

众所周知node.js是基于单线程模型架构，这样的设计可以带来高效的CPU利用率，但是无法却利用多个核心的CPU，为了解决这个问题，node.js提供了child_process模块，通过多进程来实现对多核CPU的利用. child_process模块提供了四个创建子进程的函数，分别是spawn，exec，execFile和fork。



### spawn函数

spawn函数用给定的命令发布一个子进程，只能运行指定的程序，参数需要在列表中给出。如下示例：

```js
var child_process = require('child_process');
var child = child_process.spawn( command );
child.stdout.on('data', function(data) {
  console.log(data);
});
```



### exec函数

exec也是一个创建子进程的函数，与spawn函数不同它可以直接接受一个回调函数作为参数，回调函数有三个参数，分别是err, stdout , stderr，基本使用方法如下：

```js
var child_process = require('child_process');
child_process.exec( command , function(err, stdout , stderr ) {
  console.log( stdout );
});
```



### execFile函数

execFile函数与exec函数类似，但execFile函数更显得精简，因为它可以直接执行所指定的文件，基本使用方法如下：

```js
var child_process = require('child_process');
child_process.execFile( file , function(err, stdout , stderr ) {
  console.log( stdout );
});
```



### fork函数

fork函数可直接运行Node.js模块，所以我们可以直接通过指定模块路径而直接进行操作。使用方法如下：

```js
var child_process = require('child_process');
child_process.fork( modulePath );
```





# Express

## 基础知识

### Express介绍

Express是一个简洁、灵活的node.js Web应用开发框架, 它提供一系列强大的功能，比如：模板解析、静态文件服务、中间件、路由控制等等,并且还可以使用插件或整合其他模块来帮助你创建各种 Web和移动设备应用,是目前最流行的基于Node.js的Web开发框架，并且支持Ejs、jade等多种模板，可以快速地搭建一个具有完整功能的网站。

Express 框架核心特性：

- 可以设置**中间件**来响应 HTTP 请求。
- 定义了**路由**表用于执行不同的 HTTP 请求动作。
- 可以通过向**模板**传递参数来动态渲染 HTML 页面。



### 创建应用

想要使用express，需要先安包

```js
 npm install express
```

**获取、引用**

```
var express = require('express');var app = express();
```

通过变量“app”我们就可以调用express的各种方法了

下面我们创建一个简单的应用：

```js
let express = require('express');
let app = express();

// 这是express的get方法---根据请求路径来处理客户端发出的GET请求
// 其中回调函数的两个参数分别表示请求信息和响应信息
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', function(request, response) {
   response.send('Welcome to the about page!');
});
// 路径匹配不到则发送404 error
app.get("*", function(request, response) {
    response.send("404 error!");
});

// 启动服务开始监听8081端口
let server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
```





### 简述中间件

1. 什么是中间件

中间件(middleware)就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录、分析数据、以及其他**在需要最终将数据发送给用户之前完成的任务**。 它最大的**特点**就是，**一个中间件处理完，可以把相应数据再传递给下一个中间件**。

2.一个不进行任何操作、只传递request对象的中间件，大概是这样：

```js
function Middleware(request, response, next) { 
   next();
}
```

上面代码的next为中间件的回调函数。**如果它带有参数，则代表抛出一个错误，参数为错误文本**。

```js
function Middleware(request, response, next) { 
   next('出错了！');
}
```

　　**抛出错误以后，后面的中间件将不再执行**，直到发现一个错误处理函数为止。**如果没有调用next方法,后面注册的函数也是不会执行的**。



### all函数

与`get`函数不同，`app.all`函数可以匹配指定路由下的所有HTTP动词，也就是说它可以过滤所有路径的请求，如果使用all函数定义中间件，那么就相当于所有请求都必须先通过此该中间件。

```js
格式：app.all(path,function(request, response));
```

如下所示，我们使用all函数在请求之前设置响应头属性。

```js
var express = require("express");
var app = express();
 
app.all("*", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });      //设置响应头属性值
    next();
});
 
app.get("/", function(request, response) {
    response.end("欢迎来到首页!");
});
 
app.get("/about", function(request, response) {
    response.end("欢迎来到about页面!");
});
 
app.get("*", function(request, response) {
    response.end("404 - 未找到!");
});
 
app.listen(80);
```

上面代码参数中的“*”表示对所有路径有效，这个方法在给特定前缀路径或者任意路径上处理时会特别有用，不管我们请求任何路径都会事先经过all函数





### use方法

#### 基本用法1

use是express调用中间件的方法，它返回一个函数。

```js
格式：app.use([path], function(request, response, next){});
可选参数path默认为"/"。
```

1.使用中间件

```js
app.use(express.static(path.join(__dirname, '/')));
```

如上呢，我们就使用use函数调用express中间件设定了静态文件目录的访问路径(这里假设为根路径)。

2.如何连续调用两个中间件呢，如下示例：

```js
var express = require('express');
var app = express();
 
app.use(function(request, response, next){
    console.log("method："+request.method+" ==== "+"url："+request.url);
    next();
});
 
app.use(function(request, response){
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end('示例：连续调用两个中间件');
});
 
app.listen(80);
```

回调函数的next参数，表示接受其他中间件的调用，函数体中的next()，表示将请求数据传递给下一个中间件。

上面代码先调用第一个中间件，在控制台输出一行信息，然后通过next()，调用第二个中间件，输出HTTP回应。由于第二个中间件没有调用next方法，所以req对象就不再向后传递了。



#### 基本用法2

use方法不仅可以调用中间件，还可以根据请求的网址，返回不同的网页内容，如下示例：

```js
var express = require("express");
var app = express();
 
app.use(function(request, response, next) {
   if(request.url == "/") {
      response.send("Welcome to the homepage!");
   }else {
      next();
   }
});
 
app.use(function(request, response, next) {
   if(request.url == "/about") {
     response.send("Welcome to the about page!");
   }else {
     next();
   }
});
 
app.use(function(request, response) {
  response.send("404 error!");
});
app.listen(80);
```



### 回调函数

Express回调函数有两个参数，分别是request(简称req)和response(简称res)，request代表客户端发来的HTTP请求，response代表发向客户端的HTTP回应，这两个参数都是对象。示例如下:

```js
function(req, res) {
 
});
```





### 获取主机、路径

1.`req.host`返回请求头里取的主机名(不包含端口号)。

2.`req.path`返回请求的URL的路径名





### Get请求

#### query

query是一个可获取客户端get请求路径参数的对象属性，包含着被解析过的请求参数对象，默认为{}。

```js
const express = require('express');
const app = express();

app.get('*', function (req, res, next) {
  for (let key in req.query) {
    console.log(key, req.query[key]);
  }
  res.send('测试query属性');
})

app.listen(8081)
```

启动服务后，在浏览器访问[localhost:8081/?param1=1&param2=2](http://localhost:8081/?param1=1&param2=2)即可看到参数

> #### 例1： /search?n=Lenka
>
> ```js
> req.query.n  // "Lenka"
> ```
>
> #### 例2： /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
>
> ```js
> req.query.order  // "desc"
>  
> req.query.shoe.color  // "blue"
>  
> req.query.shoe.type  // "converse"
> ```





#### params

和属性query不一样的是，通过req.params我们只能获取**路由参数**

```js
格式：req.param("参数名")；
```

例子1：假设路由规则为 /user/:name/，请求路径/user/mike,如下：

```js
app.get("/user/:name/", function(req, res) {
    console.log(req.param("name")); //mike
    res.send("使用req.param属性获取具有路由规则的参数对象值!");
});
```

PS：所谓“路由”，就是指为不同的访问路径，指定不同的处理方法。

例2：当然我们也可以请求复杂的路由规则，如/user/:name/:id，假设请求地址为：/user/mike/123，如下：

```js
app.get("/user/:name/:id", function(req, res) {
    console.log(req.params.id); //"123"
    res.send("使用req.params属性复杂路由规则的参数对象值!");
});
```



### send

send()方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据。格式如下：

```js
res.send([body|status], [body]);
```

1.当参数为一个String时，Content-Type默认设置为"text/html"。

```js
res.send('Hello World'); //Hello World
```

2.当参数为Array或Object时，Express会返回一个JSON。

```js
res.send({ user: 'tobi' }); //{"user":"tobi"}
res.send([1,2,3]); //[1,2,3]
```

3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"。

```js
res.send(200); // OK
res.send(404); // Not Found
res.send(500); // Internal Server Error
```

send方法在输出响应时会自动进行一些设置，比如HEAD信息、HTTP缓存支持等等。继续学习 

**更新：**

Express 5 不再支持签名 `res.send(status)`，其中 `status` 是一个数字。而是使用 `res.sendStatus(statusCode)` 函数，该函数设置 HTTP 响应标头状态代码并发送代码的文本版本："Not Found"、"Internal Server Error" 等







## 实现登录功能

### 模板引擎

在nodejs中使用express框架，它默认的是ejs和jade渲染模板，今天我们就以ejs模板为例，讲述模板渲染网页模板的基础功能

1. 安装ejs模板

```js
npm i ejs
```

2. 使用ejs模板

```js
//指定渲染模板文件的后缀名为ejs
app.set('view engine', 'ejs');
```

但是默认ejs模板只支持渲染以ejs为扩展名的文件，可能在使用的时候会觉得它的代码书写方式很不爽还是想用html的形式去书写，该怎么办呢，这时就得去修改模板引擎了，也就会用到express的engine函数。

```js
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express );
// 这个__express是ejs模块的一个公共属性，表示要渲染的文件扩展名
```



### 静态资源

如果要在网页中加载静态文件（css、js、img），就需要另外指定一个存放静态文件的目录，当浏览器发出非HTML文件请求时，服务器端就会到这个目录下去寻找相关文件。

1.项目目录下添加一个存放静态文件的目录为public。

2.在public目录下在添加三个存放js、css、img的目录，相应取名为javascripts、stylesheets、images。

3.然后就可以把相关文件放到相应的目录下了。

4.比如，浏览器发出如下的样式表请求：

```html
 <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
```

服务器端就到public/stylesheets/目录中寻找bootstrap.min.css文件。

有了静态目录文件，我们还得在启动文件里告诉它这个静态文件路径，需要指定一下，如下所示：

```js
app.use(express.static(require('path').join(__dirname, 'public')));
```

**PS：express.static —— 指定静态文件的查找目录。**



### 添加网页

将我们需要的页面写好之后（这里我们有index.html、login.html、home.html三个页面），就可以将它们放到服务器上了，项目中我们会新建一个目录用来单独存放模板文件，这里我们就统一放到根路径上了。

1. 和静态文件一样，我们也要设置views存放的目录，如下：

```js
// 设定views变量，意为视图存放的目录app.set('views', __dirname);
app.set('views', __dirname);
```





### 访问我们的网页

我们要如何对网页模板进行访问呢，这就要用到res对象的render函数了。

1.render函数，对网页模板进行渲染。

2.格式：res.render(view, [locals], callback);

3.参数view就是模板的文件名callback用来处理返回的渲染后的字符串，options、callback可省略，在渲染模板时[locals](http://www.hubwiz.com/class/JSON%E6%A0%BC%E5%BC%8F)可为其模板传入变量值，在模板中就可以调用所传变量了，在后面我们会讲述具体使用方法，也可先自行使用看其效果。

4.比如渲染我们刚刚添加的index.html页面，我们就可以在app.js中写入如下内容：

```js
const express = require('express');
const app = express();
const path = require('path');

// 在当前目录获取视图文件
app.set('views', __dirname);

app.set('view engine', 'html')
app.engine('.html', require('ejs').__express);

app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/home', function (req, res) {
  res.render('home');
});


app.listen(8081)

```



### URL重定向

redirect方法允许网址的重定向，跳转到指定的url并且可以指定status，默认为302方式。

```js
格式：res.redirect([status], url);
```

例1：使用一个完整的url跳转到一个完全不同的域名。

```js
res.redirect("http://www.hubwiz.com");
```

例2：跳转指定页面，比如登陆页，如下：

```js
res.redirect("login");
```



### post请求

1.post方法 —— 根据请求路径来处理客户端发出的Post请求。

2.格式：app.post(path,function(req, res));

3.和get方法一样，path为请求的路径，第二个参数为处理请求的回调函数，req和res分别代表请求信息和响应信息。

4.例如处理login的post请求，如下示例

```js
app.post('/login',function(req,res){
 
});
```



#### body

body属性解析客户端的post请求参数，通过它我们可以获取请求路径的参数值

**req.body不是nodejs默认提供的，需要载入中间件body-parser中间件才可以使用req.body**

> ```js
> const bodyParser = require('body-parser');
> app.use(bodyParser.json());
> app.use(bodyParser.urlencoded({ extended: true }));
> ```

```js
格式：req.body.参数名；
```





### 页面访问控制

session用于存储用户状态，但是如果我们实际要渲染信息/变量到页面，我们还是需要使用到`res.locals`

`res.locals`对象保存在一次请求范围内的响应体中的本地变量值。

**PS：注意，中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行。**

理解：**在每次get方法执行前需要先执行到中间件**

用户输入用户名和密码正确，则执行

```js
    req.session.user = user;
    res.send(200);
```

当`send(200)`后，页面跳转

![71170681469](Nodejs.assets/1711706814698.png)

执行`get`方法前，先执行中间件

```js
app.use(function (req, res, next) {
  // 存储用户本地变量
  res.locals.user = req.session.user;
  // 存储异常信息
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});
```

再执行`get`方法，因为刚刚执行中间件已经存储用户变量，因此直接渲染出home页面

```js
app.get('/home', function (req, res) {
  if (req.session.user) {
    res.render('home');
  } else {
    req.session.error = "请先登录"
    res.redirect('login');
  }
});
```

其他逻辑类似这里不在赘述

完整代码如下：

```js
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

app.get('/login', function (req, res) {
  res.render('login');
});
app.post("/login", function (req, res) {
  var user = {
    username: 'admin',
    password: 'admin'
  }
  if (req.body.username == user.username && req.body.password == user.password) {
    req.session.user = user;
    res.send(200);
  } else {
    req.session.error = "用户名或密码不正确";
    res.send(404);
  }
});

app.get('/index', function (req, res) {
  res.render('index');
});
app.get('/home', function (req, res) {
  if (req.session.user) {
    res.render('home');
  } else {
    req.session.error = "请先登录"
    res.redirect('login');
  }
});
app.get('/layout', function (req, res) {
  req.session.user = null;
  req.session.error = null;
  res.redirect('index');
});


app.listen(8081)

```





## 文件分隔

至此我们已经完成了整个demo登录应用，但是在实际开发中，像这样的多个路由处理的逻辑我们需要进行分开处理，便于管理

例子：

1.添加三个js文件，名称分别为login、home、logout。

2.login.js文件，添加如下内容：

```js
module.exports = function ( app ) {
    app.get('/login',function(req,res){
        res.render('login');
    });
 
    app.post('/login',function(req,res){
        var user={
            username:'admin',
            password:'admin'
        }
        if(req.body.username==user.username&&req.body.password==user.password){
            req.session.user = user;
            res.send(200);
        }else{
            req.session.error = "用户名或密码不正确"
            res.send( 404 );
        }
    });
}
```

3.home.js文件，添加如下内容：

```js
module.exports = function ( app ) {
    app.get('/home',function(req,res){
        if(req.session.user){
            res.render('home');
        }else{
            req.session.error = "请先登录"
            res.redirect('login');
        }
    });
}
```

4.logout.js文件，添加如下内容：

```js
module.exports = function ( app ) {
    app.get('/logout', function(req, res){
        req.session.user = null;
        req.session.error = null;
        res.redirect('index');
    });
}
```

然后我们原先在一个文件里与上述路由相关的操作就可以删除啦，只需引入这些文件即可

```js
require('./login')(app);
require('./home')(app);
require('./logout')(app);
```















# nodejs session应用

这里的内容是基于nodejs框架express进行介绍

## cookie与session

### 什么是cookie

在web应用中，多个请求之间*共享“用户会话”*是非常必要的。但HTTP1.0协议是无状态的。那这时Cookie就出现了。那Cookie又是如何处理的呢？

**Cookie的处理**：

- 服务端向客户端*发送Cookie*
- 客户端的浏览器把*Cookie保存*
- 然后在每次请求浏览器都会将Cookie发送到服务端

在HTML文档被发送之前，Web服务器通过传送HTTP 包头中的*Set-Cookie* 消息把一个cookie 发送到用户的浏览器中，如下示例：

```js
Set-Cookie: name=value; Path=/; expires=Wednesday, 09-Nov-99 23:12:40 GMT;
```

其中比较重要的属性：

- **name=value**：键值对，可以设置要保存的 *Key/Value*，注意这里的 name 不能和其他属性项的名字一样
- **Expires**： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
- **maxAge**： 最大失效时间（毫秒），设置在多少后失效
- **secure**： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
- **Path**： 表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个Cookie
- **httpOnly**： 是微软对COOKIE做的扩展。如果在COOKIE中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到COOKIE信息，防止XSS攻击产生

### nodejs中的cookie

在nodejs中，服务端如何向客户端发送cookie呢，有如下两个方案：

- 使用**response.writeHead**，代码如下：

```js
//设置过期时间为一分钟
var today = new Date();
var time = today.getTime() + 60*1000;
var time2 = new Date(time);
var timeObj = time2.toGMTString();
response.writeHead({
   'Set-Cookie':'myCookie="type=ninja", "language=javascript";path="/";Expires='+timeObj+';httpOnly=true'
});
```

缺点：使用response.writeHead只能发送一次头部，即只能调用一次，且不能与response.render共存，否则会报错。



- 使用**response.cookie**，代码如下：

```js
语法: response.cookie('cookieName', 'name=value[name=value...]',[options]);

response.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
```

> `response.cookie`用于发送cookie给客户端，但是在服务端要访问客户端发送的cookie的话使用`request.cookies`





### express中的cookie

express 在 4.x 版本之后，管理session和cookies等许多模块都不再直接包含在express中， `而是需要单独下载安装相应模块。

```js
cookieParser安装：$ npm install cookie-parser
```

例子：

```js
//Welcome learning
var express      = require('express');
var cookieParser = require('cookie-parser');
 
var app = express();
app.use(cookieParser());
 
app.get('/', function (req, res) {
    // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
    // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.send("再次欢迎访问");
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.send("欢迎第一次访问");
    }
});
app.listen(80);
```



### 什么是session

*session*是另一种记录客户状态的机制，不同的是**Cookie保存在客户端浏览器中**，而**session*保存在服务器*上**。

客户端浏览器访问服务器的时候，服务器把*客户端信息以某种形式记录在服务器*上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。

如果说Cookie机制是通过检查客户身上的*“通行证”*来确定客户身份的话，那么session机制就是通过检查服务器上的*“客户明细表”*来确认客户身份。

session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

**两者的区别：**

- cookie数据存放在客户的**浏览器**上，session数据放在**服务器**上。
- cookie不是很**安全**，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session。
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的**性能** 考虑到减轻服务器性能方面，应当使用COOKIE。
- 单个cookie保存的数据不能超过**4K**，很多浏览器都限制一个站点最多保存20个cookie。
- 所以**建议**：`将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中`

### session的简单应用

跟cookie一样都需要单独的安装和引用模块， 安装模块：`$sudo npm install express-session` 主要的方法就是 session(options)，其中 options 中包含可选参数，主要有：

- **name**: 保存 session 的字段名称，默认为 connect.sid 。
- **store**: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
- **secret**: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
- **cookie**: 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: '/', httpOnly: true, secure: false, maxAge: null })
- **genid**: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
- **rolling**: 每个请求都重新设置一个 cookie，默认为 false。
- **resave**: 即使 session 没有被修改，也保存 session 值，默认为 true。

```js
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
	secret: 'secret',
    resave: true,
  	saveUninitialized:false,
	cookie: {maxAge:60*1000*30},
}))

app.get('/',function(req,res) {
  	console.log(req.session)
	if(req.session.sign) {
    	console.log(req.session)
		res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
    } else {
		req.session.sign = true
        req.session.name = 'zwf'
        res.send('欢迎首次登录')
    }
})

app.listen(80)
// 中间件是 express-session，它的作用是为 Express 应用添加会话（session）支持。当一个请求到来时，express-session 中间件会首先处理这个请求，它会查看请求中是否包含 session ID，如果包含，就从 session store 中获取对应的 session，如果不包含，就创建一个新的 session。然后，它会将这个 session 添加到 req 对象上，这样后续的中间件和路由处理器就可以通过 req.session 访问到这个 session。
```

> 理解：
>
> 为什么session也使用到了cookie呢？？？
>
> 实际上，session 是通过 cookie 来实现的。当用户第一次访问服务器时，服务器会创建一个 session，并将 session 的唯一标识符存储在 cookie 中，然后将 cookie 发送给客户端。当客户端再次访问服务器时，它会将 cookie 一起发送过来，服务器通过 cookie 中的 session 标识符找到对应的 session，从而实现跨请求的状态保持。





## 数据库存储session

前面我们的session的简单应用中，session只是存储在内存中的，那么只要进程退出了，session数据就会丢失，因此我们需要`将session数据持久化存储`

### 存储到mongoDB数据库

在使用mongodb存储时首先要加载一个模块：`*connect-mongo*`

安装命令：`npm install connect-mongo`

```js
// 代码根据包版本的不同可能有所不同
const session = require('express-session')
const MongoStore = require('connect-mongo/es5')(session)
const mongoose = require('mongoose')
const express = require('express')
const app = express()

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/hubwiz')

mongoose.connection.on('open', function () {
  console.log('数据库连接成功~');
})

app.use(session({
  secret: "what do you want to do?", //secret的值建议使用128个随机字符串
  cookie: { maxAge: 60 * 1000 * 60 * 24 * 14 }, //过期时间14天
  resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection //使用已有的数据库连接
  })
}));

app.listen(80);
```





### 存储到Redis数据库

Redis是一个非常适合用于Session管理的数据库。第一，它的结构简单，key-value的形式非常符合SessionID-UserID的存储；第二，读写速度非常快；第三，自身支持数据自动过期和清除；第四，语法、部署非常简单。基于以上原因，很多Session管理都是基于Redis实现的。

Express已经将Session管理的整个实现过程简化到仅仅几行代码的配置的地步了，你完全不用理解整个session产生、存储、返回、过期、再颁发的结构，使用Express和Redis实现Session管理，只要两个中间件就足够了：

- `express-session`
- `connect-redis`

**参数**

- **client** 你可以复用现有的redis客户端对象， 由 redis.createClient() 创建
- **host** Redis服务器名
- **port** Redis服务器端口
- **socket** Redis服务器的unix_socket

**可选参数**

- **ttl** Redis session TTL 过期时间 （秒）
- **disableTTL** 禁用设置的 TTL
- **db** 使用第几个数据库
- **pass** Redis数据库的密码
- **prefix** 数据表前辍即schema, 默认为 "sess:"

```js
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
 
var app = express();
var options = {
    "host": "127.0.0.1",
    "port": "6379",
    "ttl": 60 * 60 * 24 * 30,   //session的有效期为30天(秒)
};
 
// req在经过session中间件的时候就会自动完成session的有效性验证、延期/重新颁发、以及对session中数据的获取了。
app.use(session({
    store: new RedisStore(options),
    secret: 'express is powerful'
}));
 
app.listen(80);
```





# Mongoose

Mongoose是基于node-mongodb-native开发的MongoDB nodejs驱动，可以在异步的环境下执行。同时它也是一个为nodejs而生的一个**对象模型库**,并且封装了MongoDB的一些常用操作方法，来用于对文档的处理。

## Mongoose基础介绍

### 认识Mongoose

介绍Mongoose之前，我们先简单了解一下**MongoDB**

MongoDB是一个开源的**NoSQL**数据库(NoSQL即非关系型数据库)，相比MySQL那样的关系型数据库，它更显得轻巧、灵活，非常适合在数据规模很大、事务性不强的场合下使用。同时它也是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储(文档，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)，数据格式就是JSON。

而**Mongoose**是什么？

Mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动，可以在异步的环境下执行。同时它也是针对MongoDB操作的一个**对象模型库**，**封装了MongoDB对文档的的一些增删改查等常用方法**，**让NodeJS操作Mongodb数据库变得更加灵活简单。**



### 使用Mongoose

安装mongoose：

```js
npm install mongoose
```

引用mongoose：

```js
var mongoose = require("mongoose");
```

使用"mongoose"连接数据库：

```js
var db = mongoose.connect("mongodb://user:pass@localhost:port/database");
```

执行下面代码检查默认数据库test，是否可以正常连接成功?

```js
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
    console.log(db)
});
```

我们打印db变量可以看到一些json数据

```json
{ connections: 
   [ { base: [Circular],
       collections: {},
       models: {},
       config: [Object],
       replica: false,
       hosts: null,
       host: '127.0.0.1',
       port: 27017,
       user: undefined,
       pass: undefined,
       name: 'test',
       options: [Object],
       otherDbs: [],
       _readyState: 1,
       _closeCalled: false,
       _hasOpened: true,
       _listening: true,
       _events: [Object],
       db: [Object] } ],
  plugins: [],
  models: {},
  modelSchemas: {},
  options: { pluralization: true 
  } 
}
```



### 了解集合

MongoDB —— 是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以**Document**(以下简称文档)的形式存储(Document，就是一个**关联数组式的对象**，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)

**在MongoDB中，多个Document可以组成Collection(以下简称集合)，多个集合又可以组成数据库。**

- **文档** —— 是MongoDB的核心概念，是键值对的一个有序集，在JavaScript里文档被表示成对象。同时它也是MongoDB中数据的基本单元，非常类似于关系型数据库管理系统中的**行**，但更具表现力。
- **集合** —— 由一组文档组成，如果将MongoDB中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张**表**。

### 三个概念

要想使用Mongoose操作数据库，先需要了解Schema(数据属性模型)、Model、Entity

#### Schema

- Schema —— 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。

理解：就是使用`Schema`定义表结构

　　那如何去定义一个Schema呢，请看示例：

```js
var mongoose = require("mongoose");
var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    email: { type:String,default:''}
});
```

基本属性类型有：字符串、日期型、数值型、布尔型(Boolean)、null、数组、内嵌文档等



#### Model

- Model —— 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类。

　　如何通过Schema来创建Model呢，如下示例：

```js
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
// 创建Model
var TestModel = db.model("test1", TestSchema);
```

test1：数据库中的集合名称,当我们对其添加数据时如果test1已经存在，则会保存到其目录下，如果未存在，则会创建test1集合，然后再保存数据。



#### Entity

- Entity —— 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。

　　使用Model创建Entity，如下示例：

```js
// 这里的TestModel是我们创建的model名
var TestEntity = new TestModel({
       name : "Lenka",
       age  : 36,
       email: "lenka@qq.com"
});
console.log(TestEntity.name); // Lenka
console.log(TestEntity.age); // 36
```

　　创建成功之后，Schema属性就变成了Model和Entity的公共属性了。



### 创建集合

```js
var mongoose = require("mongoose");
// 连接到数据库
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
// 官网写法
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// 创建表结构
var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});
// 创建表
var TestModel = db.model("test1", TestSchema );
// 也可以这么写
var TestModel = mongoose.model("test1", TestSchema );


// 数据定义:这么做之后并没有将数据存储到DB中
var TestEntity = new TestModel({
    name : "zwf",
    age  : 21,
    email: "zwf@qq.com"
});
// 添加数据：异步的保存方法
product = await TestEntity.save();
```





## Mongoose增删改查

### 查询

查询分很多种类型，如条件查询，过滤查询等等，今天我们只学习最基本的find查询，在后面的学习中，我们会专门针对查询做详细的介绍，好，我们就先来学习使用find查询。

```js
obj.find(查询条件,callback);

Model.find({},function(error,docs){
   //若没有向find传递参数，默认的是显示所有文档
});
 
Model.find({ "age": 28 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为28的所有文档
  }
}); 
```

> 更新：
>
> 我们先定义一个 `query` 对象： `const query = MyModel.findOne({})`，接下来我们一般会这么使用：
>
> ```js
> query.then(doc => {...})
> // or
> const doc = await query.exec()
> ```
> 注意区别：
>
> - 这里的query变量本身并不是一个Promiose对象，它只是实现了`.then`和`.catch`方法便于异步操作
>
> - `.exec()` 返回了一个真正的 Promise 对象。
>
> 但 query 提供了 `.then` 方法，我们一样可以使用 async/await ：
>
> ```js
> const doc = await query
> // or
> const doc = await query.exec()
> ```
>
> 以上两种写法已近乎一致，而事实上它们在功能执行上也 **完全一致** 。
>
> 那我们还是否需要使用`.exec()`？？？？
>
> **官方建议使用** `.exec()` ，因为它在使用 async/await 时提供了更好的堆栈跟踪。





### Model保存方法

　　Model提供了一个create方法来**向表中添加一条数据**。下面我们来看一下示例：

```js
Model.create(文档数据, callback))

await Model.create({ name:"model_create", age:26});
```





### entity保存方法

即使用entity也可以为表添加一条数据

```js
Entity.save(文档数据, callback))

var Entity = new Model({name:"entity_save",age: 27});
 
await Entity.save();
```





### 数据更新

```js
await obj.updateOne(查询条件,更新对象);// 只会更新一个文档
await obj.updateMany(查询条件,更新对象);// 可以更新多个文档


var conditions = {name : 'test_update'};
 
var update = {$set : { age : 16 }};
 
await TestModel.updateOne(conditions, update);
```



### 删除数据

```js
await obj.deleteOne(查询条件);
await obj.deleteMany(查询条件);


var conditions = { name: 'tom' };
 
await obj.deleteOne(conditions);

```





## Mongoose简单查询

除了前面我们学习的`find`查询之外，Mongoose模型还提供了`findOne`、`findById`方法进行文档查询

### find过滤查询

本质上就是控制你要显示哪些字段

```js
await find(Conditions,field);
//field省略或为Null，则返回所有属性

// 如果在MySQL中则这样写select name,age from Model

//返回只包含一个键值name、age的所有记录
await Model.find({},{name:1, age:1, _id:0})
//说明：我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的
```



### findOne

与find相同，但只返回单个文档，也就说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果

```js
await findOne(Conditions,callback);

await Adventure.findOne({ country: 'Croatia' }).exec();

```



### findById

与findOne相同，但它只接收文档的_id作为参数，返回单个文档

```js
await findById(_id, callback);

TestModel.findById('obj._id', function (err, doc){
 //doc 查询结果文档
});    

await Adventure.findById(id).exec();

```



## Mongoose高级查询

　"$lt"(小于)，"$lte"(小于等于),"$gt"(大于)，"$gte"(大于等于)，"$ne"(不等于)，"$in"(可单值和多个值的匹配)，"$or"(查询多个键值的任意给定值)，"$exists"(表示是否存在的意思)"$all"



### 大于小于

可以使用$gt(>)、$lt(<)、$lte(<=)、$gte(>=)操作符进行排除性的查询，如下示例：

```js
Model.find({"age":{"$gt":18}},function(error,docs){
   //查询所有nage大于18的数据
});
 
Model.find({"age":{"$lt":60}},function(error,docs){
   //查询所有nage小于60的数据
});
 
Model.find({"age":{"$gt":18,"$lt":60}},function(error,docs){
   //查询所有nage大于18小于60的数据
});
```



### 不等于

$ne(!=)操作符的含义相当于不等于、不包含，查询时我们可通过它进行条件判定，具体使用方法如下：

```js
Model.find({ age:{ $ne:24}},function(error,docs){
    //查询age不等于24的所有数据
});
 
Model.find({name:{$ne:"tom"},age:{$gte:18}},function(error,docs){
  //查询name不等于tom、age>=18的所有数据
});
```

$ne可以匹配单个值，也可以匹配不同类型的值。



### 等于/包含

和$ne操作符相反，$in相当于包含、等于，查询时查找包含于指定字段条件的数据。具体使用方法如下：

```js
Model.find({ age:{ $in: 20}},function(error,docs){
   //查询age等于20的所有数据
});
 
Model.find({ age:{$in:[20,30]}},function(error,docs){
  //可以把多个值组织成一个数组
}); 
```



### 或

$or操作符，可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用，如下示例：

```js
Model.find({"$or":[{"name":"yaya"},{"age":28}]},function(error,docs){
  //查询name为yaya或age为28的全部文档
});
```





### 存在

$exists操作符，可用于判断某些关键字段是否存在来进行条件查询。如下示例：

```js
Model.find({name: {$exists: true}},function(error,docs){
  //查询所有存在name属性的文档
});
Model.find({telephone: {$exists: false}},function(error,docs){
  //查询所有不存在telephone属性的文档
});
```





## Mongoose游标

数据库使用游标返回find的执行结果。客户端对游标的实现通常能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他一些强的操作

最常用的查询选项就是限制返回结果的数量(limit函数)、忽略一点数量的结果(skip函数)以及排序(sort函数)。所有这些选项一点要在查询被发送到服务器之前指定。



### 限制返回数量

在查询操作中，有时数据量会很大，这时我们就需要对返回结果的数量进行限制，那么我们就可以使用limit函数，通过它来限制结果数量。

```js
限制数量：find(Conditions,fields,options,callback);

Model.find({},null,{limit:20},function(err,docs){
    console.log(docs);
});

如果匹配的结果不到20个，则返回匹配数量的结果，也就是说limit函数指定的是上限而非下限。
```



### skip跳过结果数量

　skip函数和limit类似，都是对返回结果数量进行操作，不同的是skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果。如下示例：

```js
跳过数量：find(Conditions,fields,options,callback);

Model.find({},null,{skip:4},function(err,docs){
    console.log(docs);
});
//如果查询结果数量中少于4个的话，则不会返回任何结果。
```



### sort排序

sort函数可以将查询结果数据进行排序操作，该函数的参数是一个或多个键/值对，键代表要排序的键名，值代表排序的方向，1是升序，-1是降序。

```js
结果排序：find(Conditions,fields,options,callback);

Model.find({},null,{sort:{age:-1}},function(err,docs){
  //查询所有数据，并按照age降序顺序返回数据docs
});
```





## Mongoose属性方法

### ObjectId类型

存储在mongodb集合中的每个文档（document）都有一个默认的主键_id，这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId。该类型的值由系统自己生成，从某种意义上几乎不会重复，生成过程比较复杂，有兴趣的朋友可以查看源码。

使用过MySQL等关系型数据库的友友们都知道，主键都是设置成自增的。但在分布式环境下，这种方法就不可行了，会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，一次代表：

- 4字节：UNIX时间戳
- 3字节：表示运行MongoDB的机器
- 2字节：表示生成此_id的进程
- 3字节：由一个随机数开始的计数器生成的值

```js
var mongoose = require('mongoose');var tSchema = new mongoose.Schema({}); //默认_id:ObjectId类型
```

　　每一个文档都有一个特殊的键“_id”，这个键在文档所属的集合中是唯一的。



### 添加属性

　　前面我们已经讲述了如何定义一个Schema并赋予某些属性值,那能不能先定义后添加属性呢，答案是可以的，如下所示：

```js
var mongoose = require('mongoose');
var TempSchema = new mongoose.Schema;
TempSchema.add({ name: 'String', email: 'String', age: 'Number' });
```



### 实例方法

　　有的时候，我们创造的Schema不仅要为后面的Model和Entity提供公共的属性，还要提供公共的方法.那怎么在Schema下创建一个实例方法呢，请看示例：

```js
var mongoose = require('mongoose');
var saySchema = new mongoose.Schema({name : String});
saySchema.method('say', function () {
  console.log('Trouble Is A Friend');
})
var say = mongoose.model('say', saySchema);
var lenka = new say();
lenka.say(); //Trouble Is A Friend
```



### 静态方法

怎么为Schema创建静态方法。如下示例：

```js
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String, default:"" },
    time : { type:Date, default:Date.now }
});
 
TestSchema.static('findByName', function (name, callback) {
    return this.find({ name: name }, callback);
});
 
var TestModel = db.model("test1", TestSchema );
TestModel.findByName('tom', function (err, docs) {
 //docs所有名字叫tom的文档结果集
});
```





### 追加方法

关于Schema的如何定义前面我们已经讲述过了，有时场景的需要，我们甚至可以为Schema模型追加方法。

　　为Schema模型追加speak方法，如下示例：

```js
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String, default:"" },
    time : { type:Date, default:Date.now }
});
 
TestSchema.methods.speak = function(){
  console.log('我的名字叫'+this.name);
}
 
var TestModel = db.model('test1',TestSchema);
var TestEntity = new TestModel({name:'Lenka'});
TestEntity.speak();//我的名字叫Lenka
```





# 项目

https://github.com/zwf021123/shopping-demo.git

## 需求与设计

### 功能与介绍

1. 用户可以完成注册、登录然后登录后对商品的浏览。
2. 登录之后，用户可以对相关商品进行选购并添加到购物车。
3. 用户可以对购物车里面的商品进行增加、减少、删除操作。
4. 用户可对购物车商品进行结算操作。





### 技术选型

本项目涉及使用到NodeJS、Express框架、MongoDB数据库、Mongoose对象模型库，详细介绍如下：

NodeJS：Node.js采用Google Chrome浏览器的V8引擎，一个后端的Javascript运行环境，提供很多系统级的API，如文件操作、网络编程等。

MongoDB：MongoDB是一个基于分布式文件存储的一个高性能，开源，无模式的文档型数据库，数据以BSON文档的格式存储在磁盘上。

Express：一个简洁、灵活的基于Node.js的Web应用开发框架, 支持Ejs、jade等多种模板，并且提供一系列强大的功能，比如：模板解析、静态文件服务、中间件、路由控制等等。

Mongoose：一个针对MongoDB操作的对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法。



### 结构划分

项目主要分为以下几大模块：注册模块，登录模块，商品模块、购物车模块、结算模块。

1. 用户注册模块：填写用户名、密码、确认密码后，实现成功注册，然后进行登录。
2. 用户登录模块：填写已注册的用户名称，填写正确的密码，进入商品展示页面。
3. 商品模块：用户选择相关产品加入购物车。
4. 购物车模块：对相关商品进行增加、减少、删除操作。
5. 结算模块：对购物车内已选择商品进行结算。

模块结构如下图所示：

![img](Nodejs.assets/module.jpg)



### 流程设计

此流程图显示用户可以进行登录和注册操作，如果用户已经注册，则可以直接登录，若未注册则必须先注册成功后才能进行登录，登录成功后可以进入商品页浏览商品，也可以选择相关商品并可加入购物车，在购物车页面内可以对购物车商品进行相关操作，最后结选择相关商品进行结算。

其流程如下图所示：

![img](Nodejs.assets/process.jpg)



## 数据库设计

MongoDB是一个开源的NoSQL数据库，相比MySQL那样的关系型数据库，它更显得轻巧、灵活， 非常适合在数据规模很大、事务性不强的场合下使用。同时它也是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储，数据格式就是**JSON**。

MongoDB —— 是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以Document(以下简称文档)的形式存储(Document，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)

我们一共要创建三个集合，分别是**user(用户)集合、commodity(商品)集合、cart(购物车)集合**，后面我们会一一介绍。

关于user集合，我们设计的属性有name(用户名)、password(密码)， 如下所示：

![img](Nodejs.assets/c_user.jpg)

关于commodity集合，我们设计的属性有name(商品名称)、price(商品价格)、imgSrc(商品展示图片路径)， 如下所示：

![img](Nodejs.assets/c_commodity.jpg)

关于cart集合，我们设计的属性有uId(用户ID)、cId(商品ID)、cName(商品名称)、cPrice(商品价格)、cImgSrc(商品展示图片路径)、cQuantity(商品数量)、cStatus(商品结算状态，未结算为false,已结算为true)， 如下所示：

![img](http://www.hubwiz.com/course/549a704f88dba0136c371703/img/c_cart.jpg)





## 详细设计

### 用户注册模块的设计与实现

功能：本模块主要用于新用户注册，用户通过表单提供用户名和密码信息，系统根据用户提供的注册信息对用户进行具体操作。

输入操作：用户名、密码、确认密码。

对应处理：

1. 输入注册信息：在页面提供的表单处输入用户的用户名和密码信息，点击“注册”按钮提交表单数据信息。已注册用户，可点击“登录”按钮，进入登录页面。
2.  用户注册身份验证：连接数据库，以输入的“用户名”数据为查询条件来查看输入用户名是否已存在，如果用户名未注册，则提示注册成功并转到登录页进行登录，如果用户已注册，则给出用户已存在提示并重新注册。

用户注册界面草图如下：

![img](Nodejs.assets/Register.jpg)





### 用户登录模块的设计与实现

功能：本模块主要用于对用户身份进行鉴别。用户通过表单提供用户名和密码信息，系统根据用户提供的登录信息对用户进行查询鉴别。 如果身份合法，则用户可进入商品页面。

输入操作：用户名、密码。

对应处理：

1. 输入用户的登录信息：在页面提供的表单处输入用户的用户名和密码信息，点击“登录”按钮提交表单数据信息。 也可点击“注册”按钮，注册新用户。
2. 用户身份进行验证：连接数据库，打开user集合，检验用户登录信息。以输入的“用户名”数据为查询条件来查看用户是否存在，如果存在，继续检验其输入密码是否正确，密码和用户名都正确，则进入商品展示页面；如果用户名不存在或密码不正确，则给出相应的提示。

用户登录界面草图如下：

![img](Nodejs.assets/Login.jpg)





### 商品页面介绍

商品页呢，我们主要要来展示商品，用户登录成功之后将会跳入商品页，可对所有商品进行查看， 每个商品信息的内容包括：商品名称、商品图片、商品价格，用户可浏览也可将其加入购物车。

页面草图如下所示：

![img](Nodejs.assets/Commodity.jpg)





### 购物车界面介绍

关于购物车页面，主要展示用户已购买的商品，包括商品的信息、价格、数量，当然用户可以对其中商品进行增加、减少、删除操作，最后，用户可选择对其中商品进行结算，选择结算后，会提示相应的付款金额。

页面草图如下所示：

![img](Nodejs.assets/Cart.jpg)







## 实现注册

注意：以下操作建立在mongo数据库shopping建立成功的情况下

先准备好登录页的静态结构

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }

    .content {
      display: flex;
      flex-direction: column;
      text-align: center;
    }


    form {
      display: flex;
      flex-direction: column;
      width: 300px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
    }

    input[type="text"],
    input[type="password"] {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    input[type="submit"],
    input[type="button"] {
      margin-top: 10px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #007BFF;
      color: #fff;
      cursor: pointer;
    }

    input[type="submit"]:hover,
    input[type="button"]:hover {
      background-color: #0056b3;
    }
  </style>
  <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
</head>

<body>
  <div class="content">
    <h1>用户注册</h1>
    <%- message %>
      <form action="#" role="form" method="post">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username"><br>
        <label for="password">密码:</label>
        <input type="password" id="password" name="password"><br>
        <label for="confirm-password">确认密码:</label>
        <input type="password" id="confirm-password" name="confirm-password"><br>
        <input type="button" value="注册" onclick="register()">
        <input type="button" value="登录">
      </form>
  </div>

  <script>
    function register(event) {
      var username = $('#username').val();
      var password = $('#password').val();
      var data = { "username": username, "password": password };

      $.ajax({
        url: '/register',
        type: 'POST',
        data: data,
        success: function (data, status) {
          if (status == 'success') {
            location.href = 'register';
          }
        },
        error: function (res, err) {
          location.href = 'register';
        }
      });
    }
  </script>
</body>

</html>
```

定义好数据库user表结构

```js
module.exports = {
  user: {
    name: { type: String, required: true },
    password: { type: String, required: true }
  }
};
```

将所有表结构转为model同时暴露一个函数给外面用户获取对应model

```js
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  models = require('./models');

for (let m in models) {
  mongoose.model(m, new Schema(models[m]));
}

const _getModel = function (type) {
  return mongoose.model(type);
}

module.exports = {
  getModel: function (type) {
    return _getModel(type);
  }
};
```

```js
// 实现注册逻辑操作

const dbHelper = require('../common/dbHelper.js');

module.exports = function (app) {
  app.get('/register', function (req, res) {
    res.render('register.html');
  });

  app.post('/register', async function (req, res) {
    const User = dbHelper.getModel('user');
    const uname = req.body.username;
    const user = await User.findOne({ name: uname })
    if (user) {
      req.session.error = '用户名已存在！';
      res.send(500);
    } else {
      User.create({
        name: uname,
        password: req.body.password
      }).then(user => {
        req.session.error = '用户名创建成功！';
        res.send(200);
      }).catch(err => {
        res.send(500);
      });
    }

  });
}
```

加入session中间件

```js
app.use(function (req, res, next) {
  res.locals.user = req.session.user; //保存用户信息
  var err = req.session.error;  //保存结果响应信息
  res.locals.message = '';  // 保存html标签
  if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

```





















