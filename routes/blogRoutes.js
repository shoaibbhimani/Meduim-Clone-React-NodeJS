const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

const Blog = mongoose.model("Blog");
const User = mongoose.model("User");

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
    const posts = await Blog.find({}).populate("user_id");
    res.send({ posts });
  } catch (err) {
    console.log("err", err);
    res.send(404);
  }
});

router.put("/inclikes/:blogId", auth.isAuthenticated, async (req, res) => {
  const { blogId } = req.params;

  try {
    //Checking whether Blog Exists in Users
    await User.findOne({
      _id: req.user_id
    });

    //check there user has already liked this blog
    const isExist = user.blogliked.findIndex((b) => {
      // we need to use toString because it is object
      return b.toString() === blogId.toString()
    });

    if (isExist !== -1) {
      //Remove From Blog likes array
      await Blog.findByIdAndUpdate(blogId, {
        $pullAll: {
          likes: [req.user_id]
        }
      });

      //Remove from User blogliked array
      await User.findByIdAndUpdate(req.user_id, {
        $pullAll: {
          blogliked: [blogId]
        }
      });
    } else {

      //Add this userId to Blog likes array 
      await Blog.findByIdAndUpdate(blogId, {
        $addToSet: {
          likes: req.user_id
        }
      });

      //Add blogId to user blogliked array
     await User.findByIdAndUpdate(req.user_id, {
        $addToSet: {
          blogliked: blogId
        }
      });
    }
  } catch (error) {
    return res.sendStatus(304);
  }

  res.sendStatus(200);
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
