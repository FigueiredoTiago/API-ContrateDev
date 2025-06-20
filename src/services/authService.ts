import prisma from "../../prisma/prismaClient";

import axios from "axios";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export const githubAuthService = async (code: string) => {
  // 1. Trocar código pelo token de acesso
  const tokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const accessToken = tokenResponse.data.access_token;

  // 2. Buscar dados do usuário autenticado
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const githubData = userResponse.data;

  // 3. Criar ou atualizar usuário no banco de dados
  const user = await prisma.user.upsert({
    where: { githubId: githubData.id },
    update: {
      login: githubData.login,
      name: githubData.name,
      avatarUrl: githubData.avatar_url,
      email: githubData.email,
    },
    create: {
      githubId: githubData.id,
      login: githubData.login,
      name: githubData.name,
      avatarUrl: githubData.avatar_url,
      email: githubData.email,
    },
  });

  return user;
};
