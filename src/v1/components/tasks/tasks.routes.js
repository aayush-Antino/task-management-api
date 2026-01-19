const express = require("express");
const router = express.Router();

const tasksController = require("./tasks.controller");
const {
  createTaskValidator,
  taskIdValidator,
} = require("./tasks.validator");

const {
  authenticate,
  validateRequest,
} = require("../../../middleware");

// Task statistics
router.get(
  "/stats",
  authenticate,
  tasksController.getTaskStats
);

// Create task
router.post(
  "/",
  authenticate,
  createTaskValidator,
  validateRequest,
  tasksController.createTask
);

// Get all tasks
router.get(
  "/",
  authenticate,
  tasksController.getAllTasks
);

// Get single task
router.get(
  "/:taskId",
  authenticate,
  taskIdValidator,
  validateRequest,
  tasksController.getSingleTask
);

// Update task
router.put(
  "/:taskId",
  authenticate,
  taskIdValidator,
  validateRequest,
  tasksController.updateTask
);

// Delete task
router.delete(
  "/:taskId",
  authenticate,
  taskIdValidator,
  validateRequest,
  tasksController.deleteTask
);

module.exports = router;
