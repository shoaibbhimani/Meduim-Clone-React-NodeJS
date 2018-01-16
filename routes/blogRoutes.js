const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

const Blog = mongoose.model("Blog");

router.get("/myblog", auth.isAuthenticated, async (req, res) => {
  const posts = await Blog.find({
    user_id: req.user_id
  })
    .populate("user_id")
    .sort({ created: -1 });

  res.send({ posts });
});

router.get("/blog/:blogId", auth.isAuthenticated, async (req, res) => {
  const post = await Blog.find({
    _id: req.params.blogId
  }).populate("user_id");

  res.send({ post });
});

router.get("/allblog", async (req, res) => {
  try {
    const posts = await Blog.find({});
    res.send({ posts });
  } catch (err) {
    console.log("err", err);
    res.send(404);
  }
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

router.put("/myblog/:blogId", auth.isAuthenticated, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.blogId, {
      title: req.body.title,
      body: req.body.body,
      thumbnail: req.body.thumbnail
    });
    res.send(200);
  } catch (err) {
    res.send(403);
  }
});

module.exports = router;
