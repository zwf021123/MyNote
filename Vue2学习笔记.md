# 初识Vue2

## Vue快速上手

### Vue是什么

- 概念：Vue是一个用于 **构建用户界面** 的 **渐进式框架**
  - 构建用户界面：即**基于数据动态渲染页面**
  - 渐进式：循序渐进地学习
  - 框架：一套完整的项目解决方案，提升开发效率(理解记忆规则->官网)
- Vue的两种使用方式：
  - Vue核心包开发：用于局部模块的改造
  - Vue核心包&Vue插件 工程化开发：适用于整站开发

![69503726889](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695037268893.png)



### 创建实例

核心步骤：

1. 准备容器
2. 引包(官网)：**开发版本**/生产版本
3. 构建Vue实例new Vue()
4. 指定配置项->渲染数据
   - **el指定挂载点(元素)**
   - **data提供数据**

```javascript
<body>
  <div class="box">
    <h1>{{msg}}</h1>
  </div>
  <div id="app">
    <h1>{{msg}}</h1>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    //引入核心包后，在全局环境中就有了Vue构造函数
    const app = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue!'
      }
    })
  </script>
</body>
```



### 插值表达式{{}}

- 插值表达式是一种Vue的模板语法
- 作用：利用表达式进行插值，渲染到页面中
  - 表达式：可以被求值的代码，JS引擎会得到结果
- 语法：``{{表达式}}``![69503864406](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695038644066.png)
- 注意：
  - 使用的数据必须存在(即在配置项data中已经声明)
  - 支持的是表达式而非语句![69503870597](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695038705975.png)
  - 不能在标签属性中使用{{}}插值![69503872827](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695038728279.png)
  - **Vue 模板语法是不会被解析的(即HTML语法不会被解析)**




### Vue核心特性:响应式

我们前面所学以及掌握了基本的模板渲染，实际上Vue背后还做了大量工作

比如：数据的响应式处理->**响应式**：**数据变化，视图自动更新**

- **在Vue构造函数传入的配置参数中的data中的数据最终会被添加到实例上**
- 如何访问data中的数据：
  - 访问数据：``实例名.属性名``
  - 修改数据：``实例名.属性名='值'``

实际上底层的Vue自动为我们使用了Dom操作

![69509234043](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695092340438.png)

### Vue开发者工具

在浏览器的插件中有很多好用的工具，比如Vue Devtools可以帮助我们在Vue页面中进行调试



## Vue指令

### 初始指令

