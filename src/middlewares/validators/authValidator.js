import { body, validationResult } from "express-validator";

export const validateUserLogin = [
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(), // Normalizes the email to lowercase
    body("password").exists().withMessage("Password is required"),
  ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
]
