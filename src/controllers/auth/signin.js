const { body } = require("express-validator");
const { validateRequest, BadRequestError } = require("@sitechtimes/shared");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const { connectToDatabase } = require("../index");
const { Password } = require("../services/password");
const { User } = require("../../models/auth/user");

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

module.exports = router;
