type Callback = {
  (error: Error | null, result: number): void;
}

export function lazyAdd(a: number, b: number, callback: Callback) {
  setTimeout(() => {
    callback(null, a + b)
  }, 1000)
}

lazyAdd(1, 2, function c(error: Error | null, result: any) {
  console.log(result);
})
// or

// lazyAdd(1, 2, console.log)