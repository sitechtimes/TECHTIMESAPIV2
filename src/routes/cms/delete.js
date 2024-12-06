const express = require("express");
const {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} = require("@sitechtimes/shared");
const { Draft } = require("../../models/cms/draft");
const { connectToDatabase } = require("../index");

const router = express.Router();

router.delete("/cms/:id/", requireAuth, async (req, res) => {
  await connectToDatabase();

  const draft = await Draft.findByIdAndDelete(req.params.id);

  if (!draft) {
    throw new NotFoundError();
  }

  if (!req.currentUser || draft.userId !== req.currentUser.id) {
    throw new NotAuthorizedError();
  }

  res.sendStatus(204);
});

module.exports = router;
