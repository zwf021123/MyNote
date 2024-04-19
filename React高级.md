# 脱围机制

有些组件可能需要控制和同步 React 之外的系统。例如，你可能需要使用浏览器 API 聚焦输入框，或者在没有 React 的情况下实现视频播放器，或者连接并监听远程服务器的消息。在本章中，你将学习到一些脱围机制，让你可以“走出” React 并连接到外部系统。大多数应用逻辑和数据流不应该依赖这些功能。



## 使用ref引用值

### 概述

如果你希望组件"记住"某些信息，但是又不想让这些信息修改时触发渲染，你可以使用`ref`：

使用Hook `useRef`进行声明变量即可

```jsx
import {useRef} from 'react'

// 参数是唯一的，代表你想要的变量初始值
const ref = useRef(0);

// useRef返回这样一个对象
{ 
  current: 0 // 你向 useRef 传入的值
}
```

与 state 一样，ref 在重新渲染之间由 React 保留。但是，**设置 state 会重新渲染组件，而更改 ref 不会**！你可以通过 `ref.current` 属性访问该 ref 的当前值（**可读可改**）。

如下例子：

```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);
  console.log('渲染了')
  function handleClick() {
    ref.current = ref.current + 1;
    alert('你点击了 ' + ref.current + ' 次!');
  }

  return (
    <button onClick={handleClick}>
      点我！
    </button>
  );
}
```

运行代码可以发现在点击了按钮之后并不会打印 渲染了

这里的 ref 指向一个数字，但是，像 [state](https://zh-hans.react.dev/learn/state-a-components-memory) 一样，你可以让它**指向任何东西**：字符串、对象，甚至是函数。与 state 不同的是，**ref 是一个普通的 JavaScript 对象**，具有可以被读取和修改的 `current` 属性。

在官网中有一个秒表例子，可具体参考：[使用 ref 引用值 – React 中文文档](https://zh-hans.react.dev/learn/referencing-values-with-refs)



###ref VS state

我们建议你使用 state。ref 是一种“脱围机制”，你并不会经常用到它。 以下是 state 和 ref 的对比：

| ref                                                         | state                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| `useRef(initialValue)`返回 `{ current: initialValue }`      | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`) |
| 更改时**不会**触发重新渲染                                  | 更改时**触发**重新渲染。                                     |
| **可变** —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— **你必须使用 state 设置函数**来修改 state 变量，从而排队重新渲染。 |
| 你**不应在渲染期间读取（或写入）** `current` 值。           | 你可以**随时读取** state。但是，每次渲染都有自己不变的 state [快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)。 |

下面这个例子可以看到：

```jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  console.log('渲染了')
  
  return (
    <button onClick={handleClick}>
      你点击了 {count} 次
    </button>
  );
}

```

```jsx
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // 这样并未重新渲染组件！
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      你点击了 {countRef.current} 次
    </button>
  );
}

```

可以看到两个例子分别使用了`state`和`ref`存储我们需要用于渲染的变量count，但是运行代码发现使用`ref`的例子中，并不能正常运行，因为它完全没有触发组件的重新渲染

这就是为什么在渲染期间读取 `ref.current` 会导致代码不可靠的原因。如果需要，请改用 state

需要强调的是：

React state 的限制不适用于 ref。例如，state 就像 [每次渲染的快照](https://zh-hans.react.dev/learn/state-as-a-snapshot)，并且 [不会同步更新](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)/"立即更新"。但是当你改变 **ref 的 current 值**时，它会**立即改变**：

```jsx
ref.current = 5;
console.log(ref.current); // 5
```

这是因为`ref`本身就是一个普通的JavaScript对象

> ref原理：
>
> 实际上，我们可以想象`useRef`是由`useState`实现的
>
> ```jsx
> // React 内部
> function useRef(initialValue) {
>   const [ref, unused] = useState({ current: initialValue });
>   return ref;
> }
> ```
>
> 在触发初次渲染后，useRef直接返回`{ current: initialValue }`，并且没有使用和返回state设置函数，因为我们的ref不需要触发渲染，而state设置函数的作用就是为了触发渲染



### 应用

- 常见应用：
  - 存储定时器id
  - 存储DOM元素
  - 有时候，在一些异步操作中，state存储的快照不能满足我们实时的需求，ref可能是一种选择
  - 以及其他不影响组件渲染输出的对象
- 原则：
  - **将ref视为脱围机制**：当我们使用到外部系统或浏览器API时，ref是有用的
  - **不要在渲染过程中对`ref.current`进行读写**！如果渲染过程中需要某些信息，请使用 [state](https://zh-hans.react.dev/learn/state-a-components-memory) 代替。由于 React 不知道 `ref.current` 何时发生变化，即使在渲染时读取它也会使组件的行为难以预测。（唯一的例外是像 `if (!ref.current) ref.current = new Thing()` 这样的代码，它只在第一次渲染期间设置一次 ref。）





### ref和DOM

ref常见的用法是访问DOM元素（用法类似`vue`的ref模板引用）

当你将 ref 传递给 JSX 中的 `ref` 属性时，比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。当元素从 DOM 中删除时，React 会将 `myRef.current` 更新为 `null`。你可以在 [使用 ref 操作 DOM](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 中阅读更多相关信息。







### 思考ref变量与组件里的普通变量的区别

看这个例子：

```jsx
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timeoutID = setTimeout(() => {
      alert('已发送！');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? '发送中……' : '发送'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          撤销
        </button>
      }
    </>
  );
}

