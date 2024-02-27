# 01JS基础语法

## js简介

### JavaScript介绍

1. JavaScript是什么

   它是一种运行在客户端（浏览器）的编程语言，实现人机交互效果。

2. JavaScript的作用是什么

   - 网页特效（监听用户的行为并且让网页做出反馈）
   - 表单验证（例如验证用户输入是否合法）
   - 服务交互（获取后端数据，渲染前端）
   - 服务端编程（node.js）

3. JavaScript的组成有什么？

   - ECMAScript:
     - 规定了JS的基础语法知识
   - Web APIs:
     - DOM 操作文档，比如对页面元素进行移动、大小、添加删除等操作
     - BOM 操作浏览器，比如页面弹窗，检测窗口宽度、存储数据到浏览器等![69120928852](C:\Users\weilin\AppData\Local\Temp\1691209288521.png)

> JavaScript参考学习网站：MDN 

### JavaScript书写位置

#### 内部JavaScript

直接写在html文件中，使用script标签包裹代码

规范：script标签写在</body>标签上面

> 我们将<script>标签放在html底部的原因：
>
> 浏览器会按照代码在文件中的**顺序加载**HTML，如果先加载的JavaScript期望修改下面的HTML，那么可能HTML还未加载而导致JavaScript失效

#### 外部JavaScript

将JavaScript代码写在 **.js** 文件中，再使用script标签引入

>外部JavaScript会使得代码更加有序，更容易被复用，且没有了脚本的混合，html更加可读

### 注释与解释符

#### 注释

- 单行注释
  - 使用//
- 多行注释
  - 使用/* */

#### 结束符

- 使用英文；代表语句结束
- 实际情况：实际开发中，可写可不写，JavaScript引擎会自动判断语句的结束位置
- 约定：实际开发中，按照团队要求，风格统一写与不写

### 输入与输出语法

- 输出语法：
  - `` document.write('输出内容')``
    - 向body中输出内容
    - 注意如果输出内容中写的是标签，也会被解析成网页元素
  - `` alert('输出内容')``
    - 页面弹出警告对话框
  - ``console.log('控制台打印')``
    - 程序员调试用 
- 输入语法：
  - ``prompt('输入提示内容')``
  - 作用：显示一个对话框，对话框中包含一条文字信息，用于提示用户输入
  - 注意prompt的返回值默认是 ==字符串类型==

### JavaScript代码执行顺序

- 按照HTML文档流顺序执行JavaScript代码（即从上到下执行）
- alert()和prompt()它们会跳过页面渲染先被执行

### 字面量

- 数字字面量
- 字符串字面量
- 数组字面量
- 对象字面量
- 等等


## 变量

### 变量的声明与赋值

语法：

``let 变量名 = 数字字面量， 变量名 = 字面量 ``

其中变量的名称被称为 **标识符**

> 推荐一行声明一个变量，提高可读性

### 变量的命名规则

1. 规则

- 不能使用关键字
  - 即JavaScript内置的一些英语单词
- 只能使用下划线、字母、数字、$组成，且数字不能开头
- 字母严格区分大小写，例如：Age与age不同

2. 规范

- 起名要有意义
- 遵守小驼峰命名法（第一个单词首字母小写，后面单词首字母大写）

### 扩展-let与var的区别

在旧的JavaScript，使用关键字var来声明变量，而不是let

var现在在开发中一般不再使用，只是我们可能在老程序中看到

let解决了var之前存在的一些问题

- 可以先使用再声明（不合理）
- var声明过的变量可以重复变量（不合理）
- 此外还有变量提升、全局变量、没有块级作用域等



### 数组的基本使用

声明语法如下

``let 数组名 = [数据1，数据2，.....]``

- 数组是按照顺序保存，所以每个数据都有自己的编号
- 下标从0开始
- **数组可以存储任意类型的数据**
- 取值按照 **数组名[下标]**进行
- 数组名.length 用于获取数组长度 



### 常量的基本使用

- 概念：使用const声明的变量即常量
- 使用场景：当某个变量永远不会改变时，就可以使用const声明而不是let
- 命名规范：与let一致
- ``const PI = 3.14``
- 注意：
  - **常量不允许重新赋值，声明时必须进行初始化**

## 数据类型

### 数字类型

- JavaScript中的正数、负数、小数**统称**为 数字类型

