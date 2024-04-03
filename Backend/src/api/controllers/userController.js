const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Define a password complexity regex pattern for validation
    const passwordComplexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Check for password complexity
    if (!passwordComplexityRegex.test(password)) {
      return res.status(400).json({ message: 'Password does not meet complexity requirements' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with a salt
    const saltRounds = 10; // You can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword // Store the hashed password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the created user (excluding the password) and a 201 status code
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hash using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If password matches, proceed with login and respond with user info (excluding password)
    const { password: _, ...userInfo } = user.toObject();
    res.json({ user: userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

