import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import User from "./models/user.js";

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    res.json(user);
  } catch (err) {
    console.log("from controller register >>> ", err);
    res.status(500).json({
      message: "The registration process failed",
    });
  }
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is runing on port 4000");
});
