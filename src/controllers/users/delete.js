const express = require("express");
const { NotAuthorizedError, requireAuth } = require("@sitechtimes/shared");
const { User } = require("../../models/users/user");
const { connectToDatabase } = require("../../routes/index");

const router = express.Router();

router.delete("/users/:id", requireAuth, async (req, res) => {
  await connectToDatabase();

  const { id } = req.params;

  if (!req.currentUser || req.currentUser.id !== id) {
    throw new NotAuthorizedError();
  }

  await User.findByIdAndDelete(id);

  res.sendStatus(204);
});

module.exports = router;
