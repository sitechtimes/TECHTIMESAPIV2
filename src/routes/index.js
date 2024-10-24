const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();

const authController = require("../controllers/authController");
const homePageController = require("../controllers/homePageController");

let cachedPromise = null; // Variable to cache the connection promise
const connectToDatabase = async () => {
  // Check if the JWT_KEY environment variable is defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined"); // Throw an error if not defined
  }

  // Check if the MONGO_URI environment variable is defined
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined"); // Throw an error if not defined
  }

  // If there is no cached promise, create a new connection
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI); // Connect to the database and cache the promise
  }

  // Return the cached promise
  return cachedPromise; // This ensures that the same connection is used throughout the app
};

router.get("/", homePageController.homePage);
router.post("/user", authController.auth);

module.exports = connectToDatabase;
module.exports = router;
