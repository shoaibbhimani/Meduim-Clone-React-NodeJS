var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morganbody = require("morgan-body");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Databases
require("./models/User");
require("./models/Blog");
require("./models/Comments");

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

var app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, keys.token, function(err, decoded) {
      if (err) return res.sendStatus(401);
      //get user id
      req.user_id = decoded.user_id;
      next();
    });
  } else {
    req.user_id = null;
    next();
  }
});

morganbody(app);

//Routes
app
  .use("/api/auth", require("./routes/authRoutes"))
  .use("/api/blogs", require("./routes/blogRoutes"))
  .use("/api/blog", require("./routes/commentRoutes"));

if (process.env.NODE_ENV === "production") {
  //seting our static assets
  app.use(express.static("client/build"));

  const path = require("path");

  //Adding Routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
