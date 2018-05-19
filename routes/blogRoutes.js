const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");

const Blog = mongoose.model("Blog");
const User = mongoose.model("User");

router.get("/myblog", auth.isAuthenticated, async (req, res) => {
  const params = req.query.tag
    ? { user_id: req.user_id, tags: { $in: [req.query.tag] } }
    : { user_id: req.user_id };

  const postPromise = Blog.find(params)
    .populate("user_id")
    .sort({ created: -1 });

  const tagsPromise = Blog.getCurrentUserTagList(req.user_id);

  const [posts, tags] = await Promise.all([postPromise, tagsPromise]);

  res.send({ posts, tags });
});

router.get("/blog/:blogId", auth.isAuthenticated, async (req, res) => {
  const post = await Blog.find({
    _id: req.params.blogId
  }).populate("user_id");

  res.send({ post });
});

router.get("/allblog", async (req, res) => {
  const params = req.query.tag ? { tags: { $in: [req.query.tag] } } : {};
  const postPromise = Blog.find(params)
    .populate("user_id")
    .sort({ created: -1 });

  const tagsPromise = Blog.getTagsList();

  const [posts, tags] = await Promise.all([postPromise, tagsPromise]);

  res.send({ posts, tags });
});

router.put("/inclikes/:blogId", auth.isAuthenticated, async (req, res) => {
  const { blogId } = req.params;

  //Checking whether Blog Exists in Users
  const user = await User.findOne({
    _id: req.user_id
  });

  //check there user has already liked this blog
  const userLiked = user.blogliked.map(b => b.toString());

  //if user have already liked blog use $pull or if you want to add it then use $addToSet
  const operator = userLiked.includes(blogId) ? "$pull" : "$addToSet";

  //Remove From Blog likes array
  await Blog.findByIdAndUpdate(blogId, {
    [operator]: {
      likes: req.user_id
    }
  });

  //Remove from User blogliked array
  await User.findByIdAndUpdate(req.user_id, {
    [operator]: {
      blogliked: req.params.blogId
    }
  });

  res.sendStatus(200);
});

router.post("/", auth.isAuthenticated, async (req, res) => {
  const { title, body, thumbnail, tags } = req.body;

  const blog = await new Blog({
    user_id: req.user_id,
    title,
    body,
    thumbnail,
    tags
  }).save();

  res.send({ blog });
});

router.delete("/:blogId", auth.isAuthenticated, async (req, res) => {
  await Blog.deleteOne({
    _id: req.params.blogId
  });
  res.send({ message: "Blog Successfully Deleted" });
});

router.put("/myblog/:blogId", auth.isAuthenticated, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.blogId,
    {
      title: req.body.title,
      body: req.body.body,
      thumbnail: req.body.thumbnail
    },
    { new: true, runValidators: true }
  );
  res.send(blog);
});

module.exports = router;
