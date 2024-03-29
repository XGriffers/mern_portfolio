const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Testimonial model
const testimonialSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  position: { type: String, required: false },
  company: { type: String, required: false }
});

// Create the Testimonial model from the schema
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
