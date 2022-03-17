const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  console.log(req.body)
  res.status(200).send({ status: "this is router" });
});

router.post("/", (req, res) => {
  const { body, params, query} = req;
  console.log({ body, params, query});
  return res.status(200).send("ok")
})

module.exports = {
  router,
};
