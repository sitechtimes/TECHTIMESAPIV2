import { connectToDatabase } from "../index";
import { Draft } from "../../models/cms/draft";
import { DraftStatus } from "../../models/cms/draftStatus";
import { requireAuth, roles } from "@sitechtimes/shared";
import express from "express";

const router = express.Router();

router.get("/cms/ready/", requireAuth, roles(["admin"]), async (req, res) => {
  await connectToDatabase();

  const drafts = await Draft.find({ status: DraftStatus.Ready });

  res.send(drafts);
});

export { router as readyDraftsRouter };
