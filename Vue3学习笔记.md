# 初始Vue3

- Vue3相比Vue2的**优势点**

![69820378940](Vue3学习笔记.assets/1698203789402.png)

- 使用TypeScript对代码重构了，因此Vue3更支持TypeScript
- Vue2使用的是defineProperty对数据进行劫持，而Vue3使用的是proxy
- Vue3主推组合式API，可以将模块相关代码放在同一个地方
- Vue3默认使用vite对项目进行构建，体验下来更快



## 基本语法

### 脚手架create-vue创建项目

- create-vue是Vue官方新的脚手架工具，底层切换到了vite(与webpack一样都是打包构建工具)，为开发提供极速响应

![69820408407](Vue3学习笔记.assets/1698204084075.png)

- 语法：
  1. 前提环境条件
     - 已安装16.0或更高版本的Node.js
  2. 创建一个Vue应用
     - ``npm create vue@latest``
     - 该指令会安装并执行create-vue



### 项目目录和关键文件

- 关键文件：
  1. vite.config.js项目的配置文件基于vite
  2. package.json核心依赖变为vue3.x和vite
  3. main.js入口文件使用createApp函数创建实例(实际是对new Vue操作进行了封装)
  4. app.vue根组件
     1. script与template顺序调整
     2. template不再要求唯一根元素
     3. 脚本script添加setup标识支持组合式API
  5. index.html提供id为app的挂载点

![69821261071](Vue3学习笔记.assets/1698212610711.png)



### setup选项

setup选项里面用于编写组合式api的语法内容

![69821299182](Vue3学习笔记.assets/1698212991820.png)![69821301132](Vue3学习笔记.assets/1698213011327.png)

> 注意：这里因为setup在生命周期里面执行时机很早，因此此时vue实例尚未创建，此时在里面使用this是获取不到vue实例的



如果我们需要编写数据和方法即可直接在setup()函数内编写了，**注意需要return编写的内容**

![69821401326](Vue3学习笔记.assets/1698214013262.png)

但是每次编写完数据和方法都要return非常麻烦，因此这里vue3提供了对应的语法糖``<script setup>``

![69821410849](Vue3学习笔记.assets/1698214108492.png)

> 语法糖原理：
>
> 实际底层原理vue3还是帮你return了
>
> ![69821432559](Vue3学习笔记.assets/1698214325592.png)



### reactive与ref函数

* 在vue3中默认数据并不是响应式的，我们需要使用reactive或者是ref函数得到响应式对象数据

1. reactive

- 作用：接受**对象类型数据的参数传入**并返回一个**响应式的对象**
- 核心步骤：![69821682680](Vue3学习笔记.assets/1698216826806.png)
  1. 从vue包中导入reactive函数
  2. 在<script setup>中执行reactive函数传入类型为对象的初始值，并使用变量接收



2. ref
   - 作用：接受**简单类型或者对象类型的数据**传入并返回一个**响应式对象**
   - 核心步骤：![69821771694](Vue3学习笔记.assets/1698217716942.png)
     1. 导入ref函数
     2. 在<script setup>中执行ref函数并传入初始值，使用变量接受ref函数返回值

>实际开发中推荐使用ref函数获取响应式数据
>
>- ref参数类型支持更好但是在script中必须通过.value访问修改，因为ref函数将传入的内容封装为了一个对象
>- ref函数底层实现依赖于reactive(这一点可以在调试中得到，当ref函数参数为简单数据类型时，ref对象.value得到的就是该简单数据类型，而当ref函数参数为对象数据类型时，ref对象.value得到的是一个proxy对象即reactive函数的返回对象类型)



### 计算属性

与vue2的计算属性概念一致

- 核心语法如下：
  1. 引入computed函数![69823198161](Vue3学习笔记.assets/1698231981617.png)
  2. 调用函数computed，参数为一个回调函数![69823202877](Vue3学习笔记.assets/1698232028771.png)

