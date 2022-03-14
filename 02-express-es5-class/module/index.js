// const express = require("express");
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ root: "hello es5" });
});

app.listen(5500, () => {
  console.log("Listening http://localhost:5500");
});

export { app };
