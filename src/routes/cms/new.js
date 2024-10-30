import { connectToDatabase } from "../index";
import { Draft } from "../../models/cms/draft";
import { requireAuth } from "@sitechtimes/shared";
import express from "express";

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

export { router as createDraftRouter };
