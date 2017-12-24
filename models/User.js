const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userScheme = new Schema({
  googleId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address"
  },
  firstName: String,
  lastName: String,
  avatar: String,
  likes: [Number]
});

mongoose.model("User", userScheme);
