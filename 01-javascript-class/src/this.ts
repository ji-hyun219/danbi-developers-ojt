"use strict"
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

// const test3 = {
//   prop: 50,
//   foo: function () { console.log("this is test3's foo function"); return [{ ...this }] },
//   func: test2
// }

// test3.func();

/**
 * Example 1
 */

const dyki: any = {
  leftPocket: "캔디",
  rightPocket: "립스틱",
  getRight() { return this.rightPocket },
  getLeft() { return this.leftPocket }
}

// 원본
// console.log(dyki)

// 기다영 "오른쪽 주머니 얻기" 실행
console.log(dyki.getRight())

// 기다영 "오른쪽 주머니 얻기" 함수를 변수화
const getRight = dyki.getRight;

// "오른쪽 주머니 얻기" 함수 실행

// console.log(getRight())

const sihyun: any = {
  leftPocket: "핸드폰",
  rightPocket: "초콜릿",
}

// 현신일 "오른쪽 주머니 얻기" 함수에 기다영 "오른쪽 주머니 얻기"를 주입
sihyun.getRight = getRight;

// not closes
console.log(sihyun.getRight())

// // 함수 바인딩
const getRightBinded = getRight.bind(dyki);

console.dir(getRightBinded)
// // 현신일 "오른쪽 주머니 얻기" 함수에 기다영 바인드된 "오른쪽 주머니 얻기"를 주입
// sihyun.getRight = getRightBinded;

// // closes: bounded function
// console.log(sihyun.getRight())

// console.dir(sihyun)