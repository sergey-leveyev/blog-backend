import { body } from "express-validator";

export const registerValidation = [
  body("email", "Please enter a valid email address").isEmail(),
  body("password", "The password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "The Full name must be at least 3 characters long").isLength(
    { min: 3 }
  ),
  body("avatarUrl", "Please enter a valid link").optional().isURL(),
];
