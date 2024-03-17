# CSS定义

层叠样式表（Cascading Style Sheets, 缩写为CSS）,是一种样式表语言，用来描述HTML文档的呈现（美化内容）

```
CSS书写规则
选择器 {
    属性名:属性值;
}
```

------

#  CSS引入方式

- 内部样式表	
  - CSS代码直接写在style标签内
		外部样式表	
  - CSS代码写在单独的CSS文件中，使用link标签引入
		行内样式	
  - CSS代码直接写在想要应用样式的标签中

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./02_CSS.css">
</head>
<body>
    <p>这个段落应用外部引入CSS</p>
    <div style="color: blue; font-size: larger;">这个标签应用行内样式引入CSS</div>
</body>
</html>
```

------

# 选择器

- 标签选择器	
  - 即选择同名标签设置相同样式
		类选择器	
  - 可以差异化设置标签的显示效果
  - 一个类选择器可以供多个标签使用
  - 一个标签也可以使用多个类选择器，类名之间用空格隔开即可

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .mySheet1 {
            color: blueviolet;
            font-size: larger;
        }
        .mySheet2{
            color: chartreuse;
            font-size: x-large;
        }
    </style>
</head>
<body>
    <p class="mySheet1">段落1</p>
    <p class="mySheet2">段落2</p>
    <p class="mySheet1 mySheet2">段落3</p>
    <p>段落4</p>
</body>
</html>
```

- id选择器	
  - 查找标签，差异化设置标签的显示效果
  - id选择器一般配合JS使用
  - 同一个id在一个页面中只能使用一次

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #hd{
            color: blue;
            font-size: large;
        }
    </style>
</head>
<body>
    <p id="hd">标题</p>
</body>
</html>
```

-  通配符选择器	
  - 查找页面所有标签，设置相同样式
  - 实际开发中用于清除默认样式
	 属性选择器	
  - **属性选择器**匹配那些具有特定属性或属性值的元素

```
/* 存在 title 属性的 <a> 元素 */
a[title] {
  color: purple;
}

/* 存在 href 属性并且属性值匹配"https://example.org"的 <a> 元素 */
a[href="https://example.org"]
{
  color: green;
}

