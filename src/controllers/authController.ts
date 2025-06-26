import { Request, Response } from "express";
import { githubAuthService, generateToken } from "../services/authService";

export const githubAuthController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code } = req.body;

  if (!code) {
    res.status(400).json({ error: "Código de autenticação não enviado." });
    return;
  }
  //criar um jWT para enviar para o FrontEnd
  try {
    const user = await githubAuthService(code);

    const token = generateToken(user.id);

    res.status(200).json({ message: "Logado com Sucesso!", token, user });

    return;
  } catch (error) {
    console.error("Erro na autenticação com GitHub:", error);
    res.status(500).json({ error });

    return;
  }
};
