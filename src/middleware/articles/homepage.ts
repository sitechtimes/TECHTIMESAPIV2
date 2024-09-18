import express from "express";
import { Request } from "express";
import { connectToDatabase } from "../../routes/index";
import { Homepage } from "../../models/articles/homepage.ts";

export const articlesHomepage = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();

    const query: any = {};

    if (req.query.category) {
      query.category = req.query.category.toString();
    }

    if (req.query.position) {
      query.position = req.query.position.toString();
    }

    const homepages = await Homepage.find(query);
    res.send(homepages);
  } catch (error) {
    console.log(error);
  }
};
