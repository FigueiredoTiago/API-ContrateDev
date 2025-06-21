import { Request, Response } from "express";
import { createProfileService } from "../services/profile.sevice";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado!" });
  }

  const {
    name,
    email,
    githubUrl,
    linkedinUrl,
    websiteUrl,
    city,
    phone,
    about,
    stacks,
  } = req.body;

  if (
    !name ||
    !email ||
    !githubUrl ||
    !linkedinUrl ||
    !websiteUrl ||
    !city ||
    !phone ||
    !about ||
    !stacks
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  const profileData = {
    userId: userId, // usa o ID interno
    name,
    email,
    githubUrl,
    linkedinUrl,
    websiteUrl,
    city,
    phone,
    about,
    stacks,
  };

  try {
    const profile = await createProfileService(profileData);
    return res
      .status(201)
      .json({ message: "Perfil salvo com sucesso!", profile });
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    return res.status(500).json({ message: "Erro ao criar perfil..." });
  }
};
