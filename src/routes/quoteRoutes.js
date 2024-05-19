import express from "express";
import { registerQuote } from "../controllers/Quote.js";
const quote = express.Router();

quote.post("/register", registerQuote)

export default quote