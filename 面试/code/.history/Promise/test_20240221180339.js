const promise = new Promise((resolve, rejected) => {
  // throw new Error('testtttttttt');
  console.log('正常');
});


//此时只有then的第二个参数可以捕获到Promise内部抛出的错误信息
promise.then(res => {
  console.log('then执行',res);
  throw new Error('hellooooooooo');
}, err => {
  console.log('第二个参数',err);
}).catch(err1 => {
  console.log('catch',err1);
});
