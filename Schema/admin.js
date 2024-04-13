const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Define the projectRecord sub-schema


const emailValidator = {
  validator: (value) => {
    // Modified email format validation to allow multiple dot-separated segments in the domain part
    return /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(value);
  },
  message: "Invalid email format",
};

const passwordValidator = {
  validator: (value) => {
    // Basic password length validation
    return value.length >= 6;
  },
  message: "Password must be at least 6 characters long",
};

// Define the main schema for the student
const AdminSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Student Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email  is required"],
    trim: true,
    unique: true,
    // match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    // validate: passwordValidator,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
