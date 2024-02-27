function Person() {
  this.name = 'zs'
}

Person.prototype.sayHi = function() {
  console.log('你好，我是'+this.name);
}