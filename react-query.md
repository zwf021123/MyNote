# 入门

在日常的开发中，免不了请求后端接口。在请求接口时，经常会涉及到以下处理

- 加载状态
- 后端返回数据存储
- 如果接口有报错信息，展示报错信息
- 刷新数据
- 等等

先看看通常我们是如何获取请求数据的：

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [starCount, setstarCount] = useState(0);

  useEffect(() => {
   //获取react-query的star数量
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => {
        setstarCount(res.data.stargazers_count);
      })
      .catch((err) => {
        //处理错误
        console.log(err);
      });
  }, []);

  return <div>react-query获得了{starCount}颗星</div>;
}
```

那么现在需求变化了，可能网络比较慢，需要加个loading和err，来解决用户等待响应过程的难受和出错后让用户可以点击按钮重新获取数据，好那就加上吧。

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [starCount, setstarCount] = useState(0);
  const [loading, setloading] = useState(false); //声明loading状态
  const [isErr, setisErr] = useState(false); //声明错误状态

  useEffect(() => {
    setloading(true); //开始请求数据，loading设为true
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => {
        setloading(false); //请求结束，loading设为false
        setstarCount(res.data.stargazers_count);
      })
      .catch((err) => {
        //处理错误
        setloading(false);
        setisErr(true); //设置isErr为true
        console.log(err);
      });
  }, [isErr]);

  const handleReload = () => {
    setisErr(false); //重置isErr为false，再次发送请求
  };

  if (loading) return <span>数据获取中...</span>;
  if (isErr) return <button onClick={handleReload}>重新获取数据</button>;

  return <div>react-query获得了{starCount}颗星</div>;
}

```

可以看到这样一次请求中，我们就使用到了3个状态，再设想一下，为了进一步增强应用和体验，比如网络错误自动重试，为了防止用户看到的是旧的数据，你需要增加窗口焦点时重新自动获取数据等，可以看出如此发展下去，组件需要管理的状态越来越多，你也会越来越力不从心，状态的增多，导致你的组件更容易出bug，很大可能会造成你忘记去修改或重置它们的状态，因为这些状态分布零散，同时这也会造成将来的代码是多么难以维护和扩展，这会是一场噩梦。

那么使用`react-query`会是什么样的呢？？？

```jsx
import axios from "axios";
import { useQuery } from "react-query";

export default function App() {
  const { data, isLoading, error } = useQuery("getStar", () =>
    axios.get("https://api.github.com/repos/tannerlinsley/react-query")
  );

  if (isLoading) return "数据获取中...";

  if (error) return "发生错误: " + error.message;

  return (
    <div>react-query获得了{data.stargazers_count}颗星</div>
  );
}

```

再这里使用了`react-query`提供的`useQuery`，此刻这个请求拥有了自动获取数据，管理请求状态，错误重试，窗口焦点自动获取数据，缓存等，它的第1个参数是一个唯一的key，名字有意义就好，第2个参数是请求数据的方法，返回Promise，它还有第3个参数是个配置选项的对象（后面会说）。最后它会返回一个结果，结果里面包含请求的数据，加载状态，错误等，这样这个请求就把所有这些状态串联起来，而不是一堆散乱的状态，突然逻辑变得清晰了，你只需要根据这些状态处理页面，一切都简单了。





## 快速入门

### `react-query`三大核心概念

我们实际在普通的项目中只会使用到`Queries`和`Mutations`，这两个足以满足大部分网络请求的需求

#### Queries

- `useQuery` ：发起单个请求
- `useQueries`：发起多个请求
- `useInfiniteQuery`:用于无限加载的列表，非常强大，让构建无限加载组件变得简单。

#### Mutations

- `useMutation`：用来创建(post)、更新(put)、删除数据(delete)，当你的接口涉及这些逻辑时你可以使用它。

#### Query Invalidation

你所用的`query`有时需要刷新以重新获取最新数据，这时候你就可以用`QueryClient`的来使某个`query`失效，然后该`query`就会重新去获取数据。`QueryClient`非常强大，它也可以对`query`进行全局配置，操作缓存，移除或重置`query`等等



