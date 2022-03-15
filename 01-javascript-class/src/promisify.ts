// import { promisify } from "util";

// type Callback = {
//   (error: Error | null, result: number): void;
// }

// function lazyAdd(a: number, b: number, callback: Callback) {
//   setTimeout(() => {
//     callback(null, a + b)
//   }, 1000)
// }

// const lazyAddPromise = promisify(lazyAdd);

// lazyAddPromise(1, 2).then((result) => { console.log(result) });

// function myFunc(condition: boolean) {
//   return new Promise((resolve, reject) => {
//     if (condition) {
//       resolve("ok")
//     } else {
//       reject("fail")
//     }
//   })
// }

// const result = myFunc(false)
//   .then((result) => console.log(result))
//   .catch((result) => console.log(result))