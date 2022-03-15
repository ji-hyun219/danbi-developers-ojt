function hello() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve("world")
    }, 1000)
  })
};


async function myFunc() {
  const result = await hello();
  console.log(result);
}

myFunc();