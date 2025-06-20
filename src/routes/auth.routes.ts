// routes/auth.routes.ts
import { Router } from "express";
import { githubAuthController } from "../controllers/authController";

const router = Router();

router.post("/login", githubAuthController); // ou qualquer outro método

export default router;
