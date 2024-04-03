const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the User model with username, email, password, and optional profile picture
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  role: { type: String, required: true, default: 'user' }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
