
var repl = require("repl");
const mongoose = require("mongoose");
var promisify = require("repl-promised").promisify;

promisify(repl);

//Databases
const User = require("./models/User");
const Comments = require("./models/Comments");
const Blog = require("./models/Blog");

mongoose.Promise = global.Promise;


var replServer = repl.start({
    prompt: "my-app > "
});

replServer.context.User = mongoose.model("User");
replServer.context.Blog = mongoose.model("Blog");
replServer.context.Comment = mongoose.model("Comments");


