const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Database connection function
const connectDB = async () => {
    console.log("MONGO DB CONNECTING")
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
