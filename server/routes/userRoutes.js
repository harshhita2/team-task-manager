import express from "express";
import { searchUsersByEmail, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", protect, searchUsersByEmail);
router.get("/", protect, getAllUsers);

export default router;