const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Project model
const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  image: { type: String, required: false },
  repository: { type: String, required: false },
  liveDemo: { type: String, required: false }
});

// Create the Project model from the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
