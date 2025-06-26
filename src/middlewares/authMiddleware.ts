// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prismaClient";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send("Token não informado.");
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).send("Token não informado.");
      return;
    }

    const secret = process.env.JWT_SECRET;

    const decoded = jwt.verify(token as string, secret as string) as {
      id: string;
    };

    const userId = decoded.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(401).json({ error: "Usuário não encontrado." });
      return;
    }

    req.userId = user.id;

    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    res.status(500).json({ error: "Erro interno de autenticação." });
    return;
  }
};
