const taskService = require("./tasks.service");

/* -------------------- Create Task -------------------- */
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Get All Tasks -------------------- */
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};

    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tasks = await taskService.getAllTasks(filter);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Get Single Task -------------------- */
const getSingleTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);

    const isCreator = task.createdBy._id.toString() === req.user.id;
    const isAssignee =
      task.assignedTo &&
      task.assignedTo._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssignee && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Update Task -------------------- */
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);

    const isCreator = task.createdBy._id.toString() === req.user.id;
    const isAssignee =
      task.assignedTo &&
      task.assignedTo._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAdmin && !isAssignee) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Assignee can update only status
    if (isAssignee && !isCreator && !isAdmin) {
      if (Object.keys(req.body).length !== 1 || !req.body.status) {
        return res.status(403).json({
          success: false,
          message: "Assignee can update status only",
        });
      }
    }

    const updatedTask = await taskService.updateTask(
      req.params.taskId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Delete Task -------------------- */
const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);

    const isCreator = task.createdBy._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await taskService.deleteTask(req.params.taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
