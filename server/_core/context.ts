import type { Request, Response } from "express";
import type { User } from "../../drizzle/schema";

export interface TrpcContext {
  user: User | null;
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
  let user: User | null = null;

  // TODO: Implement OAuth user extraction from session

  return {
    user,
    req,
    res,
  };
}
