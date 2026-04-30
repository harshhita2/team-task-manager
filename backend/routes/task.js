const router = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");
const Project = require("../models/Project");
const auth = require("../middleware/auth");


// ✅ Create Task
router.post("/", auth, async (req, res) => {
  try {
    const { projectId, assignedTo, status } = req.body;

    // 🔹 Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send("Invalid projectId");
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    // 🔹 Only project owner can create task
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).send("Only admin can create tasks");
    }

    // 🔹 Validate status (optional)
    const allowedStatus = ["To Do", "In Progress", "Done"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const task = new Task({
      ...req.body,
      createdBy: req.user.id,
      assignedTo: assignedTo || req.user.id
    });

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ Get Tasks (with project name)
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    }).populate("projectId", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ Update Task Status
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    // 🔹 Validate taskId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid task ID");
    }

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    // 🔹 Only assigned user can update
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).send("Not allowed");
    }

    // 🔹 Validate status
    const allowedStatus = ["To Do", "In Progress", "Done"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    task.status = status || task.status;

    await task.save();
    res.json(task);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ Dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });

    res.json({
      total: tasks.length,
      completed: tasks.filter(t => t.status === "Done").length,
      inProgress: tasks.filter(t => t.status === "In Progress").length,
      todo: tasks.filter(t => t.status === "To Do").length,
      overdue: tasks.filter(t => t.dueDate && t.dueDate < new Date()).length
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;