- **注意**
  - ==JS是弱数据类型，变量到底是什么数据类型，只有赋值之后我们才能确定==
  - 类似java则是强数据类型，例如int a = 3 则a必须是整数
  - 其中数字类型中存在一个特殊值为NaN，即not a number的缩写，它代表一个计算错误，同时NaN是粘性的，任何对NaN的操作都会返回NaN

- 算术运算符

  - 包括加减乘除和取余
  - 先乘除后加减，有括号先算括号里的

  ​


### 字符串类型 

#### 简单介绍

通过单引号、双引号、反引号包裹的数据都叫字符串，它们都没有本质的区别，推荐使用单引号

- 注意

  - 无论什么引号都必须成对出现
  - 单引号/双引号可以互相嵌套，但是不能自己嵌套自己
  - 必要时可以使用转义符\


#### 字符串拼接

==与java类似的，JavaScript也可以使用加号+实现字符串的拼接==

#### 模板字符串（ES6）

- 使用场景
  - 拼接字符串和变量
  - 这是ES6新语法，在它出现之前只能使用+号进行拼接，出现较多引号麻烦
- 语法
  - 使用反引号表示字符串
  - 当内容需要拼接变量时，使用 **${}** 包住变量   




#### 字符串常用方法

- 字符串.trim() 方法从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串。 




### 布尔类型（boolean)

- 它有两个固定的值 true 与 false



### 未定义类型（undefined）

未定义是比较特殊的类型，只有一个值undefined，参与计算的结果一般是NaN，因为undefined是一个未知的数

> 什么情况出现未定义类型？
>
> 只声明变量，不赋值的情况下，变量的默认值为undefined，一般很少直接为某个变量赋值为undefined

>工作中的使用场景：
>
>开发中经常声明一个变量，等待传送过来的数据
>
>如果我们不知道这个数据是否传递过来，此时可以通过检测这个变量的值是不是undefined，判断是否用户已传递数据  



### null（空类型）

JavaScript中的null仅仅代表“无”、“空”、“值未知”的特殊值

> null与undefined的区别
>
> - undefined表示没有赋值
> - null表示赋值了但是内容为空

> 开发中的使用场景：
>
> 把null作为一个**尚未创建**的**==对象==**
>
> 即**null 类似 let obj = {}**



### 检测数据类型

#### 通过typeof 关键字检测数据类型

typeof 运算符可以返回被检测的数据类型，它支持两种语法形式：

1. 作为运算符：typeof x （常用的写法）
2. 函数形式： typeof(x) 

实际上，两种语法形式，得到的结果是一样的



### 分类介绍

#### 基本数据类型/值类型

==注意==：该种数据类型在存储时，变量中存储的是值本身，因此叫做值类型，存储在栈中

- number
- string
- boolean
- undefined
- null

#### 引用数据类型/复杂类型 

==注意==：该种数据类型在存储时，变量中存储的仅仅是地址（引用），引用存储在栈中，真正的值存储在堆中

- object
- array
- function



## 类型转换

### 为什么要进行类型转换

使用表单、prompt获取的数据默认是字符串类型的，此时不能盲目进行计算操作，因此我们需要进行类型转换



### 隐式转换

某些运算符被执行时，系统内部自动将数据类型进行转换，这种转换称为``隐式转换``

- 规则
  - ==+号两边只要有一个是字符串，就会把另外一个也变为字符串==
  - ==除了+号之外的算术运算符，比如 - * / 等都会把数据转换为数字类型再计算==
    - ==此外，它会使得空字符串''、null转化为0，特殊的undefined会被转换为NaN==
- 注意
  - ==+号作为正号解析时可以将字面量转换为数字类型==
  - ==任何数据与字符串相加都是得到字符串==



### 显式转换

编写程序时，为了避免隐式转换带来的问题，通常需要对数据进行显式转换

#### 转换为数字型

- **Number(数据)**
  - 转换为数字类型
  - 如果字符串内容中存在非数字，转换失败结果为NaN，即不是一个数字
  - NaN也是number类型的数据，表示非数字
- **parseInt(数据)**
  - 返回传入参数的整数部分
  - **注意**：只有数字在开头才可以取出（例如参数123abc得到123，但是像abc123是得到NaN）
- **parseFloat(数据)**
  - 可以保留小数
  - **注意**：与parseInt一样的，只有数字在开头才可以取出（例如12.34abc得到12.34，12abc得到12，但是像abc123是得到NaN）
