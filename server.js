const express = require("express");
const connectToDatabase = require("./config/db");

const app = express();

// Connect to the database
connectToDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
