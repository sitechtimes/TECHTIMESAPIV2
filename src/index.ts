import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
function postTrimmer(req: Request, res: Response, next: NextFunction) {
  if (req.method === "POST") {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") req.body[key] = value.trim();
    }
  }
  next();
}

app.use(postTrimmer);

const apiRoutes = require("./routes/auth");
app.use("/auth", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("what");
});

mongoose.connect(process.env.MONGO_URI ?? "").catch((err) => {
  console.error("mongo exploded! do you have .env? ", err);
});

mongoose.connection.once("open", async () => {
  console.log("Mongoose is connected");
  app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
});
