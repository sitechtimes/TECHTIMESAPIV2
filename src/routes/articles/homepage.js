import connectToDatabase from "../index";
import express from "express";
import Homepage from "../../models/articles/homePage";

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

export { router as homepageArticlesRouter };
