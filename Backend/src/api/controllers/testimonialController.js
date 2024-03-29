// Import the Testimonial model
const Testimonial = require('../api/models/testimonialModel');

// Retrieve all testimonials from the database
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// Create a new testimonial and save it to the database
exports.createTestimonial = async (req, res) => {
  // Instantiate a new Testimonial with the request body
  const testimonial = new Testimonial(req.body);
  try {
    // Save the new testimonial and respond with a 201 status code
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    // If an error occurs during saving, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Update an existing testimonial by its ID
exports.updateTestimonial = async (req, res) => {
  try {
    // Find the testimonial by ID and update it with the request body
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTestimonial);
  } catch (error) {
    // If an error occurs, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Delete a testimonial by its ID
exports.deleteTestimonial = async (req, res) => {
  try {
    // Find the testimonial by ID and delete it
    await Testimonial.findByIdAndDelete(req.params.id);
    // Respond with a 204 status code indicating successful deletion
    res.status(204).end();
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};
