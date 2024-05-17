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

// Handles fetching a single Quote by ID
export async function getQuoteById(req, res) {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: id },
    });
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error, couldn't fetch Quote" });
  }
}