/* 存在 href 属性并且属性值包含"example"的 <a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在 href 属性并且属性值结尾是".org"的 <a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在 class 属性并且属性值包含单词"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```



# 文字控制属性

![img](https://img-blog.csdnimg.cn/b528c50953a2412cae32db937f67c019.png)

-  font-size属性	
  - 必须带单位px
  - 谷歌浏览器默认像素大小为16px
	 font-weight	
  - 属性值可以是数字正常是400，加粗是700
  - 也可以是关键字，正常是normal，加粗是bold
	 font-style	
  - 通常用于清除文字倾斜效果
  - 属性值正常是normal，倾斜是italic
	 line-height	
  - 设置多行文字的间距
  - 属性值通常是数字+px，或数字（表示当前标签font-size属性值的倍数）
  - 测量行高的方法：		
    - 从一行文字的最顶（最底）测量到下一行文字的最顶（最底）
  	 单行文字垂直居中（只适用于单行文字）		
    - 只需设置当前行高为盒子高度即可

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            height: 100px;
            line-height: 100px;
            background-color:bisque;
        }
    </style>
</head>
<body>
    <div>文字</div>
</body>
</html>
```

- font-family	
  - 属性值为想要的字体
  - 属性值可以填写多个字体名，各个字体名之间使用逗号隔开，执行顺序按照从左到右，找到哪个用哪个
		font复合属性	
  - 这是一种属性的简写方式，一个属性对应多个值的写法，各个属性值之间使用空格隔开
  - font: 是否倾斜 是否加粗 字号/行高 字体（必须按照顺序填写）
  - 字号和字体必须填写，否则效果不生效
		text-indent	
  - 属性值可以是数字+px，或数字+em（1em=当前标签的字号大小）
  - 用于文字的缩进
		text-align	
  - 控制内容的水平对齐方式
  - 属性值有三种：left,center,right分别对应左中右对齐
  - text-align本质是控制内容的对齐方式，属性要设置给内容的父级
  - 例如给div里的图片设置居中，那么需要将div的text-align设置为center
		text-decoration 	
  - 该属性通常用于删除a标签的下划线
  - 属性值有none、underline、line-through、overline分别对应无、下划线、删除线、上划线
- color

![img](https://img-blog.csdnimg.cn/2cc633fa5b0648d0903ba5030c95c0be.png)

------

# 复合选择器

由两个或多个基础选择器，通过不同的方式组合而成

## 后代选择器

- 选择某个元素的后代元素
- 写法：父选择器 子选择器{CSS属性}父子元素之间使用空格隔开
- 注意：后代选择器选择所有后代包括儿子、孙子、重孙子

## 子代选择器

- 选中某个元素的子代元素（最近的子级）
- 写法：父选择器>子选择器{CSS属性}，父子元素之间使用>隔开

## 并集选择器

- 选中多组标签设置相同的样式
- 写法：选择器1，选择器2....，选择器N{CSS属性}选择器之间使用,隔开

## 交集选择器

- 选中同时满足多个条件的元素
- 写法：选择器1选择器2{CSS属性}（选择器之间连写，无需符号隔开）
- 如果多个选择器之间有标签选择器，那么标签选择器放在最前面

## 伪类选择器

- 伪类表示元素的状态，选中元素的某个状态设置样式
- 例如鼠标悬停状态写法：选择器:hover{CSS属性}
- 选择器:focus{CSS属性}适用于焦点获取
- 选择器:check{CSS属性}用于选择被勾选的复选框

超链接的伪类

![img](https://img-blog.csdnimg.cn/0819c348780d46479adfc8cb950e4d37.png)

------

# CSS特性 

## 继承性

- 子级标签默认继承父级标签的文字控制属性
- 我们一般工作中直接在body标签中设置我们想要的默认文字属性，如果再有特殊的文字属性再特殊选择进行设置即可
- 注意如果标签自己有自己的样式则生成自己的样式，不继承

## 层叠性

- 同一个标签，如果设置了相同的属性会出现覆盖的情况，不同的属性则都生效

## 优先级

- 也叫权重，当一个标签使用了多个选择器时，基于不同类型的选择器的匹配规则
- 规则：选择器优先级高的样式生效（选择器范围越大，优先级越小）
- 通配符选择器<标签选择器<类选择器<id选择器<行内样式<!important
- 这里的!important可以将某个选择器优先级提高到最高

### 叠加计算规则

如果是一个标签被多个复合选择器选中，则需要权重叠加计算

![img](https://img-blog.csdnimg.cn/2be28ea2ba644e10ac770088fe0173ca.png)

------

# Emmet写法

即代码的简写方法，输入缩写VSCode会自动生成对应代码

![img](https://img-blog.csdnimg.cn/41a40f36376049a3b5050927fddd15a4.png)编

 以此类推，CSS属性也能这样写

------

# CSS自定义属性

带有前缀 `--` 的属性名，比如 `--example--name`，表示的是带有值的自定义属性，其可以通过 [`var()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var) 函数在全文档范围内复用的

```css
:root {
  --first-color: #488cff;
  --second-color: #ffff8c;
}

#firstParagraph {
  background-color: var(--first-color);
  color: var(--second-color,"#ffff8c");//这里的"#ffff8c"当变量不存在时默认值为#ffff8c
}

#secondParagraph {
  background-color: var(--second-color);
  color: var(--first-color);
}

#container {
  --first-color: #48ff32;
}

#thirdParagraph {
  background-color: var(--first-color);
  color: var(--second-color);
}

```

**:root** 这个 CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)匹配文档树的根元素。对于 HTML 来说，**:root** 表示 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) 元素，除了[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)更高之外，与 `html` 选择器相同，使用:root是为了使得变量在任何地方都可以被访问到

**备注：** 自定义属性名区分大小写——`--my-color` 会被视为与 `--My-color` 不同的自定义属性。



------

# 背景属性

- 属性background-image，属性值为图片的路径，写法background-image: url(路径);	
  - 注意背景图是平铺的效果，即可能出现盒子太小导致背景图装不下，或者盒子太大背景图复制出现多次
- 属性background-repeat，属性值有no-repeat，repeat，repeat-x，repeat-y，分别对应不平铺，平铺（默认），水平平铺，垂直平铺
	 属性background-position，属性值可以是关键字left，right，center，top，bottom或坐标（数字+px，正负都可以）	
  - 属性值默认先输入水平方向位置再是垂直方向位置
  - 注意关键字写法可以颠倒取值顺序（左下与下左一样）
  - 如果只写一个关键字，默认另外一个关键字为居中
	 属性background-size用于设置背景图大小	
  - 属性值有cover（等比例缩放背景图片以完全覆盖背景区，可能出现背景图片部分看不见）
  - contain等比例缩放背景图片以完全装入背景区，可能背景区部分空白没填充
  - 百分比，根据盒子尺寸计算图片大小
	 属性background-attachment	
  - 属性值fixed使得背景固定，不会随这元素的内容滚动
	 背景复合属性background	
  - 属性值：背景色 背景图 背景图平铺方式 背景图位置/背景图缩放 背景图固定（空格隔开，不区分顺序）

------

# 补充 object-fit

这里的object-fit属性对标背景属性的background-size，但是object-fit属性是针对图片img而言的，其中属性值contain与cover与背景属性的效果一样        

------

# 显示模式

- 块级元素（div）	
  - 独占一行
  - 宽度默认是父级的100%（即一样）
  - 添加宽高生效
		行内元素（span）	
  - 一行可以显示多个
  - 宽高尺寸由内容撑开
  - 设置宽高属性不生效
		行内块元素（img）	
  - 一行可以显示多个
  - 设置宽高属性生效
  - 宽高属性由内容撑开

------

## 转换显示模式

- 属性名display	
  - 属性值block(块级),inline(行内),inline-block(行内块)

------

# 结构伪类选择器

- 作用是根据元素的结构关系来查找元素

![img](https://img-blog.csdnimg.cn/a66545f3101c40ebb58e0b82068c2853.png)

## 公式写法

根据元素结构关系查找多个元素

写法：E:nth-child(公式) 

![img](https://img-blog.csdnimg.cn/6725e565969541b8989afbb9dbd3f7d1.png)

- 注意括号内直接是常数的话下标从1开始
- 如果有n那么下标从0开始

------

# 伪元素选择器

- 用于创建虚拟元素（伪元素），用来摆放装饰性的内容

![img](https://img-blog.csdnimg.cn/228f550d95754c3dbffab2ab36d20735.png)

- 注意必须设置content:" "属性用于设置伪元素的内容，如果没有内容，则引号留空即可
- 伪元素默认是行内显示模式
- 权重与标签选择器相同

------

# PxCook

PxCook（像素大厨）是一款切图设计工具软件，支持PSD文件的文件、颜色、距离自动只能识别

- 开发面板（自动智能识别）
- 设计面板（手动测量尺寸和颜色）

------

# 盒子模型

作用：布局网页，摆放盒子和内容

- 内容区域height&width
	 内边距padding（出现在盒子边缘与内容之间）设置四个方向的内边距	
  - 此外可以也可以单独设置各个方向的内边距使用属性padding-top、padding-right、padding-bottom、padding-left
  - 多值写法![img](https://img-blog.csdnimg.cn/1cc248f5694842a0b08a5a7bd1673e80.png)
	 边框线border	
  - 这是一个复合属性
  - 属性值有边框线粗细、线条样式、颜色（不区分顺序）
  - 常用样式有solid（实线），dashed（虚线），dotted（点线）
  - 此外还有border-top、border-right、border-left、border-bottom来单独设置某个方向的边框
	 外边距margin（出现在盒子外面）	
  - 与内边距的属性写法一样这里不再赘述
  - 版心居中实现：设置margin左右都为auto即可，浏览器会根据分辨率与盒子宽度自动计算左右外边距（盒子要有宽度）

------

## 尺寸计算

- 默认情况       	
  - 盒子尺寸=内容尺寸+border尺寸+内边距尺寸
  - 即给盒子添加border/内边距都会撑大盒子
		解决办法	
  - 手动做减法，盒子的宽/高都减去border/padding的尺寸
  - 内减模式：属性box-sizing:border-box（浏览器自动做减法）

------

## 元素溢出

- overflow属性
	 属性值	
  - hidden将溢出的内容隐藏起来
  - scroll无论是否溢出都会显示滚动条（横向和纵向）
  - auto只有溢出才会显示滚动条（只有纵向）

------

## 外边距问题-合并现象

- 当出现垂直排列的兄弟元素，上下margin会合并
- 注意是取得两个margin中的较大值生效

------

## 外边距问题-塌陷现象

- 当存在父子级标签，我们在子级标签添加上外边距，就会产生塌陷
- 塌陷即导致父级一起向下移动
	 解决办法如下	
  - 取消子级外边距，父级设置内边距
  - 父级设置overflow：hidden
  - 父级设置border-top

------

## 圆角

- 设置元素的外边框为圆角
- border-radius
	 属性值：数字+px/百分比	
  - 属性值是圆角半径
	 常见应用	
  - 正圆给正方形盒子设置圆角属性值为 宽高的一半或50%（最圆即正圆）
  - 胶囊形状：给长方形盒子设置圆角属性值为 盒子高度的一半

------

## 

## 阴影

- 给元素设置阴影效果
- 属性名：box-shadow
- 属性值：X轴偏移量 Y轴偏移量 模糊半径 扩散半径 颜色 内外阴影
	 注意	
  - X轴偏移量与Y轴偏移量必须写
  - 默认是外阴影，内阴影需要添加inset

------

## 行内元素的垂直内外边距

- 我们发现当我们给行内元素添加margin和padding，无法改变元素垂直位置
- 解决办法：给行内元素添加line-height可以改变垂直位置

------

# 清除标签默认样式

因为某些标签在使用时都具有自己的默认样式，有时候我们不想要这些样式就需要进行清除

只需使用CSS对所有标签设置内外边距为0即可，有时候我们还会默认开启内减模式，避免后续撑大盒子

```
    <style>
        *{
            margin: 0px;
            padding: 0px;/*默认清除内外边距离以及开启内减*/
            box-sizing: border-box;
        }
        li{/*对li标签前面的小圆点进行清除*/
            list-style: none;
        }
    </style>
