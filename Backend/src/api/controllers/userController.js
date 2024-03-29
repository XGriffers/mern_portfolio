// Import necessary modules and libraries
const User = require('../../api/models/userModel');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Define a password complexity regex pattern for validation
const passwordComplexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

exports.validatePasswordComplexity = (password) => {
  return passwordComplexityRegex.test(password);
};

/**
 * Create a new user with hashed password and save to the database.
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object.
 */
exports.createUser = async (req, res) => {
  try {
    // Hash the password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user instance with the hashed password
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    // Save the new user to the database
    const newUser = await user.save();
    // Respond with the created user and a 201 status code
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
};

/**
 * Middleware for user registration validation.
 */
exports.validateRegister = [
  // Validate the username field
  body('username').trim().notEmpty().withMessage('Username is required'),
  // Validate the email field
  body('email').isEmail().withMessage('Invalid email address'),
  // Validate the password field against the complexity regex
  body('password').matches(passwordComplexityRegex).withMessage('Password does not meet complexity requirements'),
  // Add more validators as needed
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If errors are found, return a 400 status code with the errors
      return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware
    next();
  },
];

/**
 * Retrieve a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getUserById = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      // If the user is not found, respond with a 404 status code and message
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with the found user
    res.json(user);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
};

/**
 * Middleware to check if the user is an admin based on the JWT token.
 */
exports.isAdmin = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If token verification fails, respond with a 401 status code
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (decoded.role !== 'admin') {
      // If the user is not an admin, respond with a 403 status code
      return res.status(403).json({ message: 'Forbidden' });
    }
    // If the user is an admin, attach the decoded token to the request object
    req.user = decoded;
    // Proceed to the next middleware
    next();
  });
};

/**
 * Update a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.updateUser = async (req, res) => {
  try {
    // Find the user by ID and update with the request body, returning the new document
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respond with the updated user
    res.json(updatedUser);
  } catch (error) {
    // If an error occurs, respond with a 400 status code and the error message
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteUser = async (req, res) => {
  try {
    // Find the user by ID and delete them
    await User.findByIdAndDelete(req.params.id);
    // Respond with a 204 status code to indicate successful deletion
    res.status(204).end();
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
};
