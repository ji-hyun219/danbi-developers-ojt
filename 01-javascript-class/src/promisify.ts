import { promisify } from "util";

type Callback = {
  (error: Error | null, result: number): void;
}

function lazyAdd(a: number, b: number, callback: Callback) {
  setTimeout(() => {
    callback(null, a + b)
  }, 1000)
}

const lazyAddPromise = promisify(lazyAdd);

lazyAddPromise(1, 2).then((result) => { console.log(result) });