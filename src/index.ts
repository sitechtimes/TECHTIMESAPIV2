import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUser } from "./utils/currentUser";

const app = express();
const port = process.env.PORT || 3000;

var cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:8000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(currentUser);

app.use(
  cookieSession({
    signed: false, // Ensures the cookie is signed, preventing tampering
    // secret: process.env.COOKIE_KEY, // Used for signing the cookie
    secure: false, // Make sure to set this to `true` in production with HTTPS
  })
);

const articlesRoutes = require("./routes/articles");
app.use("/articles", articlesRoutes);
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const cmsRoutes = require("./routes/cms");
app.use("/cms", cmsRoutes);
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

mongoose.connect(process.env.MONGO_URI ?? "").catch((err) => {
  console.error("mongo exploded! do you have .env? ", err);
});

mongoose.connection.once("open", async () => {
  console.log("the mongoose is loose");
  app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
});
