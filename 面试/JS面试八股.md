# JS面试必备

## JavaScript中的this

### 如何确认this的值

**区分为严格模式下与非严格模式下，在非严格模式this总是指向一个对象，严格模式下则不一定**

1. **全局浏览器执行环境**中的this指向全局对象window(**严格非严格都一样**)
2. **函数内部**，取决于函数**被调用**的方式
   1. 直接调用的this值：
      1. 非严格：**指向全局对象window(因为是window调用的函数)**
      2. **严格：指向undefined**
   2. **对象方法调用的this值指向调用者(严格非严格都一样)**

> 如何开启严格模式：
>
> 注意：开启严格模式时的``use strict``需要写在代码顶端
>
> ![69959155638](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1699591556389.png)





### 指定this的值

- 有**两类方法**可以指定this的值：
  - **调用时指定**：
    - **call**
    - **apply**
    - 二者的不同之处在于参数传递apply传递的是一个数组形式(~~以a开头所以是array~~)![70687846743](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706878467431.png)
  - **创建时指定**：
    - **bind**
    - **箭头函数**(即箭头函数里的this取决于上级作用域)
    - ![70687855347](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706878553474.png)



### 手写call、apply、bind

#### 手写call

1.   定义myCall方法在Function的原型上
2. 设置this并调用原函数(利用对象的方法的this为对象本身这个原理)
3. 接收剩余参数并返回结果
4. 调优：为避免属性名重名使用Symbol类型作为属性名(获取对应属性/设置属性时一定使用中括号语法)

```js
// 在Function原型上定义函数myCall
Function.prototype.myCall = function(thisArg,...args) {
  // console.log('hi');
  // 设置当前函数的this为传入的参数this
  // 利用对象中的方法的this为对象本身这个原理实现
  // 即 希望当前this指向谁 就成为谁的一个方法
  // 这里的this是指向func本身
  // 为避免属性名f重名，使用Symbol进行调优
  // 注意一定需要使用中括号语法获取对应属性/设置属性，否则对象的属性就叫key了！！！
  const key = Symbol('key')
  thisArg[key] = this
  // 调用原函数func
  const res = thisArg[key](...args)
  // 删除新增的方法
  delete thisArg[key]
  // 返回计算结果
  return res
}


const person = {
  name:'haha',
  age:18
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const res = func.myCall(person,1,11)
// const res = func(1,2)
console.log('返回值：',res);
```

#### 手写apply

与手写call方法的思路一样，只是传入参数的形式不同，代码实现上只有细微不同

```js
Function.prototype.myApply = function(thisArg,args) {
  const key = Symbol()
  thisArg[key] = this
  const res = thisArg[key](...args)
  delete thisArg[key]
  return res
}


const person = {
  name:'haha',
  age:18
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const res = func.myApply(person,[1,11])//传递数组形式的参数
// const res = func(1,2)
console.log('返回值：',res);
```

#### 手写bind

实现bind需要使用call或apply进行this指针的改变

```js
Function.prototype.myBind = function(thisArg,...args) {
  // 返回一个新函数，其中新函数的this指针指向thisArg
  // 注意这里一定要使用箭头函数才能得到原函数
  return (...reArgs)=> {
    return this.call(thisArg,...args,...reArgs)
  }
}


const person = {
  name:'haha',
  age:18
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const bindFun = func.myBind(person,1)
// const res = func(1,2)
console.log('返回值：',bindFun(9));
```





## JavaScript继承

继承：继承可以使得子类具有父类的各种属性和方法，而不需重新编写重复代码

1. ES6：基于**Class**实现继承
   1. class核心语法
   2. class实现继承
   3. 静态属性和私有属性
2. ES5：基于**原型和构造函数**实现继承
   1. 原型链继承
   2. 借用构造函数继承
   3. 组合继承
   4. 原型式继承
   5. 寄生式继承
   6. **寄生组合式继承**



### ES6-Class核心语法

```js
class Person {
  // 公有属性(可以进行默认值赋值)
  name
  age = 18

  // 构造函数
  constructor(name) {
    this.name = name
  }

  // 公有方法
  sayHi() {
    console.log('hi，我是'+this.name);
  }
}

const p = new Person('张三')
console.log(p);
p.sayHi()
```

- 细节：
  - 类命名一般**大写开头**
  - 方法内可以通过this获取到当前属性/方法



### ES6-Class实现继承

**extends**：关键字用于创建一个类是另外一个类的子类

**super**：关键字用于访问对象字面量或类的原型上的属性，或调用父类的构造函数

