const bcrypt = require("bcrypt");
const User = require("../users/users.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  // Pass plain password, let User model pre-save hook hash it
  const user = await User.create({
    name,
    email,
    password,
  });
  // console.log("User created.");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const payload = {
    id: user._id,
    role: user.role || "user",
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

module.exports = {
  registerUser,
  loginUser,
};