> 我们在这里定义了一个计算属性 `publishedBooksMessage`。`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。计算属性 ref 也会在模板template中自动解包，因此在模板表达式中引用时无需添加 `.value`。

> 计算属性缓存VS方法
>
> 与Vue2一样的，计算属性可以实现的也可以使用方法实现，虽然实现看到的结果一样，但是计算属性优化的点在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算

#### 可写计算属性

计算属性默认是可读的，某些情况下你也可以对计算属性进行重写

- 核心语法如下：

```javascript
const fullName = computed({
  // getter
  get() {//两个函数也可以简写为箭头函数
    return 计算表达式
  },
  // setter
  set(newValue) {//newValue是修改计算属性值所赋的值
  }
})
```

> 计算属性中不应该有副作用：比如异步请求/修改DOM，这些可以用watch实现
>
> 尽量避免直接修改计算属性的值：计算属性应该是只读的，特殊情况可以配置get set



### class与style绑定

#### 绑定HTML class

- 绑定对象

我们可以给 `:class` (`v-bind:class` 的缩写) 传递一个对象来动态切换 class：

```JavaScript
<script>
    import {ref} from 'vue'
    const isActive = ref(true)
	const hasError = ref(false)
</script>    

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
//结果<div class="static active"></div>
```

上面的语法表示 `active` 是否存在取决于数据属性 `isActive` 的[真假值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)，可以看到:class也可以与原生class共存

此外，也可以将:class的属性值绑定为一个对象

```javascript
<script setup>
  import { ref } from 'vue';
  const classObject = ref({
    active: true,
    'text-danger': false
  })
</script>

<template>
  <div
    class="static"
    :class="classObject"//这里
  >我是div</div>
</template>

<style scoped>
  .active {
    color: green;
  }
  .text-danger {
    color: red;
  }
