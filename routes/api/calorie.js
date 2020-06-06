const express = require("express");
const router = express.Router();
// const config = require("config");
// const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const Calorie = require("../../models/Calorie");

/*
    @route  POST    api/calorie
    @desc   Create or update a calorie count
    @access Private
*/
router.post("/", auth, async (req, res) => {
  const { caloriecount, date, average } = req.body;

  // Build a new calorie object
  const calorieFields = {};

  calorieFields.user = req.user.id;

  if (caloriecount) calorieFields.caloriecount = caloriecount;
  if (date) calorieFields.date = date;

  try {
    // Find a calorie based on the user id and date
    let calorie = await Calorie.find({ user: req.user.id, date: date });

    // If the calorie exists then make the necessary updates
    if (calorie.length !== 0) {
      calorie = await Calorie.findOneAndUpdate(
        { user: req.user.id },
        { $set: calorieFields },
        { new: true }
      );

      return res.json(calorie);
    }

    // Otherwise if a calorie does not exist
    if (average) calorieFields.average = average;

    calorie = new Calorie(calorieFields);
    await calorie.save();
    res.json(calorie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/*
  @route  GET api/calorie/:date
  @desc   Get the calorie count for the authorised user
  @access Private 
*/
router.get("/:date", auth, async (req, res) => {
  try {
    const calorie = await Calorie.find({
      user: req.user.id,
      date: req.params.date,
    });

    if (calorie.length === 0)
      return res.status(400).json({ msg: "Calorie entry not found" });

    res.json(calorie);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjecID")
      return res.status(400).json({ msg: "Calorie entry not found" });
    res.status(500).send("Server Error");
  }
});

module.exports = router;