### Queries options

配置对象就是第3个参数，它是一个对象，这个配置对象在`useQueries`，`useInfiniteQuery`中也相同,这个对象有数十个参数可供配置，这里我只挑其中几个在代码中注释说明。

```jsx
const returns = useQuery(queryKey, queryFn?,{
    enabled, //默认为true，表示自动请求，false的话则需要你手动
    retry, //请求失败后，请求的重试次数，也可以为boolean，true为无数次重试，false则不会重试
    refetchOnWindowFocus，//页面取得焦点时，重新获取数据，默认为true
    staleTime, //指定缓存时长，以毫秒为单位。
    ...
})

```



### Queries Returns

下面来看看它的返回的对象,只挑其中几个说明：

```js
const {
    data, //这个就是请求成功回来的数据
    isLoading, //true表示数据在获取的路上
    error,//错误对象，如果存在则包含相关的错误信息
    refetch，//这个还挺实用的，你可以在需要的地方或需要更新数据时调用，则会触发这个请求，比如enabled=false时
    ...
} = useQuery(queryKey, queryFn?,options?）
```





### Mutation

用来创建/更新/删除数据时使用，最典型的例子就是一个`todoList`，对`todo`进行增删改相关的请求。使用`useMutation` hooks。

```jsx
//例子来自官网
function App() {
  //创建一条todo的mutation请求
  const mutation = useMutation(newTodo => {
    return axios.post('/todos', newTodo)
  })

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              //主要看这里，mutate方法传递请求的参数，来创建一条新的todo
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}

```





### 扩展

QueryClient、QueryClientProvider、useQueryClient 这三个可以用来进行query的全局配置、与缓存交互等

```jsx
//例子来自官网，有一定的修改。
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools"; //调试工具

const queryClient = new QueryClient();//创建实例，可以用该实例配置一些选项，具体看文档

export default function App() {
  return (
   //注入到Example里
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const queryClient = useQueryClient() //获取QueryClient实例
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      {/* 指定key为repoData，可以该query重新获取数据 */}
      <button onClick={()=>queryClient.refetchQueries('repoData')}>重新获取</button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```















## 查询键(Query Keys)和查询函数(Query Functions)

### 概述

日常开发时，请求后端数据时：

- 会先写一个函数来请求后端接口的数据
- 然后一般会定义一个变量来存储后端接口返回的数据，每个接口的变量会起不同的名字，来标识不同的数据

那么在react-query中如何区分不同的接口获取的不同数据呢？

回到例子②中，我们使用`useQuery`钩子来获取后端数据，代码如下：

```js
const zenQuery = useQuery(['zen'], fetchData);
```

- 其中`['zen']`就是react-query的查询键，react-query通过不同的查询键来标识(映射)不同接口(或是同一接口不同参数请求)返回的数据。在`react-query@4`中，查询键必须是数组。
- 而`fetchData`就是我们请求后端接口的函数，也就是查询函数。

> PS：查询键内的元素可以是嵌套数组、对象、字符串、数字
>
> 例如：`['zen', { form: 'confucius' }]`或`['zen', ['confucius', 'Lao Tzu']]`

为了方便记忆，打个比方，你可以将查询键看做是你存储`localStorage`时的key，而value则是通过查询函数查询到数据后，将各种我们需要的状态数据存储进入value

> PS：当然实际的处理过程及存储的信息会很复杂，不过思路基本上一致。



### 写查询键的一些tips

假如我有一个复杂的接口，此时应该如何更好的设计查询键呢？

还是以github的接口为例，如果你想获取到github中某个仓库的issue列表，你可以这样调用接口

```bash
https://api.github.com/repos/{owner}/{repo}/issues
```

此时，你可以通过请求接口，拿到react仓库内的issue列表。

以这个获取仓库issue列表接口为例，可以这样写查询键 例子③👇🏻

