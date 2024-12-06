const express = require("express");
const { currentUser } = require("@sitechtimes/shared");

const router = express.Router();

router.get("/auth/current-user", currentUser, (req, res) => {
  res.send({ ...(req.currentUser || null) });
});

module.exports = router;
