const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentUserId: {
    type: Number,
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  postId: {
    type: Number,
    required: true
  }
});

mongoose.model("comments", commentSchema);
