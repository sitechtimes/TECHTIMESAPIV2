/**
 * Express Application Setup.
 *
 * This file configures the main application settings, middleware, routes, and
 * error handling for the Express application.
 *
 * It initializes the application, sets up middleware, defines routes, and
 * handles errors.
 *
 * The application uses the Pug template engine and includes middleware for
 * logging, parsing JSON and URL-encoded request bodies, and handling cookies.
 * It also defines routes for the main application and user-related endpoints.
 */

const createError = require("http-errors"); // Middleware for creating HTTP errors
const path = require("path"); // Utility for working with file and directory paths
const express = require("express"); // Express web framework
const RequestHandler = require("express");
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const logger = require("morgan"); // HTTP request logger middleware

// Import routers for different routes
/* import indexRouter from "./routes/index"; // Router for the index/home route
import usersRouter from "./routes/users"; // Router for user-related routes */

let app = express(); // Create an instance of the Express application

// View engine setup
app.set("views", path.join(__dirname, "views")); // Set the directory for view templates
app.set("view engine", "pug"); // Set the template engine to Pug

// Middleware setup
app.use(logger("dev")); // Use Morgan to log HTTP requests in development mode
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

// Route setup
/* app.use("/", indexRouter); // Use the index router for the root route
app.use("/users", usersRouter); // Use the users router for routes prefixed with /users */

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  next(createError(404)); // Create a 404 error and pass it to the next middleware
});

// Error handler middleware
app.use((err, req, res, next) => {
  // Set locals for error handling
  res.locals.message = err.message; // Provide the error message
  res.locals.error = req.app.get("env") === "development" ? err : {}; // Provide error stack in development mode

  // Render the error page with the appropriate status code
  res.status(err.status || 500);
  res.render("error"); // Render the error view
});

// Export the Express application for use in other modules
module.exports = app;