```js
class Person {
  // 公有属性(可以进行默认值赋值)
  name
  age = 18

  // 构造函数
  constructor(name) {
    this.name = name
  }

  // 公有方法
  sayHi() {
    console.log('hi，我是来自父类的'+this.name);
  }
}

// const p = new Person('张三')
// console.log(p);
// p.sayHi()

class Student extends Person {
  stuId
  constructor(name,stuId) {
    super(name)
    this.stuId = stuId
  }
  sayHi() {
    console.log('子类的sayHi');
  }
}

const s = new Student('zs',18)
console.log(s);
s.sayHi()
```

- 细节：
  - 在子类的构造函数内必须使用super关键字调用父类的构造函数进行初始化，否则会报错
  - 当父子类存在同名的方法/属性时会采用"就近原则"



### ES6-Class静态属性与私有属性

- **静态**：class类通过**static关键字**定义静态属性/方法，不能在类的实例上调用静态方法，而应该通过**类本身调用**(即静态属性/方法可以被所有类的实例对象共享使用)
- **私有**：类属性默认情况下是公有的，但可以通过增加**前缀**``#``的方法定义私有类字段/方法，**注意声明和访问时都需要加``#``**，且私有属性/方法只能在类的内部使用

```js
class Test {
  static stInfo = '我是静态属性'
  static stMethod() {
    console.log('我是静态方法');
  }

  #pInfo = '我是私有属性'
  #pMethod() {
    console.log('我是私有方法');
  }
  test() {
    console.log(this.#pInfo);
    this.#pMethod()
  }
}

console.log(Test.stInfo);
Test.stMethod()

const t = new Test()
t.test()


```

- 细节
  - 实际开发中在浏览器的控制台中可以直接获取到类私有属性/方法(实际为了方便调试)



### ES5-寄生组合式继承

实际在ES6的class经过babel进行语法降级后就是寄生组合式继承

所谓的寄生组合式继承，就是**借用构造函数来继承属性，通过原型链的混成形式来继承方法**

```js
function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function() {
  console.log('你好，我是'+this.name);
}

// 通过构造函数继承属性
function Student(name) {
  // 这里的this指向Student的实例对象
  Person.call(this,name)
}
// 通过原型链继承方法
// Object.create得到一个对象与Person的原型一样的对象，同时覆盖修改construct为新的构造函数
const prototype = Object.create(Person.prototype,{
  construct: {
    value:Student
  }
})

Student.prototype = prototype

const s = new Student('ls')
console.log(s);
s.sayHi()
```











## fetch

fetch：是**浏览器内置的api**，用于发送网络请求

- axios VS ajax VS fetch

  ![69959231426](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1699592314260.png)






### 核心语法

* 细节
  * fetch只有在遇到网络错误时，返回的promise才会被reject，正常状态码的异常不会被reject，因此需要判断状态码

```js
  <script>
    const fetchFn = async () => {
      const p = new URLSearchParams({
        pname:'广东省',
        cname:'深圳市'
      })
      const res = await fetch('http://hmajax.itheima.net/api/area?'+p.toString())
      // const res = await fetch('http://hmajax.itheima.net/api/area1?123'+p.toString())
      // fatch返回一个promise对象解析后是Response对象
      console.log(res);
      if(res.status>=200&&res.status<300) {
        // 通过res.json()解析数据返回的是promise对象
        const data = await res.json()
        console.log(data);
      }else {
        console.log('请求异常'+res.status);
      }
    }
    fetchFn()
  </script>
```



### 提交FormData

[fetch() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)

- 在提交FormData时，fetch默认会带上请求头

![70695004517](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706950045175.png)

```js
<body>
  <input type="file" class="ipt">
  <img class="icon" src="" alt="">
  <script>
    document.querySelector('.ipt').addEventListener('change',async function() {
      const img = this.files[0]
      const fd = new FormData()
      fd.append('img',img)
      const res = await fetch('http://hmajax.itheima.net/api/uploadimg',{
        method:'post',
        body:fd
      })
      if(res.status>=200&&res.status<300) {
        const data = await res.json()
        console.log(data);
        document.querySelector('.icon').src = data.data.url
      }
    })
  </script>
</body>
```



### 提交JSON

* 提交JSON需要我们手动添加请求头信息

[fetch() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)

![70695064426](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706950644263.png)

```js
  <script>
    async function fetchFn() {
      const headers = new Headers()
      headers.append('content-type','application/json')
      const res = await fetch('http://hmajax.itheima.net/api/register',{
        method:'post',
        headers:headers,
        body: JSON.stringify({
          username:'zwfffffffff1',
          password:'123456'
        })
      })
      if(res.status>=200&&res.status<300) {
        const data = await res.json()
        console.log(data);
      }
    }
    fetchFn()
  </script>
```



## Generator	

Generator是ES6提供的一种异步编程解决方案(async await是Generator的语法糖)

![70695519695](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706955196954.png)



### 核心语法

- Generator对象由生成器函数返回并且它符合可迭代协议和迭代器协议
- 生成器函数在执行时可以暂停，后面又可以从暂停处继续执行

