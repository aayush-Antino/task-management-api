const express = require("express");
const cors = require("cors");

const v1Routes = require("./routes/v1/routes");
// const rateLimiter = require("./middleware/rate-limiter");
// const errorHandler = require("./middleware/error-handler");

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
    message: "Server is running successfully",
  });
});

// API v1 routes
app.use("/api/v1", v1Routes);

// app.use(errorHandler);

module.exports = app;
