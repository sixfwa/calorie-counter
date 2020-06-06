const mongoose = require("mongoose");
const config = require("config");
const database = config.get("mongoURI");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connection Established");
  } catch (error) {
    console.log(error.message);

    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectToDatabase;