```js
  <script>
    // 定义生成器函数
    function* myGenerator() {
      console.log('执行啦');
      yield 'a'
      yield 'b'
      yield 'c'
    }

    const generator = myGenerator()
    // for of 遍历得到每一个yield的结果
    for(const iterator of generator) {
      console.log(iterator);
    }
  </script>
```

![70695568959](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706955689596.png)

- 细节：
  - 这里的done字段标志着还可不可以执行



### 管理异步

- 只需在异步操作之前加上``yield``

![70695997245](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1706959972451.png)

```js
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    function* myGeneration() {
      yield axios('http://hmajax.itheima.net/api/city?pname=北京')
      yield axios('http://hmajax.itheima.net/api/city?pname=广东省')
    }
    const city = myGeneration()

    city.next().value.then((res)=> {
      console.log(res);
      return city.next().value
    }).then(res=> {
      console.log(res);
    })
  </script>
```



## 手写Promise

### 核心功能

- 实现构造函数
  1. 定义类
  2. 添加构造函数
  3. 定义resolve和reject
  4. 执行回调函数

```js
  <script>
    class MyPromise {
      constructor(func) {
        const resolve = (result) => {
          console.log('resolve-',result);
        }
        const reject = (result) => {
          console.log('reject-',result);
        }
        func(resolve,reject)
      }
    }


    const p = new MyPromise((resolve,reject)=>{
      console.log('执行啦');
      resolve('success')
      reject('error')
    })
  </script>
```



- 状态及原因
  1. 添加状态
  2. 添加原因
  3. 调整resolve/reject
  4. 状态不可逆

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    class MyPromise {
      state = PENDING
      result = undefined

      constructor(func) {
        const resolve = (result) => {
          if(this.state===PENDING) {
            this.state = FULFILLED
            this.result = result
          }
        }
        const reject = (result) => {
          if(this.state===PENDING) {
            this.state = REJECTED
            this.result = result
          }
        }
        func(resolve,reject)
      }
    }


    const p = new MyPromise((resolve,reject)=>{
      resolve('success')
      reject('error')
    })
  </script>
```



- 成功失败回调实现(这里没有实现catch)
  1. 添加实例方法
  2. 参数判断(参考文档)
  3. 执行成功回调
  4. 执行失败回调

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    class MyPromise {
      state = PENDING
      result = undefined

      constructor(func) {
        const resolve = (result) => {
          if(this.state===PENDING) {
            this.state = FULFILLED
            this.result = result
          }
        }
        const reject = (result) => {
          if(this.state===PENDING) {
            this.state = REJECTED
            this.result = result
          }
        }
        func(resolve,reject)
      }
    
      then(onFulfilled,onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function'?onFulfilled:x=>x
        onRejected = typeof onRejected === 'function'?onRejected:x=>{throw x}
        // 根据不同状态执行不同处理逻辑
        if(this.state===FULFILLED) {
          onFulfilled(this.result)
        }else if(this.state===REJECTED) {
          onRejected(this.result)
        }
      }
    }


    const p = new MyPromise((resolve,reject)=>{
      // 根据异步做判断执行resolve/reject
      // resolve('success12')
      reject('error12')
    })

    p.then(res=> {
      console.log(res);
    },err=>{
      console.log(err);
    })
  </script>
```



- 异步和多次调用
  1. 定义实例属性
  2. 保存回调函数
  3. 调用成功回调
  4. 调用失败回调

```js
<script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }
        // 根据不同状态执行不同处理逻辑
        if (this.state === FULFILLED) {
          // 状态已经改变则执行对应处理逻辑
          onFulfilled(this.result)
        } else if (this.state === REJECTED) {
          onRejected(this.result)
        } else if (this.state === PENDING) {
          // 此时状态还未改变
          // 存储处理逻辑
          this.#handlers.push({
            onFulfilled,
            onRejected
          })
        }
      }
    }


    const p = new MyPromise((resolve, reject) => {
      // 根据异步做判断执行resolve/reject
      setTimeout(() => {
        // resolve('success12')
        reject('error12')
      }, 2000)
    })

    p.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })

    p.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  </script>
</body>
```



- 实现.then异步执行
  - **选用api：queueMicrotask、MutationObserver、setTimeout**
  - 这些API都是内置全局API
  - 语法：
    - queueMicrotask：传入一个回调函数，该回调函数即可以异步任务的形式执行
    - MutationObserver：是一个构造函数，用于监视一个结点的变化，结点发生变化则以异步形式执行传入的回调函数![70703113150](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1707031131507.png)
