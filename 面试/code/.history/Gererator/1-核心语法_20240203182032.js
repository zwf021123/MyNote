// 定义生成器函数
function* myGenerator() {
  console.log('执行啦');
  yield 'a'
  yield 'b'
  yield 'c'
}

const generator = myGenerator()