import express from "express";
const router = express.Router();
const articlesController = require("../controllers/articlesController");

router.get("/homepage", articlesController.homepage);
router.get("/", articlesController.index);
router.get("/:slug", articlesController.show);

module.exports = router;