- 实现步骤：
  - 定义函数
  - 调用API
  - 使用封装函数

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }
        // 根据不同状态执行不同处理逻辑
        if (this.state === FULFILLED) {
          // 状态已经改变则执行对应处理逻辑
          // 将执行的回调函数都变成异步执行
          runAsyncTask(() => {
            onFulfilled(this.result)
          })
        } else if (this.state === REJECTED) {
          runAsyncTask(() => {
            onRejected(this.result)
          })
        } else if (this.state === PENDING) {
          // 此时状态还未改变
          // 存储处理逻辑
          this.#handlers.push({
            onFulfilled: () => {
              runAsyncTask(()=>{
                onFulfilled(this.result)
              })
            },
            onRejected: () => {
              runAsyncTask(()=>{
                onRejected(this.result)
              })
            }
          })
        }
      }
    }


    const p = new MyPromise((resolve, reject) => {
      reject('error12')
    })
    console.log(1);
    p.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    console.log(2);
    // p.then(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // })
  </script>
```



- 链式编程实现
- fulfilled状态

![70703419868](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1707034198682.png)



```js
<script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolve(x)
              } catch (err) {
                reject(err)
              }
            })
          } else if (this.state === REJECTED) {
            runAsyncTask(() => {
              onRejected(this.result)
            })
          } else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  onFulfilled(this.result)
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  onRejected(this.result)
                })
              }
            })
          }
        })

        return p2
      }
    }


    const p = new MyPromise((resolve, reject) => {
      resolve('success')
    })
    p.then(res => {
      console.log('p1', res);
      throw 'throw-error'
      // return 2
    }).then(res => {
      console.log('p2:', res);
    }, err => {
      console.log('p2', err);
    })
  </script>
</body>
```





- fulfilled状态下处理返回的promise

![70703726045](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1707037260450.png)

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                if(x instanceof MyPromise) {// 当前得到返回值是一个promise
                  x.then(res=>{
                    resolve(res)// 将结果传给内部创建的promise
                  },err=>{
                    reject(err)
                  })
                }else {
                  resolve(x)
                }
              } catch (err) {
                reject(err)
              }
            })
          } else if (this.state === REJECTED) {
            runAsyncTask(() => {
              onRejected(this.result)
            })
          } else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  onFulfilled(this.result)
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  onRejected(this.result)
                })
              }
            })
          }
        })

        return p2
      }
    }


    const p = new MyPromise((resolve, reject) => {
      resolve(1)
    })

    p.then(res=>{
      return new MyPromise((resolve,reject)=>{
        resolve(2)
        // reject('err')
      })
    }).then(res=>{
      console.log('p2',res);
    },err=>{
      console.log('p2',err);
    })
    
  </script>
```

- 处理重复引用-fulfilled状态

![70703823784](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1707038237840.png)

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)

                if(x===p2) {
                  throw new TypeError('重复引用错误~')
                }

                if(x instanceof MyPromise) {
                  x.then(res=>{
                    resolve(res)
                  },err=>{
                    reject(err)
                  })
                }else {
                  resolve(x)
                }
              } catch (err) {
                reject(err)
              }
            })
          } else if (this.state === REJECTED) {
            runAsyncTask(() => {
              onRejected(this.result)
            })
          } else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  onFulfilled(this.result)
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  onRejected(this.result)
                })
              }
            })
          }
        })

        return p2
      }
    }


    const p = new MyPromise((resolve, reject) => {
      resolve(1)
    })

    const p2 = p.then(res=>{
      return p2
    })
    
    p2.then(res=>{
      console.log('p2',res);
    },err=>{
      console.log('p2',err);
    })
    
  </script>
```



- rejected状态支持链式编程
  1. 处理异常
  2. 获取返回值
  3. 抽取fulfilled状态处理逻辑为函数
  4. 调用函数


```js
 <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  onFulfilled(this.result)
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  onRejected(this.result)
                })
              }
            })
          }
        })

        return p2
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }

    const p = new MyPromise((resolve, reject) => {
      reject(1)
    })

    const p2 = p.then(undefined, err => {
      // throw 'error'
      // return p2
      // return 2
      return new MyPromise((resolve,reject)=>{
        // resolve('p2-2')
        reject('err-2')
      })
    })

    p2.then(res => {
      console.log('p2', res);
    }, err => {
      console.log('p2', err);
    })

  </script>
```



- pending状态支持链式编程

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        func(resolve, reject)
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }

    const p = new MyPromise((resolve, reject) => {
      setTimeout(()=>{
        resolve(1)
      },1000)
    })

    const p2 = p.then(res=>{
      // throw 'error'
      // return p2
      // return 2
      return new MyPromise((resolve,reject)=>{
        resolve('p2-2')
        // reject('err-2')
      })
    })

    p2.then(res => {
      console.log('p2', res);
    }, err => {
      console.log('p2', err);
    })

  </script>
```



### 实例方法

#### 实现catch

利用前面实现的.then方法实现即可

注意异常处理

