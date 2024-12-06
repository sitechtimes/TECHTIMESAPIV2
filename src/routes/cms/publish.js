const { connectToDatabase } = require("../index");
const { NotFoundError, requireAuth, roles } = require("@sitechtimes/shared");
const express = require("express");
const mongoose = require("mongoose");

const { Article } = require("../../models/cms/article");
const { Draft } = require("../../models/cms/draft");
const { Homepage } = require("../../models/cms/homepage");
const { Position } = require("../../models/cms/position");

const router = express.Router();

router.post(
  "/cms/:id/publish",
  requireAuth,
  roles(["admin"]),
  async (req, res) => {
    await connectToDatabase();

    const draft = await Draft.findById(req.params.id);

    if (!draft) {
      throw new NotFoundError();
    }

    const db = mongoose.connection.db.collection("users");

    const users = await db
      .find({ _id: mongoose.Types.ObjectId(draft.userId) })
      .toArray();

    if (!users[0]) {
      throw new NotFoundError();
    }

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
      await Homepage.findOneAndRemove({
        position: req.body.position,
        category: draft.category,
      });

      const homepage = Homepage.build({
        ...attrs,
        position: req.body.position,
        slug: article.slug,
      });

      await homepage.save();
    }

    res.sendStatus(200);
  }
);

module.exports = router;
