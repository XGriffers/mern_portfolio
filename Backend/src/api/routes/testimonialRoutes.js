// Import Express and the Testimonial model
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonialModel');

// Get all testimonials
router.get('/', async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

// Create a new testimonial
router.post('/', async (req, res) => {
  const newTestimonial = new Testimonial(req.body);
  const savedTestimonial = await newTestimonial.save();
  res.status(201).json(savedTestimonial);
});

// Update a testimonial
router.put('/:id', async (req, res) => {
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTestimonial);
});

// Delete a testimonial
router.delete('/:id', async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
