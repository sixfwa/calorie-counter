const express = require("express");
const connectToDatabase = require("./config/db");

const app = express();

// Connect to the database
connectToDatabase();

// Initialise middleware
app.use(express.json({ extended: false }));

// Define the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
