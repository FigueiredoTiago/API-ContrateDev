import { Router } from "express";
import {
  createProfile,
  getAllRandomProfile,
  getProfileById,
} from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createProfile);
router.get("/random", getAllRandomProfile);
router.get("/:id", getProfileById);

export default router;
