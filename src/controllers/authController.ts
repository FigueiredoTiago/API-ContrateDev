import { Request, Response } from "express";
import { githubAuthService } from "../services/authService";

export const githubAuthController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code } = req.body;

  if (!code) {
    res.status(400).json({ error: "Código de autenticação não enviado." });
    return;
  }

  try {
    const user = await githubAuthService(code);
    res.status(200).json(user);
    return;
  } catch (error) {
    console.error("Erro na autenticação com GitHub:", error);
    res.status(500).json({ error: "Erro na autenticação com o GitHub." });
    return;
  }
};
