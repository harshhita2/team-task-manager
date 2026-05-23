import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getDashboard = async (req, res) => {
  try {
    let taskFilter = {};

    if (req.user.role === "Admin") {
      const projects = await Project.find({ members: req.user.id });
      const projectIds = projects.map(p => p._id);
      taskFilter = { project: { $in: projectIds } };
    } else {
      taskFilter = { assignedTo: req.user.id };
    }

    const totalTasks = await Task.countDocuments(taskFilter);
    const todoTasks = await Task.countDocuments({ ...taskFilter, status: "Todo" });
    const inProgressTasks = await Task.countDocuments({ ...taskFilter, status: "In Progress" });
    const completedTasks = await Task.countDocuments({ ...taskFilter, status: "Done" });

    const overdueTasks = await Task.countDocuments({
      ...taskFilter,
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });

    let tasksPerUser = [];
    if (req.user.role === "Admin") {
      tasksPerUser = await Task.aggregate([
        { $match: taskFilter },
        {
          $group: {
            _id: "$assignedTo",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            name: "$user.name",
            count: 1,
          },
        },
      ]);
    }

    const upcomingTasks = await Task.find(taskFilter)
      .sort({ dueDate: 1 })
      .limit(5)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.status(200).json({
      totalTasks,
      completedTasks,
      overdueTasks,
      inProgressTasks,
      todoTasks,
      tasksPerUser,
      upcomingTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};