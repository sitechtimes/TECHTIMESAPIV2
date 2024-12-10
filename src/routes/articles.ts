import express from "express";
const router = express.Router();
const articlesController = require("../controllers/articlesController");
import { requireAuth } from "../utils/requireAuth";
import { Role } from "../models/role";
import { roles } from "../utils/roles";

router.get("/homepage", articlesController.homepage);
router.get("/", articlesController.index);
router.get("/:slug", articlesController.show);

module.exports = router;
