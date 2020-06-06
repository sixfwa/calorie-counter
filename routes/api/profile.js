const express = require("express");
const router = express.Router();
const config = require("config");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

/*
    @route  GET     api/profile/me
    @desc   Get the authorised user's profile
    @access Private
*/
router.get("/me", auth, async (req, res) => {
  try {
    // Find the profile based on current accounts
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    // If no profile exists
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
