import prisma from "../../prisma/client.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/initialConfig.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

// Handles user login
export async function loginUser(req, res) {
  let { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if a user with the given email exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the provided password with the stored hashed password using the comparePassword function
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create a JWT payload and generate a token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "1h",
    });
    // Respond with the generated token
    res.json({ token });
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).json({ message: "Server Error" });
  }
}