```js
 <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    
      catch(onRejected) {
        return this.then(undefined,onRejected)
      }
    
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }

    const p = new MyPromise((resolve, reject) => {
      // reject('error')
      throw 'error'
    })

    p.then(res => {
      console.log('p', res);
    }).catch(err => {
      console.log('p', err);
    })

  </script>
```



#### 实现finally

思路即还是内部调用.then只不过传入的两个回调函数是一样的，代表不论成功或失败都执行一样的逻辑

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    
      catch(onRejected) {
        return this.then(undefined,onRejected)
      }
    
      finally(onFinally) {
        return this.then(onFinally,onFinally)
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }

    const p = new MyPromise((resolve, reject) => {
      // resolve(1)
      // reject('error')
      throw 'error1'
    })

    p.then(res => {
      console.log('p', res);
    }).catch(err => {
      console.log('p', err);
    }).finally(()=>{
      console.log('finally');
    })

  </script>
```





### 静态方法

#### Promise.resolve()

首先明确，该静态方法的作用是什么，如果传入一个值可以将该值转换为Promise对象(同时修改状态为fulfilled)，如果该值本身就是promise对象则原路返回

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    
      catch(onRejected) {
        return this.then(undefined,onRejected)
      }
    
      finally(onFinally) {
        return this.then(onFinally,onFinally)
      }

      static resolve(val) {
        if(val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve,reject)=>{
          resolve(val)
        })
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }

    MyPromise.resolve(new MyPromise((resolve,reject)=>{
      // resolve(1)
      // reject('err')
      throw 'error'
    })).then(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })

    MyPromise.resolve('hahah').then(res=>{
      console.log(res);
    })
  </script>
```





#### Promise.reject()

直接返回一个reject的promise即可

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }


    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    
      catch(onRejected) {
        return this.then(undefined,onRejected)
      }
    
      finally(onFinally) {
        return this.then(onFinally,onFinally)
      }

      static resolve(val) {
        if(val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve,reject)=>{
          resolve(val)
        })
      }

      static reject(val) {
        return new MyPromise((undefined,reject)=>{
          reject(val)
        })
      }
    }


    MyPromise.reject('err').catch(err=>{
      console.log(err);
    })
  </script>
```





#### Promise.race()

该方法获取一个Promise对象数组，然后返回响应最快的promise对象(不论成功还是失败)

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    function resolvePromise(x,p2,resolve,reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }


    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x,p2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x,p2,resolve,reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }
    
      catch(onRejected) {
        return this.then(undefined,onRejected)
      }
    
      finally(onFinally) {
        return this.then(onFinally,onFinally)
      }

      static resolve(val) {
        if(val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve,reject)=>{
          resolve(val)
        })
      }

      static reject(val) {
        return new MyPromise((undefined,reject)=>{
          reject(val)
        })
      }
    
      static race(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve,reject)=>{
          // 判断传入参数是否为数组
          if(!Array.isArray(promises)) {
            return reject(new TypeError('race方法的参数不能为非数组~'))
          }
          // 等待第一个敲定
          promises.forEach(p=>{
            // 注意要将所有的数组元素转换为promise对象
            MyPromise.resolve(p).then(res=>{resolve(res)},err=>{reject(err)})
          })
        })
      }
    }

    const p1 = new MyPromise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(1)
      },2000)
    })

    const p2 = new MyPromise((resolve,reject)=>{
      setTimeout(()=>{
        reject(2)
      },1000)
    })

    MyPromise.race([p1,p2,'nice']).then(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  </script>
```



#### Promise.all()

 该静态方法的作用是等待传入的promise数组全部promise兑现/成功后返回一个结果promise数组，但是如果存在失败的情况，则返回第一个失败的结果promise

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    function resolvePromise(x, p2, resolve, reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }


    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }

      catch(onRejected) {
        return this.then(undefined, onRejected)
      }

      finally(onFinally) {
        return this.then(onFinally, onFinally)
      }

      static resolve(val) {
        if (val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve, reject) => {
          resolve(val)
        })
      }

      static reject(val) {
        return new MyPromise((undefined, reject) => {
          reject(val)
        })
      }

      static race(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('race方法的参数不能为非数组~'))
          }
          // 等待第一个敲定
          promises.forEach(p => {
            // 注意要将所有的数组元素转换为promise对象
            MyPromise.resolve(p).then(res => { resolve(res) }, err => { reject(err) })
          })
        })
      }

      static all(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('all方法的参数不能为非数组~'))
          }
          // 如果是空数组则直接兑现
          promises.length === 0 && resolve(promises)
          // 非空数组
          const results = []
          let count = 0
          // count用于辅助判断是否全部兑现
          promises.forEach((p, index) => {
            // 将数组元素都变为promise实例
            MyPromise.resolve(p).then(res => {
              // 等待全部兑现
              // 返回一个数组
              results[index] = res
              count++
              count === promises.length && resolve(results)
            },
              err => {
                // 存在一个失败则直接reject
                reject(err)
              })
          })
        })
      }
    }

    const p1 = MyPromise.resolve(1)

    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    })

    const p3 = 3

    MyPromise.all([p1, p2, p3]).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  </script>
