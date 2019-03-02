const express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Transaction done successfully" });
});

module.exports = router;
