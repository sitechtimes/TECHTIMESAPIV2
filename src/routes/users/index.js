const express = require("express");
const {
  NotAuthorizedError,
  requireAuth,
  roles,
} = require("@sitechtimes/shared");
const { Role } = require("../../models/users/role");
const { User } = require("../../models/users/user");
const { connectToDatabase } = require("../index");

const router = express.Router();

router.get("/users/", requireAuth, roles(["admin"]), async (req, res) => {
  await connectToDatabase();

  const users = await User.find({ role: { $ne: Role.Admin } });

  res.send(users);
});

module.exports = router;
