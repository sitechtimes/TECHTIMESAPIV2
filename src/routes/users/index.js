import express from "express";
import { NotAuthorizedError, requireAuth, roles } from "@sitechtimes/shared";
import { Role } from "../../models/users/role";
import { User } from "../../models/users/user";
import { connectToDatabase } from "../index";

const router = express.Router();

router.get("/users/", requireAuth, roles(["admin"]), async (req, res) => {
  await connectToDatabase();

  const users = await User.find({ role: { $ne: Role.Admin } });

  res.send(users);
});

export { router as usersRouter };
