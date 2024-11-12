const connectToDatabase = require("../index");
const express = require("express");
const Homepage = require("../../models/articles/homepageArticles.ts");

const router = express.Router();

router.get("/articles/homepage", async (req, res) => {
  await connectToDatabase();

  const query = {};

  if (req.query.category) {
    query.category = req.query.category.toString();
  }

  if (req.query.position) {
    query.position = req.query.position.toString();
  }

  const homepages = await Homepage.find(query);
  res.send(homepages);
});

module.exports = router;