</style>
```

> 事实上，我们不一定刚好需要渲染的class依赖的data就本身是一个对象，因此更好的做法是==**:class绑定为返回对象的计算属性**==
>
> ```javascript
> const isActive = ref(true)
> const error = ref(null)
>
> const classObject = computed(() => ({
>   active: isActive.value && !error.value,
>   'text-danger': error.value && error.value.type === 'fatal'
> }))
>
> <div :class="classObject"></div>
> ```

- 绑定数组






### watch函数

- 作用：侦听**一个或多个数据**的变化，数据变化时执行回调函数
- 同样拥有两个额外参数：1.immediate(立即执行) 2.deep(深度监听)
- 语法：
  1. 导入watch函数
  2. 执行watch函数传入要监听的响应式数据==(**ref对象**)==和回调函数![69829013413](Vue3学习笔记.assets/1698290134131.png)
  3. 此外还可以监听多个数据![69829018181](Vue3学习笔记.assets/1698290181815.png)

#### immediate与deep

- immediate：在监听器创建时立即触发回调，响应式数据变化后继续执行回调
- deep：当ref(复杂类型)时，监视内部数据的变化(复杂类型即对象)
- 语法：
  - ![69829161153](Vue3学习笔记.assets/1698291611530.png)



#### 精确侦听对象某个属性

- 语法：
- ![69829169930](Vue3学习笔记.assets/1698291699301.png)

### 生命周期API(选项式VS组合式)

![69829305829](Vue3学习笔记.assets/1698293058294.png)

- 注意：原先的beforeDestory和destoryed被替换为了onBeforeUnmount和onUnmounted，
- 且原先需要写在beforeCreate/created中的内容现在直接写在setup里即可
- 语法：
  1. 导入对应函数![69829333443](Vue3学习笔记.assets/1698293334439.png)
  2. 调用![69829335820](Vue3学习笔记.assets/1698293358204.png)

> 写成函数的调用方式后，可以调用多次，并不会冲突，而是按照顺序依次执行



### 组合式API下的父传子

- 基本思想：
  1. 父组件给子组件绑定属性
  2. 子组件内部通过props选项接收
- 注意这里如果需要再script标签内使用父组件传入的参数的话需要接收defineProps的返回值，而在模板里可以直接使用

![69831892786](Vue3学习笔记.assets/1698318927869.png)

上图例子中因为传递的是静态属性因此不用使用v-bind即没有冒号，而如果传递变量才要冒号

> defineProps原理：就是编译阶段的一个标识，实际编译器解析时，遇到后会进行编译转换![69831907124](Vue3学习笔记.assets/1698319071249.png)



### 组合式API下的子传父

- 基本思想：
  1. 父组件中给子组件标签通过@绑定事件
  2. 子组件中通过emit方法触发时间事件

![69831955595](Vue3学习笔记.assets/1698319555956.png)

与vue2不同的是这里的emit定义的方法都需要使用defineEmits进行声明后再使用，此外这里没有this.$emit的原因也是setup没有this指针的原因





### 模板引用

即获取DOM元素/组件对象，在Vue2中我们使用的是ref标识this.$refs获取

在Vue3则不是这样

- 语法：
  1. 使用ref函数生成一个ref对象
  2. 通过ref标识绑定ref对象到标签

![69831989292](Vue3学习笔记.assets/1698319892922.png)

> 需要注意的是获取模板引用的时机==一定要等待组件挂载完毕后==







#### defineExpose

实际上我们有时候会使用ref模板引用去获取组件对象，并且获取组件对象中的属性或方法

此时使用ref获取到组件对象后实际上是无法直接得到组件的属性/方法的

**需要再组件中将想要暴露的属性/方法进行暴露后才可以得到**

![69832102612](Vue3学习笔记.assets/1698321026124.png)





### provide与inject

有时候我们会有跨层级组件传递的需求，例如爷爷组件向孙子组件传递消息

此时使用provide与inject可以很好地实现

- 语法：
  1. 顶层组件通过provide函数提供数据
  2. 底层组件通过inject函数获取数据

![69832378963](Vue3学习笔记.assets/1698323789633.png)

> 如果想实现底层组件修改顶层组件数据，那么可以通过顶层组件传递一个方法给底层组件来实现





### Vue3.3新特性-defineOptions

- 背景：在使用<script setup>之前我们可以很轻松地就定义props、emits、name等与setup函数平级的属性，但是使用<script setup>之后script的内容就被setup函数充满了，因此难以添加平级属性

![69832440264](Vue3学习笔记.assets/1698324402646.png)

![69832442713](Vue3学习笔记.assets/1698324427130.png)





### Vue3新特性-defineModel

在Vue3中，自定义组件上使用v-model，相当于传递应该modelValue属性，同时触发update:modelValue事件(不再是Vue2里的:value属性和@input事件了)![69838984535](Vue3学习笔记.assets/1698389845357.png)

因此在没有使用defineModel之前，我们使用v-model实现父子组件双向绑定需要这样

![69839041073](Vue3学习笔记.assets/1698390410731.png)

![69839052066](Vue3学习笔记.assets/1698390520667.png)

这样做十分复杂，但是使用defineModel即可简单操作

* 语法如下：

![69839068798](Vue3学习笔记.assets/1698390687983.png)

![69839070596](Vue3学习笔记.assets/1698390705965.png)

直接修改modelValue的值即可反馈到父组件中

不过这样有点子组件直接修改父组件数据的味道~

![69839079118](Vue3学习笔记.assets/1698390791180.png)



### 异步组件

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 [`defineAsyncComponent`](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能：

```JavaScript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

如你所见，`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

[ES 模块动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)也会返回一个 Promise，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```JavaScript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。它会将接收到的 props 和插槽传给内部组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载。

与普通组件一样，异步组件可以使用 `app.component()` [全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration)：

```JavaScript
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

也可以直接在父组件中直接定义它们：

```JavaScript
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

> 异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：
>
> ```javascript
> const AsyncComp = defineAsyncComponent({
>   // 加载函数
>   loader: () => import('./Foo.vue'),
>
>   // 加载异步组件时使用的组件
>   loadingComponent: LoadingComponent,
>   // 展示加载组件前的延迟时间，默认为 200ms
>   delay: 200,
>
>   // 加载失败后展示的组件
>   errorComponent: ErrorComponent,
>   // 如果提供了一个 timeout 时间限制，并超时了
>   // 也会显示这里配置的报错组件，默认值是：Infinity
>   timeout: 3000
> })
> ```
>
> 如果提供了一个加载组件，它将在内部组件加载时先行显示。在加载组件显示之前有一个默认的 200ms 延迟——这是因为在网络状况较好时，加载完成得很快，加载组件和最终组件之间的替换太快可能产生闪烁，反而影响用户感受。
>
> 如果提供了一个报错组件，则它会在加载器函数返回的 Promise 抛错时被渲染。你还可以指定一个超时时间，在请求耗时超过指定时间时也会渲染报错组件。



