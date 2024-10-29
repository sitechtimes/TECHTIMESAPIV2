import Article from "../../models/articles/homePage";
import { NotFoundError } from "@sitechtimes/shared";
import connectToDatabase from "../index";
import express from "express";

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

export { router as showArticleRouter };
