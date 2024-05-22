import express from "express";
import { registerQuote } from "../controllers/Quote.js";
const quote = express.Router();

quote.post("/register", registerQuote)
quote.put("/update/:id", registerQuote)

export default quote