const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Blog model
const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  tags: [{ type: String, required: false }]
});

// Create the Blog model from the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
