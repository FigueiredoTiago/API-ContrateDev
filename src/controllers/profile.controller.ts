import { Request, Response } from "express";
import {
  createProfileService,
  getAllRandomProfileService,
  getProfileByIdService,
  getProfileByUserIdService,
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
    avatarUrl,
    email,
    githubUrl,
    linkedinUrl,
    websiteUrl,
    city,
    phone,
    about,
    mainStack,
    stacks,
  } = req.body;

  if (
    !name ||
    !avatarUrl ||
    !email ||
    !githubUrl ||
    !linkedinUrl ||
    !websiteUrl ||
    !city ||
    !phone ||
    !about ||
    !mainStack ||
    !stacks
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  const profileData = {
    userId: userId, // usa o ID interno
    name,
    avatarUrl,
    email,
    githubUrl,
    linkedinUrl,
    websiteUrl,
    city,
    phone,
    about,
    mainStack,
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
      return res
        .status(404)
        .json({ message: "Nenhum perfil encontrado ou cadastrado!" });
    }
    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error ao Buscar perfis." });
  }
};

//controle para buscar um perfil pelo id do perfil(profile)

export const getProfileById = async (req: Request, res: Response) => {
  const profileId = req.params.id;

  if (!profileId) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  try {
    const profile = await getProfileByIdService(profileId);

    if (!profile) {
      res.status(404).json({ message: "Perfil não encontrado." });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error ao Buscar perfil." });
    return;
  }
};

// pega um perfil usando o ID do UserID em si:

export const getProfileByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  try {
    const profile = await getProfileByUserIdService(userId);

    if (!profile) {
      res.status(404).json({ message: "Perfil não criado ainda..." });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error ao Buscar perfil." });
    return;
  }
};
