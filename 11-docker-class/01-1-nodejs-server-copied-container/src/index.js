const http = require("http");

const port = process.env.PORT || 3000;

const server = http
  .createServer((request, response) => {
    const { headers, method, url, statusCode } = request;
    console.log(`${method}: ${url}`)
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ hello: "world2" }));
  })
  .listen(port, () => {
    console.log(`Listening http://0.0.0.0:${port}`)
  });
