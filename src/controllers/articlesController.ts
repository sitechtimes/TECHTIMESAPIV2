import { Request, Response } from "express";
import { Homepage } from "../models/homepage";
import { Article } from "../models/article";
import { SortOrder } from "mongoose";

async function homepage(req: Request, res: Response) {
  const query: any = {};

  if (req.query.category) query.category = req.query.category.toString();
  if (req.query.position) query.position = req.query.position.toString();

  const homepages = await Homepage.find(query);
  res.send(homepages);
}

async function index(req: Request, res: Response) {
  let query: any = {};
  let limit = 20;
  let sortBy = { updatedAt: 1 as SortOrder };

  if (req.query.category) query.category = req.query.category.toString();

  if (req.query.q) limit = Number(req.query.q);

  if (req.query.sort === "dateDes") sortBy = { updatedAt: -1 as SortOrder };

  const articles = await Article.find(query).sort(sortBy).limit(limit);

  res.status(200).send(articles);
}

async function show(req: Request, res: Response) {
  const { slug } = req.params;

  const article = await Article.findOne({ slug });

  if (!article) return res.status(404).json({ message: "article not found" });

  res.status(200).send(article);
}

module.exports = { homepage, index, show };
