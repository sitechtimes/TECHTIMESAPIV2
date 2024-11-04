const { connectToDatabase } = require("../index");
const { Draft } = require("../../models/cms/draft");
const { requireAuth } = require("@sitechtimes/shared");
const express = require("express");

const router = express.Router();

router.get("/cms/", requireAuth, async (req, res) => {
  await connectToDatabase();

  if (!req.currentUser) {
    return res.status(401).send({ error: "User not authenticated" });
  }
  const drafts = await Draft.find({ userId: req.currentUser.id });

  res.send(drafts);
});

module.exports = router;
