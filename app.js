var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morganbody = require("morgan-body");
const mongoose = require("mongoose");

//Databases
require("./models/User");

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

var app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

morganbody(app);

//Routes
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
