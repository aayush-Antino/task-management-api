const express = require("express");
const cors = require("cors");

// yet to be included
// const rateLimiter = require("./middleware/rate-limiter");
// const errorHandler = require("./middleware/error-handler");
// const v1Routes = require("./routes/v1/routes");

const app = express();

/* -------------------- Core Middleware -------------------- */

app.use(express.json());
app.use(cors());
// app.use(rateLimiter);

/* -------------------- Routes -------------------- */

// test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully "
  });
});

// API v1 routes
// app.use("/api/v1", v1Routes);

// app.use(errorHandler); // error handler

module.exports = app;
