// Import the Contact model
const Contact = require('../api/models/Contact');

// Create a new contact and save it to the database
exports.createContact = async (req, res) => {
  // Instantiate a new Contact with the request body
  const contact = new Contact(req.body);
  try {
    // Save the new contact and respond with a 201 status code
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    // If an error occurs during saving, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Note: Typically, for contact forms, you might not need update or delete operations.
// You might want to integrate email notifications when a new contact form is submitted.