- Vue会根据不同的指令，针对标签实现不同的功能
- 指令：带有**v-前缀**的特殊**标签属性**
- 更多指令参考[内置指令 | Vue.js (vuejs.org)](https://cn.vuejs.org/api/built-in-directives.html#v-text)



### v-html

- 作用：相当于设置元素的**innerHTML**
- 语法：``v-html="表达式"``



### v-show

- 作用：控制元素的显示隐藏
- 语法：``v-show="表达式" 表达式值true显示，false隐藏``
- 原理：**切换display：none**控制显示隐藏
- 场景：**频繁**切换显示隐藏的场景
- 注意与v-if进行区分



### v-if

- 作用：控制元素的显示隐藏(**条件渲染**)
- 语法：``v-if="表达式" 表达式值true显示，false隐藏``
- 原理：基于**条件判断**，是否**创建**或**移除**元素节点
- 场景：要么显示，要么隐藏，**不频繁**切换的场景



### v-else 

- 作用：辅助v-if进行判断渲染
- 语法：**直接在属性上编写v-else即可，无需参数**
- **注意：需要紧挨着v-if一起使用**



### v-else-if

- 作用：辅助v-if进行判断渲染
- 语法：``v-else-if="表达式"``
- **注意：需要紧挨着v-if一起使用**






### v-on

- 作用：注册事件 = 添加监听 + 提供处理逻辑
- 语法：
  1. ``v-on:事件名 = "内联语句"``
  2. ``v-on:事件名 = "methods中的函数名"``
- **简写**：``@事件名 = "逻辑"``

![69510639127](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695106391279.png)

![69510641210](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695106412104.png)

```javascript
<body>
  <div id="app">
    <!-- flag为true显示,反之隐藏 -->
    <button @click="show">切换显示隐藏</button>
    <h1 v-show="flag">Hello Vue</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        flag: true
      },
      methods: {
        show() {
          this.flag = !this.flag
        }
      }
    })
  </script>
</body>
```

- 注意：methods对象内的函数**this指向Vue实例**(即methods对象内的函数如果想要访问data数据那么需要通过Vue实例，而函数内this正指向该实例)



#### v-on参数传递

```javascript
<body>
  <div id="app">
    <div class="box">
      <h1>自动售货机</h1>
      <button @click="buy(3)">可乐3元</button>
      <button @click="buy(10)">咖啡10元</button>
    </div>
    <p>您的余额：{{money}}元</p>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        money: 100
      },
      methods: {
        buy(m) {
          this.money -= m
        }
      }
    })
  </script>
</body>
```



### v-bind

- 作用：动态设置html的**标签属性**，例如src，title，url等
- 语法：``v-bind:属性名="表达式"``
- **注意**：简写形式``:属性名="表达式"``

```javascript
<body>
  <div id="app">
    <img v-bind:src="imgUrl" v-bind:title="imgTitle">
    <img :src="imgUrl" :title="imgTitle">
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        imgUrl: './imgs/10-01.png',
        imgTitle: '我是波仔'
      }
    })
  </script>
</body>
```

#### v-bind操作class类名

- 使用v-bind也可以操作样式，相当于之前原生js的DOM.classList.add操作
- **语法**：``:class="对象/数组"``
  - **对象**->键就是类名，值是布尔值，如果值为true则有这个类，反之没有(适用于一个类名来回切换的场景)![69529655757](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695296557570.png)
  - **数组**->数组中包含的所有类，都会被添加到盒子上，本质就是一个class列表(适用于批量增删类的场景)![69529662721](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695296627213.png)

> 注意：==数组内的类名需要加上引号==



#### v-bind 操作style

- 语法：``:style="样式对象"![69529741793](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695297417930.png)
- 适用于对某个具体样式的动态设置

> 注意：==对象中的CSS属性值需要加上引号==

 



### v-for

- 作用：基于**数据**循环，**多次**渲染整个元素 -> ==数组==、对象、数字...
- 语法：``v-for="(item, index) in 数组"``
  - 其中item表示数组元素，index表示下标
  - 省略index：``v-for="item in  数组"``
  - 在标签内使用**插值表达式**即可渲染数据



#### v-for中的key

```javascript
<body>
  <div id="app">
    <h1>小黑的书架</h1>
    <ul>
      <li v-for="(item,index) in bookList">{{item.name}} {{item.author}} <button @click="del(item.id)">删除</button>
      </li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        bookList: [
          { id: 1, name: '《红楼梦》', author: '曹雪芹' },
          { id: 2, name: '《三国演义》', author: '罗贯中' },
          { id: 3, name: '《西游记》', author: '吴承恩' },
          { id: 4, name: '《水浒传》', author: '施耐庵' },
        ]
      },
      methods: {
        del(id) {
          console.log(id);
          // console.log(this.bookList);
          // this.bookList.splice(id - 1, 1)
          this.bookList = this.bookList.filter(item => item.id != id)
        }
      }
    })
  </script>
</body>
```

- 在Vue官网中有这么一句话：`v-for` 的默认方式是尝试就地更新元素而不移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示
- 即在上面这个例子中，如果没有加上key属性，那么在删除数组元素后，vue发现数据修改了，进行响应，而留下3个li，但是Vue不知道要留下哪3个li，因此它会自动留下前3个li，然后将数组数据进行渲染，但这实际上是不合理的，如果我们在li上存在样式，那么这样的行为可能导致样式不能被删除
- 因此我们需要**在v-for的使用同时给该元素添加唯一标识key属性，便于Vue进行列表项的正确排序复用**

> 注意：
>
> 1. key的值只能是 **字符串** 或 **数字类型**
> 2. key的值必须具有 **唯一性**
> 3. 推荐使用 id作为key，不推荐使用index作为key(因为删除元素后元素在数组中的下标会改变)
> 4. ``<li v-for="(item,index) in xxx" :key="唯一值"></li>``



### v-model

- 作用：给表单元素使用，**双向数据绑定** -> 可以快速**获取和设置**表单元素内容
  - 数据变化 ->视图自动更新
  - ==视图变化 ->数据自动更新==
- 语法：``v-model='变量'``




#### v-model应用于其他表单元素

常见的表单元素都可以使用v-model绑定关联->快速 **获取** 和 **设置**表单元素的值

它会根据 **控件类型** 自动选择 正确的方法更新元素(==都是双向绑定==)

- 输入框 input:text 对应value
- 文本域 textarea 对应value
- 复选框 input:checkbox 对应checked
- 单选框 input:radio 对应checked
- 下拉菜单select 对应 value

> 单选框：
>
> ​      前置理解：
>
> ​        1. name:  给单选框加上 name 属性 可以分组 → 同一组互相会互斥
>
> ​	2. value: 给单选框加上 value 属性，用于提交给后台的数据
>
> 下拉框：
>
> ​      前置理解：
>
> ​        1. option 需要设置 value 值，提交给后台
>
> ​        2. select 的 value 值，关联了选中的 option 的 value 值

### 指令修饰符

通过"."指明一些指令 **后缀**，不同后缀Vue都帮我们封装了不同的处理操作，可以帮助我们简化代码

- 按键修饰符
  - **@keyup.enter ** 键盘回车监听
- v-model修饰符
  - **v-model.trim** 自动去除首尾空格
  - **v.model.number** 自动将内容转为数字类型
- 事件修饰符
  - **@事件名.stop** 阻止冒泡
  - **@事件名.prevent** 阻止默认行为



# 再识Vue2

## 计算属性

### 什么是计算属性

- 概念：**基于现有数据，计算出来的新属性**。**依赖的数据变化**，**自动重新计算渲染**
- 语法：
  - 声明在**computed配置项**中，一个计算属性对应一个函数
  - 使用起来与**普通属性**一样使用即可``{{计算属性名}}``
- 计算属性可以将一段求值的代码封装起来

![69535206179](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695352061792.png)



### computed计算属性VS methods方法

- **computed**计算属性：
  - 作用：封装了一段对于数据的处理，求得一个结果
  - 语法：
    - 写在computed配置项中
    - **作为属性，直接使用**->``this.计算属性 {{计算属性}}``
- **methods**方法：
  - 作用：给实例提供一个方法，调用以处理业务逻辑
  - 语法：
    - 写在methods配置项中
    - **作为方法，需要调用** -> ``this.方法名() {{ 方法名() }} @事件名="方法名"``

> **最大区别**：
>
> **计算属性**具有**缓存特性**(提升性能)：
>
> 即==计算属性会对计算出来的结果缓存，在数据未改变的情况下再次使用计算属性则直接读取缓存，无需重新计算，数据改变则自动重新计算并再次缓存==



### 计算属性的完整写法

计算属性之所以被称为计算属性，因为它被视作为一个属性来使用

那么既然作为属性来使用它当然可以获取访问也可以修改

- 计算属性**默认**的写法，只能读取访问，==不能修改==
- 如果要修改，需要写计算属性的**完整写法**

![69535429380](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695354293800.png)

示例代码

```javascript
<body>
  <div id="app">
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    <p>姓名：{{fullName}}</p>
    <button @click="changeName">修改姓名</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        firstName: '黄',
        lastName: '忠'
      },
      computed: {
        // fullName() {
        //   return this.firstName + this.lastName
        // }
        fullName: {
          get() {
            return this.firstName + this.lastName
          },
          set(value) {
            this.firstName = value.substring(0, 1)
            this.lastName = value.substring(1)
          }
        }
      },
      methods: {
        changeName() {
          this.fullName = '吕小布'
        }
      }
    })
  </script>
</body>
```



## Watch侦听器(监视器)

### 什么是Watch侦听器

- 作用：**监视数据变化**，执行一些 业务逻辑 或 异步操作
- **语法**：
  - **简单写法 -> 简单类型数据，直接监视**
  - 完整写法 -> 添加额外配置项
- 应用场景：例如翻译软件需要监视用户输入实时更新翻译结果/数据更新后进行本地存储
- 如下是简单写法的示例代码

![69536704959](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695367049590.png)



### 完整写法

+ 完整写法->添加额外配置项
  + **deep:true**对复杂类型深度监视
  + **immediate:true**初始化立刻执行一次handle方法

```javascript
    const app = new Vue({
      el: '#app',
      data: {
        // words: '',
        obj: {
          words: 'hh',
          lang: 'italy',
        },
        res: ''
      },
      // 具体讲解：(1) watch语法 (2) 具体业务实现
      watch: {
        obj: {
          deep: true,
          immediate: true,
          handler(newValue) {
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
              const res = await axios({
                url: 'https://applet-base-api-t.itheima.net/api/translate',
                params: newValue
              })
              this.res = res.data.data
            }, 300)
          }
        }
      }
    })
```



## 生命周期

### 什么是Vue生命周期和生命周期的四个阶段

- **Vue生命周期**：即一个Vue实例从 **创建** 到 **销毁** 的整个过程(或者是网页从打开到关闭的整个过程)

- **生命周期的四个阶段**：

  1. 创建：将数据变为响应式数据(监听数据)
  2. 挂载：渲染模板
  3. 更新：数据修改，更新视图(这时会进入循环)
  4. 销毁：销毁实例

  ![69552732473](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695527324733.png)



### 生命周期函数(钩子函数)

- Vue生命周期中，会自动运行**一些函数**，被称为**生命周期钩子**，它们可以让开发者在**特定阶段**执行自己的代码
- 重点记忆 创建阶段 与 挂载阶段

![69552771400](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695527714009.png)

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <div id="app">
    <h3>{{ title }}</h3>
    <div>
      <button @click="count--">-</button>
      <span>{{ count }}</span>
      <button @click="count++">+</button>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        count: 100,
        title: '计数器'
      },
      // 1. 创建阶段（准备数据）
      beforeCreate() {
        console.log('beforeCreate 响应式数据准备好之前', this.count)
      },//输出undefined
      created() {
          //输出100
        console.log('created 响应式数据准备好之后', this.count)
        // this.数据名 = 请求回来的数据
        // 可以开始发送初始化渲染的请求了
      },

      // 2. 挂载阶段（渲染模板）
      beforeMount() {//输出{{title}}
        console.log('beforeMount 模板渲染之前', document.querySelector('h3').innerHTML)
      },
      mounted() {//输出 计数器
        console.log('mounted 模板渲染之后', document.querySelector('h3').innerHTML)
        // 可以开始操作dom了
      },

      // 3. 更新阶段(修改数据 → 更新视图)
      beforeUpdate() {//输出 100 101
        console.log('beforeUpdate 数据修改了，视图还没更新', document.querySelector('span').innerHTML, this.count)
      },
      updated() {//输出 101 101
        console.log('updated 数据修改了，视图已经更新', document.querySelector('span').innerHTML, this.count)
      },

      // 4. 卸载阶段
      beforeDestroy() {
        console.log('beforeDestroy, 卸载前')
        console.log('清除掉一些Vue以外的资源占用，定时器，延时器...')
      },
      destroyed() {
        console.log('destroyed，卸载后')
      }
    })
  </script>