```



#### Promise.allSelected()

首先需要知道这个静态方法的作用：

![70770830664](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1707708306645.png)

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    function resolvePromise(x, p2, resolve, reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }


    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }

      catch(onRejected) {
        return this.then(undefined, onRejected)
      }

      finally(onFinally) {
        return this.then(onFinally, onFinally)
      }

      static resolve(val) {
        if (val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve, reject) => {
          resolve(val)
        })
      }

      static reject(val) {
        return new MyPromise((undefined, reject) => {
          reject(val)
        })
      }

      static race(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('race方法的参数不能为非数组~'))
          }
          // 等待第一个敲定
          promises.forEach(p => {
            // 注意要将所有的数组元素转换为promise对象
            MyPromise.resolve(p).then(res => { resolve(res) }, err => { reject(err) })
          })
        })
      }

      static all(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('all方法的参数不能为非数组~'))
          }
          // 如果是空数组则直接兑现
          promises.length === 0 && resolve(promises)
          // 非空数组
          const results = []
          let count = 0
          // count用于辅助判断是否全部兑现
          promises.forEach((p, index) => {
            // 将数组元素都变为promise实例
            MyPromise.resolve(p).then(res => {
              // 等待全部兑现
              // 返回一个数组
              results[index] = res
              count++
              count === promises.length && resolve(results)
            },
              err => {
                // 存在一个失败则直接reject
                reject(err)
              })
          })
        })
      }

      static allSelected(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('all方法的参数不能为非数组~'))
          }
          // 如果是空数组则直接兑现
          promises.length === 0 && resolve(promises)
          // 非空数组
          const results = []
          let count = 0
          // count用于辅助判断是否全部兑现
          promises.forEach((p, index) => {
            // 将数组元素都变为promise实例
            MyPromise.resolve(p).then(res => {
              // 等待全部兑现
              // 返回一个数组
              results[index] = { status: FULFILLED, value: res }
              count++
              count === promises.length && resolve(results)
            },
              err => {
                results[index] = { status: REJECTED, reason: err }
                count++
                count === promises.length && resolve(results)
              })
          })
        })
      }


    }

    const p1 = MyPromise.resolve(1)

    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        // resolve(2)
        reject(2)
      }, 1000)
    })

    const p3 = 3

    MyPromise.allSelected([p1, p2, p3]).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  </script>
```



#### Promise.any()

该方法将一个promise可迭代对象作为输入，返回一个Promise，当输入的任何一个Promise对象兑现/成功时，这个返回的promise对象则被兑现，并返回第一个兑现的值，当所有promise都被拒绝时/传入空可迭代对象时，则返回拒绝及其原因

