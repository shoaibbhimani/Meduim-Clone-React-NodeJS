const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const UserSchema = new Schema({
  googleId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  likes: [{ type: Schema.ObjectId, ref: "Blog" }]
});

UserSchema.methods.favorite = function(id){
  if(this.likes.indexOf(id) === -1){
    this.likes.push(id);
  }

  return this.save();
};

UserSchema.method.isFavorite = function(id){
  return this.likes.some(function(like){
    return like.toString() === id.toString()
  })
}

mongoose.model("User", UserSchema);
