const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Contact model
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

// Create the Contact model from the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
