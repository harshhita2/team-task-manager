import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    const { title, description, dueDate, priority, project, assignedTo } = req.body;
    if (!title || !project || !assignedTo) {
      return res.status(400).json({ message: "Title, project, and assignee are required" });
    }

    const proj = await Project.findById(project);
    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!proj.members.includes(assignedTo)) {
      return res.status(400).json({ message: "Assignee must be a member of the project" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status: "Todo",
      project,
      assignedTo,
      createdBy: req.user.id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.status(201).json({ message: "Task created", task: populatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "Admin") {
      const projects = await Project.find({ members: req.user.id });
      const projectIds = projects.map(p => p._id);
      tasks = await Task.find({ project: { $in: projectIds } })
        .populate("project", "name")
        .populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("project", "name")
        .populate("assignedTo", "name email");
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role === "Admin") {
      const { title, description, dueDate, priority, status, assignedTo } = req.body;
      if (assignedTo && assignedTo !== task.assignedTo.toString()) {
        const proj = await Project.findById(task.project);
        if (!proj.members.includes(assignedTo)) {
          return res.status(400).json({ message: "Assignee must be a member of the project" });
        }
      }
      
      task.title = title || task.title;
      task.description = description !== undefined ? description : task.description;
      task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.assignedTo = assignedTo || task.assignedTo;
    } else {
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ message: "You can only update status of tasks assigned to you" });
      }
      const { status } = req.body;
      if (!status || !["Todo", "In Progress", "Done"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      task.status = status;
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};