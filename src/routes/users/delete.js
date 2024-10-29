import express from "express";
import { NotAuthorizedError, requireAuth } from "@sitechtimes/shared";
import { User } from "../models/user";
import { connectToDatabase } from "../index";

const router = express.Router();

router.delete("/users/:id", requireAuth, async (req, res) => {
  await connectToDatabase();

  const { id } = req.params;

  if (!req.currentUser || req.currentUser.id !== id) {
    throw new NotAuthorizedError();
  }

  await User.findByIdAndDelete(id);

  res.sendStatus(204);
});

export { router as deleteUserRouter };
