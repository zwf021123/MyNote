function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function() {
  console.log('你好，我是'+this.name);
}

// 通过构造函数继承属性
function Student(name) {
  // 这里的this指向Student的实例对象
  Person.call(this,name)
}
// 通过原型链继承方法
const prototype = Object.create(Person.prototype,{
  construct: {
    value:Student
  }
})

Student.prototype = prototype

const s = new Student('ls')
console.log(s);