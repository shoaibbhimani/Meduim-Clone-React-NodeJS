const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

const Blog = mongoose.model("Blog");

router.get("/", auth.isAuthenticated, async (req, res) => {
  const posts = await Blog.find({
    user_id: req.user_id
  });

  res.send({ posts });
});

router.post("/", auth.isAuthenticated, async (req, res) => {
  const { title, body, thumbnail } = req.body;

  const blog = new Blog({
    user_id: req.user_id,
    title,
    body,
    thumbnail
  }).save();

  res.send({ blog });
});

router.delete("/:blogId", auth.isAuthenticated, async (req, res) => {
  await Blog.deleteOne({
    _id: req.params.blogId
  });
  res.send(200);
});

module.exports = router;
