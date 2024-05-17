// Import required modules and configuration
import express from "express";
import { getAllQuotes } from "../controllers/getQuoteControllers.js";

// Create a new router instance
const router = express.Router();

//getting all quotes
router.get("/allQuotes", getAllQuotes);

// Export the router for use in the main application file
export default router;
