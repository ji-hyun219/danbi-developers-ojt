const express = require("express");
const morgan = require("morgan");
const { router } = require("./router");
const path = require("path");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
// app.use(express.urlencoded());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/root", (req, res) => {
  res.render("root", { name: "hello world" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: "ok" });
});

app.use("/router", router);

app.listen(5002, () => {
  console.log("listening http://localhost:5002");
});
