import express from "express";
import {
  createProject,
  getProjects,
  addProjectMember,
  removeProjectMember,
  getProjectMembers,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id/members", protect, getProjectMembers);
router.post("/:id/members", protect, addProjectMember);
router.delete("/:id/members/:userId", protect, removeProjectMember);

export default router;