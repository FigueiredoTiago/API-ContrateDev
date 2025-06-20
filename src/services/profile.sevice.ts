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
