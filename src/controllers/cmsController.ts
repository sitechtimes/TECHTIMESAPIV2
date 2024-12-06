import { Request, Response } from "express";
import { Category } from "../models/category";
import { Draft } from "../models/cms/draft";
import mongoose from "mongoose";
import { Article } from "../models/article";
import { Position } from "../models/position";
import { Homepage } from "../models/homepage";
import { DraftStatus } from "../models/cms/draftStatus";
import { Role } from "../models/role";
import sanitize from "sanitize-html";

async function categories(req: Request, res: Response) {
  const categories = Object.values(Category);

  res.status(200).send(categories);
}

async function deleteArticle(req: Request, res: Response) {
  const draft = await Draft.findByIdAndDelete(req.params.id);

  if (!draft) return res.status(404).json({ message: "draft not found" });

  if (draft.userId !== req.currentUser!.id)
    return res.status(401).json({ message: "Unauthorized" });

  res.sendStatus(204);
}

async function index(req: Request, res: Response) {
  const drafts = await Draft.find({ userId: req.currentUser!.id });

  res.send(drafts);
}

async function newArticle(req: Request, res: Response) {
  const draft = Draft.build({
    title: "Untitled",
    content: "This is where you should write the content of your article ...",
    userId: req.currentUser!.id,
  });

  await draft.save();

  res.status(201).send(draft);
}

async function publish(req: Request, res: Response) {
  const draft = await Draft.findById(req.params.id);

  if (!draft) return res.status(404).json({ message: "draft not found" });

  if (!mongoose.connection.db) return res.status(500).json({ message: "krill issue" });

  const db = mongoose.connection.db.collection("users");

  const users = await db.find({ _id: new mongoose.Types.ObjectId(draft.userId) }).toArray();

  if (!users[0]) return res.status(404).json({ message: "author not found" });

  const attrs = {
    title: draft.title,
    content: draft.content,
    imageUrl: draft.imageUrl,
    imageAlt: draft.imageAlt,
    category: draft.category,
    user: {
      id: draft.userId,
      name: users[0].name,
      imageUrl: users[0].imageUrl,
    },
  };

  const article = Article.build({ ...attrs });

  await article.save();
  await Draft.findByIdAndDelete(req.params.id);

  // create homepage article
  const isValidPosition = Object.values(Position).includes(req.body.position);

  if (isValidPosition) {
    await Homepage.findOneAndDelete({ position: req.body.position, category: draft.category });

    const homepage = Homepage.build({
      ...attrs,
      position: req.body.position,
      slug: article.slug,
    });

    await homepage.save();
  }

  res.sendStatus(200);
}

async function ready(req: Request, res: Response) {
  const drafts = await Draft.find({ status: DraftStatus.Ready });

  res.send(drafts);
}

async function review(req: Request, res: Response) {
  const drafts = await Draft.find({ status: DraftStatus.Review });

  res.send(drafts);
}

async function show(req: Request, res: Response) {
  const { id } = req.params;

  const draft = await Draft.findById(id);

  if (!draft) return res.status(404).json({ message: "draft not found" });

  if (draft.userId !== req.currentUser!.id && req.currentUser!.role === Role.Writer) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.send(draft);
}

async function update(req: Request, res: Response) {
  const draft = await Draft.findById(req.params.id);

  if (!draft) return res.status(404).json({ message: "draft not found" });

  if (draft.userId !== req.currentUser!.id && req.currentUser!.role === Role.Writer)
    return res.status(401).json({ message: "Unauthorized" });

  // draft - for writer
  if (draft.userId == req.currentUser!.id) {
    // TODO - refactor update logic
    const title = req.body.title == undefined ? draft.title : sanitize(req.body.title);
    const content = req.body.content == undefined ? draft.content : sanitize(req.body.content);

    const status = req.body.status == DraftStatus.Review ? req.body.status : draft.status;
    const imageUrl = req.body.imageUrl == undefined ? draft.imageUrl : req.body.imageUrl;
    const category = req.body.category == undefined ? draft.category : req.body.category;

    const imageAlt = req.body.imageAlt == undefined ? draft.imageAlt : req.body.imageAlt;

    draft.set({ title, content, status, imageUrl, imageAlt, category });
  }

  // editor - can move to ready and back to draft
  if (
    req.currentUser!.role == Role.Editor ||
    (req.currentUser!.role == Role.Admin && draft.status == DraftStatus.Review)
  ) {
    if (req.body.status == DraftStatus.Ready || DraftStatus.Draft) {
      draft.set({
        status: req.body.status,
      });
    }
  }

  // admin
  if (req.currentUser!.role == Role.Admin && draft.status == DraftStatus.Ready) {
    if (req.body.status == DraftStatus.Draft) {
      draft.set({
        status: req.body.status,
      });
    }
  }

  await draft.save();

  res.send(draft);
}

module.exports = {
  categories,
  deleteArticle,
  index,
  newArticle,
  publish,
  ready,
  review,
  show,
  update,
};
