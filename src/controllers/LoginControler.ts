import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  res.send("register user");
};

export const loginUser = (req: Request, res: Response) => {};
