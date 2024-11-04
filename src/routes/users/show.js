const express = require("express");
const { NotFoundError } = require("@sitechtimes/shared");
const { requireAuth } = require("@sitechtimes/shared");
const { User } = require("../../models/users/user");
const { connectToDatabase } = require("../index");

const router = express.Router();

router.get("/users/:id", requireAuth, async (req, res) => {
  await connectToDatabase();

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

module.exports = router;
