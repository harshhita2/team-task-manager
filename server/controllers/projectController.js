import Project from "../models/Project.js";
import Team from "../models/Team.js";

export const createProject = async (req, res) => {
  try {
    const { name, teamId } = req.body;
    if (!name || !teamId) {
      return res.status(400).json({ message: "Project name and team are required" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: "You must be a member of the team to create a project under it" });
    }

    const project = await Project.create({
      name,
      team: teamId,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const filter = req.user.role === "Admin"
      ? { $or: [{ createdBy: req.user.id }, { members: req.user.id }] }
      : { members: req.user.id };

    const projects = await Project.find(filter)
      .populate("team", "name")
      .populate("createdBy", "name email");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the project admin can manage members" });
    }
    
    const team = await Team.findById(project.team);
    if (!team || !team.members.includes(userId)) {
      return res.status(400).json({ message: "User must be a member of the project's team first" });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of this project" });
    }

    project.members.push(userId);
    await project.save();
    res.status(200).json({ message: "Member added successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProjectMember = async (req, res) => {
  try {
    const { userId } = req.params;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the project admin can manage members" });
    }
    if (userId === project.createdBy.toString()) {
      return res.status(400).json({ message: "You cannot remove the project admin" });
    }

    project.members = project.members.filter(m => m.toString() !== userId);
    await project.save();
    res.status(200).json({ message: "Member removed successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("members", "name email role");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!project.members.some(member => member._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json(project.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};