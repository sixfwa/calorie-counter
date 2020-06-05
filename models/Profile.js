const mongoose = require("mongoose");
/*
    Right now the profile is not much. Makes reference to the user
    also contains the goal a user has set themselves and also their 
    current average.
*/

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  goal: {
    type: Number,
  },

  average: {
    type: Number,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