```js
  <script>
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function runAsyncTask(callback) {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          callback()
        })
      } else if (typeof MutationObserver === "function") {
        const obs = new MutationObserver(callback)
        const divNode = document.createElement('div')
        obs.observe(divNode, { childList: true })
        divNode.innerText = '随便写'
      } else {
        setTimeout(callback, 0)
      }
    }

    function resolvePromise(x, p2, resolve, reject) {
      // 判断重复引用
      if (x === p2) {
        throw new TypeError('重复引用错误~')
      }

      if (x instanceof MyPromise) {// 判断返回值是否是promise
        x.then(res => {
          resolve(res) // 将传入的值给到内置new的promise
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    }


    class MyPromise {
      state = PENDING
      result = undefined
      // 存储处理逻辑
      #handlers = []

      constructor(func) {
        const resolve = (result) => {
          if (this.state === PENDING) {
            this.state = FULFILLED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onFulfilled }) => {
              onFulfilled(this.result)
            })
          }
        }
        const reject = (result) => {
          if (this.state === PENDING) {
            this.state = REJECTED
            this.result = result
            // 当状态改变时执行对应操作
            this.#handlers.forEach(({ onRejected }) => {
              onRejected(this.result)
            })
          }
        }
        try {
          func(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }

      then(onFulfilled, onRejected) {
        // 判断传入参数是否为回调函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : x => { throw x }

        const p2 = new MyPromise((resolve, reject) => {
          // 根据不同状态执行不同处理逻辑
          if (this.state === FULFILLED) {
            // 状态已经改变则执行对应处理逻辑
            // 将执行的回调函数都变成异步执行
            runAsyncTask(() => {
              try {
                const x = onFulfilled(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
          }
          else if (this.state === REJECTED) {
            runAsyncTask(() => {
              try {
                const x = onRejected(this.result)
                resolvePromise(x, p2, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          }
          else if (this.state === PENDING) {
            // 此时状态还未改变
            // 存储处理逻辑
            this.#handlers.push({
              onFulfilled: () => {
                runAsyncTask(() => {
                  try {
                    const x = onFulfilled(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              },
              onRejected: () => {
                runAsyncTask(() => {
                  try {
                    const x = onRejected(this.result)
                    resolvePromise(x, p2, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }
                })
              }
            })
          }
        })

        return p2
      }

      catch(onRejected) {
        return this.then(undefined, onRejected)
      }

      finally(onFinally) {
        return this.then(onFinally, onFinally)
      }

      static resolve(val) {
        if (val instanceof MyPromise) {
          // 传入的是一个promise
          return val
        }
        // 包装为promise返回
        return new MyPromise((resolve, reject) => {
          resolve(val)
        })
      }

      static reject(val) {
        return new MyPromise((undefined, reject) => {
          reject(val)
        })
      }

      static race(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('race方法的参数不能为非数组~'))
          }
          // 等待第一个敲定
          promises.forEach(p => {
            // 注意要将所有的数组元素转换为promise对象
            MyPromise.resolve(p).then(res => { resolve(res) }, err => { reject(err) })
          })
        })
      }

      static all(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('all方法的参数不能为非数组~'))
          }
          // 如果是空数组则直接兑现
          promises.length === 0 && resolve(promises)
          // 非空数组
          const results = []
          let count = 0
          // count用于辅助判断是否全部兑现
          promises.forEach((p, index) => {
            // 将数组元素都变为promise实例
            MyPromise.resolve(p).then(res => {
              // 等待全部兑现
              // 返回一个数组
              results[index] = res
              count++
              count === promises.length && resolve(results)
            },
              err => {
                // 存在一个失败则直接reject
                reject(err)
              })
          })
        })
      }

      static allSelected(promises) {
        // 返回一个promise实例
        return new MyPromise((resolve, reject) => {
          // 判断传入参数是否为数组
          if (!Array.isArray(promises)) {
            return reject(new TypeError('all方法的参数不能为非数组~'))
          }
          // 如果是空数组则直接兑现
          promises.length === 0 && resolve(promises)
          // 非空数组
          const results = []
          let count = 0
          // count用于辅助判断是否全部兑现
          promises.forEach((p, index) => {
            // 将数组元素都变为promise实例
            MyPromise.resolve(p).then(res => {
              // 等待全部兑现
              // 返回一个数组
              results[index] = { status: FULFILLED, value: res }
              count++
              count === promises.length && resolve(results)
            },
              err => {
                results[index] = { status: REJECTED, reason: err }
                count++
                count === promises.length && resolve(results)
              })
          })
        })
      }

      static any(promises) {
        return new MyPromise((resolve,reject)=>{
          // 先判断参数是否为数组
          if(!Array.isArray(promises)) {
            return reject(new TypeError('any方法的参数不能为非数组~'))
          }
          // 是空数组
          promises.length === 0 && reject(new AggregateError(promises,'All promises were rejected'))
          // 等待第一个成功

          const errors = []
          let count = 0
          promises.forEach((p,index)=>{
            // 为避免获取不到then方法，
            MyPromise.resolve(p).then(res=>{
              resolve(res)
            },err=>{
              errors[index] = err
              count++
              count === promises.length && reject(new AggregateError(errors,'All promises were rejected'))
            })
          })
        })
      }
    }

    const p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        // resolve(2)
        reject(1)
      }, 2000)
    })

    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        // resolve(2)
        reject(2)
      }, 1000)
    })

    const p3 = MyPromise.reject(3)

    MyPromise.any([p1, p2, p3]).then(res => {
      console.log(res);
    }, err => {
      console.dir(err);
    })
  </script>
```





## 函数柯里化

### 什么是函数柯里化

- 即 ==接收多个参数的函数变换为接收一个单一参数(最初函数的第一个参数)的函数，并且返回 接收剩余的参数而且返回结果的 新函数== 的**技术**

![70805121817](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708051218176.png)

```js
    function sumMaker(length) {
      // 返回的函数内引用到arr，因此不会被消灭
      let arr = []
      return function fn(...args) {
        arr.push(...args)
        if (arr.length >= length) {
          // 清空数组
          const res = arr.slice(0, length).reduce((item, sum) => sum + item, 0)
          arr = []
          return res
        } else {
          return fn
        }
      }
    }
```



### 实际应用

实际开发中，我们可以利用函数柯里化实现“参数复用：为函数预制通用参数，供多次重复调用”

```js
  <script>
    function typeFnMaker(type) {
      return function isMyType(thing) {
        return typeof thing === type
      }
    }
    const isUndefined = typeFnMaker('undefined')
    const isString = typeFnMaker('string')
    console.log(isUndefined('sad'));
    console.log(isString('sad'));
  </script>
```



