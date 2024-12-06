const Article = require("../../models/articles/article");
const { NotFoundError } = require("@sitechtimes/shared");
const connectToDatabase = require("../index");
const express = require("express");

const router = express.Router();

router.get("/articles/:slug", async (req, res) => {
  await connectToDatabase();

  const { slug } = req.params;

  const article = await Article.findOne({ slug });

  if (!article) {
    throw new NotFoundError();
  }

  res.status(200).send(article);
});

module.exports = router;
