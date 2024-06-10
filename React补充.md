# 该文件用于补充学习React相关

## Suspense与组件懒加载



## useMemo

`useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

在组件的顶层调用 `useMemo` 来缓存每次重新渲染都需要计算的结果。

```jsx
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}

```

- 参数：
  - `calculateValue`：要**缓存计算值的函数**。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。React 将会在首次渲染时调用该函数；在之后的渲染中，如果 `dependencies` 没有发生变化，React 将直接返回相同值。否则，将会再次调用 `calculateValue` 并返回最新结果，然后缓存该结果以便下次重复使用。
  - `dependencies`：所有在 `calculateValue` 函数中使用的响应式变量组成的数组。**响应式变量包括 props、state 和所有你直接在组件中定义的变量和函数**。如果你在代码检查工具中 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，它将会确保每一个响应式数据都被正确地定义为依赖项。依赖项数组的长度必须是固定的并且必须写成 `[dep1, dep2, dep3]` 这种形式。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 将每个依赖项与其之前的值进行比较。

在初次渲染时，`useMemo` 返回**不带参数**调用 `calculateValue` 的结果。

**在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 `calculateValue`，并返回最新结果**。

- 注意
  - `useMemo` 是一个 React Hook，所以你只能 **在组件的顶层** 或者自定义 Hook 中调用它。你不能在循环语句或条件语句中调用它。如有需要，将其提取为一个新组件并使用 state。

> tips：
>
> 这种缓存返回值的方式也叫做 [记忆化（memoization）](https://en.wikipedia.org/wiki/Memoization)，这也是该 Hook 叫做 `useMemo` 的原因。



### 用法

#### 跳过代价昂贵的重新计算

在组件顶层调用 `useMemo` 以在重新渲染之间缓存计算结果：

```jsx
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

你需要给 `useMemo` 传递两样东西：

1. 一个没有任何参数的 calculation 函数，像这样 `() =>`，并且返回任何你想要的计算结果。
2. 一个由包含在你的组件中并在 calculation 中使用的所有值组成的 依赖列表。

在初次渲染时，你从 `useMemo` 得到的 值 将会是你的 calculation 函数执行的结果。

在随后的每一次渲染中，React 将会比较前后两次渲染中的 所有依赖项 是否相同。如果通过 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较所有依赖项都没有发生变化，那么 `useMemo` 将会返回之前已经计算过的那个值。否则，React 将会重新执行 calculation 函数并且返回一个新的值。

换言之，`useMemo` 在多次重新渲染中缓存了 calculation 函数计算的结果直到依赖项的值发生变化。

如下例子：

默认情况下，React 会在每次重新渲染时重新运行整个组件。例如，如果 `TodoList` 更新了 state 或从父组件接收到新的 props，`filterTodos` 函数将会重新运行：

如果计算速度很快，这将不会产生问题。但是，当正在过滤转换一个大型数组，或者进行一些昂贵的计算，而数据没有改变，那么可能希望跳过这些重复计算。如果 `todos` 与 `tab` 都与上次渲染时相同，那么像之前那样将计算函数包装在 `useMemo` 中，便可以重用已经计算过的 `visibleTodos`。

