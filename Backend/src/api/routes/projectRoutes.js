// Import Express, the Project model, and necessary controllers and middleware
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const adminMiddleware = require('../../middleware/adminMiddleware');

// Admin routes for creating, updating, and deleting projects
router.post('/', adminMiddleware, projectController.createProject);
router.put('/:id', adminMiddleware, projectController.updateProject);
router.delete('/:id', adminMiddleware, projectController.deleteProject);

// Public routes for retrieving all projects or a single project by ID
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Export the router for use in the main application
module.exports = router;
