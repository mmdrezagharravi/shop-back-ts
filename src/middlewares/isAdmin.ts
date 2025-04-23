import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied: Admins only" });
      return;
    }

    (req as any).user = user; // می‌تونی تایپ تعریف کنی برای req.user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
