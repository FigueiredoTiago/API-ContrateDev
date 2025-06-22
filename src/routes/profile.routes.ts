import { Router } from "express";
import {
  createProfile,
  getAllRandomProfile,
} from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createProfile);
router.get("/random", getAllRandomProfile);

export default router;
