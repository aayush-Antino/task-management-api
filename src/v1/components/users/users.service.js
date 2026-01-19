const User = require("./users.model");

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new Error("User not found");
  return user;
};

const getAllUsers = async () => {
  return User.find().select("-password -refreshToken");
};

const updateUserRole = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw new Error("User not found");
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
