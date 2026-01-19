const Task = require("./tasks.model");

const createTask = async (data, userId) => {
  return Task.create({
    ...data,
    createdBy: userId,
  });
};

const getAllTasks = async (user) => {
  if (user.role === "admin") {
    return Task.find().populate("createdBy", "name email");
  }

  return Task.find({ createdBy: user.id });
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId).populate(
    "createdBy assignedTo",
    "name email"
  );

  if (!task) throw new Error("Task not found");
  return task;
};

const updateTask = async (taskId, updates) => {
  const task = await Task.findByIdAndUpdate(taskId, updates, {
    new: true,
  });

  if (!task) throw new Error("Task not found");
  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) throw new Error("Task not found");
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
