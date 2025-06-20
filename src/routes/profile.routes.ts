import { Router } from "express";
import { createProfile } from '../controllers/profile.controller';

const router = Router();

router.post("/create", createProfile);

export default router;
