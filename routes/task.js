const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTasks,
  singleTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
router.route("/").get(getTasks).post(createTasks);
router.route("/:id").get(singleTask).patch(updateTask).delete(deleteTask);
module.exports = router;
