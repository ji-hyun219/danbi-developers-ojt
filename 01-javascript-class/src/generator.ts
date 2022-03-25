function* makeRangeIteratorGenerator(start = 0, end = Infinity, step = 1) {
  let n = 0;
  for (let i = start; i < end; i += step) {
    n++;
    yield i;
  }
  return n;
}

var itg = makeRangeIteratorGenerator(1, 10);

var resultg = itg.next();
while (!resultg.done) {
  console.log(resultg.value); // 1 2 3
  resultg = itg.next();
}

console.log("Iterated over sequence of size: ", resultg.value);
