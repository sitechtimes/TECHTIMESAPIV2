import express, { Request, Response } from "express";
import { User } from "../models/auth/user";

async function signUp(req: Request, res: Response) {
  // body("name").notEmpty().withMessage("Name can't be empty"),
  // body("password").trim().isLength({ min: 8, max: 16 }).withMessage("Password must be between 8 and 16 characters"),

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  res.status(200).json({ message: "your sign is up pal" });

  // if (await User.findOne({ email })) res.status(409).json({ message: "user already exists" });

  // const randString = await Verify.generateToken(email);

  // const user = User.create({ name: name, email: email, password: password, verificationCode: randString });
  // await user.save();

  // await Verify.sendVerificationEmail(email, randString);

  // res.status(201).send(user.toJSON());
}

module.exports = { signUp };
