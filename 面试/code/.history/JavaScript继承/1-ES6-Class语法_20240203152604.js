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
    console.log('hi，我是'+this.name);
  }
}

const p = new Person('张三')
console.log(p);
p.sayHi()