const express = require("express");
const {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} = require("@sitechtimes/shared");
const { Role } = require("../../models/cms/role");
const { DraftStatus } = require("../../models/cms/draftStatus");
const { Draft } = require("../../models/cms/draft");
const { connectToDatabase } = require("../../routes/index");
const sanitize = require("sanitize-html");

const router = express.Router();

router.put("/cms/:id/", requireAuth, async (req, res) => {
  await connectToDatabase();

  const draft = await Draft.findById(req.params.id);

  if (!draft) {
    throw new NotFoundError();
  }

  if (
    req.currentUser &&
    draft.userId !== req.currentUser.id &&
    req.currentUser.role === Role.Writer
  ) {
    throw new NotAuthorizedError();
  }

  // draft - for writer
  if (req.currentUser && draft.userId == req.currentUser.id) {
    // TODO - refactor update logic
    const title =
      req.body.title == undefined ? draft.title : sanitize(req.body.title);
    const content =
      req.body.content == undefined
        ? draft.content
        : sanitize(req.body.content);

    const status =
      req.body.status == DraftStatus.Review ? req.body.status : draft.status;
    const imageUrl =
      req.body.imageUrl == undefined ? draft.imageUrl : req.body.imageUrl;
    const category =
      req.body.category == undefined ? draft.category : req.body.category;

    const imageAlt =
      req.body.imageAlt == undefined ? draft.imageAlt : req.body.imageAlt;

    draft.set({ title, content, status, imageUrl, imageAlt, category });
  }

  // editor - can move to ready and back to draft
  if (
    req.currentUser &&
    (req.currentUser.role == Role.Editor ||
      req.currentUser.role == Role.Admin) &&
    draft.status == DraftStatus.Review
  ) {
    if (req.body.status == DraftStatus.Ready || DraftStatus.Draft) {
      draft.set({
        status: req.body.status,
      });
    }
  }

  // admin
  if (
    req.currentUser &&
    req.currentUser.role == Role.Admin &&
    draft.status == DraftStatus.Ready
  ) {
    if (req.body.status == DraftStatus.Draft) {
      draft.set({
        status: req.body.status,
      });
    }
  }

  await draft.save();

  res.send(draft);
});

module.exports = router;
