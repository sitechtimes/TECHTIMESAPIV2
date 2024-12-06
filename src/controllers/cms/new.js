const { connectToDatabase } = require("../index");
const { Draft } = require("../../models/cms/draft");
const { requireAuth } = require("@sitechtimes/shared");
const express = require("express");

const router = express.Router();

router.post("/cms/", requireAuth, async (req, res) => {
  await connectToDatabase();

  const draft = Draft.build({
    title: "Untitled",
    content: "This is where you should write the content of your article ...",
    userId: req.currentUser ? req.currentUser.id : null,
  });

  await draft.save();

  res.status(201).send(draft);
});

module.exports = router;
