Function.prototype.myApply = function(thisArg) {
  const key = Symbol()
  thisArg[key] = this
  const res = thisArg[key]()
  delete this
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
const res = func.myApply(person,1,11)
// const res = func(1,2)
console.log('返回值：',res);