这种缓存行为叫做 [记忆化](https://en.wikipedia.org/wiki/Memoization)。

> tips：
>
> **你应该仅仅把 useMemo 作为性能优化的手段**。如果没有它，你的代码就不能正常工作，那么请先找到潜在的问题并修复它。然后再添加 `useMemo` 以提高性能。
>
> 使用 `useMemo` 进行优化仅在少数情况下有价值：
>
> - 你在 `useMemo` 中进行的计算明显很慢，而且它的依赖关系很少改变。
> - 将计算结果作为 props 传递给包裹在 [`memo`](https://zh-hans.react.dev/reference/react/memo) 中的组件。当计算结果没有改变时，你会想跳过重新渲染。记忆化让组件仅在依赖项不同时才重新渲染。
> - 你传递的值稍后用作某些 Hook 的依赖项。例如，也许另一个 `useMemo` 计算值依赖它，或者 [`useEffect`](https://zh-hans.react.dev/reference/react/useEffect) 依赖这个值。

下面是一个例子：

```jsx
// App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```jsx
// TodoList.js
import { useMemo } from 'react';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  // const visibleTodos = filterTodos(todos, tab);
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  return (
    <div className={theme}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```jsx
// Utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  console.log('[ARTIFICIALLY SLOW] Filtering ' + todos.length + ' todos for "' + tab + '" tab.');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 在 500 毫秒内不执行任何操作以模拟极慢的代码
  }

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

如上例子中，`TodoList`组件会在传入的props被修改时重新渲染，但是我们发现，每次重新渲染都会去重新计算得到新的TodoList渲染数据，但是`theme`改变时我们无需这样做！！因此使用`useMemo`是正确的，因为只有在TodoList的数据真正改变时我们才去计算





#### 跳过组件的重新渲染

在某些情况下，`useMemo` 还可以帮助你优化重新渲染子组件的性能。为了说明这一点，假设这个 `TodoList` 组件将 `visibleTodos` 作为 props 传递给子 `List` 组件：

```jsx
export default function TodoList({ todos, tab, theme }) {
  // 每当主题发生变化时，这将是一个不同的数组……
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      {/* ... 所以List的props永远不会一样，每次都会重新渲染 */}
      <List items={visibleTodos} />
    </div>
  );
}
```

**默认情况下，当一个组件重新渲染时，React 会递归地重新渲染它的所有子组件**。这就是为什么当 `TodoList` 使用不同的 `theme` 重新渲染时，`List` 组件 **也会** 重新渲染。这对于不需要太多计算来重新渲染的组件来说很好。但是如果你已经确认重新渲染很慢，你可以通过将它包装在 [`memo`](https://zh-hans.react.dev/reference/react/memo) 中，这样**当它的 props 跟上一次渲染相同的时候它就会跳过本次渲染：**

```jsx
import { memo } from 'react';

const List = memo(function List({ items }) {
  // ...
});
```

**在上面的示例中，filterTodos 函数总是创建一个不同数组**，类似于 `{}` 总是创建一个新对象的方式。通常，这不是问题，但这意味着 `List` 属性永远不会相同，并且你的 [`memo`](https://zh-hans.react.dev/reference/react/memo) 优化将不起作用。这就是 `useMemo` 派上用场的地方：

```jsx
export default function TodoList({ todos, tab, theme }) {
  // 告诉 React 在重新渲染之间缓存你的计算结果...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...所以只要这些依赖项不变...
  );
  return (
    <div className={theme}>
      {/* ... List 也就会接受到相同的 props 并且会跳过重新渲染 */}
      <List items={visibleTodos} />
    </div>
  );
}
```

**通过将 visibleTodos 的计算函数包裹在 useMemo 中，你可以确保它在重新渲染之间具有相同值**，直到依赖项发生变化。

> useMemo与JSX节点：
>
> 你可以将 `<List />` JSX 节点本身包裹在 `useMemo` 中，而不是将 `List` 包裹在 [`memo`](https://zh-hans.react.dev/reference/react/memo) 中：
>
> ```jsx
> export default function TodoList({ todos, tab, theme }) {
>   const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
>
>   const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
>   return (
>     <div className={theme}>
>       {children}
>     </div>
>   );
> }
> ```
>
> 他们的行为表现是一致的。如果 `visibleTodos` 没有改变，`List` 将不会重新渲染。
>
> 手动将 JSX 节点包裹到 `useMemo` 中并不方便，比如你**不能在条件语句中这样做**。
>
> 因此还是**推荐**使用 [`memo`](https://zh-hans.react.dev/reference/react/memo) 包装组件而不是使用 `useMemo` 包装 JSX 节点。



#### 记忆其他Hook的依赖

假设你有一个计算函数依赖于直接在组件主体中创建的==对象（强调是对象，如果是普通变量重新渲染之后的值并不会变）==：

```jsx
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 提醒：依赖于在组件主体中创建的对象
  // ...
```

依赖这样的一个变量会破坏记忆化的功能，因为只要组件重新渲染，组件主体内所有的代码都会重新运行计算，那么searchOptions的值自然每次都不同！！！那么依赖于该变量的visibleItems自然每次都需要重新计算searchItems了

要解决此问题，你可以在将其作为依赖项传递之前记忆 `searchOptions` 对象 **本身**：

```jsx
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ 只有当 text 改变时才会发生改变

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // ✅ 只有当 allItems 或 serachOptions 改变时才会发生改变
  // ...
```

在上面的例子中，如果 `text` 没有改变，`searchOptions` 对象也不会改变。然而，更好的解决方法是将 `searchOptions` 对象声明移到 `useMemo` 计算函数的 **内部**：

```jsx
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ 只有当 allItems 或者 text 改变的时候才会重新计算
  // ...
```



#### 记忆一个函数

假设 `Form` 组件被包裹在 [`memo`](https://zh-hans.react.dev/reference/react/memo) 中，你想将一个函数作为 props 传递给它：

```jsx
export default function ProductPage({ productId, referrer }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }

  return <Form onSubmit={handleSubmit} />;
}
```

正如 `{}` 每次都会创建不同的对象一样，像 `function() {}` 这样的函数声明和像 `() => {}` 这样的表达式在每次重新渲染时都会产生一个 **不同** 的函数。就其本身而言，创建一个新函数不是问题。这不是可以避免的事情！但是，如果 `Form` 组件被记忆了，大概你想在没有 props 改变时跳过它的重新渲染。**总是** 不同的 props 会破坏你的记忆化。

因此，我们需要对这个函数记忆化处理

要使用 `useMemo` 记忆函数，你的计算函数必须返回另一个函数：

```jsx
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```

实际上，React提供了另外一个Hook用于记忆函数，**将你的函数包装到 useCallback 而不是 useMemo** 中，以避免编写额外的嵌套函数：

```jsx
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);
  return <Form onSubmit={handleSubmit} />;
}
```

上面两个例子是完全等价的。`useCallback` 的唯一好处是它可以让你避免在内部编写额外的嵌套函数。它没有做任何其他事情。[阅读更多关于 `useCallback` 的内容](https://zh-hans.react.dev/reference/react/useCallback)。





## useCallBack

`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。

