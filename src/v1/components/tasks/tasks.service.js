const Task = require("./tasks.model");

const createTask = async (data, userId) => {
  return Task.create({
    ...data,
    createdBy: userId,
  });
};

const getAllTasks = async (filter) => {
  return Task.find(filter)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("createdBy assignedTo", "name email");

  if (!task) throw new Error("TASK_NOT_FOUND");
  return task;
};

const updateTask = async (taskId, updates) => {
  const task = await Task.findByIdAndUpdate(taskId, updates, {
    new: true,
  });

  if (!task) throw new Error("TASK_NOT_FOUND");
  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) throw new Error("TASK_NOT_FOUND");
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
