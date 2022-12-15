import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const session = Router();

session.get("/set-session", (req: Request, res: Response) => {
  // Almacenar información en la sesión del usuario
  if (req.session.userId && req.session.userName) {
    req.session.userId = 123;
    req.session.userName = "john";
  }

  // Enviar una respuesta
  res.send("Session information stored");
});
