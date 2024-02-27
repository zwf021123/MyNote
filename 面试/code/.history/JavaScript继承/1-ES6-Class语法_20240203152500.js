class Person {
  // 公有属性
  name
  age = 18

  // 构造函数
  constructor(name) {
    this.name = name
  }

  // 公有方法
  sayHi() {
    console.log('我是'+name);
  }
}