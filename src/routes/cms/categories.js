import { Category } from "../../models/cms/category";
import express from "express";

const router = express.Router();

router.get("/cms/categories", async (req, res) => {
  const categories = Object.values(Category);

  res.status(200).send(categories);
});

export { router as categoriesRouter };
