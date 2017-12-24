const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

const Blog = mongoose.model("Blog");

router.get("/", auth.isAuthenticated, async (req, res) => {
  const blogs = await Blog.find({
    user_id: req.user_id
  });

  res.send({ blogs });
});

router.post("/", auth.isAuthenticated, async (req, res) => {
  const { title, body, thumbnail } = req.body;

  const blogInstance = new Blog({
    user_id: req.user_id,
    title,
    body,
    thumbnail
  });

  const blog = blogInstance.save();

  res.send({ blog });
});

module.exports = router;