</body>

</html>
```

> 实例：
>
> ```javascript
> <!DOCTYPE html>
> <html lang="zh-CN">
>
> <head>
>   <meta charset="UTF-8">
>   <meta http-equiv="X-UA-Compatible" content="IE=edge">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <title>示例-获取焦点</title>
>   <!-- 初始化样式 -->
>   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset.css@2.0.2/reset.min.css">
>   <!-- 核心样式 -->
>   <style>
>     html,
>     body {
>       height: 100%;
>     }
>
>     .search-container {
>       position: absolute;
>       top: 30%;
>       left: 50%;
>       transform: translate(-50%, -50%);
>       text-align: center;
>     }
>
>     .search-container .search-box {
>       display: flex;
>     }
>
>     .search-container img {
>       margin-bottom: 30px;
>     }
>
>     .search-container .search-box input {
>       width: 512px;
>       height: 16px;
>       padding: 12px 16px;
>       font-size: 16px;
>       margin: 0;
>       vertical-align: top;
>       outline: 0;
>       box-shadow: none;
>       border-radius: 10px 0 0 10px;
>       border: 2px solid #c4c7ce;
>       background: #fff;
>       color: #222;
>       overflow: hidden;
>       box-sizing: content-box;
>       -webkit-tap-highlight-color: transparent;
>     }
>
>     .search-container .search-box button {
>       cursor: pointer;
>       width: 112px;
>       height: 44px;
>       line-height: 41px;
>       line-height: 42px;
>       background-color: #ad2a27;
>       border-radius: 0 10px 10px 0;
>       font-size: 17px;
>       box-shadow: none;
>       font-weight: 400;
>       border: 0;
>       outline: 0;
>       letter-spacing: normal;
>       color: white;
>     }
>
>     body {
>       background: no-repeat center /cover;
>       background-color: #edf0f5;
>     }
>   </style>
> </head>
>
> <body>
>   <div class="container" id="app">
>     <div class="search-container">
>       <img src="https://www.itheima.com/images/logo.png" alt="">
>       <div class="search-box">
>         <input type="text" v-model="words" id="inp">
>         <button>搜索一下</button>
>       </div>
>     </div>
>   </div>
>
>   <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
>   <script>
>     const app = new Vue({
>       el: '#app',
>       data: {
>         words: ''
>       },
>       mounted() {
>         // console.log(document.querySelector('#inp'));
>         document.querySelector('#inp').focus()
>       }
>     })
>   </script>
>
> </body>
>
> </html>
> ```
>
> 在上述实例中，我们希望页面一打开 焦点就在输入框上
>
> 这里使用autofocus属性并不能实现该需求，因为在Vue的挂载阶段结束后，页面中的元素就并不是我们所写的模板了，即autofocus属性会被覆盖，因此需要使用mounted函数





## 工程化开发

### 开发Vue的两种方式

1. 核心包传统开发模式：基于html/css/js文件，直接引入核心包，开发Vue
2. **工程化开发模式**：基于构建工具(例如webpack)的环境下开发Vue

![69561368191](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695613681919.png)



### 脚手架Vue CLI

因为我们需要采用工程化开发的模式，但是我们发现存在如下问题：

- webpack配置不简单
- 雷同的基础配置
- 缺乏统一标准

因此我们需要一个工具，生成标准化的配置——**Vue Cli**

- 基本介绍：
  - Vue CLI是Vue官方提供的一个**全局命令工具**
  - 可以帮助我们**快速创建**一个开发Vue项目的**标准化基础架子**(集成了webpack配置)
- 好处：
  - 开箱即用，零配置
  - 内置babel等工具
  - 标准化
- 使用步骤：
  1. 全局安装：``yarn global add @vue/cli ``或``npm i @vue/cli -g``
  2. 查看Vue版本：``vue --version``
  3. **创建项目架子：**``vue create project-name(项目名不能用中文)``
  4. **启动项目：进入项目目录后执行**``yarn serve``或``npm run serve``(注意这里的serve不是固定的需要看package.json文件)




### 脚手架目录文件介绍

![69563990140](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695639901402.png)

这里项目目录中最重要的3个文件在上图中均已高亮显示，index.html即前面学习webpack中的html模板文件，main.js文件即入口文件，引入包的入口即该文件，并且最重要的是因为是工程化开发了，我们的模板代码不再直接写在html文件中，而是写在.vue文件中

![69564037241](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695640372417.png)



### 组件化开发

- 组件化：即一个页面可以拆分成一个个组件，每个组件有着**自己独立的结构(html)、样式(css)、行为(js)**
  - 好处：便于维护，利于复用，提升开发效率
  - **组件分类**：**普通组件、根组件**

![69564243510](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695642435104.png)

#### 根组件

- 即整个应用最上层的组件，包裹了所有普通小组件，**在脚手架目录中app.vue即根组件**

![69564247832](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695642478328.png)



#### 单文件组件的三个组成部分

- template：结构(在Vue2中有且只能有一个根元素)
- script：JS逻辑
- style：样式(可以支持less，需要下包)

![69564261537](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695642615376.png)



#### 普通组件的注册使用

- 组件注册的两种方式：

1. **局部注册：只能在注册的组件内使用**
   1. 创建.vue文件(三个组成部分)
   2. 在**需要使用的组件**内导入并注册

![69564400665](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695644006653.png)

2. **全局注册：所有组件内都能使用**
   1. 创建.vue组件
   2. **main.js**内导入，并全局注册``Vue.component(组件名，组件对象)``

- 使用：
  - 当成html标签使用``<组件名></组件名>``
- 注意：组件名规范使用大驼峰命名法


> 一般先局部注册，如果确实发现是通用组件再抽出来



# Vue2进阶

## 组件的三个组成部分

### 组件的样式冲突scoped

- **默认情况**：写在组件中的样式会 ==全局生效==，因此容易造成多个组件之间的样式出现冲突
  1. **全局样式**：默认组件中的样式会作用到全局
  2. **局部样式**：可以给组件加上==scoped属性==，这样可以让当前样式只作用于当前组件

> **scoped原理**：
>
> 1. 当前组件内标签都会被添加data-v-hash值的属性(用于标记当前组件的标签属于该组件)
> 2. css选择器都自动被添加[data-v-hash值]的属性选择器
>
> 最终效果：必须是当前组件的元素才会有这个自定义属性，才会被样式作用到
>
> ![69571059852](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695710598524.png)



### data是一个函数

- 一个组件的**data选项**必须是一个==函数==->保证每个组件实例，维护独立的一份数据对象
- ==**每次创建新的组件实例，都会新执行一次data函数**，得到一个新对象==


![69578373142](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695783731423.png)





## 组件通信

### 什么是组件通信

组件通信，即**组件与组件**之间的数据传递

- 组件的数据是**独立的**，无法直接访问其他组件的数据
- 想用其他组件的数据——组件通信

![69578576098](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695785760987.png)



#### 不同的组件关系

- **组件关系分类：**

1. **父子关系**
2. **非父子关系**

![69578585129](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695785851291.png)![69578585595](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695785855952.png)

#### 组件通信解决方案

针对不同的组件关系，我们存在不同的组件通信方案

- 父子关系：props 和 $emit
- 非父子关系：provide&inject 和 eventbus、attrs&listener

此外还有通用解决方案

- 通用解决方案：Vuex(适合复杂业务场景)

![69578602008](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695786020088.png)



##### 父子通信

![69578604959](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695786049597.png)

props具体语法``1.父中给子添加属性传值 2.子使用props接收 3.使用``

如下图所示：

![69578608978](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695786089785.png)

\$emit具体语法``1.子使用$emit发送消息 2.父添加事件监听 3.在父中实现处理函数``

如下图所示：

![69578616496](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695786164965.png)



###### 什么是prop

prop定义：**组件上**注册的一些**自定义属性**

prop作用：**向子组件传递数据**

特点：

- 可以 传递 **任意数量** 的prop
- 可以 传递 **任意类型** 的prop



###### props校验

实际上，在组件通信的过程中使用prop通常需要添加限制，即验证传递参数的要求，因此有props校验

- **作用**：为组件的prop指定验证要求，不符合要求，控制台就会有错误提示，可以帮助开发者快速定位错误

- **语法**：
  1. **类型校验**![69578807961](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695788079615.png)
  2. 非空校验
  3. 默认值
  4. 自定义校验

  > 这里如果想要添加非空校验和默认值和自定义校验，那么需要使用props的完整写法：
  >
  > ![69579682586](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695796825865.png)




###### prop Vs data

prop与data都可以为组件提供数据，那么二者有什么区别吗

- 区别：
  - data的数据是自己的，可以随便改
  - prop的数据是外部的，不能直接改，要遵循**单向数据流**
- 口诀：谁的数据谁负责

> 单向数据流：即**父级prop的数据更新，会自动向下流动，影响子组件，这个数据流动是单向的**
>
> ![69579787895](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695797878952.png)



###### v-model原理

- 原理：v-model本质上是一个**语法糖**，例如应用到输入框上，就是**value属性和input事件的合写**
- 作用：提供数据的双向绑定
  - 数据变，视图变 **:value实现**
  - 视图变，数据变 **@input实现**
- **注意**：==``$event``用于模板中，获取事件的形参==

![69581729982](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695817299829.png)

> 1. Vue3中v-model新的特性
>
> - v-model的本质是 :modelValue 和 @update:modelValue 两者的绑定
>
> [Vue3系列--4.v-model语法糖 - 掘金 (juejin.cn)](https://juejin.cn/post/7006639264943308830)



###### 表单类组件封装

本质上实现了，**父组件与子组件** 数据的**双向绑定**

- 父传子：数据应该是从父组件props传递过来的，v-model拆解绑定数据
- 字传父：监听输入，子传父传值给父组件修改

![69581989070](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695819890707.png)



###### v-model优化表单类组件封装

本质上就是利用v-model的原理

- 实现：
  1. **子组件**：props使用**value**接收，事件触发命名为**input**(固定)![69607233147](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696072331472.png)
  2. **父组件**：v-model给组件直接绑定数据![69607230947](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696072309478.png)




###### .sync修饰符

- 作用：**可以实现 子组件 和 父组件 的双向绑定，简化代码**
- 特点：**prop属性名**不像使用v-model一样必须使用value，**可以自定义**
- 本质：也是一个语法糖，就是``：属性名 和 @update:属性名``
- 语法：![69607406132](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696074061322.png)





##### 非父子通信(扩展)

###### event bus事件总线

+ 作用：**非父子组件**之间，进行简易消息传递(适用于简单场景，如果是复杂场景->Vuex)
+ 步骤：
  1. 创建一个都能访问到的事件总线(实际就是一个Vue实例，一般我们将其放在项目src目录下的utils/EventBus.js中)![69581421164](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695814211647.png)
  2. A组件(接收方)，监听Bus实例的事件![69581423562](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695814235628.png)
  3. B组件(发送方)，触发Bus实例的事件![69581426045](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695814260453.png)

> 实际上这种方式本质上类似与操作系统中进程通信的管道通信，不过是一对多的
>
> ![69581427289](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695814272892.png)

###### provide & inject

- provide & inject 作用：实现**跨层级**共享数据(即孙子辈可以得到爷爷辈组件的数据)
- 语法：

1. 父组件provide提供数据![69581628494](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695816284944.png)
2. 子孙组件inject取值使用![69581631905](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1695816319059.png)

> 推荐使用复杂数据类型进行传递数据(因为是响应式的)



## 获取DOM元素与组件实例

### 获取DOM元素-ref和$refs

- 作用：利用ref和$ref可以用于获取DOM元素
- 特点：相比原先我们使用document.querySelector而言查找范围变为==当前组件内==(更加精确稳定)
- 语法：![69607862060](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696078620602.png)



### 获取组件对象-ref和$refs

- 语法：![69608014532](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696080145328.png)



## Vue异步

在Vue中，==Vue是异步更新DOM的(为了提升性能)==

这时可能出现如下问题：

我们在修改DOM元素后想立刻对新更新的元素进行操作，我们可能发现获取的元素为undefined

这即是因为**Vue的异步**

### $nextTick

该方法可以等到DOM更新后，才会触发执行此方法内的函数体

- 语法：![69608211338](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696082113388.png)




## 自定义指令

### 认识自定义指令

自定义指令，即我们可以自己定义类型前面我们所学的v-for、v-if等类似的指令，可以封装一些DOM操作，扩展额外的需求

- 语法：
  - 全局注册：![69612857959](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696128607347.png)
  - 局部注册：![69612864312](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696128643122.png)
  - 使用：![69612867547](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696128675479.png)

> 这里的inserted实际上是一个钩子函数，类似Vue生命周期的mounted函数，**即在当前元素被添加进页面时触发**



### 指令的值

- 在我们自定义的指令中，也可以通过等号的形式 **传递参数**
- 语法：
  - 绑定参数值![69612973768](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696129737689.png)
  - 拿到参数值![69612975492](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696129754924.png)

> 这里的update与前面的inserted一样也是一个钩子函数，他会**在数据更新时触发对应逻辑，而inserted则是当前元素被加载进页面时触发**



## 插槽

### 认识插槽

- 作用：让组件内部的一些 **结构** 支持 **自定义**
- **理解：本来每个组件类似类的实例只有初始化的值，现在可以使用插槽将它们赋予各自 特有 的值**

### 默认插槽

- 语法：
  1. 组件内需要定制的结构部分，改用``<slot></slot>``占位
  2. 使用组件时，在组件标签内部传入结构即可

![69621785170](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696217851704.png)



### 默认值设置

如果我们没有为组件插槽传入内容，那么组件内容为空，这是我们不希望的

因此，我们可以为插槽设置默认值

- 语法：**在<slot>标签内，放置内容，作为默认显示内容，当组件未传值时则显示默认值，传值了则显示传递的内容**

![69621814756](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696218147567.png)



### 具名插槽

需求：在组件中，有多个结构需要外部传入内容进行定制

而默认插槽只能定制一个位置，因此需要具名插槽

- 语法：
  1. 在组件内结构的多处slot使用name属性区分名字![69621894671](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696218946714.png)
  2. 使用template标签配合``v-slot:名字``来分发对应标签内容(可以使用``#名字``简写)![69621901203](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696219012038.png)

> 注意：一旦插槽起了名字，就是具名插槽，它**只接受定向分发的内容**

> 总结目前所学简写：
>
> - ``v-on:事件名 = "内联语句或函数"``简写为``@事件名="逻辑"``
> - ``v-bind:属性名="表达式"``简写为``:属性名="属性值"``
> - ``v-slot:插槽名``简写为``#插槽名``



### 作用域插槽

首先注意的是，插槽的类型只有两类：默认插槽和具名插槽

**作用域插槽：定义slot插槽时，可以将插槽的值传递出去，为了将来使用组件时可以使用**

- 语法：
  1. 给slot标签 以 添加属性的方式传值![69622195417](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696221954178.png)
  2. 所有的添加属性，都会被作为一个对象传递![69622198279](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696221982796.png)
  3. 在组件中的**template**，通过``#插槽名="obj(不一定叫obj)"``，如果是默认插槽名则为==default==(其中引号内也可以进行对象解构)![69622207571](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696222075710.png)

> 参考:[插槽 Slots | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/components/slots.html#scoped-slots)



## 单页应用程序SPA

- SPA是 Single Page Application的缩写
- 定义：**即所有功能都在==一个html页面==实现的应用**

### 对比多页面应用程序

![69631864424](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696318644244.png)

> SEO即搜索引擎优化，即在搜索引擎搜索时的优先级问题
>
> 一般单页应用程序 使用场景：公司内部自用应用/移动端站点
>
> 多页应用程序 使用场景：公司对外的官网/电商类网站



### 认识路由

对于单页面应用程序，之所以效率高，最大的原因是：**页面按需更新**，即需要什么组件就渲染什么组件

那么要按需更新就要明确：访问路径与组件之间的关系，即路由

#### 生活中的路由

- 即设备与IP的映射关系![69631912434](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696319124341.png)



#### Vue中的路由

- 即地址栏路径与组件之间的映射关系![69631917023](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696319170236.png)





### 路由的基本使用(5+2)

- 5个基础步骤(固定)

1. 下载VueRouter到当前项目中(Vue2中使用3.6.5版本较为稳定)![69639651145](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696396511453.png)
2. 引入![69633185991](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696331859914.png)
3. 安装注册![69633187044](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696331870441.png)
4. 创建路由对象![69633187962](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696331879629.png)
5. 将路由对象注入到Vue实例中![69633189592](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696331895920.png)



- 2个核心步骤

1. 创建需要的组件(一般在views目录下)，配置路由规则(注意地址栏规则即url中的资源路径定义)![69633299281](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696332992813.png)
2. 配置导航，配置路由出口(路径匹配的组件显示的位置)![69633304539](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696333045396.png)



### 路由进阶

#### 路由的封装

- 为了拆分模块，利于维护，我们希望将路由模块抽离出来![69647519623](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696475196235.png)

> ![69647570611](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696475706116.png)
>
> tips:这里在路由模块中的导入我们通常使用绝对路径，避免在当前目录路径改变时的维护困难

> **组件分类**：
>
> .vue文件分两类：页面组件和复用组件
>
> - src/views文件夹
>   - 页面组件：用于页面展示、配合路由使用
> - src/components文件夹
>   - 复用组件：用于展示数据、常用于复用



#### 声明式导航-导航链接router-link

vue-router提供了一个全局组件**router-link(取代a标签)**

- router-link与a标签的区别：
  - **能跳转**，配置to属性指定路径(必须)，本质还是a标签，但是==to属性的路径无需#==
  - **能高亮**，即默认提供高亮类名，可以直接设置高亮样式

![69647648798](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696476487989.png)

如上图所示，可以看到，router-link的本质就是a标签，且高亮类名有**router-link-active和router-link-exact-active**

- router-link-active和router-link-exact-active区别：![69647680951](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696476809515.png)

**即模糊匹配可以在二级目录下同样保持高亮**



#### 自定义router-link高亮类名

- 只需在VueRouter配置项中进行配置即可![69647830400](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696478304009.png)



#### router-link跳转传参

- 即在跳转路由时进行参数的传递

##### 查询参数传参

1. **在router-link的属性to中加入想要传递的参数``to="/path?参数名=值"``**
2. **对应页面接收传递值``$route.query.参数名``**(注意该值是在对象vuecomponent中的)




##### 动态路由传参

语法：

1. 配置动态路由：``path:/路径/:参数名``
2. 跳转时传递参数：``to="/路径/参数值"``
3. 页面获取：``$route.params.参数名``(这里的参数名对应第一步)

> 注意：
>
> ``path:/路径/:参数名``是默认表示必须传递参数的，如果希望不传参数也能得到匹配，可以加上**可选符``?``**



##### 两种传参方式的区别

1. 查询参数传参(比较适合**传递多个参数**)

![69668059810](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696680598103.png)

2. 动态路由传参(简洁，适合**传递单个参数**)

![69668063258](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696680632583.png)



#### 路由重定向

- 作用：实现在默认路径的组件显示
- 说明：重定向，即匹配path后，强制跳转到某一个路径
- 语法：``{path:匹配路径, redirect:重定向路径}``



#### Vue路由404

- 作用：当路径找不到匹配时，给出提示页面
- 位置：配置在路由最后
- 语法：``path:'*'，component:组件``(这里的星号表示任意路径，放在路由最后即表示前面路由都不匹配时则匹配该路由)


以上写法仅限Vue2，下图为Vue3写法

![70019315536](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1700193155361.png)




#### 路由模式设置

- hash路由(默认)：例如http://localhost:8080/#/home
- history(常用)：例如http://localhost:8080/home(上线后需要服务器端支持)![69668216376](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696682163763.png)



#### 编程式导航-基本跳转

编程式导航：即使用JS代码进行跳转(原生JS是使用location.href进行跳转)

- 两种语法：
  - path路径跳转(简易方便)![69668266195](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696682661957.png)
  - name命名路由跳转(适用于path路径较长的情况)![69668274136](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696682741363.png)



##### 路径传参

- 对于前面所学的两种传参方式：查询参数 和 动态路由传参 编程式导航都适用
  - path路径跳转传参
    - 查询参数传参![69668365240](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696683652408.png)(使用``$route.query.参数名``接收)
    - 动态路由传参![69668375517](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696683755177.png)(使用``$route.params.参数名``接收)
  - name命名路由跳转传参
    - query查询参数传参![69673415777](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696734157771.png)使用``$route.query.参数名``进行接收）
    - 动态路由传参![69673424712](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696734247127.png)(使用``$route.params.参数名``进行接收，注意参数名要与配置动态路由时设置的参数名对应)




#### 二级路由的实现

- 需求：在一级路由里面我们希望点击导航之后，切换路由，并将其中内容进行替换
- 语法：
  - **在一级路由的配置项中，通过==children配置项==即可配置子路由，语法同样是数组包对象**
  - **在一级路由的页面内，添加子路由的出口<router-view>标签**



#### 组件缓存keep-alive

- 需求：在路由跳转后，组件被销毁了，返回原先页面时组件又被重建了，所以数据会重新加载消耗性能

1. **keep-alive是什么**

![69674878086](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696748780869.png)

2. **keep-alive的优点**

![69674880290](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696748802903.png)

> 注意：默认包裹了keep-alive的路由匹配的组件都会被缓存，但我们并不需要所有组件都缓存
>
> 因此keep-alive提供了**三个属性**
>
> ![69674890797](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696748907971.png)
>
> 这里的**语法中的数组名默认匹配到组件中设置的name属性，如果没有设置name属性则会去找组件的文件名**
>
> 当某个组件被缓存后，该组件会多拥有两个生命周期钩子，这是因为组件缓存后，便不会执行组件的钩子created、mouted、destoryed了
>
> - **actived激活时，即组件被看见时触发**
> - **deactived失活时，即离开页面看不见组件时触发**



#### 全局前置守卫

在从某一个页面跳转到另一个页面时，我们有时候需要进行拦截处理，这时便可以用到路由导航守卫-全局前置守卫

[导航守卫 | Vue Router (vuejs.org)](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

1. 所有的路由一旦被匹配到，都会先经过全局前置守卫
2. 只有全局前置守卫放行，才会真正解析渲染组件，才能看到页面内容

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

- 参数说明：
  - to：到哪里去，到哪里去的完整路由信息对象(路由，参数)
  - from：从哪里来，从哪来的完整路由信息对象(路径，参数)
  - next()是否放行
    - next()直接放行到to要去的路径
    - next(路径)进行拦截，拦截到next里面配置的路径





## 项目规范

### 自定义创建项目

- 需求：在前面学习了路由后，我们发现路由的配置也有些许的麻烦，能否自动创建路由配置的架子呢
- 解决：使用VueCli进行自定义创建项目即可

![69693664970](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696936649705.png)



### ESlint代码规范

- 认识代码规范：例如“赋值符号的左右是否需要空格？一个语句的结束是否需要分号”
- [JavaScript Standard Style (standardjs.com)](https://standardjs.com/rules-zhcn.html)
- ![69693700998](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696937009988.png)



#### 解决代码规范错误

![69693710662](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696937106622.png)

- 这个时候我们可以选择手动修正错误，也可以ESlint自动修正错误
- 自动修复
  - **基于vscode的插件ESLint高亮修复，并通过配置即可实现自动修复错误![69693813265](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696938132653.png)**




## Vuex

### 什么是Vuex

- 官方定义：Vuex是一个vue的**状态管理工具**，其中状态就是数据
- **理解：vuex是一个插件，可以帮助我们管理vue通用的数据(多个组件需要共享的数据)**
- 使用场景：
  - 某个数据 需要在很多个组件 中使用
  - 多个组件 共同维护 一个数据
- 优势：
  - 数据实现集中管理
  - ==响应式变化==
  - 操作简洁
  - ![69699270029](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696992700299.png)



### 创建一个空仓库

这里的步骤与路由router的使用类似，同样的，这里的步骤在后续可以通过自定义项目使用vuecli自动生成模板代码

1. 安装``npm i vuex@3``(安装失败可以加入-f参数)
2. 新建src/store/index.js存放vuex![69699536692](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696995366928.png)
3. 创建仓库，在main.js中挂载到vue实例上![69699540403](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1696995404039.png)
4. 使用``this.@store``得到实例




### 核心概念-state状态

- state状态即仓库中的数据，作用是为仓库提供数据和在组件中使用仓库中的数据

1. **提供数据**

在store里的state对象中可以添加我们要共享的数据

![69700098288](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697000982885.png)

2. **使用数据**

使用数据可以通过**store直接访问** 或 通过**辅助函数**访问

- 通过store直接访问![69700106681](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697001066811.png)
- **通过辅助函数(底层原理是将this.$store.state.属性名封装为一个计算属性)mapState帮助我们将store的数据自动映射到组件的计算属性中**，这里使用展开运算符是为了后续可以继续添加我们自己的计算属性![69700167532](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697001675325.png)




### 核心概念-mutations

- 明确：vuex与组件通信一样遵循单向数据流，即组件中不能直接修改仓库的数据	

- 但是vue默认并不会监测组件修改仓库值的操作，因此为了避免初学者犯错，可以在vuex的配置项中新增``strict:true``即可开启严格模式，这样vue可以检测到错误并报错

- 基本语法：

  - 定义mutations对象，存放修改state的方法![69700595273](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697005952738.png)
  - 组件中提交调用mutations![69700597481](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697005974810.png)

- 传参语法：

  - 提交mutation是可以传递参数的``this.$store.commit('xxx'，参数)``（这里的参数一般称为提交载荷）
  - ==注意：提交参数只能有一个，如果希望传递多个参数，那么可以包装为对象进行传递==

  1. 提供mutation函数![69700634984](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697006349845.png)
  2. 页面提交调用![69700636049](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697006360491.png)


- **辅助函数写法：**
  - 与mapState类似的，也存在vuex也提供的辅助函数mapMutations，帮助我们将**mutations中的方法**提取出来，映射到**组件methods**中，方便调用![69700740161](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697007401612.png)




### 核心概念-actions

- actions是vuex专门提供用于处理**异步操作**的
- 说明：这是因为**mutations必须是同步的**(便于检测数据变化，记录调试)，所以不能直接在mutations中使用异步代码
- 语法：
  1. 提供actions方法(参数context可以理解为仓库store，==注意这里即使在actions里面想要修改state数据也要通过mutations提交commit==)![69708085724](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697080857246.png)
  2. 页面中dispatch调用![69708096398](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697080963980.png)



- 辅助函数mapActions
  - 本质上就是把actions里的方法提取出来，映射到组件methods中

![69708117205](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697081172052.png)



### 核心概念-getters

- getters是类似与vue的计算属性的vuex的概念(只是类似因为getters没有set函数)
- 说明：除了state外，有时我们还需要从state中派生出一些状态，这些状态是依赖于state，这时会用到getters

![69708237598](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697082375985.png)



### 核心概念-modules

由于vuex使用单一状态树，**应用的所有状态会集中到一个比较大的对象中**，当应用/项目变得复杂时，store对象就可能变得十分臃肿(即项目变大时，Vuex变得难以维护)

因此我们希望对Vuex进行划分模块，每个模块都有自己**独立的state、mutations、actions、getters**

![69710818511](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697108185114.png)

- 语法：
  1. 新建store/modules/模块名.js![69710828134](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697108281344.png)
  2. 在store/index.js中引入并加入到modules下![69710831140](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697108311408.png)



#### 获取子模块的state

尽管已经分模块了，但是**其实子模块的状态state还是挂载到根级别的state上，属性名就是模块名**![69710926107](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697109261070.png)

- 语法：
  - **直接通过模块名访问**``$store.state.模块名.xxx``
  - **通过mapState映射**
    - 默认根级别的映射``mapState(['模块名'])``
    - 子模块的映射``mapState('模块名'，['xxx'])``(该方法需要开启**命名空间**namespaced)![69710927223](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697109272237.png)



#### 获取子模块的getters

- 语法：
  - 直接通过模块名访问``$store.getters['模块名/xxx']``(这是因为在getters对象里user模块的xxx被命名为模块名/xxx，因此要获取这个对象只能使用中括号形式JS基础)
  - 通过mapGetters映射
    - 默认根级别的映射``mapGetters(['xxx'])``
    - 子模块的映射``mapGetters('模块名'，['xxx'])``(需要开启命名空间namespaced)



#### 获取子模块的mutations

- 默认情况下，模块中的mutation和actions会被挂载到全局，即可以直接``$store.commit('方法名'，参数)``，但是不推荐这样做，因为这样连mutation属于哪个模块都不知道
- 正确做法(==都需要提前开启命名空间==)：
  - 直接通过store调用``$store.commit('模块名/xxx'，参数)``
  - 通过mapMutations映射
    - 默认根级别的映射``mapMutations(['xxx'])``
    - 子模块的映射``mapMutations('模块名'，['xxx'])``(需要开启命名空间namespaced)



#### 获取子模块的actions

- 默认情况下，模块中的mutation和actions会被挂载到全局，即可以直接``$store.dispatch('方法名'，参数)``，但是不推荐这样做，因为这样连action属于哪个模块都不知道
- 正确做法(==都需要提前开启命名空间==)：
  - 直接通过store调用``$store.dispatch('模块名/xxx'，参数)``
  - 通过mapActions映射
    - 默认根级别的映射``mapActions(['xxx'])``
    - 子模块的映射``mapActions('模块名'，['xxx'])``(需要开启命名空间namespaced)

> 补充：在模块里的actions对象内的方法参数context即代表的是当前模块的仓库了，即commit时无需再声明是哪个模块



# 智慧商城项目总结

## 复用技巧

有时在同一个组件内有相同的代码，为实现复用，也为了代码看起来更加简洁，可以将复用的代码封装到一个methods函数内，但是有时不同组件内也有相同的代码，也想实现复用的话需要使用到Vue2提供的==mixins==

- 语法
  1. 新建目录与JS文件![69761238346](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697612383463.png)
  2. 在JS文件内，可以按照原先组件JS内容的写法拥有data，methods![69761247171](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697612471719.png)
  3. 导入到需要对应内容的组件内![69761249857](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697612498571.png)
  4. 加入到JS代码内![69761251447](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697612514476.png)




## 目录

### 组件库

我们在本次项目中使用到了vant组件库，在目录中我们的表现是**新建utils/vant-ui.js文件用于按需引入需要的组件，再将其引入到main.js文件中即可**



![69778992706](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697789927065.png)

![69778991924](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697789919241.png)

![69778997843](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697789978431.png)



### axios请求封装

在实际开发中，我们习惯将axios二次封装为一个一个的实例，因为可能向多台服务器发送请求，需要配置各自的请求/响应拦截器，因此在目录中的表现为**在utils目录下新建request.js文件，新建实例对象并将其导出**

```javascript
import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 新建axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})
// 添加配置
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，禁止背景点击(节流，可以防止多次无效点击)
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // 如果用户已登录添加用户token到请求头header
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  const data = response.data
  if (data.status !== 200) {
    // 请求错误
    Toast(data.message)
    return Promise.reject(data.message)
  } else {
    Toast.clear()
  }
  // 扒掉一层数据
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出实例
export default instance

