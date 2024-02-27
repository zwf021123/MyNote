Function.prototype.myBind = function(thisArg,...args) {
  // 返回一个新函数，其中新函数的this指针指向thisArg
  // 注意这里一定要使用箭头函数才能得到原函数
  return (...reArgs)=> {
    return this.call(thisArg,...args,...reArgs)
  }
}


const person = {
  name:'haha',
  age:18
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const bindFun = func.myBind(person,1,2)
// const res = func(1,2)
console.log('返回值：',bindFun(11));