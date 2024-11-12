/**
 * Articles Homepage Controller.
 * This module exports a function to handle requests for retrieving articles
 * for the homepage based on optional query parameters.
 */

const connectToDatabase = require("../../routes/index"); // Import the function to connect to the MongoDB database
const express = require("express"); // Import Express
const homePage = require("../../models/articles/homepageArticles.ts"); // Import the Homepage model for MongoDB

export const articlesHomepage = async () => {
  try {
    await connectToDatabase(); // Connect to the MongoDB database

    const query = {}; // Initialize an empty query object

    // Check for the 'category' query parameter and add it to the query object if present
    if (req.query.category) {
      query.category = req.query.category.toString(); // Convert to string to ensure proper type
    }

    // Check for the 'position' query parameter and add it to the query object if present
    if (req.query.position) {
      query.position = req.query.position.toString(); // Convert to string to ensure proper type
    }

    // Retrieve articles from the database based on the constructed query
    const homepages = await Homepage.find(query);
    res.send(homepages); // Send the retrieved articles back as the response
  } catch (error) {
    console.error("Error fetching articles:", error); // Log the error to the console
    res.status(500).send("Internal Server Error"); // Send a 500 response if an error occurs
  }
};
