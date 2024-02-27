class Test {
  static stInfo = '我是静态属性'
  static stMethod() {
    console.log('我是静态方法');
  }

  #pInfo = '我是私有属性'
  #pMethod() {
    console.log('我是私有方法');
  }
  test() {
    console.log(this.#pInfo);
    this.#pMethod()
  }
}

console.log(Test.stInfo);
Test.stMethod()

const t = new Test()
t.test()

