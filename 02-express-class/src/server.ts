import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ root: "hello" });
});

app.listen(5400, () => {
  console.log("Listening http://localhost:5400");
});
