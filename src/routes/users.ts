import express from "express";
const router = express.Router();
const userController = require("../controllers/userController");
import { requireAuth } from "../utils/requireAuth";
import { Role } from "../models/role";
import { roles } from "../utils/roles";

router.delete("/:id", requireAuth, userController.deleteUser);
router.get("/", requireAuth, roles([Role.Admin]), userController.index);
router.get("/:id", requireAuth, userController.show);
router.put("/:id", requireAuth, userController.update);

module.exports = router;
