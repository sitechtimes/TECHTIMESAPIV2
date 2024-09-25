/**
 * MongoDB connection module using Mongoose.
 * This module provides a function to connect to the MongoDB database,
 * caching the connection promise to avoid multiple connections.
 */

import mongoose from "mongoose"; // Import the Mongoose library

let cachedPromise: any = null; // Variable to cache the connection promise

/**
 * Connect to the MongoDB database.
 *
 * @throws {Error} If JWT_KEY or MONGO_URI environment variables are not defined.
 * @returns {Promise} A promise that resolves to the Mongoose connection.
 */
export const connectToDatabase = async () => {
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
