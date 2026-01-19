const { param, body } = require("express-validator");

const updateUserRoleValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),
];

module.exports = {
  updateUserRoleValidator,
};
