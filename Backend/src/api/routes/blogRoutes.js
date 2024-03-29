// Import Express and the Blog model
const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Get all blog posts
router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// Create a new blog post
router.post('/', async (req, res) => {
  const newBlog = new Blog(req.body);
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

// Update a blog post
router.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBlog);
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
