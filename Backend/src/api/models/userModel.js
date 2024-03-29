const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define the schema for the User model with username, email, password, and optional profile picture
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false }
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password') || this.isNew) {
    // Generate a hash with a salt round of 10
    const hash = await bcrypt.hash(this.password, 10);
    // Replace the plain text password with the hash
    this.password = hash;
  }
  next();
});

// Method to check the entered password against the hashed password stored in the database
userSchema.methods.validatePassword = async function(password) {
  // Compare the provided password with the hashed password
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
