const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = require("./Comments");

const blogSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: "You must supply an author"
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  thumbnail: String,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Blog", blogSchema);
