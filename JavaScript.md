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