```

这个例子中，我们希望的功能是在用户点击发送之后在延迟3s后alert出 已发送 ，同时在3s内会显示一个 撤销 按钮，如果用户点击撤销，那么即可取消定时器

在这个需求中，我们需要使用一个变量来存储定时器ID，以便进行存储

如上代码的做法是使用了一个普通变量进行存储，实际效果并没有如预期

而是在用户点击了撤销按钮后，仍然alert 已发送

原因：

- 普通变量并不会在每一次React组件的渲染中存活
- 在代码中，当我们点击了撤销按钮，使用了state的设置函数，触发了React的渲染，因此普通变量的值也就不存在了/没有存储到想要的内容了

正确做法还是选择使用ref，因为**ref也是一个特殊的state可以在渲染中存活下来，却不会触发渲染**



## 使用ref操作DOM

 React 会自动处理更新 [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) 以匹配你的渲染输出，因此你在组件中通常不需要操作 DOM。但是，有时你可能需要访问由 React 管理的 DOM 元素 —— 例如，让一个节点获得焦点、滚动到它或测量它的尺寸和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个指向 DOM 节点的 **ref** 来实现



### 获取指定节点的ref

用法上与vue的ref模板引用类似的

要访问由 React 管理的 DOM 节点，首先，引入 `useRef` Hook：

```jsx
import { useRef } from 'react';
```

然后，在你的组件中使用它声明一个 ref：

```jsx
const myRef = useRef(null);
```

最后，将 ref 作为 `ref` 属性值传递给想要获取的 DOM 节点的 JSX 标签：

```jsx
<div ref={myRef}>
```

这样我们的`myRef.current`中就存储了该节点的引用了

```jsx
// 你可以使用任意浏览器 API，例如：
myRef.current.scrollIntoView();
```

具体DOM操作例子可以查看[使用 ref 操作 DOM – React 中文文档](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs)





### 列表数据绑定ref

有时候，在一个列表数据中，我们需要为其每一项都绑定ref，像这么做是不行的

```jsx
<ul>
  {items.map((item) => {
    // 行不通！
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

这是因为 **Hook 只能在组件的顶层被调用**。不能在循环语句、条件语句或 `map()` 函数中调用 `useRef` 。

- 解决方案：
  - 使用ref引用其父元素，再使用DOM方法`querySelectorAll`来寻找其子节点，但是如果DOM结构变化，可能会失效或报错。
  - 将函数传递给ref属性，这叫`ref回调`，当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 `null` 。这使你可以维护自己的数组或 [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，并通过其索引或某种类型的 ID 访问任何 ref。

示例：

```jsx
import { useRef } from 'react';

export default function CatFriends() {
  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>
          Tom
        </button>
        <button onClick={() => scrollToId(5)}>
          Maru
        </button>
        <button onClick={() => scrollToId(9)}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          {catList.map(cat => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}

```

在这个例子中，`itemsRef`保存的不是单个DOM节点，而是包含列表项ID和DOM节点的Map，每个列表项上的ref回调会更新Map，这使你可以之后从 Map 读取单个 DOM 节点。





### 访问组件的DOM节点

当我们将ref放在一个组件上时，此时绑定得到的ref变量值为`null`！！！

发生这种情况是因为默认情况下，R**eact 不允许组件访问其他组件的 DOM 节点**。甚至自己的子组件也不行！这是故意的。Refs 是一种脱围机制，应该谨慎使用。手动操作 **另一个** 组件的 DOM 节点会使你的代码更加脆弱。

如果想要这么做，需要遵循如下步骤：

1. 组件允许自己的ref被访问（使用`forwardRef`API）

   ```jsx
   const MyInput = forwardRef((props, ref) => {
     return <input {...props} ref={ref} />;
   });
   ```

2. 外部组件使用ref属性绑定ref变量

它是这样工作的:

1. `<MyInput ref={inputRef} />` 告诉 React 将对应的 DOM 节点放入 `inputRef.current` 中。但是，这取决于 `MyInput` 组件是否允许这种行为， 默认情况下是不允许的。
2. `MyInput` 组件是使用 `forwardRef` 声明的。 **这让从上面接收的 inputRef 作为第二个参数 ref 传入组件**，第一个参数是 `props` 。
3. `MyInput` 组件将自己接收到的 `ref` 传递给它内部的 `<input>`。

```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}

```

在设计系统中，将低级组件（如按钮、输入框等）的 ref 转发到它们的 DOM 节点是一种常见模式。另一方面，像表单、列表或页面段落这样的高级组件通常不会暴露它们的 DOM 节点，以避免对 DOM 结构的意外依赖。

> 限制组件暴露的内容：
>
> 在上面的例子中，`MyInput` 暴露了原始的 DOM 元素 input。这让父组件可以对其调用`focus()`。然而，这也让父组件能够做其他事情 —— 例如，改变其 CSS 样式
>
> 在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 做到这一点：
>
> ```jsx
> import {
>   forwardRef, 
>   useRef, 
>   useImperativeHandle
> } from 'react';
>
> const MyInput = forwardRef((props, ref) => {
>   const realInputRef = useRef(null);
>   useImperativeHandle(ref, () => ({
>     // 只暴露 focus，没有别的
>     focus() {
>       realInputRef.current.focus();
>     },
>   }));
>   return <input {...props} ref={realInputRef} />;
> });
>
> export default function Form() {
>   const inputRef = useRef(null);
>
>   function handleClick() {
>     inputRef.current.focus();
>   }
>
>   return (
>     <>
>       <MyInput ref={inputRef} />
>       <button onClick={handleClick}>
>         聚焦输入框
>       </button>
>     </>
>   );
> }
>
> ```
>
> 这里，`MyInput` 中的 `realInputRef` 保存了实际的 input DOM 节点。 但是，`useImperativeHandle` 指示 React 将你自己指定的对象作为父组件的 ref 值。 所以 `Form` 组件内的 `inputRef.current` 将只有 `focus` 方法





































