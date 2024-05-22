import prisma from "../../prisma/client.js";
import Joi from "joi";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

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

// Update quote unique Id
export const updatedQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quote, author, description } = req.body;

  // Validate the input data
  const { error } = quoteSchema.validate({ quote, author, description });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Validate the ID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Please enter a valid id' });
  }

  // Check if the quote exists
  const isQuoteExists = await prisma.quote.findUnique({
    where: { id },
  });

  if (!isQuoteExists) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  // Update the quote
  const updatedQuote = await prisma.quote.update({
    data: {
      quote,
      author,
      description,
    },
    where: { id },
  });

  if (!updatedQuote) {
    return res.status(400).json({ message: 'Unexpected error while updating' });
  }

  // Respond with success message and status 200 OK
  return res.status(200).json({
    success: true,
    error: null,
    data: {
      message: 'Updated successfully',
    },
  });
});

// Delete quote by ID
export const deleteQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Please enter a valid id' });
  }

  // Check if the quote exists
  const isQuoteExists = await prisma.quote.findUnique({
    where: { id },
  });

  if (!isQuoteExists) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  // Delete the quote
  await prisma.quote.delete({
    where: { id },
  });

  // Respond with success message and status 200 OK
  return res.status(200).json({
    success: true,
    error: null,
    data: {
      message: 'Deleted successfully',
    },
  });
});
