const userService = require("./users.service");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateUserRole(
      req.params.userId,
      req.body.role
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurrentUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
