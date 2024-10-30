const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();

const homepageArticlesRouter = require("./articles/homepage");
const indexArticleRouter = require("./articles/index");
const showArticleRouter = require("./articles/show");

const currentUserRouter = require("./auth/current-user");
const signinRouter = require("./auth/signin");
const signoutRouter = require("./auth/signout");
const signupRouter = require("./auth/signup");
const verifyRouter = require("./auth/verify");

const categoriesRouter = require("./cms/categories");
const deleteDraftRouter = require("./cms/delete");
const indexDraftRouter = require("./cms/index");

const authController = require("../controllers/authController");
const homePageController = require("../controllers/homePageController");

let cachedPromise = null; // Variable to cache the connection promise
const connectToDatabase = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI);
  }

  return cachedPromise;
};

module.exports = connectToDatabase;
module.exports = router;
