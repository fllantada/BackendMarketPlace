import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

type UserInputExpected = { [key: string]: string; id: string };

export const newJwtToken = (user: UserInputExpected) => {
  return jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: 60 * 60 * 24 * 30,
  });
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token        provided" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.body.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token        provided" });
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;
  if (user.role !== "admin") {
    return res.status(401).json({ error: "No admin        privileges" });
  }
  next();
};

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;
  if (user.role !== "user") {
    return res.status(401).json({ error: "No user        privileges" });
  }
  next();
};
