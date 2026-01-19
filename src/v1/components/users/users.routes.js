const express = require("express");
const router = express.Router();

const usersController = require("./users.controller");
const { updateUserRoleValidator } = require("./users.validator");

const {
  authenticate,
  authorize,
  validateRequest,
} = require("../../../middleware");

// Current user profile
router.get("/me", authenticate, usersController.getCurrentUser);

// Admin routes
router.get(
  "/",
  authenticate,
  authorize("admin"),
  usersController.getAllUsers
);

router.patch(
  "/:userId/role",
  authenticate,
  authorize("admin"),
  updateUserRoleValidator,
  validateRequest,
  usersController.updateUserRole
);

router.delete(
  "/:userId",
  authenticate,
  authorize("admin"),
  usersController.deleteUser
);

module.exports = router;
