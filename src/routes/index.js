const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();

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
