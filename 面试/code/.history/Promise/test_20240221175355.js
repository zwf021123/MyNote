const promise = new Promise((resolve, rejected) => {
  throw new Error('test');
});

//此时只有then的第二个参数可以捕获到错误信息
promise.then(res => {
  //
}, err => {
  console.log(err);
}).catch(err1 => {
  console.log(err1);
});


//此时catch方法可以捕获到错误信息
promise.then(res => {
  //
}).catch(err1 => {
  console.log(err1);
});


//此时只有then的第二个参数可以捕获到Promise内部抛出的错误信息
promise.then(res => {
  throw new Error('hello');
}, err => {
  console.log(err);
}).catch(err1 => {
  console.log(err1);
});

//此时只有then的第二个参数可以捕获到Promise内部抛出的错误信息
promise.then(res => {
  throw new Error('hello');
}, err => {
  console.log(err);
});


//此时catch可以捕获到Promise内部抛出的错误信息
promise.then(res => {
  throw new Error('hello');
}).catch(err1 => {
  console.log(err1);
});