```jsx
const cachedFn = useCallback(fn, dependencies)
```

在组件顶层调用 `useCallback` 以便在多次渲染中缓存函数：

```jsx
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```

- 参数：
  - `fn`：想要缓存的函数。此函数可以接受任何参数并且返回任何值。在初次渲染时，React 将把函数返回给你（而不是调用它！）。当进行下一次渲染时，如果 `dependencies` 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。**React 不会调用此函数，而是返回此函数**。你可以自己决定何时调用以及是否调用。
  - `dependencies`：有关是否更新 `fn` 的所有响应式值的一个列表。响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将校验每一个正确指定为依赖的响应式值。依赖列表必须具有确切数量的项，并且必须像 `[dep1, dep2, dep3]` 这样编写。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每一个依赖和它的之前的值。
- 返回值

在初次渲染时，`useCallback` 返回你已经传入的 `fn` 函数

在之后的渲染中, 如果依赖没有改变，`useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。

- 注意：
  - `useCallback` 是一个 Hook，所以应该在 **组件的顶层** 或自定义 Hook 中调用。你不应在循环或者条件语句中调用它。如果你需要这样做，请新建一个组件，并将 state 移入其中。



### 用法

#### 跳过组件的重新渲染

你优化渲染性能的时候，有时需要缓存传递给子组件的函数

```jsx
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  // ...
```

你需要传递两个参数给 `useCallback`：

1. 在多次渲染中需要缓存的函数
2. 函数内部需要使用到的所有组件内部值的 依赖列表。

初次渲染时，在 `useCallback` 处接收的 返回函数 将会是已经传入的函数。

在之后的渲染中，React 将会使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 把 当前的依赖 和已传入之前的依赖进行比较。如果没有任何依赖改变，`useCallback` 将会返回与之前一样的函数。否则 `useCallback` 将返回 **此次** 渲染中传递的函数。

简而言之，`useCallback` 在多次渲染中缓存一个函数，直至这个函数的依赖发生改变。

如下是一个例子：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

**默认情况下，当一个组件重新渲染时， React 将递归渲染它的所有子组件**，因此每当因 `theme` 更改时而 `ProductPage` 组件重新渲染时，`ShippingForm` 组件也会重新渲染。这对于不需要大量计算去重新渲染的组件来说影响很小。但如果你发现某次重新渲染很慢，你可以将 `ShippingForm` 组件包裹在 [`memo`](https://zh-hans.react.dev/reference/react/memo) 中。如果 props 和上一次渲染时相同，那么 `ShippingForm` 组件将跳过重新渲染。

**当代码像上面一样改变后，如果 props 与上一次渲染时相同，ShippingForm 将跳过重新渲染**。这时缓存函数就变得很重要。假设定义了 `handleSubmit` 而没有定义 `useCallback`：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // 每当 theme 改变时，都会生成一个不同的函数
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/* 这将导致 ShippingForm props 永远都不会是相同的，并且每次它都会重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

与字面量对象 `{}` 总是会创建新对象类似，**在 JavaScript 中，function () {} 或者 () => {} 总是会生成不同的函数**。正常情况下，这不会有问题，但是这意味着 `ShippingForm` props 将永远不会是相同的，并且 [`memo`](https://zh-hans.react.dev/reference/react/memo) 对性能的优化永远不会生效。而这就是 `useCallback` 起作用的地方：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // 在多次渲染中缓存函数
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // 只要这些依赖没有改变

  return (
    <div className={theme}>
      {/* ShippingForm 就会收到同样的 props 并且跳过重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**将 handleSubmit 传递给 useCallback 就可以确保它在多次重新渲染之间是相同的函数**，直到依赖发生改变。

> tips：
>
> **useCallback 只应作用于性能优化**。如果代码在没有它的情况下无法运行，请找到根本问题并首先修复它，然后再使用 `useCallback`。

> `useMemo`VS`useCallBack`
>
> 区别在于你需要缓存 **什么**:
>
> - **useMemo 缓存函数调用的结果**。在这里，它缓存了调用 `computeRequirements(product)` 的结果。除非 `product` 发生改变，否则它将不会发生变化。这让你向下传递 `requirements` 时而无需不必要地重新渲染 `ShippingForm`。必要时，React 将会调用传入的函数重新计算结果。
> - **useCallback 缓存函数本身**。不像 `useMemo`，它不会调用你传入的函数。相反，它缓存此函数。从而除非 `productId` 或 `referrer` 发生改变，`handleSubmit` 自己将不会发生改变。这让你向下传递 `handleSubmit` 函数而无需不必要地重新渲染 `ShippingForm`。直至用户提交表单，你的代码都将不会运行。
>
> 实际上`useCallBack`就是`useMemo`的一个应用，你可以这么理解：
>
> ```jsx
> // 在 React 内部的简化实现
> function useCallback(fn, dependencies) {
>   return useMemo(() => fn, dependencies);
> }
> ```



#### 在记忆化回调中更新state

有时，你可能在记忆化回调中基于之前的 state 来更新 state。

下面的 `handleAddTodo` 函数将 `todos` 指定为依赖项，因为它会从中计算下一个 todos：

```jsx
function TodoList() {

  const [todos, setTodos] = useState([]);
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);

  // ...
