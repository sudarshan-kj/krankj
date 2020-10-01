var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var a = { key: "Srinivas" };
  res.send(a);
});

module.exports = router;
