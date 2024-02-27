// 在Function原型上定义函数myCall
Function.prototype.myCall = function(thisArg) {
  // console.log('hi');
  // 设置当前函数的this为传入的参数this
  // 利用对象中的方法的this为对象本身这个原理实现
  // 即 希望当前this指向谁 就成为谁的一个方法
  // 这里的this是指向func本身
  thisArg.f = this
  // 调用原函数
  thisArg.f()
}


const person = {
  name:'haha'
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const res = func.myCall(person,1,2)
// const res = func(1,2)
console.log('返回值：',res);