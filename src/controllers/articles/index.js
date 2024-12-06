const Article = require("../../models/articles/article");
const connectToDatabase = require("../index");
const express = require("express");

const router = express.Router();

router.get("/articles/", async (req, res) => {
  await connectToDatabase();

  let query = {};
  let limit = 20;
  let sortBy = { updatedAt: 1 };

  if (req.query.category) {
    query.category = req.query.category.toString();
  }

  if (req.query.q) {
    limit = Number(req.query.q);
  }

  if (req.query.sort === "dateDes") {
    sortBy = { updatedAt: -1 };
  }

  const articles = await Article.find(query).sort(sortBy).limit(limit);

  res.status(200).send(articles);
});

module.exports = router;
