require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
require ('./api/models/projectModel');
const authToken = require('./middleware/authToken');

// MongoDB URI from the environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
  socketTimeoutMS: 360000, // Keep sockets open for 6 minutes
}).then(() => console.log("Successfully connected to MongoDB!"))
  .catch(error => console.error("An error occurred connecting to MongoDB: ", error));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for the application
app.use('/api/projects', require('./api/routes/projectRoutes'));
app.use('/api/blogs', require('./api/routes/blogRoutes'));
app.use('/api/users', require('./api/routes/userRoutes'));
app.use('/api/testimonials', require('./api/routes/testimonialRoutes'));
app.use('/api/contacts', require('./api/routes/contactRoutes'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));