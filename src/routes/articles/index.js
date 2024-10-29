import Article from "../../models/articles/homePage";
import connectToDatabase from "../index";
import express from "express";

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

export { router as indexArticleRouter };
