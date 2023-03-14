const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { CustomError } = require("../errors/error-handle");
const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});
const singleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(CustomError(`no task found with this id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `no task found with this id: ${taskId}` });
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `no task found with this id: ${taskId}` });
  }
  //res.status(200).json({ task });
  res.status(200).json({ status: "successful", task: null });
});
module.exports = {
  getTasks,
  createTasks,
  singleTask,
  updateTask,
  deleteTask,
};
