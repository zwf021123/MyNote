const person = {
  name:'haha'
}

function func(num1,num2) {
  console.log(this);
  console.log(num1,num2);
  return num1+num2
}
const res = func.call(person,1,2)
// const res = func(1,2)
console.log('返回值：',res);