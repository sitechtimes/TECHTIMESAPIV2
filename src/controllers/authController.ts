import express, { Request, Response } from "express";
import { User } from "../models/auth/user";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

async function signUp(req: Request, res: Response) {
  // body("name").notEmpty().withMessage("Name can't be empty"),
  // body("password").trim().isLength({ min: 8, max: 16 }).withMessage("Password must be between 8 and 16 characters"),

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  // check email. it'll be actually verified later...
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ message: "bad email" });
    return;
  }

  // check password length
  if (password.length > 16 || password.length < 8) {
    res.status(400).json({ message: "password must be between 8 and 16 characters" });
    return;
  }

  // check if email already in use
  if (await User.exists({ email }).exec()) {
    res.status(400).json({ message: "email already in use" });
    return;
  }

  res.status(200).json({ message: "your sign is up pal" });

  // if (await User.findOne({ email })) res.status(409).json({ message: "user already exists" });

  // const randString = await Verify.generateToken(email);

  // const user = User.create({ name: name, email: email, password: password, verificationCode: randString });
  // await user.save();

  // await Verify.sendVerificationEmail(email, randString);

  // res.status(201).send(user.toJSON());
  try {
    const verificationToken = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: "20m" });

    const newUser = await User.create({
      name,
      email,
      password,
      verified: false,
      verificationCode: verificationToken,
    });
    await newUser.save();

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email.toString(),
      subject: "TechTimes Email confirmation",
      html: `Hello there, click the following link to verify your email: <a href="${process.env.URL}/auth/verify/${verificationToken}">Verify Email</a>`,
    };

    await transport.sendMail(mailOptions);

    res.status(201).json({ message: "verify email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
}

module.exports = { signUp };
