// Import required modules and configuration
import express from "express";
import {
  getAllQuotes,
  getQuoteById,
  searchQuotes,
} from "../controllers/quoteControllers.js";

// Create a new router instance
const router = express.Router();

// Route for fetching all quotes
router.get("/allQuotes", getAllQuotes);

// Route for fetching a single quote by ID
router.get("/singleQuote/:id", getQuoteById);

// Route for searching quotes
router.get("/search", searchQuotes);

// Export the router for use in the main application file
export default router;
