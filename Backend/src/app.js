require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB URI from the environment variables
const MONGO_URI = process.env.MONGO_URI;

// Create a new MongoClient instance
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    serverSelectionTimeoutMS: 30000,
    socetTimeoutMS: 360000,
  }
});

/**
 * Function to connect to MongoDB and log a success message.
 */
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error){
    console.error("An error occurred connecting to MongoDB: ", error);
  }
}
run().catch(console.dir);

const app = express();
const PORT = process.env.PORT;

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
