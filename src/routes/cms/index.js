import { connectToDatabase } from "../index";
import { Draft } from "../models/draft";
import { requireAuth } from "@sitechtimes/shared";
import express from "express";

const router = express.Router();

router.get("/cms/", requireAuth, async (req, res) => {
  await connectToDatabase();

  if (!req.currentUser) {
    return res.status(401).send({ error: "User not authenticated" });
  }
  const drafts = await Draft.find({ userId: req.currentUser.id });

  res.send(drafts);
});

export { router as indexDraftRouter };
