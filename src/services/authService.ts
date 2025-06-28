import prisma from "../../prisma/prismaClient";
import axios from "axios";
import jwt from "jsonwebtoken";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export const githubAuthService = async (code: string) => {
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

  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const githubData = userResponse.data;

  if (!githubData.login || !githubData.avatar_url) {
    throw new Error("Dados incompletos do GitHub.");
  }

  let user = await prisma.user.findUnique({
    where: { login: githubData.login },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        login: githubData.login,
        name: githubData.name ?? githubData.login,
        avatarUrl: githubData.avatar_url,
      },
    });
  }

  return user;
};
 
//service para gerar token jwt com id do usuario
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};
