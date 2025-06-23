// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prismaClient";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userIdHeader = req.headers["x-user-id"];

  if (!userIdHeader) {
    res.status(401).json({ error: "Não autorizado: ID do usuário ausente." });
    return;
  }

  //altera a logica para receber um jwt e decodificar o id do usuário
  const userId = Number(userIdHeader);
  

  if (isNaN(userId)) {
    res.status(400).json({ error: "ID do usuário inválido." });
    return;
  }

  try {
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
