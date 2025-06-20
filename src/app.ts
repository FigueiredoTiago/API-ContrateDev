import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//Rotas
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

export default app;
