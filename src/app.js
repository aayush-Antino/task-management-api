const express = require("express");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

module.exports = app;
