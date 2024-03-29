// Import Express and the Contact model
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

/**
 * POST endpoint for creating a new contact entry.
 * @param {Object} req - The request object containing contact data.
 * @param {Object} res - The response object.
 */
router.post('/', async (req, res) => {
  try {
    // Create a new contact instance with the request body
    const newContact = new Contact(req.body);
    // Save the new contact to the database
    const savedContact = await newContact.save();
    // Respond with the saved contact and a 201 status code
    res.status(201).json(savedContact);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
});

// Export the router for use in the main application
module.exports = router;