```js
['issues', owner, repo]
// 注意这里的owner和repo是变量！！！
```

在这个查询键中我们遵循了一个原则：从特殊到通用

首先我们获取的数据类型是issue，我们需要在数组的开头放一个字符串来标识数据类型，因此第一个参数我们设定为`issues`。在github中有许多仓库，这些仓库通常以用户作为第一级标识，仓库名是第二级标识，如下图所示

![react仓库](react-query.assets/9e300893dc56409dacb7cdc69c92437d-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.awebp)

因此第二个和第三个参数依次是`owner`和`repo`

上面的例子中，我们没有使用`['issues', 'facebook', 'react']`而是使用`['issues', owner, repo]`的原因是为了介绍**在react-query中，使用变量作为查询键的元素时，当变量的值变化后，react-query将会重新调用`fetchData`方法，获取新的数据，并缓存到对应变量值为key的缓存中。**

即发生下面的变化时，react-query将会重新调用`fetchData`方法，并将从后端获取到的数据，缓存在查询键为`['issues', 'vuejs', 'vue']`对应的值中，同理我们在初始化调用接口时，获取的数据时缓存在查询键为`['issues', 'facebook', 'react']`的对应值中：

下面的例子将会获取react仓库中最新一条issue，你可以查看例子④的在线演示

将示例中输入框内的：facebook更换为vuejs，将react更换为vue，点击【查看最新issue信息】按钮，就可以看到vue仓库最新的issue信息（针对相关的数据缓存，你可以想一下上面我们说过的例子）

