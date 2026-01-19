const { body, param, query } = require("express-validator");

const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date"),
];

const taskIdValidator = [
  param("taskId")
    .isMongoId()
    .withMessage("Invalid task ID"),
];

module.exports = {
  createTaskValidator,
  taskIdValidator,
};
