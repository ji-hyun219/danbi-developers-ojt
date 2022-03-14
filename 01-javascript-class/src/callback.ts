type Callback = {
  (result: number): void;
}

export function lazyAdd(a: number, b: number, callback: Callback) {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
}

lazyAdd(1, 2, (result) => {
  console.log(result)
})
// or

lazyAdd(1, 2, console.log)