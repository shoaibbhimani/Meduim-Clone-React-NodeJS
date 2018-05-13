const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = require("./Comments");
const ObjectId = mongoose.Types.ObjectId;

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
  likes: [
    {
      type: Schema.ObjectId,
      ref: "User"
    }
  ],
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
  ],
  tags: []
});

blogSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

blogSchema.statics.getCurrentUserTagList = function(user_id) {
  return this.aggregate([
     { $match: { user_id: ObjectId(user_id) } },
     { $unwind: "$tags"},
     { $group: { _id: "$tags", count: { $sum: 1 } } },
     { $sort: { count: -1 }}
    ]);
};

mongoose.model("Blog", blogSchema);