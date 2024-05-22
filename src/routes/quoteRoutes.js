import express from "express";
import { deleteQuote, registerQuote, updatedQuote } from "../controllers/Quote.js";
const quote = express.Router();

quote.post("/register", registerQuote)
quote.put("/update/:id", updatedQuote)
quote.delete("/delete/:id", deleteQuote);

export default quote