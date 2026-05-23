import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }
    const team = await Team.create({
      name,
      owner: req.user.id,
      members: [req.user.id],
    });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    if (!teamId) {
      return res.status(400).json({ message: "Team ID is required" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (team.members.includes(req.user.id)) {
      return res.status(400).json({ message: "You are already a member of this team" });
    }
    team.members.push(req.user.id);
    await team.save();
    res.status(200).json({ message: "Successfully joined team", team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user.id }).populate("owner", "name email");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members", "name email role");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!team.members.some(member => member._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json(team.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};