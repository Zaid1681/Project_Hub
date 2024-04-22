const mongoose = require("mongoose");
const { Schema } = mongoose;
const role = require("../utils/role.js");

const emailValidator = {
  validator: (value) => {
    // Basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

const facultySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Faculty Name is required"],
    },
    gender: {
      type: String,
      default: "",
      required: [true, "Gender is required"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidator,
    },
    password: {
      type: String,
      required: true,
      // validate: passwordValidator,
    },
    phone: {
      type: String,
      // validate: passwordValidator,
    },
    address: {
      type: String,
      // validate: passwordValidator,
    },
    role: {
      type: String,
      enum: Object.values(role),
      default: role.Faculty,
    },
    domain: {
      type: [String],
      // enum: Object.values(role),
      default: [],
    },
    abbreviation: {
      type: String,
      required: true,
      // enum: Object.values(role),
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
