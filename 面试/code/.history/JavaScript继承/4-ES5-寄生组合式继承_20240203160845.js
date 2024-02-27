function Person() {
  this.name = 'zs'
}

Person.prototype.sayHi = function() {
  console.log('你好，我是'+this.name);
}

// 通过构造函数继承属性
function Student() {
  // 这里的this指向Student的实例对象
  Person.call(this,'ls')
}
// 通过原型链构造