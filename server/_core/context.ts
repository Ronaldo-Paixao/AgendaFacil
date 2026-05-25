import type { Request, Response } from "express";

export interface TrpcContext {
  user: any;
  req: Request;
  res: Response;
}

export async function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<TrpcContext> {

  // Usuário fake para desenvolvimento
  const user = {
    id: 1,
    email: "teste@teste.com",
    name: "Usuário Teste",
  };

  return {
    user,
    req,
    res,
  };
}