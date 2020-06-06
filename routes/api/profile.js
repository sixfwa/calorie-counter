const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

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

/*
    @route  POST     api/profile
    @desc   Create or update a user profile
    @access Private
*/
router.post("/", auth, async (req, res) => {
  const { goal, average } = req.body;

  // Build a profile object
  const profileFields = {};

  profileFields.user = req.user.id;

  if (goal) profileFields.goal = goal;
  if (average) profileFields.average = average;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // If a profile exists then update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Otherwise if a profile does not exist
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/*
  @route  DELETE  api/profile
  @desc   Delete profile and user 
  @access Private
*/
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
