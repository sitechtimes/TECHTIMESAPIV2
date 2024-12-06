const { Category } = require("../../models/cms/category");
const express = require("express");

const router = express.Router();

router.get("/cms/categories", async (req, res) => {
  const categories = Object.values(Category);

  res.status(200).send(categories);
});

module.exports = router;