```



### 封装api接口

为了方便维护各个接口请求，我们也会**在目录中新建src/api目录，在其中对每个页面的接口请求进行封装导出，方便管理维护**

![69779020506](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790205069.png)



```javascript
import request from '@/utils/request'

export const addCartRequestFn = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getCartNum = () => {
  return request.get('/cart/total')
}

export const getCartList = () => {
  return request.get('/cart/list')
}

export const setCartCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const delSelected = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}

```



### 封装本地存储方法

为进行本地存储，我们会**将与本地存储相关的函数封装存储到同一个文件中，这个文件一般位于utils/storage.js中**

![69779032164](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790321640.png)

```javascript
// 用户个人信息
const INFO_KEY = 'my_shopping_info'
const HISTORY_KEY = 'my_history_info'
const ADDRESS_KEY = 'my_address_info'
const DEFAULT_ADDRESS_KEY = 'my_default_address_info'

export const getUserInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

export const setUserInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeUserInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 用户搜索历史
export const getHistory = () => {
  const defaultHistory = []
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : defaultHistory
}

export const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

// 用户地址列表
export const getAddress = () => {
  const defaultAddress = []
  const result = localStorage.getItem(ADDRESS_KEY)
  return result ? JSON.parse(result) : defaultAddress
}

