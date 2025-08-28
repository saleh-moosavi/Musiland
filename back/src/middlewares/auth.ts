// middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Auth Middleware");
  next();
};