```

我们期望记忆化函数具有尽可能少的依赖，当你读取 state 只是为了计算下一个 state 时，你可以通过传递 [updater function](https://zh-hans.react.dev/reference/react/useState#updating-state-based-on-the-previous-state) 以移除该依赖：

```jsx
function TodoList() {

  const [todos, setTodos] = useState([]);
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ 不需要 todos 依赖项

  // ...
```

在这里，并不是将 `todos` 作为依赖项并在内部读取它，而是传递一个关于 **如何** 更新 state 的指示器 (`todos => [...todos, newTodo]`) 给 React。[阅读更多有关 updater function 的内容](https://zh-hans.react.dev/reference/react/useState#updating-state-based-on-the-previous-state)。





#### 防止频繁触发Effect

有时，你想要在 [Effect](https://zh-hans.react.dev/learn/synchronizing-with-effects) 内部调用函数：

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    // ...
```

这会产生一个问题，[每一个响应值都必须声明为 Effect 的依赖](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency)。但是如果将 `createOptions` 声明为依赖，它会导致 Effect 不断重新连接到聊天室(因为每次重新渲染`createOptions`都是一个新函数，因此会导致重新执行`Effect`)：

```jsx
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🔴 问题：这个依赖在每一次渲染中都会发生改变
  // ...
```

我们可以将要调用的函数包裹在 `useCallback` 中：

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ 仅当 roomId 更改时更改

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ 仅当 createOptions 更改时更改
  // ...
```

这将确保如果 `roomId` 相同，`createOptions` 在多次渲染中会是同一个函数。**但是，最好消除对函数依赖项的需求**。将你的函数移入 Effect **内部**：

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ 无需使用回调或函数依赖！
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 仅当 roomId 更改时更改
  // ...
```





#### 优化自定义Hook

```jsx
如果你正在编写一个 自定义 Hook，建议将它返回的任何函数包裹在 useCallback 中：

function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```









