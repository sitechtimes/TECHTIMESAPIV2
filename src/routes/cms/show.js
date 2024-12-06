const { connectToDatabase } = require("../index");
const { Draft } = require("../../models/cms/draft");
const {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} = require("@sitechtimes/shared");
const { Role } = require("../../models/cms/role");
const express = require("express");

const router = express.Router();

router.get("/cms/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  await connectToDatabase();

  const draft = await Draft.findById(id);

  if (!draft) {
    throw new NotFoundError();
  }

  if (
    !req.currentUser ||
    (draft.userId !== req.currentUser.id &&
      req.currentUser.role === Role.Writer)
  ) {
    throw new NotAuthorizedError();
  }

  res.send(draft);
});

module.exports = router;
