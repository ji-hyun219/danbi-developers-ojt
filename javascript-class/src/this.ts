/**
 * this
 */

const test = {
  prop: 42,
  foo: function () { console.log("this is test's foo function"); return [{ ...this }] },
  func: function () {
    return this.foo();
  },
};

test.func();


const test2 = test.func;
// test2()

const test3 = {
  prop: 50,
  foo: function () { console.log("this is test3's foo function"); return [{ ...this }] },
  func: test2
}

test3.func();