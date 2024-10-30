import { connectToDatabase } from "../index";
import { Draft } from "../../models/cms/draft";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@sitechtimes/shared";
import { Role } from "../../models/cms/role";
import express from "express";

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

export { router as showDraftRouter };
