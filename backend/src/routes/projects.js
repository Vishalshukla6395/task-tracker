import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";
import taskRoutes from "./tasks.js";

const router = express.Router();

router.use(protect);

router.use("/:projectId/tasks", taskRoutes);

router.route("/").get(getProjects).post(createProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default router;
