import express from "express";
import { currentUser } from "@sitechtimes/shared";

const router = express.Router();

router.get("/auth/current-user", currentUser, (req, res) => {
  res.send({ ...(req.currentUser || null) });
});

export { router as currentUserRouter };
