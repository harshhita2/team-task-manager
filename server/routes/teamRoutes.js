import express from "express";
import { createTeam, joinTeam, getTeams, getTeamMembers } from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTeam);
router.post("/join", protect, joinTeam);
router.get("/", protect, getTeams);
router.get("/:id/members", protect, getTeamMembers);

export default router;