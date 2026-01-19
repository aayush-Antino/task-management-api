const {
  registerUser,
  loginUser,
} = require("./auth.service");
const {
  validateRegister,
  validateLogin,
} = require("./auth.validator");

const register = async (req, res) => {
  try {
    const error = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const tokens = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: tokens,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};
