import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@sitechtimes/shared";
import express from "express";
import jwt from "jsonwebtoken";
require("dotenv").config({ path: ".env" });

import { connectToDatabase } from "../index";
import { Password } from "../services/password";
import { User } from "../../models/auth/user";

const router = express.Router();

router.post(
  "/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req, res) => {
    await connectToDatabase();

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const doPasswordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!doPasswordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    const userJWT = jwt.sign(payload, process.env.JWT_KEY);

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send({
      ...existingUser.toJSON(),
      token: userJWT,
    });
  }
);

export { router as signinRouter };
