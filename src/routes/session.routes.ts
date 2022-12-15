import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const session = Router();

session.get("/set-session", (req: Request, res: Response) => {
  // Almacenar información en la sesión del usuario

  if (req.session) {
    req.session.userName = "john";
    req.session.userId = 123;
  }

  // Enviar una respuesta
  res.send("Session information stored");
});
