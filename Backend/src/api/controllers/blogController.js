// Import the Blog model
const Blog = require('../api/models/blogModel');

// Retrieve all blogs from the database
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single blog by its ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    // If the blog is not found, send a 404 status code with a not found message
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog and save it to the database
exports.createBlog = async (req, res) => {
  // Instantiate a new Blog with the request body
  const blog = new Blog(req.body);
  try {
    // Save the new blog and respond with a 201 status code
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    // If an error occurs during saving, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Update an existing blog by its ID
exports.updateBlog = async (req, res) => {
  try {
    // Find the blog by ID and update it with the request body
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    // If an error occurs, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog by its ID
exports.deleteBlog = async (req, res) => {
  try {
    // Find the blog by ID and delete it
    await Blog.findByIdAndDelete(req.params.id);
    // Respond with a 204 status code indicating successful deletion
    res.status(204).end();
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};
