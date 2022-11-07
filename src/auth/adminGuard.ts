import { NextFunction, Request, Response } from "express";
import User from "./isAdmin";

type protectedRoutesType = {
  [key: string]: string[];
};

export default function adminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.path, req.method);

  if (isProtected(removeParams(req.path), req.method)) {
    if (User.isAdmin()) {
      next();
    } else {
      return res.status(403).json({
        error: `No estas autorizado a ejecutar el metodo ${req.method} en la ruta ${req.path} te sugiero que te loguees  con un GET en /api/login)`,
        PD: "No me mandes ni body ni nada con darle un ping te hago admin",
      });
    }
  }

  next();
}

function isProtected(route: string, method: string): boolean {
  const protectedRoutes: protectedRoutesType = {
    "/productos": ["GET", "POST", "PUT", "DELETE"],
    "/carrito": ["GET", "POST", "PUT", "DELETE"],
  };

  if (
    protectedRoutes[route] &&
    Array.isArray(protectedRoutes[route]) &&
    protectedRoutes[route].includes(method)
  ) {
    return true;
  } else return false;
}

function removeParams(route: string): string {
  const routeLength = route.split("/").length;

  if (routeLength == 2) return route;
  const routeWithoutParams = route
    .split("/")
    .slice(0, routeLength - 1)
    .join("/");

  return routeWithoutParams;
}