export const setAddress = (address) => {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(address))
}

export const getDefaultAddressId = () => {
  const result = localStorage.getItem(DEFAULT_ADDRESS_KEY)
  return result ? JSON.parse(result) : ''
}

export const setDefaultAddressId = (id) => {
  localStorage.setItem(DEFAULT_ADDRESS_KEY, JSON.stringify(id))
}

```



### 通用css封装

我们经常会有重置默认样式的代码，**一般将其封装在src/style目录下作为文件存储，并引入到main.js即可**

![69779058393](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790583934.png)![69779060468](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790604682.png)



### 路由页面views目录

不同的路由页面，通常在views中被分为多个目录，以区分不同的页面，分别维护管理

![69779071295](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790712953.png)



### vuex仓库目录

不同的页面通常使用不同的vuex仓库，因此**在store目录下，我们会新建modules存储不同模块的仓库文件**![69779078837](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697790840688.png)



## 打包发布

### 明确打包的作用

- 说明：vue脚手架只是开发过程中，协助开发的工具，当真正开发完了，脚手架是不参与上线的
- **打包的作用：**
  - **将多个文件压缩合并为一个文件**
  - **语法降级**
  - **less sass ts语法解析**
  - 等
- 打包后可以生成浏览器能够直接运行的网页，即上线后的源码

![69779958279](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697799582794.png)

### 打包的命令和配置

- 使用vue脚手架即可完成打包
- 命令如下：
  - ``yarn build``
  - 或``npm run build``
- **结果**：在项目的根目录会自动创建一个文件夹dist，dist中的文件即打包后的文件，只需放到服务器中即可
- **配置**：默认情况下，需要放到服务器中的根目录打开，如果希望双击运行，需要配置publicPath配成相对路径

![69780014622](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697800146228.png)

### 打包优化：路由懒加载

- 说明：当打包构建应用时，JavaScript包会变得很大，影响页面加载效率，我们希望将不同路由的组件分割为不同的代码块，然后在路由被访问时才加载对应组件，实现高效






# 工具介绍

## json-server

- 该工具可以在我们前端页面搭建完成后但是后端还未完成的情况下快速获取简易接口

![69711474838](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697114748381.png)



## 组件库

![69718519942](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697185199422.png)

如上图所示，这些都是我们在开发中实际会高频次用到的组件，我们不可能每次开发一个项目都重新去写这些组件，因此第三方组件库封装好了很多很多组件，整合在一起成为组件库，分别我们开发

### 了解常用Vue组件库

Vue的组件库并不唯一，一般按平台进行分类：

- **PC端：element-ui(element-plus)、ant-design-vue**
- **移动端：vant-ui、Mint UI、Cube UI**



## postcss

vant-ui提供的postcss插件可以帮助我们实现项目的vw适配

[Vant 2 - 轻量、可靠的移动端组件库 (gitee.io)](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage)

![69718786026](D:\MyProject\HTMLCSSJavaScript\Vue\assets\1697187860260.png)

