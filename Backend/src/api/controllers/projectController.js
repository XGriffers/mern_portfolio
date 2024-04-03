// Import the Project model
const Project = require('../../api/models/projectModel');

// Retrieve all projects from the database
exports.getAllProjects = async (req, res) => {
  try {
    count = await Project.countDocuments();
    if (count === 0) {
      // If no projects are found, send a 404 status code with a message
      return res.status(404).json({ message: 'No projects found in database' });
    }else{
      const projects = await Project.find();
      res.json(projects);
    }
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single project by its ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    // If the project is not found, send a 404 status code with a not found message
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};

// Create a new project and save it to the database
exports.createProject = async (req, res) => {
  // Instantiate a new Project with the request body
  const project = new Project(req.body);
  try {
    // Save the new project and respond with a 201 status code
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    // If an error occurs during saving, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Update an existing project by its ID
exports.updateProject = async (req, res) => {
  try {
    // Find the project by ID and update it with the request body
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    // If an error occurs, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
};

// Delete a project by its ID
exports.deleteProject = async (req, res) => {
  try {
    // Find the project by ID and delete it
    await Project.findByIdAndDelete(req.params.id);
    // Respond with a 204 status code indicating successful deletion
    res.status(204).end();
  } catch (error) {
    // If an error occurs, send a 500 status code with the error message
    res.status(500).json({ message: error.message });
  }
};
