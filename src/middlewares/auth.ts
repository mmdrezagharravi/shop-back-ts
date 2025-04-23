import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("payload: ", payload);
    (req as any).user = payload;
    next(); // no return
  } catch {
    res.sendStatus(403);
  }
};
