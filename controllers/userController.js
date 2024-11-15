const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password){
    return res.status(400).json({ message: 'Incomplete Info' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.log(userExists)

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });
    console.log(newUser)

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();
    console.log(token)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user:newUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with the stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Protected route for fetching user profile (example)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
