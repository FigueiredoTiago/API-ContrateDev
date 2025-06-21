import { Router } from "express";
import { createProfile } from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createProfile);

export default router;
