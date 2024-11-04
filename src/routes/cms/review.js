const { connectToDatabase } = require("../index");
const { Draft } = require("../../models/cms/draft");
const { DraftStatus } = require("../../models/cms/draftStatus");
const { requireAuth, roles } = require("@sitechtimes/shared");
const express = require("express");

const router = express.Router();

router.get(
  "/cms/review/",
  requireAuth,
  roles(["editor", "admin"]),
  async (req, res) => {
    await connectToDatabase();

    const drafts = await Draft.find({ status: DraftStatus.Review });

    res.send(drafts);
  }
);

module.exports = router;