[点我查看例子④在线演示](https://link.juejin.cn/?target=https%3A%2F%2Fstackblitz.com%2Fedit%2Freact-ts-x2vp6q%3Ffile%3DApp.tsx)

```jsx
import * as React from 'react';
import { useQuery } from 'react-query';

const fetchData = ({ queryKey }) => {
  const [, owner, repo] = queryKey;

  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    headers: {
      Authorization: '',
    },
  }).then(async (response) => {
    // 如果请求返回status不为200 则抛出后端错误
    if (response.status !== 200) {
      const { message } = await response.json();

      throw new Error(message);
    }

    return response.json();
  });
};

export default function App() {
  const [inputOwner, setInputOwner] = React.useState('facebook');
  const [inputRepo, setInputRepo] = React.useState('react');
  const [queryKey, setQueryKey] = React.useState([inputOwner, inputRepo]);
  const issueQuery = useQuery(['issues', ...queryKey], fetchData);

  return (
    <div>
      <span>仓库：</span>
      <input
        name={'owner'}
        value={inputOwner}
        onChange={(e) => setInputOwner(e.target.value)}
      />
      /
      <input
        name={'repo'}
        value={inputRepo}
        onChange={(e) => setInputRepo(e.target.value)}
      />
      <button
        onClick={() => {
          setQueryKey([inputOwner, inputRepo]);
        }}
      >
        查看最新issue信息
      </button>
      <div>
        <h1>
          仓库{queryKey[0]}/{queryKey[1]}最新一条issue信息
        </h1>
        <p>
          {issueQuery.isLoading
            ? '加载中...'
            : issueQuery.isError
            ? issueQuery.message
            : JSON.stringify(issueQuery.data[0])}
        </p>
      </div>
    </div>
  );
}


```

在这个例子中，当查询键变量的值变化后，react-query将会自动请求变化后对应的数据，并且在查询函数传入的参数中，我们也可以拿到调用查询函数时查询键的值。



### 查询函数

实际上，所有的Promise函数，都可以作为查询函数。举个例子，浏览器中异步的API接口——获取当前定位的API，可以封装为一个查询函数。

```js
  const getLocation = async () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
```

接着在`useQuery`中使用上面的查询函数

[在stackblitz查看例子](https://link.juejin.cn/?target=https%3A%2F%2Fstackblitz.com%2Fedit%2Freact-ts-f6zxpt%3Ffile%3DApp.tsx)

例子1👇🏻

```jsx
import * as React from 'react';
import { useQuery } from 'react-query';

export default function App() {
  const getLocation = async () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const locationQuery = useQuery(['location'], getLocation);
  return (
    <div>
      <h1>获取地理位置</h1>
      {locationQuery.isLoading ? (
        '地理位置获取中'
      ) : locationQuery.isError ? (
        locationQuery?.error?.message
      ) : (
        <p>
          你的地理位置是：{locationQuery.data.coords.latitude},
          {locationQuery.data.coords.longitude}
        </p>
      )}
    </div>
  );
}

```



#### 结合Hook使用

前面举的例子中，很多的请求都非常简单，并且仅仅在一个地方使用，因此我们无需对代码进行封装。但是假如请求本身涉及到非常复杂的处理，并且可能在多个组件重复使用的时候，我们又回到了最初的原点，发现很多重复代码需要复制粘贴！但是一旦你有这个念头的时候，就是万恶的开始，一旦你这么做了，后期的维护成本将大大增加，修改一个地方，你不得不把类似的代码都更改一遍，费时费力！

下面我们把之前的请求仓库issue的例子抽离成自定义hook

```jsx
  const fetchData = ({ queryKey }) => {
    const [, owner, repo] = queryKey;

    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        Authorization: '',
      },
    }).then(async (response) => {
      // 如果请求返回status不为200 则抛出后端错误
      if (response.status !== 200) {
        const { message } = await response.json();

        throw new Error(message);
      }

      return response.json();
    });
  };
```

接下来我们定义一个名为`useGithubIssuesQuery`的钩子

```jsx
 { useQuery } from 'react-query';

const useGithubIssuesQuery = ({ owner, repo }) => {
  const fetchData = ({ queryKey }) => {
    const [, owner, repo] = queryKey;

    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        Authorization: '',
      },
    }).then(async (response) => {
      // 如果请求返回status不为200 则抛出后端错误
      if (response.status !== 200) {
        const { message } = await response.json();

        throw new Error(message);
      }

      return response.json();
    });
  };

  return useQuery(['issues', owner, repo], fetchData);
};

export default useGithubIssuesQuery;
```

此时在react组件获取数据时，要做的仅仅是使用`useGithubIssuesQuery`钩子，传入owner及repo参数即可，其它的一切都不需要关心，如果在别的组件中需要请求仓库issue相关的接口，只要使用`useGithubIssuesQuery`钩子即可。并且在后期添加功能时，只需要找到对应的自定义钩子并做相关改动即可，大大提高了开发效率。

> 在多个组件中引用相同key值的数据，react-query不会进行多次请求，可以放心使用！













### 常见问题

#### 查询键的值不能重复，需要保持唯一

想象一下这样的场景，在localStorage中设置了下面的数据，目的是以userID为键，把当前的用户数据保存到缓存内

```js
const userId = 1;
localStorage.setItem(userId, {username: 'fed-orange'})
```

接着再把某商品的内容以ProductId为键，把当商品的数据保存到缓存内

```js
const productId = 1;
localStorage.setItem(productId, {name: 'orange'})
```

同理，在react-query中，如果这么做同样会遇到这样的问题 请求用户数据

```js
const usersQuery = useQuery(
  [userId],
  fetchUsers
);
```

请求商品数据

```js
const productsQuery = useQuery(
  [productId],
  fetchProducts
);
```

如果`userId`与`productId`相同时，后面请求的数据会覆盖前面请求的数据！解决这个问题的办法是：可以在数组的第一个元素中，放一个字符串来标识当前的数据类型（可以参照笔者之前提到的设计查询键的小建议中的内容），就可以解决这个问题。

```jsx
const usersQuery = useQuery(
  ['users', userId],
  fetchUsers
);

const productsQuery = useQuery(
  ['products', productId],
  fetchProducts
);
```

这样做不仅能更好的写查询键，在你调试数据的过程里，在DevTools中你能很方便的区分出来不同的数据（不要自己给自己挖坑，在DevTools是以查询键为维度列出所有缓存的数据）！