- 在想要转换的数据前面加上一个+号（这是隐式转换）




#### 转化为Boolean型	

- **Boolean(数据)**
  - 转换为布尔类型
  - **注意**：
    - ''、0、undefined、null、false、NaN转换为布尔值后都是false，其余为true


## 运算符

### 赋值运算符

- 即对变量进行赋值的运算符=
- 其他赋值运算符
  - +=
  - -=
  - *=
  - /=
  - %=



### 一元运算符

即只需要一个操作数的运算符

- 正号+
- 负号-
- 自增++
- 自减--
- 类似其他语言的，自增与自减都分为前置与后置



### 比较运算符

即用于比较的运算符，比较结果为boolean类型，即只会得到true和false

- &gt;
- <
- &gt;=
- <=
- **==**
  - ==左右两边值是否相等==
- **===**
  - ==左右两边值与类型是否都相等==
- !==
  - 左右两边是否不==全等==
- 对比  
  - =单等是赋值
  - ==是判断
  - ===是全等
  - 开发中判断是否相等，推荐使用===

> 字符串比较：
>
> - 字符串比较是比较的字符对应的ASCII码
>   - 从左往右依次比较
>   - 如果第一位一样再比较第二位，依次类推
> - NaN不等于任何值，包括它本身
>   - 涉及到NaN，都是false
> - 尽量不要比较小数，因为可能存在精度问题
> - 不同类型之间的数据进行比较会发生隐式类型转换
>   - 最终把数据都转换为number再比较
>   - 所以开发中，精确地比较请使用全等或不全等



### 逻辑运算符

![69130837859](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691308378592.png)

#### 逻辑中断

- 短路：只存在于&&和||中，当满足一定条件时，让右边代码不执行

![69146345464](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691463454647.png)

- 无论是&&还是||，运算结果都是**最后被执行的表达式值**，一般用于变量赋值

### 运算符优先级

![69130866151](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691308661514.png)

实际开发中，对于不确定的运算符优先级使用小括号提升优先级即可



### 展开运算符

- 用于将一个数组展开

![69243299190](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1692432991901.png)

> 说明：
>
> - 不会修改原数组
> - 也可以用于**对象**
>
> 应用场景：
>
> - 求数组最大最小值
> - 合并数组
>
> ```javascript
>     const arr1 = [1, 2, 3]
>     const arr2 = [4, 5, 6]
>     // ...arr 等价于 1,2,3
>     console.log(Math.max(...arr1));
>     console.log(Math.min(...arr1));
>     const arr = [...arr1, ...arr2]
>     console.log(arr);
> ```
>
> 



### 可选链运算符

