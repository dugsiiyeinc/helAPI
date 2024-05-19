import prisma from "../../prisma/client.js";

// Handles fetching all Quotes
export async function getAllQuotes(req, res) {
  try {
    const Quotes = await prisma.Quote.findMany();
    res.status(200).json(Quotes);
  } catch (error) {
    res.status(500).json({ message: "Server Error, Please try again later." });
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
    res.status(500).json({ message: "Server Error, Please try again later." });
  }
}
// Handle get for  multiple-for-search-query
export async function searchQuotes(req, res) {
  const { author, quote } = req.query;

  // Validate query parameters
  if (
    (!author || typeof author !== "string" || author.trim() === "") &&
    (!quote || typeof quote !== "string" || quote.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "Please enter a valid search term." });
  }

  try {
    let quotes;

    if (author) {
      quotes = await prisma.quote.findMany({
        where: {
          author: { contains: author, mode: "insensitive" },
        },
      });
    } else if (quote) {
      quotes = await prisma.quote.findMany({
        where: {
          quote: { contains: quote, mode: "insensitive" },
        },
      });
    }

    if (quotes && quotes.length > 0) {
      res.status(200).json(quotes);
    } else {
      res
        .status(404)
        .json({ message: "No quotes found matching the search criteria" });
    }
  } catch (error) {
    console.error("Search Quotes Error:", error);
    res.status(500).json({
      message: "Server Error, Please try again later.",
      error: error.message,
    });
  }
}
