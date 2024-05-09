### JavaScript的forEach方法如何使用"continue"和"break"

在forEach中，不能使用 continue 和 break ，可以使用 return 或 return false 跳出循环，效果与 for 中 continue 一样，但是该方法无法一次结束所有循环。

forEach 跳出本次循环，使用return

```js
    [1,2,3].forEach(function(item,index){
        if(item == 2){
            return
        }
        console.log(item)
    })
```

**tips：**

除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。

若你需要提前终止循环，你可以使用：

- 一个简单的 for 循环
- `for...of` / `for...in` 循环

> [JavaScript 如何跳出（终止）forEach 循环 (zhihu.com)](https://www.zhihu.com/tardis/zm/art/601625100?source_id=1005)



### 动态指定对象的key

才知道对象的key可以是一个变量

你可以使用方括号（`[]`）语法来使用变量作为对象的键。这种技术通常被称为“计算属性名”。

以下是一个示例：

```js

```

在这个例子中，`keyName` 是一个变量，我们使用了 `[keyName]` 来作为 `obj` 对象的一个键。





### 空值合并运算符

**空值合并运算符**（`??`）是一个逻辑运算符，**当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时**，返回其右侧操作数，否则返回左侧操作数。

不难想到，**逻辑或运算符（`||`）**，逻辑或运算符会在左侧操作数为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值

对比：

- 不同点：
  - **空值合并运算符**（`??`）的假值只有`null`或`undefined`
  - **逻辑或运算符（`||`）**的假值更多，包括`0`， `''`， `NaN`， `null`， `undefined`，如果你希望将`0`， `''`， `NaN`作为有效值，那么建议使用空值合并运算符
  - **空值合并运算符**（`??`）只会返回右边的返回值，不会执行右边的函数！！！
- 相同点：
  - 都是可以短路的