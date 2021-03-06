console.log("๐ closure console.dir")


// function makeFunc() {
//   const name = "Danbi";
//   function displayName() {
//     console.log(name);
//   }
//   return displayName;
// }

// const myFunc = makeFunc();
// //myFunc๋ณ์์ displayName์ ๋ฆฌํดํจ
// //์ ํจ๋ฒ์์ ์ดํ์  ํ๊ฒฝ์ ์ ์ง
// myFunc();

// console.dir(myFunc)

/**
 * Private instance variables
 */
// console.log("๐ private instance variables")
// function Car(manufacturer: string, model: string, year: string, color: string) {
//   return {
//     toString() {
//       return `${manufacturer} ${model} (${year}, ${color})`
//     }
//   }
// }

// const car = Car('Aston Martin', 'V8 Vantage', '2012', 'Quantum Silver')
// console.log(car.toString())
// console.dir(car)

// /**
//  * Event-oriented programming
//  */

//  console.log("๐ Event-oriented programming")
// const BACKGROUND_COLOR = 'rgba(200, 200, 200, 1)'
// const body = document.querySelector("body");

// function onClick() {
//   if (body) {
//     body.style.background = BACKGROUND_COLOR
//   }
// }
// const button = document.createElement("button");
// button.innerText = "Set background color";
// body?.appendChild(button);
// button.addEventListener('click', onClick)
// console.dir(onClick);

// /**
//  * Modularization
//  */
// console.log("๐ modularization")
// let namespace: { counter?: { tick(): void; toString(): void; } } = {};
// function createObject() {
//   let x = 42;
//   return {
//     log() { console.log(x) },
//     increment() { x++ },
//     update(value: number) { x = value }
//   }
// }

// const o = createObject()
// o.increment()
// o.log() // 43
// o.update(5)
// o.log() // 5
// console.dir(o)

// const { log, increment, update } = createObject()
// log() // 42
// increment()
// log() // 43
// update(40)
// log() // 40

console.log(myFunc1());

function myFunc1() {
  return "foo1";
}


const myFunc2 = function() {
  return "foo2";
}

// (function foo(n) {
//   let numbers: number[] = []

//   function format(n: number) {
//     return Math.trunc(n)
//   }

//   function tick() {
//     numbers.push(Math.random() * 100)
//   }

//   function toString() {
//     return numbers.map(format)
//   }

//   n.counter = {
//     tick,
//     toString
//   }
// })(namespace)

// const counter = namespace.counter
// counter?.tick()
// counter?.tick()
// console.log(counter?.toString())


// /**
//  * Example 1
//  */
// console.log("๐ example 1")
// function createObject() {
//   let x = 42;
//   return {
//     log() { console.log(x) },
//     increment() { x++ },
//     update(value: number) { x = value }
//   }
// }

// const o = createObject()
// o.increment()
// o.log() // 43
// o.update(5)
// o.log() // 5
// console.dir(o)

// const { log, increment, update } = createObject()
// log() // 42
// increment()
// log() // 43
// update(40)
// log() // 40

// /**
//  * Example 2
//  */
// console.log("๐ example 2")
// function foo() {
//   var result = []
//   for (var i = 0; i < 3; i++) {
//     result.push(function inner() { console.log(i) })
//   }

//   return result
// }

// const result = foo()
// // The following will print `3`, three times...
// for (var i = 0; i < 3; i++) {
//   result[i]()
// }