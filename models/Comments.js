const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: "You must supply an author"
  },
  commentText: {
    type: String,
    required: true
  },
  blog: {
    type: Schema.ObjectId,
    ref: "Blog",
    required: "You must supply an Blog"
  }
});

mongoose.model("Comments", commentSchema);