- ``?.``
- **可选链运算符**（**?.**）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 运算符的功能类似于 `.` 链式运算符，不同之处在于，在引用为空 ([nullish](https://developer.mozilla.org/zh-CN/docs/Glossary/Nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

```javascript
let nestedProp = obj.first?.second;
//相当于
let temp = obj.first;
let nestedProp = temp === null || temp === undefined ? undefined : temp.second;

```



## 语句

### 表达式与语句

- 表达式是可以被求值的代码，JavaScript引擎会将其计算出一个结果
- 语句是一段可以被执行的代码，例如prompt可以弹出输入框，还有if语句，循环语句等

>表达式与语句的区别：
>
>表达式：因为表达式可以被求值，因而它可以被写在赋值语句的右边
>
>语句：而语句不一定有值，例如alert() for 和break等语句就不能被用于赋值





### 分支语句 

#### if语句

if语句有三种使用：单分支、双分支、多分支

- 单分支使用语法：

```javascript
if (条件) {
    代码块
}
```

- ==小括号内的条件结果如果不是Boolean类型的话，会发生隐式转换为Boolean类型
  - 对于数字而言，只有0是false，其余都为true
  - 对于字符串而言，只有空串''是false，其余都为true



- 双分支使用语法：

```javascript
    if (条件) {
      代码块
    } else {
		代码块
    }
```



- 多分支使用语法：

```javascript
if (条件1) {
   代码块 
} else if(条件2) {
    代码块
} else if(条件3) {
    代码块
} else {
    代码块
}
```



#### 三元运算符

- 使用场景：比if双分支更简单的写法，可以使用 三元表达式
- 语法：

```javascript
条件 ？满足条件执行的代码 ： 不满足条件执行的代码
```



#### switch语句

- 语法：

```javascript
switch (数据) {
    case 值1:
        代码1
        break
    case 值2:
    	代码2
        break
    default:
    	代码n
        break
}
```

- 找到与小括号内数据==**全等**==的case值，并且执行其中的代码
- 如果没有找到全等的case值，那么执行default代码块
- 注意
  - switch case语句一般用于等值判断，不适用于区间判断
  - switch case一般配合break关键字使用，没有break会造成case穿透




### if多分支与switch语句的区别

1. 共同点
   - 都能实现多分支选择
   - 大部分情况下可以互换
2. 区别：
   - switch语句通常处理case值为比较**确定**的情况，而if...else语句更加灵活，通常用于范围判断（大于，等于某个范围）
   - switch语句进行判断后直接执行到程序的语句，效率更高
   - switch一定注意是**全等**，注意数据类型，同时注意break否则会有穿透效果
3. 结论
   - 当分支比较少时，if...else语句效率更高
   - 反之，switch语句效率高且结构清晰




### 循环语句

#### while循环

- 基本语法：

```javascript
while (循环条件) {
    循环体
}
```



#### continue与break

- break:退出循环
- continue:结束本次循环，继续下次循环
- 区别：
  - continue：一般用于排除或者跳过某个选项
  - break：如果结果已经得到，后续循环不再需要的时候可以使用




#### for循环

基本语法如下：

```javascript
for(变量起始值;终止条件;变量变化值) {
    循环体
}
```



## 数组

### 数组的基本使用

声明语法如下

``let 数组名 = [数据1，数据2，.....]``

``let arr = new Array(数据1,数据2,数据3...)``

- 数组是按照顺序保存，所以每个数据都有自己的编号

- 下标从0开始

- **数组可以存储==任意类型==的数据**

- **取值**按照 **数组名[下标]**进行

- 数组名.length 用于获取数组长度  

- **修改数组**的值按照 数组名[下标]=新值 进行
  - **注意**
  - 如果数组初始化为空，后续为某一个下标赋值后，那么该下标前面的所有位置都是undefined，且数组长度变为到该赋值的位置

- **数组新增元素**

  - push方法：==将一个或多个元素添加到元素的**末尾**并且返回新数组的长度==
    - 语法：``arr.push(ele1,ele2,....)``
  - unshift方法：==将一个或多个元素添加到数组的**开头**，并且返回新数组的长度==
    - 语法：``arr.unshift(ele1,ele2,....)``

- **数组删除元素**

  - pop()方法：从数组中删除**最后一个元素**，并且返回该元素的值
    - 语法：``arr.pop()``
    - 注意：如果在空数组上调用pop方法，则会返回undefined
  - shift()方法：从数组中删除 **第一个元素**，并且返回该元素的值
    - 语法：``arr.shift()``
    - 注意：如果在空数组上调用shift方法，则会返回undefined
  - **splice()方法**：删除/删除并添加数组指定元素
    - 语法：

  ```javascript
  splice(start)
  splice(start, deleteCount)
  splice(start, deleteCount, item1)
  splice(start, deleteCount, item1, item2, itemN)
  ```

  - 参数
    - start表示要开始改变数组的位置
      - 负索引则从数组末尾开始计算（即start<0,则使用start+arr.length）
      - 如果start<-arr.length，使用0
      - 如果start>=arr.length，则不会删除元素，但是如果有传递想要添加的元素作为参数，则添加提供的元素到数组
      - 如果不传递start参数则不会删除任何元素
      - 如果传递undefined作为参数，则被当做0
    - deleteCount
      - 表示从数组中要从start开始删除的元素个数
      - 如果省略了deleteCount则删除从start到数组末尾的全部元素，但是如果你想同时添加元素到数组，则应该传递Infinity值
      - 如果deleteCount的值<=0则不会删除元素了
    - item1...itemN
      - 从start开始要加入到数组的元素
      - 如果不指定元素则splice只能删除元素
  - 返回值
    - 一个包含了删除元素的数组
  - 参考[Array.prototype.splice() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)




### 数组排序

- sort方法
  - 语法
  - ``arr.sort(fun)``
- 默认情况下，sort方法就地对数组元素进行排序，并且返回对相同数组的引用，默认排序是将元素转换为字符串，然后按照它们的utf-16码值升序排序
- 参数fun
  - fun是定义排序顺序的函数，该函数返回值为正数则升序排序，反之为降序排序

![69138341283](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691383412839.png)



### map与join

- map可以遍历数组**处理数据**，并且返回新的数组

```javascript
    const arr = ['pink', 'red', 'blue']
    const newArr = arr.map(function (ele, index) {
      console.log(ele);
      console.log(index);
      return ele + '颜色'
    })
    console.log(newArr);
```

- join方法用于把数组中的所有元素**转化为一个字符串**
- 语法：

![69215563024](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1692155630241.png)

- 参数：
  - 数组元素是通过参数里面指定的分隔符进行分隔的，默认是用逗号分隔，空字符串则所有元素之间没有字符隔开




### 遍历数组forEach()

![69251946723](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1692519467234.png)

结合前面学的箭头函数，有如下写法

```javascript
    const arr = ['a', 'b', 'c']
    arr.forEach((ele, index) => console.log(index, ele))
```

- 该方法用于遍历数组对象，没有返回值




### 遍历数组for in

```javascript
for(let index in arr) {
    console.log(index)//得到下标
    console.log(arr[index])//得到数组值
}
```






### 筛选数组filter()方法

- filter()方法创建一个新的数组并返回，新数组中的元素是通过检查指定数组中符合条件的所有元素
- 主要使用场景：**筛选数组符合条件的元素**，并返回筛选之后元素的新数组

![69252245579](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1692522455796.png)




## 函数

### 为什么需要函数

- 函数
  - function，是被设计执行特点任务的代码块
- 说明：
  - 函数可以把具有相同/相似逻辑的代码封装起来，通过函数调用执行这些代码，有利于精简代码分别复用



### 函数的使用

- 函数的声明语法：

```javascript
function 函数名() {
    函数体
}
```

- 函数名的命名规则：
  - 和变量命名基本一致
  - 尽量使用小驼峰命名法
  - 前缀一个为动词
- 函数的调用

```javascript
函数名()
```

 

- 细节：
  - 两个相同的函数，那么后面的函数会覆盖前面的





### 函数的传参

- 声明语法

```javascript
function 函数名(参数列表) {
    函数体
}
```

- 参数列表
  - 声明这个函数需要传入几个数据
  - 多个数据之间使用逗号隔开
  - JavaScript允许实参与形参个数不一致但是尽量保持一致
    - 如果形参过多，会自动初始化为undefined
    - 实参过多，自动忽略
- 参数默认值
  - 形参可以看作变量，但是如果其中一个形参未被赋值，那么默认是undefined
  - 但是我们可以认为赋予形参默认值
  - 这个默认值只有在缺少实参传递时才会执行

例如：

```javascript
    function add(num1 = 0, num2 = 0) {
      document.write(num1 + num2)
    }
```



### 函数的返回值

与其他高级程序设计语言类似的

- 语法
  - ``return 数据``
- 细节：
  - return 语句会立刻结束当前函数
  - 可以没有return语句，此时函数默认返回值为undefined
  - 如果希望返回多个元素，可以将多个元素放到数组里返回



### 作用域

#### 全局作用域

- 即作用于所有代码执行的环境（整个script标签内部）或者一个独立的js文件



#### 局部作用域

作用于函数内的代码环境，就是局部作用域，也叫函数作用域



#### 全局变量

- 函数外部let声明的变量即全局变量	
  - 全局变量在任何区域都可以访问和修改



#### 局部变量

- 即函数内部let声明的变量
  - 局部变量只能在当前函数内部访问和修改

- 注意
  - 如果函数内部变量没有声明直接赋值，也当作局部变量来看
  - 函数内部的形参也看作局部变量



#### 变量的访问原则

- 如果函数中还有函数，那么在这个作用域中又可以产生一个作用域
- **访问原则**：在能够访问到的情况下 ，先局部，局部没有再找全局






### 匿名函数

- 匿名函数即没有名字的函数，无法直接使用
- 使用方式：
  - **函数表达式**：将匿名函数赋值给一个变量，并且通过变量名称进行调用，我们将其称为函数表达式
  - 语法：

```javascript
let fn = function() {
    //函数体
}
fn()//调用
//其中函数的参数使用与普通函数一致
```

-  **立即执行函数**：即无需调用可以立即执行的函数，它可以防止变量之间的污染
  - 语法：

![69139638886](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691396388868.png)

- 注意
  - ==多个立即函数要用分号;隔开，否则会报错==
  - 有时候立即执行函数也可以用于函数名



- 匿名函数与具名函数的**区别**
  - 具名函数的调用可以写到任何地方（因为有函数提升）
  - 函数表达式必须先声明函数表达式，后调用（因为使用了let进行声明）


> 可能会遇到另外一种写法
>
> 即在函数的前面加上一个算术运算符，而忽略将函数包围整体的括号的写法



## 对象

### 对象是什么

- 对象（object）：JavaScript中的一种数据类型
- 可以理解为一种无序的数据集合，注意数组是有序的数据集合



### 对象的使用

- 声明对象的语法

```javascript
let 对象名 = {}
let 对象名 = new Object()
```

其中{}是对象字面量

- 对象中有属性和方法组成
#### 属性
  - 属性都是成对出现的，包括属性名和值，它们之间使用英文:隔开
  - 多个属性之间使用英文,隔开
  - 属性就是依附在对象上的变量
  - 属性名可以使用""或''，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```javascript
let 对象名 = {
    属性名: 属性值,
    方法名: 函数
}
```

- 查
  - 语法：``对象名.属性名``
  - 语法2：``对象名['属性名']``
- 改
  - 语法：``对象名.属性名 = 新属性值``
- 增
  - 语法：``对象名.新属性名 = 新属性值``
- 删（了解）
  - 语法：``delete 对象名.属性名``




#### 方法

- 方法是依附在对象中的函数
- 方法是由方法名和函数两部分构成，它们之间使用:隔开
- 同样的，方法名可以使用""或''，一般情况下省略，除非遇到特殊符号如空格、中横线等
- 多个属性/方法之间使用英文，隔开

```javascript
    let obj = {
      uname: '刘德华',
      sing: function () {
        console.log('冰雨')
      },//别忘了逗号
      dance: function () {
      	console.log('跳舞~')     
      }
    }
    obj.sing()
```

>实际上，对象内也可以动态添加方法(**用等号**)
>
>```javascript
>    obj = {}
>    obj.name = 'weifeng'
>    obj['age'] = '35'
>    obj.sing = function () {
>      console.log('反方向的钟');
>    }
>    console.log(obj);
>```



#### es6简写属性与方法

##### 属性

**当对象的属性名与属性值相同时**可以进行简写

```javascript
const foo = 'bar';
const baz = {foo};
// 等同于
const baz = {foo: foo};

function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}

```

##### 方法

```javascript
const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};


let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```



### 遍历对象

- **for in** 

```javascript
    let obj = {
      uname: 'weifeng',
      age: 35,
      gender: '男'
    }
    for (let key in obj) {
      console.log(key);//得到属性名 'uname','age','gender'
      // console.log(obj.key);//得到undefined因为obj里并没有key这个属性名（存在二义性）
      // console.log(obj.'uname');
      //因此我们使用
      console.log(obj[key]);
    }
```

- 因为key是变量，所以必须使用[]语法解析 

实际上，该语法也可用于数组**（不推荐）**

```javascript
    let color = ['blue', 'red', 'yellow']
    for (let key in color) {
      console.log(key);//得到每个元素的下标 但是 是字符串类型的！
      console.log(color[key]);//因此容易导致问题
    }
```



### 内置对象

#### 内置对象是什么

- JavaScript中内部为我们提供的对象，包含各种属性和方法给开发者使用
- 前面我们使用过的输出语句document.write()，console.log()都是内置对象提供的方法

#### 内置对象Math

- Math对象是JavaScript中提供的一个关于数学的对象
- 其中包含了一系列做数学运算的方法
  - random:生成0-1之间的随机数（包括0不包括1）
  - ceil:向上取整
  - floor:向下取整
  - max:找最大数
  - min:找最小数
  - pow:幂运算
  - abs:绝对值
  - [Math参考文档 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)




##### 生成任意范围随机数

![69148292416](D:\MyProject\HTMLCSSJavaScript\JavaScript\笔记\assets\1691482924168.png)

>数组随机取元素实现
>
>```javascript
>    let arr = ['blue', 'green', 'red']
>    rdm = Math.floor(Math.random() * arr.length)//生成[0,3)之间的随机数
>    console.log(arr[rdm]);
>```
>
>



