var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const keys = require("../config/keys");

router.post("/", async (req, res) => {
  const { googleId, firstName, lastName, email } = req.body;

  let user = await User.findOne({
    googleId
  });

  console.log("keys", keys);

  if (!user) {
    const userInstance = new User({
      googleId,
      firstName,
      lastName,
      email,
      avatar: `https://gravatar.com/avatar/${md5(email)}?s=200`
    });
    try {
      user = await userInstance.save();
    } catch (err) {
      console.log("Err", err);
    }
  }



  const token = await jwt.sign(
    {
      user_id: user.id
    },
    keys.token
  );

  res.send({ jwt: token, user });
});

module.exports = router;
