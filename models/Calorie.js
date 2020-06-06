const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalorieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  caloriecount: {
    type: Number,
  },

  date: {
    type: Date,
  },

  average: {
    type: Number,
  },
});

module.exports = Calorie = mongoose.model("calorie", CalorieSchema);