```

------

# 标准流

标准流也叫文档流，指的是标签在页面中的默认排列规则，例如：块元素独占一行，行内元素一行可以显示多个

# 浮动（了解）

- 作用	
  - 让块元素水平排列
		属性名	
  - float
		属性值	
  - left左对齐
  - right右对齐
		特点	
  - 浮动的盒子会顶对齐
  - 浮动的盒子具备行内块特点
  - 必须要浮动就都浮动，否则会出现脱标（即认为浮动的盒子不存在）

## 浮动带来的问题

场景：浮动元素会脱标，如果父级没有高度，子级无法撑开父级高度（可能导致页面错乱）

解决办法：

- 额外标签法	
  - 在父元素内容的最后添加一个块级元素，并且设置CSS属性clear:both
		单伪元素法	
  	 定义一个伪元素选择器		
    - 属性为content属性值为空
    - 属性display属性值为block
    - 属性clear属性值为both
- 双伪元素法

![img](https://img-blog.csdnimg.cn/898af65d45954c8f95c21db814a50dc9.png)

- hidden法	
  - 给父级元素添加overflow:hidden属性，则浏览器会检查父级元素范围 

------

# Flex布局

flex布局也叫弹性布局，是浏览器提倡的布局模型，非常适合结构化布局，提供了强大的空间分布和对齐能力，并且flex模型不会产生浮动布局中的脱标现象，布局网页更简单灵活

## Flex组成

- 设置方式：给父元素设置display：flex，子元素可以自动挤压或拉伸
	 组成部分	
  - 弹性容器
  - 弹性盒子（沿着主轴排列）
  - 主轴：默认在水平方向
  - 侧轴/交叉轴：默认在垂直方向

## 常用属性

- **属性名：justify-content**

![img](https://img-blog.csdnimg.cn/de55c02660864092af29cf226353c4de.png)

注意

- ​         center将父级剩余空间都分配到两侧	

  - space-between在弹性容器与盒子之间没有间隙
  - space-around在弹性盒子与容器之间间隙 盒子与盒子之间 间隙大小不同（视觉上容器与盒子间隙是盒子与盒子间隙的1/2）
  - space-evenly间隙大小都相同

- **属性名align-items**：当前弹性容器内所有弹性盒子的侧轴对齐方式（给弹性容器设置，即整体）

- align-content：设置了浏览器如何沿着[弹性盒子布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout)的纵轴和[网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout)的主轴在内容项之间和周围分配空间(给**弹性盒子设置的，即所有子盒子之间的间隙)。

- 属性名align-self

  ：单独设置某个弹性盒子的侧轴对其方式（给弹性盒子设置）	

  - stretch 弹性盒子沿着侧轴线被拉伸至铺满容器（弹性盒子没有设置侧轴方向尺寸则默认拉伸）
  - center弹性盒子沿着侧轴居中排列
  - flex-start弹性盒子从侧轴起点开始排列
  - flex-end弹性盒子从终点开始排列

- 属性名flex-direction：

  修改主轴方向	

  - 主轴默认在水平方向，侧轴默认在垂直方向
  - 属性值column 垂直方向，从上到下（将主轴设置为垂直方向，同时侧轴就是水平方向了）

- 属性名flex：

  修改弹性盒子的主轴方向的尺寸	

  - 属性名flex
  - 属性值为一个整数，表示占用父级剩余尺寸的份数
  - 默认情况下（没有设置大小情况下），弹性盒子的大小在主轴上被内容撑开，在侧轴上被拉伸
  - 有时候浏览器默认优先生效标签的默认宽度，会导致flex: 1不生效，此时我们需要利用width: 0重置当前标签的默认宽度

- 属性名flex-wrap：

  实现弹性盒子的换行	

  - 因为弹性盒子可以自动挤压或拉伸，所以默认情况下，所以弹性盒子都在一行显示
  - 属性值wrap换行
  - 属性值nowrap不换行（默认）

- 属性名align-content：

  调整每一行盒子行对齐	

  - 注意该属性对单行盒子无效

![img](https://img-blog.csdnimg.cn/5e015ff38b6d4f21aafa7ae33bdacb7a.png)

------

# 项目技巧

## 网页制作思路

先整体再局部，从上到下，从左到右

## logo制作技巧

- logo功能：	
  - 单击跳转到首页
  - 搜索引擎优化：提升网页百度搜索排名
		实现方法;	
  - 标签结构：h1>a>网页名称（搜索关键字）

## 导航制作技巧

- 实现方法：	
  - 标签结构：ul>li*3>a
  - 优势：避免堆砌a标签，网站搜索排名降级

## 轮播图制作技巧

- 实现方法	
  - 标签结构：ul>li>a>img

------

# 行内元素与行内块元素居中

- vertical-align属性	
  - 属性值middle居中

------

# 定位

- 灵活地改变盒子在网页中的位置	
  - 相比前面所学的标准流、浮动、flex布局我们并不能实现两个标签压在一起的操作，而定位就可以
		属性position用于设置定位模式	
  	 相对定位模式属性值**relative**		
    - 改变位置的参照物为自己原来的位置
    - 不脱标，占位（即自己原来的位置别人也不能用）
    - 标签
  		绝对定位模式属性值**absolute**		
    - 脱标，不占位
    - 参照物：先找最近的已经定位的祖先元素：如果所有祖先元素都没有设置定位，参照浏览器可视区修改位置
    - 显示模式特点会改变：宽高生效（具备行内块特点）
  		实现弹出窗口的居中		
    - 设置绝对定位
    - 水平和垂直偏移量设置为50%
    - 再使用transform属性设置translate（-50%，-50%）将盒子向左向上移动自身宽高的一半
  		固定定位模式属性值**fixed**		
    - 脱标，不占位
    - 参照物：浏览器窗口
    - 显示模式改变为行内块特点
  - 一般定位上 相对定位 与 绝对定位 配合使用（子级设置绝对定位 父级设置相对定位 ）
- 边偏移属性left、right、top、bottom用于设置盒子的位置
	 堆叠层级	
  - 当有多个元素进行堆叠显示时，默认效果是按照标签书写顺序，后来者居上
  - z-index属性		
    - 作用设置定位元素的层级顺序，改变定位元素的显示顺序
    - 属性值为一个整数，整数越大，优先级越大

------

# CSS精灵

- CSS精灵，也叫CSS Sprites，是一种网页图片应用处理方式
- 可以把网页中的一些背景图片整合到一张图片文件中，再使用background-position精确定位出背景图片的位置
- 好处：减少服务器被请求次数，减轻服务器的压力，提高页面加载速度

使用步骤

1. 创建一个盒子，盒子尺寸与我们想要的图片尺寸大小相同
2. 设置盒子背景图为包含我们想要图片的精灵图
	. 添加background-position属性改变背景图位置	
   1. 使用测量软件测量得到想要图片的左上角坐标
   2. background-position取负数坐标属性值

------

# 字体图标

- 字体图标的本质是字体，但是展示的是图标
- 作用：在网页中添加简单的、颜色单一的小图标
	 优点：	
  - 灵活性：灵活地修改样式，例如：尺寸颜色等
  - 轻量级：体积小渲染块，降低服务器请求次数
  - 兼容性：几乎兼容所有主流浏览器
  - 使用方便
	 对比前面所学的CSS精灵	
  - 二者应用场景不同
  - 字体图标适用于简单、颜色单一的小图标
  - CSS精灵适用于较为复杂的图标

如何使用字体图标

- 下载所需的字体图标（国内一般是iconfont）
- 引入字体样式表（iconfont.css在下载的压缩包中）
	 标签使用字体图标类名	
  - iconfont
  - iconf-xxx:图标对应的类名
- 注意如果要调整字体大小，注意选择器的优先级 要高于iconfont类

------

# 行内块与行内元素的垂直对齐方式

- 属性vertical-align
	 属性值	
  - baseline实现基线对齐
  - top实现顶部对齐
  - middle实现居中对齐
  - bottom实现底部对齐

------

## 补充基线概念

在浏览器中，默认会把行内块与行内元素都当作文字处理，并且将它们使用基线对齐排列

![img](https://img-blog.csdnimg.cn/953594b645cc49ac90a551b6844a5a58.png)

 因为基线的存在，行内块与行内标签的底下会存在空白

- 消除该空白的方式	
  - 使用vertical-align赋给高度较高的元素
  - 使用display将行内块转为块

------

# 过渡transition

- 作用：可以为一个元素在不同状态之间切换的时候添加过渡效果
- 属性名：transition（复合属性）
- 属性值：想要过渡的属性 花费时间（s）
	 注意	
  - 过渡的属性可以是具体的CSS属性
  - 也可以是all（即当前标签的所有属性都产生过渡）
  - transition设置给元素本身

------

# 修饰属性-透明度与光标

- 透明度opacity	
  - 作用：设置整个元素的透明度（包括背景和内容）
  - 属性值为0-1（0则完全透明，1则完全不透明）
		光标类型cursor	
  - 属性值
  - pointer为小手效果提示用户可以点击
  - text为工字型提示用户可以输入
  - move为十字型提示用户可以移动

------

# SEO三大标签

SEO是搜索引擎优化的英文简写，即可以提升网站在搜索引擎的排名

- 提升SEO的常用方法	
  - 花钱提升排名
  - 将网页制作为html后缀
  - 标签语义化
  - ....
		网页头部SEO标签：	
  - title：网页标题标签
  - description：网页描述
  - keyword：网页关键字

------

# 移动Web

## 平面转换transform

- 作用：为元素添加动态效果，一般与过渡transition配合使用
- 概念：改变盒子在平面内的形态（位移、旋转、缩放、倾斜）
- 平面转换又称为2D转换
- transform作为一个复合属性
- 注意：这个属性由于我们可能想加入多个平面转换属性，一定注意使用复合属性，否则后续再次使用该属性会导致前面的transform效果被覆盖

具体移动的方向可以参考下图

![img](https://img-blog.csdnimg.cn/9f28aae809494ee0a5bf75fd53477373.png)

- ### 属性translate 

- 属性值的写法是带括号的写法即transform：translate（X轴移动距离，Y轴移动距离）

- 这里括号内取值可以是像素单位数值、百分比（参照盒子自身尺寸计算结果）这里正负均可

	 技巧	

  - translate()只写一个值，表示沿着X轴移动
  - 单独设置X或Y轴移动距离，使用translateX或translateY

- ### 属性rotate(旋转角度)

  - 角度单位是deg（即代表要选择多少度）
  - 取值可正可负（取值为正顺时针，取值为负逆时针）
  	 默认情况下，旋转的原点是盒子的中心点，但是我们可以通过属性transform-origin改变		
    - transform-origin属性值取值可以是方位名词（left、right等注意以空格隔开）、像素单位数值、百分比

- ### 多重转换（即一个盒子可以同时进行平面移动和旋转）

  - 技巧
  	 先平移再旋转（因此在书写属性时先写translate再写rotate属性（空格隔开））		
    - 先平移再旋转是因为旋转会改变坐标轴的方向（默认坐标轴水平和垂直，如果先写了旋转那么坐标轴变了，平移的方向也变了）
  - 注意如果想要实现多重转换那么需要将transform作为一个复合属性使用，否则只能平移或只能旋转

- ### 缩放scale属性

  - 通常我们只给该属性设置一个值，表示x轴y轴等比例缩放
  - 取值大于1表示放大，小于1表示缩小，等于1则不变

- ### 倾斜属性skew

  - 属性值单位是deg度数，可正可负
  - 整数代表向左倾斜，负数代表向右倾斜

- ### 渐变

  - 渐变是多个颜色逐渐变化的效果，一般用于设置盒子背景
  	 分类		
    - 线性渐变：即从某个方向到某个方向颜色渐变			
      - ![img](https://img-blog.csdnimg.cn/1368e6aa57ea4be48223cc9df647e5bd.png)
    	 径向渐变：从中心点向四周渐变			
      - 作用：给按钮添加高光
      - ![img](https://img-blog.csdnimg.cn/a20565db28b54fe38758a90c58c51c3f.png)编辑

![img](https://img-blog.csdnimg.cn/5395ff307b834ada9d02f0bc2c553817.png)编辑

------

## 空间转换

前面所学的内容是二维上的，现在学习三维空间相关内容

空间：是从坐标轴角度定义的XYZ三条坐标轴构成了一个立体空间，Z轴位置与视线位置方向相同

空间转换也叫3D转换，同样利用transform属性进行空间平移、选择、缩放等

------

## 空间平移

![img](https://img-blog.csdnimg.cn/b5350b9ce0a64e6aaeb5ffcd813cf0a8.png)编辑

-  取值（正负均可）	
  - 像素单位数值
  - 百分比（参照盒子大小） 
- 注意这里的translate3d必须同时设置三个值才能生效

------

## 视距perspective

- 作用：指定了观察者与z=0平面的距离（设置人眼到电脑屏幕的距离），为元素添加了透视效果
- 透视效果：近大远小，近实远虚
- 属性：（添加给直接父级，一般取值范围为800~1200）
- perspective：视距；

------

## 空间旋转

- rotateZ属性	
  - 使得当前元素沿着Z轴旋转（根据正负值改变旋转方向）
		rotateX属性	
  - 使得当前元素沿着X轴旋转（根据正负值改变旋转方向）
		rotateY属性	
  - 使得当前元素沿着Y轴旋转（根据正负值改变旋转方向）
		rotate3d（x,y,z,角度度数）	
  - 用来设置自定义旋转轴的位置以及旋转的角度
  - x,y,z为取值为0~1之间的数字

![img](https://img-blog.csdnimg.cn/6c2abdd94bdf443c9bcfcc59f54fdc6b.png)

------

## 立体呈现

- 属性transform-style	
  - 作用设置元素的**子元素**是位于3D空间还是平面中
  	 属性值		
    - flat：平面
    - preserve-3d：子级处于3D空间中

------

## 空间缩放

![img](https://img-blog.csdnimg.cn/22476f76d99c4c26894baeafc1a78d29.png)编辑

------

## 动画

- 动画是加强版的过渡（transition）
  - 过渡只能实现两个状态之间的变化过程
  - 动画可以实现多个状态之间的变化过程，且动画过程可控（重复播放、最终画面、是否暂停） 

那么如何实现动画呢？

![img](https://img-blog.csdnimg.cn/35e22d538a7749c388b0e2c6e47de921.png)编辑

如上图所示，定义动画有两种方式，其中使用from和to的方式只有两个状态，且使用百分比的写法中百分比代表的是动画播放时长的百分比

其中大括号内书写当前状态的CSS代码即可![img](https://img-blog.csdnimg.cn/f26972d1a20e4253a3e75c3c7194d304.png)编辑 

------

### animation

作为复合属性时

![img](https://img-blog.csdnimg.cn/44d8829f90e743c19eda964f5a9ccd4e.png)编辑

- 其中动画名称和动画时长必须赋值
- 取值部分先后顺序
- 如果有两个时间值，那么第一个表示动画时长，第二个表示延迟时间

当然animation属性也能作为拆分属性使用

![img](https://img-blog.csdnimg.cn/9412dbfb19d8484f90c2e307ad6e16b3.png)编辑

------

### 无缝动画技巧

- 原理	
  - 复制开头图片到结尾位置（图片累加宽度=区域宽度）
  - 即使用开头的图片去填充结尾出现的空白

------

### 实现精灵逐帧动画

1. 准备显示区域（盒子尺寸与一张精灵小图尺寸相同）
2. 定义动画（移动背景图，移动距离=精灵图宽度）
3. 使用动画（设置step(N)，N与精灵小图个数一样）

------

### 多组动画

![img](https://img-blog.csdnimg.cn/fead55f242ba400e8fd25bb7a1c054c7.png)编辑

- 当动画的开始状态样式 跟 盒子默认样式相同，可以省略动画开始状态的代码

------

## 屏幕分辨率

- 即纵横向上的像素点数，单位是px
	 PC分辨率	
  - 1920*1080
  - 1366*768
	 缩放150%	
  - 1920/150%
  - 1080/150%
	 总结	
  - 硬件分辨率->物理分辨率（出厂设置）
  - 缩放调节的分辨率->逻辑分辨率（软件/驱动设置）
  - 写代码参考**逻辑分辨率**

------

## 视口

- 手机屏幕尺寸不同，网页宽度均为100%
- **网页的宽度和逻辑分辨率尺寸相同**
- 默认情况下移动端网页的宽与逻辑分辨率的宽不同
	 因此有了视口的概念	
  - 视口：显示HTML网页的区域，用来约束HTML尺寸（使得HTML宽度=逻辑分辨率宽度/设备的宽度）

![img](https://img-blog.csdnimg.cn/18e1035d222742a1be681fd6e0de0108.png)编辑

 如上图所示

- 其中width=device-width代表视口宽度=设备宽度
- initial-scale=1.0代表缩放1倍（即不缩放）

------

## 二倍图

- 即设计稿里面每个元素的尺寸倍数

	 作用	

  - 反之尺寸在高分辨率屏幕下模糊失真

- 因此如果我们拿到二倍图的设计稿，需要将其

  像素密度

  设置为2x	

  - 例如如果设计稿参考设备宽度为375px，那么得到的二倍图尺寸为750px

------

## 适配方案

- 宽度适配：宽度自适应	
  - 百分比布局
  - flex布局
		等比适配：宽高等比例缩放	
  - rem
  - vw

------

## rem

- rem是一个单位，是相对单位
- **rem单位是相对于HTML标签的字号计算结果**
- 即1rem=1HTML字号大小

------

## 媒体查询

前面我们学了rem，rem单位可以相对我们设置的HTML标签调整元素的像素大小，从而实现在不同分辨率的情况下的标签属性值，但是手机屏幕大小不同，分辨率不同，如何设置不同的HTML标签字号？答案是使用媒体查询

- 媒体查询可以检测视口的宽度，然后编写差异化的CSS样式
- 当某个条件成立，就执行对应的CSS样式（理解为编程语言中的if语句即可）

例如

![img](https://img-blog.csdnimg.cn/acfd27db77504eb2aa5ea0744aa924cb.png)编辑

上述代码的作用是当视口宽度为375.2px时，设置body标签的背景颜色为蓝色 

除此之外

当设备宽度不同时，HTML标签字号设置多少合适？

- 设备宽度大，元素尺寸大
- 设备宽度小，元素尺寸小
- 目前rem布局方案中，习惯将网页等分为10份，**HTML标签的字号设置为视口宽度的1/10**

![img](https://img-blog.csdnimg.cn/6275384f95e34ce6a751e8ef19ba2b65.png)编辑

当然市面上的手机型号那么多，视口宽度也那么多，我们不可能人工设置全部的HTML的字号大小，这个问题在学习了js后便可以解决

------

## rem-flexible.js

- flexible.js是一个用于适配移动端的js库
- 核心原理就是根据不同的视口宽度给网页中的html根节点设置不同的font-size
- 使用script标签将其引入到body标签内的最后一行即可

![img](https://img-blog.csdnimg.cn/1d785699abd54c8689c550377e5b8114.png)编辑

------

## rem的移动适配

在设计稿中一般给出的是像素值，那么我们要怎么知道当前元素的rem值是多少？

- 例如一个元素需要68px * 29px（设计稿适配375px视口）
- rem*37.5=68
- rem*37.5=29
- 计算得到当前元素的rem为1.813和0.773

那么我们计算得到元素的对应rem值是多少之后，面对不同的视口大小，我们就能得到对应的像素值（rem * 对应视口大小的1/10），从而实现移动适配

[移动端适配的5种方案 - 掘金 (juejin.cn)](https://juejin.cn/post/6953091677838344199#heading-4)

------

## less

- less是一个CSS的预处理器，它的后缀名是.less，扩充了css语言，使得css具备一定的逻辑性、计算能力
	 注意	
  - 浏览器不会识别less代码，因此，网页要引入对应的CSS文件
- CSCode插件：Easy LESS，保存less文件后自动生成对应的css文件

------

### less-注释

less注释语法与常用高级程序设计语言一样

- 单行注释	
  - 语法：//注释内容
		块注释	
  - 语法：/* 注释内容 */ 
		注意	
  - 只有块注释 会出现在less文件的对应css文件里面

------

### less-运算

- 加、减、乘直接书写运算表达式即可
	 除法的写法特殊：	
  - width：（100 / 4px）；
  - height：100 ./ 4px ；
  - 推荐使用括号写法
- 如果表达式中出现多个单位，最终以css里面第一个为准

------

### less-嵌套

- 作用	
  - 快速生成后代选择器

![img](https://img-blog.csdnimg.cn/a7516927798d45d59a0e5ffad4fe97e0.png)编辑

此外还有一种写法专门用于表示hover伪类或nth-child结构伪类使用

![img](https://img-blog.csdnimg.cn/7b94820faeec4ab8ad5b56abd380408c.png)编辑

------

### less-变量

- 作用
  - 存储数据，方便使用和修改
		语法	
  - 定义变量：@变量名：数据；
  - 使用变量：CSS属性：@变量名； 

------

### less-导入

实际上，less通常会有多个文件，那么如果有多个文件，实际使用中就会进行多次css样式的导入，如果不希望这样，我们可以使用less的导入将多个less文件合并为一个文件

- 作用：导入less公共样式文件
	 语法	
  - @import "文件路径"；
  - 如果是less文件可以省略后缀

------

### less-导出

默认情况下，我们保存less代码后，会自动在当前目录下生成一个与当前less文件名一样的css文件，实际应用中，我们不一定希望css文件与less文件名一样，并且位置也不一定是当前目录，就可以使用less导出

- 写法	
  - 在less文件中的第一行添加
  - // out: 存储路径
  - 注意这里没有分号
  - 注意这里的双斜杠不是注释

------

### less-禁止导出

- 写法	
  - 在less文件第一行添加
  - // out: false

------

## vw和vh

- 相对单位
- 相对于**视口的尺寸**计算结果
	 vw：即viewport width	
  - 1vw=1/100视口宽度
	 vh：viewport height	
  - 1vh=1/100视口高度
	 相比前面所学的rem	
  - vw和vh可以直接实现移动端适配，无需媒体查询或引入js
	  注意	
  - 在实际开发中，**不能vw和vh混用（通常只使用vw）**
  - 因为vh是相对视口高度计算的，而全面屏手机市口高度大，而视口宽度不变，混用可能导致盒子变形

------

## 响应式网页布局

- 首先认识什么是响应式网页	
  - 即可以使得一套代码适配多种屏幕大小的网页
  - 或随着视口大小的改变，页面布局也会随之改变的网页
		实现方案	
  - 媒体查询：即设置在视口大小变化到什么时候时进行CSS样式的改变
  - Bootstrap：使用bootstrap框架进行实现

------

### 媒体查询

这里我们需要判断视口在某个区间内则改变CSS样式，这里介绍两个媒体特性

![img](https://img-blog.csdnimg.cn/edc5f11ef2f1431eb3a9e328bc79da7e.png)编辑

- max-width：最大宽度（即视口宽度在<=max-width时生效）
- min-width：最小宽度（即视口宽度在>=min-width时生效）
	 注意	
  - 这里的书写顺序问题（类似if 与elseif语句 组合实现区间判断）
  - max-width（从小到大书写）
  - min-width（从大到小书写）

### ![img](https://img-blog.csdnimg.cn/d56d491fb02b437abaaf86cf096a8724.png)编辑

![img](https://img-blog.csdnimg.cn/9f6c353c107449f4bc433ffdef41f585.png)编辑

------

###  媒体查询的完整写法

![img](https://img-blog.csdnimg.cn/88b24a1a0c784510ae98519b94780521.png)编辑

- 其中的关键字实际上就是逻辑操作符：	
  - and
  - only
  - not 
- 媒体类型是用来区分设备类型的，比如屏幕设备、打印设备，其中手机、电脑、平板都是屏幕设备

![img](https://img-blog.csdnimg.cn/22f3fa9292fb43a18deb7db9395a884b.png)编辑

- 媒体特性用来描述媒体类型的具体特征

![img](https://img-blog.csdnimg.cn/dd379d3a0083447ea8c3d1a40db09c20.png)编辑

------

### 媒体查询的link写法

实际上，一个媒体查询代码可能会有很多，我们不可能将其都放在body的style里，因此有了link写法，即将媒体查询的css代码放到一个文件中，使用link标签进行引入，新增media属性，即该属性值成立时进行css文件的引入

![img](https://img-blog.csdnimg.cn/4fb33efb6ee1469aa60b48f1beca10fc.png)编辑

注意媒体特性的小括号不能不加 

------

## Bootstrap

Bootstrap是一个前端UI框架，它提供了大量编写好的CSS样式，允许开发者结合一定的HTML结构以及JavaScript，快速编写功能完善的网页以及常见的交互效果

下面学习如何使用Bootstrap

1. 首先到官网下载想要的Bootstrap版本
2. 在自己的代码中link引入对应的想要的css文件
3. 例如，引入bootstrap.min.css文件后，可以调用类名container，这是一个响应式布局的版心类

------

### 栅格系统的使用

栅格化是指将被赋予row类名的元素的宽度分成12份，每个盒子占用的对应的份数

例如：一行想要排4个元素则每个盒子占用3份即可（12/4）

![img](https://img-blog.csdnimg.cn/ece2b355119542bea84ecfe5c8659891.png)编辑

![img](https://img-blog.csdnimg.cn/4a775a3ebe1c486e9d390a7407ea853a.png)编辑 例如我们想要在宽度为768的元素下一行排2个，那么则子元素都调用类名.col-md-6，这里的6即12/2得到的，同时还可以追加类名从而实现多区间的设置排列个数（注意父元素需要添加rol类名）

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./Bootstrap/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <!-- 当视口宽度<=1200时一行排4个
                当视口宽度<=768时一行排2个
                当视口宽度>=576时一行排1个
            -->
            <div class="col-xl-3 col-md-6 col-sm-12">1</div>
            <div class="col-xl-3 col-md-6 col-sm-12">2</div>
            <div class="col-xl-3 col-md-6 col-sm-12">3</div>
            <div class="col-xl-3 col-md-6 col-sm-12">4</div>
        </div>
    </div>
</body>
</html>
```



