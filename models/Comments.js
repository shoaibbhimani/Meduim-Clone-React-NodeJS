const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentUserId: {
    type: Schema.ObjectId,
    ref: "User",
    required: "You must supply an author"
  },
  commentText: {
    type: String,
    required: true
  },
  blogId: {
    type: Schema.ObjectId,
    ref: "Blog",
    required: "You must supply an Blog"
  }
});

mongoose.model("comments", commentSchema);