## Pinia

### 什么是Pinia

- Pinia是Vue的最新的**状态管理工具**，**是Vuex的替代品**


- 相比Vuex的优点：
  - 提供了更加简单的API(去掉了mutations，只留下state、actions、getters，其中actions可以直接修改state的数据)
  - 提供符合组合式风格的API(和Vue3新语法统一)
  - 去掉了modules的概念，每一个store都是应该独立模块
  - 对typescript友好



### 添加Pinia到Vue项目

实际开发项目时，关于Pinia的配置直接在Vue创建时即可选择Pinia进行添加

如果没有选择也可以按照官方文档进行配置

![69839217875](Vue3学习笔记.assets/1698392178752.png)![69839218454](Vue3学习笔记.assets/1698392184547.png)







### Pinia基本使用

- 定义store仓库
  1. 在src目录新建store目录，之后在该目录store中即可创建自己任意模块的仓库了![69839352567](Vue3学习笔记.assets/1698393525676.png)
  2. 使用defineStore定义仓库( 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`), 第一个参数是你的应用中 Store 的唯一 ID。)![69839360330](Vue3学习笔记.assets/1698393603305.png)
  3. 定义仓库内容(函数就是actions即可以直接在里面写异步内容)![69839370327](Vue3学习笔记.assets/1706357754610.png)



- 使用Pinia仓库

1. 在任意组件中导入定义好的仓库(defineStore的返回值是函数)![69839375637](Vue3学习笔记.assets/1698393756377.png)
2. 在模板中随意使用即可![69839380069](Vue3学习笔记.assets/1698393800694.png)





### storeToRefs

对于一个仓库导入到组件中后，我们经过前面的学习知道可以直接 仓库名.属性/仓库名.方法() 使用到该仓库的内容，那么如果你觉得这样麻烦的话，我们也可以将其中的内容进行解构，这样便不需要使用点了

但是！！！

对于属性而言，我们不能直接这样

![69839998276](Vue3学习笔记.assets/1698399982763.png)

这破坏了响应式，相当于声明了两个变量进行初始化了而已

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：

```javascript
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

==一句话：方法可以直接解构，属性需要使用storeToRefs()进行解构==





### pinia持久化存储

[参考官网Home | pinia-plugin-persistedstate (prazdevs.github.io)](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)

==注意：当本地拥有数据时，pinia内的数据会被本地数据覆盖==

- 使用步骤：

  1. 安装对应插件``npm i pinia-plugin-persistedstate``

  2. 将插件添加到 pinia 实例上

     ```javascript
     import { createPinia } from 'pinia'
     import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

     const pinia = createPinia()
     pinia.use(piniaPluginPersistedstate)
     ```
     3. 在创建store时，传入第三个参数一个对象(**默认整个store的数据都做持久化存储**)![69847139473](Vue3学习笔记.assets/1698471394739.png)

- 当然，我们如果不希望使用pinia的默认配置，也可以自己配置相应的配置项![69847178892](Vue3学习笔记.assets/1698471788929.png)

- 例如：持久化存储的键名可以自定义，只需为persist对象传入以key为键的键值对即可![69847187276](Vue3学习笔记.assets/1698471872768.png)

- 如果不想整个store都被持久化，那么可以传入paths为键的键值对![69847191056](Vue3学习笔记.assets/1698471910564.png)




## 大事件管理系统

![69847678461](Vue3学习笔记.assets/1698476784612.png)



### pnpm包管理器-创建项目

- pnpm的优势：比同类工具快2倍左右、节省磁盘空间
- 安装方式：``npm install -g pnpm``
- 创建项目：``pnpm create vue``

> 总结目前所学三种包管理器：
>
> ![69847717017](Vue3学习笔记.assets/1698477170175.png)



### ESLint & prettier 配置代码风格

**环境同步：**

1. **安装了插件 ESlint，开启保存自动修复**
2. **禁用了插件 Prettier，并关闭保存自动格式化**

```jsx
// ESlint插件 + Vscode配置 实现自动格式化修复
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
"editor.formatOnSave": false,
```

**配置文件 .eslintrc.cjs**

1. prettier 风格配置 [https://prettier.io](https://prettier.io/docs/en/options.html )
   1. 单引号
   2. 不使用分号
   3. 每行宽度至多80字符
   4. 不加对象|数组最后逗号
   5. 换行符号不限制（win mac 不一致）
2. vue组件名称多单词组成（忽略index.vue）
3. props解构（关闭）

```jsx
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
```



### 基于husky的代码检查工作流

- husky是git的一个hooks(钩子)工具，即husky可以帮助我们在git管理项目的过程中使用钩子，或者说在特定的时间执行特定的代码，最有用的就是在我们进行代码提交之前进行代码检查
- https://typicode.github.io/husky/
- 使用步骤：
  1. 初始化git仓库，执行``git init``
  2. 初始化husky工具配置，执行``pnpm dlx husky-init && pnpm install``
  3. 修改.husky/pre-commit文件

```jsx
pnpm lint//lint是package.json中的eslint全局检查命令
```

**问题：**默认进行的是全量检查，耗时问题，历史问题，我们不可能保证别人的代码也能够完全符合规范！

**解决**：使用暂存区eslint校验(即只对自己写的代码进行校验)

- 步骤：
  1. 安装lint-staged包``pnpm i lint-staged -D``
  2. package.json中配置lint-staged![69848176629](Vue3学习笔记.assets/1698481766293.png)
  3. 修改.husky/pre-commit文件``pnpm lint-staged``





### VueRouter4路由变化

![69849051666](Vue3学习笔记.assets/1698490516666.png)

1. 创建路由实例不再是直接new VueRouter而是被封装成**createRouter函数**
2. 路由模式
   1. **history**模式使用**createWebHistory**()   即地址栏没有#
   2. **hash**模式使用**createWebHashHistory**()  即地址栏带#
   3. 参数是基础路径，默认是/，而这里的``import.meta.env.BASE_URL``指向的是vite.config.js中的base配置项，即设置地址栏的基地址





**在Vue3 CompositionAPI中**

- **获取路由对象 router** 使用``const router = useRouter()``
- **获取路由参数route**使用``const route = useRoute()``





### 按需导入Element Plus

* 使用步骤：
  1. 安装``pnpm add element-plus``
  2. 按照官方文档进行配置按需导入[快速开始 | Element Plus (element-plus.org)](http://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)
  3. 直接使用组件即可(默认components下的文件也会被自动注册)





### pinia仓库统一管理

- 将main.js中与pinia相关的内容都移动到stores/index.js中

![69849453685](Vue3学习笔记.assets/1698494536858.png)

- 将所有仓库都导出到同一个出口再导出实现仓库的统一导出(可以将所有仓库的use函数都导出到index.js中![70635756974](Vue3学习笔记.assets/1706357569743.png)![69849472033](Vue3学习笔记.assets/1698494720335.png)

![69849473231](Vue3学习笔记.assets/1698494732312.png)





### Element-plus使用

#### 布局相关

- <el-row>标签表示一行，一行分为24份
- <el-col>标签表示一列
  - 属性span代表在一行中，占多少份
  - 属性offset代表在一行中，左侧margin份数
- <el-form>表示整个表单组件
- <el-form-item>表单的一行(一个表单域)
- <el-input>表单元素(输入框)



#### 校验相关

- <el-form> => :model="ruleForm"绑定的整个form的数据对象{xxx,xxx,xxx}
- <el-form> => :rules="rules"  绑定的整个表单的规则对象{xxx,xxx,xxx}
- 表单元素 => v-model="ruleForm.xxx" 给表单元素绑定form的子属性
- <el-item> => prop配置项生效的是哪个校验规则
- 校验规则：
  - 非空校验![69858049108](Vue3学习笔记.assets/1698580491089.png)
  - 长度校验![69858049941](Vue3学习笔记.assets/1698580499416.png)
  - 正则校验![69858051032](Vue3学习笔记.assets/1698580510324.png)
  - 自定义校验：![69858130486](Vue3学习笔记.assets/1698581304867.png)




#### menu组件

- <el-menu>表示整个表单组件
  - :default-active配置默认激活项
  - router表示是否启用 `vue-router` 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 
- <el-menu-item>表示表单项
  - index属性在router模式下配置的是激活时跳转的路径



