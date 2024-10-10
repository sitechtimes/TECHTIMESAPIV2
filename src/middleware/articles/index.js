/**
 * Articles Homepage Controller.
 * This module exports a function that handles requests to retrieve articles
 * for the homepage based on optional query parameters.
 */

import express, { Request, Response } from "express"; // Import Express and types for Request and Response
import { connectToDatabase } from "../../routes/index"; // Import the function to connect to the database
import { Homepage } from "../../models/articles/homepage.js"; // Import the Homepage model for MongoDB

/**
 * Handle requests to the articles homepage.
 *
 * This function connects to the MongoDB database and retrieves articles based
 * on optional query parameters for category and position. If parameters are
 * provided, they are used to filter the articles returned.
 *
 * @param {Request} req - The Express request object, containing query parameters.
 * @param {Response} res - The Express response object used to send data back to the client.
 *
 * @returns {Promise<void>} A promise that resolves when the articles are sent as a response.
 *
 * @throws {Error} If there is an error connecting to the database or retrieving articles.
 */

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