------

### 全局样式

即Bootstrap为我们提供了一些类名供使用，可以美化网页元素，当我们想要使用时，直接到官方文档中寻找并使用即可，例如下图是我在官方文档的截图 ，文档中详细叙述了如何使用想要的样式类名

![img](https://img-blog.csdnimg.cn/2a2fd7e415c04b7b9c2f9fc8a6493929.png)

![img](https://img-blog.csdnimg.cn/b72f5914c1964e2ca7d94c19e50d395e.png)

------

### 组件

组件即是对通用功能的一些封装，Bootstrap为我们提供了大量的组件，未来想要使用可以复制粘贴再修改细节即可

1. 引入样式表
2. 引入js文件（看是否有动态需求）
3. 复制结构，修改内容  

![img](https://img-blog.csdnimg.cn/2a83215b53f74d1098f716ebd71bcc1e.png)

------

### 字体图标

与前面所学的类似，Bootstrap也提供了一个字体图标库，使用方法如下：

1. 到官网下载字体图标库的安装包并解压
2. 复制font文件夹到项目目录
3. 网页引入Bootstrap-icons.css文件
4. 调用CSS类名 （图标对应的类名到官网查询即可）

------

# 边学边补充

------

## EM

em是相对长度单位相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

- em的值不是固定的
- em会继承父级元素的字体大小

> 任意浏览器的默认字体高都是16px，所有未经调整的浏览器都符合: 1em=16px



## sass与scss

Sass与Scss都是Sass语言的两种不同的语法格式

**关系：**

- SCSS 是 Sass 的一种语法形式，是在 Sass 3 版本中引入的新语法。因此，SCSS 是 Sass 的一个分支或者说是一种进化版本。

**区别：**

1. **语法风格：**

   - **Sass（缩进语法）**：

     - 使用严格的缩进来定义代码块结构，不使用大括号 `{}` 来包围属性块，也不需要分号 `;` 在每条样式声明末尾。

     - 示例：

       Code

       ```css
       1// .sass 文件
       2.my-class
       3  color: red
       4  font-size: 16px
       ```

   - **SCSS（CSS-like 语法）**：

     - 完全兼容 CSS 语法，采用与 CSS 相似的块状结构，包括大括号 `{}` 和分号 `;`。

     - 示例：

       Scss

       ```scss
       1// .scss 文件
       2.my-class {
       3  color: red;
       4  font-size: 16px;
       5}
       ```



2. **文件扩展名：**

- `.sass` 文件使用的是 Sass 缩进语法。
- `.scss` 文件使用的是 SCSS 语法，即与 CSS 类似的语法。

> 虽然两者在语法上有显著的区别，但它们都是 Sass 预处理器的组成部分，都能提供变量、嵌套规则、混合宏、继承等高级功能，帮助开发者更高效地管理和组织复杂的 CSS 样式表。由于 SCSS 兼容 CSS 语法且更容易被 CSS 开发者接受，它成为了 Sass 社区中更为广泛使用的语法格式







