// Import required modules and configuration
import express from "express";
import { loginUser } from "../controllers/authController.js";
import { validateUserLogin } from "../middlewares/validators/authValidator.js";

// Create a new router instance
const router = express.Router();

// Login route with input validation followed by the login controller
router.post("/login", validateUserLogin, loginUser);

// Export the router for use in the main application file
export default router;