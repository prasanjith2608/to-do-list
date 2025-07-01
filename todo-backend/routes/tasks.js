const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const auth = require("../middleware/auth");

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Create new task
router.post("/", auth, async (req, res) => {
  const newTask = new Task({
    userId: req.user.id,
    title: req.body.title,
  });
  await newTask.save();
  res.status(201).json(newTask);
});

// Toggle task completion
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ msg: "Task not found" });

  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: "Task deleted" });
});

module.exports = router;
