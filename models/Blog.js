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
  likes: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  thumbnail: String,
  created: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: Schema.ObjectId,
      ref: "Comments"
    }
  ]
});

mongoose.model("Blog", blogSchema);
