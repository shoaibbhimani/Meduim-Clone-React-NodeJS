var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const keys = require("../config/keys");

router.post("/google", async (req, res, next) => {
  const { googleId, firstName, lastName, email } = req.body;

  let user = await User.findOne({
    googleId
  });

  if (!user) {
    const userInstance = new User({
      googleId,
      firstName,
      lastName,
      email,
      avatar: `https://gravatar.com/avatar/${md5(email)}?s=200`
    });

    user = await userInstance.save();
  }

  console.log(user.id);

  const token = await jwt.sign(
    {
      user_id: user.id
    },
    keys.token
  );

  res.send({ token, user });
});

module.exports = router;
