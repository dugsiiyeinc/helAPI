import prisma from "../../prisma/client.js";

// Handles fetching all Quotes
export async function getAllQuotes(req, res) {
  try {
    const Quotes = await prisma.Quote.findMany();
    res.status(200).json(Quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}