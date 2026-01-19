const {
  registerUser,
  loginUser,
} = require("./auth.service");

const {
  validateRegister,
  validateLogin,
  validateRefresh,
} = require("./auth.validator");

const {
  generateAccessToken,
  verifyToken,
} = require("./jwt.utils");

/* -------------------- Register -------------------- */
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

/* -------------------- Login -------------------- */
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

/* -------------------- Refresh Token -------------------- */
const refresh = async (req, res) => {
  try {
    const error = validateRefresh(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const { refreshToken } = req.body;

    const decoded = verifyToken(refreshToken, "refresh");

    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

/* -------------------- Logout -------------------- */
const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
