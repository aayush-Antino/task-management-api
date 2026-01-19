const jwt = require("jsonwebtoken");

const authHandler = (req, res, next) => {
  try {
    // auth header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing or invalid",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Attach user info to request
    req.user = decoded;

    //  Continue
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized or token expired",
    });
  }
};

module.exports = authHandler;
