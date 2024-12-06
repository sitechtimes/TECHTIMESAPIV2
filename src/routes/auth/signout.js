const express = require("express");

const router = express.Router();

router.post("/auth/signout", (req, res) => {
  req.session = null;
  res.status(204).send({});
});

module.exports = router;
