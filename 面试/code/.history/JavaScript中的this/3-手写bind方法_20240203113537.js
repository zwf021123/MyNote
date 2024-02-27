Function.prototype.myBind = function(thisArg,args) {

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
const bindFun = func.myBind(person,1)
// const res = func(1,2)
console.log('返回值：',bindFun(11));