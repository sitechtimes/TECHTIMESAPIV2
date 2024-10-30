import express from "express";
import { NotFoundError } from "@sitechtimes/shared";
import { requireAuth } from "@sitechtimes/shared";
import { User } from "../../models/users/user";
import { connectToDatabase } from "../index";

const router = express.Router();

router.get("/users/:id", requireAuth, async (req, res) => {
  await connectToDatabase();

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as showUserRouter };
