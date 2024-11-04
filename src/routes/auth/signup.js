const express = require("express");
const { body } = require("express-validator");

const { connectToDatabase } = require("../index");
const { User } = require("../../models/auth/user");
const { validateRequest, BadRequestError } = require("@sitechtimes/shared");
const { Verify } = require("../services/verify");

const router = express.Router();

router.post(
  "/auth/signup",
  [
    body("name").notEmpty().withMessage("Name can't be empty"),
    body("email")
      .isEmail()
      .withMessage("Email must be valid")
      .matches("^[\\w.+\\-]+@sitechhs\\.com$")
      .withMessage("Email must be a staten island tech email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 16 })
      .withMessage("Password must be between 8 and 16 characters"),
  ],
  validateRequest,
  async (req, res) => {
    await connectToDatabase();

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email is in use");
    }

    const randString = await Verify.generateToken(email);

    const user = User.build({
      name,
      email,
      password,
      verificationCode: randString,
    });
    await user.save();

    await Verify.sendVerificationEmail(email, randString);

    res.status(201).send(user.toJSON());
  }
);

module.exports = router;
