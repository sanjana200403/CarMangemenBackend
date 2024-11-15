const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure that email is unique
    },
    password: {
      type: String,
      minlength: 6,
    },
  },
  {
    timestamps: true,  
  }
);

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password hasn't changed, skip hashing
  }

  try {
    const salt = await bcrypt.genSalt(10); // Create salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.username, email: this.email },
    process.env.JWT_SECRET,  // Secret key stored in environment variables
    { expiresIn: '30d' }     // Token expiration time
  );
  return token;
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
