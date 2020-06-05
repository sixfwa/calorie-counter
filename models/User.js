const mongoose = require("mongoose");

/* 
    Model representing a user. Consists of a:
    name        ->  String
    email       ->  String
    password    ->  String
    avatar      ->  String
    Date        ->  Date
*/

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