## JavaScript中的设计模式

设计模式：在**面向对象软件设计**过程中针对特定问题的简洁而优雅的解决方案

### 工厂模式

- 在JavaScript中，工厂模式的表现形式就是**一个调用即可返回新对象的函数**

![70806577980](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708065779800.png)

具体应用：

1. Vue3-createApp：将全局改变Vue实例的行为，移到Vue实例上
2. axios-create：基于自定义配置新建实例

本质都是为了复用而不污染全局配置



### 单例模式

- 在使用这个模式时，单例对象**整个系统需要保证 只有一个 存在**

```js
  <script>
    class MyClass {
      // 静态属性只能被静态方法访问
      static #instance
      static createInstance() {
        if(this.#instance===undefined) {
          this.#instance = new MyClass()
        }
        return this.#instance
      }
    }
    const s1 = MyClass.createInstance()
    const s2 = MyClass.createInstance()
    console.log(s1===s2);
  </script>
```



### 观察者模式

- 在对象之间定义了一个 **一对多** 的依赖，当一个对象状态改变的时候，所有依赖的对象都会自动收到通知
- 例如JavaScript的事件监听，Vue中的watch

![70806743825](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708067438259.png)



### 发布订阅模式

- 发布订阅模式与前面的观察者模式很相似
- 区别主要在：一个有中间商(发布订阅模式)，一个没有(观察者模式)

![70807006330](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708070063302.png)

#### 应用场景

Vue中的EventBus(用于兄弟组件通信)

1. Vue2：直接使用实例方法(``$on注册事件``、``$emit触发事件``、``$off移除事件``、``$once注册一次性事件``)
2. Vue3：使用第三方库(本质还是实现上述实例方法)





#### 自己实现事件总线

```js
<body>
  <button class="on">注册事件</button>
  <button class="emit">触发事件</button>
  <button class="off">移除事件</button>
  <button class="once-on">一次性事件注册</button>
  <button class="once-emit">一次性事件触发</button>
  <script>
    class MyBus {
      // 存储事件及其回调函数
      #handlers = {}

      $on(eventName,callBack) {
        if(this.#handlers[eventName]===undefined) {
          // 初始化为空数组
          this.#handlers[eventName] = []
        }
        this.#handlers[eventName].push(callBack)
      }

      $emit(eventName,...args) {
        // 避免获取到undefined
        const fns = this.#handlers[eventName] || []
        fns.forEach(callBack => {
          callBack(...args)
        });
      }
    }

    const bus = new MyBus()

    document.querySelector('.on').addEventListener('click',()=>{
      bus.$on('event1',()=>{console.log('我是event的回调函数1');})
      bus.$on('event2',(name,age)=>{console.log('我是event的回调函数2',name,age);})
    })
    document.querySelector('.emit').addEventListener('click',()=>{
      bus.$emit('event1')
      bus.$emit('event2','zs',20)
    })
    document.querySelector('.off').addEventListener('click',()=>{

    })
    document.querySelector('.once-on').addEventListener('click',()=>{

    })
    document.querySelector('.once-emit').addEventListener('click',()=>{

    })
    
  </script>
</body>
```



### 原型模式

原型模式时创建型模式的一种，特点在于**复制**一个已经存在的实例来返回新的实例，而不是新建实例

例子：

1. Object.create：将对象作为原型，返回一个新的对象
2. Vue2中的数组方法：
   1. Vue2对数组的原生的7个方法进行了重写，因此可以拥有响应式





### 代理模式

代理模式就是为一个对象提供一个代用品或占位符，**以便控制对它的访问**

![70833056267](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708330562676.png)

应用场景：缓存代理

需求：第一次查询的数据通过接口获取，重复查询通过缓存获取





### 迭代器模式

可以让用户通过特定的接口巡访容器内每一个元素而不用了解底层的实现(**遍历**)

1. [for...in（用于遍历对象） ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)与 [for...of （不用于遍历对象）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)



## 性能优化

### 防抖

- 常见的前端性能优化方案，可以防止JS高频渲染页面时出现的视觉抖动(卡顿)
- 场景：在触发频率高的事件中，执行耗费性能的操作，连续操作只有最后一次生效
  - 例如输入框输入后显示提示内容

#### 实现

连续事件停止触发后，一段时间没有再次触发，则执行业务代码

![70833182442](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708331824427.png)

![70833198058](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708331980581.png)

> lodash工具库中的debounce防抖实现
>
> ![70833228561](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708332285611.png)
>
> [Lodash 简介 | Lodash中文文档 | Lodash中文网 (lodashjs.com)](https://www.lodashjs.com/)



#### 手写debounce

![70833341442](D:\MyProject\HTMLCSSJavaScript\面试准备\assets\1708333414423.png)







