import { Request, Response } from "express";
import {
  createProfileService,
  getAllRandomProfileService,
} from "../services/profile.sevice";

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

//Controller para Obter todos os Perfis Cadastrados em ordem aleatoria

export const getAllRandomProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const profiles = await getAllRandomProfileService();
    if (profiles.length === 0) {
      return res.status(404).json({ message: "Nenhum perfil encontrado." });
    }
    return res.status(200).json(profiles);
  } catch (error) {
    res.send(500).json({ message: "Error ao Buscar perfis." });
  }
};
