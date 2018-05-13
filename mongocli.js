var express = require("express");
const mongoose = require("mongoose");

//Databases
require("./models/User");
require("./models/Blog");
require("./models/Comments");
const keys = require("./config/keys");
mongoose.connect(keys.mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Blog = mongoose.model("Blog")


async function changeThumbUrl(){

	const blog = await Blog.updateMany({}, {
            $set: {
                thumbnail: "https://loremflickr.com/1000/500"
            }
        }, { mutli: true });

	console.log(blog)

}

changeThumbUrl();