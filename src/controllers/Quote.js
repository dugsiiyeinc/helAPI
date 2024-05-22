import prisma from "../../prisma/client.js";
import Joi from "joi";

// Define a schema for input validation
const quoteSchema = Joi.object({
  quote: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
});

export const registerQuote = async (req, res) => {
  const { quote, author, description } = req.body;

  // Validate the input data
  const { error } = quoteSchema.validate({ quote, author, description });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Create a new quote in the database
    const newQuote = await prisma.quote.create({
      data: {
        author,
        quote,
        description,
      },
    });

    // Return the newly created quote
    return res.status(201).json(newQuote);
  } catch (err) {
    console.error("Error registering quote:", err);

    // Check for specific database errors
    if (err.code === 'P2002') { // Prisma specific error for unique constraint
      return res.status(409).json({ message: "Quote already exists" });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};
