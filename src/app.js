const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const createError = require("http-errors"); // Middleware for creating HTTP errors
const express = require("express"); // Express web framework
const logger = require("morgan"); // HTTP request logger middleware
const path = require("path"); // Utility for working with file and directory paths
const routes = require("./routes/index");

let app = express(); // Create an instance of the Express application
app.use("/", routes);

// View engine setup
app.set("views", path.join(__dirname, "views")); // Set the directory for view templates
app.set("view engine", "jade"); // Set the template engine to Jade

// Middleware setup
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(logger("dev")); // Use Morgan to log HTTP requests in development mode

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
