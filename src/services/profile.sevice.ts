import prisma from "../../prisma/prismaClient";

export const createProfileService = async (data: any): Promise<any> => {
  const userId = data.userId;

  const existing = await prisma.profileCv.findUnique({ where: { userId } });

  if (existing) {
    return prisma.profileCv.update({
      where: { userId },
      data: { ...data },
    });
  } else {
    return prisma.profileCv.create({
      data: {
        userId,
        ...data,
      },
    });
  }
};

//service para buscar todos os perfis cadastrados e exibir por ordem aleatoria random
export const getAllRandomProfileService = async (): Promise<any> => {
  const profiles = await prisma.profileCv.findMany();

  //embaralhar perfis para ordem aleatoria

  const randomProfiles = profiles.sort(() => Math.random() - 0.5);

  return randomProfiles;
};

//service para buscar um perfil pelo id do usuario
export const getProfileByIdService = async (
  profileId: string
): Promise<any> => {
  const profile = await prisma.profileCv.findUnique({
    where: { id: profileId },
  });

  return profile;
};
