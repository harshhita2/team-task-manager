const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create Project
router.post("/", auth, async (req, res) => {
  const project = new Project({
    name: req.body.name,
    createdBy: req.user.id,
    members: [req.user.id]
  });

  // First creator becomes admin
  await Project.updateMany(
    { createdBy: req.user.id },
    { $set: { role: "admin" } }
  );

  await project.save();
  res.json(project);
});

// Add Member
router.post("/:id/add-member", auth, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.createdBy.toString() !== req.user.id)
    return res.status(403).send("Only admin allowed");

  project.members.push(req.body.userId);
  await project.save();

  res.json(project);
});

// Get Projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find({ members: req.user.id });
  res.json(projects);
});

module.exports = router;