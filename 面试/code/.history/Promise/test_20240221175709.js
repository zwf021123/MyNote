const promise = new Promise((resolve, rejected) => {
  throw new Error('test');
});


//此时只有then的第二个参数可以捕获到Promise内部抛出的错误信息
promise.then(res => {
  throw new Error('hello');
}, err => {
  console.log('第二个参数',err);
}).catch(err1 => {
  console.log('catch',err1);
});
