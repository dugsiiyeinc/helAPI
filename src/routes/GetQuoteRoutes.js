// Import required modules and configuration
import express from "express";
import {
  getAllQuotes,
  getQuoteById,
} from "../controllers/getQuoteControllers.js";

// Create a new router instance
const router = express.Router();

//getting all quotes
router.get("/allQuotes", getAllQuotes);

// Route for fetching a single quote by ID
router.get("/:id", getQuoteById);

// Export the router for use in the main application file
export default router;
