class Person {
  // 公有属性(可以进行默认值赋值)
  name
  age = 18

  // 构造函数
  constructor(name) {
    this.name = name
  }

  // 公有方法
  sayHi() {
    console.log('hi，我是来自父类的'+this.name);
  }
}

// const p = new Person('张三')
// console.log(p);
// p.sayHi()

class Student extends Person {
  stuId
  constructor(name,stuId) {
    super(name)
    this.stuId = stuId
  }
  sayHi() {
    console.log('子类的sayHi');
  }
}

const s = new Student('zs',18)
console.log(s);