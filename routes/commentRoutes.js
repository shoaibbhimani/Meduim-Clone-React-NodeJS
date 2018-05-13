const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

//Models
const Blog = mongoose.model("Blog");
const Comment = mongoose.model("Comments");

router.get("/:blogId/comment", async (req, res) => {
  const blogcomments = await Comment.find({
    blog: req.params.blogId
  }).populate("user");

  res.send(blogcomments);
});

router.post("/:blogId/comment", auth.isAuthenticated, async (req, res) => {
  const comment = await new Comment({
    user: req.user_id,
    commentText: req.body.text,
    blog: req.params.blogId
  }).save();

  const posts = await Blog.findOne({
    _id: req.params.blogId
  });

  posts.comments.push(comment);
  await posts.save();
  res.send(comment);
});

router.put(
  "/:blogId/:commentId/comment",
  auth.isAuthenticated,
  async (req, res) => {
    const commentState = {
      user: req.user_id,
      commentText: req.body.text,
      blog: req.params.blogId
    };

    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      commentState,
      {
        new: true,
        runValidators: true
      }
    );

    res.send(comment);
  }
);

module.exports = router;