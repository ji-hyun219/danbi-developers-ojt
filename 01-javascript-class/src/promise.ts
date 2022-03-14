type Callback = {
  (error: Error | null, result: number): void;
}

function lazyAdd(a: number, b: number, callback: Callback) {
  setTimeout(() => {
    callback(null, a + b)
  }, 1000)
}

function lazyAddPromise(a: number, b: number): Promise<number> {
  return new Promise((resolve, reject) => {
    lazyAdd(a, b, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    })
  })
}

lazyAddPromise(1, 2).then(console.log)