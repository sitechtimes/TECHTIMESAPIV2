const { connectToDatabase } = require("../index");
const { Draft } = require("../../models/cms/draft");
const { DraftStatus } = require("../../models/cms/draftStatus");
const { requireAuth, roles } = require("@sitechtimes/shared");
const express = require("express");

const router = express.Router();

router.get("/cms/ready/", requireAuth, roles(["admin"]), async (req, res) => {
  await connectToDatabase();

  const drafts = await Draft.find({ status: DraftStatus.Ready });

  res.send(drafts);
});

module.exports = router;
