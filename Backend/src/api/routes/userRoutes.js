const express = require('express');
const router = express.Router();
const User = require('../../api/models/userModel');
const userController = require('../../api/controllers/userController');
const projectController = require('../../api/controllers/projectController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Register a new user.
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} res - The response object.
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for password complexity
    if (!userController.validatePasswordComplexity(password)) {
      return res.status(400).json({ message: 'Password does not meet complexity requirements' });
    }
  

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token and a 201 status code
    res.status(201).json({ token });
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
});

/**
 * User login route.
 * @param {Object} req - The request object containing user login credentials.
 * @param {Object} res - The response object.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.json({ token });
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
});

// Middleware and route handlers for user registration and project creation
router.post('/register', userController.validateRegister, userController.createUser);
router.post('/api/projects', userController.isAdmin, projectController.createProject);

module.exports = router;
