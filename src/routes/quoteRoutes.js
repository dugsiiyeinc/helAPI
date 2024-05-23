// Import required modules and configuration
import express from "express";
import {
  getAllQuotes,
  getQuoteById,
  searchQuotes,
} from "../controllers/quoteControllers.js";
import { deleteQuote, registerQuote, updatedQuote } from "../controllers/Quote.js";

// Create a new router instance
const router = express.Router();

router.post("/register", registerQuote)
router.put("/update/:id", updatedQuote)
router.delete("/delete/:id", deleteQuote);

// Route for fetching all quotes
router.get("/allQuotes", getAllQuotes);

// Route for fetching a single quote by ID
router.get("/singleQuote/:id", getQuoteById);

// Route for searching quotes
router.get("/search", searchQuotes);

// Export the router for use in the main application file
export default router;
